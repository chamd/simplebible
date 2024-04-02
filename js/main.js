const NAV = document.getElementById("nav");
const SHOW_NAV = document.getElementById("showNav");
const CONTENT = document.getElementById("content");
const NAV_CONTENT = document.getElementById("navContent");

let nowBible = {
    book: "창",
    chapter: "1"
}
let settings = {
    "1": "normal"
};
let contentData;
let isNavShow = false;
let isNavOpen = false;
let isNavTouch = false;
let isTouchMove = false;
let startTouchPosY;
let nowTouchPosY;
let startNavPos = NAV.getBoundingClientRect().top;
let nowNavPos;
let nowNavMode = "main"; // search, setting, main

function setBible() {
    for (let i = 1; i <= Object.keys(bibles[nowBible.book][nowBible.chapter]).length; i++) {
        if (i == 1) {
            contentData = `<table style="word-break: ${settings["1"]}">`;
        }
        contentData += `<tr><td><b>${i}</b></td><td>${bibles[nowBible.book][nowBible.chapter][i]}</td></tr>`;
        if (i == Object.keys(bibles[nowBible.book][nowBible.chapter]).length) {
            contentData += "</table><br><br><br><br><br>";
        }
    }
    CONTENT.innerHTML = contentData;
    document.getElementById("navTitle").innerHTML = `${booksLN[booksSN.indexOf(nowBible.book)]} ${nowBible.chapter}장`
}
setBible();

SHOW_NAV.addEventListener("touchstart", e => {
    isNavTouch = true;
    CONTENT.style.overflowY = "hidden";
    startTouchPosY = e.touches[0].clientY;
});

SHOW_NAV.addEventListener("touchend", e => {
    isNavTouch = false;
    CONTENT.style.overflowY = "auto";
    if (isTouchMove && isNavOpen && isNavShow) {
        setAnimation("moveNav", "block", "20%");
    } else if (isTouchMove && isNavShow) {
        setAnimation("moveNav", "none", "calc(100% - 95px)");
    }
    isTouchMove = false;
});

SHOW_NAV.addEventListener("touchmove", e => {
    if (isNavTouch && isNavShow) {
        isTouchMove = true;
        nowTouchPosY = e.touches[0].clientY;
        nowNavPos = NAV.getBoundingClientRect().top;        
        NAV.style.top = `clamp(0%, ${startNavPos - (startTouchPosY - nowTouchPosY)}px, calc(100% - 80px))`;     
        if (document.body.clientHeight - nowNavPos >= 200 && !isNavOpen) {
            nowNavMode = "main";
            setAnimation("setNav", "100%", "100%", "0", "0");
            isNavOpen = !isNavOpen;
        } else if (document.body.clientHeight - nowNavPos < 200 && isNavOpen) {
            setAnimation("setNav", "calc(100% - 30px)", "80px", "15px", "35px");
            isNavOpen = !isNavOpen;
        }
    }
});

function openNav(mode) {
    if (!isNavOpen) {
        nowNavMode = mode;
        setAnimation("setNav", "100%", "100%", "0", "0");
        setAnimation("moveNav", "block", "20%");
        isNavOpen = !isNavOpen;
    } else {
        navigator.vibrate(10);
        if (nowNavMode != mode) {
            setNavMode(mode);
        }
    }
}

function closeNav() {
    if (isNavOpen) {
        setAnimation("setNav", "calc(100% - 30px)", "80px", "15px", "35px");
        setAnimation("moveNav", "none", "calc(100% - 95px)");
        isNavOpen = !isNavOpen;
    }
}

function setAnimation(ani, width, heigth, left, br) { // width, height => display, top
    if (ani == "setNav") {
        let temp = { width: width, height: heigth, left: left, borderBottomLeftRadius: br, borderBottomRightRadius: br }
        navigator.vibrate(10);
        NAV.animate(temp,
            {
                duration: 300,
                easing: "ease"
            }
        ).onfinish = e => {
            Object.assign(NAV.style, temp);
        }
        if (br == "0") {
            setNavMode();
        } else {
            NAV_CONTENT.innerHTML = '';
        }
    } else if (ani == "moveNav") {
        document.getElementById("back").style.display = width;
        NAV.animate(
            {
                top: heigth
            }, {
                duration: 300,
                easing: "ease",
            }
        ).onfinish = e => {
            NAV.style.top = heigth;
            startNavPos = NAV.getBoundingClientRect().top;
        }
    }
}

function setBook(book) {
    if (nowBible.book != book) {        
        navigator.vibrate(10);
        document.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`).classList.remove('selectedBook');
        nowBible.book = book;
        document.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`).classList.add('selectedBook');
        setBible();
    }
}

function setShowNav() {
    if (!isNavShow && !isNavOpen) {
        setShowAnimation("rotate(0deg)", "rotate(0deg)", "10px", "25px", "80px", "visible", "1", "50px", "calc(100% - 30px)", "15px", "calc(100% - 95px)", true);        
    } else if (!isNavOpen) {
        setShowAnimation("rotate(-30deg)", "rotate(30deg)", "-20px", "15px", "40px", "hidden", "0", "10px", "150px", "calc(50% - 75px)", "calc(100% - 55px)", false);
    } else if (isNavOpen && nowNavMode != "main") {
        navigator.vibrate(10);
        setNavMode("main");
    }
}

function setShowAnimation(barRotR, barRotL, barTop, font, height, visible, opacity, btnwh, width, left, top, bool) {
    navigator.vibrate(10);
    let temp = {};
    document.getElementById("navBarR").style.transform = barRotR;
    document.getElementById("navBarL").style.transform = barRotL;
    document.getElementById("navBarR").style.top = barTop;
    document.getElementById("navBarL").style.top = barTop;

    document.getElementById("navTitle").style.fontSize = font;
    document.getElementById("navTitle").style.lineHeight = height;

    temp = { visibility: visible, opacity: opacity, width: btnwh, height: btnwh }
    Object.assign(document.getElementById("navSetting").style, temp);
    Object.assign(document.getElementById("navSearch").style, temp);
    temp = { width: width, height: height, left: left, top: top }
    NAV.animate(temp,
        {
            duration: 300,
            easing: "ease"
        }
    ).onfinish = e => {
        Object.assign(NAV.style, temp);
        startNavPos = NAV.getBoundingClientRect().top

        isNavShow = bool;
    }
}

function setSetting(num) {
    navigator.vibrate(10);
    if (settings[num] == "normal") {
        document.querySelector("table").style.wordBreak = "keep-all";
        document.getElementById(`navSetting${num}`).style.background = "rgba(0, 255, 0, 0.7)";
        document.getElementById(`navSetting${num}Ball`).style.left = "32.5px";    
        settings[num] = "keep-all";
    } else {
        document.querySelector("table").style.wordBreak = "normal";
        document.getElementById(`navSetting${num}`).style.background = "rgba(200, 200, 200, 0.7)";
        document.getElementById(`navSetting${num}Ball`).style.left = "2.5px";    
        settings[num] = "normal";
    }
}

function setNavMode(mode = nowNavMode) {
    nowNavMode = mode;
    NAV_CONTENT.innerHTML = navs[mode];

    if (mode == "setting" && settings["1"] == "keep-all") {                
        document.getElementById(`navSetting1`).style.background = "rgba(0, 255, 0, 0.7)";
        document.getElementById(`navSetting1Ball`).style.left = "32.5px";    
    }

    if (mode == "main") {
        document.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`).classList.add('selectedBook');
    }
}