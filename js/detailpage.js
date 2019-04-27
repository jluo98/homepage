var dim = document.getElementById("dimmer");

function showItem(chosenShowItem) {
	page = document.getElementById(chosenShowItem);
	openPage();
}

function openPage() {
	dim.style.visibility = "visible";
	page.style.display = "block";
	dim.classList.toggle('fade');
	setTimeout(showPage, 0);
}

function showPage() {
	page.style.top = "10vh";
}

function closePage() {
	dim.classList.toggle('fade');
	var all = document.getElementsByClassName('detailedPage');
	for (var i = 0; i < all.length; i++) {
		all[i].style.top = '120vh';
	}
	setTimeout(hideElement, 500);
}

function hideElement() {
	dim.style.visibility = "hidden";
	var all = document.getElementsByClassName('detailedPage');
	for (var i = 0; i < all.length; i++) {
		all[i].style.display = 'none';
	}
}