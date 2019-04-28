var dim = document.getElementById("dimmer");

function showItem(chosenShowItem) {
	page = document.getElementById(chosenShowItem);
	openPage();
}

function openPage() {
	dim.style.visibility = "visible";
	page.style.display = "block";
	dimmerToggle();
	setTimeout(showPage, 10);
}

function showPage() {
	page.style.top = "10vh";
}

function dimmerToggle() {
	dim.classList.toggle('fade');
}

function closePage() {
	var all = document.getElementsByClassName('detailedPage');
	for (var i = 0; i < all.length; i++) {
		all[i].style.top = '120vh';
	}
	dimmerToggle();
	setTimeout(hideElement, 500);
	setTimeout(pauseVideo, 500);
	function pauseVideo() {
		for (var i = 0; i < all.length; i++) {
			var iframe = all[i].querySelector( 'iframe');
			var video = all[i].querySelector( 'video' );
			if ( iframe !== null ) {
				var iframeSrc = iframe.src;
			iframe.src = iframeSrc;
			}
			if ( video !== null ) {
				video.pause();
			}
		}
	}
}

function hideElement() {
	dim.style.visibility = "hidden";
	var all = document.getElementsByClassName('detailedPage');
	for (var i = 0; i < all.length; i++) {
		all[i].style.display = 'none';
	}
}