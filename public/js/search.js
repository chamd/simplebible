let searchResults;
let currentSearchId = 0;
let searchType = "Word";

function searchBible(e, searchForm) {
	e.preventDefault();

	const searchId = ++currentSearchId;

	findBible(searchForm.searchInput.value).then((response) => {
		searchResults = response;
		showSearchResults(searchId, searchForm.searchInput.value);
	});

}

function showSearchResults(searchId, word) {
	document.getElementById("searchContent").innerHTML = "";
	
	if (searchResults.paths.undefined) {
		document.getElementById("searchContent").innerHTML += `아무것도 찾지 못했습니다`;
	} else {
		const resultsToRender = searchResults.verses;
		const batchSize = 20;
		let startIndex = 0;
	
		function renderBatch() {
			if (searchId !== currentSearchId) return;
	
			const endIndex = Math.min(startIndex + batchSize, resultsToRender.length);
	
			for (let i = startIndex; i < endIndex; i++) {
				let result = resultsToRender[i]; //5227FF
				let text = result.value.replaceAll(word, `<span class="searchFindWord">${word}</span>`)
	
				document.getElementById("searchContent").innerHTML += 
				`<div class="searchVerse" onclick="setChapterVerse('${result.path[0]}', ${result.path[1]}, ${result.path[2]})">${text}<div class="searchPath">${result.path[0]} ${result.path[1]}:${result.path[2]}</div></div>`;
			}
	
			startIndex = endIndex;
	
			if (startIndex < resultsToRender.length) {
				setTimeout(renderBatch, 0);
			}
		}
	
		renderBatch();
	}

}

async function findBible (word) {

	let results = {
		paths: {},
		verses: [],
	};
	
	if (searchType === "Word") {
		let regex = new RegExp(`${word}`, "i");
	
		booksSN.forEach((bookName) => {
			Object.keys(bibles[bookName]).forEach((chapterNum) => {
				Object.keys(bibles[bookName][chapterNum]).forEach((verseNum) => {
					if (regex.test(bibles[bookName][chapterNum][verseNum])) {
						results.paths[bookName] = true;
						results.verses.push({
							path: [bookName, chapterNum, verseNum],
							value: bibles[bookName][chapterNum][verseNum],
						});
					}
				});
			});
		});
	} else if (searchType === "Detail") {
		try {			
			const response = await fetch("/api/openai", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ word })
			});
	
			const data = await response.json();
			console.log(data);
			
			const entries = data.split('|');
			entries.forEach(entry => {
				const [bookNameLN, chapterNum, verseRange] = entry.split('/');
				const bookName = booksSN[booksLN.indexOf(bookNameLN)];
					results.paths[bookName] = true;					
					if (verseRange.includes('-')) {
						const [start, end] = verseRange.split('-').map(Number);
						for (let i = start; i <= end; i++) {							
							results.verses.push({path: [bookName, Number(chapterNum), i], value: bibles[bookName][Number(chapterNum)][i]});
						}
					} else {
						results.verses.push({path: [bookName, Number(chapterNum), Number(verseRange)], value: bibles[bookName][Number(chapterNum)][Number(verseRange)]});
					}
			});			
		} catch (error) {
			console.error(error);
		}
	}

	return results;
}

function showSearchTypeDropdown() {
	document.getElementById("searchTypeDropdown").style.display = "block";
	document.getElementById("searchTypeDropdownBack").style.display = "block";
	setTimeout(() => {
		document.getElementById("searchTypeDropdown").style.opacity = "1";
		document.getElementById("searchTypeDropdown").style.transform = "scale(1)";
	}, 0);
}

function closeSearchTypeDropdown() {
	document.getElementById("searchTypeDropdownBack").style.display = "none";
	document.getElementById("searchTypeDropdown").style.opacity = "0";
	document.getElementById("searchTypeDropdown").style.transform = "scale(0.9)";
	setTimeout(() => {
		document.getElementById("searchTypeDropdown").style.display = "none";
	}, 200);
}

function setSearchType(type) {
	closeSearchTypeDropdown();
	searchType = type;
	document.getElementById("searchWordIcon").style.display = "none";
	document.getElementById("searchDetailIcon").style.display = "none";
	document.getElementById(`search${type}Icon`).style.display = "block";
}

function searchScroll(element) {
	if (element.scrollTop != 0) {
		document.getElementById("searchInput").classList.add("searchScroll");
		document.getElementById("searchSetTypeButton").style.marginRight = "-15px";
		document.getElementById("searchIcon").style.left = "0px";
		document.getElementById("searchTypeDropdown").style.marginRight = "-15px";
	} else {
		document.getElementById("searchInput").classList.remove("searchScroll");
		document.getElementById("searchSetTypeButton").style.marginRight = "";
		document.getElementById("searchIcon").style.left = "";
		document.getElementById("searchTypeDropdown").style.marginRight = "";
	}
}