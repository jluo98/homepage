var dim = document.getElementById("dimmer");

function showItem(chosenShowItem) {
	page = document.getElementById(chosenShowItem);
	openPage();
}

function openPage() {
	dim.style.visibility = "visible";
	dim.classList.toggle('fade');
	page.style.top = "10vh";
}

function hideItem(chosenHideItem) {
	page = document.getElementById(chosenHideItem);
	closePage();
}

function closePage() {
	dim.classList.toggle('fade');
	page.style.top = "120vh";
	setTimeout(hideDimmer, 500);
}

function hideDimmer() {
	dim.style.visibility = "hidden";
}