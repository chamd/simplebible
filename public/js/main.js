const NAV = document.getElementById("nav");
const SHOW_NAV = document.getElementById("showNav");
const CONTENT = document.getElementById("content");
const NAV_CONTENT = document.getElementById("navContent");

let nowBible = {
	book: "창",
	chapter: 1,
	verse: 1,
};
let settings = {
	1: "normal",
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
let nowNavMode = "Main"; // Search, Setting, Main
let selectedTitle = "none"; // Book, Chapter, none
let touchTime = [0, 0, 0];
let touchPos = [0, 0, 0];
let dialBible = {
	chapter: 1,
	verse: 1,
};

function setNavContent(content = false) {
	document.getElementById("navContentMain").style.display = "none";
	document.getElementById("navContentMainChapter").style.display = "none";
	document.getElementById("navContentSetting").style.display = "none";
	document.getElementById("navContentSearch").style.display = "none";

	console.log(content);
	
	if (content) {
		document.getElementById(`navContent${content}`).style.display = "block";
	}
}

function setBible() {
	for (
		let i = 1;
		i <= Object.keys(bibles[nowBible.book][nowBible.chapter]).length;
		i++
	) {
		if (i == 1) {
			contentData = `<table style="word-break: ${settings["1"]}">`;
		}
		if (bibles[nowBible.book][nowBible.chapter][i].match(/\|(\w), (\d+)\|/)) {
		}
		contentData += `<tr><td><b>${i}</b></td><td>${
			bibles[nowBible.book][nowBible.chapter][i]
		}</td></tr>`;
		if (i == Object.keys(bibles[nowBible.book][nowBible.chapter]).length) {
			contentData += "</table><br><br><br><br><br>";
		}
	}
	CONTENT.innerHTML = contentData;
	document.getElementById("selectedTitleBook").innerHTML = `${
		booksLN[booksSN.indexOf(nowBible.book)]
	}`;
	document.getElementById(
		"selectedTitleChapter"
	).innerHTML = `${nowBible.chapter}장`;
}
setBible();

SHOW_NAV.addEventListener("touchstart", (e) => {
	isNavTouch = true;
	// CONTENT.style.overflowY = "hidden";
	startTouchPosY = e.touches[0].clientY;
	if (isNavShow) {
		touchTime[1] = new Date().getTime();
		touchPos[1] = NAV.getBoundingClientRect().top;
	}
});

SHOW_NAV.addEventListener("touchend", (e) => {
	isNavTouch = false;
	// CONTENT.style.overflowY = "auto";
	if (isTouchMove && isNavOpen && isNavShow) {
		touchTime[2] = new Date().getTime();
		touchTime[0] = touchTime[2] - touchTime[1];
		touchPos[2] = NAV.getBoundingClientRect().top;
		touchPos[0] = touchPos[2] - touchPos[1];
		if (touchPos[0] > 100 && touchTime[0] < 200) {
			closeNav();
		} else {
			setAnimation("moveNav", "block", "20%");
		}
	} else if (isTouchMove && isNavShow) {
		setAnimation("moveNav", "none", "calc(100% - 95px)");
	}
	isTouchMove = false;
});

SHOW_NAV.addEventListener("touchmove", (e) => {
	if (isNavTouch && isNavShow) {
		isTouchMove = true;
		nowTouchPosY = e.touches[0].clientY;
		nowNavPos = NAV.getBoundingClientRect().top;
		NAV.style.top = `clamp(0%, ${
			startNavPos - (startTouchPosY - nowTouchPosY)
		}px, calc(100% - 80px))`;
		NAV.style.top = `clamp(0%, ${
			startNavPos - (startTouchPosY - nowTouchPosY)
		}px, calc(100% - 80px))`;
		if (document.body.clientHeight - nowNavPos >= 200 && !isNavOpen) {
			nowNavMode = "Main";
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
		if (nowNavMode != mode) {
			vibrateInAndroid(5);
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

function setAnimation(ani, width, heigth, left, br) {
	// width, height => display, top
	if (ani == "setNav") {
		let temp = {
			width: width,
			height: heigth,
			left: left,
			borderBottomLeftRadius: br,
			borderBottomRightRadius: br,
		};
		vibrateInAndroid(5);
		NAV.animate(temp, {
			duration: 300,
			easing: "ease",
		}).onfinish = (e) => {
			Object.assign(NAV.style, temp);
		};
		if (br == "0") {
			setNavMode();
		} else {
			setNavContent();
			document
				.getElementById("selectedTitleBook")
				.classList.remove("selectedTitle");
			document
				.getElementById("selectedTitleChapter")
				.classList.remove("selectedTitle");
			selectedTitle = "none";
		}
	} else if (ani == "moveNav") {
		document.getElementById("back").style.display = width;
		NAV.animate(
			{
				top: heigth,
			},
			{
				duration: 300,
				easing: "ease",
			}
		).onfinish = (e) => {
			NAV.style.top = heigth;
			startNavPos = NAV.getBoundingClientRect().top;
		};
	}
}

function setBook(book) {
	if (nowBible.book != book) {
		vibrateInAndroid(5);
		nowBible.chapter = 1;
		nowBible.verse = 1;
		dialBible.chapter = 1;
		dialBible.verse = 1;
		document
			.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`)
			.classList.remove("selectedBook");
		nowBible.book = book;
		document
			.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`)
			.classList.add("selectedBook");
		setBible();
	}
}

function setShowNav() {
	// alert(`${isNavShow} ${isNavOpen}`);

	if (!isNavShow && !isNavOpen) {
		setShowAnimation(
			"rotate(0deg)",
			"rotate(0deg)",
			"10px",
			"25px",
			"80px",
			"visible",
			"1",
			"50px",
			"calc(100% - 30px)",
			"15px",
			"calc(100% - 95px)",
			true
		);
	} else if (!isNavOpen) {
		setShowAnimation(
			"rotate(-30deg)",
			"rotate(30deg)",
			"-20px",
			"15px",
			"40px",
			"hidden",
			"0",
			"10px",
			"150px",
			"calc(50% - 75px)",
			"calc(100% - 55px)",
			false
		);
		// } else if (isNavOpen && nowNavMode != "main") {
		//     vibrateInAndroid(5);
		//     setNavMode("main");
	}
}

function setShowAnimation(
	barRotR,
	barRotL,
	barTop,
	font,
	height,
	visible,
	opacity,
	btnwh,
	width,
	left,
	top,
	bool
) {
	vibrateInAndroid(5);
	let temp = {};
	document.getElementById("navBarR").style.transform = barRotR;
	document.getElementById("navBarL").style.transform = barRotL;
	document.getElementById("navBarR").style.top = barTop;
	document.getElementById("navBarL").style.top = barTop;

	// document.getElementById("navTitle").style.fontSize = font;
	// document.getElementById("navTitle").style.lineHeight = height;

	document.getElementById("selectedTitleBook").style.fontSize = font;
	document.getElementById("selectedTitleChapter").style.fontSize = font;
	document.getElementById("selectedTitleBook").style.lineHeight = height;
	document.getElementById("selectedTitleChapter").style.lineHeight = height;

	temp = { visibility: visible, opacity: opacity, width: btnwh, height: btnwh };
	Object.assign(document.getElementById("navSetting").style, temp);
	Object.assign(document.getElementById("navSearch").style, temp);
	temp = { width: width, height: height, left: left, top: top };
	NAV.animate(temp, {
		duration: 300,
		easing: "ease",
	}).onfinish = (e) => {
		Object.assign(NAV.style, temp);
		startNavPos = NAV.getBoundingClientRect().top;

		isNavShow = bool;
	};
}

function setSetting(num) {
	vibrateInAndroid(5);
	if (settings[num] == "normal") {
		document.querySelector("table").style.wordBreak = "keep-all";
		document.getElementById("searchContent").style.wordBreak = "keep-all";
		document.getElementById(`navSetting${num}`).style.background =
		"rgba(0, 255, 0, 0.7)";
		document.getElementById(`navSetting${num}Ball`).style.left = "32.5px";
		settings[num] = "keep-all";
	} else {
		document.querySelector("table").style.wordBreak = "normal";
		document.getElementById("searchContent").style.wordBreak = "normal";
		document.getElementById(`navSetting${num}`).style.background =
			"rgba(200, 200, 200, 0.7)";
		document.getElementById(`navSetting${num}Ball`).style.left = "2.5px";
		settings[num] = "normal";
	}
}

function setNavMode(mode = nowNavMode) {
	nowNavMode = mode;
	// NAV_CONTENT.innerHTML = navs[mode];
	setNavContent(mode);
	
	if (mode == "Setting" && settings["1"] == "keep-all") {
		document.getElementById(`navSetting1`).style.background =
			"rgba(0, 255, 0, 0.7)";
		document.getElementById(`navSetting1Ball`).style.left = "32.5px";
	}

	if (mode == "Main") {
		let mainContent = ``;
		for (let i = 0; i < 39; i++) {
			if (i == 0) {
				mainContent += `<div class="navMainBookOldWrap">`;
			}
			mainContent += `<div id="navMainBook${i}" class="navMainBookOld" onclick="setBook('${booksSN[i]}');">${booksLN[i]}</div>`;
			if (i == 38) {
				mainContent += `</div>`;
			}
		}
		for (let i = 39; i < booksLN.length; i++) {
			if (i == 39) {
				mainContent += `<div class="navMainBookNewWrap">`;
			}
			mainContent += `<div id="navMainBook${i}" class="navMainBookNew" onclick="setBook('${booksSN[i]}');">${booksLN[i]}</div>`;
			if (i == booksLN.length - 1) {
				mainContent += `</div>`;
			}
		}
		document.getElementById("navContentMain").innerHTML = mainContent;
		document
			.getElementById(`navMainBook${booksSN.indexOf(nowBible.book)}`)
			.classList.add("selectedBook");
		document.getElementById("selectedTitleBook").classList.add("selectedTitle");
		if (selectedTitle == "Chapter") {
			// console.log(dialBible);
			let chapterDialContent = `<div id="chapterDialNumber0" class="chapterDialNumbers"></div>`;
			for (let i = 1; i <= Object.keys(bibles[nowBible.book]).length; i++) {
				chapterDialContent += `<div id="chapterDialNumber${i}" class="chapterDialNumbers">${i}</div>`;
			}
			chapterDialContent += `<div id="chapterDialNumber${
				Object.keys(bibles[nowBible.book]).length
			}" class="chapterDialNumbers"></div>`;
			// NAV_CONTENT.innerHTML = navs.mainChapter;
			setNavContent("MainChapter");
			
			let chapterDial = document.getElementById("chapterDial");
			chapterDial.innerHTML = chapterDialContent;
			let nowChapterNum = 0;
			let chapterDialNumberI = (num) => {
				return document.getElementById(`chapterDialNumber${num + 1}`);
			};
			
			chapterDialNumberI(nowBible.chapter - 2).scrollIntoView();
			chapterDialNumberI(nowBible.chapter - 1).style.color = "#fcfcfc";
			chapterDialNumberI(nowBible.chapter - 1).style.fontFamily = "nanumSQb";
			console.log(nowBible.verse);
			// dialBible.verse = 1;

			chapterDial.addEventListener("scroll", (e) => {
				if (
					nowChapterNum !=
					Math.round(
						(chapterDial.scrollTop / (chapterDial.scrollHeight - 300)) *
							(Object.keys(bibles[nowBible.book]).length - 1)
					)
				) {
					chapterDialNumberI(nowChapterNum).style.color = "#c0c0c0";
					chapterDialNumberI(nowChapterNum).style.fontFamily = "nanumSQ";
					nowChapterNum = Math.round(
						(chapterDial.scrollTop / (chapterDial.scrollHeight - 300)) *
							(Object.keys(bibles[nowBible.book]).length - 1)
					);
					if (nowChapterNum >= Object.keys(bibles[nowBible.book]).length) {
						nowChapterNum = Object.keys(bibles[nowBible.book]).length - 1;
					} else if (nowChapterNum <= 0) {
						nowChapterNum = 0;
					}
					chapterDialNumberI(nowChapterNum).style.color = "#fcfcfc";
					chapterDialNumberI(nowChapterNum).style.fontFamily = "nanumSQb";
					vibrateInAndroid(2);

					dialBible.chapter = nowChapterNum + 1;
					setVerseDial(verseDial);
					nowVerseNum = 1;
				}
			});

			let verseDial = document.getElementById("verseDial");
			setVerseDial(verseDial);

			let nowVerseNum = 0;
			let verseDialNumberI = (nowVerseNum) => {
				return document.getElementById(`verseDialNumber${nowVerseNum + 1}`);
			};

			// document.getElementById(`verseDialNumber${nowBible.verse}`).scrollIntoView();
			verseDialNumberI(nowBible.verse - 2).scrollIntoView();

			verseDial.addEventListener("scroll", (e) => {
				if (
					nowVerseNum !=
					Math.round(
						(verseDial.scrollTop / (verseDial.scrollHeight - 300)) *
							(Object.keys(bibles[nowBible.book][dialBible.chapter]).length - 1)
					)
				) {
					verseDialNumberI(nowVerseNum).style.color = "#c0c0c0";
					verseDialNumberI(nowVerseNum).style.fontFamily = "nanumSQ";
					nowVerseNum = Math.round(
						(verseDial.scrollTop / (verseDial.scrollHeight - 300)) *
							(Object.keys(bibles[nowBible.book][dialBible.chapter]).length - 1)
					);
					if (nowVerseNum >= Object.keys(bibles[nowBible.book][dialBible.chapter]).length) {
						nowVerseNum = Object.keys(bibles[nowBible.book][dialBible.chapter]).length - 1;
					} else if (nowVerseNum <= 0) {
						nowVerseNum = 0;
					}
					verseDialNumberI(nowVerseNum).style.color = "#fcfcfc";
					verseDialNumberI(nowVerseNum).style.fontFamily = "nanumSQb";
					vibrateInAndroid(2);
					dialBible.verse = nowVerseNum + 1;
				}
			});
		}
	} else {
		document
			.getElementById("selectedTitleBook")
			.classList.remove("selectedTitle");
		document
			.getElementById("selectedTitleChapter")
			.classList.remove("selectedTitle");
		selectedTitle = "none";
	}
}

function setVerseDial(verseDial) {
	verseDial.scrollTo(0, 0);
	let verseDialContent = `<div id="verseDialNumber0" class="verseDialNumbers"></div>`;	
	for (
		let i = 1;
		i <= Object.keys(bibles[nowBible.book][dialBible.chapter]).length;
		i++
	) {
		verseDialContent += `<div id="verseDialNumber${i}" class="verseDialNumbers">${i}</div>`;
	}
	verseDialContent += `<div id="verseDialNumber${
		Object.keys(bibles[nowBible.book][dialBible.chapter]).length
	}" class="verseDialNumbers"></div>`;
	verseDial.innerHTML = verseDialContent;
}

function selectTitle(title) {
	if (isNavOpen && title != selectedTitle) {
		selectedTitle = title;
		vibrateInAndroid(5);
		setNavMode("Main");
		document
			.getElementById("selectedTitleBook")
			.classList.remove("selectedTitle");
		document
			.getElementById("selectedTitleChapter")
			.classList.remove("selectedTitle");

		document
			.getElementById(`selectedTitle${title}`)
			.classList.add("selectedTitle");
	}
}

function setChapterVerse(_book = nowBible.book, _chapter = dialBible.chapter, _verse = dialBible.verse) {
	nowBible.book = _book;
	nowBible.chapter = _chapter;
	nowBible.verse = _verse;
	setBible();
	vibrateInAndroid(5);
	document
		.querySelectorAll("tr")
		[nowBible.verse - 1].scrollIntoView({ behavior: "smooth" });
}

function vibrateInAndroid(v) {
	if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) {
		navigator.vibrate(v);
	}
}
