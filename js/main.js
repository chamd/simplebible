const NAV = document.getElementById("nav");
const CONTENT = document.getElementById("content");
const NAVCONTENT = document.getElementById("navContent");

let nowBible = {
    book: "창",
    chapter: "1"
}
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
            contentData = "<table>"
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

NAV.addEventListener("touchstart", e => {
    isNavTouch = true;
    CONTENT.style.overflowY = "hidden";
    startTouchPosY = e.touches[0].clientY;
});

NAV.addEventListener("touchend", e => {
    isNavTouch = false;
    CONTENT.style.overflowY = "auto";
    if (isTouchMove && isNavOpen && isNavShow) {
        setAnimation("moveNav", "block", "20%");
    } else if (isTouchMove && isNavShow) {
        setAnimation("moveNav", "none", "calc(100% - 95px)");
    }
    isTouchMove = false;
});

NAV.addEventListener("touchmove", e => {
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
            nowNavMode = mode;
            NAVCONTENT.innerHTML = navs[mode];
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
            if (nowNavMode == "main") {
                NAVCONTENT.innerHTML = navs.main
            } else if (nowNavMode == "setting") {
                NAVCONTENT.innerHTML = navs.setting;
            }
        } else {
            NAVCONTENT.innerHTML = '';
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

function setBook() {
    nowBible.book = document.getElementById("biblebk").value;
    nowBible.chapter = document.getElementById("biblech").value;
    setBible();
}

function setShowNav() {
    if (!isNavShow && !isNavOpen) {
        setShowAnimation("rotate(0deg)", "rotate(0deg)", "10px", "25px", "80px", "visible", "1", "50px", "calc(100% - 30px)", "15px", "calc(100% - 95px)", true);        
    } else if (!isNavOpen) {
        setShowAnimation("rotate(-30deg)", "rotate(30deg)", "-20px", "15px", "40px", "hidden", "0", "10px", "150px", "calc(50% - 75px)", "calc(100% - 55px)", false);
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

function setWordbreak(index) {
    if (index == 1) {
        for (let i = 0; i < document.querySelectorAll("td").length; i++) {
            const e = document.querySelectorAll("td")[i];
            e.style.wordBreak = "keep-all";
        }
    } else {
        for (let i = 0; i < document.querySelectorAll("td").length; i++) {
            const e = document.querySelectorAll("td")[i];
            e.style.wordBreak = "normal";
        }
    }
}