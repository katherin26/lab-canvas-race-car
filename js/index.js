window.onload = () => {
  document.getElementById("start-button").onclick = () => {
    startGame();
  };

  function startGame() {}
};

let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight - 100;

let carImage = new Image();
carImage.src = "./images/car.png";
carImage.onload = carDrawing;

function drawRoad() {
  ctx.fillStyle = "green";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "grey";
  ctx.fillRect(150, 0, canvas.width - 200, canvas.height);
}

let ly = 0;
function drawLine() {
  ctx.fillStyle = "white";
  lines.forEach((line) => {
    ctx.fillRect(line.x, (line.y += 3), line.w, line.h);
  });
}

let lines = [];
setInterval(function () {
  let line = {
    x: canvas.width / 2.5,
    y: 0,
    w: 10,
    h: 50,
    color: "#" + (((1 << 24) * Math.random()) | 0).toString(16),
  };
  lines.push(line);
  //console.log(lines)
}, 1000);

function drawObstacles() {
  obstacles.forEach((obstacle) => {
    ctx.fillStyle = obstacle.color;
    ctx.fillRect(obstacle.x, (obstacle.y += 3), obstacle.w, obstacle.h);
    detectCollision(obstacle);
  });
}

let obstacles = [];

setInterval(function () {
  let obstacle = {
    x: Math.random() * canvas.width,
    y: 0,
    w: Math.random() * canvas.width,
    h: 50,
    color: "red",
  };
  obstacles.push(obstacle);
}, 2222);

let animateId;
function detectCollision(obs) {
  // var rect1 ={x:5, y:5, width:50, height:50}
  // var rect2 ={x:20, y:10, width:10, height:10}
  if (
    obs.x < car.x + car.w &&
    obs.x + obs.w > car.x &&
    obs.y < car.y + car.h &&
    obs.y + obs.h > car.y
  ) {
    console.log("Colision detected!");
    window.cancelAnimationFrame(animateId);
  }
}

function detectBulletCollision(obs) {
  if (
    obs.x < car.x + car.w &&
    obs.x + obs.w > car.x &&
    obs.y < car.y + car.h &&
    obs.y + obs.h > car.y
  ) {
    console.log("Colision detected!");
    window.cancelAnimationFrame(animateId);
  }
}

function carDrawing() {
  ctx.drawImage(carImage, car.x, car.y, car.w, car.h);
}

let car = {
  x: canvas.width / 2,
  y: canvas.height - 120,
  w: 70,
  h: 120,
};

document.onkeydown = function (e) {
  console.log(e.key);
  switch (e.key) {
    case "ArrowUp":
      car.y -= 15;
      break;
    case "ArrowLeft":
      car.x -= 15;
      break;
    case "ArrowDown":
      car.x += 15;
      break;
    case "ArrowRight":
      car.x += 15;
      break;
    case " ":
      shoot();
      break;
    // case 'ArrowUp'   : console.log('You hit Up!!');
    // break;
    // case 'ArrowLeft' : console.log('You hit Left!!');
    // break;
    // case 'ArrowDown' : console.log('You hit Down!!');
    // break;
    // case 'ArrowRight': console.log('You hit Right!!');
    // break;
  }
  //console.log(car);
};

let bullets = [];
function shoot() {
  console.log("Shoooot!");
  if (bullets.length > 10) {
    console.log("Out of Ammo");
    return;
  }

  let bullet = {
    x: car.x + car.w / 2,
    y: car.y,
    w: 10,
    h: 5,
  };
  bullets.push(bullet);
}

function drawBullets() {
  ctx.fillStyle = "white";
  bullets.forEach((bullet) => {
    ctx.fillRect(bullet.x, (bullet.y -= 5), bullet.w, bullet.h);
  });
}

function animate() {
  animateId = window.requestAnimationFrame(animate);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawRoad();
  drawLine();
  drawObstacles();
  carDrawing();
  drawBullets();
}

window.requestAnimationFrame(animate);
