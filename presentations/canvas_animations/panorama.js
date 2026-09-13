document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('panoramaCanvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  const img = new Image();
  const canvasXSize = canvas.width;
  const canvasYSize = canvas.height;
  const y = 0;
  const dx = 0.75;
  const speed = 30;

  let x = 0;
  let imgW = 0;
  let imgH = 0;

  function draw() {
    if (!imgW || !imgH) return;

    ctx.clearRect(0, 0, canvasXSize, canvasYSize);
    ctx.drawImage(img, Math.round(x), y, imgW, imgH);
    ctx.drawImage(img, Math.round(x + imgW), y, imgW, imgH);

    if (x <= -imgW) {
      x = 0;
    }

    x -= dx;
  }

  img.onload = () => {
    imgW = img.width;
    imgH = img.height;
    setInterval(draw, speed);
  };

  img.onerror = () => {
    console.error('Не удалось загрузить панораму:', img.src);
  };

  img.src = './img/hills.jpg';
});
