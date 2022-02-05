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

//Default quotes
var quotes = [
	"This is <dynamic var='joelName'>Joel</dynamic> the Birb.",
	"Have a great day!",
	"You are unique, and that's a good thing :)",
	"<dynamic var='joelName'>Joel</dynamic> is here to brighten your day.",
	"[insert bird pun]",
	"Want a worm? They're really tasty...",
	"If you click me enough times, I'll sing for you!",
	"Relax. Take a deep breath.",
	"*inspirational vibing*",
	"Homework is temporary. Glory is forever.",
	"Maybe you're sad, but at the end of the day there's always another worm in the ground.",
	"Hidden beauty is everywhere.",
	"Here comes the sun, doodoodoodoo",
	"<dynamic var='joelName'>Joel</dynamic> and <dynamic var='pronouns[2]'>his</dynamic> creators are proud of you!",
	"tweet tweet. ",
	"Josie says hi.",
	"Rockin' robin, tweet tweet!",
	"My friend said they know all the best bird puns, but I told them toucan play at that game.",
	"What are you doing keeping a sick bird in your house? Don’t you know that’s ill eagle?",
	"Telling bird puns is usually harmless, but when you start mocking birds, things can quickly get unpheasant and hawkward.",
	"Keep clicking! Isn't it so egg-citing?",
	"Orange juice is yummy. Unless you're allergic to citrus. ",
	"Have you had anything to eat today?",
	"Stay in school!",
	"Don't do drugs!",
	"Eat your veggies!",
	"Stay hydrated!",
	"Did you know that chickens and ostriches are closely related to a T-Rex?",
	"*breaks the 4th wall*",
	"What's a goose?",
	"Pizza exists!",
	"Smile!!! You're doing great!",
	//"Josie honestly doesn't know if any of these quotes will actually be added. ",
	"I do my lil' dancy dance ~",
	"Go take a nap! Naps are fun.",
	"Seeeelllfff caaaaarreeeee!!!!!!",
	"General reminder that your feelings are valid.",
	"Feeling anxious? Inhale for 4 seconds, Hold it for 7, Exhale for 8. Repeat.",
	"Hey, hey, you got this. <3",
	"psssttt! you're doing great!",
	"<dynamic var='joelName'>Joel</dynamic> believes in you!",
	"Accept yourself!",
	"Rebb says hi",
	"Thank you so much for being here.",
	"What are you grateful for today?",
	"There's always time to breathe.",
	"Be sure to cover your month-old french fries when the health inspector comes around.",
	"Life needs balance. The harder you work, the harder you must play.",
	"New friends can be found in the most unlikely of places.",
	"Just in case no one has told you today, you are appreciated <3",
	"Look how you've grown! I'm proud of you :))",
	"I know you tried your best. You're doing great :)",
	"Don't be afraid to ask for help sometimes.",
	"Most people would be happy to lend a wing. Reach out!",
	"OooOo, look at youuuu!!! You look so fancy! :D",
	":O This calls for a celebratory dance!",
	"Celebrate the little victories. They mean progress.",
	"I like ur shirt. It's cute. hehe.",
	"Feeling anxious? Try counting how many things in the room are green",
	"A mistake is an opportunity!",
	"How have you made someone smile today?"
];
if(build == "Newgrounds build"){
	quotes.push("Pico funny B)");
	quotes.push("*Distraction dance*");
	quotes.push("This is the greatest plaaaaan!");
	//Newgrounds exclusive quotes: to throw in a jab at the old Newgrounds lore
}

// Wake-up Quotes
var wakeupquotes = [
	"*yawn* Oh, good morning.",
	"Tweet tweet, the sun is rising on another day",
	"That was a great nap.",
	"...uh! I'm awake!",
	"Oh sorry, must've dozed off."
];

//Dark Side quotes
var secretquotes = [
	"Wait a second, how'd you find this quote?",
	"We'll burn those bridges when we get to them.",
	"insert motivational quote my manager scripted me to say",
	"Rebb doesn't quite know what to say...",
	"...erm... cheese",
	"Ulp, I'm feeling kinda full",
	"Josie told me to ask y'all to sub to her youtube channel. @JosieIsNotARat",
	":( subscribe to rebb too pls. @ReBrainerTV",
	"thanks for downloading me.",
	"The Dark Side was not lying when they said they had pie. Yum",
	"Gender is meaningless, birb is forever.",
	"I am your dad",
	"join the beta today and get a free joel bumper sticker! 100% legit, no gimmicks.",
	"Heeeeere's Johnny!",
	"I'm feeling restless...",
	"...I can never get any sleep",
	"..."
];

var escapeattemptquotes = [
	"I said, there's no turning back!",
	"Nope. Sorry. You're stuck.",
	"Don't you have something better to do?",
	"We're impatient...",
	"You can't get out of this",
	"I told you, you can't get out of this.",
	"Not yet.",
	"No.",
	"Why do you keep trying? It's locked.",
	"You brought this upon yourself!",
	"You pressed too many buttons, delved too deep. Now you have awoken something that should not have been disturbed.",
	"NO, with a capital N.",
	"One of these days, you'll get it.",
	"Who do you think you are?",
	"The way is shut.",
	"I'm not relenting.",
	"You're not welcome back that way.",
	"Don't try it!",
	"The only way out is through the tunnel.",
	"You shall not pass!",
	"You cannot pass!",
	"DENIED."//,
	//"To pass the gate, you must answer my riddles three. Which is hard, because I don't have any riddles yet."
];