const { TG, DZ, PN, MS, ZG, TFG, HN, HC, SI, PT, SG, JN, JM } = require('./constants')

// 年干支
function ygz(y) {
  const o = (y - 1984 + 600) % 60
  return { g: o % 10, z: o % 12 }
}

// 纳音五行局
const NJ = [4, 6, 3, 5, 4, 6, 2, 5, 4, 3, 2, 5, 6, 3, 2, 4, 6, 3, 5, 4, 6, 2, 5, 4, 3, 2, 5, 6, 3, 2]
function getNJ(g, z) {
  for (let i = 0; i < 60; i++) {
    if (i % 10 === g && i % 12 === z) return NJ[Math.floor(i / 2)]
  }
  return 3
}

// 宫干
function pg(yg, pz) {
  return ((yg % 5) * 2 + 2 + pz - 2 + 120) % 10
}

// 命宫
function calcMg(m, h) {
  return (1 + m - h + 120) % 12
}

// 身宫
function calcSg(yz, h) {
  return (yz + h) % 12
}

// 紫微星位
function zwp(d, j) {
  return (j - d + 360) % 12
}

// 天府星位
function tfp(zw) {
  return (1 - zw + 12) % 12
}

// 主星排布
function msp(d, j) {
  const zw = zwp(d, j)
  const tf = tfp(zw)
  return [
    zw, (zw - 1 + 12) % 12, (zw - 3 + 12) % 12, (zw - 4 + 12) % 12,
    (zw - 5 + 12) % 12, (zw - 8 + 12) % 12,
    tf, (tf + 1) % 12, (tf + 2) % 12, (tf + 3) % 12,
    (tf + 4) % 12, (tf + 5) % 12, (tf + 6) % 12, (tf + 10) % 12
  ]
}

// 辅星
function calcAux(yg, yz, m) {
  const ky = [[1, 7], [0, 8], [11, 9], [11, 9], [1, 7], [0, 8], [1, 7], [6, 2], [3, 5], [3, 5]]
  const [k, y] = ky[yg]
  return {
    k, y,
    c: (10 - yz + 12) % 12,
    q: (4 - yz + 12) % 12,
    z: (3 + m) % 12,
    r: (23 - m) % 12,
    l: [2, 3, 5, 6, 5, 6, 8, 9, 11, 0][yg]
  }
}

// 四化表
const SH = [
  [5, 13, 3, 2], [1, 11, 0, 7], [4, 1, 99, 5], [7, 4, 1, 9],
  [8, 7, 99, 1], [3, 8, 11, 99], [2, 3, 7, 4], [9, 2, 99, 99],
  [11, 0, 99, 3], [13, 9, 7, 8]
]

// 生成命盘
function generate(yr, mo, dy, hr, gd) {
  const { g: yg, z: yz } = ygz(yr)
  const mp = calcMg(mo, hr)
  const sp = calcSg(yz, hr)
  const mgn = pg(yg, mp)
  const j = getNJ(mgn, mp)
  const st = msp(dy, j)
  const ax = calcAux(yg, yz, mo)
  const sh = SH[yg]
  const isY = yg % 2 === 0
  const isM = gd === 'm'
  const fwd = (isY && isM) || (!isY && !isM)

  const cells = []
  for (let p = 0; p < 12; p++) {
    const pi = (p - mp + 12) % 12
    const pgn = pg(yg, p)
    const dxo = fwd ? (p - mp + 12) % 12 : (mp - p + 12) % 12
    const dxs = j + dxo * 10
    const msi = MS.map((_, i) => i).filter(i => st[i] === p)
    const axH = []
    if (ax.k === p) axH.push({ n: '天魁', c: 'ax' })
    if (ax.y === p) axH.push({ n: '天钺', c: 'ax' })
    if (ax.c === p) axH.push({ n: '文昌', c: 'ax' })
    if (ax.q === p) axH.push({ n: '文曲', c: 'ax' })
    if (ax.z === p) axH.push({ n: '左辅', c: 'ax' })
    if (ax.r === p) axH.push({ n: '右弼', c: 'ax' })
    if (ax.l === p) axH.push({ n: '禄存', c: 'ax' })

    const hH = []
    sh.forEach((si, hi) => {
      if (si < 14 && st[si] === p) hH.push({ l: HN[hi], c: HC[hi], s: MS[si] })
    })

    cells.push({
      p, pi, pgn, msi,
      msn: msi.map(i => MS[i]),
      axH, hH, dxs,
      im: p === mp,
      is: p === sp
    })
  }

  return { cells, mp, sp, yg, yz, j, fwd, yr, mo, dy, hr, gd, st, sh }
}

// 生成解读数据
function generateInterp(result) {
  const { cells, mp, yg, yz, j, st, sh } = result
  const mc = cells[mp]
  const ms = mc.msn
  const ps = ms[0] || '空宫'

  // 命宫解读
  const mingItems = []
  if (ms.length === 0) {
    const op = cells[(mp + 6) % 12]
    mingItems.push({
      title: '命宫空宫',
      desc: `命宫无主星，参看对宫${DZ[(mp + 6) % 12]}宫：${op.msn.join('、') || '亦无星'}。倪师言：空宫不空，对宫飞化入则有影响。`
    })
  } else {
    ms.forEach(s => {
      const gua = SG[s]
      mingItems.push({
        title: `${s}坐命`,
        desc: SI[s] || '',
        gua: gua ? { g: gua.g, n: gua.n, m: gua.m } : null
      })
    })
  }
  mingItems.push({ title: JN[j], desc: JM[j] || '' })

  // 三方四正
  const sfIdx = [0, 4, 8, 6]
  const sfN = ['命宫', '财帛', '官禄', '迁移']
  const sanfangItems = sfIdx.map((o, i) => {
    const c = cells[(mp + o) % 12]
    return {
      title: `${sfN[i]}（${DZ[(mp + o) % 12]}宫）`,
      msn: c.msn.length ? c.msn.join('、') : '空宫',
      hH: c.hH,
      note: PT[PN[c.pi]] || ''
    }
  })

  // 四化解读
  const sihuaItems = []
  sh.forEach((si, hi) => {
    if (si >= 14) return
    const sp2 = st[si]
    const pi = (sp2 - mp + 12) % 12
    const pn = PN[pi]
    const hiDesc = [
      '禄在此处，顺畅有益，宜发力经营。',
      '权在此处，有主导权，可担大任。',
      '科在此处，声誉好，有贵人。',
      '忌在此处，执念所在，卡关多费心力。倪师：忌不是坏，是最在意的地方。'
    ]
    sihuaItems.push({
      title: `${MS[si]}${HN[hi]} · 入${pn}`,
      desc: `${MS[si]}落于${DZ[sp2]}宫（${pn}）。${hiDesc[hi]}`,
      note: PT[pn] || ''
    })
  })

  // 易经启示
  const wx = ['', '', '水', '木', '金', '土', '火'][j]
  const wm = {
    '水': '☵坎 — 柔顺处下，以不争而胜',
    '木': '☴☳ — 生发向上，生机勃勃',
    '金': '☰☱ — 刚决收敛，义利并重',
    '土': '☷☶ — 厚重承载，稳中求进',
    '火': '☲离 — 光明付出，文明化成'
  }
  const yijingItems = [
    { title: '五行局 · 卦象', desc: `${JN[j]}对应${wx}行。${wm[wx] || ''}`, sub: '易经核心：世界始终在变化，人的关键能力是观察形势、把握时机、顺势调整自己。' }
  ]
  const pg2 = SG[ps]
  if (pg2) {
    yijingItems.push({ title: `${ps} · ${pg2.n}`, gua: { g: pg2.g, m: pg2.m } })
  }
  const ji = sh[3]
  if (ji < 14) {
    const jp = PN[(st[ji] - mp + 12) % 12]
    yijingItems.push({
      title: '化忌 · 易经启示',
      desc: `${MS[ji]}化忌落于${jp}。`,
      note: `忌非凶，是"执"。${jp}是你最在意的地方，也是成长的突破口。坎卦曰：习坎，有孚，维心亨。身处险难，心正则通。`
    })
  }

  return { mingItems, sanfangItems, sihuaItems, yijingItems }
}

// 构建命盘网格排列顺序
function getChartLayout(cells) {
  // 原始4x4排列：第一行5678，第二行4-center-9，第三行3-center-10，第四行2,1,0,11
  const topRow = [5, 6, 7, 8]
  const leftCol = [4, 3]
  const rightCol = [9, 10]
  const bottomRow = [2, 1, 0, 11]
  return { topRow, leftCol, rightCol, bottomRow }
}

module.exports = {
  ygz, generate, generateInterp, getChartLayout,
  TG, DZ, PN, MS
}
