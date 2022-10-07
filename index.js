window.onload=function(){

let canvasWidth=900;
let canvasHeight=600;
let blockSize=30;
let ctx;
let delay=1000;
let snakee;
    init();
    function init(){
       let canvas=document.createElement("canvas");
        canvas.width=canvasWidth;
        canvas.height=canvasHeight;
        canvas.style.border="1px solid";
        document.body.appendChild(canvas);
        ctx=canvas.getContext("2d");
        ctx.fillStyle="#ff0000";
        ctx.fillRect(30,30,100,50);
        snakee=new Snake([[6,4],[5,4],[4,4]],"right");
        refreshCanvas();
    }

    function refreshCanvas(){
        ctx.clearRect(0,0,canvasWidth,canvasHeight);
        snakee.advance();
        snakee.draw();
        setTimeout(refreshCanvas,delay);
    }
    function drawBlock(ctx,position){
     let x =position[0]*blockSize;
     let y =position[1]*blockSize;
     ctx.fillRect(x,y,blockSize,blockSize);


    }
    function Snake(body,direction){
        this.body=body;
        this.direction=direction;
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
            this.body.pop();
        };
        this.setDirection=function(newDirection)
        {
         let allowedDirections;
         switch(this.direction){
            case "left":
                break;
                case "up":
                allowedDirections=["up","down"];
                break;
                break;
                case "right":
                    allowedDirections=["left","right"];
                    case "down":
                        break;
                        default:
                            throw("Invalid Direction");
         }
         if(allowedDirections.indexOf(newDirection)>-1){
            this.direction=newDirection;
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
                    newDirection="up";
                    console.log("up");
                    break;
                    case 39:
                        newDirection="right";
                        console.log("right");
                        break;
                        case 40:
                            newDirection="down";
                            console.log("down");
                    break;
                    default:
                    return;
            }
            snakee.setDirection(newDirection);
        };
    }
}