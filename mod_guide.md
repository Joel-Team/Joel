# Modding guide
Here's a step-by-step guide on how to mod the little birb. If you have trouble with this guide, please do **not** contact me: the project is finished and no furthur updates will be added.

### Requests
I'm entirely fine with you modding whatever you want. However, I have a few requests on what you do and don't do with Joel:
- Please do not make anything NSFW / NSFL / racist / sexist / homophobic / transphobic / discriminatory with Joel. The app is meant to be wholesome and uplifting.
  - As a general rule of thumb; if you question if your idea is offensive, it likely is. Don't do it.
- Please leave the Joel Team in the credits.
- Please do contact us if you've made a really cool mod that you'd like to show us!
  - Please do not contact us if you have an issue
- Canonically, Joel uses `he / him` pronouns, so those are enabled by default, however, adding more pronouns to the user experience is fine.
- With any mods that you make, please make the source code public for educational purposes.

### You'll need:
- The source code (wow, you can get that here!)
- A code editor (Visual Studio Code is best)
- A browser (which you should be viewing this on anyway)
- An internet conenction to download the code
###### (<a href="#modding-guide">go to top</a>)

### Table of Contents
- [Setup](#setup)
  - [Installing Source Code](#installing-the-source-code)
  - [Launching the app](#launching-the-app)
- [Modding](#modding)
  - [Replacing an exisiting sprite](#replacing-an-exisiting-sprite)
  - [Adding a new sprite](#adding-a-new-sprite)
  - [Adding pronouns](#add-pronouns)
  - [Adding a new name for your birb](#adding-a-new-name-for-your-birb)
  - [Adding a quote](#adding-a-quote)
    - [Referencing Pronouns / Names](#referencing-the-user-selected-name--pronouns)
    - [Adding other types of quotes](#adding-other-types-of-quotes)
  - [Adding custom music / SFX](#adding-custom-music--sfx)
  - [Change the background color](#change-the-background-color)

###### (<a href="#modding-guide">go to top</a>)

## Setup
### Installing the source code.
First thing you need to do is to download the source code. You'll be editing a browser version of Joel.
1. [Download the source code](https://github.com/Joel-Team/Joel/archive/refs/heads/main.zip)
2. Put the .zip file in its own folder (not in your downloads!!!)
3. Unzip the folder
You're all done installing the source code. Wow, that was easy.

###### (<a href="#modding-guide">go to top</a>)

### Launching the app
Double-click `index.html` to launch the app in your browser. You should have your own version of Joel. If you open the menu, you should see Browser Development Build or Unknown Build beside the version number. When you reload the page, any changes made in the code should apply themselves.

![image](https://user-images.githubusercontent.com/67883592/152700974-1e1425e4-609a-4b58-b395-26b1a80eae1a.png)

###### (<a href="#modding-guide">go to top</a>)

## Modding
Any of the files in the source code can be modified to provide your own custom experience for Joel. Let's start off by replacing an existing sprite from the app.

###### (<a href="#modding-guide">go to top</a>)

### Replacing an exisiting sprite
Let's change Joel's default pose. Go into the `assets` folder and open `Joel_Original_TSA1.png` in a paint editor of your choice.

<img src="https://user-images.githubusercontent.com/67883592/152701157-857a672c-3b9a-4b2e-adb6-3328ae30dbf2.png" width="400">

Draw whatever you want on Joel. I'm going to be adding a green top hat to the birb.

![image](https://user-images.githubusercontent.com/67883592/152701208-a2cbd670-ff79-41ec-9818-1a73f5af51cb.png)

When you're done, save the file and launch the app using `index.html` in your root folder. Joel should appear different!

![image](https://user-images.githubusercontent.com/67883592/152701282-b315c0a3-a4cc-41d4-93f7-6f5bdf7f6655.png)

###### (<a href="#modding-guide">go to top</a>)

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

<img src="https://user-images.githubusercontent.com/67883592/152709079-b5b001e0-f848-4bd6-894f-380853616dae.png">

###### (<a href="#modding-guide">go to top</a>)

### Add pronouns
First, open `index.html` **in a code editor**. Scroll down to about line 215 and look for the following:
```html
<span style="font-size:2em;">Pronouns</span>
<p style="font-size: 14pt;">
	...
</p>
```

You can tell that a single pronoun entry looks like this:
```html
<div class="radio" onclick="toggleRadio(); updatePronouns();">
	<label class="click2">
		<input style="display:none;" type="radio" name="pronoun" value="['she', 'her', 'her', 'she\'s']">
			<img draggable="false" style="vertical-align:middle;" src="assets/misc/radio_false.png" class="radioicon">
				She / Her
	</label>
</div>
```

You basically want to copy everything down another module, but replace `She / Her` with the pronouns of your choice. If I were trying to add [Ey / Em](https://en.pronouns.page/ey), I would replace `She / Her` with `Ey / Em` and `['she', 'her', 'her', 'she\'s']` with `['ey', 'em', 'eir', 'ey're']`

###### (<a href="#modding-guide">go to top</a>)

### Adding a new name for your birb
The steps are very similar to adding new pronouns, but a standard birb name looks like this:
```html
<div class="radio" onclick="toggleRadio(); updatePronouns();">
	<label class="click2">
		<input style="display:none;" type="radio" name="birbname" value="Joelle">
			<img draggable="false" style="vertical-align:middle;" src="assets/misc/radio_false.png" class="radioicon">
				Joelle
	</label>
</div>
```

Additionally, you need to add a banner image for the top of the menu screen. The banners can be found in `assets/misc/banner_`birb name in lowercase`.png`

###### (<a href="#modding-guide">go to top</a>)

### Adding a quote
Adding a quote to the list is the easiest example of modding. First, open `quotes.js`. You should see a small guide on quote-writing at the top.
```js
//Quotes that Joel can sprout
//Don't add or remove variables in here.
//Each quote must start and end with " for the program to recognize it properly. These quotes will not show up in-app.
//If you want a quotes with " showing up in app, you must put a backslash before the " that you want to show up.

//EXAMPLE:
// "This is my quote: \"hello\" I once said" <-- Valid :)
// "This is my quote: "hello" I once said" <-- Invalid :(
// This is my quote: "hello" I once said <-- Invalid :(
// This is my quote: \"hello\" I once said <-- Invalid :(

//You can reference pronouns and user-defined name in the program. If the pronouns are "he" and "him", you can trigger "he" with `pronouns[0]` and "him" with `pronouns[1]`. You can also reference the possesive with pronouns[2].
//The name can be referenced with `joelName`.
```

You can add a quote to the list as a basic string and will show up in the app. You may also notice a little list of newgrounds quotes underneath the `quotes` variable: these quotes only get added to the list if the user is seeing the page from `newgrounds.com`. 

Adding a quote to the list is as easy as adding a string to an array.
```js
var quotes = [
	"This is Joel the birb",
	"my new quote, this should show up in the app lol",
	"How have you made someone smile today?"
];
```
You can disable quotes by commenting them out. 

###### (<a href="#modding-guide">go to top</a>)

#### Referencing the user-selected name / pronouns
You can also reference the user-selected birb name and pronouns in your quote. Simply replace `Joel` with `<dynamic var='joelName'>Joel</dynamic>` and the app will autofill the user's selected name. 
```html
<dynamic (The tag name)
 var='joelName' (what variable to reference)
>
Joel (the default, in case the program doesn't find anything)
</dynamic>
```

In the case of pronouns, it's slightly more complicated. `He/him` pronouns are saved as `["he", "him", "his"]` to also store a posessive version of the pronouns. ("his" as in "his teddy bear", "her toy train", "their favourite movie"). So (depending on the user's selection),
- To reference "he", "her", or "they", you would use `<dynamic var='pronouns[0]'>he</dynamic>`
- To reference "him", "her", or "them", you would use `<dynamic var='pronouns[1]'>him</dynamic>`
- To reference "his", "her" or "their", you would use `<dynamic var='pronouns[2]'>his</dynamic>`

Example:
```js
"Who is <dynamic var='pronouns[0]'>he</dynamic>? That's <dynamic var='joelName'>Joel</dynamic>. I think of <dynamic var='pronouns[1]'>him</dynamic> often; <dynamic var='pronouns[2]'>his</dynamic> quotes brighten up my day."
```

I never added support for capitalization of pronouns, but you can work around it by doing
```html
<dynamic var='(pronouns[0].charAt(0).toUpperCase() + pronouns[0].slice(1))'>He</dynamic>
```

###### (<a href="#modding-guide">go to top</a>)

#### Adding other types of quotes
There are a few other quotes lists in the `quotes.js` file:
- `wakeupquotes`: What Joel says if he falls asleep and you wake him up
- `secretquotes`: Dark side quotes. These all play in order, and are not randomized, similar to the Story feature.
- `escapeattemptquotes`: A quote that pops up on the screen in _**bold and italic text**_ when the user tries to turn off Dark Side mode.
You can add quotes to this list the exact same way you would with the normal `quotes` variable.

###### (<a href="#modding-guide">go to top</a>)

### Adding custom music / sfx
Coming soon

###### (<a href="#modding-guide">go to top</a>)

### Change the background color
This is an example of easier modding. First, launch the app. Since you're in the browser development build, go to the menu and click on `DEBUG MENU`. 

Open User Experience, then mess around with the Background Color button until you find a good color that works with your birb's color palette. You may have to close the menu a few times to experiment with a good color. Then, copy that color's hex code to your clipboard (a hex code looks like `#123fff`). 
<img src="https://user-images.githubusercontent.com/67883592/152711339-0278d0b4-fa1b-4331-845e-7aa11938fcaf.png">

Open `style.css` in your code editor. Scroll down until you find the following piece of code:

```css
  .page {
	   background-color: #1b1b1b;
	   width: 100vw;
	   min-height: 100vh;
	   position: absolute;
	   top:0;
	   left:0;
	   overflow: hidden;
  }
```

Replace `#1b1b1b` with your hex code. You've sucesfully changed the default background color. 

###### (<a href="#modding-guide">go to top</a>)
