// Joel Image set.
// Use double-slash to comment lines or remove things from your code.

// DON'T FORGET TO EDIT THE PRELOAD AT THE BOTTOM OF THIS DOCUMENT!
// Copy the format for animations. Don't forget to make a loopable version for each animation and a version with all frames in order!

//Static images:
var staticsets = [happy, general, bowtie, flower, posessed];
var happy = "assets/images/Joel_Happi_TS1.png";
var general = "assets/Joel_Original_TSA1.png";
var bowtie = "assets/images/Joel_Bowtie_TS1.png";
var flower = "assets/images/Joel_Flower_TS1.png";
var posessed = "assets/images/Joel_Posessed_TS1.png";

//Animation sets:
var worm = [
	"assets/animations/worm/Joel_Worm_TA2.png",
	"assets/animations/worm/Joel_Worm_TA3.png",
	"assets/animations/worm/Joel_Worm_TA4.png",
	"assets/animations/worm/Joel_Worm_TA5.png"
];

var cooldude = [
	"assets/Joel_Original_TSA1.png",
	"assets/animations/coolDude/Joel_CoolDude_TA2.png",
	"assets/animations/coolDude/Joel_CoolDude_TA3.png",
	"assets/animations/coolDude/Joel_CoolDude_TA4.png",
	"assets/animations/coolDude/Joel_CoolDude_TA5.png"
];

var party = [
	"assets/animations/party/Joel_Party_TA1.png",
	"assets/animations/party/Joel_Party_TA2.png",
	"assets/animations/party/Joel_Party_TA3.png",
	"assets/animations/party/Joel_Party_TA4.png"
];

var party_loop = [
	"assets/animations/party/Joel_Party_TA3.png",
	"assets/animations/party/Joel_Party_TA4.png",
	"assets/animations/party/Joel_Party_TA3.png",
	"assets/animations/party/Joel_Party_TA2.png",
	"assets/animations/party/Joel_Party_TA1.png",
	"assets/animations/party/Joel_Party_TA2.png",
	
];

var singing = [
	"assets/animations/tweet/Joel_Tweet_TA1.png",
	"assets/animations/tweet/Joel_Tweet_TA2.png",
	"assets/animations/tweet/Joel_Tweet_TA3.png",
	"assets/animations/tweet/Joel_Tweet_TA4.png"
];

var sleeping = [
	"assets/animations/sleep/Joel_Sleep_TA1.png",
	"assets/animations/sleep/Joel_Sleep_TA2.png",
	"assets/animations/sleep/Joel_Sleep_TA3.png",
	"assets/animations/sleep/Joel_Sleep_TA4.png"
];

var sleeping_loop = [
	"assets/animations/sleep/Joel_Sleep_TA1.png",
	"assets/animations/sleep/Joel_Sleep_TA2.png",
	"assets/animations/sleep/Joel_Sleep_TA3.png",
	"assets/animations/sleep/Joel_Sleep_TA4.png",
	"assets/animations/sleep/Joel_Sleep_TA3.png",
	"assets/animations/sleep/Joel_Sleep_TA2.png"
];

var animationsets = [
	{name: "worm", set: worm}, 
	{name: "cooldude", set: cooldude},
	{name: "party", set: party},
	{name: "party_loop", set: party_loop}, 
	{name: "singing", set: singing}, 
	{name: "sleeping", set: sleeping}, 
	{name: "sleeping_loop", set: sleeping_loop}
];

//MISC IMAGE DEFINITIONS - do not edit
var menuimgs = [
	"assets/misc/joel_menu_tm1.png",
	"assets/misc/joel_menuclose_tm2.png"
];

var toggleimgs = [
	"assets/misc/joel_false_disabled.png",
	"assets/misc/joel_false.png",
	"assets/misc/joel_true_disabled.png",
	"assets/misc/joel_true.png"
];

var extrapreloads = [
	//Add any extra images to preload that don't instantly load

	//Toggles
	"assets/misc/secretreveal/joel_toggle_0.png",
	"assets/misc/secretreveal/joel_toggle_1.png",
	"assets/misc/secretreveal/joel_toggle_2.png",
	"assets/misc/secretreveal/joel_toggle_3.png",
	"assets/misc/secretreveal/joel_toggle_4.png",
	"assets/misc/secretreveal/joel_toggle_5.png",

	//Dev profiles
	"assets/misc/devprofiles/ciminin.png",
	"assets/misc/devprofiles/Raid337.png",
	"assets/misc/devprofiles/JosieIsNotARat.png",
	"assets/misc/devprofiles/ReBrainerTV.png",
	"assets/misc/devprofiles/ciminin_alt.png",
	"assets/misc/devprofiles/Josie_alt.png",

	//Banners
	"assets/misc/banner_joel.png",
	"assets/misc/banner_joelle.png",
	"assets/misc/banner_jo.png",

	//Branding
	"assets/misc/feather_base.png",
	"assets/misc/feather_logo.png",
	"assets/misc/icon_v3.png",
	"assets/misc/loading.gif",
];

// Preload: Include the names of each of your image sets here. Preloads are for the browser version of Joel.
var preload_sets = [ toggleimgs, menuimgs, worm, party, party_loop, singing, sleeping, sleeping_loop, cooldude, extrapreloads ];
var preload_static = [ happy, general, bowtie, flower, posessed ];