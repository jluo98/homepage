if (Cookies.get('locale') != "en" && Cookies.get('locale') != "zh") {
  if (navigator.language.split('-')[0] === "zh") {
    Cookies.set('locale', 'zh', { expires: 365, path: '/' })
  } else {
    Cookies.set('locale', 'en', { expires: 365, path: '/' })
  }
}

if (Cookies.get('locale') === "en") {
  document.getElementById('langSwitch').innerHTML = "<p style='font-family: harmonyos-sans-sc-bold-4e2d_6587,sans-serif; font-weight: 700;'>中文</p>"
} else if (Cookies.get('locale') === "zh") {
  document.getElementById('langSwitch').innerHTML = "<p>ENG</p>"
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
          titleLine1: "Editor · Cinematographer",
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
        },
        about: {
          firstParagraph: "Hi, my name is Jason Luo. I'm a filmmaker and New Media artist. For filmmaking, I focus more on cinematography and post-production (like editing and sound design). For New Media, I focus more on web coding and design. ",
          secondParagraph: "My journey as a filmmaker started when I was in middle school. Since then, I continued my exploration in the filmmaking world. I joined the {filmsoc}. Now I've graduated from {saic} and been continuing my filmmaking journey. ",
          thirdParagraph: "My love for computers dates back even further. The very first time I touched a computer in the early 2000s, I was instantly amazed by this little magical box. From that day onwards, I never stopped digging in the world made up by hardware and software. ",
          filmsoc: "Raffles Film Society",
          saic: "School of the Art Institute of Chicago"
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
          description: "Jason Luo's Portfolio"
        }
      }
    },
    zh: {
      text: {
        homepage: {
          name: "罗森",
          titleLine1: "剪辑师 · 摄影指导",
          titleLine2: "新媒体艺术"
        },
        global: {
          home: "主页",
          films: "电影",
          newMedia: "新媒体",
          aboutMe: "关于我"
        },
        error: {
          "403Title": "403拒绝访问",
          "403Text": "你没有权限访问当前页面",
          "404Title": "404找不到页面",
          "404Text": "你想要访问的页面不存在"
        },
        about: {
          firstParagraph: "你好，我是罗森，一名独立电影人和新媒体开发者。电影方面，我更多担任摄影指导、剪辑师以及混音师等职位。新媒体方面，我更偏向网站开发和设计。",
          secondParagraph: "我的电影之旅始于初中，延续至今。我在高中时期加入了 {filmsoc}，而现在我已经从 {saic} 毕业，继续我的旅途。",
          thirdParagraph: "我对电脑的喜爱萌发地更早。在 2000 年初我第一次接触电脑之后，我瞬间就被那个神奇的盒子吸引住了。从那天开始我就从未停下研究这个由硬件和软件组成的世界。",
          filmsoc: "莱佛士电影协会",
          saic: "芝加哥艺术学院"
        }
      },
      meta: {
        title: {
          home: "罗森作品集",
          films: "电影作品 - 罗森作品集",
          newMedia: "新媒体作品 - 罗森作品集",
          aboutMe: "关于我 - 罗森作品集",
          "403": "403拒绝访问 - 罗森作品集",
          "404": "404找不到页面 - 罗森作品集"
        },
        property: {
          author: "罗森",
          description: "罗森的作品集"
        }
      }
    }
  }
})

Vue.createApp(contentApp).use(i18n).mount('#contentApp')

let link = document.createElement("link")
link.href = "/css/font-" + i18n.global.locale + ".css"
link.type = "text/css"
link.rel = "stylesheet"
document.getElementsByTagName("head")[0].appendChild(link)

document.documentElement.lang = i18n.global.locale

let localeParam = new Proxy(new URLSearchParams(window.location.search), {get: (searchParams, prop) => searchParams.get(prop)}).lang
if (localeParam === "en" && i18n.global.locale === "zh") {
  Cookies.set('locale', 'en', { expires: 365, path: '/' })
  location.reload()
} else if (localeParam === "zh" && i18n.global.locale === "en") {
  Cookies.set('locale', 'zh', { expires: 365, path: '/' })
  location.reload()
}

function populateFields(path) {
  document.title = i18n.global.t(`meta.title.${path}`)
  document.querySelector('meta[name="author"]').setAttribute("content", i18n.global.t("meta.property.author"))
  document.querySelector('meta[name="description"]').setAttribute("content", i18n.global.t("meta.property.description"))
  document.querySelector('meta[property="og:title"]').setAttribute("content", i18n.global.t(`meta.title.${path}`))
  document.querySelector('meta[property="og:description"]').setAttribute("content", i18n.global.t("meta.property.description"))
  if (path != "home") {
    document.getElementById('homeButton').innerHTML = i18n.global.t("text.global.home")
  } else {
    document.getElementById('name').innerHTML = i18n.global.t("text.homepage.name")
    document.getElementById('subline').innerHTML = i18n.global.t("text.homepage.titleLine1") + "<br>" + i18n.global.t("text.homepage.titleLine2")
  }
  document.getElementById('filmsButton').innerHTML = i18n.global.t("text.global.films")
  document.getElementById('newMediaButton').innerHTML = i18n.global.t("text.global.newMedia")
  document.getElementById('aboutMeButton').innerHTML = i18n.global.t("text.global.aboutMe")
}

if (window.location.pathname.startsWith("films", 1)) {
  populateFields("films")
} else if (window.location.pathname.startsWith("newmedia", 1)) {
  populateFields("newMedia")
} else if (window.location.pathname.startsWith("aboutme", 1)) {
  populateFields("aboutMe")
} else if (window.location.pathname === "/") {
  populateFields("home")
}