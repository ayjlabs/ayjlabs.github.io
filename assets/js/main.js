(function () {
  "use strict";

  var DATA = window.AYJ;
  var PROJECTS = DATA.projects;
  var PARTS = DATA.parts;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reference designators: P01 = first video ever uploaded.
  PROJECTS.forEach(function (p, i) {
    p.ref = "P" + String(PROJECTS.length - i).padStart(2, "0");
  });
  var bySlug = {};
  PROJECTS.forEach(function (p) { bySlug[p.slug] = p; });

  /* ---------------------------------------------------------------- utils */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function compact(n) {
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 1 : 2).replace(/\.?0+$/, "") + "M";
    if (n >= 1e5) return Math.round(n / 1e3) + "K";
    if (n >= 1e3) return (n / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }
  var MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  function monthYear(iso) { var d = iso.split("-"); return MONTHS[+d[1] - 1] + " " + d[0]; }
  function fullDate(iso) { var d = iso.split("-"); return +d[2] + " " + MONTHS[+d[1] - 1] + " " + d[0]; }
  function thumb(id) { return "https://i.ytimg.com/vi/" + id + "/hqdefault.jpg"; }
  function store(key, val) {
    try {
      if (val === undefined) return JSON.parse(localStorage.getItem(key) || "null");
      localStorage.setItem(key, JSON.stringify(val));
    } catch (e) { return null; }
  }
  var PLAY_SVG = '<span class="play" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';
  var SCH_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 12h4l1.5-4 3 8 3-8 3 8 1.5-4h4"/></svg>';
  var CHECK_SVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 5 5 9-10"/></svg>';

  /* ----------------------------------------------------- schematic symbols */
  var SYM = {
    ic: '<rect x="7" y="4" width="10" height="16" rx="1"/><path d="M4 7h3M4 10.5h3M4 14h3M4 17.5h3M17 7h3M17 10.5h3M17 14h3M17 17.5h3M11 4a1 1 0 0 0 2 0"/>',
    npn: '<circle cx="13" cy="12" r="8"/><path d="M3 12h7M10 7.5v9M10 10l5-4V3M10 14l5 4v3M12.6 17.9l2.4.1-.9-2.2"/>',
    pnp: '<circle cx="13" cy="12" r="8"/><path d="M3 12h7M10 7.5v9M10 10l5-4V3M10 14l5 4v3M12.3 13.9l-2.3.1 1.2 2"/>',
    led: '<path d="M2 13h6M16 13h6M8 8l8 5-8 5zM16 8v10M12 6l3-3M15 7l3-3M13 3h2v2M16 4h2v2"/>',
    diode: '<path d="M2 12h6M16 12h6M8 7l8 5-8 5zM16 7v10"/>',
    ldr: '<circle cx="13" cy="14" r="7"/><path d="M2 14h4M20 14h2M8 14l1-2.5 2 5 2-5 2 5 1-2.5M3 3l4 4M7 3l4 4M7 5v2H5M11 5v2H9"/>',
    resistor: '<path d="M2 12h4l1.5-4 3 8 3-8 3 8 1.5-4h4"/>',
    pot: '<path d="M2 13h4l1.5-4 3 8 3-8 3 8 1.5-4h4M6 21 18 5M18 5h-3.5M18 5v3.5"/>',
    capacitor: '<path d="M2 12h8M14 12h8M10 5v14M14 5v14"/>',
    switch: '<circle cx="7" cy="15" r="1.3"/><circle cx="17" cy="15" r="1.3"/><path d="M2 15h3.7M18.3 15H22M8 14.3l9-5.3"/>',
    battery: '<path d="M2 12h5M17 12h5M7 5v14M10 9v6M14 5v14M17 9v6"/>',
    breadboard: '<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M3 12h18M6.5 8.5h0M9.5 8.5h0M12.5 8.5h0M15.5 8.5h0M18 8.5h0M6.5 15.5h0M9.5 15.5h0M12.5 15.5h0M15.5 15.5h0M18 15.5h0" stroke-width="2"/>',
    wire: '<path d="M2 17c4 0 4-10 8-10s4 10 8 10c2 0 3-2 4-3"/>',
    mic: '<circle cx="14" cy="12" r="6.5"/><path d="M7.5 5v14M2 12h5.5"/>',
    ir: '<path d="M8 21V11a5 5 0 0 1 10 0v10zM11 21v2M13 21v2M15 21v2M3 5c1.2 1.2 1.2 3.8 0 5M5.5 3c2.2 2.4 2.2 7.6 0 10"/>',
    buzzer: '<path d="M3 9h4l5-4v14l-5-4H3zM15.5 9a4 4 0 0 1 0 6M18.5 6a8 8 0 0 1 0 12"/>',
    laser: '<rect x="2" y="8.5" width="9" height="7" rx="1"/><path d="M11 12h2.5M15.5 12H18M20 12h2M19 7l2-2M19 17l2 2"/>',
    relay: '<rect x="3" y="6" width="7" height="12"/><path d="M3 18 10 6M10 12h3M13 17h2.5l5-5M20 17h2"/>'
  };
  function sym(name) { return '<svg viewBox="0 0 24 24" aria-hidden="true">' + (SYM[name] || SYM.ic) + "</svg>"; }

  var SHORT = { MIC: "Mic", BUZZER: "Buzzer", LASER: "Laser", RELAY: "Relay", POT: "Pot", LDR: "LDR", TSOP1738: "TSOP1738" };
  var KEY_GROUPS = { ICs: 1, Transistors: 1, "Sensors & outputs": 1 };
  function keyParts(p) {
    var seen = {}, out = [];
    (p.parts || []).forEach(function (it) {
      var k = it.k, def = k && PARTS[k];
      if (!def || seen[k] || !KEY_GROUPS[def.group] || k === "LED") return;
      seen[k] = 1;
      out.push({ k: k, label: SHORT[k] || k, ic: def.group === "ICs" });
    });
    out.sort(function (a, b) { return b.ic - a.ic; });
    return out.slice(0, 3);
  }

  /* ------------------------------------------------------------------ nav */
  var nav = $("#nav"), toggle = $("#nav-toggle"), links = $("#nav-links");
  toggle.addEventListener("click", function () {
    var open = toggle.getAttribute("aria-expanded") !== "true";
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    links.classList.toggle("is-open", open);
  });
  links.addEventListener("click", function (e) {
    if (e.target.closest("a")) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Open menu");
      links.classList.remove("is-open");
    }
  });
  function onScroll() { nav.classList.toggle("is-scrolled", window.scrollY > 8); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if ("IntersectionObserver" in window) {
    var navLinks = Array.prototype.slice.call(links.querySelectorAll("a"));
    var secObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        navLinks.forEach(function (a) { a.classList.toggle("is-active", a.getAttribute("href") === "#" + en.target.id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    ["shorts", "projects", "diagrams", "parts", "about"].forEach(function (id) { secObs.observe(document.getElementById(id)); });
  }

  /* ------------------------------------------------ hero: live PCB traces */
  (function traces() {
    var canvas = $("#traces");
    if (!canvas || !canvas.getContext) return;
    var ctx = canvas.getContext("2d");
    var G = 22;
    var DIRS = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]];
    var W = 0, H = 0, dpr = 1, paths = [], pulses = [], layer = null, running = false, visible = true, last = 0, raf = 0;

    function rnd(n) { return Math.floor(Math.random() * n); }

    function build() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = canvas.clientWidth; H = canvas.clientHeight;
      if (!W || !H) return;
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
      var cols = Math.ceil(W / G) + 1, rows = Math.ceil(H / G) + 1;
      var occ = new Uint8Array(cols * rows);
      var target = Math.round((cols * rows) / 26), tries = 0;
      paths = [];
      while (paths.length < target && tries++ < target * 10) {
        var x = rnd(cols), y = rnd(rows);
        if (occ[y * cols + x]) continue;
        var d = rnd(4) * 2, pts = [[x, y]], len = 5 + rnd(20);
        occ[y * cols + x] = 1;
        for (var i = 0; i < len; i++) {
          var diag = d % 2 === 1;
          if (Math.random() < (diag ? 0.45 : 0.14)) d = (d + (Math.random() < 0.5 ? 1 : 7)) % 8;
          var nx = x + DIRS[d][0], ny = y + DIRS[d][1];
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows || occ[ny * cols + nx]) break;
          if (d % 2 === 1 && occ[y * cols + nx] && occ[ny * cols + x]) break; // don't cross a diagonal
          x = nx; y = ny; occ[y * cols + x] = 1; pts.push([x, y]);
        }
        if (pts.length < 4) continue;
        // keep only corner points, convert to px, precompute cumulative length
        var poly = [pts[0]];
        for (var j = 1; j < pts.length - 1; j++) {
          var a = pts[j - 1], b = pts[j], c = pts[j + 1];
          if (b[0] - a[0] !== c[0] - b[0] || b[1] - a[1] !== c[1] - b[1]) poly.push(b);
        }
        poly.push(pts[pts.length - 1]);
        var P = poly.map(function (p) { return [p[0] * G + 0.5, p[1] * G + 0.5]; });
        var cum = [0];
        for (var k = 1; k < P.length; k++) cum.push(cum[k - 1] + Math.hypot(P[k][0] - P[k - 1][0], P[k][1] - P[k - 1][1]));
        paths.push({ p: P, cum: cum, len: cum[cum.length - 1], amber: Math.random() < 0.22, flash: 0 });
      }
      // draw static board once
      layer = document.createElement("canvas");
      layer.width = canvas.width; layer.height = canvas.height;
      var l = layer.getContext("2d");
      l.scale(dpr, dpr);
      l.lineCap = "round"; l.lineJoin = "round";
      paths.forEach(function (t) {
        l.strokeStyle = t.amber ? "rgba(255,195,77,0.16)" : "rgba(62,224,255,0.13)";
        l.lineWidth = 1.6;
        l.beginPath();
        t.p.forEach(function (pt, i) { i ? l.lineTo(pt[0], pt[1]) : l.moveTo(pt[0], pt[1]); });
        l.stroke();
        [t.p[0], t.p[t.p.length - 1]].forEach(function (pt) {
          l.beginPath(); l.arc(pt[0], pt[1], 3.2, 0, Math.PI * 2);
          l.fillStyle = "#05080d"; l.fill();
          l.strokeStyle = t.amber ? "rgba(255,195,77,0.35)" : "rgba(62,224,255,0.3)"; l.lineWidth = 1.4; l.stroke();
        });
      });
      pulses = [];
      var n = Math.max(6, Math.round(paths.length / 7));
      for (var q = 0; q < n; q++) spawn(true);
      draw(0);
    }

    function spawn(randomStart) {
      if (!paths.length) return;
      var t = paths[rnd(paths.length)];
      pulses.push({ t: t, s: randomStart ? Math.random() * t.len : 0, v: 50 + Math.random() * 90, tail: 30 + Math.random() * 40 });
    }

    function at(t, s) {
      var c = t.cum, i = 1;
      while (i < c.length - 1 && c[i] < s) i++;
      var a = t.p[i - 1], b = t.p[i], seg = c[i] - c[i - 1] || 1, f = Math.max(0, Math.min(1, (s - c[i - 1]) / seg));
      return [a[0] + (b[0] - a[0]) * f, a[1] + (b[1] - a[1]) * f, i];
    }

    function draw(dt) {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (layer) ctx.drawImage(layer, 0, 0);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = "round"; ctx.lineJoin = "round";
      for (var i = pulses.length - 1; i >= 0; i--) {
        var pu = pulses[i], t = pu.t;
        pu.s += pu.v * dt;
        if (pu.s - pu.tail > t.len) { t.flash = 1; pulses.splice(i, 1); spawn(false); continue; }
        var s0 = Math.max(0, pu.s - pu.tail), s1 = Math.min(t.len, pu.s);
        var A = at(t, s0), B = at(t, s1);
        var col = t.amber ? "255,195,77" : "62,224,255";
        var g = ctx.createLinearGradient(A[0], A[1], B[0], B[1]);
        g.addColorStop(0, "rgba(" + col + ",0)");
        g.addColorStop(1, "rgba(" + col + ",0.95)");
        ctx.strokeStyle = g; ctx.lineWidth = 2;
        ctx.shadowColor = "rgba(" + col + ",0.9)"; ctx.shadowBlur = 8;
        ctx.beginPath(); ctx.moveTo(A[0], A[1]);
        for (var k = A[2]; k < B[2]; k++) ctx.lineTo(t.p[k][0], t.p[k][1]);
        ctx.lineTo(B[0], B[1]); ctx.stroke();
        if (pu.s <= t.len) {
          ctx.beginPath(); ctx.arc(B[0], B[1], 1.8, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(255,255,255,0.9)"; ctx.fill();
        }
      }
      ctx.shadowBlur = 0;
      paths.forEach(function (t) {
        if (t.flash <= 0) return;
        var e = t.p[t.p.length - 1], col = t.amber ? "255,195,77" : "62,224,255";
        ctx.beginPath(); ctx.arc(e[0], e[1], 3.2 + (1 - t.flash) * 6, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(" + col + "," + (0.7 * t.flash) + ")"; ctx.lineWidth = 1.5; ctx.stroke();
        ctx.beginPath(); ctx.arc(e[0], e[1], 2.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(" + col + "," + t.flash + ")"; ctx.fill();
        t.flash = Math.max(0, t.flash - dt * 1.6);
      });
    }

    function frame(now) {
      if (!running) return;
      var dt = last ? Math.min(0.05, (now - last) / 1000) : 0;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduceMotion || !visible || document.hidden) return;
      running = true; last = 0; raf = requestAnimationFrame(frame);
    }
    function stop() { running = false; cancelAnimationFrame(raf); }

    var lastW = 0, lastH = 0, rt = 0;
    function onResize() {
      var w = canvas.clientWidth, h = canvas.clientHeight;
      if (Math.abs(w - lastW) < 2 && Math.abs(h - lastH) < 60) return;
      lastW = w; lastH = h;
      clearTimeout(rt);
      rt = setTimeout(function () { build(); }, 120);
    }
    if ("ResizeObserver" in window) new ResizeObserver(onResize).observe(canvas);
    else window.addEventListener("resize", onResize);
    lastW = canvas.clientWidth; lastH = canvas.clientHeight;
    build();

    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (en) {
        visible = en[0].isIntersecting;
        visible ? start() : stop();
      }).observe(canvas);
    }
    document.addEventListener("visibilitychange", function () { document.hidden ? stop() : start(); });
    start();
  })();

  /* ------------------------------------------------------ hero readout */
  (function readout() {
    var dds = document.querySelectorAll("#readout dd[data-count]");
    if (reduceMotion) return;
    var t0 = null, dur = 1400;
    function fmt(n, target) { return target >= 1000 ? compact(n) : String(Math.round(n)); }
    function tick(now) {
      if (!t0) t0 = now;
      var k = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - k, 3);
      dds.forEach(function (dd) {
        var target = +dd.getAttribute("data-count");
        dd.textContent = k < 1 ? fmt(Math.round(target * e), target) : fmt(target, target);
      });
      if (k < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* -------------------------------------------------------------- shorts */
  (function shorts() {
    var rail = $("#shorts-rail"), list = (DATA.shorts || []).slice(0, 8);
    if (!rail) return;
    function faceHTML(s, i) {
      return '<button type="button" class="short__face" aria-label="Play Short: ' + esc(s.title) + '">' +
        '<img src="https://i.ytimg.com/vi/' + s.id + '/oar2.jpg" alt="" loading="lazy" width="405" height="720">' +
        (i === 0 ? '<span class="badge badge--ref">Latest</span>' : "") +
        '<span class="badge badge--len">' + esc(s.length) + "</span>" + PLAY_SVG + "</button>";
    }
    rail.innerHTML = list.map(function (s, i) {
      var p = s.project && bySlug[s.project];
      return '<article class="short" data-i="' + i + '"><div class="short__frame">' + faceHTML(s, i) + "</div>" +
        '<div class="short__cap">' + (s.topic ? '<span class="short__topic">' + esc(s.topic) + "</span>" : "") +
        '<h3 class="short__title">' + esc(s.title) + '</h3><span class="short__date">' + monthYear(s.date) + "</span></div>" +
        (p ? '<a class="short__link" href="#project/' + p.slug + '">Build it: ' + esc(p.title) + " →</a>" : "") + "</article>";
    }).join("") +
      '<a class="short short--more" href="' + DATA.channel.subscribe + '" target="_blank" rel="noopener"><span class="short__frame">' +
      '<svg class="short__lamp" aria-hidden="true"><use href="#lamp"/></svg>' +
      '<span class="short__more-title">More Shorts on the way</span>' +
      '<span class="short__more-sub">Subscribe so you don’t miss the next one ↗</span></span></a>';
    // portrait thumbnail missing? fall back to the regular one
    rail.addEventListener("error", function (e) {
      var img = e.target;
      if (img.tagName === "IMG" && img.src.indexOf("/oar2.jpg") > -1) img.src = img.src.replace("/oar2.jpg", "/hq720.jpg");
    }, true);
    rail.addEventListener("click", function (e) {
      var face = e.target.closest(".short__face");
      if (!face) return;
      // only one Short plays at a time
      rail.querySelectorAll(".short.is-playing").forEach(function (el) {
        var j = +el.getAttribute("data-i");
        el.classList.remove("is-playing");
        el.querySelector(".short__frame").innerHTML = faceHTML(list[j], j);
      });
      var card = face.closest(".short"), s = list[+card.getAttribute("data-i")];
      card.classList.add("is-playing");
      card.querySelector(".short__frame").innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + s.id +
        '?autoplay=1&rel=0&playsinline=1" title="' + esc(s.title) +
        '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
    });
  })();

  /* ------------------------------------------------------------ projects */
  var state = { cat: "all", q: "", sort: "new", part: null };
  var grid = $("#grid"), chipsEl = $("#chips"), empty = $("#empty"), note = $("#filter-note");
  var currentList = PROJECTS.slice();

  function renderChips() {
    var cats = [{ id: "all", label: "All" }].concat(DATA.categories);
    chipsEl.innerHTML = cats.map(function (c) {
      var n = c.id === "all" ? PROJECTS.length : PROJECTS.filter(function (p) { return p.cats.indexOf(c.id) > -1; }).length;
      return '<button class="chip" data-cat="' + c.id + '" aria-pressed="' + (state.cat === c.id) + '">' +
        esc(c.label) + ' <span class="n">' + n + "</span></button>";
    }).join("");
  }
  chipsEl.addEventListener("click", function (e) {
    var b = e.target.closest(".chip");
    if (!b) return;
    state.cat = b.getAttribute("data-cat");
    chipsEl.querySelectorAll(".chip").forEach(function (c) { c.setAttribute("aria-pressed", String(c === b)); });
    renderGrid();
  });

  function matches(p) {
    if (state.cat !== "all" && p.cats.indexOf(state.cat) < 0) return false;
    if (state.part && !(p.parts || []).some(function (it) { return it.k === state.part; })) return false;
    if (!state.q) return true;
    var hay = [p.title, p.summary, p.ref].concat((p.parts || []).map(function (it) { return it.n + " " + (it.k || ""); }))
      .concat(p.cats.map(function (c) { var d = DATA.categories.filter(function (x) { return x.id === c; })[0]; return d ? d.label : c; }))
      .join(" ").toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) > -1; });
  }

  function cardHTML(p, i) {
    var pins = keyParts(p).map(function (k) { return '<span class="pin' + (k.ic ? " pin--ic" : "") + '">' + esc(k.label) + "</span>"; }).join("");
    return '<a class="card" href="#project/' + p.slug + '" style="animation-delay:' + Math.min(i, 12) * 30 + 'ms">' +
      '<div class="card__thumb">' +
        '<img src="' + thumb(p.id) + '" alt="" loading="lazy" width="480" height="360">' +
        '<span class="badge badge--ref">' + p.ref + "</span>" +
        (p.diagram ? '<span class="badge badge--sch" title="Circuit diagram available">' + SCH_SVG + "Schematic</span>" : "") +
        '<span class="badge badge--len">' + p.length + "</span>" + PLAY_SVG +
      "</div>" +
      '<div class="card__body">' +
        '<h3 class="card__title">' + esc(p.title) + "</h3>" +
        '<div class="card__meta"><span><b>' + compact(p.views) + "</b> views</span><span>" + monthYear(p.date) + "</span></div>" +
        (pins ? '<div class="card__parts">' + pins + "</div>" : "") +
      "</div></a>";
  }

  function renderGrid() {
    var list = PROJECTS.filter(matches);
    if (state.sort === "views") list.sort(function (a, b) { return b.views - a.views; });
    else if (state.sort === "old") list.reverse();
    currentList = list;
    grid.innerHTML = list.map(cardHTML).join("");
    empty.hidden = list.length > 0;
    if (state.part) {
      note.hidden = false;
      note.innerHTML = "Showing projects that use <strong>" + esc(PARTS[state.part].label) + '</strong> <button class="linkbtn" id="clear-part">Clear</button>';
    } else {
      note.hidden = true;
    }
  }
  note.addEventListener("click", function (e) {
    if (e.target.id === "clear-part") { state.part = null; renderGrid(); }
  });

  var searchEl = $("#search"), st = 0;
  searchEl.addEventListener("input", function () {
    clearTimeout(st);
    st = setTimeout(function () { state.q = searchEl.value.trim(); renderGrid(); }, 120);
  });
  $("#sort").addEventListener("change", function (e) { state.sort = e.target.value; renderGrid(); });
  $("#clear-filters").addEventListener("click", function () {
    state = { cat: "all", q: "", sort: state.sort, part: null };
    searchEl.value = "";
    renderChips(); renderGrid();
  });

  /* ------------------------------------------------------------ diagrams */
  var DIAGRAMS = PROJECTS.filter(function (p) { return p.diagram; });
  $("#dgrid").innerHTML = DIAGRAMS.map(function (p, i) {
    return '<button class="dcard" data-slug="' + p.slug + '" style="animation-delay:' + i * 40 + 'ms" aria-label="Open circuit diagram: ' + esc(p.title) + '">' +
      '<span class="bp is-blue"><img src="' + p.diagram.src + '" alt="Circuit diagram for ' + esc(p.title) + '" loading="lazy" width="' + p.diagram.w + '" height="' + p.diagram.h + '"></span>' +
      '<span class="dcard__body"><span class="dcard__title">' + esc(p.title) + '</span><span class="dcard__date">' + monthYear(p.diagram.posted) + "</span></span>" +
      "</button>";
  }).join("");
  $("#dgrid").addEventListener("click", function (e) {
    var b = e.target.closest(".dcard");
    if (b) openLightbox(bySlug[b.getAttribute("data-slug")]);
  });

  /* ----------------------------------------------------------- parts bin */
  (function bins() {
    var uses = {};
    PROJECTS.forEach(function (p) {
      (p.parts || []).forEach(function (it) {
        if (!it.k) return;
        (uses[it.k] = uses[it.k] || {})[p.slug] = 1;
      });
    });
    var groups = [];
    Object.keys(PARTS).forEach(function (k) {
      if (!uses[k]) return;
      var g = PARTS[k].group, grp = groups.filter(function (x) { return x.name === g; })[0];
      if (!grp) groups.push(grp = { name: g, items: [] });
      grp.items.push({ k: k, n: Object.keys(uses[k]).length });
    });
    $("#bins").innerHTML = groups.map(function (g) {
      g.items.sort(function (a, b) { return b.n - a.n; });
      return '<div class="bin"><h3>' + esc(g.name) + '</h3><div class="bin__row">' +
        g.items.map(function (it) {
          var d = PARTS[it.k];
          return '<button class="part" data-part="' + it.k + '"><span class="part__sym">' + sym(d.sym) + "</span>" +
            '<span><span class="part__name">' + esc(d.label) + '</span><span class="part__n">' + it.n + " project" + (it.n > 1 ? "s" : "") + "</span></span></button>";
        }).join("") + "</div></div>";
    }).join("");
    $("#bins").addEventListener("click", function (e) {
      var b = e.target.closest(".part");
      if (!b) return;
      state.part = b.getAttribute("data-part");
      state.cat = "all"; state.q = ""; searchEl.value = "";
      renderChips(); renderGrid();
      document.getElementById("projects").scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    });
  })();

  /* ------------------------------------------------------ dialog helpers */
  function syncBodyLock() {
    var any = document.querySelector("dialog[open]");
    document.body.classList.toggle("has-dialog", !!any);
  }
  function showDialog(d) {
    if (d.open) return;
    if (typeof d.showModal === "function") d.showModal(); else d.setAttribute("open", "");
    syncBodyLock();
  }
  function hideDialog(d) {
    if (!d.open) return;
    if (typeof d.close === "function") d.close(); else d.removeAttribute("open");
    syncBodyLock();
  }

  /* --------------------------------------------------------------- modal */
  var modal = $("#modal"), current = null, openedInPage = false;

  function playerHTML(p) {
    return '<button type="button" aria-label="Play video: ' + esc(p.title) + '"><img src="' + thumb(p.id) + '" alt="">' + PLAY_SVG + "</button>";
  }
  $("#m-player").addEventListener("click", function (e) {
    var b = e.target.closest("button");
    if (!b || !current) return;
    this.innerHTML = '<iframe src="https://www.youtube-nocookie.com/embed/' + current.id + '?autoplay=1&rel=0" title="' + esc(current.title) +
      '" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>';
  });

  function bomHTML(p) {
    if (!p.parts || !p.parts.length) {
      return '<h3>Things you need</h3><p class="none">No parts list for this one — watch the video for the full walkthrough.</p>';
    }
    var saved = store("ayj-bom-" + p.slug) || [];
    return '<h3>Things you need <span class="count">' + p.parts.length + " items</span></h3><ul>" +
      p.parts.map(function (it, i) {
        return '<li><label><input type="checkbox" data-i="' + i + '"' + (saved.indexOf(i) > -1 ? " checked" : "") + '><span class="box">' + CHECK_SVG + "</span>" +
          '<span class="txt">' + esc(it.n) + "</span>" + (it.q > 1 ? '<span class="qty">×' + it.q + "</span>" : "") + "</label></li>";
      }).join("") + "</ul>" +
      '<div class="bom__foot"><span id="bom-progress"></span><button class="linkbtn" id="bom-reset">Reset</button></div>';
  }
  function bomProgress() {
    var boxes = modal.querySelectorAll(".bom input");
    var n = 0; boxes.forEach(function (b) { if (b.checked) n++; });
    var el = $("#bom-progress");
    if (el) el.textContent = n === boxes.length && n ? "All parts ready ⚡" : n + " / " + boxes.length + " collected";
  }
  $("#m-bom").addEventListener("change", function () {
    if (!current) return;
    var on = [];
    modal.querySelectorAll(".bom input").forEach(function (b) { if (b.checked) on.push(+b.getAttribute("data-i")); });
    store("ayj-bom-" + current.slug, on);
    bomProgress();
  });
  $("#m-bom").addEventListener("click", function (e) {
    if (e.target.id !== "bom-reset" || !current) return;
    modal.querySelectorAll(".bom input").forEach(function (b) { b.checked = false; });
    store("ayj-bom-" + current.slug, []);
    bomProgress();
  });

  function fillModal(p) {
    current = p;
    $("#m-ref").textContent = p.ref + " · " + p.cats.map(function (c) { return DATA.categories.filter(function (x) { return x.id === c; })[0].label; }).join(" · ");
    $("#m-title").textContent = p.title;
    $("#m-meta").innerHTML =
      "<span><b>" + p.views.toLocaleString("en-US") + "</b> views</span>" +
      "<span><b>" + p.likes.toLocaleString("en-US") + "</b> likes</span>" +
      "<span>" + p.length + "</span>" +
      "<span>" + fullDate(p.date) + "</span>";
    $("#m-player").innerHTML = playerHTML(p);
    $("#m-summary").textContent = p.summary;
    $("#m-notes").innerHTML = (p.notes || []).map(function (n) { return '<p class="note"><span>' + n + "</span></p>"; }).join("");
    $("#m-diagram").innerHTML = p.diagram
      ? '<h3>Circuit diagram</h3><button type="button" aria-label="Enlarge circuit diagram"><span class="bp is-blue"><img src="' + p.diagram.src + '" alt="Circuit diagram for ' + esc(p.title) + '" width="' + p.diagram.w + '" height="' + p.diagram.h + '"></span></button>' +
        '<figcaption>Posted on Facebook, ' + fullDate(p.diagram.posted) + ' · <a href="' + p.diagram.fb + '" target="_blank" rel="noopener">View post ↗</a></figcaption>'
      : "";
    $("#m-bom").innerHTML = bomHTML(p);
    bomProgress();
    $("#m-yt").href = "https://www.youtube.com/watch?v=" + p.id;
    var body = modal.querySelector(".modal__body");
    if (body) body.scrollTop = 0;
  }
  $("#m-diagram").addEventListener("click", function (e) {
    if (e.target.closest("button") && current) openLightbox(current);
  });

  function neighbours() {
    var list = currentList.some(function (p) { return p === current; }) ? currentList : PROJECTS;
    var i = list.indexOf(current);
    return { prev: list[(i - 1 + list.length) % list.length], next: list[(i + 1) % list.length] };
  }
  function step(dir) {
    var n = neighbours()[dir];
    history.replaceState(null, "", "#project/" + n.slug);
    fillModal(n);
  }
  $("#m-prev").addEventListener("click", function () { step("prev"); });
  $("#m-next").addEventListener("click", function () { step("next"); });

  function openProject(slug) {
    var p = bySlug[slug];
    if (!p) return false;
    fillModal(p);
    showDialog(modal);
    return true;
  }
  function closeModalUI() {
    hideDialog(modal);
    $("#m-player").innerHTML = ""; // stop playback
    current = null;
  }
  function requestClose() {
    if (/^#project\//.test(location.hash)) {
      if (openedInPage) { openedInPage = false; history.back(); return; }
      history.replaceState(null, "", location.pathname + location.search);
    }
    closeModalUI();
  }
  $("#m-close").addEventListener("click", requestClose);
  modal.addEventListener("cancel", function (e) { e.preventDefault(); requestClose(); });
  modal.addEventListener("click", function (e) { if (e.target === modal) requestClose(); });

  function route(fromNav) {
    var h = decodeURIComponent(location.hash.slice(1));
    if (h.indexOf("project/") === 0) {
      if (openProject(h.slice(8)) && fromNav) openedInPage = true;
    } else if (modal.open) {
      openedInPage = false;
      closeModalUI();
    }
  }
  window.addEventListener("hashchange", function () { route(true); });

  /* ------------------------------------------------------------ lightbox */
  var lb = $("#lightbox"), lbStage = $("#lb-stage"), lbBp = $("#lb-bp"), lbImg = $("#lb-img");
  var btnBlue = $("#lb-blue"), btnOrig = $("#lb-orig");
  function setBlue(on) {
    lbBp.classList.toggle("is-blue", on);
    btnBlue.setAttribute("aria-pressed", String(on));
    btnOrig.setAttribute("aria-pressed", String(!on));
    store("ayj-blueprint", on);
  }
  btnBlue.addEventListener("click", function () { setBlue(true); });
  btnOrig.addEventListener("click", function () { setBlue(false); });
  function openLightbox(p) {
    var d = p.diagram;
    lbImg.src = d.src; lbImg.width = d.w; lbImg.height = d.h;
    lbImg.alt = "Circuit diagram for " + p.title;
    $("#lb-title").textContent = d.caption;
    $("#lb-fb").href = d.fb;
    $("#lb-dl").href = d.src;
    $("#lb-dl").setAttribute("download", "ayj-" + p.slug + "-circuit.jpg");
    var link = $("#lb-project");
    link.href = "#project/" + p.slug;
    link.hidden = modal.open && current === p;
    lbStage.classList.remove("is-zoomed");
    var pref = store("ayj-blueprint");
    setBlue(pref === null ? true : !!pref);
    showDialog(lb);
  }
  lbBp.addEventListener("click", function (e) {
    // keep the tapped point roughly centred after zooming in
    var r = lbBp.getBoundingClientRect();
    var fx = (e.clientX - r.left) / r.width, fy = (e.clientY - r.top) / r.height;
    var zoomed = lbStage.classList.toggle("is-zoomed");
    if (zoomed) {
      lbStage.scrollLeft = fx * lbStage.scrollWidth - lbStage.clientWidth / 2;
      lbStage.scrollTop = fy * lbStage.scrollHeight - lbStage.clientHeight / 2;
    }
    $("#lb-hint").textContent = zoomed ? "Drag or scroll to pan · tap to zoom out" : "Tap the diagram to zoom";
  });
  function closeLightbox() { hideDialog(lb); }
  $("#lb-close").addEventListener("click", closeLightbox);
  lb.addEventListener("cancel", function (e) { e.preventDefault(); closeLightbox(); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  $("#lb-project").addEventListener("click", function () { closeLightbox(); });

  /* ---------------------------------------------------------------- init */
  $("#year").textContent = new Date().getFullYear();
  renderChips();
  renderGrid();
  route(false);
})();
