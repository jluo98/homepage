let loader = document.getElementById("loader")
let blackBlock = document.getElementById("blackBlock")
let grain = document.getElementById("grainVideo")
let avatar = document.getElementById("avatar")

function dimLoader() {
	loader.style.opacity='0'
	blackBlock.style.opacity='0'
	setTimeout(hideLoader, 500)
}

function hideLoader() {
	loader.style.display='none'
	blackBlock.style.display='none'
}

let indexCheck = function() {
	if (grain.readyState === 4) {
		setTimeout(dimLoader, 300)
	} else {
		setTimeout(indexCheck, 100)
	}
}

indexCheck();