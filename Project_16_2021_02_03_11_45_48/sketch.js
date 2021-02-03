var PLAY = 1;
var END = 0;

var gameState = PLAY;

var monkey , monkey_running;
var bananaImage;
var obstacleImage;
var FoodGroup, obstacleGroup;
var ground;
var score;
var survivalTime = 0;

function preload(){
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}



function setup() {
  createCanvas(400, 400);
  
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
  monkey = createSprite(80, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400, 350, 900, 10);
  ground.velocityX = -4;
}


function draw() {
  background("white");
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
  monkey.velocityY = monkey.velocityY + 0.8;
  
  monkey.collide(ground);
  
  if(keyDown("space")&& monkey.y >= 250) {
      monkey.velocityY = -12;
    }
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);
  
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/getFrameRate());
  text("Survival Time:" + survivalTime, 100, 50);
  
  food();
  spawnObstacles();
  drawSprites();
  reset();
}

function food(){
  if (frameCount %80 === 0){
    banana = createSprite(400, 200, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -8;  
    banana.setLifetime = 50;
    
    FoodGroup.add(banana);
  }
}

function spawnObstacles(){
  if (frameCount %300 === 0){
    var obstacle = createSprite(400,325,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacleImage);
    
    obstacle.scale = 0.12;
    obstacle.lifetime = 400/6;
    obstacleGroup.add(obstacle);
  }
}
function reset(){
  if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
  
  if(gameState === END){
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
    survivalTime = 0;
  }
}

