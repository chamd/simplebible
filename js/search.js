let searchResults;

function searchBible(e, searchForm) {
    e.preventDefault();

    searchResults = findBible(searchForm.searchInput.value); 

    // document.getElementById("searchNav").innerHTML = "";
    // Object.keys(searchResults.paths).forEach((bookName, index) => {
    //     if (index == 0) {
    //         document.getElementById("searchNav").innerHTML += `<button class="searchNavButtons searchNavButtonSelected" onclick="showSearchBible('${bookName}')">${bookName}</button>`;
    //         document.getElementById("searchInput").style.width = "calc(100% - 155px)";
    //         setTimeout(() => {
    //             document.getElementsByClassName("searchNavButtonSelected")[0].style.transform = "scale(1)";
    //         }, 1);
    //     } else {
    //         document.getElementById("searchNav").innerHTML += `<button class="searchNavButtons" onclick="showSearchBible('${bookName}')">${bookName}</button>`;
    //     }
    // });

    showSearchBible(Object.keys(searchResults.paths)[0]);

}

function showSearchBible(bookName) {
    // document.getElementById("searchNav").setAttribute("bookname", bookName);
    // document.getElementById("searchNav").innerHTML = bookName;
    // document.getElementById("searchNav").style.transform = "scale(1)";
    // document.getElementById("searchInput").style.width = "calc(100% - 155px)";

    document.getElementById("searchContent").innerHTML = "";

    searchResults.verses.forEach(result => {
        if (result.path[0] == bookName) {
            document.getElementById("searchContent").innerHTML += `<div>${result.value}<span>${result.path[0]} ${result.path[1]} ${result.path[2]}</span></div><br>`;        
        }
    })
}

function findBible(word) {
    let results = {
        paths: {},
        verses: []
    };
    let regex = new RegExp(`${word}`, 'i');
    
    booksSN.forEach(bookName => {
        Object.keys(bibles[bookName]).forEach(chapterNum => {
            Object.keys(bibles[bookName][chapterNum]).forEach(verseNum => {
                if (regex.test(bibles[bookName][chapterNum][verseNum])) {
                    results.paths[bookName] = true;
                    results.verses.push({
                        path: [bookName, chapterNum, verseNum],
                        value: bibles[bookName][chapterNum][verseNum]
                    });
                }
            });
        });
    });

    return results;
}

// function openSearchNav(bookName) {
//     document.getElementById("searchNav").style.padding = "20px 20px";
//     document.getElementById("searchNav").style.width = "calc(50%)";
//     document.getElementById("searchNav").style.height = "auto";
//     document.getElementById("searchNav").style.background = "rgba(30, 30, 30, 0.5)"
//     // document.getElementById("searchNav").style.background = "transparent"
//     // document.getElementById("searchNav").style.backdropFilter = "blur(7px)";

//     document.getElementById("searchNav").innerHTML = "";
//     Object.keys(searchResults.paths).forEach((bookName, index) => {
//         // if (index == 0) {
//         //     document.getElementById("searchNav").innerHTML += `<button class="searchNavButtons searchNavButtonSelected" onclick="showSearchBible('${bookName}')">${bookName}</button>`;
//         //     document.getElementById("searchInput").style.width = "calc(100% - 155px)";
//         //     setTimeout(() => {
//         //         document.getElementsByClassName("searchNavButtonSelected")[0].style.transform = "scale(1)";
//         //     }, 1);
//         // } else {
//         document.getElementById("searchNav").innerHTML += `<button class="searchNavButtons" onclick="showSearchBible('${bookName}')">${booksLN[booksSN.indexOf(bookName)]}</button>`;
//     });
// }