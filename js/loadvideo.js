var grain = document.getElementById("grainVideo");
var snippets = document.getElementById("snippetsVideo");

function switchVideo() {
	grain.style.display='none';
	snippets.style.display='block';
}

var check = function() {
	if (snippets.readyState === 4) {
		switchVideo();
	} else {
		setTimeout(check, 100);
	}
}

check();