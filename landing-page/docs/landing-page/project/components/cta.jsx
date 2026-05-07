// CTA section — the big closer
function CTA(){
  return (
    <section id="contact" style={{padding:'140px 0', background:'var(--ink)', color:'var(--paper)'}}>
      <div className="container">
        <div style={{maxWidth:920, margin:'0 auto', textAlign:'center'}}>
          <div className="mono" style={{fontSize:11, color:'rgba(253,251,247,.5)',
            letterSpacing:'.16em', marginBottom:28}}>
            06 · ZACZNIJMY
          </div>
          <h2 className="serif" style={{
            fontSize:'clamp(48px, 6vw, 88px)', lineHeight:1.02, margin:'0 0 32px',
            letterSpacing:'-.025em', textWrap:'balance'
          }}>
            30 minut wystarczy,<br/>
            żeby <em style={{color:'#e8a8c8'}}>zobaczyć</em>, czy to ma sens.
          </h2>
          <p style={{
            fontSize:19, color:'rgba(253,251,247,.7)', lineHeight:1.55,
            margin:'0 auto 48px', maxWidth:620, textWrap:'pretty'
          }}>
            Krótka rozmowa — pokażę live demo na waszym przykładowym tickecie i pokażę,
            jak by to wyglądało u was. Bez slajdów, bez sprzedaży.
          </p>

          <div style={{display:'flex', gap:14, justifyContent:'center', flexWrap:'wrap', marginBottom:64}}>
            <a href="mailto:hello@sliwka.studio" style={{
              padding:'18px 28px', background:'var(--paper)', color:'var(--ink)',
              borderRadius:999, fontSize:16, fontWeight:500,
              display:'inline-flex', alignItems:'center', gap:10
            }}>
              hello@sliwka.studio
              <span style={{fontSize:18}}>→</span>
            </a>
          </div>

          <div style={{
            display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:1,
            background:'rgba(253,251,247,.12)', borderRadius:12, overflow:'hidden',
            maxWidth:720, margin:'0 auto'
          }}>
            <CTAFact k="ODPOWIADAM" v="< 24 godz" />
            <CTAFact k="PIERWSZA ROZMOWA" v="bezpłatna" />
            <CTAFact k="POC" v="2 tygodnie" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CTAFact({k,v}){
  return (
    <div style={{padding:'24px 16px', background:'var(--ink)', textAlign:'center'}}>
      <div className="mono" style={{fontSize:10, color:'rgba(253,251,247,.5)',
        letterSpacing:'.14em', marginBottom:8, minHeight:'2.4em',
        display:'flex', alignItems:'center', justifyContent:'center', lineHeight:1.2}}>{k}</div>
      <div className="serif" style={{fontSize:24, color:'var(--paper)', letterSpacing:'-.01em'}}>{v}</div>
    </div>
  );
}

window.CTA = CTA;
