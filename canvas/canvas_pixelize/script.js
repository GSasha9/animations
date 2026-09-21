const video = document.getElementById('video');
const canvas = document.getElementById('pixelCanvas');

const ctx = canvas.getContext('2d');

// ==================================================
// Настройки
// ==================================================

const radius = 80;

// Чем больше число — тем крупнее пиксели
const pixelSize = 10;

// ==================================================
// Временный canvas для пикселизации
// ==================================================
//
// Весь кадр уменьшается, например:
//
// 640 × 360
// ↓
// 64 × 36
//
// А потом снова растягивается до:
//
// 640 × 360
//
// Поэтому геометрия изображения НЕ меняется.
// Меняется только детализация.
//

const pixelCanvas = document.createElement('canvas');

const pixelCtx = pixelCanvas.getContext('2d');

// Размер уменьшенной копии
pixelCanvas.width = Math.ceil(canvas.width / pixelSize);

pixelCanvas.height = Math.ceil(canvas.height / pixelSize);

// Очень важно:
// отключаем сглаживание
pixelCtx.imageSmoothingEnabled = false;

// ==================================================
// Положение курсора
// ==================================================

let mouseX = canvas.width / 2;
let mouseY = canvas.height / 2;

// ==================================================
// Отслеживание курсора
// ==================================================

canvas.addEventListener('mousemove', (event) => {
  const rect = canvas.getBoundingClientRect();

  mouseX = (event.clientX - rect.left) * (canvas.width / rect.width);

  mouseY = (event.clientY - rect.top) * (canvas.height / rect.height);
});

// Если мышь ушла с canvas,
// возвращаем круг в центр

canvas.addEventListener('mouseleave', () => {
  mouseX = canvas.width / 2;
  mouseY = canvas.height / 2;
});

// ==================================================
// Создание пикселизированного кадра
// ==================================================

function createPixelatedFrame() {
  // Берём ВЕСЬ кадр видео
  // и уменьшаем его целиком.

  pixelCtx.drawImage(
    video,

    0,
    0,
    video.videoWidth,
    video.videoHeight,

    0,
    0,
    pixelCanvas.width,
    pixelCanvas.height,
  );
}

// ==================================================
// Отрисовка
// ==================================================

function draw() {
  if (video.readyState >= 2) {
    // ----------------------------------------------
    // 1. Обычное видео
    // ----------------------------------------------

    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // ----------------------------------------------
    // 2. Создаём пикселизированную копию
    // всего видео
    // ----------------------------------------------

    createPixelatedFrame();

    // ----------------------------------------------
    // 3. Включаем круглую маску
    // ----------------------------------------------

    ctx.save();

    ctx.beginPath();

    ctx.arc(mouseX, mouseY, radius, 0, Math.PI * 2);

    ctx.clip();

    // ----------------------------------------------
    // 4. Растягиваем пикселизированный кадр
    // обратно на весь canvas
    // ----------------------------------------------

    ctx.imageSmoothingEnabled = false;

    ctx.drawImage(
      pixelCanvas,

      0,
      0,
      pixelCanvas.width,
      pixelCanvas.height,

      0,
      0,
      canvas.width,
      canvas.height,
    );

    // ----------------------------------------------
    // 5. Убираем маску
    // ----------------------------------------------

    ctx.restore();
  }

  requestAnimationFrame(draw);
}

// ==================================================
// Запуск
// ==================================================

requestAnimationFrame(draw);

// ==================================================
// Запуск видео
// ==================================================

video.play().catch((error) => {
  console.error('Не удалось запустить видео:', error);
});
