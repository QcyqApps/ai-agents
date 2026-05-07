// Variant 4 (CAROUSEL): one active panel in focus, sliding horizontally between 4 stages.
// Each stage has its own narrative copy beside it. Auto-advances; manual nav with dots/arrows.
function FlowSplit(){
  const stages = [
    {
      k:'JIRA', n:'01',
      title:'Ticket trafia do agenta',
      body:'PM zakłada zadanie tak jak zawsze — w Jirze. Wystarczy label "claude-code". Agent monitoruje wybrane projekty i bierze ticket na warsztat.',
      Comp: PanelJira
    },
    {
      k:'PLAN', n:'02',
      title:'Najpierw plan, dopiero potem kod',
      body:'Claude Code czyta kod i kontekst, pisze plan implementacji w Markdownie. Plan trafia jako PR na dedykowane repo — review\u2019ujesz go zanim cokolwiek zostanie napisane.',
      Comp: PanelPlan
    },
    {
      k:'CODE', n:'03',
      title:'Kod zgodny z waszymi standardami',
      body:'Skille uczą agenta jak piszecie. Hooki blokują wszystko, co odbiega — lint, testy, security. Reguły określają, kiedy agent musi zapytać zamiast działać sam.',
      Comp: PanelCode
    },
    {
      k:'PR', n:'04',
      title:'Pull request gotowy do review',
      body:'Kod trafia jako PR z opisem co i dlaczego. Jira dostaje komentarz z linkiem. Jeśli review zwraca uwagi — agent czyta je i poprawia. Wasz senior tylko klika "approve".',
      Comp: PanelPR
    }
  ];

  const [step, setStep] = React.useState(0);
  const [playing, setPlaying] = React.useState(true);
  const [agentPct, setAgentPct] = React.useState(0); // 0..100 across rail
  const total = stages.length;
  const segments = total - 1;
  const STEP_MS = 7000;             // dwell+travel time per step
  const TAIL_PAUSE_MS = 4000;       // extra time at the end before looping
  const TRAVEL_MS = STEP_MS * segments + TAIL_PAUSE_MS; // full loop

  // virtualTimeRef holds elapsed virtual ms in [0..TRAVEL_MS).
  // We advance it by real-time deltas while playing, but keep it static
  // when paused. Manual step clicks rewrite it directly.
  const virtualTimeRef = React.useRef(0);
  const lastFrameRef = React.useRef(null);

  // Convert virtual time → agent percent + nearest step.
  // First (segments * STEP_MS) ms are the active sweep; remaining ms are a
  // tail pause where agent sits at step `segments` (last step) so the user
  // can read it before we loop.
  const applyTime = React.useCallback((vt)=>{
    const sweepMs = segments * STEP_MS;
    let raw;
    if(vt < sweepMs){
      raw = (vt / STEP_MS); // 0..segments
    } else {
      raw = segments; // parked on last step during tail pause
    }
    const i = Math.floor(Math.min(segments - 0.0001, raw));
    const frac = raw - i;
    const eased = 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, frac));
    const pct = ((i + eased) / segments) * 100;
    setAgentPct(Math.min(100, pct));
    setStep(Math.min(total-1, Math.round(raw)));
  },[segments, total, STEP_MS]);

  React.useEffect(()=>{
    let raf;
    const tick = (now)=>{
      if(lastFrameRef.current == null) lastFrameRef.current = now;
      const dt = now - lastFrameRef.current;
      lastFrameRef.current = now;
      if(playing){
        virtualTimeRef.current = (virtualTimeRef.current + dt) % TRAVEL_MS;
      }
      applyTime(virtualTimeRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return ()=> { cancelAnimationFrame(raf); lastFrameRef.current = null; };
  },[playing, applyTime, TRAVEL_MS]);

  // Reset frame timestamp when (un)pausing so we don't accumulate
  // a huge dt while paused
  React.useEffect(()=>{ lastFrameRef.current = null; },[playing]);

  // Manual step jump: rewrite virtual time so that the rail aligns to step i,
  // even while playing — animation will continue naturally from there.
  const goTo = (i)=>{
    // Place virtual time at the START of step i, so the user gets the full
    // dwell window to read. For the last step, sit in the "tail pause" zone.
    virtualTimeRef.current = i === segments
      ? segments * STEP_MS + 100 // just inside the parked zone
      : i * STEP_MS;
    applyTime(virtualTimeRef.current);
  };

  return (
    <div style={{padding:'24px 0'}}>
      <div className="flow-split-grid" style={{display:'grid', gridTemplateColumns:'1fr 1.1fr', gap:48, alignItems:'center'}}>
        {/* Left: narrative */}
        <div>
          <div className="mono" style={{fontSize:11, color:'var(--plum)',
            letterSpacing:'.14em', marginBottom:18}}>
            KROK {stages[step].n} · {stages[step].k}
          </div>
          <h3 key={'t'+step} className="serif" style={{
            fontSize:'clamp(28px, 3vw, 42px)', lineHeight:1.1, margin:'0 0 22px',
            letterSpacing:'-.015em', textWrap:'balance', minHeight:'2.4em'
          }}>
            <WordReveal text={stages[step].title} delay={0} stagger={60} />
          </h3>
          <p key={'b'+step} style={{fontSize:16.5, color:'var(--ink-2)', lineHeight:1.6, margin:'0 0 32px',
            textWrap:'pretty', minHeight:'4.8em'}}>
            <WordReveal text={stages[step].body} delay={250} stagger={28} />
          </p>

          {/* Step rail with traveling agent */}
          <div style={{position:'relative', marginTop:32, marginBottom:20, paddingTop:64}}>
          {/* Agent floating above the rail, traveling left→right as step advances */}
          <div style={{
            position:'absolute', top:0, left:0, right:0, height:56,
            pointerEvents:'none'
          }}>
            <div style={{
              position:'absolute',
              left: `${agentPct}%`,
              transform:'translateX(-50%)',
              display:'flex', flexDirection:'column', alignItems:'center', gap:3
            }}>
              <div style={{
                width:38, height:38, borderRadius:10, background:'var(--plum)',
                color:'var(--paper)', display:'flex', alignItems:'center', justifyContent:'center',
                boxShadow:'0 10px 24px -4px color-mix(in oklab, var(--plum) 50%, transparent), 0 0 0 5px color-mix(in oklab, var(--plum) 14%, transparent)',
                animation:'agentBob 1.6s ease-in-out infinite'
              }}>
                <ClaudeMark size={20} />
              </div>
              <svg width="10" height="6" viewBox="0 0 10 6" style={{display:'block'}}>
                <path d="M5 6 L0 0 L10 0 Z" fill="var(--plum)" />
              </svg>
            </div>
          </div>
          <div style={{display:'flex', alignItems:'center', gap:0}}>
            {stages.map((s, i)=>(
              <React.Fragment key={s.k}>
                <button onClick={()=>goTo(i)} style={{
                  border:0, background:'transparent', padding:0, cursor:'pointer',
                  display:'flex', flexDirection:'column', alignItems:'center', gap:8,
                  flexShrink:0
                }}>
                  <div style={{
                    width: i===step ? 36 : 28, height: i===step ? 36 : 28, borderRadius:'50%',
                    background: i<=step ? 'var(--plum)' : 'var(--paper)',
                    border: '1.5px solid ' + (i<=step ? 'var(--plum)' : 'var(--line)'),
                    color: i<=step ? 'var(--paper)' : 'var(--ink-3)',
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontFamily:"'JetBrains Mono', monospace", fontSize: i===step ? 11 : 10,
                    fontWeight:600, letterSpacing:'.04em', transition:'all .35s',
                    boxShadow: i===step ? '0 0 0 6px color-mix(in oklab, var(--plum) 14%, transparent)' : 'none'
                  }}>{s.k}</div>
                  <span className="mono" style={{
                    fontSize:9.5, color: i===step ? 'var(--ink)' : 'var(--ink-3)',
                    letterSpacing:'.08em', transition:'color .3s'
                  }}>{s.n}</span>
                </button>
                {i<stages.length-1 && (
                  <div style={{
                    flex:1, height:2, background:'var(--line)', position:'relative',
                    margin:'0 4px', marginTop:-12, overflow:'hidden'
                  }}>
                    <div style={{
                      position:'absolute', inset:0, background:'var(--plum)',
                      transform: i<step ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin:'left', transition:'transform .5s ease'
                    }}/>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
          </div>

          <div className="flow-controls" style={{display:'flex', gap:10, alignItems:'center', flexWrap:'wrap', rowGap:8}}>
            <button onClick={()=>goTo((step-1+total)%total)} className="mono" style={{
              fontSize:11, padding:'8px 12px', borderRadius:999, whiteSpace:'nowrap',
              background:'transparent', color:'var(--ink-2)', border:'1px solid var(--line)'
            }}>← poprzedni</button>
            <button onClick={()=>goTo((step+1)%total)} className="mono" style={{
              fontSize:11, padding:'8px 12px', borderRadius:999, whiteSpace:'nowrap',
              background:'var(--ink)', color:'var(--paper)', border:'1px solid var(--ink)'
            }}>następny →</button>
            <button onClick={()=>setPlaying(p=>!p)} className="mono" style={{
              fontSize:11, padding:'8px 12px', borderRadius:999, whiteSpace:'nowrap',
              background:'transparent', color:'var(--ink-2)', border:'1px solid var(--line)',
              marginLeft:'auto'
            }}>{playing ? '⏸ pauza' : '▶ odtwórz'}</button>
            <span className="mono flow-status" style={{fontSize:10.5, color:'var(--ink-3)', whiteSpace:'nowrap'}}>
              {playing ? 'agent pracuje…' : 'wstrzymano'}
            </span>
          </div>
        </div>

        {/* Right: sliding panel viewport */}
        <div style={{
          position:'relative', overflow:'hidden',
          background:'linear-gradient(90deg, var(--bg) 0%, transparent 8%, transparent 92%, var(--bg) 100%)',
          padding:'8px 0'
        }}>
          <div style={{
            display:'flex', gap:24,
            transform: `translateX(calc(50% - ${step * (340 + 24)}px - 170px))`,
            transition:'transform .7s cubic-bezier(.7,0,.2,1)'
          }}>
            {stages.map((s, i)=>{
              const C = s.Comp;
              const isActive = i===step;
              return (
                <div key={s.k} style={{
                  flexShrink:0, width:340,
                  transform: isActive ? 'scale(1)' : 'scale(0.92)',
                  opacity: isActive ? 1 : 0.35,
                  filter: isActive ? 'none' : 'blur(1px)',
                  transition:'all .7s cubic-bezier(.7,0,.2,1)'
                }}>
                  <div style={{
                    background:'var(--paper)',
                    border: isActive
                      ? '1px solid color-mix(in oklab, var(--plum) 30%, transparent)'
                      : '1px solid var(--line)',
                    borderRadius:14, padding:18,
                    minHeight:480,
                    display:'flex', flexDirection:'column',
                    boxShadow: isActive
                      ? '0 24px 60px -24px color-mix(in oklab, var(--plum) 35%, transparent)'
                      : '0 4px 16px -8px rgba(26,23,20,.1)'
                  }}>
                    <C active={isActive} done={i<step} progress={isActive ? 80 : (i<step ? 100 : 0)} />
                  </div>
                </div>
              );
            })}
          </div>

          {/* edge fades */}
          <div className="flow-edge-fade flow-edge-fade-l" style={{position:'absolute', top:0, bottom:0, left:0, width:60,
            background:'linear-gradient(90deg, var(--bg), transparent)', pointerEvents:'none'}}/>
          <div className="flow-edge-fade flow-edge-fade-r" style={{position:'absolute', top:0, bottom:0, right:0, width:60,
            background:'linear-gradient(270deg, var(--bg), transparent)', pointerEvents:'none'}}/>
        </div>
      </div>
    </div>
  );
}

// ─── Panel components — now content-only (no outer card) ────────
function PanelJira(){
  return (<>
    <PanelHeader logo={<JiraLogo/>} label="JIRA · ECOM" status="IN PROGRESS" statusBg="#fef3c7" statusFg="#92400e"/>
    <div className="mono" style={{fontSize:11, color:'var(--ink-3)', marginBottom:6}}>API-1242</div>
    <h4 style={{margin:'0 0 14px', fontSize:18, fontWeight:600, lineHeight:1.25, textWrap:'balance'}}>
      Eksport CSV w panelu klienta
    </h4>
    <div style={{display:'flex', gap:6, marginBottom:14, flexWrap:'wrap'}}>
      <Tag>claude-code</Tag><Tag>backend</Tag><Tag>frontend</Tag>
    </div>
    <div style={{fontSize:13, color:'var(--ink-2)', lineHeight:1.55, marginBottom:14}}>
      <strong style={{color:'var(--ink)'}}>Jako</strong> użytkownik panelu<br/>
      <strong style={{color:'var(--ink)'}}>chcę</strong> eksportować zamówienia do CSV<br/>
      <strong style={{color:'var(--ink)'}}>by</strong> przesłać dane do księgowości
    </div>
    <div style={{fontSize:12, color:'var(--ink-2)', fontWeight:500, marginBottom:6}}>Akceptacja:</div>
    <ul style={{margin:0, paddingLeft:18, fontSize:12.5, color:'var(--ink-2)', lineHeight:1.6}}>
      <li>Wybór zakresu dat</li>
      <li>50k+ wierszy bez timeoutu</li>
      <li>Toast z postępem</li>
    </ul>
    <div style={{marginTop:'auto', paddingTop:14, borderTop:'1px solid var(--line-2)',
      fontSize:10.5, color:'var(--ink-3)'}} className="mono">
      Reporter: PM · Assignee: claude-code
    </div>
  </>);
}

function PanelPlan(){
  const items = [
    'Endpoint /api/exports/csv (POST)',
    'Strumień — chunked write',
    'Walidacja zakresu dat',
    '<ExportButton/> + toast',
    'Test e2e — 50k wierszy',
    'docs/exports.md'
  ];
  return (<>
    <PanelHeader logo={<GhLogo/>} label="GITHUB · plans-repo" status="PR #112 ✓" statusBg="#dcfce7" statusFg="#166534"/>
    <div className="mono" style={{fontSize:10.5, color:'var(--ink-3)', marginBottom:8}}>plans/API-1242.md</div>
    <div style={{
      flex:1, padding:14, background:'#1a1714', color:'#e8ddd1', borderRadius:8,
      fontFamily:"'JetBrains Mono', monospace", fontSize:11, lineHeight:1.7, overflow:'hidden'
    }}>
      <div style={{color:'#c2603a'}}># Plan: Eksport CSV</div>
      <div style={{color:'#8a847d', marginTop:2}}>{`> API-1242 · feature/api-1242`}</div>
      <div style={{height:8}}/>
      <div style={{color:'#e8ddd1', fontWeight:600}}>## Kroki</div>
      {items.map((it,i)=>(
        <div key={i} style={{display:'flex', gap:8, marginTop:3}}>
          <span style={{color:'#3f6b4a', flexShrink:0}}>[{i+1}]</span>
          <span>{it}</span>
        </div>
      ))}
      <div style={{height:8}}/>
      <div style={{color:'#8a847d'}}>## ~480 linii · 12 plików</div>
    </div>
    <div style={{marginTop:12, padding:'8px 10px', background:'color-mix(in oklab, var(--green) 10%, transparent)',
      borderRadius:6, fontSize:11.5, color:'var(--green)'}}>
      ✓ Plan zaakceptowany przez @senior-dev
    </div>
  </>);
}

function PanelCode({active, done, progress}){
  const local = Math.max(0, Math.min(1, (progress) / 100));
  const totalLines = 7;
  const visibleLines = active && !done ? Math.ceil(local * totalLines) : totalLines;

  const lines = [
    {n:12, c:'#8a847d', t:'// per plan §2 — chunked write'},
    {n:13, parts:[['#b97abf','export async function '],['#c2603a','streamCsv'],[null,'({ from, to }) {']]},
    {n:14, parts:[[null,'  '],['#b97abf','const'],[null,' s = '],['#c2603a','createStream'],[null,'();']]},
    {n:15, parts:[[null,'  '],['#b97abf','for await'],[null,' ('],['#b97abf','const'],[null,' c '],['#b97abf','of'],[null,' '],['#c2603a','fetchOrders'],[null,'()) {']]},
    {n:16, parts:[[null,'    s.'],['#c2603a','write'],[null,'('],['#c2603a','toCsvRow'],[null,'(c));']]},
    {n:17, parts:[[null,'  }']]},
    {n:18, parts:[[null,'  '],['#b97abf','return'],[null,' s.'],['#c2603a','finalize'],[null,'();']]},
  ];

  return (<>
    <PanelHeader logo={<EditorLogo/>} label="EDITOR · exports.ts"
      status={done ? '✓ saved' : (active ? '● writing' : '—')}
      statusBg={done ? '#dcfce7' : 'color-mix(in oklab, var(--accent) 18%, transparent)'}
      statusFg={done ? '#166534' : 'var(--accent)'}/>
    <div style={{
      flex:1, padding:14, background:'#1a1714', borderRadius:8,
      fontFamily:"'JetBrains Mono', monospace", fontSize:11, lineHeight:1.7, overflow:'hidden',
      position:'relative'
    }}>
      {lines.slice(0, visibleLines).map((l, i)=>(
        <div key={i} style={{display:'grid', gridTemplateColumns:'24px 1fr', color: l.c || '#e8ddd1'}}>
          <span style={{color:'#4a4540', textAlign:'right', paddingRight:8}}>{l.n}</span>
          <span style={{whiteSpace:'nowrap', overflow:'hidden'}}>
            {l.t}
            {l.parts && l.parts.map((p,j)=>(
              <span key={j} style={{color: p[0] || '#e8ddd1'}}>{p[1]}</span>
            ))}
          </span>
        </div>
      ))}
      {active && !done && visibleLines < totalLines && (
        <span style={{
          display:'inline-block', width:6, height:11, background:'#e8ddd1',
          animation:'blink 1s steps(2) infinite', marginLeft:32
        }}/>
      )}
    </div>
    <div style={{display:'flex', gap:6, marginTop:10, flexWrap:'wrap'}}>
      <Pill text="✓ ESLint" color="green"/>
      <Pill text="✓ style" color="green"/>
      <Pill text="✓ Tests" color="green"/>
    </div>
  </>);
}

function PanelPR(){
  return (<>
    <PanelHeader logo={<GhLogo/>} label="GITHUB · pull request" status="OPEN" statusBg="#dcfce7" statusFg="#166534"/>
    <div className="mono" style={{fontSize:11.5, color:'var(--ink-3)', marginBottom:6}}>#3380</div>
    <h4 style={{margin:'0 0 14px', fontSize:17, fontWeight:600, lineHeight:1.25, textWrap:'balance'}}>
      API-1242: Eksport CSV w panelu
    </h4>
    <div style={{display:'flex', gap:10, marginBottom:14, fontSize:11.5,
      fontFamily:"'JetBrains Mono', monospace", color:'var(--ink-3)', flexWrap:'wrap'}}>
      <span><span style={{color:'var(--green)'}}>+480</span> / <span style={{color:'#a64242'}}>−32</span></span>
      <span>12 plików</span>
      <span style={{color:'var(--green)'}}>● CI ✓</span>
    </div>
    <div style={{fontSize:12, color:'var(--ink-2)', marginBottom:6, fontWeight:500}}>Zmiany:</div>
    <div style={{display:'flex', flexDirection:'column', gap:5,
      fontFamily:"'JetBrains Mono', monospace", fontSize:11}}>
      {['src/api/exports.ts','components/ExportButton.tsx','tests/e2e/export.spec.ts','docs/exports.md'].map(f=>(
        <div key={f} style={{display:'flex', justifyContent:'space-between', gap:6,
          padding:'5px 8px', background:'var(--bg-2)', borderRadius:5}}>
          <span style={{color:'var(--ink-2)', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f}</span>
          <span style={{color:'var(--green)', flexShrink:0}}>+new</span>
        </div>
      ))}
    </div>
    <div style={{marginTop:14, padding:'10px 12px', background:'var(--plum-soft)',
      borderRadius:6, fontSize:12, color:'var(--plum)', lineHeight:1.45}}>
      💬 <strong>Komentarz w Jirze API-1242:</strong><br/>
      <em>"PR gotowy do review →"</em>
    </div>
    <div style={{marginTop:'auto', paddingTop:12, borderTop:'1px solid var(--line-2)',
      display:'flex', alignItems:'center', gap:8, fontSize:11.5, color:'var(--ink-2)'}}>
      <span style={{width:20, height:20, borderRadius:'50%', background:'var(--plum)',
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'var(--paper)', fontSize:9, fontWeight:600}} className="mono">CC</span>
      <span>review: <strong>@senior-dev</strong></span>
    </div>
  </>);
}

// ─── helpers ────────────────────────────────────────────────────
function PanelHeader({logo, label, status, statusBg, statusFg}){
  return (
    <div style={{display:'flex', alignItems:'center', gap:8, marginBottom:14,
      paddingBottom:10, borderBottom:'1px solid var(--line-2)'}}>
      {logo}
      <span className="mono" style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'.08em',
        whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis'}}>{label}</span>
      <span style={{marginLeft:'auto', padding:'2px 7px', background:statusBg, color:statusFg,
        borderRadius:4, fontSize:9.5, fontWeight:600, whiteSpace:'nowrap'}} className="mono">{status}</span>
    </div>
  );
}

function JiraLogo(){
  return <div style={{width:20, height:20, borderRadius:5, background:'#2a6fdb',
    display:'flex', alignItems:'center', justifyContent:'center',
    color:'#fff', fontSize:11, fontWeight:700, fontFamily:'system-ui', flexShrink:0}}>J</div>;
}
function GhLogo(){
  return <div style={{width:20, height:20, borderRadius:'50%', background:'#1a1714',
    display:'flex', alignItems:'center', justifyContent:'center',
    color:'#fff', fontSize:11, flexShrink:0}}>●</div>;
}
function EditorLogo(){
  return <div style={{width:20, height:20, borderRadius:5, background:'var(--accent)',
    display:'flex', alignItems:'center', justifyContent:'center',
    color:'#fff', fontSize:10, fontWeight:700, fontFamily:'system-ui', flexShrink:0}}>{'</>'}</div>;
}

function Tag({children}){
  return <span style={{
    padding:'2px 7px', borderRadius:4, fontSize:10, fontWeight:500,
    background:'var(--bg-2)', color:'var(--ink-2)',
    fontFamily:"'JetBrains Mono', monospace", letterSpacing:'.02em'
  }}>{children}</span>;
}

function Pill({text, color}){
  const map = { green: '#3f6b4a', amber: '#c2603a', red: '#a64242' };
  return <span className="mono" style={{
    fontSize:9.5, padding:'3px 7px', borderRadius:4, whiteSpace:'nowrap',
    background: 'color-mix(in oklab, ' + map[color] + ' 12%, transparent)',
    color: map[color], border: '1px solid color-mix(in oklab, ' + map[color] + ' 25%, transparent)'
  }}>{text}</span>;
}

if(!document.getElementById('agent-bob-kf')){
  const s = document.createElement('style'); s.id = 'agent-bob-kf';
  s.textContent = `@keyframes agentBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
  @keyframes wordIn{from{opacity:0;transform:translateY(6px) blur(2px);filter:blur(2px)}to{opacity:1;transform:translateY(0);filter:blur(0)}}`;
  document.head.appendChild(s);
}

// Anthropic/Claude mark — 8-pointed asterisk-burst (the Claude logo shape)
function ClaudeMark({size=20, color='currentColor'}){
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <g fill={color}>
        <path d="M12 2 L13 11 L12 12 L11 11 Z"/>
        <path d="M12 22 L11 13 L12 12 L13 13 Z"/>
        <path d="M2 12 L11 11 L12 12 L11 13 Z"/>
        <path d="M22 12 L13 13 L12 12 L13 11 Z"/>
        <path d="M5 5 L11.3 11.3 L12 12 L10.6 11.6 Z" opacity=".85"/>
        <path d="M19 19 L12.7 12.7 L12 12 L13.4 12.4 Z" opacity=".85"/>
        <path d="M19 5 L12.7 11.3 L12 12 L12.4 10.6 Z" opacity=".85"/>
        <path d="M5 19 L11.3 12.7 L12 12 L11.6 13.4 Z" opacity=".85"/>
      </g>
    </svg>
  );
}

// Word-by-word reveal — splits text on spaces, fades each word in with stagger
function WordReveal({text, delay=0, stagger=40}){
  const words = text.split(/(\s+)/);
  let wi = 0;
  return (
    <span>
      {words.map((w, i)=>{
        if(/^\s+$/.test(w)) return <span key={i}>{w}</span>;
        const idx = wi++;
        return (
          <span key={i} style={{
            display:'inline-block', opacity:0,
            animation: `wordIn .5s ${delay + idx*stagger}ms cubic-bezier(.2,.6,.2,1) forwards`
          }}>{w}</span>
        );
      })}
    </span>
  );
}

window.FlowSplit = FlowSplit;
