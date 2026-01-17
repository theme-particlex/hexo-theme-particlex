/**
 * 粒子背景特效
 * 使用优化的粒子系统，支持鼠标交互
 */
class ParticleBackground {
    constructor(options = {}) {
        // 默认配置
        this.config = {
            zIndex: -1,
            opacity: 0.9,
            count: 100,
            connectionDistance: 150,
            mouseDistance: 200,
            particleSpeed: 1,
            colors: [
                'rgba(102, 175, 239, 1)',   // 蓝色
                'rgba(239, 154, 222, 1)',   // 粉色
                'rgba(102, 197, 255, 1)',   // 天蓝
                'rgba(255, 187, 244, 1)'    // 浅粉
            ],
            ...options
        };

        // 状态
        this.particles = [];
        this.mouse = { x: null, y: null, max: this.config.mouseDistance * this.config.mouseDistance };
        this.animationId = null;
        this.lastFrameTime = 0;
        this.targetFPS = 60;

        // 初始化
        this.initCanvas();
        this.initParticles();
        this.bindEvents();
        this.startAnimation();
    }

    /**
     * 创建并初始化 canvas
     */
    initCanvas() {
        this.canvas = document.createElement("canvas");
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            z-index: ${this.config.zIndex};
            opacity: ${this.config.opacity};
            pointer-events: none;
        `;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext("2d", { alpha: true });

        this.resizeCanvas();
        
        // 使用 ResizeObserver 监听窗口大小变化
        this.resizeObserver = new ResizeObserver(() => {
            requestAnimationFrame(() => this.resizeCanvas());
        });
        this.resizeObserver.observe(document.body);
    }

    /**
     * 调整 canvas 大小
     */
    resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        const rect = document.body.getBoundingClientRect();
        
        this.width = rect.width;
        this.height = rect.height;
        
        // 考虑设备像素比，提高清晰度
        this.canvas.width = this.width * dpr;
        this.canvas.height = this.height * dpr;
        
        this.ctx.scale(dpr, dpr);
    }

    /**
     * 初始化粒子
     */
    initParticles() {
        this.particles = [];
        
        for (let i = 0; i < this.config.count; i++) {
            this.particles.push(this.createParticle());
        }
    }

    /**
     * 创建单个粒子
     */
    createParticle() {
        const speed = this.config.particleSpeed;
        return {
            x: Math.random() * this.width,
            y: Math.random() * this.height,
            vx: (Math.random() - 0.5) * speed * 2,
            vy: (Math.random() - 0.5) * speed * 2,
            max: this.config.connectionDistance * this.config.connectionDistance,
            color: this.getRandomColor(),
            size: Math.random() * 1.5 + 0.5
        };
    }

    /**
     * 获取随机颜色
     */
    getRandomColor() {
        const colors = this.config.colors;
        return colors[Math.floor(Math.random() * colors.length)];
    }

    /**
     * 绑定事件
     */
    bindEvents() {
        // 鼠标移动事件
        this.mouseMoveHandler = (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        };

        // 鼠标移出事件
        this.mouseOutHandler = () => {
            this.mouse.x = null;
            this.mouse.y = null;
        };

        window.addEventListener("mousemove", this.mouseMoveHandler, { passive: true });
        window.addEventListener("mouseout", this.mouseOutHandler, { passive: true });
    }

    /**
     * 更新粒子位置
     */
    updateParticles() {
        this.particles.forEach(particle => {
            // 更新位置
            particle.x += particle.vx;
            particle.y += particle.vy;

            // 边界反弹
            if (particle.x > this.width || particle.x < 0) {
                particle.vx *= -1;
            }
            if (particle.y > this.height || particle.y < 0) {
                particle.vy *= -1;
            }

            // 确保粒子在边界内
            particle.x = Math.max(0, Math.min(this.width, particle.x));
            particle.y = Math.max(0, Math.min(this.height, particle.y));
        });
    }

    /**
     * 绘制粒子
     */
    drawParticles() {
        this.particles.forEach(particle => {
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    /**
     * 绘制粒子之间的连接线
     */
    drawConnections() {
        const connectionDistSq = this.config.connectionDistance * this.config.connectionDistance;

        for (let i = 0; i < this.particles.length; i++) {
            const particle = this.particles[i];
            
            for (let j = i + 1; j < this.particles.length; j++) {
                const other = this.particles[j];
                
                // 计算距离平方（避免开方运算，提高性能）
                const dx = particle.x - other.x;
                const dy = particle.y - other.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < connectionDistSq) {
                    // 计算透明度
                    const opacity = 1 - (distSq / connectionDistSq);
                    
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(102, 175, 239, ${opacity * 0.5})`;
                    this.ctx.lineWidth = opacity;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(other.x, other.y);
                    this.ctx.stroke();
                }
            }

            // 处理鼠标交互
            if (this.mouse.x !== null && this.mouse.y !== null) {
                const dx = particle.x - this.mouse.x;
                const dy = particle.y - this.mouse.y;
                const distSq = dx * dx + dy * dy;

                if (distSq < this.mouse.max) {
                    // 粒子被鼠标吸引
                    const force = (this.mouse.max - distSq) / this.mouse.max;
                    particle.x -= dx * force * 0.01;
                    particle.y -= dy * force * 0.01;

                    // 绘制连接线
                    const opacity = 1 - (distSq / this.mouse.max);
                    this.ctx.beginPath();
                    this.ctx.strokeStyle = `rgba(239, 154, 222, ${opacity * 0.8})`;
                    this.ctx.lineWidth = opacity * 1.5;
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(this.mouse.x, this.mouse.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    /**
     * 动画循环
     */
    animate(timestamp) {
        // 帧率控制
        if (timestamp) {
            const elapsed = timestamp - this.lastFrameTime;
            const frameInterval = 1000 / this.targetFPS;

            if (elapsed < frameInterval) {
                this.animationId = requestAnimationFrame((t) => this.animate(t));
                return;
            }

            this.lastFrameTime = timestamp - (elapsed % frameInterval);
        }

        // 清除画布
        this.ctx.clearRect(0, 0, this.width, this.height);

        // 更新和绘制
        this.updateParticles();
        this.drawParticles();
        this.drawConnections();

        // 继续动画
        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    /**
     * 开始动画
     */
    startAnimation() {
        if (this.animationId) return;
        this.animationId = requestAnimationFrame((t) => this.animate(t));
    }

    /**
     * 停止动画
     */
    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    /**
     * 更新配置
     */
    updateConfig(newConfig) {
        Object.assign(this.config, newConfig);
        
        // 如果粒子数量改变，重新初始化
        if (newConfig.count !== undefined && newConfig.count !== this.particles.length) {
            this.initParticles();
        }
    }

    /**
     * 销毁实例
     */
    destroy() {
        this.stopAnimation();
        
        window.removeEventListener("mousemove", this.mouseMoveHandler);
        window.removeEventListener("mouseout", this.mouseOutHandler);
        
        if (this.resizeObserver) {
            this.resizeObserver.disconnect();
        }
        
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        
        this.particles = [];
        this.canvas = null;
        this.ctx = null;
    }
}

// 启动粒子背景（仅在启用时）
if (typeof particleConfig !== 'undefined' && particleConfig.enable) {
    const particleBg = new ParticleBackground({
        opacity: particleConfig.opacity || 0.9,
        count: particleConfig.count || 100,
        colors: particleConfig.colors
    });
    
    // 暴露到全局，方便调试和控制
    window.particleBg = particleBg;
}