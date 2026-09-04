/* Cuts the hardware renders out of their white studio background.
 *
 * A colorkey is the wrong tool here and the first attempt proved it: it removes white
 * pixels ANYWHERE, so it punched holes straight through the kiosk's own white UI panels
 * and screen glare. Only white that is CONNECTED TO THE BORDER is background, so this
 * flood-fills inward from the frame edge instead and leaves interior whites alone.
 *
 * Decode and encode go through ffmpeg; the fill and the framing are done on raw RGBA here.
 */
import { execFileSync } from 'node:child_process'
import { mkdirSync } from 'node:fs'

const SRC = '/Users/crave/Downloads/DANSON/qbotweb2026-main/public'
const OUT = '/Users/crave/Downloads/DANSON/qbot/public/images/hardware'
mkdirSync(OUT, { recursive: true })

const WORK = 1800        // work resolution; output is 720x900, so this keeps 2x headroom
const OUT_W = 720, OUT_H = 900
const BG = 246           // a pixel this bright on every channel counts as background…
const EDGE = 232         // …and this bright counts as anti-aliased edge, worth feathering

/* dims() and raw() MUST agree on the decoded size. They did not at first: this refuses to
   upscale, while scale=WORK:WORK:force_original_aspect_ratio=decrease happily scales a
   1200px source UP to 1800px. The raw buffer was then read at the wrong stride and the
   image sheared into a grey slab. Both now use the same explicit width and height. */
function dims(file) {
  const out = execFileSync('ffprobe', ['-v', 'error', '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height', '-of', 'csv=p=0', `${SRC}/${file}`]).toString().trim()
  const [w, h] = out.split(',').map(Number)
  const s = Math.min(WORK / w, WORK / h, 1)   // never upscale a source
  return { w: Math.round(w * s), h: Math.round(h * s) }
}

const raw = (file, w, h) =>
  execFileSync('ffmpeg', [
    '-v', 'error', '-i', `${SRC}/${file}`,
    '-vf', `scale=${w}:${h}`,
    '-pix_fmt', 'rgba', '-f', 'rawvideo', '-',
  ], { maxBuffer: 1 << 30 })

function cutout(name, file) {
  const { w, h } = dims(file)
  const buf = raw(file, w, h)
  const N = w * h
  if (buf.length < N * 4) throw new Error(`${name}: decoded ${buf.length} bytes, expected ${N * 4}`)
  const isBg = new Uint8Array(N)          // 1 = flood-reached background

  const bright = (i, t) => {
    const o = i * 4
    return buf[o] >= t && buf[o + 1] >= t && buf[o + 2] >= t
  }

  // Flood fill inward from every border pixel. Iterative stack — a recursive fill
  // blows the stack at three million pixels.
  const stack = []
  for (let x = 0; x < w; x++) { stack.push(x, (h - 1) * w + x) }
  for (let y = 0; y < h; y++) { stack.push(y * w, y * w + w - 1) }
  while (stack.length) {
    const i = stack.pop()
    if (isBg[i] || !bright(i, BG)) continue
    isBg[i] = 1
    const x = i % w, y = (i / w) | 0
    if (x > 0) stack.push(i - 1)
    if (x < w - 1) stack.push(i + 1)
    if (y > 0) stack.push(i - w)
    if (y < h - 1) stack.push(i + w)
  }

  // Alpha: background clear, and the anti-aliased rim feathered by how white it is,
  // so the product does not ship with a hard white outline against the page ink.
  let minX = w, minY = h, maxX = -1, maxY = -1
  for (let i = 0; i < N; i++) {
    const o = i * 4
    if (isBg[i]) { buf[o + 3] = 0; continue }
    const x = i % w, y = (i / w) | 0
    const touchesBg =
      (x > 0 && isBg[i - 1]) || (x < w - 1 && isBg[i + 1]) ||
      (y > 0 && isBg[i - w]) || (y < h - 1 && isBg[i + w])
    if (touchesBg && bright(i, EDGE)) {
      const lum = Math.min(buf[o], buf[o + 1], buf[o + 2])
      buf[o + 3] = Math.max(0, Math.min(255, Math.round(((255 - lum) / (255 - EDGE)) * 255)))
    }
    if (buf[o + 3] > 8) {
      if (x < minX) minX = x; if (x > maxX) maxX = x
      if (y < minY) minY = y; if (y > maxY) maxY = y
    }
  }

  // Frame every product to the same fraction of tile height, so a Stand and a Duo
  // sit evenly in one grid despite being nothing like the same shape.
  const bw = maxX - minX + 1, bh = maxY - minY + 1
  let ch = Math.round(bh * 1.12)
  let cw = Math.round(ch * (OUT_W / OUT_H))
  if (cw < bw * 1.06) { cw = Math.round(bw * 1.06); ch = Math.round(cw * (OUT_H / OUT_W)) }
  let cx = Math.round(minX + bw / 2 - cw / 2)
  let cy = Math.round(minY + bh / 2 - ch / 2)

  // The crop may run off the source; pad with transparency rather than shifting the
  // product off-centre, which would break the grid's alignment.
  const out = Buffer.alloc(cw * ch * 4, 0)
  for (let y = 0; y < ch; y++) {
    const sy = cy + y
    if (sy < 0 || sy >= h) continue
    for (let x = 0; x < cw; x++) {
      const sx = cx + x
      if (sx < 0 || sx >= w) continue
      buf.copy(out, (y * cw + x) * 4, (sy * w + sx) * 4, (sy * w + sx) * 4 + 4)
    }
  }

  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-f', 'rawvideo', '-pix_fmt', 'rgba', '-s', `${cw}x${ch}`, '-i', 'pipe:0',
    '-vf', `scale=${OUT_W}:${OUT_H}:flags=lanczos`,
    `${OUT}/${name}.png`,
  ], { input: out })

  console.log(`${name.padEnd(12)} src ${w}x${h}  bbox ${bw}x${bh}  crop ${cw}x${ch}+${cx}+${cy}`)
}

cutout('q1-stand', 'Q_STAND_1.webp')
cutout('q1-desktop', 'QBOT_DEKSTOP_1.webp')
cutout('q1-duo', 'qduo-v2.webp')
