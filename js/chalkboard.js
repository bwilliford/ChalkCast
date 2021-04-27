let chalkboard = document.getElementById('chalkboard');

paper.install(window);
window.onload = function() {

    // Create an empty project and a view for the canvas
    paper.setup(chalkboard);

    //Activate chalk by default
    chalk.activate();
}

let path;
let chalk = new Tool();

chalk.onMouseDown = function(event) {
    path = new paper.Path();
    path.strokeColor = "white";
    path.strokeWidth = 2;
    path.add(event.point);
}

chalk.onMouseDrag = function(event) {
    path.add(event.point);
}

function toggleBackground() {
    if (chalkboard.className === "chalkboard") {
        chalkboard.className = "whiteboard";
        path.strokeColor = "black";
    }
    else {
        chalkboard.className = "chalkboard";
        path.strokeColor = "white";
    }
}