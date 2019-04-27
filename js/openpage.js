var dim = document.getElementById("dimmer");

function showItem(chosenItem) {
	page = document.getElementById(chosenItem);
	openPage();
}

function openPage() {
	dim.style.visibility = "visible";
	dim.classList.toggle('fade');
	page.style.top = "10vh";
}