let startSwipePos = [0, 0];

CONTENT.addEventListener("touchstart", e => {
    startSwipePos[0] = e.touches[0].clientX;
    startSwipePos[1] = e.touches[0].clientY;
});

CONTENT.addEventListener("touchend", e => {
    swipeHandle([e.changedTouches[0].clientX, e.changedTouches[0].clientY]);
});

function swipeHandle(endSwipePos) {
    let absSwipePos = [Math.abs(startSwipePos[0] - endSwipePos[0]), Math.abs(startSwipePos[1] - endSwipePos[1])]
    if (absSwipePos[0] < 50 || absSwipePos[0] < absSwipePos[1]) return;
    
    let pageArrow;
    if (startSwipePos[0] > endSwipePos[0] && nowBible.chapter != Object.keys(bibles[nowBible.book]).length) {
        pageArrow = "right";
        nowBible.chapter ++;
    } else if (startSwipePos[0] > endSwipePos[0] && nowBible.chapter == Object.keys(bibles[nowBible.book]).length) {
        noMoreChapter("Plus")
        setTimeout(() => {
            vibrateInAndroid(5);
            setTimeout(() => {
                vibrateInAndroid(2);
            }, 120);
        }, 120);  
        return;
    }
    
    if (startSwipePos[0] < endSwipePos[0] && nowBible.chapter != 1) {
        pageArrow = "left";
        nowBible.chapter --;
    } else if (startSwipePos[0] < endSwipePos[0] && nowBible.chapter == 1) {
        noMoreChapter("Minus");
        setTimeout(() => {
            vibrateInAndroid(5);
            setTimeout(() => {
                vibrateInAndroid(2);
            }, 120);
        }, 120);    
        return;
    }

    let pageAnimation = document.createElement("div");
    pageAnimation.classList.add("pageAnimation");
    document.getElementById("pageAnimation").appendChild(pageAnimation);    
    pageAnimation.style[pageArrow] = "-100vw";

    for (let i = 1; i <= Object.keys(bibles[nowBible.book][nowBible.chapter]).length; i++) {
        if (i == 1) {
            contentData = `<table style="word-break: ${settings["1"]}">`;
        }
        if (bibles[nowBible.book][nowBible.chapter][i].match(/\|(\w), (\d+)\|/)) {
            
        }
        contentData += `<tr><td><b>${i}</b></td><td>${bibles[nowBible.book][nowBible.chapter][i]}</td></tr>`;
        if (i == Object.keys(bibles[nowBible.book][nowBible.chapter]).length) {
            contentData += "</table><br><br><br><br><br>";
        }
    }
    pageAnimation.innerHTML = contentData;

    setTimeout(() => {
        pageAnimation.style[pageArrow] = "0px";
        setTimeout(() => {
            setBible();
            CONTENT.scrollTop = 0;
            pageAnimation.remove();
        }, 300);    
    }, 5);
}

function noMoreChapter(mode) {
    NAV.classList.add(`no${mode}Chapter`);
    setTimeout(() => {
        NAV.classList.remove(`no${mode}Chapter`);
    }, 300);
}