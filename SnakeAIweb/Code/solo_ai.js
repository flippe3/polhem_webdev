// JavaScript Document
//snake.dir(x, y);
//snake_dir 1 == down
//snake_dir -1 == up
//snake_dir 2 == right
//snake_dir -2 == left
var crashed = false;
var past_lengths = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
var divider = 0;
var shorter__multiplier = 0;
var longer_multiplier = 0;
var same_multiplier = 14;
var sum = 0;
function simple_ai()
{
    if(foodY < snakeY[0] && snake_dir != 1 && !check_up())
    {
	snake_dir = -1;
	snake.dir(0, -1);
    }	
    else if(foodY > snakeY[0] && snake_dir != -1 && !check_down())
    {
	snake_dir = 1;
	snake.dir(0, 1);
    }
    else if(foodX > snakeX[0] && snake_dir != -2 && !check_right())
    {
	snake_dir = 2;
	snake.dir(1, 0);
    }
    else if(foodX < snakeX[0] && snake_dir != 2 && !check_left())
    {
	snake_dir = -2;
	snake.dir(-1, 0);
    }
}
function dodge()
{
    crashed = false;
    for(var i = 0; i < snake_length; i++)
    {
	if(snake_dir === 1 && check_down())
	{
            crashed = true;
	    if(!check_left())
	    {
		snake_dir = -2;
		snake.dir(-1, 0);
                console.log("Going left");
	    }
	    else if(!check_right())
	    {
		snake_dir = 2;
		snake.dir(1, 0);
                console.log("Going right");
	    }
	}
	else if(snake_dir === -1 && check_up())
	{
            crashed = true;
	    if(!check_left())
	    {
		snake_dir = -2;
		snake.dir(-1, 0);
                console.log("Going left");
	    }
	    else if(!check_right())
	    {
		snake_dir = 2;
		snake.dir(1, 0);
                console.log("Going right");
	    }
	}
	else if(snake_dir === -2 && check_left())
	{
            crashed = true;
	    if(!check_up())
	    {
		snake_dir = -1;
		snake.dir(0, -1);
                console.log("Going up");
	    }
	    else if(!check_down())
	    {
		snake_dir = 1;
		snake.dir(0, 1);
                console.log("Going down");
	    }
	}
	else if(snake_dir === 2 && check_right())
	{
            crashed = true;
	    if(!check_up())
	    {
		snake_dir = -1;
		snake.dir(0, -1);
                console.log("Going up");
	    }
	    else if(!check_down())
	    {
		snake_dir = 1;
		snake.dir(0, 1);
                console.log("Going down");
	    }
	}
    }
}

function avoid_walls()
{
    if(snake_dir === -1 && snakeY[0] - 20 === 0)
    {
        if(!check_left())
	{
	    snake_dir = -2;
	    snake.dir(-1, 0);
            console.log("Going left");
	}
	else if(!check_right())
	{
	    snake_dir = 2;
	    snake.dir(1, 0);
            console.log("Going right");
	}
    }
    else if(snake_dir === 1 && snakeY[0] + 20 === 580)
    {
        if(!check_left())
	{
	    snake_dir = -2;
	    snake.dir(-1, 0);
	}
	else if(!check_right())
	{
	    snake_dir = 2;
	    snake.dir(1, 0);
	}
    }
    if(snake_dir === 2 && snakeX[0] + 20 === 580)
    {
        if(!check_up())
	{
	    snake_dir = -1;
	    snake.dir(0, -1);
	}
	else if(!check_down())
	{
	    snake_dir = 1;
	    snake.dir(0, 1);
	}
    }
    else if(snake_dir === -2 && snakeX[0] - 20 === 0)
    {
        if(!check_up())
	{
	    snake_dir = -1;
	    snake.dir(0, -1);
	}
	else if(!check_down())
	{
	    snake_dir = 1;
	    snake.dir(0, 1);
	}
    }
}

//snake_dir -1 == down
//snake_dir 1 == up
//snake_dir 2 == right
//snake_dir -2 == left
function check_left()
{
    for(var i = 0; i < snake_length; i++)
    {
	if(snakeY[i] === snakeY[0] && snakeX[i] === snakeX[0] - 20)
	    return true;
    }
    return false;
}
function check_right()
{
    for(var i = 0; i < snake_length; i++)
    {
	if(snakeY[i] === snakeY[0] && snakeX[i] === snakeX[0] + 20)
	    return true;
    }
    return false;
}
function check_up()
{
    for(var i = 0; i < snake_length; i++)
    {
	if(snakeY[i] === snakeY[0] - 20 && snakeX[i] === snakeX[0])
	    return true;
    }
    return false;
}
function check_down()
{
    for(var i = 0; i < snake_length; i++)
    {
	if(snakeY[i] === snakeY[0] + 20 && snakeX[i] === snakeX[0])
	    return true;
    }
    return false;
}
function check_gameover()
{
    var dis = 0;
    if(snakeX[0] <= dis || snakeX[0] >= 580 || snakeY[0] <= dis || snakeY[0] >= 580)
    {
        gameOver = true;
        latest_lengths();
        divider++;
    }
    
    for(var i = 1; i < snake_length; i++)
    {
	if(snakeX[0] === snakeX[i] && snakeY[0] === snakeY[i])
        {
            gameOver = true;
            divider++;
            latest_lengths();
        }
    }
}

function latest_lengths()
{
    for(var i = 12; i > 0; i--)
    {
        past_lengths[i] = past_lengths[i - 1]; 
    }
    past_lengths[0] = snake_length;
    sum += past_lengths[0];
    document.getElementById("average").innerHTML = "Average:  " + Math.round((sum / divider));
    document.getElementById("Last_length").innerHTML = "Last length:  " + past_lengths[0];
    if(10 >= past_lengths[0])
    {
        shorter_multiplier = 12;
        longer_multiplier = 1.1;
    }
    else if(past_lengths[0] > 10 && 20 >= past_lengths[0])
    {
        shorter_multiplier = 7;
        longer_multiplier = 1.2;
    }
    else if(past_lengths[0] > 20 && 30 >= past_lengths[0])
    {
        shorter_multiplier = 6;
        longer_multiplier = 1.5;
    }
    else if(past_lengths[0] > 30 && 40 >= past_lengths[0])
    {
        shorter_multiplier = 2;
        longer_multiplier = 1.8;
    }
    else if(past_lengths[0] > 40 && 50 >= past_lengths[0])
    {
        shorter_multiplier = 1.5;
        longer_multiplier = 2;
    }
    else if(past_lengths[0] > 50 && 60 >= past_lengths[0])
    {
        shorter_multiplier = 1.4;
        longer_multiplier = 3;
    }
    else if(past_lengths[0] > 60 && 70 >= past_lengths[0])
    {
        shorter_multiplier = 1.2;
        longer_multiplier = 5;
    }
    else if(past_lengths[0] > 70 && 80 >= past_lengths[0])
    {
        shorter_multiplier = 1.2;
        longer_multiplier = 7;
    }
    else if(past_lengths[0] > 80)
    {
        shorter_multiplier = 1.1;
        longer_multiplier = 12;
    }
    if(!mode_singleplayer)
    {
        document.getElementById("past_lengths1").innerHTML = "1. " + past_lengths[0];
        document.getElementById("past_lengths2").innerHTML = "2. " + past_lengths[1];
        document.getElementById("past_lengths3").innerHTML = "3. " + past_lengths[2];
        document.getElementById("past_lengths4").innerHTML = "4. " + past_lengths[3];
        document.getElementById("past_lengths5").innerHTML = "5. " + past_lengths[4];
        document.getElementById("past_lengths6").innerHTML = "6. " + past_lengths[5];
        document.getElementById("past_lengths7").innerHTML = "7. " + past_lengths[6];
        document.getElementById("past_lengths8").innerHTML = "8. " + past_lengths[7];
        document.getElementById("past_lengths9").innerHTML = "9. " + past_lengths[8];
        document.getElementById("past_lengths10").innerHTML = "10. " + past_lengths[9];
        document.getElementById("past_lengths11").innerHTML = "11. " + past_lengths[10];
        document.getElementById("past_lengths12").innerHTML = "12. " + past_lengths[11];
        document.getElementById("past_lengths13").innerHTML = "13. " + past_lengths[12];
    }
    
}
