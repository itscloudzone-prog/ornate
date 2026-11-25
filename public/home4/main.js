(() => {
  "use strict";
  const $ = (selector) => document.querySelector(selector);
  const $$ = (selector) => [...document.querySelectorAll(selector)];
  const clamp = (number, min = 0, max = 1) =>
    Math.min(max, Math.max(min, number));
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = matchMedia("(max-width: 760px)");
  const svgNS = "http://www.w3.org/2000/svg";
  let motionPaused = reduced.matches;
  let introSheet,
    productSheet,
    introToken = 0,
    introFrame = 0,
    productFrame = 0;
  let productProgress = 0,
    manualProduct = false;
  const intro = $("#iris-intro");
  const content = $("#page-content");
  const hero = $(".arrival");
  const heroTrack = $("#arrival");
  document.documentElement.classList.add("js");

  // Shared custom pattern vocabulary: linework is generated here, not loaded from a service.
  const path = (d) => `<path pathLength="1" d="${d}"/>`;
  const circle = (x, y, radius) =>
    `<circle pathLength="1" cx="${x}" cy="${y}" r="${radius}"/>`;
  function rosette() {
    let drawing =
      circle(300, 300, 258) +
      circle(300, 300, 245) +
      circle(300, 300, 200) +
      circle(300, 300, 52) +
      circle(300, 300, 35);
    for (let i = 0; i < 12; i++) {
      drawing += `<g transform="rotate(${i * 30} 300 300)">${
        path(
          "M300 247C234 214 217 125 267 101C310 80 328 146 297 159C270 169 267 137 282 134",
        ) +
        path(
          "M300 247C366 214 383 125 333 101C290 80 272 146 303 159C330 169 333 137 318 134",
        ) +
        path("M300 98L286 63L300 44L314 63Z") +
        path("M300 245V181")
      }</g>`;
    }
    return drawing;
  }
  function botanical() {
    let drawing = path("M20 40H1180V560H20Z") + path("M35 55H1165V545H35Z");
    for (let i = 0; i < 7; i++) {
      const x = 90 + i * 170;
      drawing += `<g transform="translate(${x} 0)">${
        path(
          "M0 545V85M0 310C-112 265 -91 148 -40 167C14 186 -13 252 -44 229C-65 212 -45 192 -33 204",
        ) +
        path(
          "M0 405C112 360 91 243 40 262C-14 281 13 347 44 324C65 307 45 287 33 299",
        ) +
        path("M0 85C-45 45 -72 90 -33 116L0 135L33 116C72 90 45 45 0 85Z") +
        path("M0 490C-52 442 -79 493 -35 521L0 537L35 521C79 493 52 442 0 490Z")
      }</g>`;
    }
    return drawing;
  }
  function geometric() {
    let drawing = path("M20 30H1180V570H20Z") + path("M35 45H1165V555H35Z");
    for (let i = 0; i < 6; i++) {
      const x = 100 + i * 200;
      for (let size = 30; size <= 250; size += 32) {
        drawing += path(
          `M${x - size / 2} 300L${x} ${300 - size}L${x + size / 2} 300L${x} ${300 + size}Z`,
        );
      }
    }
    return drawing;
  }
  function patternSVG(kind, metallic = false) {
    const square = kind === "rosette";
    const defs = metallic
      ? '<defs><linearGradient id="metal-finish" x1="0" y1="0" x2="1" y2=".8"><stop class="metal-edge" offset="0"/><stop class="metal-base" offset=".23"/><stop class="metal-mid" offset=".47"/><stop class="metal-edge" offset=".53"/><stop class="metal-base" offset=".75"/><stop class="metal-mid" offset="1"/></linearGradient></defs>'
      : "";
    return `<svg xmlns="${svgNS}" viewBox="0 0 ${square ? "600 600" : "1200 600"}" aria-hidden="true">${defs}${kind === "rosette" ? rosette() : kind === "geometric" ? geometric() : botanical()}</svg>`;
  }
  $$("[data-pattern]").forEach((element) => {
    element.innerHTML = patternSVG(
      element.dataset.pattern,
      element.classList.contains("finish-disc"),
    );
  });
  $(".iris-blades").innerHTML = Array.from(
    { length: 8 },
    (_, i) => `<div class="iris-blade" style="--angle:${i * 45}deg"></div>`,
  ).join("");

  function renderIntro(values) {
    intro.style.setProperty("--iris-open", values.opening);
    intro.style.setProperty("--iris-turn", `${values.turn}deg`);
    intro.style.setProperty("--iris-draw", values.draw);
  }
  function renderProduct(values) {
    hero.style.setProperty("--product-zoom", values.zoom);
    hero.style.setProperty("--product-x", `${values.offsetX}%`);
    hero.style.setProperty("--product-y", `${values.offsetY}%`);
    hero.style.setProperty("--word-fade", values.lettering);
    hero.style.setProperty("--detail-fade", values.detail);
  }
  // Both critical interactions keep a native fallback if the optional runtime cannot load.
  function seekProduct(progress) {
    productProgress = clamp(progress);
    if (productSheet) productSheet.sequence.position = productProgress;
    else {
      const p = clamp((productProgress - 0.15) / 0.85);
      renderProduct({
        zoom: 1 + p * 1.65,
        offsetX: -7 * p,
        offsetY: 13 * p,
        lettering: 1 - p,
        detail: p,
      });
    }
    const detail = productProgress > 0.55;
    $("#detail-control").setAttribute("aria-pressed", String(detail));
    $("#detail-control-label").textContent = detail
      ? "See the whole design"
      : "Explore the scrollwork";
    $("#detail-control .zoom-icon").textContent = detail ? "−" : "+";
    $("#product-note").textContent = detail
      ? "THE BEAUTY IS IN THE DETAIL"
      : "A STATEMENT IN EVERY LINE";
  }
  let theatreProject;
  document.documentElement.dataset.motionEngine = "native";
  try {
    const core = window.Theatre?.core;
    if (core && window.ORNATE_HOME4_STATE) {
      theatreProject = core.getProject("Ornate Home Four — Nocturne", {
        state: window.ORNATE_HOME4_STATE,
      });
      introSheet = theatreProject.sheet("The Opening");
      introSheet
        .object("Iris", { draw: 0, opening: 0, turn: -22 })
        .onValuesChange(renderIntro);
      productSheet = theatreProject.sheet("The Product Study");
      productSheet
        .object("Gate", {
          zoom: 1,
          offsetX: 0,
          offsetY: 0,
          lettering: 1,
          detail: 0,
        })
        .onValuesChange(renderProduct);
      document.documentElement.dataset.motionEngine = "theatre";
    }
  } catch (error) {
    // A malformed animation state must never block access to the page.
    introSheet = productSheet = undefined;
    document.documentElement.dataset.motionEngine = "native";
  }
  seekProduct(0);

  function finishIntro(token, focusHero = true) {
    if (token !== introToken) return;
    introSheet?.sequence.pause();
    cancelAnimationFrame(introFrame);
    introFrame = 0;
    intro.hidden = true;
    content.inert = false;
    document.body.classList.remove("intro-active");
    if (focusHero) {
      $("#arrival-title").tabIndex = -1;
      $("#arrival-title").focus({ preventScroll: true });
    }
  }
  async function playIntro(replay = false) {
    const token = ++introToken;
    if (motionPaused || reduced.matches) {
      finishIntro(token, replay);
      return;
    }
    closeCorner();
    manualProduct = false;
    cancelAnimationFrame(productFrame);
    seekProduct(0);
    window.scrollTo({ top: 0, behavior: "instant" });
    intro.hidden = false;
    content.inert = true;
    document.body.classList.add("intro-active");
    $("#intro-skip").focus({ preventScroll: true });
    renderIntro({ draw: 0, opening: 0, turn: -22 });
    if (introSheet) {
      introSheet.sequence.pause();
      introSheet.sequence.position = 0;
      await theatreProject.ready;
      if (token !== introToken || intro.hidden) return;
      const complete = await introSheet.sequence.play({ range: [0, 2.8] });
      if (complete) finishIntro(token);
    } else {
      const start = performance.now();
      const tick = (now) => {
        if (token !== introToken) return;
        const t = clamp((now - start) / 2800);
        const p = clamp((t - 0.46) / 0.54);
        const ease = p * p * (3 - 2 * p);
        renderIntro({
          draw: clamp(t / 0.42),
          opening: ease,
          turn: -22 + t * 77,
        });
        if (t < 1) introFrame = requestAnimationFrame(tick);
        else finishIntro(token);
      };
      introFrame = requestAnimationFrame(tick);
    }
  }
  $("#intro-skip").addEventListener("click", () => finishIntro(introToken));
  $("#replay-intro").addEventListener("click", () => playIntro(true));
  intro.addEventListener("keydown", (event) => {
    if (event.key === "Escape") finishIntro(introToken);
    if (event.key === "Tab") {
      event.preventDefault();
      $("#intro-skip").focus();
    }
  });

  function animateProduct(target) {
    cancelAnimationFrame(productFrame);
    manualProduct = true;
    if (motionPaused || reduced.matches) {
      seekProduct(target);
      return;
    }
    const from = productProgress,
      start = performance.now();
    function tick(now) {
      const p = clamp((now - start) / 1200),
        eased = p * p * (3 - 2 * p);
      seekProduct(from + (target - from) * eased);
      if (p < 1) productFrame = requestAnimationFrame(tick);
      else productFrame = 0;
    }
    productFrame = requestAnimationFrame(tick);
  }
  $("#detail-control").addEventListener("click", () =>
    animateProduct(productProgress > 0.55 ? 0 : 1),
  );
  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    const total = document.documentElement.scrollHeight - innerHeight;
    $("#reading-progress").style.transform =
      `scaleX(${total > 0 ? clamp(scrollY / total) : 0})`;
    if (!manualProduct && !motionPaused && !reduced.matches && intro.hidden) {
      const trackTop = heroTrack.getBoundingClientRect().top;
      const travel = Math.max(1, heroTrack.offsetHeight - hero.offsetHeight);
      seekProduct(clamp(-trackTop / travel));
    }
  }
  window.addEventListener(
    "scroll",
    () => {
      if (manualProduct) {
        manualProduct = false;
        cancelAnimationFrame(productFrame);
      }
      if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
    },
    { passive: true },
  );

  const reveals = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          reveals.unobserve(entry.target);
        }
      }),
    { threshold: 0.06 },
  );
  $$(".reveal").forEach((element) => reveals.observe(element));
  const scenes = $$("[data-scene]").filter(
    (element) => element !== document.body,
  );
  const visibleScenes = new Map();
  const sceneObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting)
          visibleScenes.set(entry.target, entry.intersectionRatio);
        else visibleScenes.delete(entry.target);
      });
      let largest,
        largestArea = 0;
      visibleScenes.forEach((ratio, element) => {
        const rect = element.getBoundingClientRect();
        const area = Math.min(rect.bottom, innerHeight) - Math.max(rect.top, 0);
        if (area > largestArea) {
          largest = element;
          largestArea = area;
        }
      });
      if (largest) document.body.dataset.scene = largest.dataset.scene;
    },
    { threshold: [0, 0.1, 0.25, 0.5, 0.75, 1] },
  );
  scenes.forEach((element) => sceneObserver.observe(element));

  // The corner always begins as a close crop; hover, keyboard focus or tap reveals its full product.
  const corner = $("#corner-study"),
    cornerButton = $("#corner-trigger"),
    preview = $("#corner-preview");
  let cornerPinned = false,
    cornerTimer;
  function showCorner() {
    clearTimeout(cornerTimer);
    preview.hidden = false;
    cornerButton.setAttribute("aria-expanded", "true");
  }
  function closeCorner() {
    clearTimeout(cornerTimer);
    cornerPinned = false;
    preview.hidden = true;
    cornerButton.setAttribute("aria-expanded", "false");
  }
  corner.addEventListener("pointerenter", (event) => {
    if (event.pointerType !== "touch") showCorner();
  });
  corner.addEventListener("pointerleave", () => {
    if (!cornerPinned && !corner.contains(document.activeElement))
      cornerTimer = setTimeout(closeCorner, 150);
  });
  corner.addEventListener("focusin", showCorner);
  corner.addEventListener("focusout", (event) => {
    if (!corner.contains(event.relatedTarget) && !cornerPinned) closeCorner();
  });
  cornerButton.addEventListener("click", () => {
    cornerPinned = !cornerPinned;
    if (cornerPinned) showCorner();
    else closeCorner();
  });
  document.addEventListener("pointerdown", (event) => {
    if (!corner.contains(event.target)) closeCorner();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !preview.hidden) {
      closeCorner();
      cornerButton.focus();
      closeCorner();
    }
  });

  const collectionData = {
    gates: {
      image: "collection-driveway.jpg",
      alt: "Arched black iron driveway gate framing a white-gabled home",
      title: "The first impression.",
      meta: "DRIVEWAY GATES · MADE TO MEASURE",
      description:
        "Arched, linear or intricately ornamental. A custom gate gives your entrance a character all its own.",
      href: "https://ornateirondecor.com/driveway-gates/",
      link: "Explore driveway gates",
      product: "Driveway gate",
    },
    pedestrian: {
      image: "collection-pedestrian.webp",
      alt: "Custom decorative black pedestrian gate fitted to a residential entrance",
      title: "A more personal welcome.",
      meta: "PEDESTRIAN GATES · YOUR EVERYDAY ARRIVAL",
      description:
        "A garden path, side entrance or courtyard. Give the smaller moments the same attention as the grand entrance.",
      href: "https://ornateirondecor.com/pedestrian-gates/",
      link: "Explore pedestrian gates",
      product: "Pedestrian gate",
    },
    railings: {
      image: "collection-botanical.webp",
      alt: "Botanical laser-cut metal panels forming an ornamental staircase railing",
      title: "A beautiful line to follow.",
      meta: "ARCHITECTURAL RAILINGS · FORM & FUNCTION",
      description:
        "From a quiet linear handrail to an expressive laser-cut panel. Let every step belong to your architecture.",
      href: "https://ornateirondecor.com/metal-railing/",
      link: "Explore architectural railings",
      product: "Architectural railing",
    },
    screens: {
      image: "collections/collection_privacy_fence_1795582231852.jpg",
      alt: "Illuminated geometric black metal privacy screens around a contemporary terrace",
      title: "An artful kind of privacy.",
      meta: "PATTERNED SCREENS · LIGHT & SHADOW",
      description:
        "Frame a terrace. Define a garden. Bring a custom-cut pattern into the space between public and personal.",
      href: "https://ornateirondecor.com/privacy-screen/",
      link: "Explore patterned screens",
      product: "Patterned screen",
    },
  };
  let imageGeneration = 0;
  $$(".collection-choice").forEach((button) =>
    button.addEventListener("click", async () => {
      const item = collectionData[button.dataset.collection],
        generation = ++imageGeneration;
      $$(".collection-choice").forEach((choice) => {
        const selected = choice === button;
        choice.classList.toggle("is-active", selected);
        choice.setAttribute("aria-pressed", String(selected));
      });
      $("#collection-description").textContent = item.description;
      $("#collection-link").replaceChildren(
        document.createTextNode(item.link + " "),
        Object.assign(document.createElement("span"), { textContent: "↗" }),
      );
      $("#collection-link span").setAttribute("aria-hidden", "true");
      $("#collection-link").href = $("#collection-photo-link").href = item.href;
      $("#project-product").value = item.product;
      $("#collection-photo-title").textContent = item.title;
      $("#collection-photo-meta").textContent = item.meta;
      const photo = $("#collection-photo");
      const next = new Image();
      next.src = `../home3/assets/${item.image}`;
      $("#collection-photo-link").classList.add("is-changing");
      try {
        await next.decode();
      } catch {
        /* Keep the known image if an asset is unavailable. */
      }
      if (generation !== imageGeneration) return;
      if (next.naturalWidth) {
        photo.src = next.src;
        photo.alt = item.alt;
      }
      $("#collection-photo-link").classList.remove("is-changing");
    }),
  );

  const motifNames = {
    botanical: "Botanical scroll",
    geometric: "Architectural rhythm",
    rosette: "The ornamental rosette",
  };
  $$("[data-motif]").forEach((button) =>
    button.addEventListener("click", () => {
      $$("[data-motif]").forEach((choice) =>
        choice.setAttribute("aria-pressed", String(choice === button)),
      );
      const art = $("#pattern-art");
      art.dataset.pattern = button.dataset.motif;
      art.innerHTML = patternSVG(button.dataset.motif);
      $("#pattern-name").textContent = motifNames[button.dataset.motif];
    }),
  );

  const galleryItems = [
    {
      title: "Geometry, with a point of view.",
      href: "https://ornateirondecor.com/driveway-gates/",
    },
    {
      title: "Nature, expressed in iron.",
      href: "https://ornateirondecor.com/laser-cut-railing/",
    },
    {
      title: "A welcome, made personal.",
      href: "https://ornateirondecor.com/pedestrian-gates/",
    },
  ];
  const panels = $$(".gallery-panel");
  const camera = $("#gallery-camera"),
    room = $("#gallery-room");
  let gallerySelection = -1,
    placements = [];
  function placeGallery() {
    const spread = Math.min(360, room.clientWidth * 0.32);
    placements = [
      { x: -spread, z: -190, angle: 33 },
      { x: 0, z: -300, angle: 0 },
      { x: spread, z: -190, angle: -33 },
    ];
    panels.forEach((panel, index) => {
      const p = placements[index];
      panel.style.transform = `translate3d(${p.x}px,0,${p.z}px) rotateY(${p.angle}deg)`;
    });
    renderGallery();
  }
  function renderGallery() {
    const selected = gallerySelection >= 0;
    const p = selected
      ? placements[gallerySelection]
      : { x: 0, z: 0, angle: 0 };
    // Inverse camera order is essential: rotate, then translate in world space.
    camera.style.transform = `rotateY(${-p.angle}deg) translate3d(${-p.x}px,0,${-p.z}px)`;
    room.dataset.focus = selected ? String(gallerySelection) : "overview";
    panels.forEach((panel, index) => {
      panel
        .querySelector("button")
        .setAttribute("aria-pressed", String(index === gallerySelection));
      panel.style.filter =
        selected && index !== gallerySelection ? "brightness(.38)" : "";
    });
    $("#gallery-caption").textContent = selected
      ? galleryItems[gallerySelection].title
      : "Select a piece to step inside.";
    $("#gallery-link").href = selected
      ? galleryItems[gallerySelection].href
      : "https://ornateirondecor.com/gallery/";
  }
  panels.forEach((panel, index) =>
    panel.querySelector("button").addEventListener("click", () => {
      gallerySelection = gallerySelection === index ? -1 : index;
      renderGallery();
    }),
  );
  $("#gallery-prev").addEventListener("click", () => {
    gallerySelection = gallerySelection < 0 ? 2 : (gallerySelection + 2) % 3;
    renderGallery();
  });
  $("#gallery-next").addEventListener("click", () => {
    gallerySelection = (gallerySelection + 1) % 3;
    renderGallery();
  });
  $("#gallery-reset").addEventListener("click", () => {
    gallerySelection = -1;
    renderGallery();
  });
  room.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      gallerySelection = (gallerySelection + 1) % 3;
      renderGallery();
      panels[gallerySelection]
        .querySelector("button")
        .focus({ preventScroll: true });
    } else if (event.key === "ArrowLeft") {
      event.preventDefault();
      gallerySelection = gallerySelection < 0 ? 2 : (gallerySelection + 2) % 3;
      renderGallery();
      panels[gallerySelection]
        .querySelector("button")
        .focus({ preventScroll: true });
    } else if (event.key === "Escape") {
      gallerySelection = -1;
      renderGallery();
    }
  });
  let touchStart;
  room.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch")
      touchStart = { x: event.clientX, y: event.clientY };
  });
  room.addEventListener("pointerup", (event) => {
    if (!touchStart || event.pointerType !== "touch") return;
    const dx = event.clientX - touchStart.x,
      dy = event.clientY - touchStart.y;
    touchStart = undefined;
    if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      gallerySelection =
        dx < 0
          ? (gallerySelection + 1) % 3
          : gallerySelection < 0
            ? 2
            : (gallerySelection + 2) % 3;
      renderGallery();
    }
  });
  room.addEventListener("pointercancel", () => {
    touchStart = undefined;
  });

  $$("[data-finish]")
    .filter((element) => element.tagName === "BUTTON")
    .forEach((button) =>
      button.addEventListener("click", () => {
        $$(".finish-option").forEach((choice) =>
          choice.setAttribute("aria-pressed", String(choice === button)),
        );
        $("#finish-object").dataset.finish = button.dataset.finish;
        $("#finish-label").textContent = {
          black: "GRAPHITE BLACK",
          silver: "BRUSHED SILVER",
          gold: "CHAMPAGNE GOLD",
        }[button.dataset.finish];
      }),
    );
  $$(".craft-steps details").forEach((detail) =>
    detail.addEventListener("toggle", () => {
      if (detail.open)
        $$(".craft-steps details").forEach((other) => {
          if (other !== detail) other.open = false;
        });
    }),
  );

  let projectBrief = "";
  $$("#commission-form input, #commission-form textarea").forEach((field) =>
    field.addEventListener("input", () => field.setCustomValidity("")),
  );
  $("#commission-form").addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const nameField = form.elements.namedItem("name");
    const messageField = form.elements.namedItem("message");
    nameField.setCustomValidity(
      nameField.value.trim() ? "" : "Please enter your name.",
    );
    messageField.setCustomValidity(
      messageField.value.trim().length >= 10
        ? ""
        : "Please share at least a few words about your project.",
    );
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const finish = $('.finish-option[aria-pressed="true"]').innerText.trim();
    const motif =
      motifNames[$('[data-motif][aria-pressed="true"]').dataset.motif];
    projectBrief = `Name: ${data.get("name")}\nEmail: ${data.get("email")}\nProject: ${data.get("product")}\nFinish direction: ${finish}\nPattern direction: ${motif}\n\nProject idea:\n${data.get("message")}`;
    const href = `mailto:connect@ornateirondecor.com?subject=${encodeURIComponent(`A new Ornate project — ${data.get("product")}`)}&body=${encodeURIComponent(projectBrief)}`;
    $("#draft-link").href = href;
    $("#form-result").hidden = false;
    $("#draft-link").click();
  });
  $("#copy-brief").addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(projectBrief);
      $("#copy-status").textContent = "Project details copied.";
    } catch {
      $("#copy-status").textContent =
        "You can select and copy the project details below.";
      let fallback = $("#brief-fallback");
      if (!fallback) {
        fallback = document.createElement("textarea");
        fallback.id = "brief-fallback";
        fallback.readOnly = true;
        fallback.setAttribute("aria-label", "Project details to copy");
        $("#form-result").append(fallback);
      }
      fallback.value = projectBrief;
      fallback.focus();
      fallback.select();
    }
  });

  function renderMotionControl() {
    document.body.classList.toggle("motion-paused", motionPaused);
    const button = $("#motion-control");
    button.hidden = reduced.matches;
    button.setAttribute("aria-pressed", String(motionPaused));
    button.setAttribute(
      "aria-label",
      motionPaused ? "Resume ambient animation" : "Pause ambient animation",
    );
    button.querySelector("span").textContent = motionPaused ? "▷" : "Ⅱ";
    $("#motion-label").textContent = motionPaused
      ? "Resume motion"
      : "Pause motion";
  }
  $("#motion-control").addEventListener("click", () => {
    motionPaused = !motionPaused;
    renderMotionControl();
    if (motionPaused) {
      cancelAnimationFrame(productFrame);
      if (!intro.hidden) finishIntro(introToken);
    } else updateScroll();
  });
  reduced.addEventListener("change", () => {
    motionPaused = reduced.matches;
    renderMotionControl();
    if (motionPaused) {
      cancelAnimationFrame(productFrame);
      finishIntro(introToken, false);
      manualProduct = false;
      seekProduct(0);
    }
    updateScroll();
  });
  function resize() {
    placeGallery();
    updateScroll();
  }
  window.addEventListener("resize", resize, { passive: true });
  mobile.addEventListener("change", resize);
  document.fonts.ready.then(resize);
  $("#copyright-year").textContent = String(new Date().getFullYear());
  renderMotionControl();
  resize();
  // A direct link to a section should open that section without an interrupting intro.
  let seen = false;
  try {
    seen = sessionStorage.getItem("ornate-home4-seen") === "yes";
    sessionStorage.setItem("ornate-home4-seen", "yes");
  } catch {
    /* Storage is optional. */
  }
  if (!seen && !location.hash && !reduced.matches) playIntro();
})();
