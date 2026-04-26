const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT = '/Users/ghost/Downloads/The Shore Academy Brand Kit.png';
const OUT_DIR = './public/images';

async function extractBrandShots() {
  if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });
  const meta = await sharp(INPUT).metadata();
  const { width, height } = meta;
  console.log(`Brand kit dimensions: ${width}x${height}`);
  const panelWidth = Math.floor(width / 5);
  const topCrop = Math.floor(height * 0.60);
  const cropHeight = height - topCrop;

  for (let i = 0; i < 5; i++) {
    await sharp(INPUT)
      .extract({ left: i * panelWidth, top: topCrop, width: panelWidth, height: cropHeight })
      .jpeg({ quality: 90 })
      .toFile(path.join(OUT_DIR, `brand-shot-${i + 1}.jpg`));
    console.log(`Saved brand-shot-${i + 1}.jpg`);
  }
  console.log('All brand shots extracted.');
}

extractBrandShots().catch(console.error);
