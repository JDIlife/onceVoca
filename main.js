import * as dbfunc from './db.js'

// get dom elements
const searchInput = document.getElementById("searchInput");
const wordInputBtn = document.getElementById("wordInputBtn");
const wordStore = document.getElementById("wordStore");
const folderBtn = document.getElementById("folderBtn");
const titleInput = document.getElementById("titleInput");
const optionsBtn = document.getElementById("optionsBtn");
const searchBtn = document.getElementById("searchBtn");

// push the word with enter and wordInputBtn

let wordList = [];

let pushWord = () => {
	if(searchInput.value != ""){
		let text = searchInput.value;
		wordList.push(text);
	}
	return wordList;
}

searchInput.addEventListener('keypress', (e) => {
	if(e.key == "Enter"){
		let wordList = pushWord(e);
		console.log("word list = ", wordList)
	}
})

wordInputBtn.addEventListener('click', (e) => {
	let wordList = pushWord();
	console.log("word list with click = ", wordList)
})

// create temporary word store

// selecte the folder to store

// input title

// select the option

// start search with searchBtn


const getData = async (word) => {
	let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)
	let output;
	if(response.ok) {
		const data = await response.json()
		console.log("success")
		console.log("data = ", data)
		console.log("data[0].meanings = ", data[0].meanings)
		console.log("data[0].meanings[0].defs... = ", data[0].meanings[0].definitions[0].definition)
		console.log("data.length", data.length)
		console.log("data[0].meanings.length", data[0].meanings.length)
		console.log("data[0].meanings[0].length", data[0].meanings[0].length)
		data.forEach(function(word){
			output = `
				<ul>
					<li>${word.meanings[0].definitions[0].definition}</li>
					<li>${word.meanings[0].definitions[0].example}</li>
					<li>${word.meanings[1].definitions[0].definition}</li>
				</ul>
			`
		})
		wordStore.innerHTML = output;
	} else {
		console.log("error")
	}
}

let word = "component"

getData(word);
