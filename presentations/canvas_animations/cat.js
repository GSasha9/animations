const canvasG = document.getElementById('game');
const ctxG = canvasG.getContext('2d');

//координаты курсора относительно canvas (при загрузке - по середине canvas)
const mouse = {
  x: canvasG.width / 2,
  y: canvasG.height / 2,
};

const room = new Image();
const cat = new Image();

room.src = './img/room.jpg';
cat.src = './img/cat.png';

const catData = {
  x: Math.random() * (canvasG.width - 150),
  y: Math.random() * (canvasG.height - 150),
  width: 150,
  height: 150,
};

let loaded = 0;

function checkLoaded() {
  loaded++;
  if (loaded === 2) {
    requestAnimationFrame(render);
  }
}

room.onload = checkLoaded;
cat.onload = checkLoaded;

canvasG.addEventListener('mousemove', (e) => {
  const rect = canvasG.getBoundingClientRect();

  mouse.x = (e.clientX - rect.left) * (canvasG.width / rect.width);
  mouse.y = (e.clientY - rect.top) * (canvasG.height / rect.height);
});

canvasG.addEventListener('click', () => {
  const dx = mouse.x - (catData.x + catData.width / 2);
  const dy = mouse.y - (catData.y + catData.height / 2);

  //вычисляем расстояние между точкой клика и центром кота
  const distance = Math.sqrt(dx * dx + dy * dy);

  if (distance < 60) {
    alert('Ты нашел кота 😺');

    catData.x = Math.random() * (canvasG.width - catData.width);
    catData.y = Math.random() * (canvasG.height - catData.height);
  }
});

function render() {
  ctxG.clearRect(0, 0, canvasG.width, canvasG.height);

  // фон
  ctxG.drawImage(room, 0, 0, canvasG.width, canvasG.height);

  // кот
  ctxG.drawImage(cat, catData.x, catData.y, catData.width, catData.height);

  // тьма + мягкий фонарик
  const gradient = ctxG.createRadialGradient(mouse.x, mouse.y, 40, mouse.x, mouse.y, 100);

  gradient.addColorStop(0, 'rgba(0,0,0,0)');
  gradient.addColorStop(1, 'rgba(0,0,0,0.95)');

  ctxG.fillStyle = gradient;
  ctxG.fillRect(0, 0, canvasG.width, canvasG.height);

  requestAnimationFrame(render);
}
