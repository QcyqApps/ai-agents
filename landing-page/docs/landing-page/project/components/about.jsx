// About — short personal note
function About(){
  return (
    <section id="about" style={{padding:'120px 0', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="two-col" style={{display:'grid', gridTemplateColumns:'1fr 1.3fr', gap:80, alignItems:'start'}}>
          <div>
            <div className="eyebrow" style={{marginBottom:16}}>05 · Kto za tym stoi</div>
            <h2 className="serif" style={{
              fontSize:'clamp(38px, 4vw, 60px)', lineHeight:1.05,
              margin:0, letterSpacing:'-.02em', textWrap:'balance'
            }}>
              10+ lat<br/>
              <em style={{color:'var(--plum)'}}>w kodzie.</em>
            </h2>
          </div>
          <div>
            <p style={{fontSize:19, color:'var(--ink)', lineHeight:1.55, margin:'0 0 24px',
              textWrap:'pretty', fontWeight:400}}>
              Programuję od ponad dekady. Ostatnie lata spędziłem budując automatyzacje AI dla firm —
              od modeli wizyjnych w produkcji, po asystentów w codziennej pracy zespołów.
            </p>
            <p style={{fontSize:17, color:'var(--ink-2)', lineHeight:1.6, margin:'0 0 32px', textWrap:'pretty'}}>
              W 2025 zrobiłem pivot. Claude Code okazał się narzędziem, które realnie zmienia sposób
              pracy zespołów developerskich — pod warunkiem, że jest dobrze wpięte. Dzisiaj robię tylko to.
            </p>

            <div style={{
              display:'grid', gridTemplateColumns:'1fr 1fr', gap:1,
              background:'var(--line)', border:'1px solid var(--line)', borderRadius:12, overflow:'hidden'
            }}>
              <Fact k="Lokalizacja" v="Polska · zdalnie" />
              <Fact k="Stawka" v="rozmawiamy" />
              <Fact k="Stack" v="TS · Go · Python · ML" />
              <Fact k="Dostępność" v="Q3 2026 — 1 slot" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Fact({k,v}){
  return (
    <div style={{padding:'18px 20px', background:'var(--paper)'}}>
      <div className="mono" style={{fontSize:10, color:'var(--ink-3)', letterSpacing:'.14em', marginBottom:6}}>
        {k.toUpperCase()}
      </div>
      <div style={{fontSize:15, color:'var(--ink)', fontWeight:500}}>{v}</div>
    </div>
  );
}

window.About = About;
