/**
 * Rasterises public/favicon.svg into the icon set browsers and platforms ask
 * for by name, into public/.
 *
 *   node scripts/generate-icons.mjs
 *
 * Dev-only, like scripts/generate-og.mjs: the outputs are committed and this is
 * re-run only when the mark changes. sharp is already a devDependency.
 *
 * WHY THESE FILES
 *
 * favicon.svg alone covers every current browser, and for a while that was the
 * whole story. It is not, for two reasons:
 *
 *   · Safari on iOS ignores it and requests /apple-touch-icon.png at a fixed
 *     path. Missing, that request hit the server's SPA fallback and came back
 *     as 152 kB of home-page HTML with a 200 — so iOS was handed an HTML
 *     document where it expected a PNG.
 *   · Several crawlers and link unfurlers still probe /favicon.ico first and
 *     do not fall back to the SVG.
 *
 * The mark already carries its own dark rounded square, so each raster is
 * flattened onto that same background rather than left transparent: iOS
 * composites an alpha icon onto white and would put a dark tile in a white
 * frame.
 */
import sharp from 'sharp';
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const SOURCE = join(PUBLIC, 'favicon.svg');

/* The `rect` fill in favicon.svg. Keep the two in step — a mismatch shows as a
   hairline of the wrong colour around the iOS icon. */
const BACKGROUND = '#08090A';

/* PNGs, by the name each consumer looks for. 180 is the size Apple asks for;
   192 and 512 are what a web manifest wants; 16/32 feed favicon.ico. */
const PNGS = [
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'icon-192.png', size: 192 },
  { file: 'icon-512.png', size: 512 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'favicon-16x16.png', size: 16 },
];

/* Sizes packed into favicon.ico. 48 is included because Windows and a few
   crawlers pick it, and it costs a few hundred bytes. */
const ICO_SIZES = [16, 32, 48];

const svg = readFileSync(SOURCE);

const render = (size) =>
  sharp(svg, { density: 384 })
    .resize(size, size, { fit: 'contain', background: BACKGROUND })
    .flatten({ background: BACKGROUND })
    .png({ compressionLevel: 9 })
    .toBuffer();

/**
 * A minimal ICO container around PNG payloads.
 *
 * ICO has allowed a whole PNG as an entry's image data since Windows Vista,
 * and every browser in use reads it — which means no BMP encoder and no extra
 * dependency, just a 6-byte header, one 16-byte directory entry per size, and
 * the PNGs concatenated after them.
 */
function buildIco(images) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // 1 = icon
  header.writeUInt16LE(images.length, 4);

  const entries = [];
  let offset = 6 + images.length * 16;

  for (const { size, data } of images) {
    const entry = Buffer.alloc(16);
    // 0 means 256 in this field; none of our sizes reach it, but be correct.
    entry.writeUInt8(size >= 256 ? 0 : size, 0);
    entry.writeUInt8(size >= 256 ? 0 : size, 1);
    entry.writeUInt8(0, 2); // palette size, 0 for truecolour
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // colour planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(data.length, 8);
    entry.writeUInt32LE(offset, 12);
    entries.push(entry);
    offset += data.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...images.map((i) => i.data),
  ]);
}

for (const { file, size } of PNGS) {
  const data = await render(size);
  writeFileSync(join(PUBLIC, file), data);
  console.log(`  ${file.padEnd(22)} ${size}x${size}  ${data.length}b`);
}

const icoImages = [];
for (const size of ICO_SIZES) {
  icoImages.push({ size, data: await render(size) });
}
const ico = buildIco(icoImages);
writeFileSync(join(PUBLIC, 'favicon.ico'), ico);
console.log(`  favicon.ico            ${ICO_SIZES.join('/')}     ${ico.length}b`);

console.log('\n[icons] written to public/\n');
