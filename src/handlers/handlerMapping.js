const gameHandler = require("./game.handler");
const stageHandler = require("./stage.handler");

module.exports = {
  startGame: gameHandler.startGame,
  endGame: gameHandler.endGame,
  stageProgress: stageHandler.updateStage,
};
