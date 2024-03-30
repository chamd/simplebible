const NAV = document.getElementById("nav");
const CONTENT = document.getElementById("content");

let nowBible = {
    book: "창",
    chapter: "1"
}
let isNavOpen = false;
let isNavTouch = false;
let startTouchPosY;
let nowTouchPosY;
let startNavPos = NAV.getBoundingClientRect().top;
let nowNavPos;


let contentData = "<table>";
for (let i = 1; i <= Object.keys(bibles[nowBible.book][nowBible.chapter]).length; i++) {
    contentData += `<tr><td><b>${i}</b></td><td>${bibles[nowBible.book][nowBible.chapter][i]}</td></tr>`;
}
contentData += "</table>";

CONTENT.innerHTML = contentData;

NAV.addEventListener("touchstart", e => {
    isNavTouch = true;
    CONTENT.style.overflowY = "hidden";
    startTouchPosY = e.touches[0].clientY;
});

NAV.addEventListener("touchend", e => {
    isNavTouch = false;
    CONTENT.style.overflowY = "auto";
    if (isNavOpen) {
        setAnimation("moveNav", "block", "20%");
    } else {
        setAnimation("moveNav", "none", "calc(100% - 95px)");
    }
});

NAV.addEventListener("touchmove", e => {
    if (isNavTouch) {
        nowTouchPosY = e.touches[0].clientY;
        nowNavPos = NAV.getBoundingClientRect().top;        
        NAV.style.top = `clamp(0%, ${startNavPos - (startTouchPosY - nowTouchPosY)}px, calc(100% - 80px))`;     
        if (document.body.clientHeight - nowNavPos >= 200 && !isNavOpen) {
            setAnimation("setNav", "100%", "100%", "0", "0");
            isNavOpen = !isNavOpen;
        } else if (document.body.clientHeight - nowNavPos < 200 && isNavOpen) {
            setAnimation("setNav", "calc(100% - 30px)", "80px", "15px", "35px");
            isNavOpen = !isNavOpen;
        }
    }
});

function openNav() {
    if (!isNavOpen) {
        setAnimation("setNav", "100%", "100%", "0", "0");
        setAnimation("moveNav", "block", "20%");
        isNavOpen = !isNavOpen;
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
        navigator.vibrate(10);
        NAV.animate(
            {
                width: width,
                height: heigth,
                left: left,
                borderBottomLeftRadius: br,
                borderBottomRightRadius: br
            }, {
                duration: 300,
                easing: "ease",
                fill: "forwards"
            }
        );
    } else if (ani == "moveNav") {
        document.getElementById("back").style.display = width;
        NAV.animate(
            {
                top: heigth
            }, {
                duration: 300,
                easing: "ease",
            }
        );
        setTimeout(() => {
            NAV.style.top = heigth;
            startNavPos = NAV.getBoundingClientRect().top;
        }, 290);
    }
}

function openSetting() {
    if (!isNavOpen) {
        openNav();
    } else {
        navigator.vibrate(10);
    }
}

function openSearch() {
    if (!isNavOpen) {
        openNav();
    } else {
        navigator.vibrate(10);
    }
}