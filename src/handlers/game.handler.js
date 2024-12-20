module.exports = {
  startGame: (socket, data, assets) => {
    console.log("🎮 게임 시작:", data);
    socket.emit("gameStarted", { message: "게임이 시작되었습니다!", assets });
  },
  endGame: (socket, data) => {
    console.log("🛑 게임 종료:", data);
    socket.emit("gameEnded", { message: "게임이 종료되었습니다!" });
  },
};

// 예시: 플레이어 객체
const player = {
  x: 50,
  y: 50,
  width: 30,
  height: 30,
  speed: 5,
};

// 키 입력 처리
const keys = {};
window.addEventListener("keydown", (e) => {
  keys[e.key] = true; // 키가 눌림
});

window.addEventListener("keyup", (e) => {
  keys[e.key] = false; // 키가 떼어짐
});

// 이동 로직
function updatePlayer() {
  if (keys["ArrowLeft"]) player.x -= player.speed; // 왼쪽
  if (keys["ArrowRight"]) player.x += player.speed; // 오른쪽
  if (keys["ArrowUp"]) player.y -= player.speed; // 위
  if (keys["ArrowDown"]) player.y += player.speed; // 아래
}
