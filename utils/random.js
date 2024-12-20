// 범위 내 랜덤 숫자 생성
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = { getRandomInt };
