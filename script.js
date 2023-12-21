//step 1 - When the key is pressed - we want the game to start
//step 2 - As soon as the key is pressed - randomly a button flashes and the level goes up
//Step 3 - When the user presses the button - check wether it is identical to the gameSequence

//Step 1 
let gameSequence = [];
let userSequence = [];

let gameStarted = false; //Initially when the browser is loaded - gameStarted is false
let level = 0; //And level is initially set to 0

let colors = ["red", "green", "blue", "yellow"]

let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
    if (gameStarted == false) {
        console.log("Game started!")
        gameStarted = true;

        levelUp();
    }
})

//Step 2 
function levelUp() {
    //Here we are resetting the sequence of the user to 0 so that for after every level they also have to press the colors from the previous level
    userSequence = [];
    // Increment the level
    level++;
    // Update the displayed level in the <h3> tag
    h3.innerText = `Level ${level}`;

    // Choose a random button to flash
    let ran = Math.floor(Math.random() * 4); // Generates a random number between 0-3
    let randomColor = colors[ran]; //Retrieves the color corresponding to the randomly chosen number from the colors array.
    // Find the corresponding button using the randomly chosen color
    let randBtn = document.querySelector(`.${randomColor}`); // Uses the randomly chosen color to select the corresponding button from the HTML document using document.querySelector()

    //After the random color is generated, we will push it into gameSequence
    gameSequence.push(randomColor);
    console.log(gameSequence);

    // Flash the chosen button
    btnFlash(randBtn); //Calls the btnFlash() function, passing the randomly chosen button as an argument. This function is responsible for visually flashing the button.
}

function btnFlash(btn) {
    //Adding the class flash whenever the button is pressed
    btn.classList.add("flash");

    //Removing the flash class in .7sec
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}


//We have used btn in both function buttonPressed() and buttonFlash()
//It will not clash because they are declared in different functions and has a function scope

//Step 3 
//Button that is pressed by the user
function buttonPressed(){ 
    let btn = this;
    btnFlash(btn);
    
    userColor = btn.getAttribute("id");
    userSequence.push(userColor);

    checkAnswer(userSequence.length-1); //Here we are doing -1 as we have to access the index of an array which will be one less than the level the user is currently on
}


function checkAnswer(indx){
    //The content in the array is similar or not
    if(userSequence[indx] === gameSequence[indx]){ //This if statement is checking if the array of GameSequence and userSequence are same or not
        //If both the content and length are same then the level will go up otherwise it won't
        if(gameSequence.length == userSequence.length){ //If the length of the array of the gameSequence is same as the userSequence then the level will go up
            setTimeout(levelUp,750 );//Adding one second interval between when the user presses the button and when the game is flashing a random square
        }
    }
    else{
        h3.innerText = "Game over! Press any key to start again!";
        reset(); //This will reset the game when the game is over
    }
}

let allButtons = document.querySelectorAll(".square"); //Selecting the class with all the buttons
for(btn of allButtons){
    btn.addEventListener("click", buttonPressed);
}

function reset(){
    gameStarted = false;
    level = 0;
    userSequence = [];
    gameSequence = [];
}