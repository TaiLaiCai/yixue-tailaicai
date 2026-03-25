# 06 · 起卦占卜

三步式占卜流程：输入问题 → 起卦 → 七段解盘。支持**铜钱法**、**时间法**、**数字法**三种起卦方式。

**预览：** 直接打开 `demo.html`

---

## 三步流程

```
Step 1 · 输入
  ↓ 所问之事（文字）+ 问题类型（6选1）+ 出生年（可选）
  ↓ 点击"进入起卦"

Step 2 · 起卦
  ↓ 选择方法：铜钱 / 时间 / 数字
  ↓ 生成六爻（本卦）
  ↓ 有动爻则生成变卦

Step 3 · 结果
  一、卦象总览
  二、本卦信息（上卦/下卦）
  三、爻动分析（动爻提示）
  四、分项详解（六宫对应）
  五、时间判断
  六、行动建议
  七、结论
```

---

## 起卦算法

### 铜钱法（三枚铜钱投六次）
```
每次投掷：
  3枚铜钱 → 随机正(阳=3分)或反(阴=2分)

  总分 → 爻性：
    6 = 老阴（动爻，阴变阳）符号 ⚋（变）
    7 = 少阳（静爻）
    8 = 少阴（静爻）
    9 = 老阳（动爻，阳变阴）符号 ⚊（变）

从第一爻（下）投到第六爻（上），共6次。
```

```js
function dvToss() {
  const coins = [Math.random()>.5?3:2, Math.random()>.5?3:2, Math.random()>.5?3:2];
  const sum = coins.reduce((a,b) => a+b, 0); // 6/7/8/9
  const isYang = sum===7 || sum===9;
  const isMov  = sum===6 || sum===9;
  dvQ.lines.push({ yang: isYang, mov: isMov });
}
```

### 时间法（梅花易数）
```js
function dvByTime() {
  const now = new Date();
  const y = now.getFullYear(), mo = now.getMonth()+1,
        d = now.getDate(),     h  = now.getHours();
  const upper = (y + mo + d)   % 8;  // 上卦索引
  const lower = (y + mo + d + h) % 8; // 下卦索引
  const mov   = (y + mo + d + h) % 6 + 1; // 动爻位
}
```

### 数字法（梅花易数变形）
```js
function dvByNumbers() {
  const n1 = parseInt(input1.value); // 上卦数
  const n2 = parseInt(input2.value); // 下卦数
  const n3 = parseInt(input3.value) || ((n1+n2) % 6 + 1); // 动爻
  const upper = (n1-1) % 8;
  const lower = (n2-1) % 8;
}
```

---

## 卦象查找

使用 King Wen 序对照表：

```js
// 上卦索引 × 下卦索引 → King Wen 卦号
const HTBL = [
  [ 1,43,14,34, 9, 5,26,11],  // 上乾
  [10,58,38,54,61,60,41,19],  // 上兑
  [13,49,30,55,37,63,22,36],  // 上离
  [25,17,21,51,42, 3,27,24],  // 上震
  [44,28,50,32,57,48,18,46],  // 上巽
  [ 6,47,64,40,59,29, 4, 7],  // 上坎
  [33,31,56,62,53,39,52,15],  // 上艮
  [12,45,35,16,20, 8,23, 2]   // 上坤
];
// 索引顺序：乾(0)兑(1)离(2)震(3)巽(4)坎(5)艮(6)坤(7)
```

---

## 爻动与变卦

```js
// 动爻：将该爻阴阳反转 → 生成变卦
function dvCalcLines() {
  const lines = dvQ.lines;  // 6 条爻
  const movPos = lines.map((l,i) => l.mov ? i+1 : 0).filter(Boolean);

  // 本卦上下卦索引
  const lowerTri = trigramOf(lines.slice(0,3));
  const upperTri = trigramOf(lines.slice(3,6));

  if(movPos.length > 0) {
    // 变卦：将动爻取反
    const changedLines = lines.map(l => l.mov ? {...l, yang: !l.yang} : l);
    const changedLower = trigramOf(changedLines.slice(0,3));
    const changedUpper = trigramOf(changedLines.slice(3,6));
  }
}
```

---

## 七段解盘引擎

```
一、卦象总览  → 卦名 + 吉凶标签（吉/凶/中）+ 本卦/变卦
二、本卦信息  → 上卦/下卦属性（字符/五行/力量方向）
三、爻动分析  → 动爻位置 + 阴→阳/阳→阴方向
四、分项详解  → 按问题类型（事业/财运/感情等）重点展开
五、时间判断  → 近期进展 + 适合行动时段
六、行动建议  → 5条具体建议，问题类型定制化
七、结论      → 一段汇总，宜/忌明确
```

---

## 动效组件

### 铜钱翻转（CSS 3D）
```css
.coin { transform-style: preserve-3d; }
.cface { backface-visibility: hidden; }
.cback { transform: rotateY(180deg); }

@keyframes cspin {
  0%   { transform: rotateY(0) translateY(0); }
  30%  { transform: rotateY(560deg) translateY(-28px); }
  100% { transform: rotateY(var(--fr, 0deg)) translateY(0); }
}
/* --fr: 正面=0deg, 背面=180deg */
```

### 龟壳裂纹（SVG stroke-dashoffset）
```css
.sck {
  stroke-dasharray: 52;
  stroke-dashoffset: 52;
  transition: stroke-dashoffset .5s ease;
}
.sck.show { stroke-dashoffset: 0; }  /* 触发裂纹动画 */
```

---

## 文件
| 文件 | 说明 |
|------|------|
| `demo.html` | 完整独立演示（含三法起卦 + 七段解盘） |
| `README.md` | 本文档 |
