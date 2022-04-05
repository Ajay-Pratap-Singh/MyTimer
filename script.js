const playPauseButton = document.querySelector("#start-btn")
const paths = playPauseButton.querySelectorAll("path")
const cancelButton = document.querySelector("#cancel-btn")
const displayTimerDuration = document.querySelector("#timer-duration-spn")
const displayTimerName = document.querySelector("#timer-name-spn")
const nextTimerToggle = document.querySelector("#next-timer")
const timerContainer = document.querySelector("#timer-container")
let selectTimerDuration;
let dismissTimerChange;
let confirmTimerChange;
let timerChangeLabel;
let currentLevel = 0;
let timerDurations=[
    {name:"Work",duration:3120},
    {name:"Rest",duration:1020},
    // {name:"Work-2",duration:10},
];
let secondsRemaining;
let duration = timerDurations[currentLevel].duration;
let min = duration / 60 | 0;
let seconds = duration % 60;
displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
displayTimerName.innerHTML = `${timerDurations[currentLevel].name}`
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
        paths[0].classList.remove("not-active");
        paths[1].classList.remove("not-active");
        paths[1].classList.add("not-active");
        // playPauseButton.innerHTML = "Start";
        timer = null;
        duration = timerDurations[currentLevel].duration;
        min = duration / 60 | 0;
        seconds = duration % 60;
        displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
        displayTimerName.innerHTML = `${timerDurations[currentLevel].name}`
        // if(nextTimerToggle.checked && currentLevel != 0){
        if(nextTimerToggle.classList.contains("active") && currentLevel != 0){
            paths[0].classList.remove("not-active");
            paths[1].classList.remove("not-active");
            paths[0].classList.add("not-active");
            // playPauseButton.innerHTML= "Pause";
            startTime = Date.now()/1000 | 0;
            startTimer();
            timer = setInterval(startTimer,1000);
        }
    }
}

playPauseButton.addEventListener("click",()=>{
    paths.forEach(e=>e.classList.toggle("not-active"));
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

displayTimerName.addEventListener("click",()=>{
    dismissTimerChange = document.createElement("button")
    dismissTimerChange.innerHTML = "Dismiss"
    dismissTimerChange.addEventListener("click",()=>{
        timerContainer.appendChild(displayTimerName);
        confirmTimerChange.remove();
        dismissTimerChange.remove();
        timerChangeLabel.remove();
        selectTimerDuration.remove();
    })
    confirmTimerChange = document.createElement("button")
    confirmTimerChange.innerHTML = "Confirm"
    confirmTimerChange.addEventListener("click",()=>{
        currentLevel=selectTimerDuration.value;
        clearInterval(timer)
        paths[0].classList.remove("not-active");
        paths[1].classList.remove("not-active");
        paths[1].classList.add("not-active");
        // playPauseButton.innerHTML = "Start";
        timer = null;
        duration = timerDurations[currentLevel].duration;
        min = duration / 60 | 0;
        seconds = duration % 60;
        displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
        displayTimerName.innerHTML = `${timerDurations[currentLevel].name}`
        timerContainer.appendChild(displayTimerName);
        confirmTimerChange.remove();
        dismissTimerChange.remove();
        timerChangeLabel.remove();
        selectTimerDuration.remove();
    })
    timerChangeLabel = document.createElement("label",{for:"select-timer-duration"})
    timerChangeLabel.innerHTML = "Select duration: "
    selectTimerDuration = document.createElement("select",{name:"timer-duration",id:"select-timer-duration"})
    for( i = 0 ; i < timerDurations.length ; i++ ){
        if(currentLevel==i)
        continue;
        let opt = document.createElement("option")
        opt.setAttribute("value",i);
        let min = String(timerDurations[i].duration / 60 | 0).padStart(2,0);
        let seconds = String(timerDurations[i].duration % 60).padStart(2,0);
        opt.innerHTML = timerDurations[i].name + " - " + min + " : " + seconds
        selectTimerDuration.appendChild(opt);
    }
    displayTimerName.parentElement.appendChild(timerChangeLabel)
    displayTimerName.parentElement.appendChild(selectTimerDuration)
    displayTimerName.parentElement.appendChild(confirmTimerChange)
    displayTimerName.parentElement.appendChild(dismissTimerChange)
    displayTimerName.remove();
})

cancelButton.addEventListener("click",()=>{
    if(timer){
        clearInterval(timer);
        timer = null;
    }
    paths[0].classList.remove("not-active");
    paths[1].classList.remove("not-active");
    paths[1].classList.add("not-active");
    // playPauseButton.innerHTML = "Start";
    duration = timerDurations[currentLevel].duration
    min = duration / 60 | 0;
    seconds = duration % 60;
    displayTimerDuration.innerHTML = String(min).padStart(2,0)+" : "+String(seconds).padStart(2,0);
    displayTimerName.innerHTML = `${timerDurations[currentLevel].name}`
})