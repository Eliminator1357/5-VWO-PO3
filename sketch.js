const arraySize = 10**3;
const repeats = 2**25;
var canvas;
var targetInput;
var target;
var nextStep;
var numArray = [];
var startTimeRecursive, startTimeIterative, endTimeRecursive, endTimeIterative, startTimeUniform, endTimeUniform;
var lookup_table = new Array(arraySize);
lookup_table.fill(0);
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
  for (let i = 0; i < repeats; i++) {
  var targetIndexI = binarySearchRecursive(numArray, target);
  }
  endTimeRecursive = window.performance.now();
  startTimeIterative = window.performance.now();
  for (let i = 0; i < repeats; i++) {
    var targetIndexR = binarySearchIterative(numArray, target);
  }
  endTimeIterative = window.performance.now();
  create_lookup_table(arraySize);
  startTimeUniform = window.performance.now();
  for (let i = 0; i < repeats; i++) {
    var targetIndexU = binarySearchUniform(numArray, target);
  }
  endTimeUniform = window.performance.now();

  var dtIterative = endTimeIterative - startTimeIterative;
  var dtRecursive = endTimeRecursive - startTimeRecursive;
  var dtUniform = endTimeUniform - startTimeUniform;
  var avgTimeIterative = dtIterative / repeats;
  var avgTimeRecursive = dtRecursive / repeats;
  var avgTimeUniform = dtUniform / repeats;

  //draw_values(numArray, target, target);
  
  const result = document.getElementById('result');
  //console.log(targetIndex);
  const min = Math.min(avgTimeIterative, avgTimeRecursive, avgTimeUniform);
  if (avgTimeIterative === min) {
    var fastest = 'Iterative';
  } else if (avgTimeRecursive === min) {
    var fastest = 'Recursive';
  } else {
    var fastest = 'Uniform';
  }
  result.innerHTML = `${targetIndexI} ${targetIndexR} ${targetIndexU}<br>
  Recursive took ${avgTimeRecursive} ms.<br>
  Iterative took ${avgTimeIterative} ms.<br>
  Uniform took ${avgTimeUniform} ms. <br>
  Iterative is ${avgTimeRecursive / avgTimeIterative} times faster than recursive.<br>
  Uniform is ${avgTimeIterative / avgTimeUniform} times faster than Iterative.<br>
  Uniform is ${avgTimeRecursive / avgTimeUniform} times faster than Recursive.<br>
  ${fastest} is the fastest variant.`;
  

}


/* Iteratief */

function binarySearchIterative(numArray, targetnum) {
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


/* Uniform */

function create_lookup_table(n) {
  let power = 1;
  let count = 0;
  while (true) {
    power = power * 2
    lookup_table[count] = Math.floor((n + (power >> 1)) / power);
    if (lookup_table[count] == 0) {
      break;
    }
    count++;
  }
}

function binarySearchUniform(numArray, target) {
  let index = lookup_table[0] - 1;
  let count = 0;
  while (lookup_table[count] != 0) {
    if (target === numArray[index]) {
      return index
    } else if (target < numArray[index]) {
      count++;
      index -= lookup_table[count]
    } else {
      count++;
      index += lookup_table[count]
    }
  }
  return index;
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