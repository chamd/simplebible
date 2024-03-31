let navs = {
    main: `
    <input id=\"biblebk\"><br>
    <input id=\"biblech\"><br>
    <button onclick=\"setBook();\">GO</button>
    `,

    setting: `
    <div class="navSetting">
        자동 줄 바꿈
        <select onchange="setWordbreak(this.selectedIndex);">
            <option>글자</option>
            <option>단어</option>
        </select>
    </div>
    <div class="navSetting">글꼴 크기</div>
    <div class="navSetting">시작 장 절</div>
    `,

    search: `

    `
}