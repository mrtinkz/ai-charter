import zlib from 'node:zlib'
import { writeFileSync } from 'node:fs'

// One-off generator: rasterize the diamond + "AI" mark to PNG for Google Search
// favicon, which is unreliable with SVG-only. Run: node scripts/gen-favicon.mjs

const S = 48
const cx = (S - 1) / 2
const cy = (S - 1) / 2
const R = 23 // diamond half-diagonal
const BORDER = 3

const FILL = [0xea, 0xf3, 0xff]
const STROKE = [0x0a, 0x0a, 0x0a]
const TEXT = [0x3b, 0x82, 0xf6]
const WHITE = [0xff, 0xff, 0xff]

// 5x7 glyphs, scaled x2 -> 10x14, centered.
const GLYPHS = {
  A: ['01110', '10001', '10001', '11111', '10001', '10001', '10001'],
  I: ['11111', '00100', '00100', '00100', '00100', '00100', '11111'],
}
const SCALE = 2
const GW = 5 * SCALE
const GH = 7 * SCALE
const GAP = 2
const textW = GW * 2 + GAP
const textX0 = Math.round(cx - textW / 2)
const textY0 = Math.round(cy - GH / 2)

function inGlyph(px, py) {
  for (let g = 0; g < 2; g++) {
    const glyph = g === 0 ? GLYPHS.A : GLYPHS.I
    const gx0 = textX0 + g * (GW + GAP)
    const lx = px - gx0
    const ly = py - textY0
    if (lx < 0 || lx >= GW || ly < 0 || ly >= GH) continue
    const row = glyph[Math.floor(ly / SCALE)]
    if (row[Math.floor(lx / SCALE)] === '1') return true
  }
  return false
}

const raw = Buffer.alloc((S * 4 + 1) * S)
let o = 0
for (let y = 0; y < S; y++) {
  raw[o++] = 0 // filter: none
  for (let x = 0; x < S; x++) {
    const d = Math.abs(x - cx) + Math.abs(y - cy)
    let rgb = WHITE
    let a = 0
    if (d <= R) {
      a = 255
      if (inGlyph(x, y)) rgb = TEXT
      else if (d >= R - BORDER) rgb = STROKE
      else rgb = FILL
    }
    raw[o++] = rgb[0]
    raw[o++] = rgb[1]
    raw[o++] = rgb[2]
    raw[o++] = a
  }
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length, 0)
  const typeBuf = Buffer.from(type, 'ascii')
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])) >>> 0, 0)
  return Buffer.concat([len, typeBuf, data, crc])
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()
function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

const ihdr = Buffer.alloc(13)
ihdr.writeUInt32BE(S, 0)
ihdr.writeUInt32BE(S, 4)
ihdr[8] = 8 // bit depth
ihdr[9] = 6 // color type RGBA
const png = Buffer.concat([
  Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
  chunk('IHDR', ihdr),
  chunk('IDAT', zlib.deflateSync(raw)),
  chunk('IEND', Buffer.alloc(0)),
])

writeFileSync(new URL('../public/favicon.png', import.meta.url), png)
console.log('wrote public/favicon.png', png.length, 'bytes')
