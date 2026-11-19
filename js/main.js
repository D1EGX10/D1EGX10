/* ---------- Utilidades ---------- */
function esc(texto) {
  const d = document.createElement("div");
  d.textContent = texto ?? "";
  return d.innerHTML;
}

function crearVideo(src) {
  if (!src) return '<div class="media media--empty">Video próximamente</div>';
  if (src.endsWith(".mp4") || src.endsWith(".webm")) {
    return `<video class="media" src="${esc(src)}" controls preload="metadata"></video>`;
  }
  return `<iframe class="media" src="${esc(src)}" title="Video de muestra"
          loading="lazy" allowfullscreen></iframe>`;
}

/* ---------- Render: Redes ---------- */
function pintarRedes() {
  const cont = document.getElementById("lista-redes");
  if (!cont) return;
  cont.innerHTML = REDES.map(r => `
    <article class="item">
      <div class="item__info">
        <h3><a href="${esc(r.url)}" target="_blank" rel="noopener">${esc(r.nombre)}</a></h3>
        <p>${esc(r.descripcion)}</p>
        <a class="btn" href="${esc(r.url)}" target="_blank" rel="noopener">Visitar</a>
      </div>
      <div class="item__media">${crearVideo(r.video)}</div>
    </article>
  `).join("");
}

/* ---------- Render: Juegos ---------- */
function pintarJuegos() {
  const cont = document.getElementById("lista-juegos");
  if (!cont) return;
  cont.innerHTML = JUEGOS.map(j => `
    <article class="item">
      <div class="item__info">
        <h3><a href="juego.html?id=${encodeURIComponent(j.id)}">${esc(j.nombre)}</a></h3>
        <p>${esc(j.descripcionCorta)}</p>
        <div class="btn-row">
          <a class="btn" href="${esc(j.descarga)}" target="_blank" rel="noopener">Descargar</a>
          <a class="btn btn--ghost" href="juego.html?id=${encodeURIComponent(j.id)}">Más información</a>
        </div>
      </div>
      <div class="item__media">
        <img class="media media--logo" src="${esc(j.logo)}" alt="Logo de ${esc(j.nombre)}"
             onerror="this.replaceWith(Object.assign(document.createElement('div'),{className:'media media--empty',textContent:'Logo'}))">
      </div>
    </article>
  `).join("");
}

/* ---------- Tarjetas grandes: desplegar / ocultar ---------- */
function activarTarjetas() {
  const tarjetas = document.querySelectorAll(".big-card");
  const paneles = document.querySelectorAll(".panel");

  tarjetas.forEach(t => {
    t.addEventListener("click", () => {
      const destino = document.getElementById(t.dataset.target);
      const yaAbierto = !destino.hidden;

      // cerrar todo
      paneles.forEach(p => (p.hidden = true));
      tarjetas.forEach(b => {
        b.setAttribute("aria-expanded", "false");
        b.classList.remove("is-open");
      });

      // abrir el elegido (si no estaba abierto)
      if (!yaAbierto) {
        destino.hidden = false;
        t.setAttribute("aria-expanded", "true");
        t.classList.add("is-open");
        destino.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // Abrir directo con #redes o #juegos en la URL
  const hash = location.hash.replace("#", "");
  const mapa = { pendiente: "panel-pendiente", redes: "panel-redes", juegos: "panel-juegos" };
  if (mapa[hash]) {
    document.querySelector(`[data-target="${mapa[hash]}"]`)?.click();
  }
}

/* ---------- Iniciar ---------- */
document.addEventListener("DOMContentLoaded", () => {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
  pintarRedes();
  pintarJuegos();
  activarTarjetas();
});
