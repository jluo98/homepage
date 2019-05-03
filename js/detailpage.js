let waitBool = false;

var dim = document.getElementById("dimmer");
var divLoader = document.getElementById("divBlackBlock");

var page = document.getElementById("detailedPage");
var title = document.getElementById("detailedContentTitle");
var text = document.getElementById("detailedContentText");
var embeded = document.getElementById("embededVideo");
var embededVideo = document.getElementById("embededElement");
var image = document.getElementById("detailedContentImage");
var linkText = document.getElementById("detailLinkText");
var link = document.getElementById("detailLink");
var sourceLink = document.getElementById("sourceLink");

var item

function resetWait() {
	waitBool = false;
}

function getContent() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			title.innerHTML = myObj.title;
			text.innerHTML = myObj.text;
			if (window.location.href.indexOf("/films") != -1) {
				embeded.classList.add(myObj.videoType);
				embededVideo.src = "https://player.vimeo.com/video/" + myObj.vimeoID;
			}
			if (window.location.href.indexOf("/newmedia") != -1) {
				image.src = "img/" + myObj.img;
				linkText.innerHTML = myObj.linkText;
				link.href = myObj.link;
				sourceLink.href = myObj.sourceLink;
			}
		}
	}
	xmlhttp.open("GET", "data/" + item + ".json", true);
	xmlhttp.send();
}

function showItem(chosenShowItem) {
	if (waitBool == false) {
		waitBool = true;
		item = chosenShowItem
		openPage();
		checkLoad();
		setTimeout(getContent, 500);
		setTimeout(resetWait, 500);
	}
}

function openPage() {
	dim.style.visibility = "visible";
	page.style.display = "block";
	dimmerToggle();
	setTimeout(showPage, 10);
}

function showPage() {
	page.style.top = "10vh";
}

function dimmerToggle() {
	dim.classList.toggle('fade');
}

function closePage() {
	if (waitBool == false) {
		waitBool = true;
		page.style.top = '120vh';
		dimmerToggle();
		setTimeout(hideElement, 500);
		setTimeout(resetPage, 500);
		setTimeout(resetWait, 500);
	}
}

function hideElement() {
	dim.style.visibility = "hidden";
	var all = document.getElementsByClassName('detailedPage');
	for (var i = 0; i < all.length; i++) {
		all[i].style.display = 'none';
	}
}

function checkLoad() {
	if (window.location.href.indexOf("/films") != -1) {
		var iframeDoc = embededVideo.contentDocument || embededVideo.contentWindow.document;
		if (iframeDoc.readyState == 'complete') {
			setTimeout(dimDivLoader, 500);
		} else {
			setTimeout(checkLoad, 100);
		}
	}
	if (window.location.href.indexOf("/newmedia") != -1) {
		if (image.naturalWidth > 0) {
			setTimeout(dimDivLoader, 500);
		} else {
			setTimeout(checkLoad, 100);
		}
	}
}

function dimDivLoader() {
	divLoader.style.opacity='0';
	setTimeout(hideDivLoader, 500);
}

function hideDivLoader() {
	divLoader.style.display='none';
}

function resetPage() {
	divLoader.style.display='block';
	divLoader.style.opacity='1';
	title.innerHTML = "";
	text.innerHTML = "";
	if (window.location.href.indexOf("/films") != -1) {
		embeded.classList.remove('standardVideo', 'wideVideo');
		embededVideo.src = "";
	}
	if (window.location.href.indexOf("/newmedia") != -1) {
		image.src = "";
		linkText.innerHTML = "";
		link.href = "";
		sourceLink.href = "";
	}
}