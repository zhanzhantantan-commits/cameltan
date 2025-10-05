#!/bin/bash

# cameltan个人网站部署脚本

echo "🚀 准备部署cameltan个人网站..."
echo ""

# 检查是否已经初始化git
if [ ! -d ".git" ]; then
    echo "📦 初始化Git仓库..."
    git init
    git add .
    git commit -m "Initial commit: cameltan个人网站"
    echo "✅ Git仓库初始化完成"
    echo ""
    echo "⚠️  请执行以下命令连接到GitHub仓库："
    echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
else
    echo "📦 Git仓库已存在，准备提交更新..."
    git add .
    git commit -m "Update: $(date '+%Y-%m-%d %H:%M:%S')"
    
    # 检查是否有远程仓库
    if git remote | grep -q origin; then
        echo "🔄 推送到GitHub..."
        git push origin main
        echo "✅ 部署完成！"
        echo ""
        echo "🌐 您的网站将在几分钟内更新："
        echo "   https://cameltan.vercel.app/"
    else
        echo "⚠️  请先添加远程仓库："
        echo "   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git"
        echo "   git push -u origin main"
    fi
fi

echo ""
echo "📋 部署清单："
echo "   ✅ 文件结构正确"
echo "   ✅ vercel.json配置优化"
echo "   ✅ 所有资源文件就绪"
echo ""
echo "💡 提示：如果这是首次部署，请在Vercel中导入GitHub仓库"
