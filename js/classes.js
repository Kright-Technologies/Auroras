
let noiseScale = 2000;

let noiseStrength = 60;


// let hue = rand(120, 180);

function hue() {
    let min = 120
    let max = 180
    // min = 0
    // mix = 54
    return rand(min, max);
}


function drawSmudgeLine(x, y, width, height) {
    y1 = y - height;
    let gradient;
    gradient = ctx.createLinearGradient(x, y - y1, width, height)
    // gradient.addColorStop(0, `hsla(${hue()}, 100%, 65%, 0)`);
    // gradient.addColorStop(0.5, `hsla(${hue()}, 100%, 65%, 1)`);
    // gradient.addColorStop(1, `hsla(${hue()}, 100%, 95%, 1)`);

    gradient.addColorStop(0, `hsla(120, 100%, 65%, 0)`);
    gradient.addColorStop(0.5, `hsla(120, 100%, 65%, 1)`);
    gradient.addColorStop(1, `hsla(120, 100%, 95%, 1)`);

    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y);

    // ctx.strokeStyle = gradient;
    ctx.strokeStyle = pickColorFromList(colorScheme);
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();

}

function drawSmudgeLineWithoutHSL(x, y, width, height) {
    y1 = y - height;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y);
    // ctx.strokeStyle = gradient;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}
function drawSmudgeLineWithoutHSL(ctx, x, y, width, height) {
    y1 = y - height;
    ctx.beginPath();
    ctx.moveTo(x, y1);
    ctx.lineTo(x, y);
    // ctx.strokeStyle = gradient;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = width;
    ctx.stroke();
    ctx.closePath();
}



class Agent {
    constructor (x, y) {
        this.x = x;
        this.y = y;
        this.z = rand(0.02, 0.08);

        this.size = rand(1, 1.5);
        this.speed = rand(3, 5);
        
        this.color = pickColorFromList(colorScheme);
        
        this.angle = 0;
    }


    display() {
        ellipse(
            this.x, 
            this.y, 
            this.size, this.color, this.color, this.size/2);
    }


    update() {
        this.angle = noise.perlin3(this.x / noiseScale, this.y / noiseScale, this.z) * noiseStrength;
        this.x += Math.sin(this.angle) * this.speed;
        this.y += Math.cos(this.angle) * this.speed;
    }
}




class Smudge {
    constructor(x, y, size, debug) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.min_number = 50;
        this.max_number = 150;
        this.color = null;
        this.debug = debug;
        this.number = rand(this.min_number, this.max_number);
        this.children = [];
        this.children_sideways = [];
        this.otherContext = null;

        this.spacing = 0;
    }

    generateSpacing () {
        // return rand(10, 40);
        return rand(1, 4);
    }

    createPoints() {
        let child = null;
        let parentSize = this.size;
        let parentY = this.y;
        for (let i = 0; i < this.number; ++i) {
            parentY -= parentSize + this.generateSpacing();
            parentSize *= 0.9;
            child = new SmudgeTexture(this.x, parentY, parentSize);
            // give child parent color
            child.color = this.color;

            if (this.debug) {
                // console.log(child.y)
            }

            this.children.push(child);
        }
    }

    createLevels() {
        let child = null;
        let parentSize = this.size;
        let ogParentSize = parentSize;
        let x = this.x;
        let parentY = this.y;
        for (let i = 0; i < this.number; ++i) {

            parentY -= parentSize + this.generateSpacing();
            if (parentSize > ogParentSize * rand(0, 0.2)) {
                parentSize *= rand(0.94, 0.98);
            } else {
                break;
            }
            x += Math.cos(this.x) * Math.random() * rand(0, 2);
            child = new TreeSmudgeTexture(x, parentY, parentSize, this.otherContext);

            // give child parent color
            child.color = this.color;

            if (this.debug) {
                // console.log(child.y)
            }

            this.children.push(child);
        }
    }

    draw() {
        for (let i = 0; i < this.children.length; ++i) {
            this.children[i].draw();
        }
    }

    drawLines() {
        ctx.filter = "blur(13px)";
        ctx.globalCompositeOperation = "lighter"
        drawSmudgeLine(this.x, this.y, this.size * 0.7, rand(100, 500))
    }

    
    drawForestLines() {
        // this.otherContext.filter = "blur(13px)";
        // ctx.globalCompositeOperation = "lighter"
        drawSmudgeLineWithoutHSL(this.otherContext, this.x, this.y, this.size * 0.7, rand(100, 500))
    }

}

class SmudgeTexture {
    constructor (x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = null;
    }

    draw() {
        ellipse(this.x, this.y, this.size, 'transparent', this.color, rand(1, 5))
    }
}

class TreeSmudgeTexture {
    constructor (x, y, size, ctx) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = null;
        this.context = ctx;
    }

    draw() {
        // ellipse(this.x, this.y, this.size, 'transparent', this.color, rand(1, 5))
        ellipseCtx(this.context, this.x, this.y, this.size, 'transparent', this.color, rand(1, 5))
    }
    
    
    drawForestLines() {
        // ctx.filter = "blur(3px)";
        // ctx.globalCompositeOperation = "lighter"
        drawSmudgeLineWithoutHSL(this.context, this.x, this.y, this.size * 0.7, rand(100, 500))
    }
}


