let snippets = document.getElementById("snippetsVideo")

function switchVideo() {
	grain.style.display='none'
	snippets.style.display='block'
}

let check = function() {
	if (snippets.readyState === 4) {
		switchVideo()
	} else {
		setTimeout(check, 100)
	}
}

check();