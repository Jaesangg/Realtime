const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const fs = require("fs");
const path = require("path");
const Player = require("./models/player.model");

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

const PORT = 3000;

// 정적 파일 제공 (public 폴더에 있는 클라이언트 코드 제공)
app.use(express.static(path.join(__dirname, "../public")));

// 스테이지 데이터 로드
const stages = JSON.parse(
  fs.readFileSync(path.join(__dirname, "../assets/stage.json"), "utf-8")
);

let currentStageIndex = 0; // 현재 스테이지 인덱스
const players = {}; // 플레이어 상태 저장소

// 충돌 판정 함수
function checkCollision(player, obstacles) {
  return obstacles.some((obs) => {
    return (
      player.x < obs.x + obs.width &&
      player.x + player.width > obs.x &&
      player.y < obs.y + obs.height &&
      player.y + player.height > obs.y
    );
  });
}

// 점수 클리어 조건 확인
function checkScoreClear(score, goal) {
  return score >= goal;
}

// 위치 기반 스테이지 클리어 확인
function checkStageClear(player, goal) {
  return (
    player.x < goal.x + goal.width &&
    player.x + player.width > goal.x &&
    player.y < goal.y + goal.height &&
    player.y + player.height > goal.y
  );
}

// 다음 스테이지 데이터 반환
function getNextStage() {
  if (currentStageIndex + 1 < stages.length) {
    currentStageIndex += 1;
    return stages[currentStageIndex];
  }
  return null; // 마지막 스테이지 도달
}

// 웹소켓 연결
io.on("connection", (socket) => {
  console.log(`🔗 클라이언트 연결: ${socket.id}`);

  // 플레이어 객체 생성
  players[socket.id] = new Player(socket.id, 0, 0);

  // 현재 스테이지 데이터 전송
  socket.emit("loadStage", stages[currentStageIndex]);

  // 이동 이벤트 처리
  socket.on("move", (data) => {
    const player = players[socket.id];
    if (data.direction === "right") player.x += 10;
    if (data.direction === "left") player.x -= 10;
    if (data.direction === "up") player.y -= 10;
    if (data.direction === "down") player.y += 10;

    // 충돌 판정 확인
    if (checkCollision(player, stages[currentStageIndex].obstacles)) {
      console.log(`🚨 충돌 감지: ${socket.id}`);
      socket.emit("collision", { message: "충돌 발생!" });
    }

    // 스테이지 클리어 조건 확인
    const goal = { x: 750, y: 500, width: 50, height: 50 }; // 목표 지점
    if (checkStageClear(player, goal)) {
      console.log("🎉 스테이지 클리어!");
      socket.emit("stageClear", { message: "스테이지 클리어!" });

      const nextStage = getNextStage();
      if (nextStage) {
        socket.emit("loadStage", nextStage); // 다음 스테이지 전송
      } else {
        socket.emit("gameComplete", {
          message: "축하합니다! 모든 스테이지를 완료했습니다.",
        });
      }
    }

    // 플레이어 위치 업데이트
    io.emit("updatePlayer", { id: socket.id, x: player.x, y: player.y });
  });

  // 연결 해제 시
  socket.on("disconnect", () => {
    console.log(`❌ 연결 해제: ${socket.id}`);
    delete players[socket.id];
  });
});

// 서버 실행
server.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
