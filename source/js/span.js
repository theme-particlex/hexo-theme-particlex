// 鼠标点击特效
(function() {
    // 初始语录
    const quotes = [
        "去活出你自己。", "今天的好计划胜过明天的完美计划。",
        "不要轻言放弃，否则对不起自己。", "紧要关头不放弃，绝望就会变成希望。",
        "如果不能改变结果，那就完善过程。", "好好活就是干有意义的事，有意义的事就是好好活！",
        "桃李春风一杯酒，江湖夜雨十年灯。", "欲买桂花同载酒，终不似，少年游。"
    ];

    // 检查目标元素是否应该触发特效
    function shouldTriggerEffect(target) {
        const $target = $(target);
        
        // 排除图片
        if ($target.is("img")) return false;
        
        // 排除链接及其子元素
        if ($target.is("a") || $target.closest("a").length > 0) return false;
        
        // 排除代码块及其子元素
        if ($target.closest("pre").length > 0) return false;
        
        // 可以根据需要排除评论区
        // if ($target.closest("#comment").length > 0) return false;
        
        return true;
    }

    // 生成随机颜色
    function getRandomColor() {
        const r = Math.floor(Math.random() * 206) + 50; // 50-255 避免太暗
        const g = Math.floor(Math.random() * 206) + 50;
        const b = Math.floor(Math.random() * 206) + 50;
        const a = (Math.random() * 0.2 + 0.8).toFixed(2); // 透明度 0.8-1.0
        return `rgba(${r},${g},${b},${a})`;
    }

    // 创建并显示语录动画
    function showQuoteAnimation(e) {
        // 随机选择语录
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];

        const $quoteElement = $("<span class='quote'></span>")
            .text(quote)
            .css({
                "top": e.pageY - 150, // 上移避免被鼠标遮挡
                "left": e.pageX,
                "color": getRandomColor(),
            });

        $("body").append($quoteElement);

        // 随机动画参数
        const startRotate = Math.floor(Math.random() * 41) - 20;
        const shouldFetch = Math.random() > 0.5;
        const endRotate = startRotate + (shouldFetch ? 15 : -10);
        const endX = (Math.random() * 60 - 30);
        const endY = - (Math.random() * 80 + 100);

        // 设置CSS变量用于动画
        $quoteElement[0].style.setProperty('--start-rotate', `${startRotate}deg`);
        $quoteElement[0].style.setProperty('--end-rotate', `${endRotate}deg`);
        $quoteElement[0].style.setProperty('--end-x', `${endX}px`);
        $quoteElement[0].style.setProperty('--end-y', `${endY}px`);

        // 至少1秒的动画持续时间
        const duration = Math.random() + 1.0;

        // 应用动画
        $quoteElement.css({
            "animation": `quote-float ${duration}s ease-out forwards`,
            "will-change": "transform, opacity"
        });

        // 动画结束后移除元素
        $quoteElement.on("animationend", function() {
            $quoteElement.remove();
        });

        // 随机获取一言
        if (shouldFetch) {
            fetchHitokoto();
        }
    }

    // 获取一言 API
    // 限制调用频率为每分钟一次
    async function fetchHitokoto() {
        if (!fetchHitokoto.lastCall) {
            fetchHitokoto.lastCall = 0;
        }

        const now = Date.now();
        const MIN_INTERVAL = 60000; // 1分钟

        if (now - fetchHitokoto.lastCall < MIN_INTERVAL) {
            console.warn("调用频率太快，已被限制");
            return;
        }
        
        fetchHitokoto.lastCall = now;

        try {
            const response = await fetch('https://v1.hitokoto.cn');
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const { hitokoto } = await response.json();
            
            if (hitokoto) {
                quotes.push(hitokoto);
                console.log("获取一言成功:", hitokoto);
                
                // 限制数组大小，避免内存占用过大
                if (quotes.length > 50) {
                    quotes.shift(); // 移除最旧的语录
                }
            } else {
                console.error("获取一言失败：响应中没有 hitokoto 字段");
            }
        } catch (error) {
            console.error("请求出错:", error);
        }
    }

    // 绑定点击事件
    $("body").on("click", function(e) {
        if (shouldTriggerEffect(e.target)) {
            showQuoteAnimation(e);
        }
    });
})();