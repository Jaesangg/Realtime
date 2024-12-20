const { getRandomInt } = require("../utils/random");

// 랜덤 장애물 생성 함수
function generateRandomStage() {
  const obstacles = [];
  const numObstacles = getRandomInt(5, 10); // 장애물 수는 5~10개 사이로 랜덤 설정

  for (let i = 0; i < numObstacles; i++) {
    obstacles.push({
      x: getRandomInt(50, 750), // x 위치 (캔버스 범위 내)
      y: getRandomInt(100, 500), // y 위치
      width: getRandomInt(30, 70), // 장애물 너비
      height: getRandomInt(30, 70), // 장애물 높이
    });
  }

  return { obstacles };
}

module.exports = { generateRandomStage };
