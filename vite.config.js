import { resolve } from 'path'
import { defineConfig, loadEnv } from 'vite';
import commonjs from '@rollup/plugin-commonjs';
import { crx } from '@crxjs/vite-plugin';
import manifest from './scripts/manifest';

export default defineConfig(({ mode }) =>{
  const env = loadEnv(mode, process.cwd(), 'VITE_');
  return {
    build: {
      outDir: 'dist', // 指定输出目录
      assetsDir: 'assets', // 静态资源目录
      rollupOptions: {
        input: {
          duplicates: resolve(__dirname, 'src/duplicates/index.html'),
          index: resolve(__dirname, 'src/index/index.html'),
          profile: resolve(__dirname, 'src/profile/index.html'),
          background: resolve(__dirname, 'src/background/background.js')
        },
        output: {
          entryFileNames: 'js/[name].js', // 控制输出文件名
          //inlineDynamicImports: true, // 将动态导入内联
          //manualChunks: undefined, // 禁止代码分块
        },
        //external: ['commonjsHelpers-Cpj98o6Y.js'], // 将辅助文件排除
      },
      commonjsOptions: {
        requireReturnsDefault: 'auto',
        transformMixedEsModules: true,
      },
    },
    publicDir: 'public', // 静态文件目录，自动拷贝到 dist
    plugins: [
      crx({
        manifest: manifest(env),
      }),
      // 转换 CommonJS 模块
      commonjs({
        include: ['node_modules/**'],
        exclude: ['node_modules/webextension-polyfill/**'],
        transformMixedEsModules: true,
        requireReturnsDefault: 'auto',
            //include: /node_modules/,
            // 其他配置
          }),
    ],
    resolve: {
      alias: {
        'webextension-polyfill': './node_modules/webextension-polyfill/dist/browser-polyfill.js',
        //'@': path.resolve(__dirname, './src'),
      },
    },
  }
  
});