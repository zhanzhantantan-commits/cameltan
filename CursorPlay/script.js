// 轮播功能
let currentSlide = 0;
let slides;
let indicators;
let slideInterval;

// 初始化轮播
function initCarousel() {
    // 重新获取DOM元素
    slides = document.querySelectorAll('.carousel-slide');
    indicators = document.querySelectorAll('.indicator');
    
    if (slides.length === 0) return;
    
    // 显示第一张图片
    showSlide(0);
    
    // 开始自动播放
    startAutoSlide();
    
    // 鼠标悬停时暂停自动播放
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', stopAutoSlide);
        carouselContainer.addEventListener('mouseleave', startAutoSlide);
    }
}

// 显示指定幻灯片
function showSlide(n) {
    // 移除所有活跃状态
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // 确保索引在有效范围内
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // 添加活跃状态
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

// 切换到下一张/上一张
function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

// 跳转到指定幻灯片
function goToSlide(n) {
    showSlide(n - 1);
}

// 开始自动播放
function startAutoSlide() {
    stopAutoSlide(); // 先清除之前的定时器
    slideInterval = setInterval(() => {
        changeSlide(1);
    }, 4000);
}

// 停止自动播放
function stopAutoSlide() {
    if (slideInterval) {
        clearInterval(slideInterval);
    }
}

// 平滑滚动到指定部分
function smoothScrollTo(targetId) {
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 70; // 考虑导航栏高度
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }
}

// AI对话功能
let chatMessages = [
    {
        type: 'ai',
        content: '您好！我是您的AI助手，很高兴为您服务。请问有什么可以帮助您的吗？'
    }
];

// 发送消息
async function sendMessage() {
    const messageInput = document.getElementById('messageInput');
    const message = messageInput.value.trim();
    
    if (message === '') return;
    
    // 添加用户消息
    addMessage('user', message);
    messageInput.value = '';
    
    // 禁用发送按钮防止重复发送
    const sendBtn = document.querySelector('.send-btn');
    const originalText = sendBtn.textContent;
    sendBtn.textContent = '发送中...';
    sendBtn.disabled = true;
    
    try {
        // 调用DeepSeek API获取AI回复
        const aiResponse = await generateAIResponse(message);
        addMessage('ai', aiResponse);
    } catch (error) {
        console.error('发送消息失败:', error);
        addMessage('ai', '抱歉，发生了错误。请稍后再试。');
    } finally {
        // 恢复发送按钮
        sendBtn.textContent = originalText;
        sendBtn.disabled = false;
    }
}

// 添加消息到聊天界面
function addMessage(type, content) {
    const chatMessagesContainer = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}-message`;
    
    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.innerHTML = `<p>${content}</p>`;
    
    messageDiv.appendChild(messageContent);
    chatMessagesContainer.appendChild(messageDiv);
    
    // 滚动到底部
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
}

// DeepSeek API配置
const DEEPSEEK_CONFIG = {
    baseURL: 'https://api.deepseek.com',
    model: 'deepseek-chat',
    apiKey: 'sk-b5ca6faf461c44da9444159d215e8714' // cameltan的API密钥
};

// 检查API密钥是否已设置
function checkAPIKey() {
    if (!DEEPSEEK_CONFIG.apiKey || DEEPSEEK_CONFIG.apiKey === '') {
        alert('API密钥未配置，请联系管理员。');
        return false;
    }
    return true;
}

// 从本地存储获取API密钥（已预设，无需从存储加载）
function loadAPIKeyFromStorage() {
    // API密钥已直接配置在代码中，无需从本地存储加载
    console.log('DeepSeek API已配置，密钥：cameltan');
}

// 调用DeepSeek API
async function callDeepSeekAPI(userMessage, conversationHistory = []) {
    try {
        const messages = [
            {
                role: "system",
                content: "你是cameltan的AI助手，请用中文回答用户的问题。回答要简洁明了，友好专业。"
            },
            ...conversationHistory,
            {
                role: "user",
                content: userMessage
            }
        ];

        const response = await fetch(`${DEEPSEEK_CONFIG.baseURL}/chat/completions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${DEEPSEEK_CONFIG.apiKey}`
            },
            body: JSON.stringify({
                model: DEEPSEEK_CONFIG.model,
                messages: messages,
                stream: false,
                temperature: 0.7,
                max_tokens: 1000
            })
        });

        if (!response.ok) {
            throw new Error(`API请求失败: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        // 检查API是否返回错误
        if (data.error) {
            throw new Error(`API错误: ${data.error.message}`);
        }
        
        return data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API调用错误:', error);
        throw error;
    }
}

// 生成AI回复（使用DeepSeek API）
async function generateAIResponse(userMessage) {
    if (!checkAPIKey()) {
        return '请先设置API密钥以使用AI对话功能。';
    }

    try {
        // 获取对话历史
        const conversationHistory = getConversationHistory();
        
        // 显示"正在输入"提示
        const typingMessage = addTypingIndicator();
        
        // 调用API
        const aiResponse = await callDeepSeekAPI(userMessage, conversationHistory);
        
        // 移除"正在输入"提示
        removeTypingIndicator(typingMessage);
        
        return aiResponse;
    } catch (error) {
        console.error('AI回复生成失败:', error);
        
        // 如果API调用失败，提供友好的错误信息
        if (error.message.includes('Insufficient Balance')) {
            return '账户余额不足。请访问 https://platform.deepseek.com 充值后重试。';
        } else if (error.message.includes('401')) {
            return 'API密钥无效，请检查您的密钥是否正确。';
        } else if (error.message.includes('429')) {
            return '请求过于频繁，请稍后再试。';
        } else if (error.message.includes('500')) {
            return '服务器暂时不可用，请稍后再试。';
        } else if (error.message.includes('API错误')) {
            return error.message;
        } else {
            return '抱歉，AI服务暂时不可用。请检查网络连接或稍后再试。';
        }
    }
}

// 获取对话历史（最近5轮对话）
function getConversationHistory() {
    const messages = document.querySelectorAll('.message');
    const history = [];
    
    // 从最新的消息开始，获取最近的5轮对话
    let count = 0;
    for (let i = messages.length - 1; i >= 0 && count < 10; i--) {
        const message = messages[i];
        const isUser = message.classList.contains('user-message');
        const content = message.querySelector('.message-content p').textContent;
        
        if (isUser) {
            history.unshift({ role: 'user', content: content });
            count++;
        } else if (!message.querySelector('.typing-indicator')) {
            history.unshift({ role: 'assistant', content: content });
            count++;
        }
    }
    
    return history;
}

// 添加"正在输入"提示
function addTypingIndicator() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message ai-message typing-indicator';
    typingDiv.innerHTML = `
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    chatMessagesContainer.appendChild(typingDiv);
    chatMessagesContainer.scrollTop = chatMessagesContainer.scrollHeight;
    return typingDiv;
}

// 移除"正在输入"提示
function removeTypingIndicator(typingElement) {
    if (typingElement && typingElement.parentNode) {
        typingElement.parentNode.removeChild(typingElement);
    }
}

// 清空对话
function clearChat() {
    const chatMessagesContainer = document.getElementById('chatMessages');
    chatMessagesContainer.innerHTML = '';
    
    // 添加初始AI消息
    addMessage('ai', '对话已清空。您好！我是您的AI助手，很高兴为您服务。请问有什么可以帮助您的吗？');
}

// 键盘事件处理
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        sendMessage();
    }
}

// 导航栏滚动效果
function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    // 初始化轮播
    initCarousel();
    
    // 加载API密钥
    loadAPIKeyFromStorage();
    
    // 绑定导航链接点击事件
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            smoothScrollTo(targetId);
        });
    });
    
    // 绑定聊天输入框键盘事件
    const messageInput = document.getElementById('messageInput');
    if (messageInput) {
        messageInput.addEventListener('keypress', handleKeyPress);
    }
    
    // 绑定滚动事件
    window.addEventListener('scroll', handleNavbarScroll);
    
    // 初始化聊天界面
    const chatMessagesContainer = document.getElementById('chatMessages');
    if (chatMessagesContainer) {
        chatMessagesContainer.innerHTML = '';
        addMessage('ai', '您好！我是cameltan的AI助手，很高兴为您服务。请问有什么可以帮助您的吗？');
    }
});

// 响应式处理
function handleResize() {
    // 在移动设备上调整轮播高度
    if (window.innerWidth <= 768) {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.style.height = '50vh';
        }
    } else {
        const carouselContainer = document.querySelector('.carousel-container');
        if (carouselContainer) {
            carouselContainer.style.height = '60vh';
        }
    }
}

// 绑定窗口大小改变事件
window.addEventListener('resize', handleResize);

// 页面可见性改变时的处理
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        stopAutoSlide();
    } else {
        startAutoSlide();
    }
});

// 添加一些实用的工具函数
const utils = {
    // 防抖函数
    debounce: function(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // 节流函数
    throttle: function(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// 使用节流优化滚动事件
window.addEventListener('scroll', utils.throttle(handleNavbarScroll, 100));
