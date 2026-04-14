const fs = require('fs');

const src1 = "C:\\Users\\kadady\\.gemini\\antigravity\\brain\\bd2bebc2-9e04-448f-a0fa-851ae3482ddc\\sokari_founder_portrait_1775188887632.png";
const dest1 = "c:\\Users\\kadady\\Desktop\\Projects\\Sokari\\sokari-web\\public\\img\\founder.png";

const src2 = "C:\\Users\\kadady\\.gemini\\antigravity\\brain\\bd2bebc2-9e04-448f-a0fa-851ae3482ddc\\sokari_hero_premium_1775188860306.png";
const dest2 = "c:\\Users\\kadady\\Desktop\\Projects\\Sokari\\sokari-web\\public\\img\\hero.png";

try {
  fs.copyFileSync(src1, dest1);
  console.log("Copied founder.png successfully!");
  fs.copyFileSync(src2, dest2);
  console.log("Copied hero.png successfully!");
} catch (e) {
  console.error("Error copying files:", e);
}
