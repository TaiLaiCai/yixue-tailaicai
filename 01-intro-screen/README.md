# 01 · 八卦开场动画

点击任意处触发解锁——八卦节点加速 → 向外散开 → 主界面淡入。

**预览效果：** 直接打开 `demo.html`

---

## 视觉组成

```
┌─────────────────────────────────────┐
│  [Canvas 星场 — 随机分布静止星点]       │
│                                     │
│      ☰  ☱  ☲                       │
│   ☷        ☳   ← 八卦节点轨道         │
│      ☶  ☵  ☴                       │
│          ☯  ← 太极符号（中心）         │
│                                     │
│       易 学 泰 来 才                   │
│    紫微 · 易经 · 命运推演              │
│   ── 点击任意处，解开命运之门 ──         │
└─────────────────────────────────────┘
```

---

## 实现细节

### 1. 星场（Canvas）
```js
// 生成 N 颗随机星点，绘制为白色圆点，透明度 0.1–0.6
for(let i = 0; i < COUNT; i++){
  stars.push({ x: Math.random()*W, y: Math.random()*H,
               r: Math.random()*1.5+0.3,
               o: Math.random()*0.5+0.1 });
}
ctx.beginPath();
ctx.arc(s.x, s.y, s.r, 0, Math.PI*2);
ctx.fillStyle = `rgba(200,210,255,${s.o})`;
ctx.fill();
```
星场静止不动，用 `resize` 事件重新适配尺寸。

### 2. 八卦节点轨道（requestAnimationFrame）
```js
// 每帧更新角度，translate(x, y) 设置位置
const RADIUS = 108;
nodes.forEach((el, i) => {
  const angle = angles[i];          // 当前弧度
  const x = Math.cos(angle) * RADIUS;
  const y = Math.sin(angle) * RADIUS;
  el.style.transform = `translate(${x}px, ${y}px)`;
  angles[i] += speed;               // 匀速旋转
});
```
**节点不用 CSS `rotate`**，改用 JS 计算 `translate`，这样节点本身不倾斜，八卦符号始终正立。

### 3. 点击解锁流程
```
click
  → phase = 'accel'   加速旋转 (speed × 6)
  → 600ms 后 phase = 'scatter'
      每个节点生成随机散出向量 (vx, vy)
      每帧向外移动直到离屏
  → intro.classList.add('done')  → CSS opacity:0 + scale(1.06) 淡出
  → app.classList.add('visible') → 主界面淡入
```

### 4. CSS 淡出过渡
```css
#intro {
  transition: opacity .9s cubic-bezier(.4,0,.2,1),
              transform .9s cubic-bezier(.4,0,.2,1);
}
#intro.done { opacity: 0; pointer-events: none; transform: scale(1.06); }
#app { opacity: 0; transition: opacity .9s ease .15s; }
#app.visible { opacity: 1; }
```

---

## 如何独立使用

直接复制 `demo.html`，修改以下部分即可接入自己的项目：

```html
<!-- 修改文字 -->
<div id="intro-logo">你的品牌名</div>
<div id="intro-sub">副标题</div>

<!-- 修改解锁后显示的内容 -->
<div id="app"> ... 你的主界面 ... </div>
```

无外部依赖，纯 HTML/CSS/JS。

---

## 文件
| 文件 | 说明 |
|------|------|
| `demo.html` | 完整独立演示，可直接在浏览器打开 |
| `README.md` | 本文档 |
