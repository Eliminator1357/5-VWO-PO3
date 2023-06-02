const arraySize = 500;
var canvas;
var targetInput;
function setup() {
  const canvascontainer = document.getElementById('canvascontainer');

  canvas = createCanvas(arraySize, arraySize);
  canvas.background(255);
  canvas.parent(canvascontainer);
  
  const button = document.getElementById('start');
  button.addEventListener('click', start);

  targetInput = document.getElementById('targetInput');
  targetInput.addEventListener('change', validInputCheck);
}

function validInputCheck() {
  if (targetInput.value > 500) {
    targetInput.value = 500;
  } else if (targetInput.value < 0) {
    targetInput.value = 0;
  }
}

function start() {
  validInputCheck();
  const numArray = generateArray();
  draw_values(numArray);
  var target = targetInput.value;
  if (target === "") {
    target = Math.floor(Math.random() * 500);
  }
  if (typeof(target) ===  'string') {
    target = parseInt(target);
  }
  console.log(target, typeof(target));
  const targetIndex = binarySearch(numArray, target);
  alert(targetIndex);
}

function binarySearch(numArray, targetnum) {
  var left = 0;
  var right = numArray.length - 1;
  fill(0,255,0);
  while (left <= right) {
    visualise(numArray, left, right);
    var middle = Math.floor((left + right) / 2);
    var middlenum = numArray[middle]
    if (middlenum === targetnum) {
      return middle;
    } else if (middlenum < targetnum) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }

  
  
}

function visualise(dataArray, left, right) {
  canvas.background(255);
  fill(0,255,0);
  quad(left, 0, left, arraySize, right, arraySize, right, 0);
  draw_values(dataArray);
}

function generateArray() {
  var numarray = [];
  for (let i = 0; i < arraySize; i++) {
    numarray.push(i);
  }
  return numarray;
}

function draw_values(values) {
  stroke(0);
  values.forEach((value) => {
    line(value, 0, value, arraySize - value); // x1 y1 x2 y2
  });
}


