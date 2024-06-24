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

let navs = {
    main: `
    ${mainContent}
    `,

    mainChapter: `
    <div id="chapterDial"></div>
    <div id="verseDial"></div>
    <button id="setChapterVerse" onclick="setChapterVerse();">이동</button>
    `,

    setting: `
    <div class="navSetting">
        단어별 줄 바꿈
        <div id="navSetting1" onclick="setSetting(1);">
            <div id="navSetting1Ball"></div>
        </div>
    </div>
    <div class="navSetting">본문 글꼴 크기</div>
    <div class="navSetting">시작 장 절</div>
    `,

    search: `
    <form id="searchForm" autocomplete="off" onsubmit="searchBible(event, this)">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input type="text" id="searchInput">
    </form>
    <div id="searchContent"></div>
    `
    // <div id="searchNav" bookname="창" onclick="openSearchNav(this.getAttribute('bookname'));"></div>
}