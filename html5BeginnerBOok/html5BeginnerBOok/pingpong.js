//$(function () {
//    $("#paddleB").css("top", "20px");
//    $("paddleA").css("top", "60px");
//});

var KEY = {
    UP: 38,
    DOWN: 40,
    W: 87,
    S: 83
}

//$(function () {
//    //listen to key down event
//    $(document).keydown(function (e) {
//        switch (e.which) {
//            case KEY.UP:
//                var top = parseInt($("#paddleB").css("top"));
//                $("#paddleB").css("top", top - 5);
//                break;
//            case KEY.DOWN:
//                var top = parseInt($("#paddleB").css("top"));
//                $("#paddleB").css("top", top + 5);
//                break;
//            case KEY.W:
//                var top = parseInt($("#paddleA").css("top"));
//                $("#paddleB").css("top", top - 5);
//                break;
//            case KEY.S:
//                var top = parseInt($("#paddleA").css("top"));
//                $("#paddleB").css("top", top + 5);
//                break;

//        }
//    })

//})

var pingpong = {
    scoreA: 0,
    scoreB: 0,
    maxScore: 5
};
pingpong.pressedKeys = [];

pingpong.ball = {
    speed: 5,
    x: 150,
    y: 100,
    directionX: 1,
    directionY: 1
}


$(function () {
    pingpong.timer = setInterval(gameloop, 30);
    $(document).keydown(function (e) {
        pingpong.pressedKeys[e.which] = true;
    });
    $(document).keyup(function (e) {
        pingpong.pressedKeys[e.which] = false;
    });

})

function gameloop() {
    movePaddles();
    moveBall();
    checkVictory();
}

function movePaddles() {
    if (pingpong.pressedKeys[KEY.UP]) { // arrow-up
        // move the paddle B up 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top - 5);
    }
    if (pingpong.pressedKeys[KEY.DOWN]) { // arrow-down
        // move the paddle B down 5 pixels
        var top = parseInt($("#paddleB").css("top"));
        $("#paddleB").css("top", top + 5);
    }
    if (pingpong.pressedKeys[KEY.W]) { // w
        // move the paddle A up 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top - 5);
    }
    if (pingpong.pressedKeys[KEY.S]) { // s
        // move the paddle A down 5 pixels
        var top = parseInt($("#paddleA").css("top"));
        $("#paddleA").css("top", top + 5);
    }
}

function moveBall() {
    var playgroundHeight = parseInt($("#playground").height());
    var playgroundWidth = parseInt($("#playground").width());
    var ball = pingpong.ball;

    //check bottom edge
    if (ball.y + ball.speed * ball.directionY > playgroundHeight) {
        ball.directionY = -1;
    }
    //top
    if (ball.y + ball.speed * ball.directionY < 0) {
        ball.directionY = 1;
    }

    //right
    if (ball.x + ball.speed * ball.directionX > playgroundWidth) {
        //player B lost, reset
        pingpong.scoreA++;
        $("#scoreA").html(pingpong.scoreA);
        ball.x = 250;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = -1;
    }




    //left
    if (ball.x + ball.speed * ball.directionX < 0) {
        //player A lost, reset
        pingpong.scoreB++;
        $("#scoreB").html(pingpong.scoreB);
        ball.x = 150;
        ball.y = 100;
        $("#ball").css({
            "left": ball.x,
            "top": ball.y
        });
        ball.directionX = 1;
    }

    ball.x += ball.speed * ball.directionX;
    ball.y += ball.speed * ball.directionY;


    var paddleAX = parseInt($('#paddleA').css("left")) + parseInt($("#paddleA").css("width"));
    
    var paddleAYBottom = parseInt($("#paddleA").css("top")) + parseInt($("#paddleA").css("height"));
    var paddleAYTop = parseInt($("#paddleA").css("top"));
    if (ball.x + ball.speed * ball.directionX < paddleAX && 
            ball.x + ball.speed >= parseInt($('#paddleA').css("left")))
    {
        if(ball.y + ball.speed*ball.directionY <= paddleAYBottom &&
            ball.y + ball.speed*ball.directionY >= paddleAYTop )
        {
            ball.directionX = 1;
        }

    }

    var paddleBX = parseInt($('#paddleB').css("left"));
    var paddleBYBottom = parseInt($("#paddleB").css("top")) + parseInt($("#paddleB").css("height"));
    var paddleBYTop = parseInt($("#paddleB").css("top"));
    if (ball.x + ball.speed * ball.directionX >= paddleBX && 
        ball.x + ball.speed * ball.directionX <= paddleBX + parseInt($("#paddleB").css("width"))) {
        if (ball.y + ball.speed * ball.directionY <= paddleBYBottom &&
            ball.y + ball.speed * ball.directionY >= paddleBYTop) {
            ball.directionX = -1;
        }
    }





    $('#ball').css({
        "left": ball.x,
        "top": ball.y
    });
}

function checkVictory() {
    if (pingpong.scoreA >= pingpong.maxScore) 
    {
        $('#game').html("Player A winz");
        return;
    }
    if (pingpong.scoreB >= pingpong.maxScore) {
        $('#game').html("Player B winz");
        return;
    }
}