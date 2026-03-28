App({
  onLaunch() {
    const lang = wx.getStorageSync('yixue_lang') || 'zh'
    this.globalData = { lang }
  },

  globalData: {
    lang: 'zh'
  }
})
