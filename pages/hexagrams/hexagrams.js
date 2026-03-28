const { G64 } = require('../../utils/hexagrams')

Page({
  data: {
    searchText: '',
    guaData: [],
    filteredData: []
  },

  onLoad() {
    // 深拷贝并添加 open 状态
    const guaData = G64.map(cat => ({
      cat: cat.cat,
      list: cat.list.map(g => ({ ...g, open: false }))
    }))
    this.setData({ guaData, filteredData: guaData })
  },

  onSearch(e) {
    const text = e.detail.value.trim()
    this.setData({ searchText: text })

    if (!text) {
      this.setData({ filteredData: this.data.guaData })
      return
    }

    const filtered = this.data.guaData.map(cat => ({
      cat: cat.cat,
      list: cat.list.filter(g =>
        g.name.includes(text) || g.mean.includes(text) || g.msg.includes(text)
      )
    })).filter(cat => cat.list.length > 0)

    this.setData({ filteredData: filtered })
  },

  toggleGua(e) {
    const n = e.currentTarget.dataset.n
    const guaData = this.data.guaData.map(cat => ({
      ...cat,
      list: cat.list.map(g =>
        g.n === n ? { ...g, open: !g.open } : g
      )
    }))

    // 同步更新 filteredData
    const searchText = this.data.searchText
    let filteredData = guaData
    if (searchText) {
      filteredData = guaData.map(cat => ({
        cat: cat.cat,
        list: cat.list.filter(g =>
          g.name.includes(searchText) || g.mean.includes(searchText) || g.msg.includes(searchText)
        )
      })).filter(cat => cat.list.length > 0)
    }

    this.setData({ guaData, filteredData })
  }
})
