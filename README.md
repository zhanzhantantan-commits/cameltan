# cameltan / 个人项目集合

按项目隔离管理的静态站点集合。

## 目录结构

```
cameltan/
├── index.html                      ← 个人展示主页（portfolio 入口）
│
└── projects/
    ├── star-chart/                 ← 🌙 星盘分析器
    │   ├── index.html
    │   └── README.md
    │
    └── portfolio/                 ← 📄 个人展示网站（含图片轮播）
        ├── index.html
        ├── 404.html
        ├── script.js
        ├── styles.css
        ├── vercel.json             ← Vercel SPA 配置
        ├── netlify.toml            ← Netlify SPA 配置
        ├── package.json
        └── imgs/                   ← 站点图片
```

## 在线访问

- 个人主页（portfolio）：**https://cameltan.github.io/cameltan/**
- 星盘分析器：**https://cameltan.github.io/cameltan/projects/star-chart/**

> ⚠️ 需在 GitHub 仓库 **Settings → Pages → Source** 中启用，Branch 选择 `main`。

## 本地运行

```bash
# 星盘分析器
cd projects/star-chart
python3 -m http.server 8081

# 个人主页
python3 -m http.server 8080
```
