// global variables
var buttons = [];
var buttonIndex = -1;
var lastPress = 0;
var level = 0;
var keyLock = true;
var cards = document.querySelectorAll(".card");

//start the game when press keyboard
document.querySelector("body").addEventListener("keydown",function(e){
    start(!e.isComposing);
});

//Event when selecting card
for(var i = 0 ; i < cards.length ; i++){
    cards[i].addEventListener("click" , function(e){
        pressCard(e.target.classList[0]);
    });
}

//start the game when keyboard pressed (call by event)
function start(keydown) {
    if(keydown === keyLock){
        keyLock = false;
        buttons = [];
        buttonIndex = -1;
        selectButton();
    }
    else{
        console.log("running");
    }
}

// Add action when player click the card
function pressCard(card){
    switch(card){
        case "green":
            pressedCard(card);
            lastPress = 0;
            checkCards();
            break;
        case "red":
            pressedCard(card);
            lastPress = 1;
            checkCards();
            break;
        case "yellow":
            pressedCard(card);
            lastPress = 2;
            checkCards();
            break;
        case "blue":
            pressedCard(card);
            lastPress = 3;
            checkCards();
            break;
    }
}

// add Animation when pressed
function pressedCard(color){
    // Animation when card pressed
    document.querySelector("." + color).classList.add("pressed");
    setTimeout(function(){
        document.querySelector("." + color).classList.remove("pressed");
    },150);

    
    // add sound to card
    pressSound(color);
}

// function to select the next button
function selectButton(){
    levelHeader(++level);
    var random = Math.floor(Math.random() * Math.floor(4));
    buttons.push(random);
    buttonIndex++;
    playButton(random);
}

// Add animation to selected button by array
function playButton(button_num){
    switch(button_num){
        case 0:
            pressedCard("green");
            break;
        case 1:
            pressedCard("red");
            break;
        case 2:
            pressedCard("yellow");
            break;
        case 3:
            pressedCard("blue");
            break;
    }
}

// function to check player selection
function checkCards(){
    if(lastPress === buttons[buttonIndex]){
        if(buttonIndex === (buttons.length - 1)){
            console.log("restart");
            buttonIndex = -1;
            setTimeout(function(){
                console.log("wait 2 sec");
                selectButton();
            },1000);

        }
        else{
            buttonIndex++;
            console.log("true");
        }
    }
    else{
        gameOver();
    }
    
}

// Game over animation function
function gameOver() {
    // game over animation
    document.querySelector("body").classList.add("gameOver");
    setTimeout(function(){
        document.querySelector("body").classList.remove("gameOver");
    },100);

    // add sound to game over
    pressSound("wrong");

    // display game over
    document.querySelector("h1").textContent = "Game Over, Press Any Key to Restart";
    keyLock = true;
    level = 0;
}

// change level header
function levelHeader(number){
    document.querySelector("h1").textContent = "Level " + number;
}

// function to add sound when pressed
function pressSound(card){
    switch(card){
        case "green":
            var green = new Audio("sounds/green.mp3");
            green.play();
            break;
        case "red":
            var red = new Audio("sounds/red.mp3");
            red.play();
            break;
        case "yellow":
            var yellow = new Audio("sounds/yellow.mp3");
            yellow.play();
            break;
        case "blue":
            var blue = new Audio("sounds/blue.mp3");
            blue.play();
            break; 
        case "wrong":
            var wrong = new Audio("sounds/wrong.mp3");
            wrong.play();
            break; 
    }
}