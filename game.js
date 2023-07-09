
var buttonColors=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];
var started=false;
var level=0;

$(document).keydown(function(){

    if(started==false){
        $("#level-title").text("Level " + level);
        nextSequence();
        started=true;
    }
});

$(".btn").click(function() {

    var userChosenColor=this.id;
    userClickedPattern.push(userChosenColor);

    //console.log(userClickedPattern);
    make_sound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(userClickedPattern.length-1)

});

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      //console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      wrong_Answer();

    }

}

function wrong_Answer(){

    var audio =new Audio("sounds/wrong.mp3");
    audio.play();

    $("h1").text("Game over,press any key to restart");

    $("body").addClass("game-over");

    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    started=false;
    level=0;
    gamePattern=[];
}

function nextSequence() {

    userClickedPattern=[];
    //4. Inside nextSequence(), increase the level by 1 every time nextSequence() is called.
    level++;
  
    //5. Inside nextSequence(), update the h1 with this change in the value of level.
    $("#level-title").text("Level " + level);
  
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    gamePattern.push(randomChosenColour);
  
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    make_sound(randomChosenColour);
  }
  

function make_sound(color){

    switch (color) {
        case "red":
            var audio=new Audio("sounds/red.mp3");
            audio.play();
            break;
        
        case "blue":
            var audio=new Audio("sounds/blue.mp3");
            audio.play();
            break;
        
        case "green":
            var audio=new Audio("sounds/green.mp3");
            audio.play();
            break;

        case "yellow":
            var audio=new Audio("sounds/yellow.mp3");
            audio.play();
            break;
        default:
            var audio=new Audio("sounds/wrong.mp3");
            audio.play();
            break;
    }
}

function animatePress(currentColor){

    $("#"+currentColor).addClass("pressed");


    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    },100);
}