# cameltan Personal Website

个人项目集合，按项目隔离管理。

## 目录结构

```
cameltan/
├── projects/
│   ├── star-chart/      ← 🌙 星盘分析器（纯前端天文计算）
│   └── portfolio/       ← 📄 个人展示网站（个人主页）
├── CursorPlay/          ← 🔄 轮播展示页历史副本
├── cameltan-deploy/     ← 🚀 部署测试副本
└── _shared/imgs/        ← 🖼️ 共享图片资源
```

## 在线访问

| 项目 | 地址 |
|------|------|
| 星盘分析器 | https://cameltan.github.io/cameltan/projects/star-chart/ |
| 个人主页 | https://cameltan.github.io/cameltan/ |

（需在 GitHub Settings → Pages 启用）

## 快速开发

```bash
# 个人主页
cd projects/portfolio && python3 -m http.server 8080

# 星盘分析器
cd projects/star-chart && python3 -m http.server 8081
```
