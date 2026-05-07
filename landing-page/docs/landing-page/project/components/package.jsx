// "Co dostajesz w pakiecie" — visualizes skills, hooks, rules as inspectable cards
function Package(){
  const [open, setOpen] = React.useState(0);

  const items = [
    {
      id:0, k:'SKILLS', icon:'◇',
      title:'Skille — wiedza domenowa',
      tagline:'Co Claude Code wie o waszym kodzie i biznesie',
      body:'Skill to spakowana wiedza ekspercka dla agenta. Tworzymy je razem z waszym tech leadem — od konwencji nazewnictwa, przez patterny architektoniczne, po sposób pisania testów. Agent sięga po właściwy skill automatycznie.',
      examples:[
        'backend-style — jak pisać kontrolery, error handling, logging',
        'test-conventions — czego testujemy, czego nie, jak nazywać',
        'database-migrations — jak bezpiecznie zmieniać schemat',
        'design-system — które komponenty UI używać, kiedy nowe'
      ],
      bg:'var(--plum-soft)', fg:'var(--plum)'
    },
    {
      id:1, k:'HOOKS', icon:'◈',
      title:'Hooki — automatyczne kontrole',
      tagline:'Czego agent nie może zrobić, nawet gdyby chciał',
      body:'Hooki to bramki — uruchamiają się automatycznie przed/po akcjach agenta. Jeśli kod nie przechodzi, agent nie idzie dalej. Wasze standardy są wymuszone na poziomie systemu, nie dobrej woli.',
      examples:[
        'pre-commit · ESLint, Prettier, type-check',
        'pre-push · testy jednostkowe + integracyjne',
        'security-scan · skanowanie sekretów i CVE w zależnościach',
        'pr-template · każdy PR ma opis w określonym formacie'
      ],
      bg:'color-mix(in oklab, var(--accent) 15%, transparent)', fg:'var(--accent)'
    },
    {
      id:2, k:'RULES', icon:'◆',
      title:'Reguły — granice swobody',
      tagline:'Co wolno, czego nie wolno, kiedy pytać człowieka',
      body:'Reguły to konstytucja agenta. Określają granice — kiedy działa sam, kiedy musi zapytać. Reguły są w gicie, więc każda zmiana to PR. Pełna audytowalność.',
      examples:[
        'Nigdy nie zmieniaj plików w /infra/ bez zgody DevOps',
        'Migracje DB tylko przez plan zatwierdzony przez tech lead',
        'Limit zmian per PR: 800 linii albo split',
        'Sekrety i ENV nigdy nie trafiają do kodu'
      ],
      bg:'color-mix(in oklab, var(--green) 15%, transparent)', fg:'var(--green)'
    }
  ];

  return (
    <section id="package" style={{padding:'120px 0', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        <div className="two-col" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, marginBottom:64, alignItems:'end'}}>
          <div>
            <div className="eyebrow" style={{marginBottom:16}}>03 · Co dostajesz</div>
            <h2 className="serif" style={{
              fontSize:'clamp(38px, 4vw, 60px)', lineHeight:1.05,
              margin:0, letterSpacing:'-.02em', textWrap:'balance'
            }}>
              Trzy warstwy, które<br/>czynią agenta <em style={{color:'var(--plum)'}}>waszym</em>.
            </h2>
          </div>
          <p style={{fontSize:17, color:'var(--ink-2)', lineHeight:1.55, maxWidth:520, margin:0, paddingBottom:8}}>
            Claude Code z pudełka jest mądry, ale generyczny. Moja praca polega na nauczeniu go,
            jak robić rzeczy <em>po waszemu</em> — i pilnowaniu, żeby tego nie zapomniał.
          </p>
        </div>

        <div className="package-grid" style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20}}>
          {items.map(it=>{
            const isOpen = open===it.id;
            return (
              <button key={it.id} onClick={()=>setOpen(it.id)} style={{
                textAlign:'left', padding:0, border:0, background:'transparent', cursor:'pointer',
                display:'flex', flexDirection:'column'
              }}>
                <div style={{
                  background:'var(--paper)',
                  border: isOpen ? '1px solid var(--ink)' : '1px solid var(--line)',
                  borderRadius:14, padding:28, transition:'all .3s',
                  height:'100%', display:'flex', flexDirection:'column',
                  boxShadow: isOpen ? '0 12px 40px -20px rgba(26,23,20,.25)' : 'none'
                }}>
                  <div style={{
                    width:52, height:52, borderRadius:12,
                    background: it.bg, color: it.fg,
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize:24, marginBottom:20
                  }}>{it.icon}</div>
                  <div className="mono" style={{fontSize:11, color:'var(--ink-3)',
                    letterSpacing:'.12em', marginBottom:10}}>{it.k}</div>
                  <h3 className="serif" style={{margin:'0 0 10px', fontSize:26, lineHeight:1.15, letterSpacing:'-.01em'}}>
                    {it.title}
                  </h3>
                  <p style={{fontSize:14.5, color:'var(--ink-2)', lineHeight:1.5, margin:0}}>
                    {it.tagline}
                  </p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Detail panel below */}
        <div style={{
          marginTop:24, padding:36,
          background:'var(--paper)', borderRadius:14, border:'1px solid var(--line)'
        }}>
          {(()=>{ const it = items[open];
            return (
              <div className="two-col" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:48}}>
                <div>
                  <div className="mono" style={{fontSize:11, color: it.fg, letterSpacing:'.12em', marginBottom:14}}>
                    {it.k} — DETALE
                  </div>
                  <h4 className="serif" style={{margin:'0 0 18px', fontSize:32, lineHeight:1.1, letterSpacing:'-.015em'}}>
                    {it.title}
                  </h4>
                  <p style={{fontSize:16, color:'var(--ink-2)', lineHeight:1.6, margin:0, textWrap:'pretty'}}>{it.body}</p>
                </div>
                <div>
                  <div className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.12em', marginBottom:14}}>
                    PRZYKŁADY
                  </div>
                  <ul style={{listStyle:'none', margin:0, padding:0, display:'flex', flexDirection:'column', gap:10}}>
                    {it.examples.map((e,i)=>(
                      <li key={i} style={{
                        padding:'12px 14px', borderLeft:'2px solid ' + it.fg,
                        background:'var(--bg-2)', borderRadius:'0 8px 8px 0',
                        fontSize:13.5, color:'var(--ink-2)', lineHeight:1.5,
                        fontFamily: e.includes('—') || e.includes('·') ? "'JetBrains Mono', monospace" : 'inherit'
                      }}>{e}</li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </section>
  );
}

window.Package = Package;
