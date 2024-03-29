let canvas = document.getElementById('lifeCanvas');
let canvasHeight = 0;
let canvasWidth = 0;
let tileSize = 16;

let grid = [];
let newGrid = [];

let gameActive;
let gameSpeed;
let generations;

//Initialization of PaperJS and attaching to canvas
paper.install(window);

window.onload = (event) => {
    paper.setup(canvas);
    canvasHeight = paper.view.size.height;
    canvasWidth = paper.view.size.width; 
    startGame();
};

//Initializes snake
function startGame() {

    //Clear paper canvas
    paper.project.clear();
    //Reset score
    // score = 0;
    // if (document.getElementById('gameoverPanel').className === 'active') {
    //     document.getElementById('gameoverPanel').classList.toggle('active');
    // }
    // document.getElementById('score').innerHTML = "Score <strong class='score'>0</strong>";

    //Reset other variables
    gameActive;
    gameSpeed = '200';
    generations = 0;
    // clearInterval(gameActive);

    //Generate initial dead cells
    // for (let i = 0; i < (canvasWidth/tileSize); i++) {
    //     grid[i] = [];
    //     for (let j = 0; j < (canvasHeight/tileSize); j++) {
    //         grid[i][j] = 0;
    //     }
    // }
    // grid[20][12] = 1;
    // grid[20][13] = 1;
    // grid[20][14] = 1;
    // grid[21][12] = 1;
    // grid[21][13] = 1;
    // grid[21][14] = 1;
    // grid[22][12] = 1;
    // grid[22][13] = 1;
    // grid[22][14] = 1;
    
    //Generate random seed
    for (let i = 0; i < (canvasWidth/tileSize); i++) {
            grid[i] = [];
            for (let j = 0; j < (canvasHeight/tileSize); j++) {
                let random = Math.floor(Math.random()*2);
                if (random == 1) {
                    grid[i][j] = "alive";
                }
                else {
                    grid[i][j] = "dead";
                }
            }
        }

    renderCells();

    //Initialize pace of game
    gameActive = setInterval(function(){ 
        evolve(); 
    }, gameSpeed);
}

// function onMouseDown(event) {
//     //path = new Path();
//     //path.strokeColor = "white";
//     //path.strokeWidth = 2;
//     //path.add(event.point);
//   }

//   function onMouseMove(event) {
//     graphGenerator(event.point);
//   }

//   function onMouseUp(event) {

//   }

function evolve() {
    //update values
    newGrid = [];

    for (let i = 0; i < grid.length; i++) {
        newGrid[i] = [];
        for (let j = 0; j < grid[i].length; j++) {
            let neighbors = checkNeighbors(i,j);
            
            //Fade
            if (grid[i][j] == "dying8") {
                newGrid[i][j] = "dying8";
            }
            else if (grid[i][j] == "dying7") {
                newGrid[i][j] = "dying7";
            }
            else if (grid[i][j] == "dying6") {
                newGrid[i][j] = "dying6";
            }
            else if (grid[i][j] == "dying5") {
                newGrid[i][j] = "dying5";
            }
            else if (grid[i][j] == "dying4") {
                newGrid[i][j] = "dying4";
            }
            else if (grid[i][j] == "dying3") {
                newGrid[i][j] = "dying3";
            }
            else if (grid[i][j] == "dying2") {
                newGrid[i][j] = "dying2";
            }
            else if (grid[i][j] == "dying1") {
                newGrid[i][j] = "dying1";
            }
            else if (grid[i][j] == "dying0") {
                newGrid[i][j] = "dying0";
            }

            //Is cell  alive?
            if (grid[i][j] == "alive") {
                //Cell dies
                if (neighbors < 2) {
                    newGrid[i][j] = "dead";
                }

                //Cell lives
                if (neighbors === 2) {
                    newGrid[i][j] = "alive";
                }

                //Cell lives
                if (neighbors === 3) {
                    newGrid[i][j] = "alive";
                }

                //Cell overpopulated
                if (neighbors > 3) {
                    newGrid[i][j] = "dead";
                }
            }
            //No
            else {
                //Cell ressurected
                if (neighbors === 3) {
                    newGrid[i][j] = "alive";
                }
            }
        }
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = newGrid[i][j];
        }
    }

    //Render cells
    renderCells();

    generations++;
    document.getElementById('generations').innerHTML = "<strong>"+generations+"</strong> Generations";
}

function renderCells() {
    paper.project.clear();
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let x = (i*tileSize) + (tileSize/2);
            let y = (j*tileSize) + (tileSize/2);
            let point = new Point(x,y);
            let cell;
            if (grid[i][j] === "dead") {
                cell = new Path.Circle(point, tileSize/2.2);
                cell.fillColor = 'rgba(255,255,255,0.9)';  
                grid[i][j] = "dying8";
            }
            else if (grid[i][j] === "dying8") {
                cell = new Path.Circle(point, tileSize/2.4);
                cell.fillColor = 'rgba(255,255,255,0.8)'; 
                grid[i][j] = "dying7";
            }
            else if (grid[i][j] === "dying7") {
                cell = new Path.Circle(point, tileSize/2.6);
                cell.fillColor = 'rgba(255,255,255,0.7)'; 
                grid[i][j] = "dying6";
            }
            else if (grid[i][j] === "dying6") {
                cell = new Path.Circle(point, tileSize/2.8);
                cell.fillColor = 'rgba(255,255,255,0.6)'; 
                grid[i][j] = "dying5";
            }
            else if (grid[i][j] === "dying5") {
                cell = new Path.Circle(point, tileSize/3);
                cell.fillColor = 'rgba(255,255,255,0.5)'; 
                grid[i][j] = "dying4";
            }
            else if (grid[i][j] === "dying4") {
                cell = new Path.Circle(point, tileSize/3.2);
                cell.fillColor = 'rgba(255,255,255,0.4)';  
                grid[i][j] = "dying3";
            }
            else if (grid[i][j] === "dying3") {
                cell = new Path.Circle(point, tileSize/3.4);
                cell.fillColor = 'rgba(255,255,255,0.3)';  
                grid[i][j] = "dying2";
            }
            else if (grid[i][j] === "dying2") {
                cell = new Path.Circle(point, tileSize/3.6);
                cell.fillColor = 'rgba(255,255,255,0.2)';  
                grid[i][j] = "dying1";
            }
            else if (grid[i][j] === "dying1") {
                cell = new Path.Circle(point, tileSize/3.8);
                cell.fillColor = 'rgba(255,255,255,0.1)';  
                grid[i][j] = "dying0";
            }
            else if (grid[i][j] === "dying0") {
                
            }
            else if (grid[i][j] === "alive")  {  
                cell = new Path.Circle(point, tileSize/2);    
                cell.fillColor = 'rgba(255,255,255,1)'; 
            } 
        }
    }
}

function checkNeighbors(x,y) {
    let neighbors = 0;
    
    if (x > 0) {
        //west
        if (grid[x-1][y] == "alive") {
            neighbors++;
        }
    }
    if (x < grid.length-1) {
        //east
        if (grid[x+1][y] == "alive") {
            neighbors++;
        }
    }
    if (y > 0) {
        //north
        if (grid[x][y-1] == "alive") {
            neighbors++;
        }
    }
    if (y < grid[x].length-1) {
        //south
        if (grid[x][y+1] == "alive") {
            neighbors++;
        }
    }
    if (x > 0 && y > 0) {
        //northwest
        if (grid[x-1][y-1] == "alive") {
            neighbors++;
        }
    }
    if (x < grid.length-1 && y < grid[x].length-1) {
        //southeast
        if (grid[x+1][y+1] == "alive") {
            neighbors++;
        }
    }
    if (x > 0 && y < grid[x].length-1) {
        //southwest
        if (grid[x-1][y+1] == "alive") {
            neighbors++;
        }  
    }
    if (x < grid.length-1 && y > 0) {
        //southwest
        if (grid[x+1][y-1] == "alive") {
            neighbors++;
        }  
    }    
    
    return neighbors;
}