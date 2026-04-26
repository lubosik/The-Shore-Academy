const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const INPUT = '/Users/ghost/Downloads/The Shore Academy Logo Removed.png';
const OUT_DIR = './public';

const sizes = [
  { name: 'favicon-16x16.png',          size: 16  },
  { name: 'favicon-32x32.png',          size: 32  },
  { name: 'favicon-48x48.png',          size: 48  },
  { name: 'apple-touch-icon.png',       size: 180 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'og-image.png',               size: 1200, height: 630 },
];

async function generate() {
  const img = sharp(INPUT);

  for (const { name, size, height } of sizes) {
    const dest = path.join(OUT_DIR, name);
    if (height) {
      await sharp({
        create: {
          width: size,
          height: height,
          channels: 4,
          background: { r: 18, g: 58, b: 90, alpha: 1 },
        }
      })
        .composite([{
          input: await sharp(INPUT).resize(Math.min(height * 0.8, 500)).toBuffer(),
          gravity: 'center',
        }])
        .png()
        .toFile(dest);
    } else {
      await img.clone().resize(size, size, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } }).png().toFile(dest);
    }
    console.log(`Generated: ${name}`);
  }

  const icoBase = await sharp(INPUT)
    .resize(32, 32, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
    .png()
    .toBuffer();
  fs.writeFileSync(path.join(OUT_DIR, 'favicon.ico'), icoBase);
  console.log('Generated: favicon.ico');

  console.log('All favicons generated.');
}

generate().catch(console.error);
