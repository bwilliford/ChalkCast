//Initialize DOM elements we'll manipulate
let chalkboard = document.getElementById('chalkboard');
let toggleBG = document.getElementById('toggleBackground');

//Initialization of PaperJS and attaching to canvas
paper.install(window);
window.onload = function() {
    // Create an empty project and a view for the canvas
    paper.setup(chalkboard);
    //Activate chalk by default
    chalk.activate();
}

//Global variables / tools
let sketch = [];
let path;
let strokeColor = 'white';
let strokeSize = 2;

//Chalk tool
let chalk = new Tool();
chalk.onMouseDown = function(event) {
    path = new paper.Path();
    path.strokeColor = strokeColor;
    path.strokeWidth = strokeSize;
    path.add(event.point);
}
chalk.onMouseDrag = function(event) {
    path.add(event.point);
}
chalk.onMouseUp = function(event) {
    sketch.push(path);
}

//Toggle background from chalkboard to whiteboard and vice-versa
function toggleBackground() {
    if (chalkboard.className === "chalkboard") {
        chalkboard.className = "whiteboard";
        toggleBG.textContent = "Whiteboard";
        toggleStrokeColors('black');
    }
    else {
        chalkboard.className = "chalkboard";
        toggleBG.textContent = "Chalkboard";
        toggleStrokeColors('white');
    }
}

//Ensure black and white sketches also invert
function toggleStrokeColors(color) {
    for (let i = 0; i < sketch.length; i++) {
        //Only change for black or white strokes
            sketch[i].strokeColor = color;
            strokeColor = color;
    }
}