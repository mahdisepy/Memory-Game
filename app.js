const emoji = [
    "😀",
    "🤣",
    "🥰",
    "😜",
    "😡",
    "😎",
    "🥶",
    "😷",
    "😀",
    "🤣",
    "🥰",
    "😜",
    "😡",
    "😎",
    "🥶",
    "😷",
  ];
const gameover = document.querySelector('.over-box');
const gamebox = document.querySelector('.game-box');
const scorebar = document.querySelector('.score-bar')
const items = document.querySelector('.items');
const timer = document.querySelector('.time-text')
const scoretext = document.querySelector('.score-text')
const btnAgain = document.querySelector('.btnAgain')

let Elmlock = false;
let emojis = ["", "" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,""];
let countCorrectAnswer = 0;
let emojiShow = "";
let min = 2 ;
let sec = 0 ;
let score = 0;
let time = setInterval( timeleft , 1000)

btnAgain.addEventListener('click', playAgain);

function creatgame(){
  emoji.forEach((item) => {
    let randomnumber = getrandomenumber(0 , emojis.length)
    console.log(randomnumber);
    while(true){
      if(emojis[randomnumber] == "") break;

      randomnumber = getrandomenumber(0 , emojis.length)
    }

    emojis[randomnumber] = item ;
  })

  emojis.forEach((item) => {
  let divElement = document.createElement('div');
  divElement.classList.add('items')
  divElement.setAttribute("data-emoji" , item)
  divElement.innerHTML=`
                          <div class="div-back"><span>${item}</span></div>
                          <div class="div-front"><i class="material-symbols-outlined">Psychology_alt</i></div>
                      `
    gamebox.appendChild(divElement);
    console.log(divElement);

    divElement.addEventListener('click' , handleclick);
  })
}

creatgame()

function handleclick(){
  if(this.classList.contains('rotate') || Elmlock == true) return;

  this.classList.add("active");
  if (emojiShow == "") {
    emojiShow = this;
  } else {
    Elmlock = true;
    if (emojiShow.getAttribute("data-emoji") == this.getAttribute("data-emoji")) {
      emojiShow.classList.add("rotate");
      this.classList.add("rotate");
      emojiShow = "";
      countCorrectAnswer = countCorrectAnswer + 2;
      Elmlock = false;
    } else {
      setTimeout(() => {
        emojiShow.classList.remove("active");
        this.classList.remove("active");
        emojiShow = "";
        Elmlock = false;
      }, 500);
    }

    checkcorrect();
  }
}


function checkcorrect() {
  if (countCorrectAnswer == emojis.length) {
    score ++;
    scoretext.textContent = score;
    clearInterval(time);
  }
}

//فانشن تایمر که در بالای صفحه در حال سپری شدنه
function timeleft(){
  if(countCorrectAnswer < emojis.length && min == 0 && sec == 0){
    clearInterval(time);
    gameover.classList.add('flex');
    gamebox.style.display = 'none';
    scorebar.style.display = 'none';
    return
  }
  
  if(sec == 0){
    sec = 59;
    min-- ;
  }else {
    sec--;
  }

  timer.textContent = `0${min}:${sec < 10 ? '0' + sec : sec}`
}

//فانشن ساخت عدد رندوم
function getrandomenumber(min , max){
  return Math.floor(Math.random() * (max - min) + min)
}

function playAgain() {
  clearInterval(time);
  gamebox.innerHTML = '';
  Elmlock = false;
  emojis = ["", "" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,"" ,""];
  countCorrectAnswer = 0;
  emojiShow = "";
  min = 2 ;
  sec = 0 ;
  time = setInterval( timeleft , 1000);
  
  creatgame();
}