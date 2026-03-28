Page({
  data: {
    activeTab: 'yijing',
    wuxingData: [
      { name: '木', color: '#70bb70', trait: '向上、生长、伸展', nature: '春天、生发、开始' },
      { name: '火', color: '#c87060', trait: '向外、扩散、炎热', nature: '夏天、旺盛、高峰' },
      { name: '土', color: '#b89860', trait: '平衡、转化、承载', nature: '过渡期、中转、稳定' },
      { name: '金', color: '#b0b070', trait: '向内、收缩、肃杀', nature: '秋天、收获、收敛' },
      { name: '水', color: '#6080c8', trait: '向下、流动、储藏', nature: '冬天、潜伏、蓄势' }
    ],
    tianganData: [
      { num: 1, gan: '甲', yy: '阳', wx: '木', mean: '破土萌芽，新生开始' },
      { num: 2, gan: '乙', yy: '阴', wx: '木', mean: '草木柔曲，缓慢生长' },
      { num: 3, gan: '丙', yy: '阳', wx: '火', mean: '烈日当空，旺盛炎热' },
      { num: 4, gan: '丁', yy: '阴', wx: '火', mean: '灯火微光，内敛稳定' },
      { num: 5, gan: '戊', yy: '阳', wx: '土', mean: '厚重大地，稳固承载' },
      { num: 6, gan: '己', yy: '阴', wx: '土', mean: '田园沃土，柔软滋养' },
      { num: 7, gan: '庚', yy: '阳', wx: '金', mean: '刚硬金属，变革肃杀' },
      { num: 8, gan: '辛', yy: '阴', wx: '金', mean: '精致珠宝，细腻收敛' },
      { num: 9, gan: '壬', yy: '阳', wx: '水', mean: '大江大海，浩荡流动' },
      { num: 10, gan: '癸', yy: '阴', wx: '水', mean: '雨露细水，滋润潜藏' }
    ],
    dizhiData: [
      { num: 1, zhi: '子', sx: '🐭鼠', time: '23-01时', month: '11月' },
      { num: 2, zhi: '丑', sx: '🐮牛', time: '01-03时', month: '12月' },
      { num: 3, zhi: '寅', sx: '🐯虎', time: '03-05时', month: '1月' },
      { num: 4, zhi: '卯', sx: '🐰兔', time: '05-07时', month: '2月' },
      { num: 5, zhi: '辰', sx: '🐉龙', time: '07-09时', month: '3月' },
      { num: 6, zhi: '巳', sx: '🐍蛇', time: '09-11时', month: '4月' },
      { num: 7, zhi: '午', sx: '🐴马', time: '11-13时', month: '5月' },
      { num: 8, zhi: '未', sx: '🐑羊', time: '13-15时', month: '6月' },
      { num: 9, zhi: '申', sx: '🐵猴', time: '15-17时', month: '7月' },
      { num: 10, zhi: '酉', sx: '🐓鸡', time: '17-19时', month: '8月' },
      { num: 11, zhi: '戌', sx: '🐶狗', time: '19-21时', month: '9月' },
      { num: 12, zhi: '亥', sx: '🐷猪', time: '21-23时', month: '10月' }
    ]
  },

  switchTab(e) {
    this.setData({ activeTab: e.currentTarget.dataset.tab })
  }
})
