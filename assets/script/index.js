const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow','bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer','philosophy', 'database', 'periodic', 'capitalism', 'abominable','component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada','coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology','alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer','management', 'discovery', 'ambition', 'music', 'eagle', 'crown','chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button','superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science','mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

let speed = 30;
let time = 0;
let scoreCount = 0;


let progress = ((scoreCount/words.length)*100).toFixed()+'%'

let startCountdown = 3;
let flightSpeed = document.getElementById('speedVal');
let wordInput = document.getElementById("typeHere");
let takeOffTimer = document.getElementById("takeOffTimer")
let scoreList = document.getElementsByTagName('li')

let prepPopup = document.getElementById("prepCount");
let startPopup = document.getElementById("startGame");
let endPopup = document.getElementById("gameOver")
let roundScore = document.getElementById("roundScore");

const currentScore = document.getElementById('scoreVal');
const timeLeft = document.getElementById('timeVal');
const currentWord = document.getElementById("currentWord");

const startButton = document.getElementById("startButton");
const replayButton = document.getElementById("replayButton");

const scoresArr = [];
const localScores = JSON.parse(localStorage.getItem('Score'))
const fuelbar = document.getElementById("fuel")



replayButton.addEventListener('click', restart);
startButton.addEventListener('click', start);


function start(){

  if (localScores != null) {
    for (let i = 0; i < localScores.length; i++)
  scoresArr.push(localScores[i])
  }
  
  console.log(localScores)
  console.log(scoresArr);

  startCountdown = 3;
  time = 30;
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

function gameStart() { 
  scoreCount = 0;
  progress = 0;
  let timeInterval = setInterval(timer, 1000)
  let startTime = time;

  function timer(){  
    if (time > 0) {
      time --;
      let timewidth = (time/startTime) * 100;
      fuelbar.style.width = timewidth + "%";
      colorPressure(timewidth)
    } else if (time == 0) {
      clearInterval(timeInterval)      
      fuelbar.style.width = "0%";
      gameEnd()
    }
    timeLeft.innerHTML = `${time}s`
  }

  timeLeft.innerHTML = `${time}s`
  randomWord(words);
  wordInput.addEventListener('input', wordTyped);
  console.log(currentWord.innerHTML)
}

function colorPressure(width){
  if(width > 50){
    fuelbar.style.background = "green";
  } else if (width > 30) {
    fuelbar.style.background = "yellow";
  } else {
    fuelbar.style.background = "red";
  }
}

function restart(){
  startCountdown = 3;
  takeOffTimer.innerHTML = `${startCountdown}`
  endPopup.classList.add('hidden');

  start()

  prepPopup.classList.remove('hidden');
}

/*Score Contructor */
function Score(scoreCount, progress){
  this.hits = scoreCount;
  this.percentage = progress;
}

function gameEnd(){
  sortSplice(scoresArr)
  console.log(localScores)
  console.log(scoresArr);
  
  let progress = Math.round((scoreCount/words.length) *100);
  leaderBoard()
  let finalScore = new Score(`${scoreCount}`, `${progress}`);
  scoresArr.push(finalScore)

  localStorage.setItem('Score', JSON.stringify(scoresArr))
  leaderBoard()

  scoreCount = 0;
  currentScore.innerText = scoreCount

  currentWord.innerHTML = "ss"
  wordInput.placeholder = "start"

  roundScore.innerHTML = `Hits: ${finalScore.hits} Progress: ${finalScore.percentage}`
  console.log(roundScore.innerHTML)

  endPopup.classList.remove('hidden')
}

function leaderBoard(){
  sortSplice(scoresArr)
  for (let i = 0; i < scoresArr.length; i++){
    scoreList[i].innerHTML = `Hits:${scoresArr[i].hits} Prog: ${scoresArr[i].percentage}`
  }
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

/*Not Implemented

function changeSpeed() {
  switch(true){
    case score >= 10: speed = 60;
    case score >= 30: speed = 30;
  }
}
*/

function randomWord(words) {
  const iRandom = Math.floor(Math.random()*90);
  currentWord.innerHTML = words[iRandom];
  wordInput.placeholder = words[iRandom]
}


/* Add to localstorage */
function sortSpliceLocal(localScores) {
  localScores.sort((s1, s2) => s2.hits - s1.hits)
  localScores.splice(3, 100);
}

function sortSplice(scoresArr) {
  scoresArr.sort((s1, s2) => s2.hits - s1.hits)
  scoresArr.splice(3, 100);
}

function mergeArrays(arrays) {
  let mergedArray = [];

  arrays.forEach(array => {
      mergedArray.push(array)
  });

  return mergedArray
}
