/* Sections - Rosendo De Los Rios Moreno */

function useReveal() {
  var ref = React.useRef(null);
  React.useEffect(function() {
    var el = ref.current;
    if (!el) return;
    var io = new IntersectionObserver(function(es) {
      es.forEach(function(e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.10 });
    el.querySelectorAll(".reveal,.reveal-left,.reveal-right,.reveal-scale").forEach(function(n) { io.observe(n); });
    if (el.classList.contains("reveal") || el.classList.contains("reveal-left") ||
        el.classList.contains("reveal-right") || el.classList.contains("reveal-scale")) {
      io.observe(el);
    }
    return function() { io.disconnect(); };
  }, []);
  return ref;
}

// Extract YouTube video ID
function getYoutubeID(url) {
  if (!url) return null;
  var m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return m && m[1] ? m[1] : null;
}

// Icons
function IGithub(p) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 .5C5.7.5.5 5.7.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.3.8-.6v-2c-3.2.7-3.9-1.5-3.9-1.5-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.6 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.6-1.5 7.9-5.8 7.9-10.9C23.5 5.7 18.3.5 12 .5z"/></svg>;
}
function ILinkedin(p) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/></svg>;
}
function IMail(p) {
  return <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="m3 6 9 7 9-7"/></svg>;
}
function IArrow(p) {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" className={p && p.className}><path d="M5 12h14M13 6l6 6-6 6"/></svg>;
}
function IDownload(p) {
  return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 3v13M6 11l6 6 6-6"/><path d="M3 20h18"/></svg>;
}

// NAV
function Nav(props) {
  var T = props.T, lang = props.lang, setLang = props.setLang;
  var scrolledState = React.useState(false);
  var scrolled = scrolledState[0], setScrolled = scrolledState[1];
  var P = window.PORTFOLIO;

  React.useEffect(function() {
    function f() { setScrolled(window.scrollY > 40); }
    window.addEventListener("scroll", f, { passive: true });
    return function() { window.removeEventListener("scroll", f); };
  }, []);

  return (
    <nav className={"nav " + (scrolled ? "nav-solid" : "")}>
      <div className="wrap nav-inner">
        <a href="#top" className="nav-logo">
          RDLR<span className="nav-dot">.</span>
        </a>
        <div className="nav-links">
          <a href="#about">{T.navAbout}</a>
          <a href="#work">{T.navWork}</a>
          <a href="#skills">{T.navSkills}</a>
          <a href="#contact">{T.navContact}</a>
        </div>
        <div className="nav-right">
          <button className="lang-toggle" onClick={function() { setLang(lang === "es" ? "en" : "es"); }} title="ES / EN">
            <span className={lang === "es" ? "on" : ""}>ES</span>
            <span className="sep">/</span>
            <span className={lang === "en" ? "on" : ""}>EN</span>
          </button>
          <a className="nav-cta" href="#contact">{T.navContact} <IArrow /></a>
        </div>
      </div>
    </nav>
  );
}

// HERO
var HERO_CHIPS = ["ROS2", "FPGA", "Python", "SLAM", "C++"];

function Hero(props) {
  var T = props.T, accent = props.accent;
  var P = window.PORTFOLIO;
  return (
    <header id="top" className="hero">
      <div className="hero-sphere"><DotSphere mode="hero" accent={accent} lightTheme={true} /></div>
      <div className="hero-fade" />
      <div className="hero-chips">
        {HERO_CHIPS.map(function(chip) {
          return (
            <div key={chip} className="hero-chip glass">
              <span className="sdot" />{chip}
            </div>
          );
        })}
      </div>
      <div className="wrap hero-inner">
        <div className="hero-badge mono"><span className="pulse" /> {T.heroBadge}</div>
        <h1 className="hero-title">
          <span className="line">{T.heroTitle1}</span>
          <span className="line">{T.heroTitle2}</span>
        </h1>
        <p className="hero-sub">{T.heroSub}</p>
        <div className="hero-cta">
          <a className="btn btn-primary" href="#work">{T.ctaWork}</a>
          <a className="btn btn-ghost" href="#contact">{T.ctaContact}</a>
        </div>
        <div className="hero-meta mono">
          <span>{P.name}</span><span className="meta-sep">/</span><span>{T.role}</span>
        </div>
      </div>
      <div className="scroll-hint mono"><span>SCROLL</span><span className="scroll-bar"><span /></span></div>
    </header>
  );
}

// ABOUT
function About(props) {
  var T = props.T;
  var ref = useReveal();
  var P = window.PORTFOLIO;
  return (
    <section id="about" className="section about" ref={ref}>
      <div className="wrap about-grid">
        <div className="about-left reveal-left">
          <div className="kicker">{T.aboutKicker}</div>
          <h2 className="about-title">
            {T.aboutTitle.split("\n").map(function(l,i) { return <span key={i} className="block">{l}</span>; })}
          </h2>
        </div>
        <div className="about-right">
          {T.aboutBody.split("\n\n").map(function(p,i) {
            return <p key={i} className="about-p reveal" style={{ transitionDelay: (i * 0.1) + "s" }}>{p}</p>;
          })}
          <div className="about-stats">
            <div className="stat glass reveal" style={{ transitionDelay: "0.22s" }}>
              <div className="stat-num">6+</div>
              <div className="stat-lbl mono">{T.stat1}</div>
            </div>
            <div className="stat glass reveal" style={{ transitionDelay: "0.30s" }}>
              <div className="stat-num">3+</div>
              <div className="stat-lbl mono">{T.stat2}</div>
            </div>
            <div className="stat glass reveal" style={{ transitionDelay: "0.38s" }}>
              <div className="stat-num">20+</div>
              <div className="stat-lbl mono">{T.stat3}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// WORK
function ProjectCard(props) {
  var p = props.p, lang = props.lang, T = props.T, i = props.i;
  var hoverState = React.useState(false);
  var hover = hoverState[0], setHover = hoverState[1];
  var titleText = lang === "es" ? p.title.es : p.title.en;

  return (
    <React.Fragment>
      <div className="proj glass reveal"
           style={{ transitionDelay: (i * 0.08) + "s" }}
           onMouseEnter={function() { setHover(true); }}
           onMouseLeave={function() { setHover(false); }}>
        <div className="proj-top">
          <span className="proj-index mono">{p.year}</span>
          <span className="proj-tag mono">{lang === "es" ? p.tag_es : p.tag_en}</span>
        </div>
        <div className="proj-visual">
          {p.image
            ? <img src={p.image} className="proj-visual-img" alt={titleText} />
            : <span className="proj-placeholder mono">{titleText.slice(0, 28).toUpperCase()}</span>
          }
          <div className="proj-grid-bg" />
          <div className="proj-visual-accent" />
        </div>
        <h3 className="proj-title">{titleText}</h3>
        <p className="proj-desc">{lang === "es" ? p.es : p.en}</p>
        <div className="proj-stack">
          {p.stack.map(function(s) { return <span key={s} className="chip mono">{s}</span>; })}
        </div>
        <div className="proj-links">
          {p.repo && <a href={p.repo} target="_blank" rel="noopener" className={"proj-link mono " + (hover ? "on" : "")}>{T.viewRepo} <IArrow /></a>}
          {p.paper && <a href={p.paper} target="_blank" rel="noopener" className={"proj-link mono " + (hover ? "on" : "")}>Paper <IArrow /></a>}
          {p.video && <a href={p.video} target="_blank" rel="noopener" className={"proj-link mono " + (hover ? "on" : "")}>Video <IArrow /></a>}
        </div>
      </div>

    </React.Fragment>
  );
}

function Work(props) {
  var T = props.T, lang = props.lang;
  var ref = useReveal();
  var P = window.PORTFOLIO;
  return (
    <section id="work" className="section work" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <div className="kicker reveal">{T.workKicker}</div>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.08s" }}>{T.workTitle}</h2>
          <p className="section-sub reveal" style={{ transitionDelay: "0.16s" }}>{T.workSub}</p>
        </div>
        <div className="proj-grid">
          {P.projects.map(function(p,i) { return <ProjectCard key={p.index} p={p} lang={lang} T={T} i={i} />; })}
        </div>
      </div>
    </section>
  );
}

// SKILLS
function Skills(props) {
  var T = props.T, lang = props.lang;
  var ref = useReveal();
  var P = window.PORTFOLIO;
  return (
    <section id="skills" className="section skills" ref={ref}>
      <div className="wrap">
        <div className="section-head">
          <div className="kicker reveal">{T.skillsKicker}</div>
          <h2 className="section-title reveal" style={{ transitionDelay: "0.08s" }}>{T.skillsTitle}</h2>
          <p className="section-sub reveal" style={{ transitionDelay: "0.16s" }}>{T.skillsSub}</p>
        </div>
        <div className="skills-grid">
          {P.skills.map(function(g,i) {
            return (
              <div key={i} className="skill-group glass reveal" style={{ transitionDelay: (i * 0.07) + "s" }}>
                <div className="skill-group-head">
                  <span className="mono skill-idx">0{i+1}</span>
                  <h3 className="skill-group-title">{lang === "es" ? g.es : g.en}</h3>
                </div>
                <div className="skill-items">
                  {g.items.map(function(it) {
                    var text = lang === "es" ? it.es : it.en;
                    return <span key={it.en} className="skill-chip"><span className="sdot" />{text}</span>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// CV
function CV(props) {
  var T = props.T, lang = props.lang;
  var ref = useReveal();
  var P = window.PORTFOLIO;
  var has = !!P.cvFile;
  var cvUrl = has ? (lang === "es" ? P.cvFile.es : P.cvFile.en) : null;
  return (
    <section id="cv" className="section cv" ref={ref}>
      <div className="wrap">
        <div className="cv-card glass reveal-scale">
          <div className="cv-left">
            <div className="kicker">{T.cvKicker}</div>
            <h2 className="cv-title">{T.cvTitle}</h2>
            <p className="cv-body">{T.cvBody}</p>
            {has
              ? <a className="btn btn-accent" href={cvUrl} download><IDownload />{T.cvBtn}</a>
              : <div className="cv-note mono">{T.cvNote}</div>}
          </div>
          <div className="cv-doc" aria-hidden="true">
            <div className="cv-doc-inner">
              <div className="cv-line w60" /><div className="cv-line w40" />
              <div className="cv-gap" />
              <div className="cv-line w90" /><div className="cv-line w80" /><div className="cv-line w70" />
              <div className="cv-gap" />
              <div className="cv-line w85" /><div className="cv-line w50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// CONTACT
function Contact(props) {
  var T = props.T;
  var ref = useReveal();
  var P = window.PORTFOLIO;
  return (
    <section id="contact" className="section contact" ref={ref}>
      <div className="wrap">
        <div className="contact-grid">
          <div className="contact-left reveal-left">
            <div className="kicker">{T.contactKicker}</div>
            <h2 className="contact-title">
              {T.contactTitle.split("\n").map(function(l,i) { return <span key={i} className="block">{l}</span>; })}
            </h2>
            <p className="contact-body">{T.contactBody}</p>
            <a className="btn btn-accent contact-mail-btn" href={"mailto:" + P.email}>
              <IMail /> {T.contactEmail}
            </a>
          </div>
          <div className="contact-right">
            <a className="link-card glass reveal" href={P.github} target="_blank" rel="noopener">
              <span className="lc-icon"><IGithub /></span>
              <span className="lc-text">
                <span className="lc-label mono">GITHUB</span>
                <span className="lc-handle">@{P.githubUser}</span>
              </span>
              <IArrow className="lc-arrow" />
            </a>
            <a className="link-card glass reveal" href={P.linkedin} target="_blank" rel="noopener" style={{ transitionDelay: "0.07s" }}>
              <span className="lc-icon"><ILinkedin /></span>
              <span className="lc-text">
                <span className="lc-label mono">LINKEDIN</span>
                <span className="lc-handle">/delosriosrosendo</span>
              </span>
              <IArrow className="lc-arrow" />
            </a>
            <a className="link-card glass reveal" href={"mailto:" + P.email} style={{ transitionDelay: "0.14s" }}>
              <span className="lc-icon"><IMail /></span>
              <span className="lc-text">
                <span className="lc-label mono">EMAIL</span>
                <span className="lc-handle">{P.email}</span>
              </span>
              <IArrow className="lc-arrow" />
            </a>
          </div>
        </div>
        <footer className="footer">
          <span className="mono">&copy; {new Date().getFullYear()} {P.name}</span>
          <span className="mono footer-tag">{T.footer}</span>
        </footer>
      </div>
    </section>
  );
}

Object.assign(window, { Nav: Nav, Hero: Hero, About: About, Work: Work, Skills: Skills, CV: CV, Contact: Contact, useReveal: useReveal });
