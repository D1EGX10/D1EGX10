/* =====================================================
   CONTENIDO
   ===================================================== */

// ---------- REDES SOCIALES ----------
// video: puede ser un enlace "embed" de YouTube
//        (https://www.youtube.com/embed/ID_DEL_VIDEO)
//        o un archivo (assets/video/mi-video.mp4)
const REDES = [
  {
    nombre: "YouTube",
    url: "https://youtube.com/@d1egx10mg?si=EdeNoQAeiYAg5gi5",
    descripcion: "Mi canal principal.",
    video: "https://www.youtube.com/embed/ID_DEL_VIDEO"
  },
  {
    nombre: "TikTok",
    url: "tiktok.com/@d1egx10mg",
    descripcion: "Videos cortos.",
    video: "assets/video/tiktok-demo.mp4"
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/TU_USUARIO",
    descripcion: "Fotos y stories.",
    video: ""
  },
  {
    nombre: "Facebook",
    url: "https://www.facebook.com/TU_PAGINA",
    descripcion: "Mi página.",
    video: ""
  },
  {
    nombre: "X",
    url: "https://x.com/TU_USUARIO",
    descripcion: "Novedades rápidas.",
    video: ""
  }
];

// ---------- JUEGOS ----------
// id: se usa en la dirección: juego.html?id=mi-juego
// Para agregar otro juego, copia un bloque { ... } y cambia los datos.
const JUEGOS = [
  {
    id: "gvf",
    nombre: "Gatos vs. Fantasmas",
    logo: "assets/img/GvF/Logo.jpeg",
    descripcionCorta: "Una descripción corta de mi juego.",
    descripcionLarga:
      "Aquí va la descripción detallada: de qué trata, cómo se juega, qué lo hace especial.",
    descarga: "https://play.google.com/store/apps/details?id=TU.PAQUETE",
    capturas: [
      "assets/img/mi-juego-1.png",
      "assets/img/mi-juego-2.png"
    ],
    versiones: [
      { version: "1.0.0", fecha: "2026-11-18", cambios: "Lanzamiento inicial." }
    ],
    // Datos para el aviso de privacidad
    privacidad: {
      correo: "dmendieta2005@gmail.com",
      recopilaDatos: false,          // true si usas anuncios, analytics, etc.
      servicios: []                  // ej: ["Google AdMob", "Firebase Analytics"]
    }
  },
  {
    id: "mi-juego",
    nombre: "Mi Juego",
    logo: "assets/img/mi-juego-logo.png",
    descripcionCorta: "Una descripción corta de mi juego.",
    descripcionLarga:
      "Aquí va la descripción detallada: de qué trata, cómo se juega, qué lo hace especial.",
    descarga: "https://play.google.com/store/apps/details?id=TU.PAQUETE",
    capturas: [
      "assets/img/mi-juego-1.png",
      "assets/img/mi-juego-2.png"
    ],
    versiones: [
      { version: "1.0.0", fecha: "2026-11-18", cambios: "Lanzamiento inicial." }
    ],
    // Datos para el aviso de privacidad
    privacidad: {
      correo: "tucorreo@ejemplo.com",
      recopilaDatos: false,          // true si usas anuncios, analytics, etc.
      servicios: []                  // ej: ["Google AdMob", "Firebase Analytics"]
    }
  }
];

// Datos generales de contacto (se usan en privacidad)
const SITIO = {
  autor: "D1EGX 10",
  correo: "tucorreo@ejemplo.com"
};
