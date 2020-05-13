import {Rounds} from './rounds.js'
import {myGameArea} from "./gameArea.js";
import {component} from "./component.js";

const round0 = new Rounds("Round 1 ", 5, 4, 250, 0.8);
const round1 = new Rounds("Round 2 ", 10, 5,250, 1.2);
const round2 = new Rounds("Round 3 ", 15, 4, 250, 1.6);
const round3 = new Rounds("Round 4 ", 20, 4,250, 1.8);
const round4 = new Rounds("Round 5 ", 25, 5, 250, 2);

var yellowGamePiece = new component(45, 45, "mehdi.png", 50, 60, "image");
var explosion = new component(45, 45, "explosion.png", 50, 60, "image");
var myScore = new component("20px", "Consolas", "white", 10, 20, "text");
var mySound = new sound("cardi.mp3");
var crashSound = new sound("crash.wav");
// var obstacle = new component(15, 195, "red", 465, 105);
var myObstacles = [];

function startGame() {
    myGameArea.start();
}
function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 === 0) {return true;}
    return false;
}

function setRound() {
    var stage;

    if (myGameArea.score < round0.score) {
            stage =  round0;
    }else if(myGameArea.score < round1.score){
            stage = round1;
    }else if(myGameArea.score < round2.score){
        stage = round2;
    }else if(myGameArea.score < round3.score){
        stage = round3;
    }else if(myGameArea.score < round4.score){
        stage = round4;
    }else{
        stage = round4;
    }
    return stage;

}

function extracted() {
    myGameArea.frameNo += 1;
    var y = myGameArea.canvas.height;
    var x = myGameArea.canvas.width;
    var stage = setRound();
    // console.log(stage.ecart);
    if (myGameArea.frameNo === 1 || everyinterval(stage.interval)) {
        myGameArea.score += 1;
        var gapMax = stage.ecart*y*0.8;
        var gapMin = 100;
        var gap = Math.floor((Math.random()*(gapMax-gapMin))+gapMin);
        console.log(gap);
        var heightMax1 = y - gap;
        var height1 = Math.floor(Math.random()*heightMax1);
        var height2 = y - height1 - gap;
        myObstacles.push(new component(60, height1, "coronavirus.png", x, 0, "image"));
        myObstacles.push(new component(60, height2, "coronavirus.png", x, y-height2, "image"));
    }
    myObstacles.forEach((item) => {
        item.update();
        item.x -= stage.speed;
    })
    myScore.text = stage.name+" "+myGameArea.frameNo;
    myScore.update();
}

export function updateGameArea() {
    var x,y;

    // stoper en cas d'accident

    myGameArea.clear();
    extracted();
    yellowGamePiece.speedX = 0;
    yellowGamePiece.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[37]) {yellowGamePiece.speedX = -1; }
    if (myGameArea.keys && myGameArea.keys[39]) {yellowGamePiece.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) {yellowGamePiece.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {yellowGamePiece.speedY = 1; }
    if (myGameArea.x && myGameArea.y) {
        yellowGamePiece.x = myGameArea.x;
        yellowGamePiece.y = myGameArea.y;
    }
    yellowGamePiece.newPos();
    // // console.log(yellowGamePiece.speedX);
    // adam.update();
    yellowGamePiece.update();
    myObstacles.forEach((item)=> {
        if(yellowGamePiece.hitObstacle(item)){
            explosion.x=yellowGamePiece.x;
            explosion.y = yellowGamePiece.y;

            explosion.update();
            mySound.stop();
            clearInterval(musicInterval);
            crashSound.play();
            myGameArea.stop();

        }
    })


}
function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

function musicplay() {
    mySound.play();
}
var musicInterval = setInterval(musicplay, 100);
function moveup() {
    yellowGamePiece.speedY -=1;
}

function movedown() {
    yellowGamePiece.speedY  +=1;
}

function moveright() {
    yellowGamePiece.speedX +=1;
}

function moveleft() {
    yellowGamePiece.speedX -=1;
}

function stopMove() {
    yellowGamePiece.speedX = 0;
    yellowGamePiece.speedY = 0;
}

window.addEventListener("load", () => {
    myGameArea.start();


});

