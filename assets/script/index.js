const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow','bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer','philosophy', 'database', 'periodic', 'capitalism', 'abominable','component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada','coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology','alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer','management', 'discovery', 'ambition', 'music', 'eagle', 'crown','chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button','superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science','mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

let speed = 30;
let time = 10;
let scoreCount = 0;


let progress = ((scoreCount/words.length)*100).toFixed()+'%'

let startCountdown = 3;
let flightSpeed = document.getElementById('speedVal');
let wordInput = document.getElementById("typeHere");
let takeOffTimer = document.getElementById("takeOffTimer")

let prepPopup = document.getElementById("prepCount");
let startPopup = document.getElementById("startGame");
let endPopup = document.getElementById("gameOver")
let roundScore = document.getElementById("roundScore");

const currentScore = document.getElementById('scoreVal');
const timeLeft = document.getElementById('timeVal');
const currentWord = document.getElementById("currentWord");

const startButton = document.getElementById("startButton");
const replayButton = document.getElementById("replayButton");

let scoresArr = []

replayButton.addEventListener('click', restart);
startButton.addEventListener('click', start);

function gameStart() { 
  scoreCount = 0;
  let timeInterval = setInterval(timer, 1000)

  function timer(){  
    if (time > 0) {
      time --;
    } else if (time == 0) {
      clearInterval(timeInterval)      
      gameEnd()
    }
    timeLeft.innerHTML = `${time}s`
  }

  console.log('Game Started');
  timeLeft.innerHTML = `${time}s`
  randomWord(words);
  wordInput.addEventListener('input', wordTyped);
  console.log(currentWord.innerHTML)
}

function start(){
  startCountdown = 3;
  time = 10;
  speed = 30;
  startPopup.classList.add('hidden');
  let interval = setInterval(startCount, 1000);

  function startCount(){
    if (startCountdown > 0) {
      startCountdown --;
      takeOffTimer.innerHTML = `${startCountdown}`
    } else if (startCountdown == 0){
      prepPopup.classList.add('hidden')
      clearInterval(interval);
      gameStart()
    }
  }
}

function restart(){
  startCountdown = 3;
  takeOffTimer.innerHTML = `${startCountdown}`
  endPopup.classList.add('hidden');

  start()

  prepPopup.classList.remove('hidden');

}

function gameEnd(){
  let currentScore = new Score(`${scoreCount}`, `${progress}`);
  console.log(currentScore)



  endPopup.classList.remove('hidden')
  scoreCount = 0;
  currentScore.innerText = `${scoreCount}pts`

}

function wordTyped() {
  if (wordChecker()) {
    console.log('point')
    currentScore.innerText = `${scoreCount}pts`
    randomWord(words);
    wordInput.value = '';
  }
}

function wordChecker() {
  if (wordInput.value == currentWord.innerHTML) {
    scoreCount ++;
    return true
  } else {
    return false
  }
}

function Score(scoreCount, progress ){
  this.hits = scoreCount;
  this.percentage = progress;
}


function changeSpeed() {
  switch(true){
    case score >= 10: speed = 60;
    case score >= 30: speed = 30;
  }
}

function randomWord(words) {
  const iRandom = Math.floor(Math.random()*90);
  currentWord.innerHTML = words[iRandom];
  wordInput.placeholder = words[iRandom]
}
