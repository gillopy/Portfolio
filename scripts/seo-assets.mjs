// scripts/seo-assets.mjs
// Idempotent SEO asset generator for the "seo-fixes" change.
//
// Produces five public/ assets before the build:
//   1. og-default.jpg  -> resized to 1200x630 (sharp, cover-crop, JPEG q82)
//   2. favicon.ico     -> PNG-in-ICO container wrapping favicon-32x32.png
//   3. apple-touch-icon.png -> byte copy of favicon-180x180.png
//   4. icon-192.png    -> rasterized from favicon.svg (PWA manifest icon)
//   5. icon-512.png    -> rasterized from favicon.svg (PWA manifest icon)
//
// Note: sharp CANNOT encode or decode ICO (it silently writes raw PNG bytes
// for a .ico target and cannot read them back), so the ICO container is
// wrapped by hand and validated at the byte level. See design #94 D1/D2.
//
// Usage: bun scripts/seo-assets.mjs

import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const pub = (...segments) => path.join(root, 'public', ...segments);

const OG_TARGET = { width: 1200, height: 630 };
const MANIFEST_ICON_SIZES = [192, 512];
// Sanity band for the white "GC" glyph coverage over the total canvas
// (design #103 D1 measurements: ~11.9-12.2%). Catches a blank or
// degenerate raster that would still pass a dimensions-only check.
const WHITE_RATIO_RANGE = [0.08, 0.18];

function assert(condition, message) {
	if (!condition) {
		console.error(`\n[seo-assets] ASSERTION FAILED: ${message}`);
		process.exit(1);
	}
}

// --- 1. og-default.jpg resize (guarded) -----------------------------------
async function buildOgImage() {
	const file = pub('og-default.jpg');
	const meta = await sharp(file).metadata();

	if (meta.width === OG_TARGET.width && meta.height === OG_TARGET.height) {
		console.log(`[seo-assets] og-default.jpg already ${OG_TARGET.width}x${OG_TARGET.height} -> skip`);
		return;
	}

	const buf = await sharp(file)
		.resize(OG_TARGET.width, OG_TARGET.height, { fit: 'cover', position: 'centre' })
		.jpeg({ quality: 82 })
		.toBuffer();
	await writeFile(file, buf);
	console.log(`[seo-assets] og-default.jpg resized ${meta.width}x${meta.height} -> ${OG_TARGET.width}x${OG_TARGET.height}`);
}

// --- 2. favicon.ico (manual PNG-in-ICO wrap) ------------------------------
// ICONDIR (6 bytes): reserved=0(u16), type=1(u16), count=1(u16)
// ICONDIRENTRY (16 bytes): width(u8), height(u8), colorCount(u8), reserved(u8),
//   planes(u16), bitCount(u16), bytesInRes(u32), imageOffset(u32)
// PNG payload follows at imageOffset (= 22).
function validatePngIhdr(png, expectedSize, label) {
	const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
	assert(png.subarray(0, 8).equals(signature), `${label}: not a PNG (bad signature)`);
	assert(png.subarray(12, 16).toString('ascii') === 'IHDR', `${label}: IHDR chunk not found`);
	const width = png.readUInt32BE(16);
	const height = png.readUInt32BE(20);
	assert(width === expectedSize && height === expectedSize,
		`${label}: expected ${expectedSize}x${expectedSize}, got ${width}x${height}`);
}

async function buildFaviconIco() {
	const png = await readFile(pub('favicon-32x32.png'));
	validatePngIhdr(png, 32, 'favicon-32x32.png');

	const header = Buffer.alloc(6);
	header.writeUInt16LE(0, 0); // reserved
	header.writeUInt16LE(1, 2); // type = icon
	header.writeUInt16LE(1, 4); // count = 1 entry

	const dir = Buffer.alloc(16);
	dir.writeUInt8(32, 0); // width
	dir.writeUInt8(32, 1); // height
	dir.writeUInt8(0, 2); // colorCount
	dir.writeUInt8(0, 3); // reserved
	dir.writeUInt16LE(1, 4); // planes
	dir.writeUInt16LE(32, 6); // bitCount
	dir.writeUInt32LE(png.length, 8); // bytesInRes = PNG length
	dir.writeUInt32LE(22, 12); // imageOffset = 6 + 16

	await writeFile(pub('favicon.ico'), Buffer.concat([header, dir, png]));
	console.log(`[seo-assets] favicon.ico built (PNG-in-ICO, 32x32, ${22 + png.length} bytes)`);
}

// --- 3. apple-touch-icon.png (copy) ---------------------------------------
async function buildAppleTouchIcon() {
	const src = await readFile(pub('favicon-180x180.png'));
	validatePngIhdr(src, 180, 'favicon-180x180.png');
	await writeFile(pub('apple-touch-icon.png'), src);
	console.log(`[seo-assets] apple-touch-icon.png copied from favicon-180x180.png (${src.length} bytes)`);
}

// --- 4. PWA manifest icons (icon-192.png, icon-512.png) -------------------
// FONT DEPENDENCY (design #103 D1 residual risk): favicon.svg renders the
// white "GC" monogram with `font-family="Inter, sans-serif"`. sharp/librsvg
// resolves that against the fonts INSTALLED ON THIS MACHINE. On a machine
// without Inter, the raster silently falls back to the system sans font —
// the numeric checks below (dimensions + white-pixel-ratio band) still pass,
// but the glyph shape differs. If regenerating on a non-Inter machine, do a
// visual confirm of icon-512.png against the browser favicon before commit.
async function buildManifestIcons() {
	const svg = await readFile(pub('favicon.svg'));

	for (const size of MANIFEST_ICON_SIZES) {
		const file = pub(`icon-${size}.png`);

		let existing = null;
		try {
			existing = await sharp(file).metadata();
		} catch {
			// sharp 0.35 throws a plain "Input file is missing" Error (no ENOENT
			// code) for absent files; missing or unreadable both mean regenerate.
			existing = null;
		}

		if (existing && existing.width === size && existing.height === size) {
			console.log(`[seo-assets] icon-${size}.png already ${size}x${size} -> skip`);
			continue;
		}

		const buf = await sharp(svg, { density: (72 * size) / 100 })
			.resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
			.png()
			.toBuffer();
		await writeFile(file, buf);
		console.log(`[seo-assets] icon-${size}.png generated from favicon.svg`);
	}
}

// Fraction of pixels that are (near-)white across all RGB channels — the
// "GC" glyph coverage. Guards against a blank or degenerate icon.
async function whitePixelRatio(file) {
	const { data, info } = await sharp(file)
		.ensureAlpha()
		.raw()
		.toBuffer({ resolveWithObject: true });
	const total = info.width * info.height;
	let white = 0;
	for (let i = 0; i < data.length; i += info.channels) {
		if (data[i] > 200 && data[i + 1] > 200 && data[i + 2] > 200) white++;
	}
	return white / total;
}

// --- assertions -----------------------------------------------------------
async function verify() {
	const og = await sharp(pub('og-default.jpg')).metadata();
	assert(og.width === 1200 && og.height === 630, `og-default.jpg is ${og.width}x${og.height}, expected 1200x630`);

	const ico = await readFile(pub('favicon.ico'));
	assert(ico.length > 22, 'favicon.ico too small');
	assert(ico.readUInt16LE(0) === 0 && ico.readUInt16LE(2) === 1, 'favicon.ico bad ICONDIR magic [0,1]');
	assert(ico.readUInt16LE(4) === 1, 'favicon.ico entry count != 1');
	const imageOffset = ico.readUInt32LE(18);
	assert(imageOffset === 22, `favicon.ico imageOffset ${imageOffset} != 22`);
	// IHDR lives at imageOffset + 8 (signature) + 4 (chunk length) + 4 (chunk type) = +16
	const ihdrWidth = ico.readUInt32BE(imageOffset + 16);
	const ihdrHeight = ico.readUInt32BE(imageOffset + 20);
	assert(ihdrWidth === 32 && ihdrHeight === 32, `favicon.ico IHDR ${ihdrWidth}x${ihdrHeight} != 32x32`);
	assert(ico.readUInt32LE(14) === ico.length - 22, 'favicon.ico bytesInRes mismatch');

	const apple = await sharp(pub('apple-touch-icon.png')).metadata();
	assert(apple.width === 180 && apple.height === 180, `apple-touch-icon.png is ${apple.width}x${apple.height}`);

	for (const size of MANIFEST_ICON_SIZES) {
		const icon = await sharp(pub(`icon-${size}.png`)).metadata();
		assert(icon.width === size && icon.height === size,
			`icon-${size}.png is ${icon.width}x${icon.height}, expected ${size}x${size}`);
		const ratio = await whitePixelRatio(pub(`icon-${size}.png`));
		assert(ratio >= WHITE_RATIO_RANGE[0] && ratio <= WHITE_RATIO_RANGE[1],
			`icon-${size}.png white-pixel ratio ${ratio.toFixed(4)} outside [${WHITE_RATIO_RANGE[0]}, ${WHITE_RATIO_RANGE[1]}]`);
		console.log(`[seo-assets] icon-${size}.png verified: ${size}x${size}, white ratio ${ratio.toFixed(4)}`);
	}

	console.log('[seo-assets] all outputs verified.');
}

await buildOgImage();
await buildFaviconIco();
await buildAppleTouchIcon();
await buildManifestIcons();
await verify();
console.log('[seo-assets] done.');
