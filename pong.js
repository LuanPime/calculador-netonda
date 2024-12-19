const canvas = document.getElementById("pongCanvas");
const ctx = canvas.getContext("2d");

// Dimensões do jogo
const paddleWidth = 10, paddleHeight = 100;
const ballSize = 10;

// Posições iniciais
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 4, ballSpeedY = 4;
let playerY = (canvas.height - paddleHeight) / 2;
let aiY = (canvas.height - paddleHeight) / 2;

// Controle do jogador
document.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    playerY = e.clientY - rect.top - paddleHeight / 2;
});

// Desenho dos objetos
function drawRect(x, y, w, h, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, w, h);
}

function drawBall(x, y, size, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
}

// Lógica de movimentação
function updateGame() {
    // Movimento da bola
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    // Rebote superior/inferior
    if (ballY < 0 || ballY > canvas.height) ballSpeedY *= -1;

    // Rebote nas raquetes
    if (
        (ballX < paddleWidth && ballY > playerY && ballY < playerY + paddleHeight) ||
        (ballX > canvas.width - paddleWidth && ballY > aiY && ballY < aiY + paddleHeight)
    ) {
        ballSpeedX *= -1;
    }

    // Movimento do AI
    const aiCenter = aiY + paddleHeight / 2;
    if (aiCenter < ballY - 20) aiY += 4;
    else if (aiCenter > ballY + 20) aiY -= 4;

    // Pontos ou reinício
    if (ballX < 0 || ballX > canvas.width) {
        ballX = canvas.width / 2;
        ballY = canvas.height / 2;
        ballSpeedX *= -1; // Inverte a direção inicial
    }
}

// Loop principal
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar objetos
    drawRect(0, playerY, paddleWidth, paddleHeight, "white");
    drawRect(canvas.width - paddleWidth, aiY, paddleWidth, paddleHeight, "white");
    drawBall(ballX, ballY, ballSize, "white");

    updateGame();

    requestAnimationFrame(gameLoop);
}

gameLoop();
