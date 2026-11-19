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
    video: "assets/video/Mc7.mp4"
  },
  {
    nombre: "TikTok",
    url: "https://www.tiktok.com/@d1egx10mg?_r=1&_t=ZS-9BWhhM2mncS",
    descripcion: "Videos cortos.",
    video: "assets/video/Comienzo.mp4"
  },
  {
    nombre: "Instagram",
    url: "https://www.instagram.com/d1egx10?dmpr=ajJranFiNXlodW13",
    descripcion: "Fotos, stories y videos cortos.",
    video: ""
  },
  {
    nombre: "Facebook",
    url: "https://www.facebook.com/share/1DzQjcP1Fz/",
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
    descripcionCorta: "Tu gato contra oleadas de fantasmas: esquiva, ataca y mejora para sobrevivir.",
    descripcionLarga:
      "¡Un pequeño gato negro, un bosque lleno de fantasmas y una sola misión: sobrevivir! Controla a tu gato con el joystick, esquiva a los fantasmas que se acercan sin parar y deja que sus garras hagan el resto, porque cada partida es una carrera contra el tiempo en la que, cuanto más aguantes, más fuerte te vuelves. Lucha contra oleadas de fantasmas que aparecen en grupos cada vez más grandes y no se detienen: no te quedes quieto, muévete, esquiva y deja que tus zarpazos los eliminen mientras te abres paso entre ellos. Sobrevive día y noche mientras el bosque cambia con el paso del tiempo; cuando llega la noche, el escenario se oscurece y los fantasmas también cambian, obligándote a enfrentarte a distintos tipos de enemigos y adaptar tu forma de moverte para seguir con vida. Recoge orbes de XP que sueltan los fantasmas al ser derrotados para llenar tu barra de experiencia y subir de nivel, eligiendo cada vez una mejora entre varias opciones para hacer a tu gato más fuerte. Descubre mejoras para cada estilo de juego, como aumentar tu vida máxima con Siete vidas, atacar más rápido con Zarpazos veloces o conseguir más recompensas con Monedas brillantes y Olfato de suerte, con distintas rarezas comunes, especiales, poco comunes y legendarias donde los niveles de recompensa aumentan la probabilidad de encontrar mejoras raras. Además, los enemigos pueden soltar monedas y, con las mejoras adecuadas, ganarás más para hacer que tus partidas sean más rentables. Entre sus características destacan los controles simples con joystick fáciles de aprender pero difíciles de dominar, partidas rápidas ideales para jugar en cualquier momento, ciclo de día y noche con cambios en los enemigos, distintos tipos de fantasmas que te mantendrán alerta, sistema de mejoras al subir de nivel con diferentes rarezas, un hermoso estilo pixel art con un bosque lleno de detalle y compatibilidad con teléfonos y dispositivos plegables. ¿Cuánto tiempo podrás aguantar? Descarga ahora y descúbrelo.",
    descarga: "https://play.google.com/store/apps/details?id=TU.PAQUETE",
    capturas: [
      "assets/img/GvF/captura_1.png",
      "assets/img/GvF/captura_3.png"
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

];

// Datos generales de contacto (se usan en privacidad)
const SITIO = {
  autor: "D1EGX 10",
  correo: "tucorreo@ejemplo.com"
};
