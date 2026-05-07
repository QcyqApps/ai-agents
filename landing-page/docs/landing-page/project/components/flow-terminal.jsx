// Variant 3: Live terminal simulation — types out commands and output, with a timer.
function FlowTerminal(){
  const script = React.useMemo(()=>[
    {t:0,    type:'cmd', text:'$ claude-code watch --project=ECOM --label=claude-code'},
    {t:600,  type:'out', text:'→ Connected to Jira (project: ECOM)'},
    {t:900,  type:'out', text:'→ Watching for tickets…'},
    {t:1800, type:'event', text:'⊕ New ticket: API-1242 "Eksport CSV w panelu"'},
    {t:2400, type:'cmd', text:'$ claude-code plan API-1242'},
    {t:3200, type:'out', text:'→ Reading codebase context (482 files)…'},
    {t:4100, type:'out', text:'→ Loading skills: backend-style, test-conventions'},
    {t:4800, type:'out', text:'→ Loading hooks: pre-commit-lint, security-scan'},
    {t:5600, type:'out', text:'→ Plan written to plans-repo/API-1242.md'},
    {t:6300, type:'event', text:'⊕ Plan PR #112 opened — awaiting review'},
    {t:7000, type:'event', text:'✓ Plan approved by @senior-dev'},
    {t:7600, type:'cmd', text:'$ claude-code implement API-1242'},
    {t:8400, type:'out', text:'→ Branch: feature/api-1242'},
    {t:9100, type:'out', text:'→ Writing src/api/exports.ts…'},
    {t:9800, type:'out', text:'→ Writing src/components/ExportButton.tsx…'},
    {t:10500,type:'out', text:'→ Writing tests/e2e/export.spec.ts…'},
    {t:11300,type:'out', text:'→ Running lint + tests… ✓ pass'},
    {t:12000,type:'event', text:'⊕ PR #3380 opened: API-1242 (+480 −32, 12 files)'},
    {t:12700,type:'event', text:'⊕ Jira API-1242 → "Code Review"'},
    {t:13400,type:'done', text:'■ Done. Total time: 11 min 12 s · cost: $0.84'}
  ],[]);

  const [running, setRunning] = React.useState(true);
  const [t0, setT0] = React.useState(()=>Date.now());
  const [now, setNow] = React.useState(0);
  const scrollRef = React.useRef(null);

  React.useEffect(()=>{
    if(!running) return;
    const id = setInterval(()=> setNow(Date.now() - t0), 50);
    return ()=>clearInterval(id);
  },[running, t0]);

  const visible = script.filter(s=>s.t <= now);
  const final = script[script.length-1].t;
  const ended = now >= final;

  React.useEffect(()=>{
    if(scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  },[visible.length]);

  React.useEffect(()=>{
    if(ended) setRunning(false);
  },[ended]);

  const restart = ()=>{ setT0(Date.now()); setNow(0); setRunning(true); };

  // Simulated wall clock — show "11min 12s" scaling from real elapsed
  const wall = Math.round((now/final) * 672);
  const wallStr = `${String(Math.floor(wall/60)).padStart(2,'0')}:${String(wall%60).padStart(2,'0')}`;

  return (
    <div style={{padding:'24px 0'}}>
      <div style={{
        background:'#1a1714', borderRadius:14, padding:0, overflow:'hidden',
        boxShadow:'0 24px 60px -30px rgba(26,23,20,.5)',
        border:'1px solid rgba(255,255,255,.05)'
      }}>
        {/* terminal chrome */}
        <div style={{
          padding:'12px 16px', display:'flex', alignItems:'center', justifyContent:'space-between',
          borderBottom:'1px solid rgba(255,255,255,.06)'
        }}>
          <div style={{display:'flex', gap:6}}>
            <span style={{width:11,height:11,borderRadius:'50%',background:'#a64242'}}/>
            <span style={{width:11,height:11,borderRadius:'50%',background:'#c2a23a'}}/>
            <span style={{width:11,height:11,borderRadius:'50%',background:'#3f6b4a'}}/>
          </div>
          <div className="mono" style={{fontSize:11, color:'#8a847d', letterSpacing:'.08em'}}>
            sliwka.studio — claude-code agent
          </div>
          <div className="mono" style={{fontSize:11, color: ended ? '#3f6b4a' : '#c2603a'}}>
            {ended ? '● done' : '● running'} · {wallStr}
          </div>
        </div>

        {/* terminal body */}
        <div ref={scrollRef} style={{
          height:420, padding:'18px 22px', overflowY:'auto',
          fontFamily:"'JetBrains Mono', monospace", fontSize:12.5, lineHeight:1.7,
          color:'#e8ddd1'
        }}>
          {visible.map((line, i)=>{
            let color = '#e8ddd1';
            let prefix = '';
            if(line.type==='cmd')   color = '#e8ddd1';
            if(line.type==='out')   color = '#8a847d';
            if(line.type==='event') color = '#c2603a';
            if(line.type==='done')  color = '#3f6b4a';
            return (
              <div key={i} style={{color, opacity:0, animation:'fadeIn .25s forwards'}}>
                {line.text}
              </div>
            );
          })}
          {!ended && (
            <span style={{
              display:'inline-block', width:7, height:14, background:'#e8ddd1',
              animation:'blink 1s steps(2) infinite', verticalAlign:'middle', marginTop:4
            }}/>
          )}
        </div>

        {/* footer */}
        <div style={{
          padding:'12px 18px', borderTop:'1px solid rgba(255,255,255,.06)',
          display:'flex', alignItems:'center', justifyContent:'space-between'
        }}>
          <div className="mono" style={{fontSize:11, color:'#8a847d'}}>
            Symulacja jednego cyklu · czas zegarowy ≈ 11 min
          </div>
          <button onClick={restart} className="mono" style={{
            fontSize:11, padding:'6px 12px', borderRadius:6,
            background:'rgba(255,255,255,.06)', color:'#e8ddd1', border:'0'
          }}>↻ odtwórz ponownie</button>
        </div>
      </div>
    </div>
  );
}

if(!document.getElementById('term-kf')){
  const s = document.createElement('style'); s.id='term-kf';
  s.textContent = `@keyframes fadeIn{to{opacity:1}}`;
  document.head.appendChild(s);
}

window.FlowTerminal = FlowTerminal;
