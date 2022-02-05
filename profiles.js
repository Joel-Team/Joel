var profiles = {};

profiles.ReBrainerTV = {
    "name": "ReBrainerTV",
    "job": "Programmer and Project Planner",
    "quote": "\"ohhhhh caaaaaaanadaaaaa\"",
    "desc" : "Hi! I'm Rebb, Canadian coder and project planner of <dynamic var='joelName' onload='updatePronouns()'>Joel</dynamic>. I love music, tech, video games and hanging out with friends. I play violin and trumpet (weird mix, I know).",
    "discord": "ReBrainerTV#9659",
    "icon": "assets/misc/devprofiles/ReBrainerTV.png",
    "badge": '<svg style="width:24px;height:24px" viewBox="0 0 24 24" ondblclick="alert(\'Psst... Rebb here. Whatever you do, do not agressively spam the SFX toggle. Joel tends to get a little... distraught.\');" title="*double-clicks*"><path fill="currentColor" d="M12.89,3L14.85,3.4L11.11,21L9.15,20.6L12.89,3M19.59,12L16,8.41V5.58L22.42,12L16,18.41V15.58L19.59,12M1.58,12L8,5.58V8.41L4.41,12L8,15.58V18.41L1.58,12Z" /></svg>'
};

profiles.JosieIsNotARat = {
    "name": "JosieIsNotARat",
    "job": "Artist, Creative Director, Storywriter and Marketing Assistant",
    "quote": "\"B)\"",
    "desc" : "<dynamic var='joelName' onload='updatePronouns()'>Joel</dynamic>'s Creative Director, Artist (debatable), Storywriter, and Marketing Assistant. A teenage lover of all things psychology, tech, and gov related. Hawaiian pizza enthusiast. Also, I want to be your friend. Say hi! :D",
    "discord": "JosieIsNotARat#7385",
    "icon": "assets/misc/devprofiles/JosieIsNotARat.png",
    "badge": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M20.71,4.63L19.37,3.29C19,2.9 18.35,2.9 17.96,3.29L9,12.25L11.75,15L20.71,6.04C21.1,5.65 21.1,5 20.71,4.63M7,14A3,3 0 0,0 4,17C4,18.31 2.84,19 2,19C2.92,20.22 4.5,21 6,21A4,4 0 0,0 10,17A3,3 0 0,0 7,14Z" /></svg>',
    "alticon": "assets/misc/devprofiles/Josie_alt.png"
};

profiles.Raid337 = {
    "name": "Raid337",
    "job": "Composer and Musician",
    "quote": "\"Get boomered\"",
    "desc" : "<dynamic var='joelName' onload='updatePronouns()'>Joel</dynamic>'s Music Maker. Guitarist, pianist, ukulele lists, and overall musicianist. Currently in college studying medicine and sweating in minecraft. I also like to make things <_<",
    "discord": "Raid337#0206",
    "badge": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M11,14C12,14 13.05,14.16 14.2,14.44C13.39,15.31 13,16.33 13,17.5C13,18.39 13.25,19.23 13.78,20H3V18C3,16.81 3.91,15.85 5.74,15.12C7.57,14.38 9.33,14 11,14M11,12C9.92,12 9,11.61 8.18,10.83C7.38,10.05 7,9.11 7,8C7,6.92 7.38,6 8.18,5.18C9,4.38 9.92,4 11,4C12.11,4 13.05,4.38 13.83,5.18C14.61,6 15,6.92 15,8C15,9.11 14.61,10.05 13.83,10.83C13.05,11.61 12.11,12 11,12M18.5,10H20L22,10V12H20V17.5A2.5,2.5 0 0,1 17.5,20A2.5,2.5 0 0,1 15,17.5A2.5,2.5 0 0,1 17.5,15C17.86,15 18.19,15.07 18.5,15.21V10Z" /></svg>',
    "icon": "assets/misc/devprofiles/Raid337.png"
};

profiles.ciminin = {
    "name": "ciminin",
    "job": "Creative Reference, Marketing Manager",
    "quote": "\"Hey you! Yeah, you.\"",
    "desc" : "Heyo! I'm ciminin, the marketing manager. I'm an American college student who enjoys learning new things, gaming, and hanging out with the online peeps <3",
    "discord": "ciminin#5834",
    "icon": "assets/misc/devprofiles/ciminin.png",
    "badge": '<svg style="width:24px;height:24px" viewBox="0 0 24 24"><path fill="currentColor" d="M13 3C16.9 3 20 6.1 20 10C20 12.8 18.4 15.2 16 16.3V21H9V18H8C6.9 18 6 17.1 6 16V13H4.5C4.1 13 3.8 12.5 4.1 12.2L6 9.7C6.2 5.9 9.2 3 13 3M13 1C8.4 1 4.6 4.4 4.1 8.9L2.5 11C1.9 11.8 1.9 12.8 2.3 13.6C2.7 14.3 3.3 14.8 4 14.9V16C4 17.9 5.3 19.4 7 19.9V23H18V17.5C20.5 15.8 22 13.1 22 10C22 5 18 1 13 1M14 14H12V13H14V14M15.6 9.5C15.3 9.9 15 10.3 14.5 10.6V12H11.5V10.6C10.1 9.8 9.6 7.9 10.4 6.5S13.1 4.6 14.5 5.4 16.4 8.1 15.6 9.5Z" /></svg>',
    "alticon": "assets/misc/devprofiles/ciminin_alt.png"
};

function newDev(dname){
    var data = profiles[dname];
    document.getElementById("creatorName").innerHTML = data.name + "&nbsp;" + data.badge;
    document.getElementById("creatorJob").innerHTML = data.job;
    document.getElementById("creatorQuote").innerHTML = data.quote;
    document.getElementById("creatorDesc").innerHTML = data.desc;
    document.getElementById("creatorDiscord").innerHTML = "Discord tag: " + data.discord;
    updatePronouns();
}