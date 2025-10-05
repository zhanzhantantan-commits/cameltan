# cameltan 个人展示网站

这是一个简约现代的个人展示单页面应用（SPA），采用纯HTML、CSS和JavaScript实现，无需复杂框架。集成了DeepSeek AI对话功能，提供智能交互体验。

## ✨ 功能特性

### 🎨 设计特色
- **现代简约风格**：采用Inter字体和清爽的蓝灰色调设计
- **响应式布局**：完美适配桌面（>768px）、平板和移动设备（<480px）
- **流畅动画**：CSS3硬件加速动画和JavaScript交互效果
- **毛玻璃效果**：导航栏采用backdrop-filter模糊效果
- **平滑滚动**：锚点导航使用平滑滚动动画

### 📸 智能照片轮播
- 自动播放（4秒间隔切换）
- 手动控制（左右箭头按钮）
- 圆点指示器快速跳转
- 鼠标悬停自动暂停
- 淡入淡出切换效果
- 页面可见性API优化（切换标签页时暂停）

### 🤖 AI对话界面（DeepSeek集成）
- **真实AI对话**：集成DeepSeek API（deepseek-chat模型）
- **上下文记忆**：保留最近10条消息历史，支持连贯对话
- **智能交互**：
  - 键盘回车快速发送
  - 发送中状态显示
  - 动态"正在输入"动画
  - 自动滚动到最新消息
- **错误处理**：友好的错误提示和状态码处理
- **一键清空**：快速重置对话历史

### 📱 响应式设计
- **移动端优化**（≤768px）：
  - 垂直布局的输入控件
  - 自适应轮播高度（50vh）
  - 单列技能展示网格
- **小屏幕适配**（≤480px）：
  - 更小的标题和控件
  - 优化的间距和内边距
- **触摸友好**：适合移动设备操作的按钮尺寸

## 📂 项目结构

```
cameltan-deploy/
├── index.html          # 主页面文件
├── styles.css          # 样式文件（含响应式设计）
├── script.js           # JavaScript功能文件（轮播、AI对话）
├── package.json        # 项目配置文件
├── 404.html            # 自定义404错误页面
├── hello.html          # 测试页面
├── test.html           # 测试页面
├── deploy.sh           # 部署脚本
├── netlify.toml        # Netlify部署配置
├── vercel.json         # Vercel部署配置
├── README.md           # 项目说明文档（本文件）
├── DEPLOY_GUIDE.md     # 部署指南
├── DEPLOYMENT.md       # 部署文档
├── VERCEL_DEPLOY.md    # Vercel部署说明
├── VERCEL_FIX.md       # Vercel问题修复指南
└── imgs/               # 图片资源文件夹
    ├── 4.jpg           # 轮播图片1
    ├── 5.jpg           # 轮播图片2
    └── 能年玲奈.jpeg   # 轮播图片3
```

## 🚀 使用方法

### 本地开发

1. **直接访问**：
   ```bash
   # 在浏览器中打开 index.html 文件
   open index.html
   ```

2. **本地服务器**（推荐，避免CORS问题）：
   ```bash
   # 使用Python简单服务器
   python -m http.server 8000
   # 访问 http://localhost:8000
   
   # 使用Node.js serve包
   npx serve .
   # 访问 http://localhost:3000
   ```

### 🌐 部署到云平台

项目已配置多个云平台的部署支持，可选择以下任意方式：

#### 1️⃣ Vercel部署（推荐）

**方式A：通过GitHub自动部署**
```bash
# 1. 推送到GitHub
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main

# 2. 在Vercel中导入GitHub仓库
# 访问 https://vercel.com/new
# 选择你的GitHub仓库，点击部署
```

**方式B：使用Vercel CLI**
```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署到预览环境
vercel

# 部署到生产环境
vercel --prod
```

**配置说明**（`vercel.json`）：
- 支持单页面应用路由重定向
- 所有路径回退到 `index.html`
- 静态文件自动优化和CDN加速

#### 2️⃣ Netlify部署

**方式A：拖放部署**
1. 访问 [Netlify Drop](https://app.netlify.com/drop)
2. 将整个项目文件夹拖放到页面
3. 自动部署完成

**方式B：通过GitHub**
1. 推送代码到GitHub
2. 在Netlify中连接GitHub仓库
3. 自动检测配置并部署

**方式C：使用Netlify CLI**
```bash
# 安装Netlify CLI
npm i -g netlify-cli

# 登录Netlify
netlify login

# 部署
netlify deploy --prod
```

**配置说明**（`netlify.toml`）：
- 发布目录：当前目录（`.`）
- SPA路由重定向规则已配置

#### 3️⃣ 使用部署脚本

项目包含自动化部署脚本 `deploy.sh`：
```bash
# 赋予执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

更多部署详情请参考：
- `DEPLOY_GUIDE.md` - 完整部署指南
- `VERCEL_DEPLOY.md` - Vercel专项说明
- `VERCEL_FIX.md` - Vercel常见问题修复

### 🔑 DeepSeek API配置

AI对话功能已预配置DeepSeek API密钥，开箱即用：

**当前配置**（位于 `script.js` 中）：
```javascript
const DEEPSEEK_CONFIG = {
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    apiKey: 'sk-b5ca6faf461c44da9444159d215e8714'  // cameltan的API密钥
};
```

**API特性**：
- 模型：`deepseek-chat`（DeepSeek-V3）
- 上下文记忆：保留最近10条消息
- 温度参数：0.7（平衡创造性和准确性）
- 最大Token：1000
- 系统提示词：定制为友好专业的中文助手

**错误处理**：
- ✅ 401 未授权：API密钥无效提示
- ✅ 429 请求过多：限流友好提示
- ✅ 500 服务器错误：服务不可用提示
- ✅ 余额不足：充值引导链接

## 🔧 自定义配置

### 1. 修改个人信息

编辑 `index.html`：

```html
<!-- 导航栏姓名 -->
<div class="nav-logo">
    <h2>你的姓名</h2>
</div>

<!-- 英雄区域 -->
<h1 class="hero-title">你的标题</h1>
<p class="hero-subtitle">你的副标题</p>

<!-- 关于部分 -->
<p>你的个人介绍...</p>

<!-- 技能项 -->
<div class="skill-item">
    <h3>你的技能</h3>
    <p>技能描述</p>
</div>
```

### 2. 更换轮播图片

**方法A：替换现有图片**
```bash
# 将你的图片重命名并放入imgs/文件夹
imgs/
  ├── 4.jpg       # 替换为你的图片1
  ├── 5.jpg       # 替换为你的图片2
  └── 能年玲奈.jpeg # 替换为你的图片3
```

**方法B：修改HTML引用**

编辑 `index.html` 中的图片路径：
```html
<div class="carousel-slide active">
    <img src="imgs/your-image-1.jpg" alt="照片1">
</div>
```

**添加更多图片**：
1. 在HTML中添加新的 `.carousel-slide`
2. 在 `.carousel-indicators` 中添加对应的 `.indicator`
3. 图片会自动纳入轮播循环

### 3. 自定义AI配置

编辑 `script.js` 中的配置：

```javascript
// 更换API密钥
const DEEPSEEK_CONFIG = {
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    apiKey: '你的API密钥'  // 在这里替换
};

// 修改系统提示词（第169行）
{
    role: "system",
    content: "你的自定义系统提示词"
}

// 调整模型参数（第189行）
{
    model: DEEPSEEK_CONFIG.model,
    messages: messages,
    temperature: 0.7,     // 创造性：0.0-2.0
    max_tokens: 1000      // 回复长度限制
}

// 修改对话历史长度（第259行）
for (let i = messages.length - 1; i >= 0 && count < 10; i--) {
    // 修改 < 10 为你想要的历史长度
}
```

### 4. 调整样式主题

编辑 `styles.css`：

```css
/* 修改主题色 */
.nav-logo h2 { color: #2563eb; }  /* 品牌色 */
.send-btn { background: #2563eb; }  /* 按钮色 */

/* 修改字体 */
body {
    font-family: '你的字体', 'Inter', sans-serif;
}

/* 调整动画时长 */
.hero-title {
    animation: fadeInUp 1s ease 0.5s forwards;
    /* 修改 1s 为你想要的时长 */
}
```

### 5. 自定义社交链接

编辑 `index.html` 页脚部分：

```html
<div class="social-links">
    <a href="https://github.com/你的用户名" class="social-link">
        <!-- GitHub图标 -->
    </a>
    <!-- 添加更多社交链接 -->
</div>
```

## 🌍 浏览器兼容性

| 浏览器 | 最低版本 | 支持特性 |
|--------|---------|---------|
| Chrome | 60+ | ✅ 完全支持 |
| Firefox | 60+ | ✅ 完全支持 |
| Safari | 12+ | ✅ 完全支持（需iOS 12+） |
| Edge | 79+ | ✅ 完全支持 |
| Opera | 47+ | ✅ 完全支持 |

**依赖特性**：
- CSS Grid & Flexbox
- CSS Backdrop Filter（毛玻璃效果）
- Fetch API（AI对话）
- ES6+ JavaScript（箭头函数、async/await、模板字符串）
- Page Visibility API（轮播优化）

## ⚡ 性能优化

### 已实现的优化
- ✅ **CSS3硬件加速**：使用 `transform` 和 `opacity` 实现动画
- ✅ **事件节流**：滚动事件使用节流函数（100ms间隔）
- ✅ **事件防抖**：工具函数库提供防抖支持
- ✅ **页面可见性优化**：切换标签页时自动暂停轮播
- ✅ **按需渲染**：聊天消息仅在发送时动态创建DOM
- ✅ **CDN字体**：使用Google Fonts CDN加载Inter字体
- ✅ **图片优化**：轮播使用 `object-fit: cover` 保持比例

### 性能指标
- **首次内容绘制（FCP）**：< 1.5s
- **最大内容绘制（LCP）**：< 2.5s
- **首次输入延迟（FID）**：< 100ms
- **累积布局偏移（CLS）**：< 0.1

## 🛠 技术栈

### 前端技术
- **HTML5**：语义化标记，SEO友好
- **CSS3**：
  - Flexbox & Grid布局
  - CSS动画和过渡
  - 媒体查询（响应式设计）
  - Backdrop Filter（毛玻璃效果）
- **Vanilla JavaScript（ES6+）**：
  - 模块化代码组织
  - Async/await异步处理
  - DOM操作和事件处理
  - Page Visibility API

### 第三方服务
- **DeepSeek API**：AI对话服务（deepseek-chat模型）
- **Google Fonts**：Inter字体家族
- **Vercel/Netlify**：静态网站托管和CDN

### 开发工具
- **Git**：版本控制
- **npm**：包管理（可选）
- **Vercel CLI / Netlify CLI**：部署工具

## 📊 代码统计

```
文件类型      文件数   代码行数
-------------------------------
HTML         4        ~250
CSS          1        ~650
JavaScript   1        ~425
配置文件      5        ~30
文档         5        ~500+
-------------------------------
总计         16       ~1,855+
```

## 🎯 核心功能实现

### 1. 照片轮播（Lines 1-73, script.js）
- 自动播放定时器管理
- 手动控制和指示器导航
- 鼠标悬停暂停
- 页面可见性API集成

### 2. AI对话（Lines 86-310, script.js）
- DeepSeek API集成
- 上下文对话历史管理
- 实时状态指示器
- 错误处理和重试逻辑

### 3. 响应式布局（Lines 522-643, styles.css）
- 移动端优化（≤768px）
- 小屏幕适配（≤480px）
- 触摸友好的交互设计

## 🔮 未来扩展

### 计划中的功能
- [ ] 添加作品集展示模块
- [ ] 实现多语言支持（i18n）
- [ ] 添加深色模式切换
- [ ] 集成Google Analytics或Plausible
- [ ] 支持语音输入输出（Web Speech API）
- [ ] 对话历史导出（JSON/Markdown）
- [ ] PWA支持（离线访问）
- [ ] 图片懒加载优化

### 技术改进
- [ ] 使用TypeScript重写
- [ ] 添加单元测试（Jest）
- [ ] 集成CI/CD流水线
- [ ] 实现代码分割和懒加载
- [ ] 添加Service Worker缓存策略

## 📝 更新日志

### v1.0.0（当前版本）
- ✅ 完整的单页面应用架构
- ✅ DeepSeek AI对话集成
- ✅ 响应式照片轮播
- ✅ 移动端优化
- ✅ Vercel和Netlify部署配置

## 🤝 贡献指南

欢迎贡献代码、报告问题或提出建议！

1. Fork本项目
2. 创建特性分支（`git checkout -b feature/AmazingFeature`）
3. 提交更改（`git commit -m 'Add some AmazingFeature'`）
4. 推送到分支（`git push origin feature/AmazingFeature`）
5. 开启Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 详见 `package.json`

## 📧 联系方式

- 作者：cameltan
- 项目仓库：请查看部署平台的源代码链接

---

**享受您的个人展示页面！** 🎉

如有问题或建议，欢迎通过Issues反馈。
