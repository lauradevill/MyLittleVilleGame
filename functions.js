//MYLITTLEVILLE GAME

document.getElementById("messages").innerHTML = "Move the pig with your arrow keys, the goal is to move him into the house! but be carefull chickens and cows could kill you, Lets go!";

let playAgainButton = document.getElementById("playAgain")//Getting button
playAgainButton.addEventListener("click", reloadPage);

//Reload page
function reloadPage(){
    window.location.reload();
}
//Return a random number between the numbers n1 and n2
function randomNumber(n1, n2){
    let result;
    result = Math.floor(Math.random() * (n2 - n1 + 1)) + n1;
    return result;
}

//Painting Animals and Tile (ground) in canvas
let can = document.getElementById("myCanvas");//Getting canvas
let canva = can.getContext("2d");//Getting the canvas context

let ground = {
    url: "tile.png",
    loadOK: false
}
ground.image = new Image();//Instance of Image Object
ground.image.src = ground.url;//Ground image source
ground.image.addEventListener("load", loadGround);//Draw only when the image has been loaded

let cow = {
    url: "cow.png",
    loadOK: false
};
cow.image = new Image();
cow.image.src = cow.url;
cow.image.addEventListener("load", loadCow);

let pig = {
    url: "pig.png",
    loadOK: false
};
pig.image= new Image();
pig.image.src = pig.url;
pig.image.addEventListener("load", loadPig);

let chicken = {
    url: "chicken.png",
    loadOK: false
};
chicken.image = new Image();
chicken.image.src = chicken.url;
chicken.image.addEventListener("load", loadChicken);

//Loading Animals and Tile (ground)
function loadGround(){
    ground.loadOK = true;
    draw();
}

function loadCow(){
    cow.loadOK = true;
    draw();
}

function loadPig(){
    pig.loadOK = true;
    draw();
}

function loadChicken(){
    chicken.loadOK = true;
    draw();
}

//Pig firts coodinates
var xP = can.width / 2 - 50;
var yP = 1;

//DRAWING THE TILE AND THE ANIMALS

//Class to save animals (cows and chickens coodinates)
class Animal{
    constructor(coordX, coordY){
        this.coordX = coordX;
        this.coordY = coordY;
    }
}

let animals = [];//Array to save animals coordinates paited in canvas at any moment

function draw(){
    if (ground.loadOK && cow.loadOK && pig.loadOK && chicken.loadOK){

        canva.drawImage(ground.image, 0, 0);

        let nCows = randomNumber(1, 7);
        //let nPigs = randomNumber(2, 8);
        let nChicken = randomNumber(1, 7);
        console.log(nCows, nChicken);


        for (let c = 0; c < nCows; c++){
            let xC = randomNumber(0, 420);
            let yC = randomNumber(0, 420);
            canva.drawImage(cow.image, xC, yC);
            //drawLine("#102c54", xC - 1, yC - 1, xC + 1, yC + 1, canva)
            animals.push( new Animal(xC, yC) );//Saving the cow animal coordinates
        }
        for (let ch = 0; ch < nChicken; ch++){
            let xCh = randomNumber(0, 420);
            let yCh = randomNumber(0, 420);
            canva.drawImage(chicken.image, xCh, yCh);
            //drawLine("#102c54", xCh - 1, yCh - 1, xCh + 1, yCh + 1, canva)
            animals.push( new Animal(xCh, yCh) );//Saving the chicken animal coordinates
        }

        canva.drawImage(pig.image, xP, yP);//First image of the pig in canvas 
        //drawLine("#102c54", xP + 40 - 1, yP + 40 - 1, xP + 40 + 1, yP + 40 + 1, canva) 
        console.log(animals); 
    }
}

//PIG MOVEMENT
document.addEventListener("keydown", pigMove);

let keys = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40  
  };

//Pig movement function
function pigMove(event){
    let move = 10;//Pig movement
    let correction = 65;//Pixels to be rest to the canvas width and height in order to mantein the pig between tile margins
    console.log (xP, yP);
    console.log (animals);
    let animalPixels = 80;//Pixels to be add or rest to the animal coordinates in order to create a square framework
    let pigCorrection = 40;//Pixels to be add to put the pig coodinates in the center of the image
    let xPig = xP + pigCorrection;
    let yPig = yP + pigCorrection;

    for (let animal of animals){
        if (xPig >= animal.coordX && xPig <= animal.coordX + animalPixels && yPig >= animal.coordY && yPig <= animal.coordY + animalPixels){
            alert("Game Over!");
            reloadPage();
        }
    }

    if (xP < -10 || xP > can.width - correction || yP < -10 || yP > can.height - correction){
        alert("Game Over!");
        reloadPage();
    } else if (xP > 380 && yP > 380){
        alert("Goob job!");
        reloadPage();
    } else {
        switch (event.keyCode){
            case keys.LEFT:  
                canva.drawImage(pig.image, xP - move, yP);  
                xP = xP - move;
                break;
            case keys.UP:
                canva.drawImage(pig.image, xP, yP - move);  
                yP = yP - move;
                break;
            case keys.RIGHT:
                canva.drawImage(pig.image, xP + move, yP);  
                xP = xP + move;
                break;
            case keys.DOWN:
                canva.drawImage(pig.image, xP, yP + move);  
                yP = yP + move;
                break;
            default:
                alert("This key does not work!");
        }
    }
}



//Paint a line in canvas
function drawLine(color, xInitial, yInitial, xFinal, yFinal, drawingArea){
    drawingArea.beginPath();
    drawingArea.strokeStyle = color;
    drawingArea.lineWidth = 3
    drawingArea.moveTo(xInitial, yInitial);
    drawingArea.lineTo(xFinal, yFinal);
    drawingArea.stroke();
    drawingArea.closePath();
}
