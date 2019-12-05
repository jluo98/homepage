var blackBlock = document.getElementById("blackBlock");
var fileList;

function getFileList() {
	fetch("../data/projects.json", {method:'GET'})
		.then((res) => res.json())
		.then((json) => {
			if (window.location.href.indexOf("/films") != -1) {
				fileList = json.films[0].projects;
			} else if (window.location.href.indexOf("/newmedia") != -1) {
				fileList = json.newmedia[0].projects;
			}
		})
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

var param = getUrlVars()["show"];

function getQuery() {
	var url = window.location.href;
	if (url.indexOf('?show=') != -1 && fileList.includes(param)) {
		showItem(param);
	} else {
		removeUrlParam();
	}
}

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

getFileList();