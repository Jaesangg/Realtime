const handlerMapping = require("../handlers/handlerMapping");

function initializeSocket(io, assets) {
  io.on("connection", (socket) => {
    console.log("🔗 클라이언트 연결:", socket.id);

    // 모든 이벤트 매핑
    for (const [event, handler] of Object.entries(handlerMapping)) {
      socket.on(event, (data) => handler(socket, data, assets));
    }

    socket.on("disconnect", () => {
      console.log(`❌ 연결 종료: ${socket.id}`);
    });
  });
}

module.exports = { initializeSocket };
