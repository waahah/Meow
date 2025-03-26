export class BookmarkPreview {
    constructor() {
        // 等待 DOM 加载完成后再初始化
        document.addEventListener('DOMContentLoaded', () => {
            this.container = document.getElementById('preview-container');
            this.frame = document.getElementById('preview-frame');
            this.title = document.getElementById('preview-title');
            this.closeButton = document.getElementById('preview-close');
            this.previewTimeout = null;
            this.hideTimeout = null;
            this.currentUrl = null;
            this.isMouseOverPreview = false;

            this.init();
        });
    }

    init() {
        if (!this.container || !this.frame || !this.title || !this.closeButton) {
            console.error('Required elements not found');
            return;
        }

        // 修改关闭按钮的事件监听
        this.closeButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log('Close button clicked'); // 调试日志
            this.hide();
        });

        // 添加点击其他地方关闭预览的事件
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target) && 
                !e.target.closest('.bookmark-url')) {
                this.hide();
            }
        });

        // 添加预览窗口的鼠标事件
        this.container.addEventListener('mouseenter', () => {
            this.isMouseOverPreview = true;
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
            }
        });

        this.container.addEventListener('mouseleave', () => {
            this.isMouseOverPreview = false;
            this.handleUrlLeave();
        });

        // 修改 URL 链接的鼠标事件
        document.addEventListener('mouseover', (e) => {
            const urlElement = e.target.closest('.bookmark-url');
            if (urlElement) {
                if (this.hideTimeout) {
                    clearTimeout(this.hideTimeout);
                }
                const url = urlElement.href || urlElement.textContent;
                this.handleUrlHover(url, urlElement);
            }
        });

        document.addEventListener('mouseout', (e) => {
            const urlElement = e.target.closest('.bookmark-url');
            if (urlElement && !e.relatedTarget?.closest('.bookmark-url')) {
                this.handleUrlLeave(e);
            }
        });

        // 处理iframe加载事件
        this.frame.addEventListener('load', () => {
            this.title.textContent = this.currentUrl;
        });

        this.frame.addEventListener('error', () => {
            this.title.textContent = 'Failed to load preview';
        });
    }

    handleUrlHover(url, element) {
        // 清除之前的超时
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }

        // 设置新的超时，延迟显示预览
        this.previewTimeout = setTimeout(() => {
            this.show(url);
        }, 500); // 500ms 延迟

        // 计算预览窗口位置
        this.updatePosition(element);
    }

    handleUrlLeave(e) {
        // 清除显示超时
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }

        // 设置新的隐藏超时
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }

        this.hideTimeout = setTimeout(() => {
            // 只有当鼠标既不在链接上也不在预览窗口上时才隐藏
            if (!this.isMouseOverPreview) {
                this.hide();
            }
        }, 300); // 300ms 延迟
    }

    isMouseOverPreview(e) {
        // 如果没有事件对象，返回 false
        if (!e) return false;
        
        const rect = this.container.getBoundingClientRect();
        const mouseX = e.clientX;
        const mouseY = e.clientY;

        return (
            mouseX >= rect.left &&
            mouseX <= rect.right &&
            mouseY >= rect.top &&
            mouseY <= rect.bottom
        );
    }

    updatePosition(element) {
        const rect = element.getBoundingClientRect();
        const containerWidth = 600;  // 预览窗口宽度
        const containerHeight = 400; // 预览窗口高度
        const margin = 20;          // 与窗口边缘的最小距离
        
        // 计算位置，避免超出视窗
        let left = rect.right + margin;
        let top = rect.top;

        // 如果右侧空间不足，显示在左侧
        if (left + containerWidth > window.innerWidth - margin) {
            left = rect.left - containerWidth - margin;
        }

        // 确保左侧不会超出屏幕
        if (left < margin) {
            left = margin;
        }

        // 如果底部空间不足，向上调整
        if (top + containerHeight > window.innerHeight - margin) {
            // 将预览窗口向上移动，确保完全可见
            top = window.innerHeight - containerHeight - margin;
        }

        // 确保顶部不会超出屏幕
        if (top < margin) {
            top = margin;
        }

        // 应用计算后的位置
        this.container.style.left = `${left}px`;
        this.container.style.top = `${top}px`;
    }

    show(url) {
        if (this.currentUrl === url) return;
        
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
        
        this.currentUrl = url;
        this.title.textContent = 'Loading preview...';
        this.frame.src = url;
        this.container.style.display = 'block';
    }

    hide() {
        console.log('Hiding preview window'); // 调试日志
        // 直接设置样式，不检查鼠标位置
        this.container.style.display = 'none';
        this.frame.src = 'about:blank';
        this.currentUrl = null;
        this.isMouseOverPreview = false;

        // 清除所有超时
        if (this.previewTimeout) {
            clearTimeout(this.previewTimeout);
        }
        if (this.hideTimeout) {
            clearTimeout(this.hideTimeout);
        }
    }
}

// 创建预览实例
new BookmarkPreview(); 