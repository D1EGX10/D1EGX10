
/* =====================================================
   UTILIDADES
   ===================================================== */

function esc(texto) {
  const d = document.createElement("div");
  d.textContent = texto ?? "";
  return d.innerHTML;
}

/* =====================================================
   TEMA DE CADA RED SOCIAL
   Se detecta por nombre o por enlace.
   ===================================================== */

const TEMAS_URL = [
  ["youtube", /youtube\.com|youtu\.be/i],
  ["tiktok", /tiktok\.com/i],
  ["instagram", /instagram\.com/i],
  ["facebook", /facebook\.com|fb\.com|fb\.watch/i],
  ["x", /(^|\/\/|\.)(x|twitter)\.com/i],
  ["twitch", /twitch\.tv/i],
  ["discord", /discord\.(gg|com)/i]
];

function temaDe(red) {
  const n = (red.nombre || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  if (n === "twitter") return "x";

  if (TEMAS_URL.some(([t]) => t === n)) {
    return n;
  }

  const url = `${red.url || ""} ${red.video || ""}`;

  const hit = TEMAS_URL.find(([, re]) => re.test(url));

  return hit ? hit[0] : "otra";
}

/* =====================================================
   ANALIZAR VIDEOS
   Convierte enlaces normales en enlaces embed.
   ===================================================== */

function analizarVideo(red, tema) {
  const v = (red.video || "").trim();

  if (!v) return null;

  let m;

  // ----- Archivos propios -----

  if (/\.(mp4|webm|mov|m4v)(?:[?#].*)?$/i.test(v)) {
    return {
      tipo: "video",
      src: v,
      ratio: null
    };
  }

  // ----- YouTube -----

  if (/youtube\.com|youtu\.be/i.test(v)) {
    m = v.match(
      /(?:youtu\.be\/|[?&]v=|\/shorts\/|\/embed\/|\/live\/)([\w-]{11})/i
    );

    if (m) {
      const short = /\/shorts\//i.test(v);

      return {
        tipo: "iframe",
        src: `https://www.youtube.com/embed/${m[1]}?rel=0&playsinline=1`,
        ratio: short ? 9 / 16 : 16 / 9
      };
    }
  }

  // ----- TikTok -----

  if (/tiktok\.com/i.test(v)) {
    m = v.match(/\/video\/(\d+)/i);

    if (m) {
      return {
        tipo: "iframe",
        src: `https://www.tiktok.com/embed/v2/${m[1]}`,
        ratio: 325 / 740,
        ancho: 325
      };
    }
  }

  // ----- Instagram -----

  if (/instagram\.com/i.test(v)) {
    m = v.match(
      /instagram\.com\/(?:[\w.]+\/)?(p|reel|reels|tv)\/([\w-]+)/i
    );

    if (m) {
      const tipo = m[1] === "reels" ? "reel" : m[1];

      return {
        tipo: "iframe",
        src: `https://www.instagram.com/${tipo}/${m[2]}/embed`,
        ratio: 0.6,
        ancho: 380
      };
    }
  }

  // ----- Facebook -----

  if (/facebook\.com|fb\.watch/i.test(v)) {
    const vertical = /\/reel\//i.test(v);

    return {
      tipo: "iframe",
      src: `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(v)}&show_text=false&t=0`,
      ratio: vertical ? 9 / 16 : 16 / 9
    };
  }

  // ----- X / Twitter -----

  if (/(x|twitter)\.com/i.test(v)) {
    m = v.match(/status\/(\d+)/i);

    if (m) {
      return {
        tipo: "iframe",
        src: `https://platform.twitter.com/embed/Tweet.html?id=${m[1]}&theme=dark`,
        ratio: 0.8,
        ancho: 440
      };
    }
  }

  // ----- Enlaces embed de otros sitios -----

  if (/\/embed\/|player\./i.test(v)) {
    return {
      tipo: "iframe",
      src: v,
      ratio: 16 / 9
    };
  }

  console.warn(
    `[D1EGX10] No pude convertir este enlace a video: ${v}. Usa el enlace de UN video/publicación, no el de tu perfil.`
  );

  return null;
}

/* =====================================================
   CREAR REPRODUCTOR DE VIDEO
   ===================================================== */

function crearVideo(red, tema) {
  const info = analizarVideo(red, tema);

  if (!info) {
    return `
      <div class="media-box media-box--h">
        <div class="media media--empty">
          Video próximamente
        </div>
      </div>
    `;
  }

  // El formato se puede forzar desde data.js.
  let ratio = info.ratio;

  if (red.formato === "vertical") {
    ratio = 9 / 16;
  }

  if (red.formato === "horizontal") {
    ratio = 16 / 9;
  }

  const estilo = ratio
    ? `--r:${ratio.toFixed(4)};${info.ancho ? `--w:${info.ancho}px;` : ""}`
    : "";

  const vert = ratio && ratio < 1 ? "v" : "h";

  const interior = info.tipo === "video"
    ? `
      <video
        class="media"
        src="${esc(info.src)}"
        controls
        playsinline
        preload="metadata">
      </video>
    `
    : `
      <iframe
        class="media"
        src="${esc(info.src)}"
        title="Video de ${esc(red.nombre)}"
        loading="lazy"
        allowfullscreen
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        referrerpolicy="strict-origin-when-cross-origin">
      </iframe>
    `;

  return `
    <div
      class="media-box media-box--${vert}"
      style="${estilo}"
      data-auto="${info.tipo === "video" && !red.formato ? 1 : 0}">
      ${interior}
    </div>
  `;
}

/* =====================================================
   AJUSTAR VIDEOS LOCALES
   Detecta sus dimensiones reales.
   ===================================================== */

function ajustarVideosLocales() {
  document
    .querySelectorAll('.media-box[data-auto="1"] video')
    .forEach(video => {

      const aplicar = () => {
        if (!video.videoWidth || !video.videoHeight) return;

        const box = video.closest(".media-box");
        const item = video.closest(".item");

        if (!box) return;

        const ratio = video.videoWidth / video.videoHeight;
        const vertical = ratio < 1;

        box.style.setProperty("--r", ratio.toFixed(4));

        box.classList.toggle("media-box--v", vertical);
        box.classList.toggle("media-box--h", !vertical);

        if (item) {
          item.classList.toggle("item--vertical", vertical);
        }
      };

      if (video.readyState >= 1) {
        aplicar();
      } else {
        video.addEventListener("loadedmetadata", aplicar, {
          once: true
        });
      }
    });
}

/* =====================================================
   RENDERIZAR REDES SOCIALES
   ===================================================== */

function pintarRedes() {
  const cont = document.getElementById("lista-redes");

  if (!cont || typeof REDES === "undefined") return;

  cont.innerHTML = REDES.map(r => {
    const tema = temaDe(r);
    const media = crearVideo(r, tema);

    const vertical = media.includes("media-box--v")
      ? " item--vertical"
      : "";

    return `
      <article class="item item--${tema}${vertical}">

        <div class="item__info">

          <h3>
            <a
              href="${esc(r.url)}"
              target="_blank"
              rel="noopener">
              ${esc(r.nombre)}
            </a>
          </h3>

          <p>${esc(r.descripcion)}</p>

          <a
            class="btn"
            href="${esc(r.url)}"
            target="_blank"
            rel="noopener">
            Visitar
          </a>

        </div>

        <div class="item__media">
          ${media}
        </div>

      </article>
    `;
  }).join("");

  ajustarVideosLocales();
}

/* =====================================================
   RENDERIZAR LISTA DE JUEGOS
   ===================================================== */

function pintarJuegos() {
  const cont = document.getElementById("lista-juegos");

  if (!cont || typeof JUEGOS === "undefined") return;

  cont.innerHTML = JUEGOS.map(j => `
    <article class="item item--juego">

      <div class="item__info">

        <h3>
          <a href="juego.html?id=${encodeURIComponent(j.id)}">
            ${esc(j.nombre)}
          </a>
        </h3>

        <p>${esc(j.descripcionCorta)}</p>

        <div class="btn-row">

          <a
            class="btn"
            href="${esc(j.descarga)}"
            target="_blank"
            rel="noopener">
            Descargar
          </a>

          <a
            class="btn btn--ghost"
            href="juego.html?id=${encodeURIComponent(j.id)}">
            Más información
          </a>

        </div>

      </div>

      <div class="item__media">

        <a
          href="juego.html?id=${encodeURIComponent(j.id)}"
          aria-label="Ver ${esc(j.nombre)}">

          <img
            class="media media--logo"
            src="${esc(j.logo)}"
            alt="Logo de ${esc(j.nombre)}"
            loading="lazy"
            onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'media media--logo media--empty',textContent:'Logo'}))">

        </a>

      </div>

    </article>
  `).join("");
}

/* =====================================================
   TARJETAS GRANDES: DESPLEGAR / OCULTAR
   ===================================================== */

function activarTarjetas() {
  const tarjetas = document.querySelectorAll(".big-card");
  const paneles = document.querySelectorAll(".panel");

  tarjetas.forEach(t => {

    t.addEventListener("click", () => {

      const destino = document.getElementById(t.dataset.target);

      if (!destino) return;

      const yaAbierto = !destino.hidden;

      // Cerrar todos los paneles.
      paneles.forEach(p => {
        p.hidden = true;
      });

      tarjetas.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        b.classList.remove("is-open");
      });

      // Abrir el seleccionado si estaba cerrado.
      if (!yaAbierto) {

        destino.hidden = false;

        t.setAttribute("aria-expanded", "true");
        t.classList.add("is-open");

        destino.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });

  // Abrir directamente mediante el hash de la URL.
  const hash = location.hash.replace("#", "");

  const mapa = {
    pendiente: "panel-pendiente",
    redes: "panel-redes",
    juegos: "panel-juegos"
  };

  if (mapa[hash]) {
    document
      .querySelector(`[data-target="${mapa[hash]}"]`)
      ?.click();
  }
}

/* =====================================================
   PÁGINA INDIVIDUAL DE CADA JUEGO
   ===================================================== */

function pintarJuegoIndividual() {

  const cont = document.getElementById("contenido");

  // Si no existe este contenedor, no estamos en juego.html.
  if (!cont) return;

  if (typeof JUEGOS === "undefined") {
    cont.innerHTML = `
      <h1>Error al cargar los juegos</h1>

      <p class="muted">
        No se pudo cargar la información de data.js.
      </p>
    `;

    return;
  }

  const id = new URLSearchParams(location.search).get("id");

  const j = JUEGOS.find(x => x.id === id);

  if (!j) {

    cont.innerHTML = `
      <a class="back" href="index.html#juegos">
        ← Volver
      </a>

      <h1>Juego no encontrado</h1>

      <p class="muted">
        No se encontró la información del juego solicitado.
      </p>
    `;

    return;
  }

  document.title = j.nombre + " | D1EGX 10";

  cont.innerHTML = `

    <a class="back" href="index.html#juegos">
      ← Volver a mis juegos
    </a>

    ${j.banner ? `
      <img
        class="game-banner"
        src="${esc(j.banner)}"
        alt="Banner de ${esc(j.nombre)}">
    ` : ""}

    <div class="game-head">

      <img
        src="${esc(j.logo)}"
        alt="Logo de ${esc(j.nombre)}">

      <div>

        <h1>${esc(j.nombre)}</h1>

        <p class="muted">
          ${esc(j.descripcionCorta)}
        </p>

        <div class="btn-row" style="margin-top:.8rem">

          <a
            class="btn"
            href="${esc(j.descarga)}"
            target="_blank"
            rel="noopener">
            Descargar
          </a>

          <a
            class="btn btn--ghost"
            href="gvfprivacidad.html?id=${encodeURIComponent(j.id)}">
            Política de privacidad
          </a>

        </div>

      </div>

    </div>

    <section class="section">

      <h2>Descripción</h2>

      <p>${esc(j.descripcionLarga)}</p>

    </section>

    <section class="section">

      <h2>Capturas</h2>

      <div class="shots">

        ${(j.capturas || []).map(c => `
          <img
            src="${esc(c)}"
            alt="Captura de ${esc(j.nombre)}"
            loading="lazy">
        `).join("")}

      </div>

    </section>

    <section class="section">

      <h2>Versiones</h2>

      ${(j.versiones || []).map(v => `

        <div class="version">

          <strong>v${esc(v.version)}</strong>

          <span class="muted">
            · ${esc(v.fecha)}
          </span>

          <p>${esc(v.cambios)}</p>

        </div>

      `).join("")}

    </section>

  `;
}

/* =====================================================
   INICIAR TODO
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Año del footer.
  const y = document.getElementById("year");

  if (y) {
    y.textContent = new Date().getFullYear();
  }

  // Página principal.
  pintarRedes();
  pintarJuegos();
  activarTarjetas();

  // Página individual de cada juego.
  pintarJuegoIndividual();

});
