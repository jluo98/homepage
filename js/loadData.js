const contentApp = {
  data() {
    return {
      loaderDisplay: 'block',
      loaderOpacity: '1',
      dimmerVisibility: 'hidden',
      dimmerOpacity: '0',
      pageDisplay: 'none',
      pagePosition: '120vh',
      divLoaderDisplay: 'block',
      divLoaderOpacity: '1',
      waitBool: false,
      videoPadding: '',
      content: {},
      selectedItem: { vimeoID: '240443207', "img": "homepage-screenshot.jpg" }
    }
  },
  created() {
    this.fetchData()
    setTimeout(() => this.checkPageState(), 100)
  },
  methods: {
    fetchData() {
      fetch('../data/works.json')
        .then(res => res.json())
        .then(data => {
          if (window.location.href.indexOf("/films") != -1) {
            this.content = data.films
            setTimeout(() => this.getQuery(), 100)
          } else if (window.location.href.indexOf("/newmedia") != -1) {
            this.content = data.newmedia
            setTimeout(() => this.getQuery(), 100)
          }
        })
    },
    checkPageState() {
      if (document.readyState === 'complete') {
        setTimeout(() => this.hideLoader(), 1000)
      } else {
        setTimeout(() => this.checkPageState(), 100)
      }
    },
    checkImageState() {
      if (document.querySelector('#contentImage').complete === true) {
        setTimeout(() => this.hideDivLoader(), 1000)
        setTimeout(() => this.waitBool = false, 500)
      } else {
        setTimeout(() => this.checkImageState(), 100)
      }
    },
    hideLoader() {
      this.loaderOpacity = '0'
      setTimeout(() => this.loaderDisplay = 'none', 500)
    },
    hideDivLoader() {
      this.divLoaderOpacity = '0'
      setTimeout(() => this.divLoaderDisplay = 'none', 500)
    },
    showDivLoader() {
      this.divLoaderOpacity = '1'
      this.divLoaderDisplay = 'block'
    },
    destroyPlayer() {
      new Vimeo.Player(document.querySelector('.embededVideo iframe')).destroy()
    },
    getUrlVars() {
      let vars = {}
      let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value
      })
      return vars
    },
    getQuery() {
      if (window.location.href.indexOf('?show=') != -1) {
        for (var i = 0; i < this.content.length; i++) {
          if (this.content[i].keyword === this.getUrlVars()["show"]) {
            this.showPage(this.content[i])
            break
          }
        }
      } else {
        this.removeUrlParam()
      }
    },
    addUrlParam(keyword, title) {
      history.pushState({ show: keyword }, title + ' - ' + document.title, "?show=" + keyword)
    },
    removeUrlParam() {
      history.pushState(null, null, ".")
    },
    showPage(item) {
      if (!this.waitBool) {
        this.waitBool = true
        this.selectedItem = item
        this.addUrlParam(item.keyword, item.title)
        this.dimmerVisibility = 'visible'
        this.dimmerOpacity = '0.75'
        this.pageDisplay = 'block'
        setTimeout(() => this.pagePosition = '10vh', 100)

        if (window.location.href.indexOf("/films") != -1) {
          let player = new Vimeo.Player(document.querySelector('.embededVideo'), { id: item.vimeoID })
          player.loadVideo(item.vimeoID).then(() => {
            player.getVideoWidth().then((width) => {
              player.getVideoHeight().then((height) => {
                this.videoPadding = ((height/width) * 100).toFixed(2) + '%'
              })
            })
          })

          player.ready().then(() => {
            setTimeout(() => this.hideDivLoader(), 1000)
            setTimeout(() => this.waitBool = false, 500)
          })
        } else if (window.location.href.indexOf("/newmedia") != -1) {
          this.checkImageState()
        }
      }
    },
    hidePage() {
      if (!this.waitBool) {
        this.waitBool = true
        this.removeUrlParam()
        this.dimmerOpacity = '0'
        this.pagePosition = '120vh'
        setTimeout(() => this.dimmerVisibility = 'hidden', 500)
        setTimeout(() => this.pageDisplay = 'block', 500)
        setTimeout(() => this.selectedItem = { vimeoID: '240443207', "img": "homepage-screenshot.jpg" }, 500)
        setTimeout(() => this.showDivLoader(), 500)
        if (window.location.href.indexOf("/films") != -1) {
          setTimeout(() => this.destroyPlayer(), 500)
        }
        setTimeout(() => this.waitBool = false, 500)
      }
    }
  }
}

Vue.createApp(contentApp).mount('#contentApp')