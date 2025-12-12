const fs = require("fs");
const path = require("path");
const sprite = require("svg-sprite");

const config = {
  mode: {
    symbol: {
      dest: "dist",
      sprite: "sprite.svg",
    }
  }
};

const spriter = new sprite(config);
const iconDir = path.resolve(__dirname, "icons");

fs.readdirSync(iconDir).forEach(file => {
  if (file.endsWith(".svg")) {
    const filePath = path.join(iconDir, file);
    spriter.add(filePath, null, fs.readFileSync(filePath, "utf-8"));
  }
});

spriter.compile((error, result) => {
  if (error) {
    console.error("Error generating sprite:", error);
  } else {
    const output = result.symbol.sprite;
    fs.mkdirSync(path.dirname(output.path), { recursive: true });
    fs.writeFileSync(output.path, output.contents);
    // Copy to public/
    fs.copyFileSync(output.path, path.resolve(__dirname, "public/sprite.svg"));
    console.log("✅ Sprite generated at public/sprite.svg");
  }
});
