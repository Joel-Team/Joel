var params = new URLSearchParams(location.search);
if(params.has("story") && params.has("encoded")){
    if(params.get("encoded") == "true"){
        currentStory = JSON.parse(atob(params.get("story")));
    } else {
        currentStory = JSON.parse(params.get("story"));
    }
    launchWithStory = true;
}

function addScene(ignoreData){
    var scenecode = '<legend>Scene (<a href="javascript:void(0)" onclick="removeScene(this.parentNode.parentNode)">Remove</a> || <a href="javascript:void(0)" onclick="previewScene(this.parentNode.parentNode)">Preview</a>)</legend><table style="width:100%;"><thead><tr><td>Visual</td><td>Quote</td><td>Effect</td><td>Misc</td></tr></thead><tbody><tr><td><input placeholder="assets/static/Joel_Original_TSA1.png" list="static-sprites" style="width: 90%"><br>OR<br><input placeholder="Animation name" list="animation-sets"><br><input placeholder="Speed" style="width:80px;"><input placeholder="Repeat" style="width:81px;" ></td><td><textarea style="resize:none;width:100%"></textarea></td><td><label><input type="checkbox"> Confetti</label><br><input placeholder="Sound effect"></td><td><label><input type="checkbox"> End story here?</label></td></tr></tbody></table>';
    var scene = document.createElement("fieldset");
    scene.setAttribute("class", "scene");
    scene.setAttribute("oninput", "updateStory(this)");
    scene.innerHTML = scenecode;

    document.getElementById("story-builder-scenes").appendChild(scene);

    for(var i = 0; i < document.getElementById("story-builder-scenes").children.length; i++){
        document.getElementById("story-builder-scenes").children[i].setAttribute("index", i);
    }

    if(!ignoreData){
        currentStory.push({});
    }
}

function removeScene(elem){
    elem.parentNode.removeChild(elem);
    currentStory.splice(parseFloat(elem.getAttribute("index")), 1);

    for(var i = 0; i < document.getElementById("story-builder-scenes").children.length; i++){
        document.getElementById("story-builder-scenes").children[i].setAttribute("index", i);
    }
}

function previewScene(scene){
    item = parseFloat(scene.getAttribute("index"));
	inStory = true;
	document.getElementById("story-page").style.display = "none";
	document.getElementById("default-page").style.display = "block";
	menu.style.display = "none";
	document.getElementById("credits-page").style.display = "none";
	document.getElementById("settings-pronouns-page").style.display = "none";
	menubutton.src = menuimgs[0];
	document.getElementById("tooltip").innerHTML = '<dynamic var="joelName">Joel</dynamic> is here to <b>tell you a story</b> (starting from Scene ' + (item + 1) + ').<br><br>Click to get started!';
	updatePronouns();
	joel.src = general;
}

function clearStory(doData){
    for(var i = 0; i < document.getElementsByClassName("scene").length; i++){
        if(doData){
            removeScene(document.getElementsByClassName("scene")[i]);
        } else {
            document.getElementsByClassName("scene")[i].parentNode.removeChild(document.getElementsByClassName("scene")[i]);
        }
        i--;
    }
}

function readStory(){
    clearStory(false);
    for(var a = 0; a < currentStory.length; a++){
        addScene(true);
        var fieldset = document.getElementsByClassName("scene")[document.getElementsByClassName("scene").length - 1];
        var storyEntry = currentStory[a];

        var dataArea = fieldset.children[1].children[1].children[0];

        if(storyEntry.visual.static){
            //Static Sprite
            dataArea.children[0].children[0].value = storyEntry.visual.static;

        } else if(storyEntry.visual.animate) {
            //Animation
            for(var i = 0; i < animationsets.length; i++){
                if(animationsets[i].set.join(",") == storyEntry.visual.animate.animation.join(",")){
                    dataArea.children[0].children[3].value = animationsets[i].name;
                }
            }

            if(storyEntry.visual.animate.framedur){
                //Animation:framedur
                dataArea.children[0].children[5].value = storyEntry.visual.animate.framedur;
            }
            if(storyEntry.visual.animate.repeat){
                //Animation:repeat
                dataArea.children[0].children[6].value = storyEntry.visual.animate.repeat;
            }
        }

        if(storyEntry.quote){
            //Quote
            dataArea.children[1].children[0].value = storyEntry.quote;
        }
        //Do Confetti
        dataArea.children[2].children[0].children[0].checked = storyEntry.effect.confetti;

        if(storyEntry.effect.sound){
            //SFX
            dataArea.children[2].children[2].value = storyEntry.effect.sound;
        }

        //Is End
        dataArea.children[3].children[0].children[0].checked = storyEntry.end;
    }
}

function updateStory(elem){
    //var storyEntry = currentStory[parseFloat(elem.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("index"))];
    currentStory[parseFloat(elem.getAttribute("index"))] = {
        visual: {},
        effect: {},
        quote: "",
        end: false
    };  

    var storyEntry = currentStory[parseFloat(elem.getAttribute("index"))];
    var fieldset = elem;

    var dataArea = fieldset.children[1].children[1].children[0];

    if(dataArea.children[0].children[0].value != ""){
        //Static Sprite
        storyEntry.visual.static = dataArea.children[0].children[0].value;

    } else if(dataArea.children[0].children[3].value != "") {
        //Animation
        storyEntry.visual.animate = {};
        storyEntry.visual.animate.animation = dataArea.children[0].children[3].value;
        for(var i = 0; i < animationsets.length; i++){
            if(animationsets[i].name == dataArea.children[0].children[3].value){
                storyEntry.visual.animate.animation = animationsets[i].set;
            }
        }

        if(dataArea.children[0].children[5].value != ""){
            //Animation:framedur
            storyEntry.visual.animate.framedur = parseFloat(dataArea.children[0].children[5].value);
        }
        if(dataArea.children[0].children[6].value != ""){
            //Animation:repeat
            storyEntry.visual.animate.repeat = parseFloat(dataArea.children[0].children[6].value);
        }
    }

    if(dataArea.children[1].children[0].value != ""){
        //Quote
        storyEntry.quote = dataArea.children[1].children[0].value;
    }
    //Do Confetti
    storyEntry.effect.confetti = dataArea.children[2].children[0].children[0].checked;

    if(dataArea.children[1].children[0].value != ""){
        //SFX
        storyEntry.effect.sound = dataArea.children[2].children[2].value;
    }

    //Is End
    storyEntry.end = dataArea.children[3].children[0].children[0].checked;

    currentStory[parseFloat(elem.getAttribute("index"))] = storyEntry;
}

var dropZone = document.getElementById('dropzone');

function showDropZone() {
    if(launched){
	    dropZone.style.display = "block";
    }
}
function hideDropZone() {
    dropZone.style.display = "none";
}

function allowDrag(e) {
    if (true) {  // Test that the item being dragged is a valid one
        e.dataTransfer.dropEffect = 'copy';
        e.preventDefault();
    }
}
function handleDrop(ev) {
  // Prevent default behavior (Prevent file from being opened)
  ev.preventDefault();
  hideDropZone();

  if (ev.dataTransfer.items) {
    // Use DataTransferItemList interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.items.length; i++) {
      // If dropped items aren't files, reject them
      if (ev.dataTransfer.items[i].kind === 'file') {
        var file = ev.dataTransfer.items[i].getAsFile();

        if(file.name.endsWith(".jstory")){
            var fr = new FileReader();
            fr.readAsText(file);
            fr.onload = function(){
                currentStory = JSON.parse(this.result);
                readStory();
                if(launched){
                    playStory();
                }
            };
        } else {
            alert("Oops, looks like Joel is having a hard time reading this Story. Please use a .jstory file.");
        }
      }
    }
  } else {
    // Use DataTransfer interface to access the file(s)
    for (var i = 0; i < ev.dataTransfer.files.length; i++) {
      if(file.name.endsWith(".jstory")){
        var fr = new FileReader();
        fr.readAsText(dataTransfer.files[i]);
        fr.onload = function(){
            currentStory = JSON.parse(this.result);
            if(launched){
                playStory();
            }
        };
    }
    }
  }
}

// 1
window.addEventListener('dragenter', function(e) {
    showDropZone();
});

// 2
dropZone.addEventListener('dragenter', allowDrag);
dropZone.addEventListener('dragover', allowDrag);

// 3
dropZone.addEventListener('dragleave', function(e) {
	console.log('dragleave');
    hideDropZone();
});

// 4
dropZone.addEventListener('drop', handleDrop);