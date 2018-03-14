// clear the screen function
// Welcome to hangman
//REQUIRES
// creating variables to hold libraires
// prompt-input is a question/answer
var Input = require('prompt-input');
//inquirer has more selection thann prompt-input: type, list, input, message, 
const chalk = require('chalk');
// change colors for node


var guessWords = ["rainy", "windy", "sunny", "freezing", "humid", "dry", "cloudy"];

//numTries is the number of tries
//starts at -1 because the first the thing you do is add 1
let numTries = 0;

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
        console.log('      ------------------------------------------');
        console.log(`     |             ${chalk.yellow("WELCOME TO HANGMAN")}           |`);
        console.log('     |------------------------------------------|');
        console.log(`     |            ${chalk.green("WINS")}     |    ${chalk.red("LOSSES")}          |`);
        console.log('     |---------------------|--------------------|');
        console.log(`     |             ${chalk.green(this.won)}       |     ${chalk.red(this.lost)}`);
        console.log(`     |------------------------------------------|`);
        console.log(`     |       ${chalk.yellow("MISSED LETTERS:")}   ${chalk.red(this.missedLetter)}`);
        console.log(`     |------------------------------------------|`);
        console.log('     |                                          |');
        console.log('     |                                          |');
        console.log(`     |    ${chalk.yellow("Guess the word realated to weather")}    |`);
        console.log('     |                                          |');
        console.log(`     |              ${chalk.yellow(this.dashes)}`);
        console.log('     |                                          |');
        console.log('     |                                          |');
        console.log('     |------------------------------------------|');
        console.log(`     |        ${this.status}`);
        console.log('      ------------------------------------------');
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
                    //loop through random word in Weather Score
                    for (let i = 0; i < WeatherScore.randomWord.length; i++) {
                        // compare each guess to a letter in random word
                        if (userGuess == WeatherScore.randomWord[i]) {
                            //redefining weatherscore.dashes after each correct guess
                            WeatherScore.dashes = WeatherScore.dashes.replaceAt(i * 2, userGuess);
                            WeatherScore.status = chalk.green("     CORRECT!!!");
                            //asks for another letter if it is
                            WeatherScore.askForLetter();
                        }
                    }
                    // RegExp(search) is very powerful; very complex: let dash equal a regular expression;
                    // helps you search in dashes; look up Reg Exp 101
                    let dash = RegExp("_");
                    //if there are no dashes; .test() searches if there are any dashes;
                    if (!dash.test(WeatherScore.dashes)) {
                        //you win if theres no dashes
                        WeatherScore.won++;
                        WeatherScore.status = chalk.green("YOU WON!!! Word was " + WeatherScore.randomWord);
                        //.missedLetter = empty string
                        WeatherScore.missedLetter = "";
                        // new random word
                        Weather = new Word(guessWords);
                        // new dashes for new word
                        WeatherDashes = new DashesFx(Weather);
                        //pass random word to scoreboard
                        WeatherScore.randomWord = Weather.randomWord;
                        // print the word
                        console.log(WeatherScore.randomWord);
                        // 
                        WeatherScore.dashes = WeatherDashes.dashes;
                    }
                    // give loop1 a name to break it later
                    loop1: for (let i = 0; i < Weather.randomWord.length; i++) {
                        //if guess is not equal and i equals the length of randomword - 1
                        if (userGuess !== Weather.randomWord[i]) {
                            break loop1;
                        }
                        else if (i === (Weather.randomWord.length - 1)) {

                            WeatherScore.missedLetter = WeatherScore.missedLetter.replaceAt(numTries, userGuess);
                            WeatherScore.status = chalk.red("     WRONG!!!");
                            if (numTries === 3) {
                                WeatherScore.lost++;                              
                                WeatherScore.status = chalk.red("YOU LOST!!! Word was " + WeatherScore.randomWord);
                                WeatherScore.missedLetter = "";
                                Weather = new Word(guessWords);
                                WeatherDashes = new DashesFx(Weather);
                                WeatherScore.randomWord = Weather.randomWord;
                                console.log(WeatherScore.randomWord);
                                WeatherScore.dashes = WeatherDashes.dashes;
                                numTries = 0;
                            }
                            numTries++;
                        }
                    }
                    WeatherScore.score();
                    WeatherScore.askForLetter();
                });
        }
    }
    WeatherScore.askForLetter();