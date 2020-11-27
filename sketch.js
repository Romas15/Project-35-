var dog, happyDog, dogIM, database, foodS, foodStock;

function preload() {
  dogIM = loadImage("Dog.png");
  happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  dog = createSprite(200, 250, 30, 20);
  dog.addImage(dogIM);
  dog.scale = 0.1;

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
}

function draw() {
  background(46, 139, 87);

  if (keyWentDown(UP_ARROW)) {
    writeStock(foodStock);
    dog.addImage(happyDog);
  }

  drawSprites();
  textSize(15);
  fill("blue");
  stroke("red");
  text("Note: Press the Up Arrow to Feed Drago Milk!!", 80, 70);
  text("Food Remaining : " + foodStock, 120, 200);
}

function readStock(data) {
  foodStock = data.val();
}

function writeStock(x) {
  if (x <= 0) {
    x = 0;
  } else {
    x = x - 1;
  }

  database.ref("/").update({
    Food: x,
  });
}
