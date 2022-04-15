const more = document.querySelector("#increase-balls");
const less = document.querySelector("#decrease-balls");
// const increaseSize = document.querySelector("#increase-size");
// const decreaseSize = document.querySelector("#decrease-size");
let ballCount = 20;

resizeCanvasFull();

const balls = createBallArray(ballCount);

function loop(){
    window.requestAnimationFrame(loop);
    // pauseCanvas ? null : clearCanvas();
    calcArray(balls);
    animateBallArray(balls);
}

loop();


more.addEventListener("click", ()=>{
    // console.log("click")
    ballCount++
    moreBall(balls);
    more.firstElementChild.innerText = `More Balls ${ballCount}`;
    less.firstElementChild.innerText = `Less Balls ${ballCount}`;
});

less.addEventListener("click", ()=>{
    // console.log("click")
    if(ballCount > 2){
        ballCount--;
        lessBall(balls);
    }

    more.firstElementChild.innerText = `More Balls ${ballCount}`;
    less.firstElementChild.innerText = `Less Balls ${ballCount}`;
});

// increaseSize.addEventListener("click", ()=>{
//     modifyBallSize(balls, "increase-size");
// });

// decreaseSize.addEventListener("click", ()=>{
//     modifyBallSize(balls, "decrease-size");
// });

function putCanavsImage(data){
    const canvasI = document.querySelector("canvas");
    const contextI = canvasI.getContext("2d");
    contextI.putImageData(data,0,0);
}

function getCanvasImage(){
    const canvasI = document.querySelector("canvas");
    const contextI = canvasI.getContext("2d");
    const canvasImage = contextI.getImageData(0,0,canvasI.width,canvasI.height)
    return canvasImage;
};

function subImageBright(data){
    for(let i = 3; i < data.data.length; i += 4){
        data.data[i] -= 1;
    };
    const ind = 4*10000 + 3
    return data;
};

setInterval(()=>{
    putCanavsImage(subImageBright(getCanvasImage()));
},10);