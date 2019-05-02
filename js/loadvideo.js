var grain = document.getElementById("grainVideo");
var snippets = document.getElementById("snippetsVideo");

function switchVideo() {
	grain.style.display='none';
	snippets.style.display='block';
}

function checkSnippets() {
	if (snippets.readyState === 4) {
		snippets.play();
		switchVideo();
	} else {
		setTimeout(checkSnippets, 100);
	}
}

var checkGrain = function() {
	if (grain.readyState === 4) {
		snippets.load();
		checkSnippets();
	} else {
		setTimeout(checkGrain, 100);
	}
}

checkGrain();