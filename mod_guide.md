# Modding guide
Here's a step-by-step guide on how to mod the little birb. If you have trouble with this guide, please do **not** contact me: the project is finished and no furthur updates will be added.

### You'll need:
- The source code (wow, you can get that here!)
- A code editor (Visual Studio Code is best)
- A browser (which you should be viewing this on anyway)
- An internet conenction to download the code

## Setup
### Installing the source code.
First thing you need to do is to download the source code. You'll be editing a browser version of Joel.
1. [Download the source code](https://github.com/Joel-Team/Joel/archive/refs/heads/main.zip)
2. Put the .zip file in its own folder (not in your downloads!!!)
3. Unzip the folder
You're all done installing the source code. Wow, that was easy.

### Launching the app
Double-click `index.html` to launch the app in your browser. You should have your own version of Joel. If you open the menu, you should see Browser Development Build or Unknown Build beside the version number. When you reload the page, any changes made in the code should apply themselves.

![image](https://user-images.githubusercontent.com/67883592/152700974-1e1425e4-609a-4b58-b395-26b1a80eae1a.png)

## Modding
Any of the files in the source code can be modified to provide your own custom experience for Joel. Let's start off by replacing an existing sprite from the app.

### Replacing an exisiting sprite
Let's change Joel's default pose. Go into the `assets` folder and open `Joel_Original_TSA1.png` in a paint editor of your choice.

<img src="https://user-images.githubusercontent.com/67883592/152701157-857a672c-3b9a-4b2e-adb6-3328ae30dbf2.png" width="400">

Draw whatever you want on Joel. I'm going to be adding a green top hat to the birb.

![image](https://user-images.githubusercontent.com/67883592/152701208-a2cbd670-ff79-41ec-9818-1a73f5af51cb.png)

When you're done, save the file and launch the app using `index.html` in your root folder. Joel should appear different!

![image](https://user-images.githubusercontent.com/67883592/152701282-b315c0a3-a4cc-41d4-93f7-6f5bdf7f6655.png)

### Adding a new sprite
If you want to add a new sprite to Joel's possible appearences, the process is a bit more complicated. Now, we're going to be editing some code.

First, get an Image of Joel that you want to add. I'm going to be using this example photo of our birb sitting on a stool.

<img src="https://user-images.githubusercontent.com/67883592/152701454-12488cf9-acfc-40fb-9112-23dd60ef89fd.png" width="200">

Drop the file in `assets/images`. Remember the file name.

![image](https://user-images.githubusercontent.com/67883592/152701559-b5c9f796-5c28-493e-87fc-2888031edf0d.png)

Go back to your root folder and open `images.js`. Search for the following part of the code:
```js
var staticsets = [happy, general, bowtie, flower, posessed];
var happy = "assets/images/Joel_Happi_TS1.png";
var general = "assets/Joel_Original_TSA1.png";
var bowtie = "assets/images/Joel_Bowtie_TS1.png";
var flower = "assets/images/Joel_Flower_TS1.png";
var posessed = "assets/images/Joel_Posessed_TS1.png";
```

Add a new line underneath similar to this:
```js
var stoolsprite = "assets/images/joel_stool_file.png";
```

Then, add your new variable to the `staticsets` array by modifying its line to look like this:
```
var staticsets = [happy, general, bowtie, flower, posessed, stoolsprite];
```

Finally, scroll down to the bottom of the file and find `var preload_static = [...`. Add your variable's name to that one as well.

```js
var preload_static = [ happy, general, bowtie, flower, posessed, stoolsprite ];
```

Once you're done, save `images.js` and open `script.js`. This is where Joel's main code is. 

Look for 
```js
var actions = [
  function (){
    ...
  },
  function(){
    ...
  },
  ...
]
```

At the end of that array, add in the following:
```js
function (){
  joel.src = stoolsprite; //your variable name from earlier
}
```
`var actions = [` should now look like this:
```js
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
	},
	function (){
		joel.src = stoolsprite;
	}
];
```

Save `script.js` and move launch the program again. When you click through Joel, your static sprite should show up.
