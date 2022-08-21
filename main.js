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

let pushWord = () => {
	if(searchInput.value != ""){
		let text = searchInput.value;
		wordStore.innerHTML += `
			<span>
				${text}
				<button class="deleteWord">
					<i class="fa-solid fa-delete-left"></i>
				</button>
			</span>
			`;
	}
}

searchInput.addEventListener('keypress', (e) => {
	if(e.key == "Enter"){
		pushWord();
	}
})

wordInputBtn.addEventListener('click', pushWord);

// create temporary word store

let createTempWord = (wordList) => {
	for(let i = 0; i < wordList.length; i++){
		console.log("list", wordList[i])
	}
	console.log("length = ", wordList.length)
}

//createTempWord(wordList);

let wordList = [];

let createWordList = () => {
	
	let length = wordStore.childElementCount
	for(let i = 0; i < length; i++){
		let word = wordStore.children[i].innerText;
		wordList.push(word);
		console.log("children[i] = ", wordStore.children[i].innerText)
	}
	console.log("word list = ", wordList);
}

let getWordData = async () => {
	let dataStore = [];
	for(let i = 0; i < wordList.length; i++){
		let word = wordList[i];
		let data = await getData(word);
		dataStore.push(data);
	}
	console.log("dataStore = ", dataStore);
	filterWordData(dataStore);
}

let filterWordData = (dataStore) => {
	let dataLength = dataStore.length
	for(let i = 0; i < dataLength; i++){
		let data = dataStore[i][0];
		let meaningsLength = data.meanings.length;
		let dataWord = data.word;
		console.log("dataWord = ", dataWord);
		for(let i = 0; i < meaningsLength; i++){
			let meaning = data.meanings[i];
			let partOfSpeech = meaning.partOfSpeech;
			let defLength = meaning.definitions.length;
			for(let i = 0; i < defLength; i++){
				let def = meaning.definitions[i].definition;
				let example = meaning.definitions[i].example;
				console.log("def = ", def)
				console.log("ex = ", example);
			}
			console.log("part of speech = ", partOfSpeech)
		}
	}
}

searchBtn.addEventListener('click', createWordList);
searchBtn.addEventListener('click', getWordData);

// selecte the folder to store

// input title

// select the option

// start search with searchBtn


const getData = async (word) => {
	let response = await fetch("https://api.dictionaryapi.dev/api/v2/entries/en/" + word)


	if(response.ok) {
		const data = await response.json()
		console.log("success")
		return(data);
	} else {
		console.log("error")
	}
}

