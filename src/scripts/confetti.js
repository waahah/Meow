// 创建撒花效果
export function createConfetti() {
    console.log('Creating confetti effect');
    const confettiContainer = document.querySelector('.confetti-container');
    
    if (!confettiContainer) {
        console.error('Confetti container not found');
        return;
    }
    
    // 更丰富的颜色组合
    const colors = [
        '#FF2D55', // 红色
        '#5856D6', // 紫色
        '#FF9500', // 橙色
        '#34C759', // 绿色
        '#007AFF', // 蓝色
        '#FFD60A', // 黄色
        '#FF3B30', // 鲜红
        '#64D2FF'  // 天蓝
    ];

    // 创建多个爆炸点，调整位置以获得更好的视觉效果
    const explosionPoints = [
        { x: '50%', y: '35%' },  // 中心偏上
        { x: '25%', y: '40%' },  // 左边
        { x: '75%', y: '40%' },  // 右边
        { x: '35%', y: '30%' },  // 左上
        { x: '65%', y: '30%' }   // 右上
    ];
    
    const confettiPerExplosion = 40; // 增加每个爆炸点的碎片数量
    confettiContainer.innerHTML = '';

    // 为每个爆炸点创建撒花
    explosionPoints.forEach((point, index) => {
        setTimeout(() => {
            for (let i = 0; i < confettiPerExplosion; i++) {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // 随机颜色
                confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                
                // 设置初始位置（爆炸点）
                confetti.style.left = point.x;
                confetti.style.top = point.y;
                
                // 随机大小，稍微增加最大尺寸
                const size = Math.random() * 8 + 4; // 4-12px
                confetti.style.width = `${size}px`;
                confetti.style.height = `${size * 0.6}px`;
                
                // 设置扩散方向和距离，显著增加扩散范围
                const angle = (Math.random() * 360) * (Math.PI / 180);
                const distance = 150 + Math.random() * 200; // 150-350px，增加扩散距离
                const spreadX = Math.cos(angle) * distance;
                const spreadY = Math.sin(angle) * distance;
                
                confetti.style.setProperty('--spread-x', `${spreadX}px`);
                confetti.style.setProperty('--spread-y', `${spreadY}px`);
                
                // 设置动画，稍微加快速度
                confetti.style.animation = `confetti-explosion ${0.6 + Math.random() * 0.3}s cubic-bezier(0.15, 0.85, 0.35, 1) forwards`;
                
                confettiContainer.appendChild(confetti);
                
                // 动画结束后移除元素
                confetti.addEventListener('animationend', () => {
                    confetti.remove();
                });
            }
        }, index * 80); // 缩短爆炸点之间的间隔，使效果更连贯
    });

    // 3秒后清空容器
    setTimeout(() => {
        confettiContainer.innerHTML = '';
    }, 3000);
} 