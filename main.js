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

	let wordData = [];

	for(let i = 0; i < dataLength; i++){
		let data = dataStore[i][0];
		let meaningsLength = data.meanings.length;
		let wordSpell = data.word;

		let wordMean = [];

		let wordObj = {};
		wordObj.wordSpell = wordSpell;
		wordObj.wordMean = wordMean;
		wordData.push(wordObj);

		for(let i = 0; i < meaningsLength; i++){
			let meaning = data.meanings[i];
			let partOfSpeech = meaning.partOfSpeech;
			let defLength = meaning.definitions.length;

			let defs = [];

			let mean = {};
			mean.partOfSpeech = partOfSpeech;
			mean.defs = defs;
			wordMean.push(mean);


			for(let i = 0; i < defLength; i++){
				let def = meaning.definitions[i].definition;
				let example = meaning.definitions[i].example;
				let defEx = {};
				defEx.def = def;
				defEx.example = example;
				defs.push(defEx);
			}
			//console.log("part of speech = ", partOfSpeech)
			//console.log("array defs contain object = ", defs)
			//console.log("mean = ", mean)
		}
	}

	console.log("wordData = ", wordData);
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

