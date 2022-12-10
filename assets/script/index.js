window.addEventListener('load', gameStart)

let time = 10;
let score = 0;


const currentScore = document.getElementById('scoreVal')
const timeLeft = document.getElementById('timeVal')
const wordInput = document.getElementById("typeHere");
const currentWord = document.getElementById("currentWord");

const words = ['dinosaur', 'love', 'pineapple', 'calendar', 'robot', 'building', 'population', 'weather', 'bottle', 'history', 'dream', 'character', 'money', 'absolute', 'discipline', 'machine', 'accurate', 'connection', 'rainbow','bicycle', 'eclipse', 'calculator', 'trouble', 'watermelon', 'developer','philosophy', 'database', 'periodic', 'capitalism', 'abominable','component', 'future', 'pasta', 'microwave', 'jungle', 'wallet', 'canada','coffee', 'beauty', 'agency', 'chocolate', 'eleven', 'technology','alphabet', 'knowledge', 'magician', 'professor', 'triangle', 'earthquake', 'baseball', 'beyond', 'evolution', 'banana', 'perfumer', 'computer','management', 'discovery', 'ambition', 'music', 'eagle', 'crown','chess', 'laptop', 'bedroom', 'delivery', 'enemy', 'button','superman', 'library', 'unboxing', 'bookstore', 'language', 'homework', 'fantastic', 'economy', 'interview', 'awesome', 'challenge', 'science','mystery', 'famous', 'league', 'memory', 'leather', 'planet', 'software', 'update', 'yellow', 'keyboard', 'window'];

function gameStart() {
  console.log('Game Started');
  console.log(words.length);
  randomWord(words);

  wordInput.addEventListener('input', wordTyped);

  setInterval(timer, 1000)
  console.log(currentWord.innerHTML)
}

function gameEnd(){
}

function wordTyped() {
  if (wordChecker()) {
    console.log('point')
    currentScore.innerText = `${score}pts`
    randomWord(words);
    wordInput.value = '';
  }
}

function wordChecker() {
  if (wordInput.value == currentWord.innerHTML) {
    score ++;
    return true
  } else {
    return false
  }
}


function timer(){
  if (time > 0) {
    time --;
  } else if (time == 0) {
    gameEnd();
  }

  timeLeft.innerHTML = `${time}s`
}

function randomWord(words) {
  const iRandom = Math.floor(Math.random()*90);
  console.log(currentWord.innerHTML)

  currentWord.innerHTML = words[iRandom];
  wordInput.placeholder = words[iRandom]
}
