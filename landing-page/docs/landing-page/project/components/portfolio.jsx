// Portfolio — 2 hero case studies. Detailed cards with metrics.
function Portfolio(){
  return (
    <section id="work" style={{padding:'120px 0', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div style={{marginBottom:64, maxWidth:720}}>
          <div className="eyebrow" style={{marginBottom:16}}>04 · Realizacje</div>
          <h2 className="serif" style={{
            fontSize:'clamp(38px, 4vw, 60px)', lineHeight:1.05,
            margin:0, letterSpacing:'-.02em', textWrap:'balance'
          }}>
            Ostatnie<br/>wdrożenia.
          </h2>
        </div>

        <div style={{display:'flex', flexDirection:'column', gap:32}}>
          <CaseStudy
            num="01"
            client="duża firma e-commerce"
            sector="Retail / E-commerce · 2026"
            title="Claude Code jako pełnoetatowy członek zespołu"
            lede="Wdrożenie Claude Code w organizacji z 60+ deweloperami. Agent przejął standardowe taski (CRUD, integracje, refactory) — zespół skupił się na architekturze."
            metrics={[]}
            bullets={[
              'Integracja z Jirą i GitHub Enterprise',
              '14 skilli dopasowanych do stacku (TS, Go, Postgres)',
              '8 hooków + system reguł zatwierdzony przez DevOps',
              'Repo planów osobno — pełna audytowalność decyzji'
            ]}
            tag="CC"
            color="plum"
          />

          <CaseStudy
            num="02"
            client="duża firma e-commerce"
            sector="Computer Vision · 2026"
            title="TrOCR dla odręcznych numerów telefonów (PL)"
            lede="Model wizyjny rozpoznający odręcznie pisane polskie numery telefonów z formularzy papierowych. Wytrenowany na własnym datasecie 100k+ dokumentów. W produkcji od 2024."
            metrics={[
              {n:'100k+', l:'dokumentów w datasecie treningowym'},
              {n:'98.2%', l:'accuracy na zbiorze testowym'},
              {n:'~120ms', l:'inference per dokument'}
            ]}
            bullets={[
              'Architektura oparta na TrOCR (encoder-decoder)',
              'Custom data pipeline — augmentacja, normalizacja',
              'Wdrożenie produkcyjne z monitoringiem',
              'Replacement dla manualnego data entry'
            ]}
            tag="ML"
            color="accent"
          />
        </div>
      </div>
    </section>
  );
}

function CaseStudy({num, client, sector, title, lede, metrics, bullets, tag, color}){
  const colorVar = color==='plum' ? 'var(--plum)' : 'var(--accent)';
  return (
    <article style={{
      background:'var(--paper)', border:'1px solid var(--line)', borderRadius:18,
      overflow:'hidden', display:'grid', gridTemplateColumns:'1fr 1.4fr', minHeight:420
    }} className="portfolio-card">
      {/* Visual / accent panel */}
      <div className="case-visual" style={{
        padding:36, background: `linear-gradient(135deg, color-mix(in oklab, ${colorVar} 14%, var(--paper)), var(--paper))`,
        borderRight:'1px solid var(--line)',
        display:'flex', flexDirection:'column', justifyContent:'space-between'
      }}>
        <div className="case-visual-top">
          <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.14em'}}>
            CASE {num} / 02
          </div>
          <div className="case-tag" style={{
            marginTop:24, width:96, height:96, borderRadius:'50%',
            background: colorVar, color:'var(--paper)',
            display:'flex', alignItems:'center', justifyContent:'center',
            fontFamily:"'JetBrains Mono', monospace", fontSize:24, fontWeight:600,
            letterSpacing:'.05em', boxShadow:`0 0 0 12px color-mix(in oklab, ${colorVar} 12%, transparent)`
          }}>{tag}</div>
        </div>

        <div className="case-client">
          <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.1em', marginBottom:6}}>
            KLIENT
          </div>
          <div style={{fontSize:16, color:'var(--ink)', fontWeight:500}}>{client}</div>
          <div style={{fontSize:13, color:'var(--ink-3)', marginTop:4}}>{sector}</div>
        </div>
      </div>

      {/* Content */}
      <div style={{padding:36, display:'flex', flexDirection:'column'}}>
        <h3 className="serif" style={{
          margin:'0 0 14px', fontSize:34, lineHeight:1.1, letterSpacing:'-.015em', textWrap:'balance'
        }}>{title}</h3>
        <p style={{fontSize:16, color:'var(--ink-2)', lineHeight:1.55, margin:'0 0 28px', textWrap:'pretty'}}>{lede}</p>

        {metrics.length > 0 && (
          <div style={{
            display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20,
            padding:'20px 0', borderTop:'1px solid var(--line-2)', borderBottom:'1px solid var(--line-2)',
            marginBottom:24
          }}>
            {metrics.map((m,i)=>(
              <div key={i}>
                <div className="serif" style={{fontSize:32, color: colorVar, lineHeight:1, letterSpacing:'-.02em'}}>{m.n}</div>
                <div style={{fontSize:12, color:'var(--ink-3)', marginTop:6, lineHeight:1.4}}>{m.l}</div>
              </div>
            ))}
          </div>
        )}

        <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.12em', marginBottom:12}}>
          ZAKRES
        </div>
        <ul style={{listStyle:'none', margin:0, padding:0, display:'grid',
          gridTemplateColumns:'1fr 1fr', gap:'8px 20px'}}>
          {bullets.map((b,i)=>(
            <li key={i} style={{display:'flex', gap:10, fontSize:13.5, color:'var(--ink-2)', lineHeight:1.5}}>
              <span style={{color: colorVar, marginTop:1}}>—</span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

window.Portfolio = Portfolio;
