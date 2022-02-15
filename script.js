const button = document.getElementById("start-btn")
const display = document.querySelector("#timer-spn");
let duration = 3120;
let secondsRemaining;
let min;
let seconds;
let startTime;
let timer;
function startTimer() {
    let secondsElapsed = ( Date.now()/1000 | 0 ) - startTime;
    let curr = Date.now()
    secondsRemaining = duration - secondsElapsed;
    min = secondsRemaining / 60 | 0;
    seconds = secondsRemaining % 60;
    display.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
    console.log(secondsElapsed)
    if(duration==secondsElapsed)
        clearInterval(timer)
}
button.addEventListener("click",()=>{
    button.innerHTML=button.innerHTML=="Start"?"Pause":"Start";
    startTime = Date.now()/1000 | 0;
    if(timer){
        clearInterval(timer);
        timer = null;
    }else{
        startTimer();
        timer = setInterval(startTimer,1000);
    }
})