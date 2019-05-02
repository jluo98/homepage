var loader = document.getElementById("loader");
var blackBlock = document.getElementById("blackBlock");

function dimLoader() {
	loader.style.opacity='0';
	blackBlock.style.opacity='0';
	setTimeout(hideLoader, 500);
}

function hideLoader() {
	loader.style.display='none';
	blackBlock.style.display='none';
}

window.onload = function() {
	dimLoader();
}