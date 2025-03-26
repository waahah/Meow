import * as browser from 'webextension-polyfill';

// 配置常量
const TIMEOUT_CONFIG = {
    MIN: 5,      // 最小超时时间（秒）
    MAX: 30,     // 最大超时时间（秒）
    DEFAULT: 15  // 默认超时时间（秒）
};

// 初始化设置
async function initSettings() {
    // 初始化超时设置对话框
    initTimeoutDialog();
    // 从存储中加载设置
    await loadSettings();
}

// 初始化超时设置对话框
function initTimeoutDialog() {
    const timeoutDialog = document.getElementById('timeout-dialog');
    const timeoutValue = document.getElementById('timeout-value');
    const timeoutDisplay = document.getElementById('timeout-display');
    const confirmButton = document.getElementById('confirm-timeout');
    const cancelButton = document.getElementById('cancel-timeout');

    if (!timeoutDialog || !timeoutValue || !timeoutDisplay) {
        console.error('Timeout dialog elements not found');
        return;
    }

    // 更新显示值
    timeoutValue.addEventListener('input', () => {
        timeoutDisplay.textContent = timeoutValue.value;
    });

    // 确认按钮处理
    confirmButton.addEventListener('click', async () => {
        const timeout = parseInt(timeoutValue.value);
        await saveSettings({ timeout });
        timeoutDialog.style.display = 'none';
    });

    // 取消按钮处理
    cancelButton.addEventListener('click', () => {
        timeoutDialog.style.display = 'none';
        // 重置为保存的值
        loadSettings();
    });
}

// 保存设置到 storage
async function saveSettings(settings) {
    try {
        await browser.storage.local.set({
            timeout: settings.timeout * 1000 // 转换为毫秒存储
        });
        console.log('Settings saved:', settings);
    } catch (error) {
        console.error('Error saving settings:', error);
    }
}

// 从 storage 加载设置
async function loadSettings() {
    try {
        const timeoutValue = document.getElementById('timeout-value');
        const timeoutDisplay = document.getElementById('timeout-display');

        const result = await browser.storage.local.get(['timeout']);
        const timeoutSeconds = result.timeout 
            ? Math.floor(result.timeout / 1000) 
            : TIMEOUT_CONFIG.DEFAULT;

        if (timeoutValue && timeoutDisplay) {
            timeoutValue.value = timeoutSeconds;
            timeoutDisplay.textContent = timeoutSeconds;
        }

        return {
            timeout: timeoutSeconds * 1000 // 返回毫秒值
        };
    } catch (error) {
        console.error('Error loading settings:', error);
        return {
            timeout: TIMEOUT_CONFIG.DEFAULT * 1000
        };
    }
}

// 显示超时设置对话框
function showTimeoutDialog() {
    const dialog = document.getElementById('timeout-dialog');
    if (dialog) {
        dialog.style.display = 'flex';
    }
}

// 获取当前超时设置（毫秒）
async function getCurrentTimeout() {
    try {
        const result = await browser.storage.local.get(['timeout']);
        return result.timeout || TIMEOUT_CONFIG.DEFAULT * 1000;
    } catch (error) {
        console.error('Error getting timeout setting:', error);
        return TIMEOUT_CONFIG.DEFAULT * 1000;
    }
}

// 添加一个检查是否首次扫描的函数
async function isFirstScan() {
    try {
        const result = await browser.storage.local.get(['hasScanned']);
        return !result.hasScanned;
    } catch (error) {
        console.error('Error checking first scan:', error);
        return false;
    }
}

// 标记已经扫描过
async function markScanned() {
    try {
        await browser.storage.local.set({ hasScanned: true });
    } catch (error) {
        console.error('Error marking scanned:', error);
    }
}

// 导出需要的函数和常量
export {
    TIMEOUT_CONFIG,
    initSettings,
    showTimeoutDialog,
    getCurrentTimeout,
    isFirstScan,
    markScanned
}; 