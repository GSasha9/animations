const videoL = document.getElementById('catVideoL');
const canvasL = document.getElementById('catCanvasL');
const ctxL = canvasL.getContext('2d');

let mouseX = canvasL.width / 2;
let mouseY = canvasL.height / 2;

canvasL.addEventListener('mousemove', (event) => {
  const rect = canvasL.getBoundingClientRect();

  mouseX = ((event.clientX - rect.left) * canvasL.width) / rect.width;
  mouseY = ((event.clientY - rect.top) * canvasL.height) / rect.height;
});

canvasL.addEventListener('mouseleave', () => {
  mouseX = canvasL.width / 2;
  mouseY = canvasL.height / 2;
});

function draw() {
  if (videoL.readyState >= 2) {
    ctxL.drawImage(videoL, 0, 0, canvasL.width, canvasL.height);

    const radius = 70;
    const zoom = 2;

    const scaleX = videoL.videoWidth / canvasL.width;
    const scaleY = videoL.videoHeight / canvasL.height;

    const videoX = mouseX * scaleX;
    const videoY = mouseY * scaleY;

    const sourceWidth = ((radius * 2) / zoom) * scaleX;
    const sourceHeight = ((radius * 2) / zoom) * scaleY;

    ctxL.save();
    ctxL.beginPath();
    ctxL.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
    ctxL.clip();

    ctxL.drawImage(
      videoL,
      videoX - sourceWidth / 2,
      videoY - sourceHeight / 2,
      sourceWidth,
      sourceHeight,
      mouseX - radius,
      mouseY - radius,
      radius * 2,
      radius * 2,
    );

    ctxL.restore();

    ctxL.beginPath();
    ctxL.arc(mouseX, mouseY, radius, 0, Math.PI * 2);
    ctxL.strokeStyle = 'white';
    ctxL.lineWidth = 4;
    ctxL.stroke();
  }

  requestAnimationFrame(draw);
}

requestAnimationFrame(draw);

videoL.play().catch((error) => {
  console.error('Не удалось запустить видео:', error);
});
