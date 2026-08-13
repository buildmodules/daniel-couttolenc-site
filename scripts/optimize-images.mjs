// Runs automatically before every build (see package.json "prebuild").
// Any image Daniel uploads via Tina lands in public/images as-is — Tina's
// git-based media manager doesn't compress anything on upload, and Astro's
// built-in image optimization (astro:assets) only processes images imported
// from src/, not files served from public/. This script closes that gap:
// it walks public/images and re-encodes anything oversized, using the same
// Sharp engine Astro uses internally, so uploads are safe no matter what
// Daniel sends.
import { readdir, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const IMAGES_DIR = path.resolve(import.meta.dirname, "..", "public", "images");
const MAX_DIM = 2000; // longest side, in px
const JPEG_QUALITY = 82;
const PNG_QUALITY = 82;
const MIN_BYTES_TO_SKIP = 400 * 1024; // below this + already within MAX_DIM, don't bother re-encoding

const IMAGE_EXT = new Set([".jpg", ".jpeg", ".png"]);

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function optimize(file) {
  const ext = path.extname(file).toLowerCase();
  if (!IMAGE_EXT.has(ext)) return { file, skipped: "unsupported format" };

  const before = (await stat(file)).size;
  if (before <= MIN_BYTES_TO_SKIP) {
    const meta = await sharp(file).metadata();
    if (Math.max(meta.width ?? 0, meta.height ?? 0) <= MAX_DIM) {
      return { file, skipped: "already small" };
    }
  }

  const image = sharp(file).rotate(); // rotate() with no args = auto-orient from EXIF, then strips it
  const meta = await image.metadata();
  const longest = Math.max(meta.width ?? 0, meta.height ?? 0);

  let pipeline = image;
  if (longest > MAX_DIM) {
    pipeline = pipeline.resize({
      width: meta.width && meta.width >= (meta.height ?? 0) ? MAX_DIM : undefined,
      height: meta.height && meta.height > (meta.width ?? 0) ? MAX_DIM : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const buffer =
    ext === ".png"
      ? await pipeline.png({ quality: PNG_QUALITY, compressionLevel: 9 }).toBuffer()
      : await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toBuffer();

  // Only overwrite if we actually saved space — re-encoding a well-compressed
  // file can occasionally come out larger.
  if (buffer.length >= before) {
    return { file, skipped: "re-encode didn't shrink it" };
  }

  const fs = await import("node:fs/promises");
  await fs.writeFile(file, buffer);
  return { file, before, after: buffer.length };
}

async function run() {
  let files;
  try {
    files = await walk(IMAGES_DIR);
  } catch {
    console.log("[optimize-images] no public/images directory, skipping.");
    return;
  }

  let optimizedCount = 0;
  let savedBytes = 0;
  let skippedCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const result = await optimize(file);
      if ("skipped" in result) {
        skippedCount++;
        continue;
      }
      optimizedCount++;
      savedBytes += result.before - result.after;
      console.log(
        `[optimize-images] ${path.relative(IMAGES_DIR, file)}: ${(result.before / 1024).toFixed(0)}KB → ${(result.after / 1024).toFixed(0)}KB`
      );
    } catch (err) {
      errorCount++;
      console.warn(`[optimize-images] could not process ${path.relative(IMAGES_DIR, file)}: ${err.message}`);
    }
  }

  console.log(
    `[optimize-images] done. ${optimizedCount} optimized (saved ${(savedBytes / 1024 / 1024).toFixed(2)}MB), ${skippedCount} already fine, ${errorCount} errors.`
  );
}

run();
