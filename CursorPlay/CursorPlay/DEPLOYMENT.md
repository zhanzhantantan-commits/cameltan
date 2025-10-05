# GitHub + Vercel 部署指南

## 🚀 快速部署步骤

### 1. 创建GitHub仓库

1. 访问 [GitHub](https://github.com)
2. 点击右上角的 "+" 按钮
3. 选择 "New repository"
4. 填写仓库信息：
   - **Repository name**: `cameltan-personal-site`
   - **Description**: `cameltan的个人展示单页面应用`
   - **Visibility**: Public（公开）或 Private（私有）
   - **不要**勾选 "Add a README file"（我们已经有了）
5. 点击 "Create repository"

### 2. 连接本地仓库到GitHub

在项目目录中运行以下命令：

```bash
# 添加GitHub远程仓库（替换为您的实际仓库URL）
git remote add origin https://github.com/YOUR_USERNAME/cameltan-personal-site.git

# 推送到GitHub
git branch -M main
git push -u origin main
```

### 3. 部署到Vercel

#### 方法一：Vercel Dashboard（推荐）

1. 访问 [Vercel](https://vercel.com)
2. 使用GitHub账号登录
3. 点击 "New Project"
4. 选择您的 `cameltan-personal-site` 仓库
5. 点击 "Import"
6. 保持默认设置，点击 "Deploy"

#### 方法二：Vercel CLI

```bash
# 安装Vercel CLI
npm i -g vercel

# 登录Vercel
vercel login

# 部署项目
vercel

# 生产环境部署
vercel --prod
```

### 4. 自定义域名（可选）

1. 在Vercel Dashboard中选择您的项目
2. 进入 "Settings" > "Domains"
3. 添加您的自定义域名
4. 按照提示配置DNS记录

## 📋 部署后的特性

- ✅ **自动部署**：每次推送代码到GitHub都会自动部署
- ✅ **预览环境**：每个Pull Request都会生成预览链接
- ✅ **HTTPS**：自动SSL证书
- ✅ **CDN加速**：全球快速访问
- ✅ **自定义域名**：支持绑定自己的域名

## 🔧 故障排除

### 常见问题

1. **404错误**：确保有 `vercel.json` 配置文件
2. **图片不显示**：检查图片路径是否正确
3. **AI对话不工作**：确认API密钥和余额
4. **样式问题**：检查CSS文件路径

### 重新部署

```bash
# 修改代码后重新提交
git add .
git commit -m "Update: 描述您的更改"
git push origin main
```

## 📞 支持

如果遇到问题，可以：
- 查看Vercel部署日志
- 检查GitHub仓库设置
- 参考项目README文档
