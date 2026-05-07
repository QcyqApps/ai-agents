function Footer(){
  return (
    <footer style={{padding:'40px 0 56px', background:'var(--ink)', color:'rgba(253,251,247,.5)'}}>
      <div className="container">
        <div style={{height:1, background:'rgba(253,251,247,.08)', marginBottom:32}}/>
        <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:16}}>
          <div style={{display:'flex', alignItems:'baseline'}}>
            <span style={{
              width:14, height:14, borderRadius:'50%', background:'var(--plum-2)',
              display:'inline-block', marginRight:8, transform:'translateY(2px)'
            }}/>
            <span className="serif" style={{fontSize:18, color:'var(--paper)'}}>sliwka</span>
            <span className="mono" style={{fontSize:12, color:'rgba(253,251,247,.4)'}}>.studio</span>
          </div>
          <div className="mono" style={{fontSize:11, letterSpacing:'.1em'}}>
            © 2026
          </div>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
