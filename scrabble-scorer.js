// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  
      for (const pointValue in oldPointStructure) {
     
		 if (oldPointStructure[pointValue].includes(word[i])) {
     
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let info = input.question("Let's play some scrabble! \n Enter a word: ");
   return info;
};




let simpleScorer = function(word) {
   return word.length;
}

let vowelBonusScorer = function(word) {
   word = word.toUpperCase();
   let vowels = ['A', 'E', 'I', 'O', 'U']
   let count = simpleScorer(word); 
   for(let i = 0; i < word.length; i++) {
      if(vowels.includes(word[i])) {
         count += 2;
      }
   }
   return count;
};

let scrabbleScorer = function(word) {
   word = word.toLowerCase(); 
   let count = 0; 
   for(let i = 0; i < word.length; i++) {
      count += newPointStructure[word[i]];
   }
   return count;
}


let scorer01 = {
   name: "Simple Scorer",
   description: "Each letter is worth 1 point",
   scorerFunction: simpleScorer
};

let scorer02 = { 
   name: "Bonus Vowels",
   description: "Vowels are 3 pts, consonants are 1 pt",
   scorerFunction: vowelBonusScorer
}
let scorer03 = {
   name: "Scrabble",
   description: "The traditional scoring algorithm",
   scorerFunction: scrabbleScorer
};

const scoringAlgorithms = [scorer01, scorer02, scorer03]

function scorerPrompt() {
   let promptStr = "";
   for (let i = 0; i < scoringAlgorithms.length; i++) {
      promptStr += `${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description} \n`
   } 
   promptStr += "Enter 0, 1, or 2: " 
   let info = input.question(promptStr);
   return scoringAlgorithms[info];
}

function transform(oldPointStructure) {
   let newObj = {}
   for (const key in oldPointStructure) {
      let myArray = oldPointStructure[key]
      for(let i = 0; i < myArray.length; i++) {
         newObj[myArray[i].toLowerCase()] = Number(key);
      }
   }
   return newObj;
};

let newPointStructure = transform(oldPointStructure)



function runProgram() {
   let word = initialPrompt();
   let obj = scorerPrompt();
   let score = obj.scorerFunction(word);
   console.log("Score for " + word + ": " + score);
}

//runProgram();

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};
