/**
 * Image Optimization Script — pass 2: Hero images
 * Reads → processes in memory → writes back to same file using a temp file.
 */

import sharp from "sharp";
import { readFile, writeFile, stat } from "node:fs/promises";
import { join, basename } from "node:path";

const PUBLIC_IMAGE_DIR = join(process.cwd(), "public", "image");

const HERO_IMAGES = [
  "makalu-colombia-3631740.jpg",
  "cuidad-amurallada.jpg",
  "desierto-tatacoa.jpg",
  "guatape.jpg",
];

const OTHER_LARGE = [
  "Barichara_Santander_.jpg",
  "Orchidiarium_-_Medellin_Botanical_Gardens.jpg",
  "barranquilla.jpg",
  "cascade-juan-curi-colombie.jpg",
  "ibagúe-tolima.jpg",
  "lago-de-tota.jfif",
  "medellin.jpg",
  "murillo-tolima.jpg",
  "nevado-tolima.jpg",
  "villa de leyva.jpg",
  "cartagena.jfif",
  "castillo-san-felipe.jpg",
  // imagenes-pasadias
  "imagenes-pasadias/Bogota-city.jpg",
  "imagenes-pasadias/Cali.jpg",
  "imagenes-pasadias/bogota-zipaquira.jpg",
  "imagenes-pasadias/cartagena.jpg",
  "imagenes-pasadias/julianza-medellin-182353.jpg",
  "imagenes-pasadias/medellin.jpg",
  "imagenes-pasadias/san-andres-islas.jpg",
  "imagenes-pasadias/santa-marta.jpg",
  // legado-ancestral
  "legado-ancestral/rio-magdalena.jpg",
  "legado-ancestral/puente-de-cristal.jpg",
];

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(2) + " MB";
}

async function optimizeFile(relPath, maxWidth = 1920, quality = 80) {
  const fullPath = join(PUBLIC_IMAGE_DIR, relPath);
  const name = basename(relPath);

  try {
    const fileStats = await stat(fullPath);
    const originalSize = fileStats.size;

    // Read entire file into memory first
    const inputBuffer = await readFile(fullPath);
    const metadata = await sharp(inputBuffer).metadata();

    let pipeline = sharp(inputBuffer).rotate();

    if (metadata.width && metadata.width > maxWidth) {
      pipeline = pipeline.resize({ width: maxWidth, withoutEnlargement: true });
    }

    const ext = relPath.toLowerCase();
    if (ext.endsWith(".png")) {
      pipeline = pipeline.png({ quality, effort: 6 });
    } else {
      pipeline = pipeline.jpeg({ quality, mozjpeg: true });
    }

    const outputBuffer = await pipeline.toBuffer();

    if (outputBuffer.length < originalSize) {
      await writeFile(fullPath, outputBuffer);
      const savings = ((1 - outputBuffer.length / originalSize) * 100).toFixed(1);
      console.log(
        `✅ ${name}: ${formatBytes(originalSize)} → ${formatBytes(outputBuffer.length)} (${savings}% saved)`
      );
      return { original: originalSize, compressed: outputBuffer.length };
    } else {
      console.log(`⏭️  ${name}: ${formatBytes(originalSize)} — already optimal`);
      return { original: 0, compressed: 0 };
    }
  } catch (err) {
    console.log(`❌ ${name}: ${err.message}`);
    return { original: 0, compressed: 0 };
  }
}

async function main() {
  console.log("🔍 Compressing hero + large images...\n");

  let totalOrig = 0;
  let totalNew = 0;

  console.log("=== HERO IMAGES (max 1920px, quality 80) ===");
  for (const img of HERO_IMAGES) {
    const r = await optimizeFile(img, 1920, 80);
    totalOrig += r.original;
    totalNew += r.compressed;
  }

  console.log("\n=== OTHER LARGE IMAGES (max 1600px, quality 80) ===");
  for (const img of OTHER_LARGE) {
    const r = await optimizeFile(img, 1600, 80);
    totalOrig += r.original;
    totalNew += r.compressed;
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  if (totalOrig > 0) {
    console.log(
      `💾 Total: ${formatBytes(totalOrig)} → ${formatBytes(totalNew)} (${((1 - totalNew / totalOrig) * 100).toFixed(1)}% saved)`
    );
  }
}

main().catch(console.error);
