class Ball{

    //helper properties
    canvas = document.querySelector("canvas");
    context = this.canvas.getContext("2d");
    canvasArea = this.canvas.width * this.canvas.height;
    FULLARC = Math.PI * 2;

    RADIUSRATIO = 5000

    constructor(){

        //ball position and velocity
        this.x = fxrand() * this.canvas.width;
        this.y = 100;
        this.xVelocity = fxrand() > 0.5 ? fxrand() * 1 : fxrand() * -1;
        this.yVelocity = fxrand() * 1 + 1;

        //ball properties
        this.radius = 10
        this.lineWidth = 3;
        this.strokeStyle = this.randomColor();
        this.shadowBlur = 0;

        this.maxRadius = Math.floor(this.canvasArea / this.RADIUSRATIO)
    };

    randomColor(){
        const r = Math.floor(fxrand()*255);
        // const r = 255;
        const g = Math.floor(fxrand()*255);
        // const g = 255;
        const b = Math.floor(fxrand()*255);
        // const b = 255;
        return `rgb(${r},${g},${b})`
    }

    //Drawing functions
    drawBall({ context } = this){
        context.save();
        context.lineWidth = this.lineWidth;
        context.strokeStyle = this.strokeStyle;
        context.shadowColor = this.strokeStyle;
        context.shadowBlur = this.shadowBlur;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, this.FULLARC);
        context.stroke();
        context.restore();
    };

    //Movement functions
    moveBall(){
        this.x += this.xVelocity;
        this.y += this.yVelocity;
    };

    checkBoundaries(){
        const ballMargin = this.radius + this.lineWidth;
        if(this.xVelocity >= 0){
            this.x + ballMargin >= this.canvas.width ? this.x = 0 : null;
        }
        else{
            this.x + ballMargin <= 0 ? this.x = this.canvas.width -10 : null;
        }
        this.y + ballMargin >= this.canvas.height ? this.y = 10 : null;
    }

    //Animation functions
    animateBall(){
        this.checkBoundaries();
        this.drawBall();
        this.moveBall();
        this.radius > 10 ? this.radius -= 0.1 : null;
        // this.radius < 20 ? this.fillStyle = "#000" : null;
    };
};

function createBallArray(quantity){
    const ballArray = [];
    for(let i = 0; i < quantity; i++){
        ballArray.push(new Ball());
    }
    return ballArray;
}

function moreBall(ballArray){
    ballArray.push(new Ball());
}


function lessBall(ballArray){
    ballArray.pop();
}

function colorCollision(ballA, ballB){
    const r = Math.floor(fxrand()*255);
    // const r = 255;
    const g = Math.floor(fxrand()*255);
    // const g = 55;
    // const b = Math.floor(fxrand()*255);
    const b = 155;
    const rgb = `rgb(${r},${g},${b})`
    ballA.strokeStyle = rgb;
    ballB.strokeStyle = rgb;
}

function preDetectCollision(ballA, ballB){
    const PADDING = 1.10 //% extra
    const margin = Math.round((ballA.radius + ballB.radius) * PADDING);
    if(Math.abs(ballA.x - ballB.x) < margin){
        if(Math.abs(ballA.y - ballB.y) < margin){
            //collision action;
            colorCollision(ballA, ballB);
            if(ballA.radius > ballA.maxRadius){
                ballA.radius = 10
            }
            else{
                ballA.radius += 1;
            };
        };
    };
    //non collision action
}

function animateBallArray(ballArray){
    ballArray.forEach(e => e.animateBall());
}

function calcArray(ballArray){
    for(let i = 0; i < ballArray.length; i++){
        for(let j = i + 1; j < ballArray.length; j++){
            preDetectCollision(ballArray[i], ballArray[j]);
        };
    };
};

function modifyBallSize(ballArray, input){
    input === "increase-size" ? ballArray.forEach(e => e.radius *= 1.10) : null;
    input === "decrease-size" ? ballArray.forEach(e => e.radius *= 0.90) : null;
}