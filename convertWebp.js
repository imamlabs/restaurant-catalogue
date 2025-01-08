const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceDir = path.resolve(__dirname, './dist/heros'); 
const outputDir = path.resolve(__dirname, './dist/heros'); 


if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}


fs.readdirSync(sourceDir).forEach((file) => {
  const filePath = path.join(sourceDir, file);
  const outputFilePath = path.join(outputDir, `${path.parse(file).name}.webp`);


  sharp(filePath).toFile(outputFilePath, (err, info) => {
    if (err) {
      console.error(`Error converting ${file}:`, err);
    } else {
      console.log(`Converted ${file} to WebP.`);
    }
  });
});
