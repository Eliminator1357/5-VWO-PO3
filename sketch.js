const arraySize = 500;
var canvas;
var targetInput;
var target;
var nextStep;
var numArray = [];
var waitUntilNextStep = false;
function setup() {
  const canvascontainer = document.getElementById('canvascontainer');

  canvas = createCanvas(arraySize, 500);
  canvas.background(0);
  canvas.parent(canvascontainer);
  
  const button = document.getElementById('start');
  button.addEventListener('click', start);

  targetInput = document.getElementById('targetInput');
  targetInput.addEventListener('change', validInputCheck);
}

function validInputCheck() {
  var target = targetInput.value;
  if (target === "") {
    target = Math.floor(Math.random() * 500);
  }
  if (typeof(target) ===  'string') {
    target = parseInt(target);
  }
  if (target > arraySize-1) {
    target = arraySize - 1;
  } else if (target < 0) {
    target = 0;
  }
  return target;
}

function start() {
  generateArray();
  draw_values(numArray);

  target = validInputCheck();
  draw_values(numArray, target, target);

  const targetIndex = binarySearch(numArray, target);
  alert(numArray[targetIndex]);
}

function binarySearch(numArray, targetnum) {
  var left = 0;
  var right = numArray.length - 1;
  while (left <= right) {
    var middle = Math.floor((left + right) / 2);
    var middlenum = numArray[middle]
    if (middlenum === targetnum) {
      return middle;
    } else if (middlenum < targetnum) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
    waitUntilNextStep = true;
    
  }
}

function generateArray() {
  for (let i = 0; i < arraySize; i++) {
    numArray.push(i);
  }
}

function draw_values(values, left, right) {
  values.forEach((value) => {

    if (value >= left && value <= right) {
      stroke(0,255,0);
    } else {
      stroke(255,255,255);
    }
    line(value, arraySize, value, arraySize - value); // x1 y1 x2 y2
  });
}