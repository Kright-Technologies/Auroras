
// Math.floor
let floor = Math.floor;




// get random between two numbers
/**
 * Get random number between two numbers
 * @param  {} start
 * @param  {} end
 */
function rand(start, end) {
    // get random between two numbers
    return start + Math.random() * (end - start);
}


// get random number between  0 and given number
/**
 * Get random number within [value]
 * @param  {} value
 */
function random(value) {
    return rand(0, value);
}


// drawing an ellipse
/**
 * Draw an ellipse
 * @param  {} eX
 * @param  {} eY
 * @param  {} radius
 * @param  {} strokeColor
 * @param  {} fillColor
 * @param  {} strokeWidth
 */
function ellipse(eX, eY, radius, strokeColor, fillColor, strokeWidth){
	let angle = Math.PI * 2;
	let spacing = 10;
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(eX, eY, radius, 0, angle);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = strokeWidth;
	ctx.stroke();
}

 
function ellipseCtx(context, eX, eY, radius, strokeColor, fillColor, strokeWidth){
	let ctx = context;
    let angle = Math.PI * 2;
	let spacing = 10;
	ctx.strokeStyle = strokeColor;
	ctx.fillStyle = fillColor;
	ctx.beginPath();
	ctx.arc(eX, eY, radius, 0, angle);
	ctx.closePath();
	ctx.fill();
	ctx.lineWidth = strokeWidth;
	ctx.stroke();
}




// drawing a square
/**
 * Draw a square
 * @param  {} x
 * @param  {} y
 * @param  {} length
 * @param  {} angle
 * @param  {} strokeColor
 * @param  {} fillStyle
 */
function square(x, y, length, angle, strokeColor, fillStyle){
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(0, 0, length, length);
    ctx.fillRect(0, 0, length, length);
    ctx.restore();
}




// drawing a rectangle
/**
 * Draw a rectangle
 * @param  {} x
 * @param  {} y
 * @param  {} sideA
 * @param  {} sideB
 * @param  {} angle
 * @param  {} strokeColor
 * @param  {} fillStyle
 */
function rectangle(x, y, sideA, sideB, angle, strokeColor, fillStyle){
    
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
    ctx.shadowColor =  fillStyle;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(angle * Math.PI / 180);
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeColor;
    ctx.strokeRect(0, 0, sideA, sideB);
    ctx.fillRect(0, 0, sideA, sideB);
    ctx.restore();
}




// draw wave
/**
 * Draw a sine wave (with amplitude, wavelength, etc)
 * @param  {} x
 * @param  {} y
 * @param  {} length
 * @param  {} wavelength
 * @param  {} amplitude
 * @param  {} waveColor
 * @param  {} lineWidth
 */
function drawWave(x, y, length, wavelength, amplitude, waveColor, lineWidth){
	color=`rgb(80, ${floor(rand(0, 255))}, 50)`;
	ctx.strokeStyle = waveColor;
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	ctx.moveTo(x, y);
	for (let i = 0; i < length; ++i) {
		ctx.lineTo(i, y + Math.sin(i * wavelength) * amplitude);
	}
    ctx.closePath();
	ctx.strokeStyle = waveColor;
	ctx.stroke();
    color_an_element = true;
    ctx.fillStyle = waveColor;
    color_an_element = false;
	ctx.fill();
}

/**
 * Generate gradient from list of colors
 * @param  {} direction
 * @param  {} color_an_element
 * @param  {} colors
 */
function gradientFromColorScheme(direction, color_an_element, colors){
   let grd;
   switch (direction) {
       case 'vertical':
           grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
           break;
       case 'horizontal':
           grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
           break;
   }
   let i;
   for (i = 0; i < colors.length; ++i) {
       grd.addColorStop(mapValue(i, 0, colors.length, 0, 1), colors[i]);
   }
   ctx.fillStyle = grd;
   if (color_an_element) {
       return grd;
   }
   ctx.fillRect(0, 0, canvas.width, canvas.height);
}


// draw gradient background
/**
 * Draw a gradient background
 * @param  {} direction
 * @param  {} colors
 */
function drawGradientBg(direction, colors){
    let grd;
    switch (direction) {
        case 'vertical':
            grd = ctx.createLinearGradient(0, 0, 0, canvas.height);
            break;
        case 'horizontal':
            grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
            break;
    }
    grd.addColorStop(0, colors[0]);
    grd.addColorStop(1, colors[1]);
    ctx.fillStyle = grd;
    if (color_an_element) {
        return grd;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}




//  draw background
/**
 * Draw a background
 * @param  {} color
 */
function drawBg(color){
	ctx.fillStyle = color;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
}




// random color function 
/**
 * Generate a random RGB color
 */
function randomColor(){
	return `rgb(
	${floor(rand(0, 255))},
	${floor(rand(0, 255))},
	${floor(rand(0, 255))}
	)`;
}




// pick any of the colors in this function
/**
 * Pick any of the colors in this function
 */
function pickColor(){
	if (rand(0, 1) > 0.5) {
		return 'white';
	} else {
		return 'orange';
	}
}

// add shadow
/**
 * Add shadow with RGB [color] and [radius]
 * @param  {} radius
 * @param  {} color
 */
function shadow(radius, color){
    ctx.shadowBlur = radius;
    ctx.shadowColor = color;
    ctx.shadowOffsetX = radius;
    ctx.shadowOffsetY = radius;
}


/**
 * Remove shadow
 */
function removeShadow(context){
    context.shadowBlur = 0;
    context.shadowColor = 'transparent';
    context.shadowOffsetX = 0;
    context.shadowOffsetY = 0;
}

// pick color from list provided as argument
/**
 * Pick a color from your list of colors
 * @param  {} colors
 */
function pickColorFromList(colors){
	// colors = ['rgba(255, 255, 255, 0)']
	return colors[floor(rand(0, colors.length))]
}


// get colour scheme from schemecolor.com
// function getColorScheme(){
//     let c = document.querySelectorAll("tr .capi");
//     let colorScheme = [] 
//     for (let i = 0; i < c.length; ++i) {
//         colorScheme.push(c[i].innerText);
//     }
//     return eval(colorScheme)
// }
// getColorScheme();



// optional part
// ===========================================================
// using an external lib that requires initializing

noise.seed(Math.random());



function drawFrame(context, frameWidth, frameColor) {
    let ctx = context;
    ctx.fillStyle = frameColor;
    // top
    ctx.fillRect(0, 0, canvas.width, frameWidth);
    // bottom
    ctx.fillRect(0, canvas.height - frameWidth, canvas.width, frameWidth);
    // left
    ctx.fillRect(0, frameWidth, frameWidth, canvas.height - (frameWidth * 2));
    // right
    ctx.fillRect(canvas.width - frameWidth, frameWidth, frameWidth, canvas.height - (frameWidth * 2));

}

// linearly maps value from the range (a..b) to (c..d)
function mapValue (value, a, b, c, d) {
    // first map value from (a..b) to (0..1)
    value = (value - a) / (b - a);
    // then map it from (0..1) to (c..d) and return it
    return c + value * (d - c);
}