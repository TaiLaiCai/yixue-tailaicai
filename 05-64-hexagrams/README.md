# 05 · 六十四卦速查

64 卦按人生场景分组，卡片式展示，点击展开详解。**不依赖任何外部资源**，纯 HTML/CSS/JS。

**预览：** 直接打开 `demo.html`

---

## 数据结构

每个卦条目：
```js
{
  n:    1,           // King Wen 序号（1-64）
  name: '乾',        // 卦名
  mean: '天',        // 核心含义（2-6字）
  msg:  '自强不息，持续行动'  // 一句话应对智慧
}
```

分组（10类）：
```js
const G64 = [
  { cat: '开始与创生', list: [...] },
  { cat: '等待与争讼', list: [...] },
  { cat: '蓄力与推进', list: [...] },
  // ...共10类
];
```

---

## 渲染逻辑

```js
function render64() {
  G64.forEach(cat => {
    // 分类标题
    html += `<div class="cat-label">▸ ${cat.cat}</div>`;
    // 卡片网格
    html += `<div class="gua-grid">`;
    cat.list.forEach(g => {
      html += `<div class="gua-card" onclick="this.classList.toggle('open')">
        <div class="gnum">${g.n}</div>
        <div class="gname">${g.name}</div>
        <div class="gmean">${g.mean}</div>
        <div class="gmsg">↳ ${g.msg}</div>
      </div>`;
    });
    html += `</div>`;
  });
}
```

---

## 卡片交互

```css
/* 默认：详解文字隐藏 */
.gua-card .gmsg { display: none; }

/* 点击 toggle .open 类展开 */
.gua-card.open .gmsg { display: block; }
.gua-card.open {
  border-color: rgba(140,180,120,.3);
  background: rgba(140,180,120,.04);
}
```

---

## 64卦结构原理

```
八卦（8种情境）两两相叠 = 8² = 64 种组合

上卦（外卦）= 外部环境、他人、结果
下卦（内卦）= 内部状态、自己、原因

King Wen 序卦表（上卦×下卦 → 卦号）：
         乾 兑 离 震 巽 坎 艮 坤
    乾 [  1 43 14 34  9  5 26 11 ]
    兑 [ 10 58 38 54 61 60 41 19 ]
    离 [ 13 49 30 55 37 63 22 36 ]
    震 [ 25 17 21 51 42  3 27 24 ]
    巽 [ 44 28 50 32 57 48 18 46 ]
    坎 [  6 47 64 40 59 29  4  7 ]
    艮 [ 33 31 56 62 53 39 52 15 ]
    坤 [ 12 45 35 16 20  8 23  2 ]
```

---

## Unicode 卦符

第 N 卦的 Unicode 符号：
```js
String.fromCodePoint(0x4DC0 + n - 1)
// 乾(1) → U+4DC0 ䷀
// 坤(2) → U+4DC1 ䷁
// 未济(64) → U+4DFF ䷿
```

---

## 如何扩展

**增加搜索框：**
```js
document.getElementById('search').addEventListener('input', e => {
  const q = e.target.value;
  document.querySelectorAll('.gua-card').forEach(card => {
    card.style.display = card.textContent.includes(q) ? '' : 'none';
  });
});
```

**增加详细卦辞：** 在数据对象中加入 `yao`（爻辞）和 `tuan`（彖传）字段，在弹窗中展示。

---

## 文件
| 文件 | 说明 |
|------|------|
| `demo.html` | 完整独立演示，含全部 64 卦数据 |
| `README.md` | 本文档 |
