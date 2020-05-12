class Rounds {
    score;
    name;

    constructor(name, score, difficult, interval, speed) {
        this.name = name;
        this.score = score;
        this.difficult = difficult;
        this.interval = interval;
        this.speed = speed;

    }

    get ecart(){
        return this.calcEcart();
    }

    calcEcart(){
        return ((10-this.difficult)/10);
    }

}
export { Rounds };