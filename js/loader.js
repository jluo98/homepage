var blackBlock = document.getElementById("blackBlock");

function dimLoader() {
	blackBlock.style.opacity='0';
	setTimeout(hideLoader, 500);
}

function hideLoader() {
	blackBlock.style.display='none';
	getQuery();
}

window.onload = function() {
	setTimeout(dimLoader, 300);
}