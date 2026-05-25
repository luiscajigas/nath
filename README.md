# ✿ Mi Amor — Guía de personalización

## Estructura del proyecto

```
mi-amor/
│
├── index.html              ← Página principal (capítulo 1)
├── capitulo2.html          ← Capítulo 2 (por llenar)
├── vercel.json             ← Configuración de despliegue
│
├── public/
│   ├── images/
│   │   ├── 1.png           ← Tus 30 fotos van aquí
│   │   ├── 2.png
│   │   ├── ...
│   │   └── 30.png
│   │
│   └── music/
│       └── cancion1.mp3    ← Tu canción va aquí
│
└── src/
    ├── components/
    │   ├── data.js         ← ⭐ EDITA AQUÍ tu letra y carta
    │   └── app.js          ← Lógica principal (no necesitas editar)
    │
    └── styles/
        └── main.css        ← Estilos (no necesitas editar)
```

---

## ✏️ Cómo personalizar

### 1. Tu letra (26 líneas)
Abre `src/components/data.js` y reemplaza cada `"Letra N"` con la línea real de tu canción:

```js
const LYRICS = [
  "Desde que te vi supe que eras tú",
  "Cada instante contigo es mi luz",
  // ... 24 líneas más
];
```

### 2. Tu carta
En el mismo archivo `data.js`, reemplaza el texto entre las comillas:

```js
const LETTER_TEXT = `Mi amor, desde el día que...`;
```

### 3. Tus fotos
Coloca tus imágenes en `public/images/` con nombres `1.png`, `2.png` ... `30.png`
- Formato: PNG o JPG (si son JPG, cambia la extensión en `data.js` → `photoSrc`)
- Tamaño recomendado: 800×600 px o similar (ratio 4:3 luce mejor)

### 4. Tu canción
Coloca el archivo en `public/music/cancion1.mp3`

---

## 🚀 Cómo subir a Vercel

1. Crea cuenta en [vercel.com](https://vercel.com) (gratis)
2. Instala Vercel CLI: `npm i -g vercel`
3. Desde la carpeta del proyecto:
   ```bash
   vercel
   ```
4. Sigue los pasos: Framework = Other, Root = `.`
5. ¡Listo! Te dará un link como `https://mi-amor.vercel.app`

**Alternativa (sin terminal):**
- Sube la carpeta a GitHub
- En vercel.com → New Project → importa tu repo
- Despliega con un clic

---

## 🎨 Ajustes opcionales (data.js)

```js
const TOTAL_PHOTOS  = 30;      // número de fotos
const PHOTO_DURATION = 4500;   // ms que dura cada foto
const LYRIC_DURATION = 4500;   // ms que dura cada línea
const TYPING_SPEED   = 55;     // ms entre caracter y caracter de la carta
```
