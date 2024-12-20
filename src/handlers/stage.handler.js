const { getRandomInt } = require("../utils/random");

// 스테이지 데이터
const stages = [
  { id: 1, obstacles: [{ x: 100, y: 300, width: 50, height: 50 }] },
  {
    id: 2,
    obstacles: [
      { x: 200, y: 350, width: 50, height: 50 },
      { x: 400, y: 400, width: 50, height: 50 },
    ],
  },
  {
    id: 3,
    obstacles: [
      { x: 150, y: 250, width: 70, height: 70 },
      { x: 300, y: 300, width: 70, height: 70 },
    ],
  },
];

let currentStageIndex = 0;

// 현재 스테이지 반환
function getCurrentStage() {
  return stages[currentStageIndex];
}

// 다음 스테이지 로드
function loadNextStage(socket) {
  currentStageIndex += 1;

  if (currentStageIndex >= stages.length) {
    socket.emit("gameComplete", {
      message: "축하합니다! 모든 스테이지를 클리어했습니다.",
    });
    return;
  }

  const nextStage = getCurrentStage();
  socket.emit("loadStage", nextStage);
}

// 랜덤 장애물 생성
function generateRandomStage() {
  const obstacles = [];
  const numObstacles = getRandomInt(5, 10);

  for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
      x: getRandomInt(50, 750),
      y: getRandomInt(100, 500),
      width: getRandomInt(30, 70),
      height: getRandomInt(30, 70),
    });
  }

  return { obstacles };
}

// 스테이지 클리어 조건 확인
function checkStageClear(player, socket) {
  if (player.score >= 100) {
    socket.emit("stageClear", { message: "스테이지 클리어!" });
    loadNextStage(socket);
  }
}

module.exports = {
  getCurrentStage,
  loadNextStage,
  checkStageClear,
  generateRandomStage,
};
