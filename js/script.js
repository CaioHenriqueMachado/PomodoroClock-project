var sessionSet = document.getElementById('sessionConfig');
var breakSet = document.getElementById('breakConfig');
var hourDiv = document.getElementById('hourDiv');
var minuteDiv = document.getElementById('minuteDiv');
var secondDiv = document.getElementById('secondDiv');
var text = document.getElementById('text');

sessionSet.value = 30;
breakSet.value = 5;

var loading = '';
var breakMoment = false; 

var step = 1;
text.innerText = `Session ${step}`;

form.addEventListener("submit", e => {
  e.preventDefault();
  ajustTimer(sessionSet.value);

});

function ajustTimer(value) {
  alterColor(false);
  secondDiv.innerText = '00';
  var minute = (value % 60);
  var hour = parseInt(value / 60);

  minuteDiv.innerText = (minute < 10) ? ('0'+ minute)  : minute;
  hourDiv.innerText = (hour < 10) ? ('0'+ hour) : hour;
}

function startTimer() {
  document.getElementById('adjust').classList.toggle('hidden');
  document.getElementById('startButton').classList.toggle('hidden');
  document.getElementById('stopButton').classList.toggle('hidden');
  loading = setInterval( () => {start()}, 1000);
}

function start(){
  if ( secondDiv.innerText == 0 && minuteDiv.innerText == 0 && hourDiv.innerText == 0) {
    if (breakMoment == false) {
      ajustTimer(breakSet.value);
      breakMoment = true;
      text.innerText = `Break ${step}`;
      alterColor(true);

    } else {
      ajustTimer(sessionSet.value);
      breakMoment = false;
      step +=1;
      text.innerText = `Session ${step}`;
      alterColor(false);
    }
    
  } else if ( secondDiv.innerText == 0 && minuteDiv.innerText == 0 && hourDiv.innerText > 0) {
    var hour = hourDiv.innerText -1;
    hourDiv.innerText = (hour < 10) ? ('0'+ hour) : hour;

    minuteDiv.innerText = 59;
    secondDiv.innerText = 59;

  } else if ( secondDiv.innerText == 0 && minuteDiv.innerText > 0) {
    var minute = minuteDiv.innerText -1;
    minuteDiv.innerText = (minute < 10) ? ('0'+ minute)  : minute;
    secondDiv.innerText = 59;

  }else {
    var second = secondDiv.innerText -1;
    secondDiv.innerText = (second < 10) ? ('0'+ second)  : second;
  }
}

function stopTimer() {
  clearInterval(loading);
  document.getElementById('adjust').classList.toggle('hidden');
  document.getElementById('startButton').classList.toggle('hidden');
  document.getElementById('stopButton').classList.toggle('hidden');
}

function resetTimer() {
  clearInterval(loading);
  document.getElementById('startButton').classList.remove('hidden');
  document.getElementById('stopButton').classList.add('hidden');
  ajustTimer(sessionSet.value);
  alterColor(false);
  breakMoment = false;
}

function alterColor(value) {
  console.log('cor')
  if ( value == true) {
    document.getElementById('divContainer').classList.add('bgColorpurple');
    document.getElementById('divCircle').classList.add('bgColorgreen');
  } else {
    document.getElementById('divContainer').classList.remove('bgColorpurple');
    document.getElementById('divCircle').classList.remove('bgColorgreen');
  }
}