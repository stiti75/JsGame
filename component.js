import {myGameArea} from './gameArea.js'

// create a rect to add it to canvas area
export function component(width, height, color, x, y, type) {
    this.type = type;
    if (type === "image" || type==="pattern") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY =0;
    this.x = x;
    this.y = y;
    this.update = function(){
        var ctx = myGameArea.context;
        if(this.type==="text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        }else if(type === "image") {
                ctx.drawImage(this.image,
                    this.x,
                    this.y,
                    this.width, this.height);
        }else if (type==="pattern"){
             // Create a pattern with this image, and set it to "repeat".
            ctx.fillStyle = ctx.createPattern(this.image, 'repeat');
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    this.hitObstacle = function (obstacle) {
        var left = this.x;
        var right = this.x + this.width;
        var up = this.y;
        var bottom = this.y + this.height;
        var crash = true;
        if(left > obstacle.x + obstacle.width || right < obstacle.x || up > obstacle.y + obstacle.height || bottom < obstacle.y)
            crash = false;
        return crash;
    }
}