# 03 · 易学 Logo 八卦字符动画

Logo 文字（"易学泰来才"）中的字符随机闪变为八卦符号，以**阳相**（白光）或**阴相**（暗色+描边）交替呈现，模拟阴阳交替的视觉节律。

**预览：** 直接打开 `demo.html`

---

## 效果说明

```
正常状态：  易  学  泰  来  才
           ↓（随机选中某字）
阳相闪变：  ☱  学  泰  来  才   ← 白色高亮发光
                 ↓ 200ms 后恢复
阴相闪变：  易  ☷  泰  来  才   ← 深色 + 蓝色描边
```

- 每次随机选 1–2 个字符闪变
- 闪变到八卦符号中的随机一个（☰☷☱☳☲☵☴☶）
- `yangPhase` 布尔值交替切换阴/阳效果
- 主标题：约每 900–1300ms 触发一次
- 开场 Logo：约每 500–800ms 触发，频率更高制造动感

---

## 核心代码

### CSS
```css
.logo-ch {
  display: inline-block;
  transition: color .12s, text-shadow .12s;
}

/* 阳相：白色高亮 + 光晕 */
.logo-ch.yang {
  color: #fff;
  text-shadow:
    0 0 14px rgba(255,255,255,.9),
    0 0 28px rgba(200,210,255,.5);
}

/* 阴相：深色 + 蓝色描边 */
.logo-ch.yin {
  color: rgba(20,20,35,.9);
  text-shadow: 0 0 8px rgba(154,171,255,.4);
  -webkit-text-stroke: .5px rgba(154,171,255,.4);
}
```

### JS
```js
const BAGUA = ['☰','☷','☱','☳','☲','☵','☴','☶'];
const TEXT  = '易学泰来才';

// 1. 初始化：将文字拆分为 span
function initLogo(el) {
  el.innerHTML = TEXT.split('').map((ch, i) =>
    `<span class="logo-ch" data-ch="${ch}"
           style="transition-delay:${i*18}ms">${ch}</span>`
  ).join('');
}

// 2. 闪变函数
let yangPhase = true;
function flash(container) {
  const spans = container.querySelectorAll('.logo-ch');
  const sp    = spans[Math.floor(Math.random() * spans.length)];
  const sym   = BAGUA[Math.floor(Math.random() * 8)];
  const phase = yangPhase ? 'yang' : 'yin';
  yangPhase   = !yangPhase;

  sp.textContent = sym;
  sp.classList.add(phase);

  setTimeout(() => {
    sp.textContent = sp.dataset.ch;
    sp.classList.remove('yang', 'yin');
  }, 200 + Math.random() * 180);
}

// 3. 定时触发
setInterval(() => {
  const n = Math.random() < .35 ? 2 : 1;
  for (let i = 0; i < n; i++) setTimeout(() => flash(logoEl), i * 140);
}, 900 + Math.random() * 400);
```

---

## 如何独立使用

1. 复制 `demo.html` 或从中提取 CSS + JS 片段
2. 在目标元素上添加 `.logo-ch` 包裹每个字符（JS 自动完成）
3. 修改 `TEXT` 常量为你的品牌名，`BAGUA` 可替换为其他符号集

```js
// 替换为任意文字和符号集
const TEXT  = '你的品牌';
const BAGUA = ['★','☆','◆','◇','●','○','▲','△'];
```

---

## 文件
| 文件 | 说明 |
|------|------|
| `demo.html` | 完整独立演示 |
| `README.md` | 本文档 |
