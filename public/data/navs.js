// let mainContent = ``;
// for (let i = 0; i < 39; i++) {
// 	if (i == 0) {
// 		mainContent += `<div class="navMainBookOldWrap">`;
// 	}
// 	mainContent += `<div id="navMainBook${i}" class="navMainBookOld" onclick="setBook('${booksSN[i]}');">${booksLN[i]}</div>`;
// 	if (i == 38) {
// 		mainContent += `</div>`;
// 	}
// }
// for (let i = 39; i < booksLN.length; i++) {
// 	if (i == 39) {
// 		mainContent += `<div class="navMainBookNewWrap">`;
// 	}
// 	mainContent += `<div id="navMainBook${i}" class="navMainBookNew" onclick="setBook('${booksSN[i]}');">${booksLN[i]}</div>`;
// 	if (i == booksLN.length - 1) {
// 		mainContent += `</div>`;
// 	}
// }

// let navs = {
// 	main: `
//     ${mainContent}
//     `,

// 	mainChapter: `
//     <div id="chapterDial"></div>
//     <div id="verseDial"></div>
//     <button id="setChapterVerse" onclick="setChapterVerse();">이동</button>
//     `,

// 	setting: `
//     <div class="navSetting">
//       단어별 줄 바꿈
//       <div id="navSetting1" onclick="setSetting(1);">
//         <div id="navSetting1Ball"></div>
//       </div>
//     </div>
//     <div class="navSetting">본문 글꼴 크기</div>
//     <div class="navSetting">시작 장 절</div>
//     `,

// 	search: `
//     <form id="searchForm" autocomplete="off" onsubmit="searchBible(event, this)">
//       <input type="text" id="searchInput">
//       <i class="fa-solid fa-magnifying-glass" id="searchIcon"></i>
//       <div id="searchSetTypeButton" onclick="showSearchTypeDropdown()">
//         <i class="fa-solid fa-font" id="searchWordIcon"></i>
//         <i class="fa-solid fa-align-left" id="searchDetailIcon"></i>
//         <div class="searchTypeDropdownIcon">▼</div>
//       </div>
//       <div id="searchTypeDropdownBack" onclick="closeSearchTypeDropdown()"></div>
//       <div id="searchTypeDropdown">
//         <div onclick="setSearchType('Word')">글자로 검색<i class="fa-solid fa-font" id="searchWordIcon"></i></div>
//         <div onclick="setSearchType('Detail')">내용으로 검색<i class="fa-solid fa-align-left" id="searchDetailIcon"></i></div>
//       </div>
//     </form>
//     <div id="searchContent" onscroll="searchScroll(this)"></div>
//     `,
// 	// <div id="searchNav" bookname="창" onclick="openSearchNav(this.getAttribute('bookname'));"></div>
// };
