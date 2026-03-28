const ziwei = require('../../utils/ziwei')
const { TG, DZ, PN, MS, ZG, TFG } = ziwei
const { SI, PT } = require('../../utils/constants')

Page({
  data: {
    year: 1990,
    months: ['正月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
    monthIdx: 0,
    days: Array.from({ length: 30 }, (_, i) => `${i + 1}日`),
    dayIdx: 14,
    hours: ['子 23-01', '丑 01-03', '寅 03-05', '卯 05-07', '辰 07-09', '巳 09-11', '午 11-13', '未 13-15', '申 15-17', '酉 17-19', '戌 19-21', '亥 21-23'],
    hourIdx: 0,
    genders: ['男', '女'],
    genderIdx: 0,
    showChart: false,
    chartTitle: '',
    topRow: [],
    leftCells: [],
    rightCells: [],
    bottomRow: [],
    centerInfo: {},
    interp: {},
    showPopup: false,
    popup: {}
  },

  _result: null,

  onYearChange(e) { this.setData({ year: parseInt(e.detail.value) || 1990 }) },
  onMonthChange(e) { this.setData({ monthIdx: parseInt(e.detail.value) }) },
  onDayChange(e) { this.setData({ dayIdx: parseInt(e.detail.value) }) },
  onHourChange(e) { this.setData({ hourIdx: parseInt(e.detail.value) }) },
  onGenderChange(e) { this.setData({ genderIdx: parseInt(e.detail.value) }) },

  onGenerate() {
    const yr = this.data.year
    const mo = this.data.monthIdx + 1
    const dy = this.data.dayIdx + 1
    const hr = this.data.hourIdx
    const gd = this.data.genderIdx === 0 ? 'm' : 'f'

    if (!yr || yr < 1900 || yr > 2030) {
      wx.showToast({ title: '请输入有效出生年', icon: 'none' })
      return
    }

    const result = ziwei.generate(yr, mo, dy, hr, gd)
    this._result = result
    const interp = ziwei.generateInterp(result)

    const { cells, mp, sp, yg, yz, j, fwd } = result

    // 准备每个cell的显示数据
    const prepareCell = (c) => ({
      ...c,
      piName: PN[c.pi],
      tgDz: `${TG[c.pgn]}${DZ[c.p]}`,
      starClass: c.msi.map(i => ZG.includes(i) ? 'zw' : TFG.includes(i) ? 'tf' : '')
    })

    const allCells = cells.map(prepareCell)

    // 命盘布局
    const topRow = [5, 6, 7, 8].map(i => allCells[i])
    const leftCells = [4, 3].map(i => allCells[i])
    const rightCells = [9, 10].map(i => allCells[i])
    const bottomRow = [2, 1, 0, 11].map(i => allCells[i])

    const juNames = { 2: '水二局', 3: '木三局', 4: '金四局', 5: '土五局', 6: '火六局' }
    const centerInfo = {
      title: `${TG[yg]}${DZ[yz]}年命`,
      birthYear: `${TG[yg]}${DZ[yz]}(${yr})`,
      mingGong: `${TG[allCells[mp].pgn]}${DZ[mp]}`,
      shenGong: `${DZ[sp]}宫`,
      daxian: `${fwd ? '顺' : '逆'}布 ${j}岁起`,
      j,
      juName: juNames[j]
    }

    this.setData({
      showChart: true,
      chartTitle: `${yr}年 农历${mo}月${dy}日 ${DZ[hr]}时 · ${gd === 'm' ? '男' : '女'}命`,
      topRow, leftCells, rightCells, bottomRow, centerInfo,
      interp
    })
  },

  onCellTap(e) {
    const idx = parseInt(e.currentTarget.dataset.idx)
    if (!this._result) return
    const c = this._result.cells[idx]
    const pn = PN[c.pi]

    const starDescs = c.msi.map(i => ({ name: MS[i], desc: SI[MS[i]] || '' }))

    this.setData({
      showPopup: true,
      popup: {
        title: `${pn} · ${TG[c.pgn]}${DZ[c.p]}`,
        dxs: c.dxs,
        msn: c.msn,
        msnText: c.msn.join('、'),
        starDescs,
        hH: c.hH,
        axH: c.axH,
        axText: c.axH.map(a => a.n).join('、'),
        note: PT[pn] || ''
      }
    })
  },

  closePopup() {
    this.setData({ showPopup: false })
  }
})
