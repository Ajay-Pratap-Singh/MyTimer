const playPauseButton = document.getElementById("start-btn")
const cancelButton = document.querySelector("#cancel-btn");
const display = document.querySelector("#timer-spn");
let durationReal=3;
let duration = durationReal;
let secondsRemaining;
let min;
let seconds;
let startTime;
let timer;

function playSound(url) {
    const audio = new Audio(url);
    audio.play();
}

function startTimer() {
    let secondsElapsed = ( Date.now()/1000 | 0 ) - startTime;
    secondsRemaining = duration - secondsElapsed;
    min = secondsRemaining / 60 | 0;
    seconds = secondsRemaining % 60;
    display.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
    console.log(secondsElapsed)
    if(duration==secondsElapsed){
        clearInterval(timer)
        playSound("sounds/you-have-new-message-484.mp3")
        playPauseButton.innerHTML = "Start";
        timer = null;
    }
}

playPauseButton.addEventListener("click",()=>{
    playPauseButton.innerHTML= playPauseButton.innerHTML=="Start" ?"Pause":"Start";
    startTime = Date.now()/1000 | 0;
    if(timer){
        clearInterval(timer);
        timer = null;
        duration = secondsRemaining;
    }else{
        startTimer();
        timer = setInterval(startTimer,1000);
    }
})

cancelButton.addEventListener("click",()=>{
    if(timer){
        clearInterval(timer);
        timer = null;
    }
    duration = durationReal
    display.innerHTML = "00 : 00";
    playPauseButton.innerHTML = "Start";
})