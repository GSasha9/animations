const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");


// Основная функция рисования
function drawGame() {

    // Очистка экрана
    ctx.clearRect(0, 0, canvas.width, canvas.height);


    // Фон игры

    ctx.fillStyle = "#101820";
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    // Верхняя панель интерфейса

    ctx.fillStyle = "#1f4068";
    ctx.fillRect(0, 0, 600, 50);

    ctx.fillStyle = "white";
    ctx.font = "24px Arial";
    ctx.fillText("SCORE: 250", 20, 32);



    // Игровое поле

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    ctx.strokeRect(20, 70, 560, 300);



    // Платформа игрока

    ctx.fillStyle = "#00ff88";
    ctx.fillRect(250, 330, 100, 20);


    // Мяч

    ctx.beginPath();

    ctx.fillStyle = "#ffd700";

    ctx.arc(
        480, // x
        180, // y
        20,  // радиус
        0,
        Math.PI * 2
    );

    ctx.fill();


    // Текст внутри игры

    ctx.fillStyle = "white";
    ctx.font = "18px Arial";

    ctx.fillText(
        "Catch the ball!",
        210,
        100
    );
}

drawGame();