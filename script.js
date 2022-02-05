//CONFIG
var build = "Build not found";
var platform = "unknown";
//See version.js for the version info.

if(location.href.includes("uploads.ungrounded.net")) {
	build = "Newgrounds build";
	preload();
	platform = "newgrounds";
} else if(location.href.includes("josie")){
	build = "Josie build";
	joelName = "Joel";
	pronouns = ["he", "him", "his"];
	document.getElementById("pronouns").style.display = "none";
	updatePronouns();
	platform = "web";
} else if(location.href.includes(".web.app")){
	build = "Online build";
	preload();
	platform = "web";
} else if(location.href.includes("joel/www/index")){
	build = "Browser Development Build";
	preload();
	jd();
	platform = "dev";
} else if(navigator.userAgent.match(/(Android|BlackBerry|IEMobile)/)){
	build = "Android Build";
	platform = "android";
	var script = document.createElement("script");
	script.src = "cordova.js";
	document.head.appendChild(script);

	document.addEventListener("deviceready", onDeviceReady, false);
	function onDeviceReady() {
		console.log('deviceready');
		window.open = cordova.InAppBrowser.open;
	}
	getLatestVersion();
} else if(location.href.includes("/www/index")){
	build = "Development Build";
	preload();
	jd();
	platform = "web";
} else {
	build = "Unknown build";
	platform = "unknown";
	//document.addEventListener("deviceready", function(){ build = "Android APK"; document.getElementById("build").innerHTML = build; }, false);
}
document.getElementById('debug-page').style.display='none';

var launchable = true;

//Make the app installable if the platform is web.
function checkInstallable(){
	if(platform === "web"){
		if (window.matchMedia('(display-mode: standalone)').matches) {  
			//App is installed, act as such
			launchable = true;
		} else if(!appInstalled) {
			launchable = false;
		} else {
			launchable = true;
		}
		revealLauncher();
	} else {
		launchable = true;
		revealLauncher();
	}
}

if(document.getElementById("build")){
	document.getElementById("build").innerHTML = build;
} else {
	alert("Oops, it looks like this version of the Joel app wasn't build correctly. We've detected that you're using:\n" + build + ". Please contact the developers for further assistance.");
}

if(document.getElementById("version")){
	document.getElementById("version").innerHTML = version;
	document.getElementById("launcherversion").innerHTML = version;
	document.getElementById("updaterversion").innerHTML = 'v' + version;
	document.title = "Joel App // v" + version;
} else {
	alert("You're using the following version: " + version);
}

var updaterUrl = "";
var latest = {
	notFound: true
};


function getLatestVersion(){
	if(window.localStorage.getItem("joel_lastopened") != version){
		window.localStorage.setItem("joel_lastopened", version);
		var changelog = new XMLHttpRequest();
		changelog.onreadystatechange = function() {
			if (this.readyState == 4 && this.status == 200) {
				document.getElementById("changelog-page").innerHTML = "<span style='font-size:2em;'>Changelog</span><br><br>" + changelog.responseText.replaceAll("\n", "<br>") + "<br><b>Click to continue...</b>";
				document.getElementById("changelog-page").style.display = "block";
			}
		};
		changelog.open("POST", "https://joel-online.web.app/data/changelogs/" + version + ".txt", true);
		changelog.send();
	}
	var output_;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
			output_ = xhttp.responseText;
			latest = JSON.parse(output_);
			checkForUpdates();
		}
	};
	if(versionId[4] == "beta"){
	xhttp.open("POST", "https://joel-online.web.app/data/latest_beta.json", true);
	} else {
	xhttp.open("POST", "https://joel-online.web.app/data/latest.json", true);	
	}
	xhttp.send();
}

function checkForUpdates(){
	if(latest.notFound){
		//Not connected to the internet or couldn't find file
		console.warn('Updater not connected');
	} else {
		if(!latest.mascot){
			latest.mascot = "assets/images/Joel_Party_TA2.png";
		}

		if((versionId[0] < latest.versionId[0]) || (versionId[1] < latest.versionId[1]) || (versionId[2] < latest.versionId[2]) || (versionId[3] < latest.versionId[3])){
			//A stamp in the current verison number is SMALLER than the online version
			if(latest.versionId[4] == "beta"){
				//The latest online version is a beta
				if(versionId[4] == "beta"){
					//The user has a beta release installed, and an update is required
					updater(latest.version, latest.description, latest.mascot);
					console.log("A new beta is available: " + latest.version);
				}
			} else if(latest.versionId[4] == ""){
				//The latest online version is a stable release and an update is required
				updater(latest.version, latest.description, latest.mascot);
				console.log("A new version is available: " + latest.version);
			} else if(latest.versionId[4] == "alpha"){
				//The latest online version is an alpha, which shouldn't happen. No action.
			} else {
				//The latest online version is misspelt or unreliably produced, no action.
			}
		} else {
			window.localStorage.setItem("lockeddown", "false");
		}
	}
}

function updater(ver, desc, image){
	if(!image){
		image = "assets/images/Joel_Party_TA2.png";
	}
	document.getElementById("updater-page").style.display="block";
	document.getElementById("updaterlatest").innerHTML = "v" + ver;
	document.getElementById("updaterinfo").innerHTML = desc;
	document.getElementById("updateMascot").src = image;

	document.getElementById("updateroptions").innerHTML = "";
	for(var a = 0; a < latest.options.length; a++){
		if(latest.options[a].disabled != "true"){
			var option = document.createElement("a");
			option.href = "javascript:void(0);";
			option.setAttribute("onclick", latest.options[a].action);
			option.innerHTML = latest.options[a].name;
			document.getElementById("updateroptions").appendChild(option);
			var breaker = document.createElement("br");
			document.getElementById("updateroptions").appendChild(breaker);
		} else if(latest.options[a].disabledtext) {
			var option = document.createElement("span");
			option.innerHTML = latest.options[a].disabledtext;
			option.style.color = "red";
			document.getElementById("updateroptions").appendChild(option);
			var breaker = document.createElement("br");
			document.getElementById("updateroptions").appendChild(breaker);
		}
	}
}

function acceptUpdate(updaterUrl){
	document.getElementById("updater-page").style.display="none";
	if(latest.url){
		if(platform != "android"){
			window.open(latest.url);
		} else {
			cordova.InAppBrowser.open('https://joel-online.web.app/', '_system');
		}
	}
	if(latest.action.accept[platform]){
		new Function(latest.action.accept[platform])();
	} else if(latest.action.accept.default){
		new Function(latest.action.accept.default)();
	}
}

function denyUpdate(){
	document.getElementById("updater-page").style.display="none";
	if(latest.action.deny[platform]){
		new Function(latest.action.deny[platform])();
	} else if(latest.action.deny.default){
		new Function(latest.action.deny.default)();
	}
}

//PRELOAD
function preload(elem){
	var imagesA = [];
	var images = [];
		for(var a = 0; a < preload_sets.length; a++){
			for(var b = 0; b < preload_sets[a].length; b++){
				imagesA.push(preload_sets[a][b]);
				//console.log(preload_sets[a][b]); <--debug
			}
		}
		for(var c = 0; c < preload_static.length; c++){
			imagesA.push(preload_static[c]);
			//console.log(preload_static[c]); <--debug
		}
    for (var d = 0; d < imagesA.length; d++) {
        images[d] = new Image();
        images[d].src = imagesA[d];
    }
}

//CORE DEFINITIONS
var launched = false;
var launchWithStory = false;
var animationtiming = 0; var animationframe = 0; var animationfinishedloops = 0;
var sleepControl;
var sleepTime = 0;

var isSleeping = false;
var fallAsleepBy = 10000;
var darkSide = false;

var joel = document.getElementById("joel_main");
var textareas = document.getElementsByClassName("textArea")[0];
var menu = document.getElementById("menu-page");
var menubutton = document.getElementById("menu-button").children[0];

var sfxsetting = document.getElementById("sfxsetting");

function launch(){
	if(launchable){
		document.getElementById("launcher-page").style.display = "none";
		document.getElementById("default-page").style.display = "block";
		var elem = document.getElementsByTagName("html")[0];
		if(build != "Newgrounds build"){
			if (elem.requestFullscreen) {
				elem.requestFullscreen();
			} else if (elem.webkitRequestFullscreen) { /* Safari */
				elem.webkitRequestFullscreen();
			} else if (elem.msRequestFullscreen) {
				elem.msRequestFullscreen();
			}
		}
		if(document.getElementById("musicsetting").checked){
		music.play();
		}
		launched = true;
		if(launchWithStory){
			if(params.get("editable")){
				readStory();
			}
			playStory();
		}
	}
}

function revealLauncher(){
	document.getElementById('launcher-placeholder').style.display = 'none';
	if(launchable){
		document.getElementById('launcher-details').style.display = 'block';
	} else {
		document.getElementById('launcher-details').style.display = 'none';
	}
}

function pageColor(color){
	var el = document.getElementsByClassName("page");
	for(var i = 0; i < el.length; i++){
		el[i].style.backgroundColor = color;
	}
}

var i = 0;

//actions array
var actions = [
	function (){
			animateJoel(singing, 60, 1);
			if(Math.floor((Math.random() * 10) + 1) == 1){
				if(sfxsetting.checked == true){
				 soundeffect(sfx.chirp);
				}
			}
		},
	function (){
			joel.src = general;
	},
	function (){
			joel.src = happy;
	},
	function (){
			animateJoel(worm, 50, 1);
	},
	function (){
			confettiStuff();
			animateJoel(party_loop, 40, 2);
	},
	function (){
			joel.src = bowtie;
	},
	function (){
			joel.src = flower;
	},
	function (){
			animateJoel(cooldude, 30, 1);
	}
];


//animations
var currentAnimation;
function animateJoel(imageCollection,durationofFrame,maxTimes){
	animationtiming = 0; animationfinishedloops = 0; animationframe = 0;
	clearInterval(currentAnimation);
	currentAnimation = setInterval(animationTimer,1,imageCollection,durationofFrame,maxTimes);
}

function animationTimer(arrimg,max,times) {
	animationtiming++;
	if(animationtiming > max){
		animationtiming = 0;
		animationframe++;
		if(animationframe > arrimg.length - 1){
		animationframe = 0;
		animationfinishedloops++;
			if(animationfinishedloops > times - 1){
				clearInterval(currentAnimation);
				//console.log(animationfinishedloops);
				animationfinishedloops = 0;
				//joel.src = general;
				return;
			}
		}
	}

	joel.src=arrimg[animationframe];

}

var item = 0;

function doRandomThing(){
	var oldItem = item;
	item = Math.floor((Math.random() * actions.length) + 0);
		if(item == oldItem){
			doRandomThing();
			return;
		}
	actions[item]();
	document.getElementById("tooltip").innerHTML = quotes[Math.floor((Math.random() * quotes.length) + 0)];
	updatePronouns();
}

function confettiStuff(){
	if(document.getElementById("partysetting").checked){
	var confettiSettings = {"target":"confetti-holder","max":"63","size":"1","animate":true,"props":["square","triangle","line"],"colors":[[165,104,246],[230,61,135],[0,199,228],[253,214,126]],"clock":"100","rotate":false,"start_from_edge":false,"respawn":false};
	var confetti = new ConfettiGenerator(confettiSettings);
	document.getElementById("confetti-holder").style.display = "block";
	confetti.render();
	
	window.setTimeout(function(){
		confetti.clear();
		document.getElementById("confetti-holder").style.display = "none";	}, 2500);

	}
}

joel.src = general;

var secretprogress = 0;

function invertPositions(){
	if(document.getElementById("invertsetting").checked){
		joel.classList.remove("defaultHand");
		joel.classList.add("invertedHand");
		document.getElementById("alltext").classList.remove("defaultHand");
		document.getElementById("alltext").classList.add("invertedHand");
	} else {
		joel.classList.remove("invertedHand");
		joel.classList.add("defaultHand");
		document.getElementById("alltext").classList.remove("invertedHand");
		document.getElementById("alltext").classList.add("defaultHand");
	}
}
var inStory = false;
var currentStory = [];
function joelAction(){
  if(!darkSide){
	if(!inStory){
		if(isSleeping == false){
		doRandomThing();
		
		} else {
		wakeUp();
		}
		
		if(!sleepControl){
		sleepControl = setInterval(sleepTimer,1);
		}
		sleepTime = 0;
		document.getElementById("tooltip").innerHTML = quotes[Math.floor((Math.random() * quotes.length) + 0)];
		updatePronouns();
	} else {
		clearInterval(sleepControl);
		if(currentStory[item]){
				if(currentStory[item].visual){
					if(currentStory[item].visual.animate){
						var animation = "worm";
						var time = 60;
						var repeat = 1;
						if(currentStory[item].visual.animate.animation){
							animation = currentStory[item].visual.animate.animation;
						} else if(currentStory[item].visual.animate.frames){
							animation = currentStory[item].visual.animate.frames;
						}

						if(currentStory[item].visual.animate.framedur){
							time = currentStory[item].visual.animate.framedur;
						}

						if(currentStory[item].visual.animate.repeat){
							repeat = currentStory[item].visual.animate.repeat;
						}

						animateJoel(animation, time, repeat);
					} else if(currentStory[item].visual.static) {
						joel.src = currentStory[item].visual.static;
					} /*else if(currentStory[item].visual.components){} */
				}
				if(currentStory[item].quote){
					if(typeof currentStory[item].quote == "object"){
						document.getElementById("tooltip").innerHTML = currentStory[item].quote[Math.floor((Math.random() * currentStory[item].quote.length) + 0)];
					} else {
						document.getElementById("tooltip").innerHTML = currentStory[item].quote;
					}
				}
				if(currentStory[item].effect){
					if(currentStory[item].effect.confetti){
						confettiStuff();
					}
					if(currentStory[item].effect.sound){
						soundeffect(currentStory[item].effect.sound);
					}
				}
				if(currentStory[item].music){
					changeMusic(currentStory[item].music, true);
				}
				if(currentStory[item].theme){
					if(currentStory[item].theme.pageColor){
						pageColor(currentStory[item].theme.pageColor);
					} /*if(currentStory[item].theme.textColor){}*/
				}
				if(currentStory[item].end){
					inStory = false;
					item = 0;
					document.getElementById("tooltip").innerHTML += "<br><br><i>End of story</i>";
				}
		} else {
			item = 0;
		}
		item++;
		updatePronouns();
	}
  } else {
	wakeUp();
	joel.src = posessed;
	clearInterval(sleepControl);
	sleepTime = 0;
	
	
	document.getElementById("tooltip").innerHTML = secretquotes[secretprogress];
	secretprogress++;
	if(secretprogress > secretquotes.length - 1){
	secretprogress = 0;
	}
  }
}

function submitAnswerTyped(){
	alert();
}

function playStory(){
	item = 0;
	inStory = true;
	document.getElementById("story-page").style.display = "none";
	document.getElementById("default-page").style.display = "block";
	menu.style.display = "none";
	document.getElementById("credits-page").style.display = "none";
	document.getElementById("settings-pronouns-page").style.display = "none";
	menubutton.src = menuimgs[0];
	document.getElementById("tooltip").innerHTML = '<dynamic var="joelName">Joel</dynamic> is here to <b>tell you a story</b>.<br><br>Click to get started!';
	updatePronouns();
	joel.src = general;
}

function exportStory() {
	var filename = prompt("What should your story file name be?", "My Story") + ".jstory";
	var text = JSON.stringify(currentStory);

    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

function wakeUp(){
	clearInterval(currentAnimation);
	isSleeping = false;
	if(!darkSide){
		changeMusic(theme.general, true, true);
		document.getElementById("tooltip").innerHTML = wakeupquotes[Math.floor(Math.random() * (wakeupquotes.length - 1))];
		joel.src = general;
	}
}

function sleepTimer(){
	if(isSleeping == false){
	sleepTime++;
	}
	if(sleepTime > fallAsleepBy){
		if(isSleeping == false){
			isSleeping = true;
			animateJoel(sleeping_loop,179);
			document.getElementById("tooltip").innerHTML = "<i><dynamic var='joelName'>Joel</dynamic> is sleeping. Tap to wake <dynamic var='pronouns[1]'>him</dynamic> up.</i>";
			updatePronouns();
			changeMusic(theme.lullaby);
		}
	}
}

function toggleMenu(){
	if(document.getElementById("darkToggleGroup").style.display == "none"){
		secretRevealProgress = 0;
		document.getElementById("darkprogress").style.display = "none";
	}
	if(menu.style.display == "block" || document.getElementById("credits-page").style.display == "block" || document.getElementById("settings-pronouns-page").style.display == "block"){
		document.getElementById("default-page").style.display = "block";
		menu.style.display = "none";
		document.getElementById("credits-page").style.display = "none";
		document.getElementById("settings-pronouns-page").style.display = "none";
		menubutton.src = menuimgs[0];
	} else {
		menu.style.display = "block";
		document.getElementById("default-page").style.display = "none";
		menubutton.src = menuimgs[1];
	}
}

function toggleInput(elem){
	if(elem.children[0].children[0].disabled == true){
		elem.children[0].children[1].src = 'assets/misc/joel_' + elem.children[0].children[0].checked + '_disabled.png'
	}else{
		elem.children[0].children[1].src = 'assets/misc/joel_' + elem.children[0].children[0].checked + '.png'
	}
	saveSettings();
}

function toggleRadio(){
	for(var i = 0; i < document.getElementsByClassName("radio").length; i++){
		elem = document.getElementsByClassName("radio")[i];
		elem.children[0].children[1].src = 'assets/misc/radio_' + elem.children[0].children[0].checked + '.png'
	}
	saveSettings();
}

function turnDarkSide(){
	document.getElementById("darkSide").disabled = true;
	document.getElementById("dstoggle").src = "assets/misc/joel_true_disabled.png";
	if(!darkSide){
		pageColor("black");
		changeMusic(theme.dark, true);
		darkSide = true;
		joelAction();
		secretprogress = 0;
		document.getElementById("tooltip").innerHTML = "<i><b>There's no turning back now.</b></i>";
		document.getElementById("darksidecredits").style.display = "block";
		menu.style.display = "none";
		menubutton.src = menuimgs[0];
		document.getElementById("default-page").style.display = "block";
		document.getElementById("build").innerHTML += ", SECRET MODE";
		document.getElementById("history").innerHTML = "One ring to rule them all<br>One ring to find them<br>One ring to bring them all<br>And in the darkness bind them.";
		
	}
}

var secretRevealProgress = 0;
function secretReveal(){
	if(document.getElementById("darkToggleGroup").style.display == "none"){
		secretRevealProgress++;
		
		if(secretRevealProgress > 20){
			document.getElementById("darkprogress").style.display = "block";
			document.getElementById("darkprogress").children[0].src = "assets/misc/secretreveal/joel_toggle_" + Math.floor((secretRevealProgress - 10) / 10) + ".png";
		}
		if(secretRevealProgress > 60){
			document.getElementById("darkprogress").style.display = "none";
			document.getElementById("darkToggleGroup").style.display = "block";
		}
	}
}

function escapeAttempt(){
	document.getElementById("tooltip").innerHTML = "<i><b>" + escapeattemptquotes[Math.floor(Math.random() * (escapeattemptquotes.length - 1))]; + "</b></i>";
	menu.style.display = "none";
	menubutton.src = menuimgs[0];
	document.getElementById("default-page").style.display = "block";
}

//DEBUG

function joelDebug(){
	document.getElementById("debug-page").style.display = "block";
	document.getElementById("debuglink").style.display = "block";
}

function debugJoel(){joelDebug();} function jDebug(){joelDebug();} function jdebug(){joelDebug();} function debugj(){joelDebug();} function debugJ(){joelDebug();} function jd(){joelDebug();} function dj(){joelDebug();}

function debugImages(condition, typea){
//alert("broken");
var imag = document.getElementsByTagName(typea);

	for(var a = 0; a < imag.length; a++){
		if(condition.checked){
			imag[a].style.border = "3px dotted white";
		} else {
			imag[a].style.border = "0px";
		}
	}
}

//MUSIC
var theme = {};
theme.general = "assets/music/JoelProjectThemeV1.mp3";
theme.lullaby = "assets/music/JoelLullabyThemeV1.mp3";
theme.dark = "assets/music/Hitman.mp3";

theme.galacticbanana = {};
theme.galacticbanana.tweettweet = "assets/music/remix/tweettweet";
theme.galacticbanana.nest = "assets/music/remix/nest";
theme.galacticbanana.featherlord = "assets/music/remix/featherlord";


var music = new Audio();
music.src = theme.general;
music.loop = true;
music.autoplay = false;
music.onpause = function(){
	document.getElementById('musicsetting').checked = (!music.paused); 
	toggleInput(document.getElementById('musicsetting').parentNode.parentNode)
};
music.onplay = function(){
	document.getElementById('musicsetting').checked = (!music.paused); 
	toggleInput(document.getElementById('musicsetting').parentNode.parentNode)
};

var musicsetting = false;

function toggleMusic(){
	if(document.getElementById("musicsetting").checked){
		music.play();
		
	} else {
		music.pause();
	}
	notPausedMusic = (!music.paused);
}

var bglisteners = [];

if(platform == "android"){
	document.addEventListener("pause", function(){
		if(!document.getElementById("bgmusicsetting").checked){
			musicsetting = document.getElementById('musicsetting').checked;
			music.pause();
		}
	});
	document.addEventListener("resume", function(){
		if(!document.getElementById("bgmusicsetting").checked){
			if(musicsetting){
					music.play();
			}
		}
	});
} else {
	document.addEventListener("mouseleave", function(){
		if(!document.getElementById("bgmusicsetting").checked){
			musicsetting = document.getElementById('musicsetting').checked;
			music.pause();
		}
	});
	document.addEventListener("mouseenter", function(){
		if(!document.getElementById("bgmusicsetting").checked){
			if(musicsetting){
				music.play();
			}
		}
	});
}

var isChanging = false;
var overrideMusicChange = false;
var changingWith = "";
/*function changeMusic(newSRC, goFast, overrideDetector){
	if(changingWith != music.currentSrc && changingWith != ""){
		overrideMusicChange = true;
		return;
	}
	var notPausedMusic = (!music.paused);//document.getElementById('musicsetting').checked;
	if((newSRC != music.currentSrc && isChanging == false)){
		changingWith = newSRC;
		isChanging = true;
		if(notPausedMusic == true){
			if(!goFast){
				var fadeAudio = setInterval(function () {
						
					// Only fade if past the fade out point or not at zero already
					if ((music.volume != 0.0)) {
						music.volume = Math.max(0, music.volume - 0.1);
						
					}
					// When volume at zero stop all the intervalling
					if (music.volume === 0.0) {
						music.src = newSRC;
						music.currentTime = 0;
						music.volume = 1;
						music.load();
						if(notPausedMusic == true){music.play();}
						isChanging = false;
						newSRC = "";
						clearInterval(fadeAudio);
						changingWith = "";
					}

					if(overrideMusicChange == true){
						clearInterval(fadeAudio);
						music.volume = 1;
						overrideMusicChange = false;
						changingWith = "";
						isChanging = false;
					}
				}, 200);
			} else {
				var fadeAudio = setInterval(function () {
						
					// Only fade if past the fade out point or not at zero already
					if ((music.volume != 0.0)) {
						music.volume = Math.max(0, music.volume - 0.1);
						
					}
					// When volume at zero stop all the intervalling
					if (music.volume === 0.0) {
						music.src = newSRC;
						music.currentTime = 0;
						music.volume = 1;
						music.load();
						if(notPausedMusic == true){music.play();}	
						isChanging = false;
						newSRC = "";
						clearInterval(fadeAudio);
						changingWith = "";
					}

					if(overrideMusicChange == true){
						clearInterval(fadeAudio);
						music.volume = 1;
						overrideMusicChange = false;
						changingWith = "";
						isChanging = false;
					}
				}, 50);
			}
		} else {
			music.src = newSRC;
			music.currentTime = 0;
			music.volume = 1;
			music.load();
			//if(notPausedMusic == true){music.play();}
			isChanging = false;
			newSRC = "";
			//clearInterval(fadeAudio);
		}
	}

}*/
var notPausedMusic;

function changeMusic(newSRC, goFast){
	notPausedMusic = (!music.paused);

	if((music.sourceVal != newSRC) && (!isChanging)){
		//It actually needs to change
		isChanging = true;
		if(music.paused){
			music.src = newSRC;
			music.sourceVal = newSRC;
			music.currentTime = 0;
			music.volume = 1;
			music.load();
			isChanging = false;
			newSRC = "";
		} else {
			var speedMs = 200;
			if(goFast){
				speedMs = 50;
			}

			var fadeAudio = setInterval(function () {
								
				// Only fade if past the fade out point or not at zero already
				if ((music.volume != 0.0)) {
					music.volume = Math.max(0, music.volume - 0.1);
				}

				// When volume at zero stop all the intervalling
				if (music.volume === 0.0) {
					music.src = newSRC;
					music.sourceVal = newSRC;
					music.currentTime = 0;
					music.volume = 1;
					music.load();
					if(notPausedMusic == true){music.play();}	
					isChanging = false;
					newSRC = "";
					clearInterval(fadeAudio);
					changingWith = "";
				}

				if(overrideMusicChange == true){
					clearInterval(fadeAudio);
					music.volume = 1;
					overrideMusicChange = false;
					changingWith = "";
					isChanging = false;
				}
			}, speedMs);
		}
	} else if(isChanging){
		overrideMusicChange = true;
	}
}


var sfx = {
	chirp: "assets/sfx/tweet.wav",
	click1: "assets/sfx/click1.mp3",
	click2: "assets/sfx/click2.mp3",
	click3: "assets/sfx/click3.mp3",
};
var queuedeffects = [];

function soundeffect(soundf){
	var sfxid = 0;
	queuedeffects.push(new Audio());
	sfxid = queuedeffects.length - 1;
	queuedeffects[sfxid].src = soundf;
	queuedeffects[sfxid].onended = function(){
		var selfid = queuedeffects.indexOf(this);
		//console.log(this.src + " has finished playing."); <-- DEBUG
		queuedeffects.splice(selfid, 1);
	};
	queuedeffects[sfxid].play();
}

//DEFAULT SOUND EFFECTS
document.addEventListener("click", function(e){
	if(document.getElementById("sfxsetting").checked){
		if(e.target.className.includes("toggle") || e.target.className.includes("radio") || e.target.className.includes("creator") || e.target.className.includes("click2")){
			soundeffect(sfx.click2);
		} else if(e.target.className.includes("makeclick")) {
			soundeffect(sfx.click1);
		}
	}
});

//PRONOUNS
var pronouns = ["he", "him", "his"];
var joelName = "Joel";
function updatePronouns(){
	pronouns = eval(document.querySelector('input[name="pronoun"]:checked').value);
	joelName = document.querySelector('input[name="birbname"]:checked').value;
	var dynamicItems = document.getElementsByTagName("dynamic");
	for(var a = 0; a < dynamicItems.length; a++){
		dynamicItems[a].innerHTML = eval(dynamicItems[a].getAttribute("var"));
	}
	document.title = joelName +" App // v" + version;
	document.getElementsByClassName("banner")[0].src="assets/misc/banner_" + joelName.toLowerCase() + ".png";
	if(build != "Josie build"){
		saveSettings();
	}
}

//document.querySelector('input[name="pronoun"]:checked').value;
//document.querySelector('input[name="birbname"]:checked').value;


//SETTINGS

function saveSettings(){
	var settings = {};
	settings.sfx = document.getElementById("sfxsetting").checked;
	settings.confetti = document.getElementById("partysetting").checked;
	settings.invertpos = document.getElementById("invertsetting").checked;
	settings.fallsAsleep = true;

	settings.music = {};
	settings.music.ambience = document.getElementById("ambiencesetting").checked;
	settings.music.background = document.getElementById("bgmusicsetting").checked;
	settings.music.enabled = document.getElementById("musicsetting").checked;
	settings.music.tracks = {};
	settings.music.tracks.general = true;
	settings.music.tracks.lullaby = true;
	settings.music.tracks.dark = true;

	settings.pronouns = {};
	settings.pronouns.name = document.querySelector('input[name="birbname"]:checked').value;
	settings.pronouns.values = document.querySelector('input[name="pronoun"]:checked').value;

	settings.theme = {};
	settings.theme.bgcolor = "#1b1b1b";
	settings.theme.textcolor = "white";

	window.localStorage.setItem("joelSettings", JSON.stringify(settings));
}

function loadSettings(){
	if(window.localStorage.getItem("joelSettings")){
	var settings = JSON.parse(window.localStorage.getItem("joelSettings"));

	document.getElementById("sfxsetting").checked = settings.sfx;
	document.getElementById("partysetting").checked = settings.confetti;
	document.getElementById("invertsetting").checked = settings.invertpos;

	document.getElementById("ambiencesetting").checked = settings.music.ambience;
	document.getElementById("bgmusicsetting").checked = settings.music.background;
	document.getElementById("musicsetting").checked = settings.music.enabled;
	settings.music.tracks = {};
	settings.music.tracks.general = true;
	settings.music.tracks.lullaby = true;
	settings.music.tracks.dark = true;

	if(build != "Josie build"){
		document.querySelector('input[name="birbname"][value="' + settings.pronouns.name + '"]').checked = true;

		//The following is a fix for settings saved before v0.0.21beta that didn't include 4 entries in pronouns.

		//OLD document.querySelector('input[name="pronoun"][value="' + settings.pronouns.values + '"]').checked = true;

		for(var i = 0; i < document.querySelectorAll('input[name="pronoun"]'); i++){
			if(eval(document.querySelectorAll('input[name="pronoun"]')[i].value)[0] == eval(settings.pronouns.values)[0]){
				document.querySelectorAll('input[name="pronoun"]')[i].checked = true;
			}
		}
	}

	pageColor(settings.theme.bgcolor);
	settings.theme.textcolor = "white";

	var alltoggles = document.getElementsByClassName("toggle");
	for(var a = 0; a < alltoggles.length - 1; a++){
		toggleInput(alltoggles[a]);
	}
	toggleRadio();

	invertPositions();
	updatePronouns();
	}
}

//Event Listeners
document.getElementById("default-page").addEventListener("click", function( e ){
    e = window.event || e; 
    if(e.target != document.getElementById("answer-typed")) {
        joelAction();
    }
});

var desktopActionKeybind = 32;
document.onkeypress = function (e) {
    e = e || window.event;
    if(e.keyCode == desktopActionKeybind && launched){
		if(e.target != document.getElementById("answer-typed")){
		joelAction();
		}
	} else if(e.keyCode == 13 && launched){
		if(e.target == document.getElementById("answer-typed")){
			submitAnswerTyped();
		}
	}
};