var loader = document.getElementById("loader");
var blackBlock = document.getElementById("blackBlock");
var grain = document.getElementById("grainVideo");
var avatar = document.getElementById("avatar");

function dimLoader() {
	loader.style.opacity='0';
	blackBlock.style.opacity='0';
	setTimeout(hideLoader, 500);
}

function hideLoader() {
	loader.style.display='none';
	blackBlock.style.display='none';
}

var indexCheck = function() {
	if (grain.readyState === 4) {
		dimLoader();
	} else {
		setTimeout(indexCheck, 100);
	}
}

indexCheck();