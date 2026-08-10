function createSpinner(canvas) {
  const ctx = canvas.getContext('2d');

  const cx = canvas.width / 2;
  const cy = canvas.height / 2;
  const radius = 35;
  const lineWidth = 6;

  let rotation = 0;
  let frameId;

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    //сохраняем состояние до начала рисования (В это состояние входят:
    // текущая система координат;
    // цвет (fillStyle, strokeStyle);
    // толщина линии (lineWidth);
    // прозрачность (globalAlpha);
    // поворот, масштаб и т.д.)
    ctx.save();
    //переносим начало координат в центр
    ctx.translate(cx, cy);
    //поворачиваем всю систему координат
    ctx.rotate(rotation);

    // Градиент вдоль окружности
    const gradient = ctx.createLinearGradient(-radius, 0, radius, 0);
    gradient.addColorStop(0.0, '#c8ff00');
    gradient.addColorStop(0.4, '#00a000');
    gradient.addColorStop(1.0, '#008000');

    ctx.beginPath();
    ctx.lineWidth = lineWidth;
    ctx.lineCap = 'round';
    ctx.strokeStyle = gradient;

    ctx.arc(0, 0, radius, 0, Math.PI * 2);

    ctx.stroke();

    ctx.restore();

    rotation += 0.03;
    frameId = requestAnimationFrame(render);
  }

  render();

  return {
    stop() {
      cancelAnimationFrame(frameId);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
  };
}

createSpinner(document.getElementById('loader'));
