/*

setup() -> main.js
loop() -> main.js

*/

// execution code

let stop = false;
let timeout = 1500;
timeout = rand(1500, 10000)
let main_timeout = 2000;


// timeout = 0
// stop = true; 
function main() {
    loop()
    if (!stop) {
        requestAnimationFrame(main);
    } else {
        cancelAnimationFrame(main);
            
        // after setting up everything draw the frames
        drawFrame(ctx2, 25, pickColorFromList(['#1a1a1a', 'beige']))

        // compile canvases        
        ctx3.drawImage(canvas, 0, 0);
        ctx3.drawImage(canvas2, 0, 0);
    }
}




// run setup
setup();

// launch main timeout
setTimeout(() => {
    main();
}, main_timeout);

// timeout to stop main
setTimeout(() => {
    stop = true;
    debug();
}, main_timeout + timeout);

function debug(){
    let d = new Debug()
    d.log_list(agents, 'Agent coordinates: ')
}