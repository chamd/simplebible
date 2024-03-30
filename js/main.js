const NAV = document.getElementById("nav");
const CONTENT = document.getElementById("content");
const NAVCONTENT = document.getElementById("navContent");

let nowBible = {
    book: "신",
    chapter: "6"
}
let contentData;
let isNavOpen = false;
let isNavTouch = false;
let isTouchMove = false;
let startTouchPosY;
let nowTouchPosY;
let startNavPos = NAV.getBoundingClientRect().top;
let nowNavPos;

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
    document.getElementById("navNowBible").innerHTML = `${booksLN[booksSN.indexOf(nowBible.book)]} ${nowBible.chapter}장`
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
    if (isTouchMove && isNavOpen) {
        setAnimation("moveNav", "block", "20%");
    } else if (isTouchMove) {
        setAnimation("moveNav", "none", "calc(100% - 95px)");
    }
    isTouchMove = false;
});

NAV.addEventListener("touchmove", e => {
    if (isNavTouch) {
        isTouchMove = true;
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
        if (br == "0") {
            NAVCONTENT.innerHTML = `
            <input id=\"biblebk\"><br>
            <input id=\"biblech\"><br>
            <button onclick=\"setBook();\">GO</button>
            `;
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

function setBook() {
    nowBible.book = document.getElementById("biblebk").value;
    nowBible.chapter = document.getElementById("biblech").value;
    setBible();
}