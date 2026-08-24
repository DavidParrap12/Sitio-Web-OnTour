/**
 * One-off: downscale oversized source images in public/image.
 * - Max width 2000px (plenty for 2x retina at 1000px display)
 * - JPEG quality 82, mozjpeg; PNG kept as PNG with compressionLevel 9
 * - Skips files already within budget
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { readdirSync, statSync, writeFileSync, copyFileSync } from "fs";
import { join, extname } from "path";

const ROOT = join(process.cwd(), "public", "image");
const MAX_WIDTH = 2000;
const JPEG_QUALITY = 82;
const MIN_BYTES_TO_BOTHER = 150 * 1024; // don't touch small files

const exts = new Set([".jpg", ".jpeg", ".png"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p, out);
    else if (exts.has(extname(name).toLowerCase())) out.push(p);
  }
  return out;
}

const files = walk(ROOT);
let beforeTotal = 0, afterTotal = 0, changed = 0, skipped = 0;

for (const file of files) {
  const before = statSync(file).size;
  beforeTotal += before;
  if (before < MIN_BYTES_TO_BOTHER) { afterTotal += before; skipped++; continue; }

  try {
    const img = sharp(file, { failOn: "none" });
    const meta = await img.metadata();

    let pipe = img.rotate(); // auto-orient by EXIF
    if ((meta.width ?? 0) > MAX_WIDTH) {
      pipe = pipe.resize({ width: MAX_WIDTH, withoutEnlargement: true });
    }

    const isPng = extname(file).toLowerCase() === ".png";
    const outBuffer = isPng
      ? await pipe.png({ compressionLevel: 9, palette: true }).toBuffer()
      : await pipe.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

    if (outBuffer.length < before) {
      writeFileSync(file, outBuffer);
      afterTotal += outBuffer.length;
      changed++;
      console.log(`${(before / 1024).toFixed(0)}KB -> ${(outBuffer.length / 1024).toFixed(0)}KB  ${file}`);
    } else {
      afterTotal += before; // recompress was bigger; keep original
      skipped++;
    }
  } catch (err) {
    console.error(`SKIP (error) ${file}: ${err.message}`);
    afterTotal += before;
    skipped++;
  }
}

console.log(`\nDone. ${changed} optimized, ${skipped} skipped.`);
console.log(`Total: ${(beforeTotal / 1048576).toFixed(1)}MB -> ${(afterTotal / 1048576).toFixed(1)}MB`);
