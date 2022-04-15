function resizeCanvasFull(marginPercentage = 0.98){
    const canvas = document.querySelector("canvas");
    canvas.width = Math.floor(window.innerWidth * marginPercentage);
    canvas.height= Math.floor(window.innerHeight * marginPercentage);
};

function resizeCanvasSquare(){
    const canvas = document.querySelector("canvas");
    const max = window.innerWidth > window.innerHeight ? window.innerHeight : window.innerWidth;
    canvas.width = max;
    canvas.height = max;
};


function clearCanvas(){
    const canvas = document.querySelector("canvas");
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
};