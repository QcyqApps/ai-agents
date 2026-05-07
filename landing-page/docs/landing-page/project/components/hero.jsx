// Hero — interactive flow as the centerpiece. Auto-cycles, hover to pause.
const { useState: useStateHero, useEffect: useEffectHero, useRef: useRefHero } = React;

function Hero(){
  const [step, setStep] = useStateHero(0);
  const [paused, setPaused] = useStateHero(false);
  const total = 4;

  useEffectHero(()=>{
    if(paused) return;
    const id = setInterval(()=> setStep(s => (s+1) % total), 2400);
    return () => clearInterval(id);
  },[paused]);

  return (
    <section id="top" style={{
      paddingTop:64, paddingBottom:120,
      borderBottom:'1px solid var(--line)',
      background:`
        radial-gradient(1200px 500px at 80% 0%, color-mix(in oklab, var(--plum) 8%, transparent) 0%, transparent 60%),
        var(--bg)
      `
    }}>
      <div className="container">
        <div className="hero-grid" style={{display:'grid', gridTemplateColumns:'1.05fr 1.2fr', gap:64, alignItems:'center'}}>
          {/* Left: copy */}
          <div>
            <div style={{display:'flex', alignItems:'center', gap:10, marginBottom:32}}>
              <span style={{width:8,height:8,borderRadius:'50%',background:'var(--green)',
                boxShadow:'0 0 0 3px color-mix(in oklab, var(--green) 25%, transparent)'}}/>
              <span className="mono" style={{fontSize:11, letterSpacing:'.12em', textTransform:'uppercase', color:'var(--ink-2)'}}>
                Przyjmuję projekty na Q3 2026
              </span>
            </div>

            <h1 className="serif" style={{
              fontSize:'clamp(48px, 5.6vw, 84px)', lineHeight:1.02,
              margin:'0 0 28px', letterSpacing:'-.025em', textWrap:'balance'
            }}>
              Twój zespół zyskuje<br/>
              dewelopera, który<br/>
              <span style={{fontStyle:'italic', color:'var(--plum)'}}>nigdy nie śpi</span>
              <span style={{color:'var(--plum)'}}>.</span>
            </h1>

            <p style={{
              fontSize:19, lineHeight:1.5, color:'var(--ink-2)',
              maxWidth:520, margin:'0 0 36px', textWrap:'pretty'
            }}>
              Wdrażam <strong style={{color:'var(--ink)'}}>Claude Code</strong> w organizacjach jako
              pełnoprawnego członka zespołu — z dostępem do Jiry, GitHuba i waszych standardów.
              Bierze ticket, planuje, koduje, wystawia PR. Wy review&apos;ujecie.
            </p>

            <div className="cta-row" style={{display:'flex', gap:14, alignItems:'center', flexWrap:'wrap'}}>
              <a href="#contact" style={{
                display:'inline-flex', alignItems:'center', gap:10,
                padding:'14px 22px', background:'var(--ink)', color:'var(--paper)',
                borderRadius:999, fontSize:15, fontWeight:500
              }}>
                Umów 30 min konsultacji
                <span style={{fontSize:18, lineHeight:1}}>→</span>
              </a>
              <a href="#flow" style={{
                padding:'14px 18px', fontSize:15, color:'var(--ink-2)',
                borderBottom:'1px solid var(--line)'
              }}>
                Zobacz jak to działa
              </a>
            </div>
          </div>

          {/* Right: live flow visual */}
          <div onMouseEnter={()=>setPaused(true)} onMouseLeave={()=>setPaused(false)}>
            <HeroFlow step={step} setStep={setStep} />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({n,l}){
  return (
    <div style={{maxWidth:160}}>
      <div className="serif" style={{fontSize:36, lineHeight:1, color:'var(--plum)', letterSpacing:'-.02em'}}>{n}</div>
      <div style={{fontSize:12, color:'var(--ink-3)', marginTop:8, lineHeight:1.4}}>{l}</div>
    </div>
  );
}

function HeroFlow({step, setStep}){
  // 4 steps, each shown as an animated card. Rendered all together as a connected diagram.
  const steps = [
    { k:'JIRA', label:'Ticket pojawia się w Jirze', side:'API-1242 · Eksport CSV w panelu' },
    { k:'PLAN', label:'Claude Code tworzy plan',     side:'plan.md · 7 kroków · 12 plików' },
    { k:'CODE', label:'Pisze kod zgodnie z planem',  side:'feature/api-1242 · 480 + / 32 −' },
    { k:'PR',   label:'Wystawia PR i aktualizuje Jirę', side:'#PR-3380 · gotowe do review' },
  ];
  return (
    <div style={{
      position:'relative',
      background:'var(--paper)',
      border:'1px solid var(--line)',
      borderRadius:16,
      padding:24,
      boxShadow:'0 1px 0 rgba(255,255,255,.7) inset, 0 24px 60px -30px rgba(26,23,20,.25)'
    }}>
      {/* faux window chrome */}
      <div style={{display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:20}}>
        <div style={{display:'flex', gap:6}}>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#e8ddd1'}}/>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#e8ddd1'}}/>
          <span style={{width:10,height:10,borderRadius:'50%',background:'#e8ddd1'}}/>
        </div>
        <div className="mono" style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'.08em'}}>
          PIPELINE · LIVE
        </div>
        <div style={{display:'flex', gap:4}}>
          {[0,1,2,3].map(i =>
            <button key={i} onClick={()=>setStep(i)} style={{
              width:18, height:4, border:0, borderRadius:2, padding:0,
              background: i===step ? 'var(--plum)' : 'var(--line)',
              transition:'background .3s'
            }}/>
          )}
        </div>
      </div>

      <div style={{display:'flex', flexDirection:'column', gap:10}}>        {steps.map((s, i)=>{
          const active = i===step;
          const done = i<step;
          return (
            <div key={i} style={{
              display:'grid', gridTemplateColumns:'56px 1fr auto',
              alignItems:'center', gap:14,
              padding:'14px 16px',
              borderRadius:12,
              background: active ? 'color-mix(in oklab, var(--plum) 6%, var(--paper))' : 'transparent',
              border: active ? '1px solid color-mix(in oklab, var(--plum) 25%, transparent)' : '1px solid var(--line-2)',
              transition:'all .4s ease'
            }}>
              <div className="mono" style={{
                fontSize:10, fontWeight:600, letterSpacing:'.1em',
                padding:'4px 0', textAlign:'center',
                background: done || active ? 'var(--plum)' : 'var(--bg-2)',
                color: done || active ? 'var(--paper)' : 'var(--ink-3)',
                borderRadius:6, transition:'all .4s'
              }}>{s.k}</div>
              <div>
                <div style={{fontSize:14, color:'var(--ink)', fontWeight:500}}>{s.label}</div>
                <div className="mono" style={{fontSize:11, color:'var(--ink-3)', marginTop:3}}>{s.side}</div>
              </div>
              <div style={{width:24, textAlign:'right'}}>
                {done && <span style={{color:'var(--green)', fontSize:16}}>✓</span>}
                {active && <Spinner/>}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Spinner(){
  return (
    <span style={{
      display:'inline-block', width:14, height:14,
      border:'2px solid color-mix(in oklab, var(--plum) 30%, transparent)',
      borderTopColor:'var(--plum)',
      borderRadius:'50%',
      animation:'spin .8s linear infinite'
    }}/>
  );
}

// inject keyframes once
if(!document.getElementById('hero-kf')){
  const s = document.createElement('style'); s.id='hero-kf';
  s.textContent = `@keyframes spin{to{transform:rotate(360deg)}}`;
  document.head.appendChild(s);
}

window.Hero = Hero;
