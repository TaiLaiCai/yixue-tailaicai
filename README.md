# 易学泰来才

**在线地址：** [tailaicai.com](https://tailaicai.com)
**仓库：** [github.com/TaiLaiCai/yixue-tailaicai](https://github.com/TaiLaiCai/yixue-tailaicai)

紫微斗数命盘推演 + 易经五行八卦知识库 + 六十四卦查询 + 交互式起卦占卜，单文件静态网页，零依赖，可直接部署。

---

## 功能一览

| 模块 | 说明 | 文件夹 |
|------|------|--------|
| 八卦开场动画 | 星空背景 + 八卦轨道旋转 + 太极解锁 | [01-intro-screen/](01-intro-screen/) |
| 设计系统 | 北欧极简暗色主题，CSS 变量 + 玻璃拟态 | [02-design-system/](02-design-system/) |
| 易学 Logo 动画 | 字符随机闪变八卦符号，阴阳交替发光 | [03-bagua-logo/](03-bagua-logo/) |
| 紫微斗数命盘 | 倪海夏推演法，12宫排盘 + 解析 | [04-ziwei-chart/](04-ziwei-chart/) |
| 六十四卦查询 | 64卦分类速查，点击展开卦义 | [05-64-hexagrams/](05-64-hexagrams/) |
| 起卦占卜 | 铜币/时间/数字三法起卦，七段解盘 | [06-divination/](06-divination/) |

---

## 技术栈

- **单文件 HTML**：所有 CSS / JS 内联，无构建工具，无框架，无依赖
- **Canvas API**：随机星场渲染
- **requestAnimationFrame**：八卦节点轨道动画
- **CSS 3D Transform**：铜币翻转动效（`rotateY` + `backface-visibility`）
- **SVG stroke-dashoffset**：龟壳裂纹动画
- **Vercel**：静态部署，`vercel.json` 配置 SPA rewrites

---

## 项目结构

```
yixue-tailaicai/
├── index.html              # 完整网站（单文件，~105KB）
├── vercel.json             # Vercel 部署配置
├── 01-intro-screen/        # 开场动画模块
│   ├── README.md
│   └── demo.html
├── 02-design-system/       # 设计系统
│   ├── README.md
│   └── tokens.css
├── 03-bagua-logo/          # Logo 八卦动画模块
│   ├── README.md
│   └── demo.html
├── 04-ziwei-chart/         # 紫微命盘模块
│   ├── README.md
│   └── demo.html
├── 05-64-hexagrams/        # 六十四卦模块
│   ├── README.md
│   └── demo.html
└── 06-divination/          # 起卦占卜模块
    ├── README.md
    └── demo.html
```

---

## 快速使用

### 直接打开
```bash
open index.html   # 本地浏览器直接打开即可
```

### 部署到 Vercel
```bash
vercel --prod
```
或将仓库导入 Vercel 控制台，框架选 `Other`，自动检测 `vercel.json`。

### 拆分单个功能
每个子文件夹的 `demo.html` 是该模块的**完整独立版本**，可单独取出使用。详见各文件夹的 `README.md`。

---

## 制作过程

### 设计思路
以"北欧性冷淡"（Nordic minimalist）为基调：深色底（`#09090f`）、低饱和薰衣草蓝（`#9aabff`）、哑光金（`#c8a882`），玻璃拟态卡片营造空间层次感。

### 开发顺序
1. 建立 CSS 设计系统（颜色变量、间距、排版）
2. 制作开场动画（Canvas 星场 + 八卦轨道 + 解锁交互）
3. 搭建 Tab 导航框架
4. 实现紫微命盘排盘算法（倪海夏法）
5. 填充易经知识内容（五行八卦、天干地支、六十四卦）
6. 开发起卦占卜模块（三种起卦法 + 七段解盘引擎）
7. 添加 Logo 八卦字符动画
8. Vercel 部署

### 关键难点
- **紫微命盘**：命宫定位依赖农历月份与时辰的地支组合，安星顺序遵循倪海夏论命法则
- **六十四卦查询**：使用 King Wen 序 `HTBL[8][8]` 索引，8个三卦两两组合，运行时构建反查表
- **起卦引擎**：三爻六次投币→生成阴/阳/动爻→区分本卦和变卦→逐段生成解盘文本

---

## License

MIT — 随意取用，欢迎 fork 改造。
