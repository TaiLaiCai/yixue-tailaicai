// 八卦名与符号
const TNAMES = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤']
const TSYM = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']

// 文王序数表 [上卦][下卦]
const HTBL = [
  [1, 43, 14, 34, 9, 5, 26, 11],
  [10, 58, 38, 54, 61, 60, 41, 19],
  [13, 49, 30, 55, 37, 63, 22, 36],
  [25, 17, 21, 51, 42, 3, 27, 24],
  [44, 28, 50, 32, 57, 48, 18, 46],
  [6, 47, 64, 40, 59, 29, 4, 7],
  [33, 31, 56, 62, 53, 39, 52, 15],
  [12, 45, 35, 16, 20, 8, 23, 2]
]

// 卦名
const HNAMES = ['', '乾', '坤', '屯', '蒙', '需', '讼', '师', '比', '小畜', '履',
  '泰', '否', '同人', '大有', '谦', '豫', '随', '蛊', '临', '观',
  '噬嗑', '贲', '剥', '复', '无妄', '大畜', '颐', '大过', '坎', '离',
  '咸', '恒', '遁', '大壮', '晋', '明夷', '家人', '睽', '蹇', '解',
  '损', '益', '夬', '姤', '萃', '升', '困', '井', '革', '鼎',
  '震', '艮', '渐', '归妹', '丰', '旅', '巽', '兑', '涣', '节',
  '中孚', '小过', '既济', '未济']

// 反查：序号 -> [上卦索引, 下卦索引]
const HPOS = {}
for (let u = 0; u < 8; u++) {
  for (let l = 0; l < 8; l++) {
    HPOS[HTBL[u][l]] = [u, l]
  }
}

// 八卦属性
const TDATA = {
  '乾': { char: '刚健', elem: '天', force: '进', eu: '局势积极，主动有利，宜进取', el: '内心坚定，意志坚强，行动力充沛', care: '宜主动进取，担当领导，有贵人支持', wlth: '财星旺，主动开拓可获利', love: '感情主动，关系强势，情感表达略偏理性', hlth: '气血充沛，注意不要过劳', adv: '当断则断，勇于推进，但防过刚失人心', time: '秋季、金日为佳' },
  '坤': { char: '柔顺', elem: '地', force: '守', eu: '环境稳定，宜沉稳应对，急进不利', el: '心态平稳，包容力强，基础扎实', care: '宜守成辅佐，稳扎稳打，配合效果好', wlth: '财运稳健，适合积累，不宜冒险', love: '温柔包容，感情稳固，宜耐心等待', hlth: '注意脾胃消化，保持规律作息', adv: '以柔制刚，耐心蓄力，时机到来自然水到渠成', time: '长夏、土日有利' },
  '震': { char: '动荡', elem: '雷', force: '动', eu: '外部变动，机遇与风险并存，把握时机', el: '内心焦虑或亢奋，行动力强，定力待加强', care: '宜开创新局，行动破局，但需防冲动', wlth: '财来财去，注意时机把握，不宜重仓', love: '感情波动较大，热烈但不稳定，需要稳定', hlth: '注意神经紧张，肝气过旺', adv: '震后须镇定，把握初动之机，但勿因情绪化决策', time: '春季、木日最旺' },
  '巽': { char: '渗透', elem: '风', force: '入', eu: '外部影响渗入，需灵活应变，以柔克刚', el: '思维灵活，善于变通，策略感强', care: '宜以柔克刚，循序渐进，不宜强攻', wlth: '财来路多，需持续经营，细水长流', love: '感情细腻，进展较慢但稳固', hlth: '注意风寒，适当保暖', adv: '渗透而非强攻，反复申令，持续推进', time: '春末夏初、木日为佳' },
  '坎': { char: '险陷', elem: '水', force: '险', eu: '外部险阻较多，需谨慎应对，心正可过', el: '内心有压力，潜在风险大，定力是关键', care: '当前有阻力，宜谨慎守正，勿轻进', wlth: '财路有险，不宜冒进，守住现有为先', love: '感情存在考验，需坚守诚心，不宜浮躁', hlth: '注意肾脏和泌尿系统，防水湿', adv: '习坎有孚，心正则通，险难中坚守本心是出路', time: '冬季、水日谨慎，过险后自然好转' },
  '离': { char: '附丽', elem: '火', force: '明', eu: '外部明朗，机遇显现，宜展现自我', el: '内心热情，思维清晰，感召力强', care: '宜展现才能，适合文创、表达、展示类', wlth: '财运明朗，付出有回报，名利双收可期', love: '感情热烈，互相吸引，防闪热闪冷', hlth: '注意心脏和眼睛，防上火', adv: '光明磊落，以诚待人，才华展示自然招引机遇', time: '夏季、火日最旺' },
  '艮': { char: '静止', elem: '山', force: '止', eu: '外部停滞，宜等待时机，急进无益', el: '内心镇定，善于等待，节奏稳健', care: '宜暂停观察，等待更好时机再行动', wlth: '守财为主，不宜此时扩张投入', love: '感情平稳，宜稳固现有关系，勿轻举妄动', hlth: '注意关节和脊柱，适当运动', adv: '知止而后有定，等待转机比强行推进更有效', time: '冬春之交、土日适合沉淀' },
  '兑': { char: '喜悦', elem: '泽', force: '说', eu: '外部和谐，人际顺畅，沟通有利', el: '心情愉悦，表达欲强，社交活跃', care: '宜沟通合作，谈判议价，人际关系推动事业', wlth: '财来自人际合作，宜拓展关系', love: '感情活跃，桃花运旺，关系进展顺利', hlth: '注意口腔和肺部，防呼吸道问题', adv: '以悦纳人，善用口才和人情，但防口舌是非', time: '秋季、金日人际运最佳' }
}

// 特殊卦覆盖
const HOVER = {
  1: { nat: '大吉', tag: 'ji', note: '纯阳之卦，自强不息，天时地利人和俱备' },
  2: { nat: '中吉', tag: 'ji', note: '纯阴之卦，厚德载物，以柔顺积累为正道' },
  11: { nat: '大吉', tag: 'ji', note: '泰卦，天地交融，诸事顺遂，难得吉象' },
  12: { nat: '不利', tag: 'xiong', note: '否卦，天地不交，上下不通，宜暂守勿进' },
  29: { nat: '险', tag: 'xiong', note: '重坎之卦，险上加险，心正方可出险，切忌冒进' },
  30: { nat: '中吉', tag: 'zhong', note: '双离之卦，光明磊落，文采风流，名声吉象' },
  63: { nat: '中吉', tag: 'zhong', note: '既济，事已成，但要防松懈，守成为要' },
  64: { nat: '转机', tag: 'bian', note: '未济，尚未完成，转机在即，坚持可成' },
  10: { nat: '中吉', tag: 'zhong', note: '履卦，在危险中前行，礼数是最好的保护' },
  13: { nat: '吉', tag: 'ji', note: '同人卦，志同道合，合作顺利，宜广结同道' },
  15: { nat: '大吉', tag: 'ji', note: '谦卦，六爻皆吉，唯谦者得，谦受益盈招损' },
  47: { nat: '困', tag: 'xiong', note: '困卦，君子困而不失其志，守正待时' },
  48: { nat: '中吉', tag: 'zhong', note: '井卦，滋养众人，位置稳定，宜发挥所长' }
}

const QTFOCUS = {
  general: 'career,wealth,love,health',
  career: 'career',
  wealth: 'wealth',
  love: 'love',
  health: 'health',
  decision: 'career,wealth'
}

// 三线转八卦索引
function toTrigIdx(l0, l1, l2) {
  const v = (l2 ? 4 : 0) + (l1 ? 2 : 0) + (l0 ? 1 : 0)
  return 7 - v
}

// 八卦索引转三线
function trigramLines(idx) {
  const binMap = [7, 6, 5, 4, 3, 2, 1, 0]
  const v = binMap[idx]
  return [(v >> 0) & 1, (v >> 1) & 1, (v >> 2) & 1]
}

// 铜钱法 - 单次投掷
function tossCoin() {
  const results = [
    Math.random() < 0.5 ? 3 : 2,
    Math.random() < 0.5 ? 3 : 2,
    Math.random() < 0.5 ? 3 : 2
  ]
  const sum = results.reduce((a, b) => a + b, 0)
  const isYang = sum === 7 || sum === 9
  const isMoving = sum === 6 || sum === 9
  return { results, sum, isYang, isMoving, val: sum }
}

// 时间起卦
function buildByTime() {
  const now = new Date()
  const y = now.getFullYear()
  const m = now.getMonth() + 1
  const d = now.getDate()
  const h = now.getHours()
  const min = now.getMinutes()
  const upperIdx = (y + m + d) % 8
  const lowerIdx = (y + m + d + h) % 8
  const movingLine = ((y + m + d + h + min) % 6) + 1
  return buildFromTrigrams(upperIdx, lowerIdx, movingLine)
}

// 数字起卦
function buildByNumbers(n1, n2, n3) {
  const upperIdx = (n1 - 1) % 8
  const lowerIdx = (n2 - 1) % 8
  const movingLine = (n3 > 0 && n3 <= 6) ? n3 : ((n1 + n2) % 6) + 1
  return buildFromTrigrams(upperIdx, lowerIdx, movingLine)
}

// 从上下卦构建六爻
function buildFromTrigrams(upperIdx, lowerIdx, movingLine) {
  const ll = trigramLines(lowerIdx)
  const ul = trigramLines(upperIdx)
  const allLines = [...ll, ...ul]
  const lines = allLines.map((isY, i) => ({
    val: isY ? 7 : 8,
    isYang: isY === 1,
    isMoving: i + 1 === movingLine
  }))
  if (movingLine >= 1 && movingLine <= 6) {
    const ml = lines[movingLine - 1]
    ml.val = ml.isYang ? 9 : 6
  }
  return lines
}

// 从六爻计算卦象
function calcFromLines(lines) {
  const lowerIdx = toTrigIdx(lines[0].isYang, lines[1].isYang, lines[2].isYang)
  const upperIdx = toTrigIdx(lines[3].isYang, lines[4].isYang, lines[5].isYang)
  const hexNum = HTBL[upperIdx][lowerIdx]
  const movingLines = lines.map((l, i) => l.isMoving ? i + 1 : null).filter(Boolean)

  let changedHexNum = 0
  if (movingLines.length > 0) {
    const changedLines = lines.map(l => l.isMoving ? { ...l, isYang: !l.isYang } : l)
    const clLower = toTrigIdx(changedLines[0].isYang, changedLines[1].isYang, changedLines[2].isYang)
    const clUpper = toTrigIdx(changedLines[3].isYang, changedLines[4].isYang, changedLines[5].isYang)
    changedHexNum = HTBL[clUpper][clLower]
  }

  const mutLower = toTrigIdx(lines[1].isYang, lines[2].isYang, lines[3].isYang)
  const mutUpper = toTrigIdx(lines[2].isYang, lines[3].isYang, lines[4].isYang)
  const mutHexNum = HTBL[mutUpper][mutLower]

  const revLines = lines.map(l => ({ ...l, isYang: !l.isYang }))
  const revLower = toTrigIdx(revLines[0].isYang, revLines[1].isYang, revLines[2].isYang)
  const revUpper = toTrigIdx(revLines[3].isYang, revLines[4].isYang, revLines[5].isYang)
  const revHexNum = HTBL[revUpper][revLower]

  const oppHexNum = HTBL[lowerIdx][upperIdx]

  return { hexNum, movingLines, changedHexNum, mutHexNum, revHexNum, oppHexNum, upperIdx, lowerIdx }
}

// 生成解读
function generateInterp(calcResult, question, qtype, method, birthYear) {
  const { hexNum, changedHexNum, mutHexNum, revHexNum, oppHexNum, upperIdx, lowerIdx, movingLines } = calcResult
  const upper = TDATA[TNAMES[upperIdx]]
  const lower = TDATA[TNAMES[lowerIdx]]
  const ov = HOVER[hexNum] || {}
  const now = new Date()

  let natTag = ov.tag || 'zhong'
  let natText = ov.nat || '中性'
  if (!ov.nat) {
    if (upper.force === '进' && lower.force === '进') { natTag = 'ji'; natText = '上吉' }
    else if (upper.force === '险' || lower.force === '险') { natTag = 'xiong'; natText = '险' }
    else if (upper.force === '止' && lower.force === '止') { natTag = 'zhong'; natText = '守' }
    else { natTag = 'zhong'; natText = '中平' }
  }

  const hasChanged = changedHexNum > 0
  const [cui, cli] = hasChanged ? (HPOS[changedHexNum] || [upperIdx, lowerIdx]) : [upperIdx, lowerIdx]
  const changedUpper = TDATA[TNAMES[cui]]
  const changedLower = TDATA[TNAMES[cli]]

  const methodMap = { coin: '铜钱起卦（三枚铜钱法）', time: '时间起卦（梅花易数时间法）', number: '数字起卦（梅花易数数字法）' }
  const hexUC = String.fromCodePoint(0x4DC0 + hexNum - 1)
  const changedUC = changedHexNum ? String.fromCodePoint(0x4DC0 + changedHexNum - 1) : ''
  const mutUC = mutHexNum ? String.fromCodePoint(0x4DC0 + mutHexNum - 1) : ''
  const revUC = revHexNum ? String.fromCodePoint(0x4DC0 + revHexNum - 1) : ''
  const oppUC = oppHexNum ? String.fromCodePoint(0x4DC0 + oppHexNum - 1) : ''

  const yaoNames = ['', '初', '二', '三', '四', '五', '上']

  const movDesc = movingLines.length === 0 ? '无动爻，当前局面较为稳定，变化不大。' :
    movingLines.length === 1 ? `${yaoNames[movingLines[0]]}爻为动爻，是此卦的关键着力点，牵一发而动全身。` :
    `${movingLines.map(m => `${yaoNames[m]}爻`).join('、')}均为动爻，变化幅度较大，局势正在转化中。`

  const overallNote = ov.note || `${TNAMES[upperIdx]}上${TNAMES[lowerIdx]}下，外部${upper.eu.split('，')[0]}，内部${lower.el.split('，')[0]}。`

  // 分项详解
  const focused = QTFOCUS[qtype].split(',')
  const fieldMap = {
    career: { label: '事业/工作', upper: upper.care, change: changedUpper.care },
    wealth: { label: '财运/投资', upper: upper.wlth, change: changedUpper.wlth },
    love: { label: '感情/婚姻', upper: upper.love, change: changedUpper.love },
    health: { label: '健康', upper: upper.hlth, change: changedUpper.hlth }
  }

  const detailItems = []
  focused.forEach(f => {
    if (!fieldMap[f]) return
    const fd = fieldMap[f]
    detailItems.push({ label: fd.label, text: fd.upper + (hasChanged ? `（变卦显示：${fd.change}）` : ''), primary: true })
  })
  Object.keys(fieldMap).forEach(f => {
    if (focused.includes(f)) return
    detailItems.push({ label: fieldMap[f].label, text: fieldMap[f].upper.split('，')[0] + '。', primary: false })
  })

  // 时间判断
  const timeAdv = hasChanged ?
    `${TNAMES[upperIdx]}主${upper.time}，当前以应对变局为主；变卦${HNAMES[changedHexNum]}显示转机约在${upper.time.replace('为佳', '后')}前后。` :
    `${upper.time}，行动时机在于${upper.force === '进' ? '即刻推进' : upper.force === '止' ? '再等一段时机' : '审时度势，适时而动'}。`

  // 行动建议
  const advices = [
    upper.adv,
    hasChanged ? `变卦${HNAMES[changedHexNum]}提示：${changedLower.adv}` : lower.adv,
    movingLines.length > 0 ? `关注${yaoNames[movingLines[0]]}爻的变化，这是当前局势的关键节点` : '卦象平稳，按既定节奏推进即可',
    natTag === 'ji' ? '时机有利，宜果断行动，不宜拖延错失' :
    natTag === 'xiong' ? '当前阻力较大，宜守正待机，不宜强进' :
    '审时度势，小步试探，灵活调整',
    qtype === 'wealth' ? '投资决策建议小额试探，观察反应后再加码，风险控制优先于利润追求' :
    qtype === 'love' ? '感情宜以诚心沟通为先，减少猜疑和情绪化反应' :
    qtype === 'decision' ? `从卦象看，${natTag === 'ji' ? '此事可为，宜择时推进' : natTag === 'xiong' ? '此事目前阻力大，建议暂缓' : '此事可为但需稳步，不宜过急'}` :
    '聚焦核心目标，减少分散，提高执行效率'
  ]

  const conclusion = `此卦主${HNAMES[hexNum]}，${natTag === 'ji' ? '整体顺遂，宜主动进取' : natTag === 'xiong' ? '险阻当前，宜守正待机' : '局势中平，宜审时度势'}；宜${upper.adv.split('，')[0]}；忌过刚冒进${lower.force === '险' ? '、轻举妄动' : ''}。`

  return {
    castInfo: {
      question,
      method: methodMap[method],
      time: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${now.getHours()}时${now.getMinutes()}分`,
      birthYear
    },
    hexagram: {
      hexUC, hexNum, hexName: HNAMES[hexNum],
      upperSym: TSYM[upperIdx], upperName: TNAMES[upperIdx],
      lowerSym: TSYM[lowerIdx], lowerName: TNAMES[lowerIdx],
      natTag, natText,
      movingLines, movDesc: movingLines.length ? movingLines.map(m => `${yaoNames[m]}爻`).join('、') : '无动爻（静卦）',
      changedUC, changedName: changedHexNum ? HNAMES[changedHexNum] : '',
      changedDesc: changedHexNum ? `${changedUC} ${HNAMES[changedHexNum]}（代表事情走向与结局）` : '无（静卦，事情较为稳定）',
      mutUC, mutName: HNAMES[mutHexNum],
      revUC, revName: HNAMES[revHexNum],
      oppUC, oppName: HNAMES[oppHexNum]
    },
    overall: {
      overallNote,
      tendency: natTag === 'ji' ? '整体偏吉，有利条件多于阻力' : natTag === 'xiong' ? '当前形势有险，需谨慎应对，勿轻进' : natTag === 'bian' ? '局势正在转变，变化为主，把握时机为要' : '整体中平，利弊参半，关键在于应对策略',
      favorable: `${upper.char}，${lower.el.split('，')[1] || '内部基础稳健'}`,
      unfavorable: `需防过于冒进，同时注意${lower.force === '险' ? '内部压力过大' : '定力和时机把握'}`,
      movDesc,
      changeNote: hasChanged ? `本卦代表现状（${HNAMES[hexNum]}），变卦${HNAMES[changedHexNum]}代表走向与结局。` : '卦象较为稳定，以本卦为主要参考。'
    },
    detailItems,
    timeAdvice: {
      progress: timeAdv,
      goodTime: upper.time,
      cautionTime: lower.force === '险' ? '当前阶段整体需谨慎' : '变爻发动前后，情绪化决策期'
    },
    advices,
    conclusion
  }
}

module.exports = {
  TNAMES, TSYM, HNAMES, HPOS,
  tossCoin, buildByTime, buildByNumbers, buildFromTrigrams,
  calcFromLines, generateInterp
}
