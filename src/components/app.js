// ══════════════════════════════════════════════════
//   LÓGICA PRINCIPAL DE LA EXPERIENCIA
// ══════════════════════════════════════════════════

(function () {
  "use strict";

  // ── Referencias DOM ──────────────────────────────
  const photoFrame   = document.getElementById("photoFrame");
  const activePhoto  = document.getElementById("activePhoto");
  const lyricLine    = document.getElementById("lyricLine");
  const lyricsArea   = document.getElementById("lyricsArea");
  const photosStack  = document.getElementById("photosStack");
  const photoStage   = document.getElementById("photoStage");
  const letterText   = document.getElementById("letterText");
  const typingCursor = document.getElementById("typingCursor");
  const bgMusic      = document.getElementById("bgMusic");
  const playScreen   = document.getElementById("playScreen");

  // ── Estado ───────────────────────────────────────
  let currentPhotoIndex = 0;
  let photoOrder        = [];
  let sequenceFinished  = false;
  let letterIndex       = 0;
  let letterTimer       = null;
  let started           = false;

  // ── Utilidades ───────────────────────────────────

  function shufflePhotos(n) {
    const arr = Array.from({ length: n }, (_, i) => i + 1);
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function photoSrc(n) {
    return `public/images/${n}.png`;
  }

  function preload(src) {
    const img = new Image();
    img.src = src;
  }

  function wait(ms) {
    return new Promise((res) => setTimeout(res, ms));
  }

  // ── Pantalla de Play ─────────────────────────────

  function setupPlayScreen() {
    if (!playScreen) return;

    playScreen.addEventListener("click", handlePlay);
    playScreen.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") handlePlay();
    });
  }

  function handlePlay() {
    if (started) return;
    started = true;

    // Animación de salida de la pantalla play
    playScreen.classList.add("play-screen--exit");

    setTimeout(() => {
      playScreen.style.display = "none";
      startMusic();
      startTypewriter();
      runSequence();
    }, 800);
  }

  // ── Música ───────────────────────────────────────

  function startMusic() {
    if (!bgMusic) return;
    bgMusic.volume = 0.65;
    bgMusic.play().catch(() => {});
  }

  // ── Fotos ─────────────────────────────────────────

  function showPhoto(src) {
    return new Promise((resolve) => {
      const next = photoOrder[(currentPhotoIndex + 1) % photoOrder.length];
      if (next) preload(photoSrc(next));

      photoFrame.classList.add("fade-out");

      setTimeout(() => {
        activePhoto.src = src;

        const onReady = () => {
          photoFrame.classList.remove("fade-out");
          photoFrame.classList.add("fade-in");
          setTimeout(() => {
            photoFrame.classList.remove("fade-in");
            resolve();
          }, 700);
        };

        activePhoto.onload  = onReady;
        activePhoto.onerror = onReady;
      }, 700);
    });
  }

  // ── Letra ─────────────────────────────────────────

  function showLyric(text) {
    return new Promise((resolve) => {
      lyricLine.classList.add("hidden");
      setTimeout(() => {
        lyricLine.textContent = text;
        lyricLine.classList.remove("hidden");
        resolve();
      }, 500);
    });
  }

  // ── Carta (máquina de escribir) ───────────────────

  function startTypewriter() {
    if (!LETTER_TEXT || LETTER_TEXT.length === 0) return;
    letterIndex = 0;

    function typeNext() {
      if (letterIndex >= LETTER_TEXT.length) {
        typingCursor.style.display = "none";
        return;
      }
      letterText.textContent += LETTER_TEXT[letterIndex];
      letterIndex++;

      const body = letterText.parentElement;
      body.scrollTop = body.scrollHeight;

      const variance = (Math.random() - 0.5) * 20;
      letterTimer = setTimeout(typeNext, TYPING_SPEED + variance);
    }

    setTimeout(typeNext, 800);
  }

  // ── Secuencia principal ───────────────────────────

  async function runSequence() {
    photoOrder = shufflePhotos(TOTAL_PHOTOS);

    for (let i = 0; i < SEQUENCE.length; i++) {
      if (sequenceFinished) break;

      const step     = SEQUENCE[i];
      const photoNum = photoOrder[i % photoOrder.length];
      const photoDur = step.photo ?? step.lyric;
      const lyricDur = step.lyric;

      // Foto y letra arrancan al mismo tiempo
      await Promise.all([
        showPhoto(photoSrc(photoNum)),
        showLyric(step.text),
      ]);

      // Las duraciones pueden ser distintas; esperamos la mayor
      // pero programamos el cambio de cada uno en su propio tiempo
      const maxDur = Math.max(photoDur, lyricDur);

      // Si la foto dura menos que la letra, ya cambiará en el next loop.
      // Usamos el max para asegurar que ambos terminen antes de avanzar.
      await wait(maxDur);

      currentPhotoIndex = (i + 1) % photoOrder.length;
    }

    await finishSequence();
  }

  // ── Fin de la secuencia ───────────────────────────

  async function finishSequence() {
    sequenceFinished = true;

    lyricLine.classList.add("hidden");
    lyricsArea.style.transition = "opacity 0.8s ease";
    lyricsArea.style.opacity    = "0";

    photoFrame.classList.add("fade-out");
    await wait(900);
    photoStage.style.display = "none";

    buildPhotoStack();
    photosStack.classList.add("visible");
  }

  function buildPhotoStack() {
    const positions = generateStackPositions(TOTAL_PHOTOS);

    for (let i = 1; i <= TOTAL_PHOTOS; i++) {
      const el  = document.createElement("div");
      const img = document.createElement("img");
      const pos = positions[i - 1];

      img.src     = photoSrc(i);
      img.alt     = `Recuerdo ${i}`;
      img.loading = "lazy";

      el.classList.add("stack-photo");
      el.style.setProperty("--rot", `${pos.rot}deg`);
      el.style.left          = pos.x + "%";
      el.style.top           = pos.y + "%";
      el.style.zIndex        = i;
      el.style.animationDelay = `${(i - 1) * 55}ms`;
      el.style.transform     = `rotate(${pos.rot}deg)`;

      el.appendChild(img);
      photosStack.appendChild(el);
    }
  }

  function generateStackPositions(n) {
    const positions = [];
    const cols = Math.ceil(Math.sqrt(n * 1.5));
    const rows = Math.ceil(n / cols);

    for (let i = 0; i < n; i++) {
      const col  = i % cols;
      const row  = Math.floor(i / cols);
      const baseX = (col / cols) * 72 + 4;
      const baseY = (row / rows) * 70 + 5;

      positions.push({
        x:   baseX + (Math.random() - 0.5) * 10,
        y:   baseY + (Math.random() - 0.5) * 10,
        rot: (Math.random() - 0.5) * 18,
      });
    }

    for (let i = positions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [positions[i], positions[j]] = [positions[j], positions[i]];
    }

    return positions;
  }

  // ── Navegación capítulo dos ───────────────────────

  window.goToChapterTwo = function () {
    document.body.classList.add("page-transition-out");
    setTimeout(() => { window.location.href = "capitulo2.html"; }, 600);
  };

  // ── Inicio ────────────────────────────────────────

  document.addEventListener("DOMContentLoaded", setupPlayScreen);
  if (document.readyState !== "loading") setupPlayScreen();

})();
