let mainContent = `
<div class="navMainNav">
</div>
`;
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
// <input id=\"biblebk\"><br>
// <input id=\"biblech\"><br>
// <button onclick=\"setBook();\">GO</button>

let navs = {
    main: `
    ${mainContent}
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

    `
}