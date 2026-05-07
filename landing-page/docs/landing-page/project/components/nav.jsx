// Top navigation — minimal, editorial
function Nav(){
  return (
    <nav style={{
      position:'sticky', top:0, zIndex:50,
      background:'rgba(246,243,238,.82)',
      backdropFilter:'blur(20px) saturate(140%)',
      WebkitBackdropFilter:'blur(20px) saturate(140%)',
      borderBottom:'1px solid var(--line-2)'
    }}>
      <div className="container" style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        height:64
      }}>
        <a href="#top" style={{display:'flex', alignItems:'baseline', gap:0}}>
          <span style={{
            width:18, height:18, borderRadius:'50%',
            background:'var(--plum)', display:'inline-block',
            marginRight:10, transform:'translateY(3px)'
          }}/>
          <span className="serif" style={{fontSize:22, letterSpacing:'-.015em'}}>sliwka</span>
          <span className="mono" style={{fontSize:13, color:'var(--ink-3)'}}>.studio</span>
        </a>
        <div style={{display:'flex', alignItems:'center', gap:28}}>
          <a href="#flow" className="mono" style={{fontSize:12, color:'var(--ink-2)'}}>jak to działa</a>
          <a href="#package" className="mono" style={{fontSize:12, color:'var(--ink-2)'}}>co dostajesz</a>
          <a href="#work" className="mono" style={{fontSize:12, color:'var(--ink-2)'}}>realizacje</a>
          <a href="#contact" className="mono" style={{
            fontSize:12, padding:'8px 14px',
            background:'var(--ink)', color:'var(--paper)',
            borderRadius:999
          }}>umów rozmowę →</a>
        </div>
      </div>
    </nav>
  );
}

window.Nav = Nav;
