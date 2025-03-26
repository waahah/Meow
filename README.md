# 你的书签整理助手 🐱

[English](README_EN.md) | [简体中文](README.md)

让书签管理变得轻松愉快！一只可爱的猫咪助手，帮你智能清理和整理浏览器书签。

[LazyCat-Bookmark-Cleaner](https://github.com/Alanrk/LazyCat-Bookmark-Cleaner)  的工程化跨平台构建版本，支持以下平台

- [X] Firefox [扩展商店下载](https://addons.mozilla.org/zh-CN/firefox/addon/%E7%8C%AB%E5%92%AA%E4%B9%A6%E7%AD%BE%E6%B8%85%E7%90%86/)
- [X] Chrome
- [X] Edge

![](https://raw.githubusercontent.com/Alanrk/blogimg/main/Snipaste_2025-01-15_15-00-46.png)

### 环境

- `node >= 18` 

### 依赖

```bash
git clone https://github.com/waahah/Bookmark-Cleaner.git
cd Bookmark-Cleaner
npm install
```

### 构建

```powershell
npm run build:firefox

npm run build:chrome
```


### Lint

```powershell
npm run lint
```

### 运行

```powershell
npm run start:firefox

npm run start:chrome
```

运行后会启动对应浏览器，并自动加载运行项目。

### 打包

```powershell
npm run pack:firefox

npm run pack:chrome
```

打包后的ZIP文件会输出到 `web-ext-artifacts/` 目录。

### CRX
```powershell
npm run pack:crx
```

### 签名并发布
- `firefox`获取API密钥请查看[此指南](https://extensionworkshop.com/documentation/develop/web-ext-command-reference/#web-ext-sign)
- `chrome`获取API密钥请查看[此指南](https://github.com/fregante/chrome-webstore-upload-keys)

```powershell
npm run sign:firefox

npm run sign:chrome
```

自动上传扩展商店签名并发布，签名后的.XPI文件会输出到 `web-ext-artifacts/` 目录。



> 立即开始整理，让你的书签焕然一新！ ✨

### 📄 开源许可

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。
