const BAGUA = ['☰', '☷', '☱', '☳', '☲', '☵', '☴', '☶']
const LOGO_TEXT = '泰来才'

Page({
  data: {
    stars: [],
    guaNodes: [],
    unlocking: false,
    logoChars: LOGO_TEXT.split('').map(ch => ({ text: ch, orig: ch, phase: '' }))
  },

  onLoad() {
    this.loadCalligraphyFont()
    this.initStars()
    this.initGuaNodes()
    this.startOrbit()
    this.startLogoFlash()
  },

  onUnload() {
    if (this._orbitTimer) clearInterval(this._orbitTimer)
    if (this._flashTimer) clearInterval(this._flashTimer)
  },

  loadCalligraphyFont() {
    // 字体 CDN 列表：优先国内可访问源，依次降级
    const fontSources = [
      'https://cdn.jsdelivr.net/npm/@fontsource/ma-shan-zheng@5.0.4/files/ma-shan-zheng-chinese-simplified-400-normal.woff2',
      'https://cdn.jsdelivr.net/npm/@fontsource/zhi-mang-xing@5.0.4/files/zhi-mang-xing-chinese-simplified-400-normal.woff2'
    ]
    this._tryLoadFont(fontSources, 0)
  },

  _tryLoadFont(sources, idx) {
    if (idx >= sources.length) {
      console.log('All font sources failed, using system fallback')
      return
    }
    wx.loadFontFace({
      family: 'MaShanZheng',
      source: `url("${sources[idx]}")`,
      scopes: ['webview', 'native'],
      success: () => console.log('Font loaded from source', idx),
      fail: () => {
        console.log('Font source', idx, 'failed, trying next')
        this._tryLoadFont(sources, idx + 1)
      }
    })
  },

  startLogoFlash() {
    let yangPhase = true
    this._flashTimer = setInterval(() => {
      const chars = [...this.data.logoChars]
      const idx = Math.floor(Math.random() * chars.length)
      const baguaSym = BAGUA[Math.floor(Math.random() * 8)]
      const phase = yangPhase ? 'yang' : 'yin'
      yangPhase = !yangPhase

      chars[idx] = { ...chars[idx], text: baguaSym, phase }
      this.setData({ logoChars: chars })

      setTimeout(() => {
        const restored = [...this.data.logoChars]
        restored[idx] = { ...restored[idx], text: restored[idx].orig, phase: '' }
        this.setData({ logoChars: restored })
      }, 200 + Math.random() * 180)
    }, 500 + Math.random() * 300)
  },

  initStars() {
    const stars = []
    for (let i = 0; i < 80; i++) {
      stars.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 4 + 2,
        a: Math.random() * 0.55 + 0.15,
        d: Math.random() * 3
      })
    }
    this.setData({ stars })
  },

  initGuaNodes() {
    const syms = ['☰', '☱', '☲', '☳', '☴', '☵', '☶', '☷']
    const names = ['乾', '兑', '离', '震', '巽', '坎', '艮', '坤']
    const colors = [
      'rgba(255,220,180,0.95)', 'rgba(160,220,255,0.95)',
      'rgba(255,185,110,0.95)', 'rgba(195,165,255,0.95)',
      'rgba(165,240,195,0.95)', 'rgba(130,175,255,0.95)',
      'rgba(210,205,185,0.95)', 'rgba(210,190,150,0.95)'
    ]
    const nodes = syms.map((sym, i) => ({
      sym, name: names[i], color: colors[i],
      x: 0, y: 0, lit: false
    }))
    this.setData({ guaNodes: nodes })
    this._angle = -90
    this._litIdx = 0
    this._litCount = 0
  },

  startOrbit() {
    const R = 190 // rpx radius
    this._orbitTimer = setInterval(() => {
      this._angle += 0.5
      this._litCount++

      const nodes = this.data.guaNodes.map((node, i) => {
        const a = (this._angle + i * 45) * Math.PI / 180
        const newNode = {
          ...node,
          x: Math.cos(a) * R,
          y: Math.sin(a) * R
        }
        if (this._litCount > 12) {
          newNode.lit = (i === this._litIdx % 8)
        }
        return newNode
      })

      if (this._litCount > 12) {
        this._litIdx++
        this._litCount = 0
      }

      this.setData({ guaNodes: nodes })
    }, 60)
  },

  onUnlock() {
    if (this.data.unlocking) return
    this.setData({ unlocking: true })

    // Light up all nodes
    const nodes = this.data.guaNodes.map(n => ({ ...n, lit: true }))
    this.setData({ guaNodes: nodes })

    setTimeout(() => {
      if (this._orbitTimer) clearInterval(this._orbitTimer)
      wx.switchTab({ url: '/pages/ziwei/ziwei' })
    }, 800)
  }
})
