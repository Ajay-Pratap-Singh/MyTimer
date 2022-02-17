const playPauseButton = document.querySelector("#start-btn")
const cancelButton = document.querySelector("#cancel-btn")
const displayTimerDuration = document.querySelector("#timer-duration-spn")
const displayTimerName = document.querySelector("#timer-name-spn")
const nextTimerToggle = document.querySelector("#next-timer")
let currentLevel = 0;
let timerDurations=[
    {name:"Work",duration:5},
    {name:"Rest",duration:2}
];
let duration = timerDurations[currentLevel].duration;
let secondsRemaining;
let min = duration / 60 | 0;
let seconds = duration % 60;
displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
displayTimerName.innerHTML = `(${timerDurations[currentLevel].name})`
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
    displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
    if(duration==secondsElapsed){
        currentLevel=(currentLevel+1)%timerDurations.length;
        clearInterval(timer)
        playSound("sounds/you-have-new-message-484.mp3")
        playPauseButton.innerHTML = "Start";
        timer = null;
        duration = timerDurations[currentLevel].duration;
        min = duration / 60 | 0;
        seconds = duration % 60;
        displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
        displayTimerName.innerHTML = `(${timerDurations[currentLevel].name})`
        if(nextTimerToggle.checked && timerDurations.length == currentLevel+1){
            playPauseButton.innerHTML= "Pause";
            startTime = Date.now()/1000 | 0;
            startTimer();
            timer = setInterval(startTimer,1000);
        }
    }
}

playPauseButton.addEventListener("click",()=>{
    playPauseButton.innerHTML= playPauseButton.innerHTML=="Start" ?"Pause":"Start";
    if(timer){
        clearInterval(timer);
        timer = null;
        duration = secondsRemaining;
    }else{
        startTime = Date.now()/1000 | 0;
        startTimer();
        timer = setInterval(startTimer,1000);
    }
})

cancelButton.addEventListener("click",()=>{
    if(timer){
        clearInterval(timer);
        timer = null;
    }
    playPauseButton.innerHTML = "Start";
    duration = timerDurations[currentLevel].duration
    min = duration / 60 | 0;
    seconds = duration % 60;
    displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
    displayTimerName.innerHTML = `(${timerDurations[currentLevel].name})`
})