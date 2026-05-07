// Main app for sliwka.studio
const { useState, useEffect, useRef, useMemo } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "flowVariant": "split",
  "accent": "plum",
  "showAllVariants": false
}/*EDITMODE-END*/;

function App(){
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  // accent palette mapping
  useEffect(()=>{
    const root = document.documentElement;
    const map = {
      plum:    { plum:'#5a2a4a', plum2:'#8b3d6f', plumSoft:'#efe1ea', accent:'#c2603a' },
      forest:  { plum:'#2c4a39', plum2:'#4a6b56', plumSoft:'#dde7df', accent:'#c2603a' },
      ink:     { plum:'#1a1a1a', plum2:'#3a3a3a', plumSoft:'#e6e3df', accent:'#c2603a' },
      cobalt:  { plum:'#1e3a5f', plum2:'#3a5a85', plumSoft:'#dde4ee', accent:'#c2603a' }
    };
    const p = map[t.accent] || map.plum;
    root.style.setProperty('--plum', p.plum);
    root.style.setProperty('--plum-2', p.plum2);
    root.style.setProperty('--plum-soft', p.plumSoft);
    root.style.setProperty('--accent', p.accent);
  },[t.accent]);

  return (
    <div data-screen-label="sliwka.studio">
      <Nav />
      <Hero />
      <FlowSection variant={t.flowVariant} showAll={t.showAllVariants} setVariant={(v)=>setTweak('flowVariant',v)} />
      <Package />
      <Portfolio />
      <About />
      <CTA />
      <Footer />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Wizualizacja flow" />
        <TweakSelect
          label="Wariant aktywny"
          value={t.flowVariant}
          options={[
            {value:'split', label:'Split view (Jira ↔ PR)'},
            {value:'terminal', label:'Live terminal'}
          ]}
          onChange={(v)=>setTweak('flowVariant', v)}
        />
        <TweakToggle label="Pokaż wszystkie warianty (galeria)" value={t.showAllVariants}
          onChange={(v)=>setTweak('showAllVariants', v)} />

        <TweakSection label="Paleta" />
        <TweakRadio label="Akcent" value={t.accent}
          options={['plum','forest','ink','cobalt']}
          onChange={(v)=>setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
