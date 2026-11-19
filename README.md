# Sitio D1EGX 10

## Estructura de carpetas (así debe quedar en tu repositorio)

```
D1EGX10/
├── index.html        ← página inicial (3 recuadros)
├── juego.html        ← página de detalle de cada juego (?id=mi-juego)
├── privacidad.html   ← política de privacidad (?id=mi-juego)
├── css/
│   └── style.css     ← estilos
├── js/
│   ├── data.js       ← Editar redes y juegos
│   └── main.js       ← lógica de los recuadros
└── assets/
    ├── img/          ← logos y capturas de mis juegos
    └── video/        ← videos de muestra (.mp4)
```

## Enlaces resultantes

- Inicio:      https://d1egx10.github.io/D1EGX10/
- Juego:       https://d1egx10.github.io/D1EGX10/juego.html?id=mi-juego
- Privacidad:  https://d1egx10.github.io/D1EGX10/privacidad.html?id=mi-juego

## Agregar un juego nuevo

1. Sube el logo y capturas a `assets/img/`.
2. En `js/data.js`, copiar un bloque dentro de `JUEGOS` y cambia `id`, nombre, textos y enlaces.
3. Listo: aparece en el inicio y tiene su propia página y su propia privacidad.
