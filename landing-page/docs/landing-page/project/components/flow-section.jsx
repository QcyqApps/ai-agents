// FlowSection — wraps 4 visualization variants. Either shows one (Tweak) or all in gallery.
function FlowSection({variant, showAll, setVariant}){
  const variants = [
    {id:'split',     label:'Split view',         desc:'Ticket Jira ↔ Pull request, side-by-side', Comp: FlowSplit},
    {id:'terminal',  label:'Live terminal',      desc:'Symulacja wykonania w czasie rzeczywistym', Comp: FlowTerminal},
  ];

  return (
    <section id="flow" style={{padding:'120px 0', borderBottom:'1px solid var(--line)'}}>
      <div className="container">
        {/* Section header */}
        <div className="two-col" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:64, marginBottom:64, alignItems:'end'}}>
          <div>
            <div className="eyebrow" style={{marginBottom:16}}>02 · Jak to działa</div>
            <h2 className="serif" style={{
              fontSize:'clamp(38px, 4vw, 60px)', lineHeight:1.05,
              margin:0, letterSpacing:'-.02em', textWrap:'balance'
            }}>
              Cztery kroki. Bez zmian<br/>w sposobie pracy zespołu.
            </h2>
          </div>
          <div style={{paddingBottom:8}}>
            <p style={{fontSize:17, color:'var(--ink-2)', lineHeight:1.55, maxWidth:520, margin:0}}>
              Claude Code wpina się tam, gdzie i tak już pracujecie — w Jirze i na GitHubie.
              Nie musicie zmieniać procesu, narzędzi ani standardów. Wybierz poniżej, jak chcesz
              zobaczyć ten flow.
            </p>
          </div>
        </div>

        {showAll ? (
          // Gallery mode — all 4 variants stacked, each with its own "tab" header
          <div style={{display:'flex', flexDirection:'column', gap:80}}>
            {variants.map((v, i) => (
              <FlowGalleryRow key={v.id} idx={i} variant={v} active={variant===v.id} onPick={()=>setVariant(v.id)}/>
            ))}
          </div>
        ) : (
          // Single variant
          <div>
            <div style={{display:'flex', gap:8, marginBottom:32, flexWrap:'wrap'}}>
              {variants.map(v=>(
                <button key={v.id} onClick={()=>setVariant(v.id)} style={{
                  padding:'10px 16px', borderRadius:999,
                  border: variant===v.id ? '1px solid var(--ink)' : '1px solid var(--line)',
                  background: variant===v.id ? 'var(--ink)' : 'transparent',
                  color: variant===v.id ? 'var(--paper)' : 'var(--ink-2)',
                  fontSize:13, fontWeight:500
                }}>{v.label}</button>
              ))}
            </div>
            {(()=>{ const C = variants.find(v=>v.id===variant)?.Comp || FlowSplit; return <C/>; })()}
          </div>
        )}
      </div>
    </section>
  );
}

function FlowGalleryRow({idx, variant, active, onPick}){
  const C = variant.Comp;
  return (
    <div data-screen-label={`flow-${variant.id}`}>
      <div style={{
        display:'flex', alignItems:'baseline', justifyContent:'space-between',
        marginBottom:24, paddingBottom:16, borderBottom:'1px solid var(--line-2)'
      }}>
        <div style={{display:'flex', alignItems:'baseline', gap:16}}>
          <span className="mono" style={{fontSize:11, color:'var(--ink-3)', letterSpacing:'.1em'}}>
            WARIANT 0{idx+1}
          </span>
          <h3 className="serif" style={{margin:0, fontSize:32, letterSpacing:'-.015em'}}>
            {variant.label}
          </h3>
          <span style={{fontSize:14, color:'var(--ink-3)'}}>{variant.desc}</span>
        </div>
        <button onClick={onPick} className="mono" style={{
          fontSize:11, padding:'6px 12px', borderRadius:999,
          border:'1px solid var(--line)',
          background: active ? 'var(--plum-soft)' : 'transparent',
          color: active ? 'var(--plum)' : 'var(--ink-2)'
        }}>
          {active ? '✓ wybrany' : 'wybierz ten'}
        </button>
      </div>
      <C/>
    </div>
  );
}

window.FlowSection = FlowSection;
