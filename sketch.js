var balloon;
var database, balloonposition;

function preload(){
backgroundImg = loadImage("cityImage.png");
hotairballoon = loadAnimation("hotairballoon1.png", "hotairballoon3.png", "hotairballoon1.png")
balloonImg1 = loadImage("hotairballoon2.png");
balloonImg2 = loadImage("hotairballoon3.png");
balloonImg3 = loadImage("hotairballoon1.png");

}

function setup() {
  createCanvas(1000,641);
  database = firebase.database();
  balloon = createSprite(400, 300, 50, 50);
  balloon.addAnimation("flying",hotairballoon);
  balloon.scale = 0.7;
  var ballposition = database.ref("balloon/position");
ballposition.on("value", readPosition, showError);
}

function draw() {
  background(backgroundImg); 
  strokeWeight(2);
  stroke("lightgreen");
  fill("blue");
  textSize(20);
  text("Use the 4 arrow keys to move the Hot Air Balloon", 30, 30);

  if(keyDown(LEFT_ARROW)){
  writePosition(-10, 0);
  balloon.addAnimation("hotairballoon", balloonImg1);
  }

  if(keyDown(RIGHT_ARROW)){
    writePosition(10, 0);
    balloon.addAnimation("hotairballoon", balloonImg2);                                                              
  }

  if(keyDown(UP_ARROW)){
    writePosition(0, -10);
    balloon.addAnimation("hotairballoon", balloonImg3); 
    balloon.scale = balloon.scale-0.02;                                                       
  }

  if(keyDown(DOWN_ARROW)){
    writePosition(0, 10);
    balloon.addAnimation("hotairballoon", balloonImg1);     
    balloon.scale = balloon.scale+0.02;                                                           
  }

  drawSprites();
}

function readPosition(data){
position = data.val();
balloon.x = position.x;
balloon.y = position.y;
}

function writePosition(x, y){
database.ref('balloon/position').set({
  'x': balloon.x + x,
  'y': balloon.y + y,
})
}

function showError(){
  console.log("error");
}