// clear the screen function
// Welcome to hangman
//REQUIRES
// creating variables to hold libraires
// prompt-input is a question/answer
var Input = require('prompt-input');
var inquirer = require('inquirer');
const chalk = require('chalk');


var guessWords = ["rainy", "windy", "sunny", "freezing", "humid", "dry", "cloudy"];

//numTries is the number of tries
let numTries = -1;

// constructor which can be used to create objects with the ".raining", ".noise",
// and ".makenoise" properties
let Weather = new Word(guessWords);
let WeatherDashes = new DashesFx(Weather);
let WeatherScore = new ScoreBoard(Weather);
WeatherScore.score();
//game is a child of input constructor
let Game = new Input({name: 'GuessedLetter', message: 'Please guess a letter:'});

//constructor word takes an array. randomize the array. and picks one word out of the array and makes it into the random word
function Word(wordArray) {
    this.wordArray = wordArray;
    this.randomWord = wordArray[Math.floor(Math.random() * guessWords.length)];
};
//manipulating strings
//takes two variables - the first variable give you an index within the string that allows you to place in the other variable
//"geronimo" 

//letter i
//car
//geroncarmo

//.substr(beginning, end)
String.prototype.replaceAt = function(letter, replacement) {
    return this.substr(0, letter) + replacement + this.substr((letter + 1), this.length);
};

//substr(0, index) --> ""
//dashesFX 
function DashesFx(word) {
    this.word = word;
    this.dashes = "";
    for (let i = 0; i < word.randomWord.length; i++) {
        this.dashes += "_ ";
    };
};
//
function ScoreBoard() {
    this.won = 0;
    this.lost = 0;
    //empty string for wrong guesses
    this.missedLetter = "";
    //bring dashes to scoreboard
    this.dashes = WeatherDashes.dashes;
    //bring random word to scoreboard
    this.randomWord = Weather.randomWord;
    //empty string
    this.status = "";
    //lines contains the amount of page lines
    this.lines = process.stdout.getWindowSize()[1];
    this.score = function() {
        //log the word and clear the page
        console.log(Weather.randomWord);
        for (var i = 0; i < this.lines; i++) {
            console.log('\r\n');
        }
        console.log(chalk.rgb(188, 143, 143)('      ------------------------------------------'));
        console.log(chalk.rgb(188, 143, 143)(`     |             ${chalk.yellow("WELCOME TO HANGMAN")}           |`));
        console.log(chalk.rgb(188, 143, 143)('     |------------------------------------------|'));
        console.log(chalk.rgb(188, 143, 143)(`     |            ${chalk.green("WINS")}     |    ${chalk.red("LOSSES")}          |`));
        console.log(chalk.rgb(188, 143, 143)('     |---------------------|--------------------|'));
        console.log(chalk.rgb(188, 143, 143)(`     |             ${chalk.green(this.won)}       |     ${chalk.red(this.lost)}`));
        console.log(chalk.rgb(188, 143, 143)(`     |------------------------------------------|`));
        console.log(chalk.rgb(188, 143, 143)(`     |       ${chalk.yellow("MISSED LETTERS:")}   ${chalk.red(this.missedLetter)}`));
        console.log(chalk.rgb(188, 143, 143)(`     |------------------------------------------|`));
        console.log(chalk.rgb(188, 143, 143)('     |                                          |'));
        console.log(chalk.rgb(188, 143, 143)('     |                                          |'));
        console.log(chalk.rgb(188, 143, 143)(`     |    ${chalk.yellow("Guess the word realated to weather")}    |`));
        console.log(chalk.rgb(188, 143, 143)('     |                                          |'));
        console.log(chalk.rgb(188, 143, 143)(`     |              ${chalk.yellow(this.dashes)}`));
        console.log(chalk.rgb(188, 143, 143)('     |                                          |'));
        console.log(chalk.rgb(188, 143, 143)('     |                                          |'));
        console.log(chalk.rgb(188, 143, 143)('     |------------------------------------------|'));
        console.log(chalk.rgb(188, 143, 143)(`     |        ${this.status}`));
        console.log(chalk.rgb(188, 143, 143)('      ------------------------------------------'));
        for (var i = 0; i < this.lines / 8; i++) {
            console.log('\r\n');
        }
    }
//
        this.askForLetter = function() {
            //.ask is part of the prompt-input library and pushes forward the questions that were sked earlier
            Game.ask(function(answers) {});
            //.run is also part of the prompt-input library
            Game.run().then(function(answers) {
                //creating a variable to collect answers
                    let userGuess = answers;

                    //
                    for (let i = 0; i < WeatherScore.randomWord.length; i++) {
                        if (userGuess == WeatherScore.randomWord[i]) {
                            WeatherScore.dashes = WeatherScore.dashes.replaceAt(i * 2, userGuess);
                            WeatherScore.status = chalk.green("     CORRECT!!!");
                            WeatherScore.askForLetter();
                        }
                    }
                    //
                    let dash = RegExp("_");
                    if (!dash.test(WeatherScore.dashes)) {
                        WeatherScore.won++;
                        WeatherScore.status = chalk.green("YOU WON!!! Word was " + WeatherScore.randomWord);
                        WeatherScore.missedLetter = "";
                        Weather = new Word(guessWords);
                        WeatherDashes = new DashesFx(Weather);
                        WeatherScore.randomWord = Weather.randomWord;
                        console.log(WeatherScore.randomWord);
                        WeatherScore.dashes = WeatherDashes.dashes;
                        WeatherDashes.dashes;
                        WeatherScore.dashes;
                    }

                    loop1: for (let i = 0; i < Weather.randomWord.length; i++) {
                        if (userGuess == Weather.randomWord[i]) {
                            break loop1;
                        } else if (i === (Weather.randomWord.length - 1)) {
                            numTries++;
                            WeatherScore.missedLetter = WeatherScore.missedLetter.replaceAt(numTries, userGuess);
                            WeatherScore.status = chalk.red("     WRONG!!!");
                            if (numTries === 3) {
                                WeatherScore.lost                                WeatherScore.status = chalk.red("YOU LOST!!! Word was " + WeatherScore.randomWord);
                                WeatherScore.missedLetter = "";
                                Weather = new Word(guessWords);
                                WeatherDashes = new DashesFx(Weather);
                                WeatherScore.randomWord = Weather.randomWord;
                                console.log(WeatherScore.randomWord);
                                WeatherScore.dashes = WeatherDashes.dashes;
                                WeatherDashes.dashes;
                                WeatherScore.dashes;
                                WeatherScore.score;
                                numTries = -1;
                            }
                        }
                    }
                    WeatherScore.score();
                    WeatherScore.askForLetter();
                });
        }
    }
    WeatherScore.askForLetter();