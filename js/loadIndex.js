const loader = document.getElementById("loader")
const blackBlock = document.getElementById("blackBlock")
const avatar = document.getElementById("avatar")
const grain = document.getElementById("grainVideo")
const snippets = document.getElementById("snippetsVideo")

function indexCheck() {
  if (grain.readyState === 4 & avatar.complete) {
    videoCheck()
    setTimeout(dimLoader, 300)
  } else {
    setTimeout(indexCheck, 100)
  }
}

function videoCheck() {
  if (snippets.readyState === 4) {
    switchVideo()
  } else {
    setTimeout(videoCheck, 100)
  }
}

function dimLoader() {
  loader.style.opacity='0'
  blackBlock.style.opacity='0'
  setTimeout(hideLoader, 500)
}

function hideLoader() {
  loader.style.display='none'
  blackBlock.style.display='none'
}

function switchVideo() {
  grain.style.display='none'
  snippets.style.display='block'
}

indexCheck()