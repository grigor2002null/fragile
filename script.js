window.addEventListener(
    "keydown",
    function(event){
        if([32, 37, 38, 39, 40].indexOf(event.keyCode) > -1){
            event.preventDefault();
        }
    },
    false
);

let songArray = [
    "audio/Yes - Roundabout.mp3",
    "audio/Yes - Cans and Brahms.mp3",
    "audio/Yes - We Have Heaven.mp3",
    "audio/Yes - South Side of the Sky.mp3",
    "audio/Yes - Five per Cent for Nothing.mp3",
    "audio/Yes - Long Distance Runaround.mp3",
    "audio/Yes - The Fish (Schindleria Praematurus).mp3",
    "audio/Yes - Mood for a Day.mp3",
    "audio/Yes - Heart of the Sunrise.mp3"
];

let currentSong = 0;
let song = new Audio();
window.onload = function(){
    playSong();
};

function playSong() {
    song.src = songArray[currentSong];
    document.getElementById("title").textContent = songArray[currentSong].slice(12, -4);
}

function playOrPause() {
    if (song.paused) {
        song.play();
        document.getElementById("play").src = "images/pause.png";
    } else {
        song.pause();
        document.getElementById("play").src = "images/play.png";
    }
}

song.addEventListener("timeupdate", function() {
    convertTime(song.currentTime);
    if (song.ended) {
        next();
    }
});

function convertTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent = min + ":" + sec;
    totalTime(Math.floor(song.duration));
}

function totalTime(seconds) {
    let min = Math.floor(seconds / 60);
    let sec = Math.floor(seconds % 60);
    min = min < 10 ? "0" + min : min;
    sec = sec < 10 ? "0" + sec : sec;
    document.getElementById("currentTime").textContent += " / " + min + ":" + sec;
}

function next() {
    currentSong++;
    if (currentSong >= songArray.length) {
        currentSong = 0;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

function prev() {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songArray.length - 1;
    }
    playSong();
    song.play();
    document.getElementById("play").src = "images/pause.png";
}

document.addEventListener("keydown", function(event) {
    if (event.keyCode === 39) {
        next();
    } else if (event.keyCode === 37) {
        prev();;
    } else if (
        event.keyCode === 32
    ) {
        playOrPause();
    }
});

document.getElementById("volumeSlider").addEventListener("mousemove", setvolume);

function setvolume() {
    song.volume = document.getElementById("volumeSlider").value / 100;
}


