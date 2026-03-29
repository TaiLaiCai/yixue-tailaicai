const dv = require('../../utils/divination')

Page({
  data: {
    step: 1,
    question: '',
    qtype: 'general',
    birthYear: '',
    qtypes: [
      { val: 'general', label: '综合 / 总运' },
      { val: 'career', label: '事业 / 工作' },
      { val: 'wealth', label: '财运 / 投资' },
      { val: 'love', label: '感情 / 婚姻' },
      { val: 'health', label: '健康' },
      { val: 'decision', label: '决策 / 是否' }
    ],
    method: 'coin',
    coins: [
      { isHead: true, spinning: false },
      { isHead: true, spinning: false },
      { isHead: true, spinning: false }
    ],
    roundText: '第一爻（从下往上起卦）',
    tossDisabled: false,
    coinResult: '',
    timeDisplay: '',
    num1: '', num2: '', num3: '',
    displayLines: [
      { sym: '', cls: '', label: '', show: false },
      { sym: '', cls: '', label: '', show: false },
      { sym: '', cls: '', label: '', show: false },
      { sym: '', cls: '', label: '', show: false },
      { sym: '', cls: '', label: '', show: false },
      { sym: '', cls: '', label: '', show: false }
    ],
    result: null
  },

  _lines: [],
  _castRound: 0,
  _clockTimer: null,

  onQuestionInput(e) { this.setData({ question: e.detail.value }) },
  onBirthYearInput(e) { this.setData({ birthYear: e.detail.value }) },
  onSelectQtype(e) { this.setData({ qtype: e.currentTarget.dataset.val }) },
  onNum1(e) { this.setData({ num1: e.detail.value }) },
  onNum2(e) { this.setData({ num2: e.detail.value }) },
  onNum3(e) { this.setData({ num3: e.detail.value }) },

  goStep2() {
    if (!this.data.question.trim()) {
      wx.showToast({ title: '请输入研习主题', icon: 'none' })
      return
    }
    this._lines = []
    this._castRound = 0
    this.setData({
      step: 2,
      displayLines: Array(6).fill(null).map(() => ({ sym: '', cls: '', label: '', show: false }))
    })
    this.updateTimeClock()
  },

  setMethod(e) {
    const m = e.currentTarget.dataset.m
    this.setData({ method: m })
    if (m === 'time') this.updateTimeClock()
  },

  updateTimeClock() {
    if (this._clockTimer) clearInterval(this._clockTimer)
    const update = () => {
      const now = new Date()
      const pad = n => String(n).padStart(2, '0')
      this.setData({
        timeDisplay: `${now.getFullYear()}年${now.getMonth() + 1}月${now.getDate()}日 ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`
      })
    }
    update()
    this._clockTimer = setInterval(update, 1000)
  },

  onUnload() {
    if (this._clockTimer) clearInterval(this._clockTimer)
  },

  // ── 铜钱法 ──
  onToss() {
    if (this.data.tossDisabled || this._castRound >= 6) return
    this.setData({ tossDisabled: true })

    const toss = dv.tossCoin()
    const { results, sum, isYang, isMoving } = toss

    // 更新硬币显示
    const coins = results.map(r => ({ isHead: r === 3, spinning: true }))
    this.setData({ coins })

    setTimeout(() => {
      // 停止旋转
      const stoppedCoins = coins.map(c => ({ ...c, spinning: false }))
      this.setData({ coins: stoppedCoins })

      this._lines.push({ val: sum, isYang, isMoving })
      this._castRound++
      const round = this._castRound

      // 更新爻线显示 (displayLines 从6到1，对应index 0-5，但从底部到顶部)
      const yaoNames = ['', '初', '二', '三', '四', '五', '上']
      const cls = isMoving ? (isYang ? 'mov-y' : 'mov-n') : (isYang ? 'yang' : 'yin')
      const lab = (isMoving ? (isYang ? '老阳→变' : '老阴→变') : (isYang ? '少阳' : '少阴')) + ` (${yaoNames[round]}爻)`
      const sym = isYang ? '━━━' : '━ ━'

      // 更新对应行 (第round行，从底部开始，displayLines[6-round])
      const lineIdx = 6 - round
      const key = `displayLines[${lineIdx}]`
      this.setData({
        [key]: { sym, cls, label: lab, show: true }
      })

      // 结果文字
      const smap = { 9: '老阳(动)', 7: '少阳', 8: '少阴', 6: '老阴(动)' }
      this.setData({
        coinResult: `${results.map(r => r === 3 ? '正' : '反').join('  ')}  →  ${smap[sum]}`
      })

      if (round < 6) {
        this.setData({
          roundText: `第${yaoNames[round + 1]}爻`,
          tossDisabled: false
        })
      } else {
        this.setData({ roundText: '六爻已成，卦象完成' })
        setTimeout(() => this.calcAndShow(), 700)
      }
    }, 600)
  },

  // ── 时间法 ──
  onTimeMethod() {
    if (this._clockTimer) clearInterval(this._clockTimer)
    const lines = dv.buildByTime()
    this._lines = lines
    this._castRound = 6
    this.showAllLines(lines)
    setTimeout(() => this.calcAndShow(), 500)
  },

  // ── 数字法 ──
  onNumberMethod() {
    const n1 = parseInt(this.data.num1) || 0
    const n2 = parseInt(this.data.num2) || 0
    const n3 = parseInt(this.data.num3) || 0
    if (!n1 || !n2) {
      wx.showToast({ title: '请输入两个数字', icon: 'none' })
      return
    }
    const lines = dv.buildByNumbers(n1, n2, n3)
    this._lines = lines
    this._castRound = 6
    this.showAllLines(lines)
    setTimeout(() => this.calcAndShow(), 500)
  },

  showAllLines(lines) {
    const yaoNames = ['', '初', '二', '三', '四', '五', '上']
    const displayLines = lines.map((line, i) => {
      const round = i + 1
      const cls = line.isMoving ? (line.isYang ? 'mov-y' : 'mov-n') : (line.isYang ? 'yang' : 'yin')
      const lab = (line.isMoving ? (line.isYang ? '老阳→变' : '老阴→变') : (line.isYang ? '少阳' : '少阴')) + ` (${yaoNames[round]}爻)`
      return {
        sym: line.isYang ? '━━━' : '━ ━',
        cls,
        label: lab,
        show: true
      }
    }).reverse() // 上卦在上
    this.setData({ displayLines })
  },

  calcAndShow() {
    if (this._lines.length < 6) return
    const calcResult = dv.calcFromLines(this._lines)
    const result = dv.generateInterp(
      calcResult,
      this.data.question,
      this.data.qtype,
      this.data.method,
      parseInt(this.data.birthYear) || null
    )
    this.setData({ step: 3, result })
    wx.pageScrollTo({ scrollTop: 0 })
  },

  onReset() {
    this._lines = []
    this._castRound = 0
    this.setData({
      step: 1,
      question: '',
      qtype: 'general',
      birthYear: '',
      method: 'coin',
      coins: [
        { isHead: true, spinning: false },
        { isHead: true, spinning: false },
        { isHead: true, spinning: false }
      ],
      roundText: '第一爻（从下往上起卦）',
      tossDisabled: false,
      coinResult: '',
      num1: '', num2: '', num3: '',
      displayLines: Array(6).fill(null).map(() => ({ sym: '', cls: '', label: '', show: false })),
      result: null
    })
  }
})
