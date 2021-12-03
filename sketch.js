var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed_the_dog;


//create feed and lastFed variable here
var feed;
var lastFed

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here
  feed_the_dog = createButton("alimentar Tótó");
  feed_the_dog.position(680,95);
  feed_the_dog.mousePressed(feedDog)
  
  
  addFood=createButton("Adicionar Comida");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escreva o código para ler o valor do fedtime do banco de dados
  FeedTime = database.ref('FeedTime');
  FeedTime.on("value",function(data){
    lastFed = data.val();
  })
 
  //escreva o código para exibir o texto da hora do último feed aqui
  textSize(15);
  fill("black");
  if(lastFed>=12){
    text("ultima refeição: "+ lastFed%12 +" tarde/noite",200,30);
  }else if(lastFed == 0){
  text("ultima refeição 12 AM",200,30);
  }else{
    text("ultima refeição: "+ lastFed +" da manhã",200,30); 
  }

  

  drawSprites();
}

//função para ler estoque de alimentos
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escreva o código aqui para atualizar o estoque de alimentos e o horário da última alimentação
var food_stock_val = foodObj.getFoodStock();
  if (food_stock_val <= 0 ) {
    foodObj.updateFoodStock(food_stock_val*0);
  } else {
    foodObj.updateFoodStock(food_stock_val-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//função para adicionar comida no estoque
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
