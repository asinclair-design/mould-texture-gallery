import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(process.cwd(), '..');
const originalsDir = path.join(root, 'originals');
const outDir = path.join(process.cwd(), 'public', 'textures');
const thumbDir = path.join(outDir, 'thumb');
const previewDir = path.join(outDir, 'preview');
const fullDir = path.join(outDir, 'full');

fs.mkdirSync(thumbDir, { recursive: true });
fs.mkdirSync(previewDir, { recursive: true });
fs.mkdirSync(fullDir, { recursive: true });

const files = fs.readdirSync(originalsDir).filter(f => f.toLowerCase().endsWith('.jpg')).sort();

/**
 * Image strategy:
 * - thumb: 360px wide, webp (quality 72)
 * - preview: 1400px wide, webp (quality 78)
 * - full: 2400px wide, webp (quality 82) — still "full" for zoom; originals kept outside public
 */
const sizes = {
  thumb: { width: 360, quality: 72 },
  preview: { width: 1400, quality: 78 },
  full: { width: 2400, quality: 82 },
};

const manifest = [];

function baseName(name) {
  return name.replace(/\.[^.]+$/, '');
}

for (let i = 0; i < files.length; i++) {
  const file = files[i];
  const src = path.join(originalsDir, file);
  const id = baseName(file);

  const thumbOut = path.join(thumbDir, `${id}.webp`);
  const previewOut = path.join(previewDir, `${id}.webp`);
  const fullOut = path.join(fullDir, `${id}.webp`);

  process.stdout.write(`[${i + 1}/${files.length}] ${file}\n`);

  const img = sharp(src, { failOn: 'none' }).rotate();
  const meta = await img.metadata();

  // Derivative exports
  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: sizes.thumb.width, withoutEnlargement: true })
    .webp({ quality: sizes.thumb.quality })
    .toFile(thumbOut);

  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: sizes.preview.width, withoutEnlargement: true })
    .webp({ quality: sizes.preview.quality })
    .toFile(previewOut);

  await sharp(src, { failOn: 'none' })
    .rotate()
    .resize({ width: sizes.full.width, withoutEnlargement: true })
    .webp({ quality: sizes.full.quality })
    .toFile(fullOut);

  const series = id.startsWith('JY') ? 'JY' : (id.startsWith('LH') ? 'LH' : 'Other');

  manifest.push({
    id,
    file,
    series,
    width: meta.width ?? null,
    height: meta.height ?? null,
    src: {
      thumb: `/textures/thumb/${id}.webp`,
      preview: `/textures/preview/${id}.webp`,
      full: `/textures/full/${id}.webp`,
    },
  });
}

fs.writeFileSync(path.join(process.cwd(), 'src', 'data', 'textures.json'), JSON.stringify(manifest, null, 2));
console.log(`\nWrote manifest: src/data/textures.json (${manifest.length} items)`);
