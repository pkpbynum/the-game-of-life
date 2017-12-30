//Peter Bynum

let rows, cols, mainArray, state, res, prnt, chld, cnvs;



function make2DArray(cols, rows) {
  let arr = new Array(cols);
  for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(rows);
  }
  return arr;
}


function setup() {
  frameRate(10);
  parent = select('#coding-wrap');
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(parent);
  res = width / 30.0;
  cols = floor(width / res)+1;
  rows = floor(height / res)+2;
  mainArray = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      mainArray[i][j] = floor(random(2));
    }
  }
}


function draw() {
  rectMode(CENTER);
  background(0);
  fill(57, 92, 107);
  stroke(57, 92, 107);
  let newArray = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {

      let state = mainArray[i][j];

      //Draw each cell
      if (state==1) {
        x = i * res;
        y = j * res;
        rect(x, y, res, res);
      }

      //create newArray and copy it into mainArray
      let neighbors = countNeighbors(i, j, state);

      if (state==1 && (neighbors < 2 || neighbors > 3)) {//if alive but not enough/too many neighbors
        newArray[i][j] = 0;
      } else if (state==0 && (neighbors==3)) {
        newArray[i][j] = 1;
      } else {
        newArray[i][j] = mainArray[i][j];
      }
    }
  }
  mainArray = newArray;
}


//Counts the neighbors of a cell
function countNeighbors(x, y, state) {
  let sum = 0 - state;
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = ((i + x + cols) % cols);
      let row = ((j + y + rows) % rows);
      sum += mainArray[col][row];
    }
  }
  return sum;
}

//Creates life on cells over which the cursor travels
function mouseMoved() {
  i = floor((mouseX + 10) / res);
  j = floor((mouseY + 10) / res);
  mainArray[i][j] = 1;
}

//Resets mainArray and newArray to match browser window size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  res = (width) / 30.0;
  cols = floor(width / res)+1;
  rows = floor(height / res)+2;
  mainArray = make2DArray(cols, rows);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      mainArray[i][j] = floor(random(2));
    }
  }
}
