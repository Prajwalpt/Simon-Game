//empty array to store chosen colors
var gamepattern = [];

//color sequence
var buttonColors = ["red","blue","green","yellow"];

//stores id of clicked buttons by user
var userClickedPattern = []

//to start from level 0
var started = false;
var level = 0;

//using any key
$(document).keydown(function (){
    if (!started) {
        $("#level-title").text("Level",level);
        nextSequence();
        started = true; //once started set to true so that loop stops
    }
})

$(".btn").click(function (){
  //Inside the handler, create a new variable called userChosenColour 
  // to store the id of the button that got clicked.
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

$("body").addClass("background");

function checkAnswer(currentLevel){
    //step 1:
    if(gamepattern[currentLevel] === userClickedPattern[currentLevel] ){
        console.log("success");
      
        //If the user got the most recent answer right in step 1, 
        // then check that they have finished their sequence with another if statement.
        
        if(userClickedPattern.length === gamepattern.length){    
            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
        Winner(currentLevel);
    }
    else{
        console.log("wrong");

        playSound("wrong");

        $("body").addClass("game-over");
        $("body").removeClass("background");

        setTimeout(() => {
            $("body").removeClass("game-over");
            $("body").fadeOut().fadeIn();
        }, 1000);

        $("#level-title").text("Game Over");
        setTimeout(() => {
            $("#level-title").text("Press Any key to restart").css("color","white");
            $("body").addClass("background");
        }, 1000);
        
        startOver();
    }

}

function nextSequence(){

    //reset once nextSequence is called
    userClickedPattern = []

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    // console.log(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];
    // console.log(randomChosenColor);

    gamepattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);  
    
    playSound(randomChosenColor);
}


//plays sound
function playSound(name){
    var audio = new Audio("sounds\\"+name+".mp3");
    audio.play();
}

//for animations
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
    //for animation
    var delayInMilliseconds = 100; //1 second
    setTimeout(function() {
        //your code to be executed after 1 second
        $("#" + currentColor).removeClass("pressed");
    }, delayInMilliseconds);
}

function startOver(){
    level = 0;
    gamepattern = [];
    started = false;
}

function Winner(currentLevel){
    if(currentLevel===10){
        $("#level-title").text("Winner!! You Cleared Level" + currentLevel).css("color","white");
        var win = new Audio("sounds\\victory.mp3");
        win.play(); 
        
        startOver();
    }
}