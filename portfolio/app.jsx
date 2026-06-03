/* Main app component - Rosendo De Los Rios Moreno */

const TWEAK_DEFAULTS = {
  "introVariant": "liquid",
  "accent": "#2f6bff",
  "startLang": "es"
};

const ACCENT_OPTS = ["#2f6bff", "#19b6c9", "#f5a524", "#e2e8f5"];

/* ---- Custom cursor (desktop only) ---- */
function Cursor() {
  const dotRef  = React.useRef(null);
  const ringRef = React.useRef(null);

  React.useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf;

    const onMove = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px";
      dot.style.top  = my + "px";
    };

    const animateRing = () => {
      rx += (mx - rx) * 0.13;
      ry += (my - ry) * 0.13;
      ring.style.left = rx + "px";
      ring.style.top  = ry + "px";
      raf = requestAnimationFrame(animateRing);
    };

    const addHover = (e) => {
      if (e.target.closest("a, button, [role='button'], .proj, .link-card, .skill-chip, .stat, .lang-toggle")) {
        document.body.classList.add("cursor-hover");
      }
    };
    const removeHover = (e) => {
      if (e.target.closest("a, button, [role='button'], .proj, .link-card, .skill-chip, .stat, .lang-toggle")) {
        document.body.classList.remove("cursor-hover");
      }
    };
    const onDown = () => document.body.classList.add("cursor-active");
    const onUp   = () => document.body.classList.remove("cursor-active");

    document.addEventListener("mousemove",  onMove,      { passive: true });
    document.addEventListener("mouseover",  addHover);
    document.addEventListener("mouseout",   removeHover);
    document.addEventListener("mousedown",  onDown);
    document.addEventListener("mouseup",    onUp);
    raf = requestAnimationFrame(animateRing);

    return () => {
      document.removeEventListener("mousemove",  onMove);
      document.removeEventListener("mouseover",  addHover);
      document.removeEventListener("mouseout",   removeHover);
      document.removeEventListener("mousedown",  onDown);
      document.removeEventListener("mouseup",    onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <React.Fragment>
      <div className="cur-dot"  ref={dotRef}  />
      <div className="cur-ring" ref={ringRef} />
    </React.Fragment>
  );
}

// Scroll progress indicator
function ScrollProgress() {
  const barRef = React.useRef(null);
  React.useEffect(() => {
    const bar = barRef.current; if (!bar) return;
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (total > 0 ? (window.scrollY / total) * 100 : 0) + "%";
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return <div className="scroll-progress" ref={barRef} />;
}

// Main App component
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const P = window.PORTFOLIO;

  const prefersReduced = React.useMemo(
    () => window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches, []);

  const [lang,      setLang]      = React.useState(t.startLang || "es");
  const [introDone, setIntroDone] = React.useState(prefersReduced);
  const [introKey,  setIntroKey]  = React.useState(0);

  const T = P.t[lang];

  /* apply accent CSS vars */
  React.useEffect(() => {
    const r = document.documentElement;
    const [ar, ag, ab] = hexToRgb(t.accent);
    r.style.setProperty("--accent", t.accent);
    r.style.setProperty("--accent-glow", `rgba(${ar},${ag},${ab},0.45)`);
    r.style.setProperty("--accent-soft", `rgb(${Math.min(255,ar+70)},${Math.min(255,ag+70)},${Math.min(255,ab+50)})`);
  }, [t.accent]);

  React.useEffect(() => {
    document.documentElement.lang = lang;
    document.title = P.name + " — " + P.t[lang].role;
  }, [lang]);

  /* lock scroll during intro */
  React.useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    if (introDone) window.scrollTo(0, 0);
  }, [introDone]);

  /* safety failsafe */
  React.useEffect(() => {
    if (introDone) return;
    const id = setTimeout(() => { setIntroDone(true); document.body.style.overflow = ""; }, 7000);
    return () => clearTimeout(id);
  }, [introDone, introKey]);

  const replay = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setIntroDone(false);
    setIntroKey(k => k + 1);
  };

  return (
    <React.Fragment>
      <ScrollProgress />

      {!introDone && (
        <Intro
          key={introKey}
          variant={t.introVariant}
          accent={t.accent}
          name={P.name}
          role={T.role}
          enterLabel={T.enter}
          photo={P.photo}
          onDone={() => setIntroDone(true)}
        />
      )}

      <div className="app-shell">
        <Nav T={T} lang={lang} setLang={setLang} />
        <Hero T={T} accent={t.accent} />
        <About T={T} />
        <Work T={T} lang={lang} />
        <Skills T={T} lang={lang} />
        <CV T={T} lang={lang} />
        <Contact T={T} />
      </div>

      {introDone && (
        <button className="replay-fab mono" onClick={replay} title={T.replay}>
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/>
          </svg>
          {T.replay}
        </button>
      )}

      <TweaksPanel>
        <TweakSection label={lang === "es" ? "Animación de entrada" : "Entrance animation"} />
        <TweakRadio
          label={lang === "es" ? "Variante" : "Variant"}
          value={t.introVariant}
          options={["liquid", "robot", "sphere", "wave"]}
          onChange={(v) => { setTweak("introVariant", v); setIntroDone(false); setIntroKey(k => k + 1); }}
        />
        <TweakButton
          label={lang === "es" ? "Reproducir intro" : "Play intro"}
          onClick={() => { setIntroDone(false); setIntroKey(k => k + 1); }}
        />
        <TweakSection label={lang === "es" ? "Apariencia" : "Appearance"} />
        <TweakColor
          label={lang === "es" ? "Color de acento" : "Accent color"}
          value={t.accent}
          options={ACCENT_OPTS}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakRadio
          label={lang === "es" ? "Idioma inicial" : "Start language"}
          value={lang}
          options={["es", "en"]}
          onChange={(v) => setLang(v)}
        />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
