let waitBool = false

let dim = document.getElementById("dimmer")
let divLoader = document.getElementById("divBlackBlock")
let page = document.getElementById("detailedPage")
let title = document.getElementById("detailedContentTitle")
let text = document.getElementById("detailedContentText")
let embeded = document.getElementById("embededVideo")
let embededVideo = document.getElementById("embededElement")
let image = document.getElementById("detailedContentImage")
let linkText = document.getElementById("detailLinkText")
let link = document.getElementById("detailLink")
let sourceLink = document.getElementById("sourceLink")
let blackBlock = document.getElementById("blackBlock")

let fileList
let item

function getFileList() {
	fetch("../data/projects.json", {method:'GET'})
		.then((res) => res.json())
		.then((json) => {
			if (window.location.href.indexOf("/films") != -1) {
				fileList = json.films
			} else if (window.location.href.indexOf("/newmedia") != -1) {
				fileList = json.newmedia
			}
		})
	setTimeout(generateContent, 500)
}

function generateContent() {
	let parentElement = document.getElementById("gridParent")
	for (var i = 0; i < fileList.length; i++) {
		let currentItem = fileList[i]

		const gridItem = document.createElement('div')
		const gridContent = document.createElement('div')
		const gridImg = document.createElement('div')
		const gridText = document.createElement('div')
		const gridTextHeadline = document.createElement('h3')
		const gridTextSubline = document.createElement('p')

		parentElement.appendChild(gridItem)
		gridItem.appendChild(gridContent)
		gridContent.appendChild(gridImg)
		gridContent.appendChild(gridText)
		gridText.appendChild(gridTextHeadline)
		gridText.appendChild(gridTextSubline)

		gridItem.className = 'gridItem'
		gridContent.className = 'gridContent'
		gridImg.className = 'gridImg'
		gridText.className = 'gridText'
		gridContent.onclick = () => showItem(currentItem.keyword)
		gridImg.style = "background-image: url(img/" + currentItem.keyword + ".jpg);"
		gridTextHeadline.innerHTML = currentItem.headline
		gridTextSubline.innerHTML = currentItem.subline
	}
}

function getUrlVars() {
	let vars = {}
	let parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value
	})
	return vars
}

let param = getUrlVars()["show"]

function getQuery() {
	let url = window.location.href
	if (url.indexOf('?show=') != -1) {
		for (var i = 0; i < fileList.length; i++) {
			let currentItem = fileList[i]
			if (currentItem.keyword === param) {
				showItem(param)
				break
			}
		}
	} else {
		removeUrlParam()
	}
}

function dimLoader() {
	blackBlock.style.opacity='0'
	setTimeout(hideLoader, 500)
}

function hideLoader() {
	blackBlock.style.display='none'
	getQuery()
}

function resetWait() {
	waitBool = false
}

function getContent() {
	fetch("../data/projects.json", {method:'GET'})
		.then((res) => res.json())
		.then((json) => {
			if (window.location.href.indexOf("/films") != -1) {
				for (var i = 0; i < fileList.length; i++) {
					let currentItem = fileList[i]
					if (currentItem.keyword === item) {
						title.innerHTML = currentItem.title
						text.innerHTML = currentItem.text
						embeded.classList.add(currentItem.videoType)
						embededVideo.src = "https://player.vimeo.com/video/" + currentItem.vimeoID
						break
					} 
				}
			}
			if (window.location.href.indexOf("/newmedia") != -1) {
				for (var i = 0; i < fileList.length; i++) {
					let currentItem = fileList[i]
					if (currentItem.keyword === item) {
						title.innerHTML = currentItem.title
						text.innerHTML = currentItem.text
						image.src = "img/" + currentItem.img
						linkText.innerHTML = currentItem.linkText
						link.href = currentItem.link
						sourceLink.href = currentItem.sourceLink
						break
					}
				}
			}
		})
}

function showItem(chosenShowItem) {
	if (waitBool == false) {
		waitBool = true
		item = chosenShowItem
		addUrlParam()
		openPage()
		checkLoad()
		setTimeout(getContent, 500)
		setTimeout(resetWait, 500)
	}
}

function openPage() {
	dim.style.visibility = "visible"
	page.style.display = "block"
	dimmerToggle()
	setTimeout(showPage, 10)
}

function showPage() {
	page.style.top = "10vh"
}

function dimmerToggle() {
	dim.classList.toggle('fade')
}

function closePage() {
	if (waitBool == false) {
		waitBool = true
		item = "",
		page.style.top = '120vh'
		removeUrlParam()
		dimmerToggle()
		setTimeout(hideElement, 500)
		setTimeout(resetPage, 500)
		setTimeout(resetWait, 500)
	}
}

function hideElement() {
	dim.style.visibility = "hidden"
	let all = document.getElementsByClassName('detailedPage')
	for (let i = 0; i < all.length; i++) {
		all[i].style.display = 'none'
	}
}

function checkLoad() {
	if (window.location.href.indexOf("/films") != -1) {
		let iframeDoc = embededVideo.contentDocument || embededVideo.contentWindow.document
		if (iframeDoc.readyState == 'complete') {
			setTimeout(dimDivLoader, 1000)
		} else {
			setTimeout(checkLoad, 100)
		}
	}
	if (window.location.href.indexOf("/newmedia") != -1) {
		if (image.naturalWidth > 0) {
			setTimeout(dimDivLoader, 500)
		} else {
			setTimeout(checkLoad, 100)
		}
	}
}

function dimDivLoader() {
	divLoader.style.opacity='0'
	setTimeout(hideDivLoader, 500)
}

function hideDivLoader() {
	divLoader.style.display='none'
}

function resetPage() {
	divLoader.style.display='block'
	divLoader.style.opacity='1'
	title.innerHTML = ""
	text.innerHTML = ""
	if (window.location.href.indexOf("/films") != -1) {
		embeded.classList.remove('standardVideo', 'wideVideo')
		embededVideo.src = ""
	}
	if (window.location.href.indexOf("/newmedia") != -1) {
		image.src = ""
		linkText.innerHTML = ""
		link.href = ""
		sourceLink.href = ""
	}
}

function addUrlParam() {
	history.pushState(item, item, "?show=" + item)
}

function removeUrlParam() {
	history.pushState(null, null, ".")
}

getFileList()

window.onload = function() {
	setTimeout(dimLoader, 800)
}