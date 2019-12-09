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

let item

function resetWait() {
	waitBool = false
}

function getContent() {
	fetch("../data/projects.json", {method:'GET'})
		.then((res) => res.json())
		.then((json) => {
			if (window.location.href.indexOf("/films") != -1) {
				title.innerHTML = json.films[0][item][0].title
				text.innerHTML = json.films[0][item][0].text
				embeded.classList.add(json.films[0][item][0].videoType)
				embededVideo.src = "https://player.vimeo.com/video/" + json.films[0][item][0].vimeoID
			}
			if (window.location.href.indexOf("/newmedia") != -1) {
				title.innerHTML = json.newmedia[0][item][0].title
				text.innerHTML = json.newmedia[0][item][0].text
				image.src = "img/" + json.newmedia[0][item][0].img
				linkText.innerHTML = json.newmedia[0][item][0].linkText
				link.href = json.newmedia[0][item][0].link
				sourceLink.href = json.newmedia[0][item][0].sourceLink
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