document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.querySelector('.house-demo-canvas');

  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  if (!ctx) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Стены
  ctx.strokeRect(125, 150, 250, 150);

  // Крыша
  ctx.beginPath();
  ctx.moveTo(105, 150);
  ctx.lineTo(250, 50);
  ctx.lineTo(395, 150);
  ctx.closePath();
  ctx.stroke();

  // Дверь
  ctx.strokeRect(220, 210, 60, 90);

  // Круглое окно
  ctx.beginPath();
  ctx.arc(170, 200, 30, 0, Math.PI * 2);
  ctx.stroke();
});
