var blackBlock = document.getElementById("blackBlock");
var fileList;

function getFileList() {
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			var myObj = JSON.parse(this.responseText);
			fileList = myObj.files;
		}
	}
	xmlhttp.open("GET", "data/filelist.json", true);
	xmlhttp.send();
}

function getUrlVars() {
	var vars = {};
	var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
		vars[key] = value;
	});
	return vars;
}

var param = getUrlVars()["show"];
var query = param + "-detail";

function getQuery() {
	var url = window.location.href;
	if (url.indexOf('?show=') != -1 && fileList.includes(param)) {
		showItem(query);
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