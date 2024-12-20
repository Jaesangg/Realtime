class Player {
  constructor(id, x, y) {
    this.id = id;
    this.x = x; // X 좌표
    this.y = y; // Y 좌표
    this.width = 50; // 캐릭터 너비
    this.height = 50; // 캐릭터 높이
  }
}

module.exports = Player;
