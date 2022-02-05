function buildToggles(){
    var toggles = document.getElementsByTagName("joel-toggle");
    for(var i = 0; i < toggles.length - 1; i++){
        var toggletext = toggles[i].innerHTML;
        var toggleid = toggles[i].getAttribute("toggle-id");
        var togglesrc = toggles[i].getAttribute("default-src");

        toggles[i].innerHTML = '<label><input type="checkbox" style="display:none;" id="' + toggleid + '"'
        if(toggles[i].getAttribute("toggle-checked")){toggles[i].innerHTML += "checked";}
        if(toggles[i].getAttribute("toggle-disabled")){toggles[i].innerHTML += "disabled";}
        toggles[i].innerHTML += '><img draggable="false" style="vertical-align:middle;" src="' + togglesrc + '" class="toggleicon">' + toggletext + '</label>';
    }
}

buildToggles();