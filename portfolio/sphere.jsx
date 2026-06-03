/* 3D dot sphere canvas */

const SPHERE_POINTS = (() => {
  const N = 480;
  const pts = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    pts.push([Math.cos(theta) * r, y, Math.sin(theta) * r]);
  }
  return pts;
})();

function hexToRgb(hex) {
  const m = hex.replace('#', '');
  return [parseInt(m.slice(0,2),16), parseInt(m.slice(2,4),16), parseInt(m.slice(4,6),16)];
}

function DotSphere({ mode = "hero", accent = "#2f6bff", progressRef = null, paused = false, lightTheme = false }) {
  const canvasRef = React.useRef(null);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 1.5), paused2 = false;
    const [ar, ag, ab] = hexToRgb(accent);

    function resize() {
      const rect = canvas.parentElement.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + "px"; canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement);

    const t0 = performance.now();
    let lastDraw = 0;
    const FRAME_MS = 1000 / 24; // throttle to ~24fps
    // pre-randomize start offsets for assemble effect
    const seed = SPHERE_POINTS.map(() => ({
      sx: (Math.random() - 0.5) * 3.2,
      sy: (Math.random() - 0.5) * 3.2,
      sz: (Math.random() - 0.5) * 3.2,
      d: Math.random() * 0.35
    }));

    function frame(now) {
      if (!paused && !paused2) rafRef.current = requestAnimationFrame(frame);
      else { rafRef.current = 0; return; }
      if (now - lastDraw < FRAME_MS) return; // throttle
      lastDraw = now;
      const elapsed = (now - t0) / 1000;
      ctx.clearRect(0, 0, w, h);

      // sphere geometry placement
      const cx = w / 2;
      const isHero = mode === "hero";
      // hero: sphere sits low & large (like reference); intro: centered
      const cy = isHero ? h * 1.02 : h * 0.5;
      const radius = isHero ? Math.min(w, h) * 0.62 : Math.min(w, h) * 0.34;

      const rotY = elapsed * 0.18;
      const rotX = isHero ? 0.32 : 0.5;

      // assemble progress
      let p = 1;
      if (progressRef) p = progressRef.current;
      else if (mode === "intro") p = Math.min(1, elapsed / 1.6);
      const easeP = 1 - Math.pow(1 - p, 3);

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      for (let i = 0; i < SPHERE_POINTS.length; i++) {
        let [x, y, z] = SPHERE_POINTS[i];
        const s = seed[i];
        // lerp from scattered start to sphere pos based on per-point delayed progress
        const lp = Math.max(0, Math.min(1, (easeP - s.d) / (1 - s.d)));
        const elp = 1 - Math.pow(1 - lp, 3);
        x = x * elp + s.sx * (1 - elp);
        y = y * elp + s.sy * (1 - elp);
        z = z * elp + s.sz * (1 - elp);

        // rotate Y
        let x1 = x * cosY - z * sinY;
        let z1 = x * sinY + z * cosY;
        // rotate X
        let y1 = y * cosX - z1 * sinX;
        let z2 = y * sinX + z1 * cosX;

        const depth = (z2 + 1.6) / 2.6; // 0 back .. 1 front
        const px = cx + x1 * radius;
        const py = cy + y1 * radius;

        if (py < -20 || py > h + 20) continue;

        const size = (0.5 + depth * 1.7);
        const alpha = (0.12 + depth * 0.78) * (0.4 + 0.6 * elp);

        // Light theme: blue accent dots visible on white bg
        // Dark theme: white/light dots on dark bg
        if (lightTheme) {
          const a = alpha * (0.3 + depth * 0.65);
          ctx.fillStyle = `rgba(${ar},${ag},${ab},${a})`;
        } else if (depth > 0.78) {
          ctx.fillStyle = `rgba(${180 + (255-180)*depth}, ${200 + (255-200)*depth}, 255, ${alpha})`;
        } else {
          const tint = depth * 0.5;
          ctx.fillStyle = `rgba(${Math.round(150 + ar*0.0 + tint*60)}, ${Math.round(165 + tint*60)}, ${Math.round(190 + tint*60)}, ${alpha})`;
        }
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 6.283);
        ctx.fill();
      }

      // subtle accent core glow on front
      const grad = ctx.createRadialGradient(cx, cy - radius*0.15, 0, cx, cy - radius*0.15, radius*0.9);
      grad.addColorStop(0, `rgba(${ar},${ag},${ab},${0.10*easeP})`);
      grad.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    }
    rafRef.current = requestAnimationFrame(frame);

    // pause when off-screen or tab hidden — saves CPU, prevents jank
    const io = new IntersectionObserver((es) => {
      const vis = es[0] && es[0].isIntersecting;
      paused2 = !vis;
      if (vis && !rafRef.current) rafRef.current = requestAnimationFrame(frame);
    }, { threshold: 0 });
    io.observe(canvas);
    const onVis = () => {
      paused2 = document.hidden;
      if (!document.hidden && !rafRef.current) rafRef.current = requestAnimationFrame(frame);
    };
    document.addEventListener("visibilitychange", onVis);

    return () => { cancelAnimationFrame(rafRef.current); ro.disconnect(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [mode, accent, paused]);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} />;
}

window.DotSphere = DotSphere;
window.hexToRgb = hexToRgb;
