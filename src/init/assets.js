const fs = require("fs").promises;
const path = require("path");

async function loadAssets() {
  const assetsPath = path.join(__dirname, "../assets");

  try {
    const itemData = await fs.readFile(
      path.join(assetsPath, "item.json"),
      "utf-8"
    );
    const stageData = await fs.readFile(
      path.join(assetsPath, "stage.json"),
      "utf-8"
    );

    return {
      items: JSON.parse(itemData),
      stages: JSON.parse(stageData),
    };
  } catch (error) {
    console.error("❌ 게임 데이터를 로드하는 중 오류 발생:", error);
    throw error;
  }
}

module.exports = { loadAssets };
