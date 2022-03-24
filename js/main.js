/** @type {HTMLCanvasElement} **/

// canvas setup
const canvas = document.getElementById("myCanvas");
const canvas2 = document.getElementById("myCanvas2");
const canvas3 = document.getElementById("myCanvas3");

const ctx = canvas.getContext("2d");
const ctx2 = canvas2.getContext("2d");
const ctx3 = canvas3.getContext("2d");


// for github pages preview
let window_width = 727
let window_height = 969


// first canvas
canvas.width = window.innerWidth * 1;
canvas.height = canvas.width * 4/3;

// second canvas
canvas2.width = canvas.width;
canvas2.height = canvas.height;

// third canvas
canvas3.width = canvas.width;
canvas3.height = canvas.height;

let width = canvas.width;
let height = canvas.height;


// some other global variables
let agents = []
let agents_length = floor(rand(4, 10));
let mountains = false;
let colorScheme = ["#C1CBE8", "#7686CF", "#6047B5", "#A458C4", "#FC60B9"];
colorScheme =  ["#6AAB80", "#539988", "#3C7F90", "#426395", "#343C75", "#2A2363"];
colorScheme = ["#FF7F01", "#F66809", "#EC5012", "#E3391A", "#D92122"];
colorScheme = ["#3CBCC7", "#1C96BA", "#0C73B2", "#094C93"];


bgColorScheme = ["#000000", "#030F33", "#02234D", "#003366"];
bgColorScheme = ["#3CBCC7", "#1C96BA", "#0C73B2", "#094C93"];
bgColorScheme =  ["#FF7F01", "#F66809", "#EC5012", "#E3391A", "#D92122"];
bgColorScheme = ['#1a1a1a', '#1d1d1d']
bgColorScheme = ["#1974D2", "#1357BE", "#0D3AA9", "#061D95", "#000080"];
bgColorScheme = ["#17472E", "#09321E", "#002914"]
bgColorScheme = ["#172347", "#025385", "#0EF3C5", "#04E2B7", "#038298", "#015268"]
// bgColorScheme = ["#CC3BA1", "#F06AB6", "#FFA6D8", "#BD7DD1", "#4B4896"];
// bgColorScheme = ["#F19E9A", "#FABAAB", "#F8D7C8", "#7DD0D6", "#4DBFDC", "#2CA1C6"];
// bgColorScheme =  ["#FF007E", "#DD077F", "#BB0E80", "#981580", "#761C81", "#542382"];
// bgColorScheme =  ["#3C0466", "#4D0585", "#5F06A3", "#7006C2", "#8207E0", "#9308FF"];


let forestColorScheme = ["#0C1622", "#23444B", "#1F2B29"];
forestColorScheme = ["#04031C", "#080B35", "#0E1946", "#152A5D", "#1D3C69"];
forestColorScheme = ["#0C1622", "#23444B", "#1F2B29"];
forestColorScheme = ['#1a1a1a'];


function generateStars(n){
    let x, y, radius, strokeColor, fillColor, strokeWidth;
    for (let i = 0; i < n; ++i) {
        x = random(width);
        y = random(height);
        radius = random(1);
        strokeColor = 'transparent';
        fillColor = 'white';
        strokeWidth = 0;
        shadow(3, fillColor);
        ellipse(x, y, radius, strokeColor, fillColor, strokeWidth);
    }
}





function setup() {
    // background
    // drawBg("black")
    gradientFromColorScheme('vertical', false, bgColorScheme)

    // create stars all over the canvas
    generateStars(500);

    // populate agents
    for (let i = 0; i < agents_length; ++i) {
        agents.push( new Agent(random(width), random(height)) )

        // DEBUG
        console.log();
    }

    landscapeCallback(ctx2);

}

// ctx.globalCompositeOperation = 'overlay';

let n = 5;
let smudgeNow = true;



function loop() {
    // animate agents
    for (let i = 0; i < agents_length; ++i) {
        // smudging
        if (smudgeNow) {
            shadow(15, agents[i].color)
            let smudgeX = agents[i].x;
            let smudgeY = agents[i].y - agents[i].size;
            let smudgeSize = agents[i].size * 0.9;
            let smudgeEffect = new Smudge(smudgeX, smudgeY, smudgeSize, true);
            // inherit agent color
            smudgeEffect.color = agents[i].color;
            // smudgeEffect.createPoints();
            // smudgeEffect.draw();
            smudgeEffect.drawLines();
        }
       
        // display and update agents
        shadow(1, 'transparent')
        // agents[i].display();
        agents[i].update();

        // change hue for smudgeLines
        // hue = rand(120, 284);
    }


}

class Debug{
    constructor(){
        console.log('debug mode')
    }

    log_list(list, prefix){
        for (let i = 0; i < list.length; ++i) {
            console.log(prefix + ': (' + list[i].x + ', ' + list[i].y + ')');
        }
    }
}


function landscapeCallback(ctx2){

    let x, y, size;
    x = 0;
    let min = 2
    let max = 10
    size = floor(rand(min, max));
    let ogsize = size;
    y = height + size * 2;



    if (mountains) {
        // the mountains
        ctx2.beginPath();
        ctx2.moveTo(x, y);    
        
        for (let i = x; i < 250; ++i) {
            // the mountains
            ctx2.lineTo(x, y)
        }

        // the mountains
        ctx2.lineTo(canvas.width, canvas.height);
        ctx2.closePath();
        ctx2.fillStyle = '#1a1a1a';
        ctx2.fill();

    } else {

       
        for (let i = x; i < 250; ++i) {
            let tree = new Smudge(x, y, size, true);
            tree.color = pickColorFromList(forestColorScheme)
            tree.spacing = rand(2, 9);
            tree.number = rand(500, 1500);
            tree.otherContext = ctx2;
            tree.createLevels();
            removeShadow(ctx2);
            tree.draw();
            // tree.drawForestLines();
            size = floor(rand(min, max));

            x += (size * rand(0, 1.5));
            // y -= Math.cos(y * 50) * Math.random() * rand(0, 200);
        
        } 

    }

}


setInterval(function(){
    smudgeNow = !(smudgeNow);
}, 10);


