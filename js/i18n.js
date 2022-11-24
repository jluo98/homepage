if (Cookies.get('locale') != "en" && Cookies.get('locale') != "zh") {
  if (navigator.language.split('-')[0] === "zh") {
    Cookies.set('locale', 'zh', { expires: 365, path: '/' })
  } else {
    Cookies.set('locale', 'en', { expires: 365, path: '/' })
  }
}

if (Cookies.get('locale') === "en") {
  document.getElementById('langSwitch').innerHTML = "<p style='font-family: harmonyos-sans-sc-bold-4e2d_6587,sans-serif; font-weight: 700;'>中</p>"
} else if (Cookies.get('locale') === "zh") {
  document.getElementById('langSwitch').innerHTML = "<p>EN</p>"
}

function langSwitch() {
  if (Cookies.get('locale') === "en") {
    Cookies.set('locale', 'zh', { expires: 365, path: '/' })
    location.reload()
  } else if (Cookies.get('locale') === "zh") {
    Cookies.set('locale', 'en', { expires: 365, path: '/' })
    location.reload()
  }
}

const i18n = VueI18n.createI18n({
  locale: Cookies.get('locale'),
  fallbackLocale: 'en',
  globalInjection: true,
  messages: {
    en: {
      text: {
        homepage: {
          name: "Jason Luo",
          titleLine1: "Filmmaker · Cinematographer",
          titleLine2: "New Media Artist"
        },
        global: {
          home: "HOME",
          films: "FILMS",
          newMedia: "NEW MEDIA",
          aboutMe: "ABOUT ME"
        },
        error: {
          "403Title": "403 FORBIDDEN",
          "403Text": "You don't have permission to access this page. ",
          "404Title": "404 NOT FOUND",
          "404Text": "The page you're looking for does not exist. "
        }
      },
      meta: {
        title: {
          home: "Jason Luo",
          films: "Films - Jason Luo",
          newMedia: "New Media - Jason Luo",
          aboutMe: "About Me - Jason Luo",
          "403": "403 Forbidden - Jason Luo",
          "404": "404 Not Found - Jason Luo"
        },
        property: {
          author: "Jason Luo",
          description: "Jason Luo's Portfolio",

        }
      }
    },
    zh: {
      text: {
        homepage: {
          name: "罗森",
          titleLine1: "电影人 · 摄影指导",
          titleLine2: "新媒体艺术"
        },
        global: {
          home: "主页",
          films: "电影",
          newMedia: "新媒体",
          aboutMe: "关于"
        },
        error: {
          "403Title": "403拒绝访问",
          "403Text": "你没有权限访问当前页面",
          "404Title": "404找不到页面",
          "404Text": "你想要访问的页面不存在"
        }
      },
      meta: {
        title: {
          home: "罗森作品集",
          films: "电影作品 - 罗森作品集",
          newMedia: "新媒体作品 - 罗森作品集",
          aboutMe: "关于 - 罗森作品集",
          "403": "403拒绝访问 - 罗森作品集",
          "404": "404找不到页面 - 罗森作品集"
        },
        property: {
          author: "罗森",
          description: "罗森的作品集",
          
        }
      }
    }
  }
})

Vue.createApp(contentApp).use(i18n).mount('#contentApp')
Vue.createApp(headApp).use(i18n).mount('#headApp')

let link = document.createElement("link")
link.href = "/css/font-" + i18n.global.locale + ".css"
link.type = "text/css"
link.rel = "stylesheet"
document.getElementsByTagName("head")[0].appendChild(link)