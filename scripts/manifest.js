import { defineManifest } from '@crxjs/vite-plugin'
//const isFirefox = process.env.BROWSER === 'firefox'

export default (env) => defineManifest({
    manifest_version: 3,
    name: '__MSG_extName__',
    version: '1.46',
    description: '__MSG_extDescription__',
    default_locale: 'zh_CN',
    permissions: [
        'bookmarks',
        'storage',
        'favicon',
        'webRequest'
    ],

    host_permissions: [
        "http://*/*",
        "https://*/*"
    ],

    action: {
        default_icon: {
            16: "icons/icon16.png",
            48: "icons/icon48.png",
            128: "icons/icon128.png"
        },
        default_title: "__MSG_extName__"
    },

    background: env.VITE_BROWSER === 'firefox' ? {
        scripts: ['src/background/background.js'],
        type: 'module'
    } : {
        service_worker: 'src/background/background.js',
        type: 'module'
    },

    icons: {
        16: 'icons/icon16.png',
        48: 'icons/icon48.png',
        128: 'icons/icon128.png',
        32: 'icons/icon32.png'
    },

    // 浏览器特定配置
    ...(env.VITE_BROWSER === 'firefox' && {
        browser_specific_settings: {
            gecko: {
                id: env.VITE_GECKO_ID,
                strict_min_version: env.VITE_GECKO_MIN_VER
            }
        }
    }),

    ...(env.VITE_BROWSER === 'chrome' && {
        minimum_chrome_version: env.VITE_CHROME_MIN_VER
    }),

    web_accessible_resources: [{
        resources: [
            '*.html',
            '*.js'
        ],
        matches: ['<all_urls>'],
        ...(env.VITE_BROWSER === 'chrome' ? { use_dynamic_url: true } : null)
    }].filter(Boolean)
})