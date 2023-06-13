const arraySize = 10**3;
var canvas;
var targetInput;
var target;
var nextStep;
var numArray = [];
var startTimeRecursive, startTimeIterative, endTimeRecursive, endTimeIterative;
function setup() {
  const canvascontainer = document.getElementById('canvascontainer');

  canvas = createCanvas(500, 500);
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
    target = Math.floor(Math.random() * arraySize);
  }
  if (typeof (target) === 'string') {
    target = parseInt(target);
  }
  if (target > arraySize - 1) {
    target = arraySize - 1;
  } else if (target < 0) {
    target = 0;
  }
  return target;
}

function start() {
  generateArray();
  //draw_values(numArray);

  target = validInputCheck();
  //draw_values(numArray, target, target);
  startTimeRecursive = window.performance.now();
  for (let i = 0; i < 2**25; i++) {
  var targetIndex = binarySearchRecursive(numArray, target);
  }
  endTimeRecursive = window.performance.now();
  startTimeIterative = window.performance.now();
  for (let i = 0; i < 2**25; i++) {
    var targetIndex = binarySearch(numArray, target);
  }
  endTimeIterative = window.performance.now();
  
  //draw_values(numArray, target, target);
  
  const result = document.getElementById('result');
  console.log(targetIndex);
  result.innerHTML = `${targetIndex}<br>
  Recursive took ${(endTimeRecursive - startTimeRecursive) / 2**25} ms.<br>
  Iterative took ${(endTimeIterative - startTimeIterative) / 2**25} ms.<br>
  Iterative is ${((endTimeRecursive - startTimeRecursive) / 2**25)/((endTimeIterative - startTimeIterative) / 2**25)} times faster.`;
}


/* Iteratief */

function binarySearch(numArray, targetnum) {
  var left = 0;
  var right = numArray.length - 1;
  while (left <= right) {
    var middle = Math.floor((left + right) / 2);
    var middlenum = numArray[middle]
    //draw_values(numArray, left, right);

    if (middlenum === targetnum) {
      return middle;
    } else if (middlenum < targetnum) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }

  }
}

/* Recursief */

function binarySearchRecursive(numArray, target, start = 0, end = numArray.length - 1) {
  if (start > end) {
    return -1;
  }
  const mid = Math.floor((start + end) / 2);
  if (numArray[mid] === target) {
    return mid;
  }
  if (numArray[mid] > target) {
    return binarySearchRecursive(numArray, target, start, mid - 1);
  }
  return binarySearchRecursive(numArray, target, mid + 1, end);
}





function generateArray() {
  numArray = [];
  for (let i = 0; i < arraySize; i++) {
    numArray.push(i);
  }
}

function draw_values(values, left, right) {
  values.forEach((value) => {

    if (value >= left && value <= right) {
      stroke(0, 255, 0);
    } else {
      stroke(255, 255, 255);
    }
    line(value, arraySize, value, arraySize - value); // x1 y1 x2 y2
  });
}