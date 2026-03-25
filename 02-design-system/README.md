# 02 · 设计系统

北欧极简暗色风格（Nordic Minimalist Dark）的完整 CSS 变量体系 + 组件规范。

---

## 设计理念

| 关键词 | 说明 |
|--------|------|
| 克制 | 背景接近纯黑，内容层通过极低透明度区分，避免强对比刺激 |
| 空气感 | 大量留白、宽行距（1.75-1.92），字号层级分明 |
| 玻璃拟态 | 卡片用 `backdrop-filter: blur()` + 1px 细边框，不用实色填充 |
| 双主色 | 薰衣草蓝（`#9aabff`）表示系统/逻辑，哑金（`#c8a882`）表示命理/重点 |

---

## CSS 变量（Design Tokens）

```css
:root {
  /* 背景层级 */
  --bg:  #09090f;   /* 主背景，接近纯黑偏紫 */
  --bg2: #0d0e1a;   /* 次级背景 */

  /* 表面层（极低透明度，用于卡片/区块）*/
  --s1: rgba(255,255,255,.03);
  --s2: rgba(255,255,255,.06);

  /* 边框层（偏紫蓝色调）*/
  --b1: rgba(180,190,240,.07);   /* 默认边框 */
  --b2: rgba(180,190,240,.14);   /* hover/强调边框 */

  /* 文字层级 */
  --t1: #dde0f0;   /* 主文字，微偏冷白 */
  --t2: #7880a8;   /* 次级文字，偏灰蓝 */
  --t3: #3e4062;   /* 弱化文字，标注/装饰 */

  /* 主题色 · 薰衣草蓝 */
  --accent:  #9aabff;
  --accentd: rgba(154,171,255,.12);   /* 蓝色背景填充（按钮/标签）*/

  /* 主题色 · 哑金 */
  --gold:  #c8a882;
  --goldd: rgba(200,168,130,.12);     /* 金色背景填充 */

  /* 通用圆角 */
  --r: 12px;
}
```

---

## 排版规范

```css
body {
  font-size: 16px;
  line-height: 1.75;
  font-family: -apple-system, "Helvetica Neue", "PingFang SC",
               "Hiragino Sans GB", "Microsoft YaHei", sans-serif;
}

/* 标题 */
h1 { font-size: 1.9rem; font-weight: 200; letter-spacing: .32em; }
h2 { font-size: 1.5rem; font-weight: 300; letter-spacing: .24em; }
h3 { font-size: 1rem;   font-weight: 400; letter-spacing: .14em; }

/* 正文 */
p  { font-size: .92rem; line-height: 1.92; }

/* 辅助文字 */
small { font-size: .78rem; color: var(--t3); }
```

---

## 组件规范

### 卡片
```css
.card {
  background: var(--s1);
  border: 1px solid var(--b1);
  border-radius: var(--r);
  padding: 28px;
  transition: border-color .2s;
}
.card:hover { border-color: var(--b2); }
```

### 主按钮（金色）
```css
.gen-btn {
  background: var(--goldd);
  color: var(--gold);
  border: 1px solid rgba(200,168,130,.28);
  border-radius: 11px;
  padding: 15px;
  font-size: 1rem;
  letter-spacing: .4em;
}
.gen-btn:hover {
  background: rgba(200,168,130,.22);
  border-color: rgba(200,168,130,.5);
  box-shadow: 0 4px 28px rgba(200,168,130,.14);
}
```

### 粘性顶栏（玻璃效果）
```css
header {
  position: sticky;
  top: 0;
  background: rgba(9,9,15,.88);
  border-bottom: 1px solid var(--b1);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
}
```

### 表格
```css
.tbl th { background: rgba(255,255,255,.03); font-weight: 400; padding: 11px 14px; }
.tbl td { padding: 11px 14px; }
.tbl tr:hover td { background: var(--s1); }
```

---

## 五行配色

用于表示五行属性的标签/徽章：

```css
.wx-mu   { color: #70bb70; border-color: rgba(80,160,80,.22);   background: rgba(80,160,80,.05);   }
.wx-huo  { color: #c87060; border-color: rgba(190,90,70,.22);   background: rgba(190,90,70,.05);   }
.wx-tu   { color: #b89860; border-color: rgba(170,140,70,.22);  background: rgba(170,140,70,.05);  }
.wx-jin  { color: #b0b070; border-color: rgba(170,170,110,.22); background: rgba(170,170,110,.05); }
.wx-shui { color: #6080c8; border-color: rgba(70,110,190,.22);  background: rgba(70,110,190,.05);  }
```

---

## 文件
| 文件 | 说明 |
|------|------|
| `tokens.css` | 所有 CSS 变量和基础样式，可直接 `<link>` 引入 |
| `README.md` | 本文档 |
