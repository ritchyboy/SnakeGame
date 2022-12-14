window.onload=function(){

let canvasWidth=900;
let canvasHeight=600;
let blockSize=30;
let ctx;
let delay=150;
let widthInBlocks=canvasWidth/blockSize;
let heightInBlocks=canvasHeight/blockSize;
let snakee;
let applee;
let score=0;
    init();
    function init()
    {
       let canvas=document.createElement("canvas");
        canvas.width=canvasWidth;
        canvas.height=canvasHeight;
        canvas.style.border="20px solid black";
        canvas.style.margin="50px auto";
        canvas.style.display="block";
        document.body.appendChild(canvas);
        ctx=canvas.getContext("2d");
        ctx.fillStyle="#ff0000";
        ctx.fillRect(30,30,100,50);
        ctx.fillText(score,20,15);
        snakee=new Snake([[6,4],[5,4],[4,4]],"right");
        applee=new Apple([10,10]);
        refreshCanvas();
    }

    function refreshCanvas(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        ctx.fillText(score,20,15);
        snakee.advance();
        if(snakee.checkCollision())
        {
           gameOver();
        }
        else
        {
            if(snakee.isEatingApple(applee))
            {
               snakee.ateApple=true;
                do
                {
                    score++;
                    applee.setNewPosition();
                }
                while(applee.isOnSnake(snakee))
            }
            snakee.draw();
            applee.draw();
            setTimeout(refreshCanvas,delay);
        }
    }
    function gameOver()
    {
        ctx.save();
        ctx.fillText("Game Over",300,300);
        ctx.fillText("Appuyer sur espace pour rejouer",300,350);
        ctx.restore();
    }
    function restart()
    {
        snakee=new Snake([[6,4],[5,4],[4,4]],"right");
        applee=new Apple([10,10]);
        score=0;
        refreshCanvas();
    }
    function drawBlock(ctx,position){
     let x =position[0]*blockSize;
     let y =position[1]*blockSize;
     ctx.fillRect(x,y,blockSize,blockSize);


    }
    function Apple(position)
    {
        this.position=position;
        this.draw=function()
        {
          ctx.save();
          ctx.fillStyle="#33cc33";
          ctx.beginPath();
          let radius=blockSize/2;
          let x=this.position[0]*blockSize+radius;
          let y=this.position[1]*blockSize+radius;
          ctx.arc(x,y,radius,0,Math.PI*2,true);
          ctx.fill();
          ctx.restore();
        }
        this.setNewPosition=function()
        {
              let newX=Math.round(Math.random()*widthInBlocks-1);
              let newY=Math.round(Math.random()*heightInBlocks-1);
              this.position=[newX,newY];
        };
        this.isOnSnake=function(snakeToCheck)
        {
            let isOnSnake=false;
            for(let i=0;i<snakeToCheck.body.length;i++)
            {
                if(this.position[0]===snakeToCheck.body[i][0]&&this.position[1]===snakeToCheck.body[i][1])
                {
                    isOnSnake=true;
                }
                return isOnSnake;
            }
        };
    }
    function Snake(body,direction){
        this.body=body;
        this.direction=direction;
        this.ateApple=false;
        this.draw=function()
        {
            ctx.save();
            ctx.fillStyle="#ff0000";
            for(let i =0;i<this.body.length;i++){
                drawBlock(ctx,this.body[i]);
            }
            ctx.restore();
        };
        this.advance=function(){
            let nextPosition=this.body[0].slice();
            switch(this.direction)
            {
                case "left":
                    nextPosition[0]-=1;
                    break;
                    case "up":
                        nextPosition[1]+=1;
                        break;
                        case "right":
                            nextPosition[0]+=1;
                            break;
                            case "down":
                                nextPosition[1]-=1;
                            break;
                            default:
                                throw("invalid direction");
            }
            this.body.unshift(nextPosition);
            if(!this.ateApple)
            {
                this.body.pop();
            }
            else
            {
             this.ateApple=false;
            }
        };
        this.setDirection=function(newDirection)
        {
         let allowedDirections;
         switch(this.direction){
            case "left":
                allowedDirections=["up","down"];
                break;
                case "up":
                    allowedDirections=["left","right"];
                    break;
                    case "right":
                    allowedDirections=["up","down"];
                    break;
                    case "down":
                    allowedDirections=["left","right"];

                        break;
                        default:
                            throw("Invalid Direction");
         }
         if(allowedDirections.indexOf(newDirection)>-1)
         {
            this.direction=newDirection;
         }
        };
        this.checkCollision=function()
        {
          let wallCollision=false;
          let snakeCollision=false;
          let head=this.body[0];
          let rest=this.body.slice(1);
          let snakeX=head[0];
          let snakeY=head[1];
          let minX=0;
          let minY=0;
          let maxX=widthInBlocks-1;
          let maxY=heightInBlocks-1;
          let isNotBetweenHorizontalWalls=snakeX<minX||snakeX>maxX;
          let isNotBetweenVerticalWalls=snakeY<minY||snakeY>maxY;
          if(isNotBetweenHorizontalWalls||isNotBetweenVerticalWalls)
          {
               wallCollision=true;
          }
          for(let i=0;i<rest.length;i++)
          {
             if(snakeX===rest[i][0]&&snakeY===rest[i][1])
             {
               snakeCollision=true;
             }
          }
          return wallCollision||snakeCollision;
        };
        this.isEatingApple=function(appleToEat)
        {
            let head=this.body[0];
            if(head[0]===appleToEat.position[0]&&head[1]===appleToEat.position[1])
            {
                 return true;
            }
            else
            {
                return false;
            }
          
        };
        document.onkeydown=function handleKeyDown(e){
            let key=e.keyCode;
            let newDirection
            switch(key){
                case 37:
                    newDirection="left";
                    console.log("left");
                    break;
                case 38:
                    newDirection="down";
                    console.log("down");
                    break;
                    case 39:
                        newDirection="right";
                        console.log("right");
                        break;
                        case 40:
                            newDirection="up";
                            console.log("up");
                    break;
                    case 32:
                           restart();
                           break;
                    default:
                    return;
            }
            snakee.setDirection(newDirection);
        };
    }
}