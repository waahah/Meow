# 你的书签整理助手 🐱

[English](README_EN.md) | [简体中文](README.md)

### 👋介绍

让书签管理变得轻松愉快！一只可爱的猫咪助手，帮你智能清理和整理浏览器书签。

该项目使用 [VExt](https://github.com/waahah/VExt) 模板进行开发。如果没有这个模板，可能无法实现这个项目。

[LazyCat-Bookmark-Cleaner](https://github.com/Alanrk/LazyCat-Bookmark-Cleaner)  的工程化跨平台构建版本，支持以下平台

- [X] Firefox
- [X] Chrome
- [X] Edge

![](https://raw.githubusercontent.com/Alanrk/blogimg/main/Snipaste_2025-01-15_15-00-46.png)

### 环境

- `node >= 18` 

### 依赖

```bash
git clone https://github.com/waahah/Meow.git
cd Meow
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

## ❤️ 鸣谢

- [VExt](https://github.com/waahah/VExt)
- [LazyCat-Bookmark-Cleaner](https://github.com/Alanrk/LazyCat-Bookmark-Cleaner)
