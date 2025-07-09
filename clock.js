let canvasObject = document.getElementById("canvas");
let canvasContext = canvasObject.getContext("2d");
let width = 400;
let height = 400;
let radius = 200;

let minuteMarkerLenght = 0.05; // Percent in decimal format
let hourMarkerLenght = 0.1; // Percent in decimal format

let numberSize = 40;
let numberDistance = 0.78;

let updateFrequency = 10; //milliseconds to next frame

class Hand
{
    constructor(length,colour,width)
    {
        this.length = length;
        this.colour = colour;
        this.width = width;
    }
}
let hands = //Hour, minute, second
[
    new Hand(0.55,'#000000',4),
    new Hand(0.75,'#000000',2),
    new Hand(0.85,'#FF0000',1),
]

Start();
setInterval(Start, updateFrequency);
function Start()
{
    ClearCanvas(canvasContext);
    DrawHand(canvasContext);
    DrawBoard(canvasContext);
}

function ClearCanvas(canvasContext)
{
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
}

function DrawBoard(canvasContext)
{
    canvasContext.beginPath();
    canvasContext.arc(width / 2, height / 2, radius, 0, 2 * Math.PI);
    canvasContext.stroke();
    
    for(let i = 0; i < 60; i++)
    {
        if (i % 5 == 0)
        {
            canvasContext.moveTo(width / 2 + Math.cos(Math.PI * 2 / 60 * i) * radius * (1 - hourMarkerLenght), height / 2 + Math.sin(Math.PI * 2 / 60 * i) * radius * (1 - hourMarkerLenght));
        }
        else
        {
            canvasContext.moveTo(width / 2 + Math.cos(Math.PI * 2 / 60 * i) * radius * (1 - minuteMarkerLenght), height / 2 + Math.sin(Math.PI * 2 / 60 * i) * radius * (1 - minuteMarkerLenght));
        }
        canvasContext.lineTo(width / 2 + Math.cos(Math.PI * 2 / 60 * i) * radius, height / 2 + Math.sin(Math.PI * 2 / 60 * i) * radius);
        canvasContext.stroke();
    }

    canvasContext.font = numberSize + "px Arial";
    for (let i = 1; i < 13; i++)
    {
        canvasContext.textAlign = "center";
        canvasContext.textBaseline = "middle"; 
        canvasContext.fillText((i).toString(), width / 2 + Math.cos(Math.PI * 2 / 12 * i - Math.PI * 0.5) * radius * numberDistance, height / 2 + Math.sin(Math.PI * 2 / 12 * i - Math.PI * 0.5) * radius * numberDistance);
    }
}

function DrawHand(canvasContext)
{
    let currentTime = new Date();
    let times = [0,0,0];
    times[2] = currentTime.getSeconds() + currentTime.getMilliseconds() / 1000;
    times[1] = currentTime.getMinutes() + times[2] / 60;
    times[0] = currentTime.getHours() % 12 + times[1] / 60;
    let angles = [times[0] / 12 * Math.PI * 2 - Math.PI * 0.5, times[1] / 60 * Math.PI * 2 - Math.PI * 0.5, times[2] / 60 * Math.PI * 2 - Math.PI * 0.5];

    for(let i = 0; i < 3; i++)
    {
        canvasContext.beginPath();
        canvasContext.moveTo(width / 2, height / 2);
        canvasContext.lineTo(width / 2 + Math.cos(angles[i]) * radius * hands[i].length, height / 2 + Math.sin(angles[i]) * radius * hands[i].length);
        canvasContext.strokeStyle = hands[i].colour;
        canvasContext.lineWidth = hands[i].width; 
        canvasContext.stroke();
    }
    canvasContext.strokeStyle = "#000000";
}