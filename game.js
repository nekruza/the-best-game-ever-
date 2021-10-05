class Game {
    constructor(){
        this.currentTime = 0;
        this.rolex = 0;
        this.car = null; 
        this.obstacleArr = [];
        this.bulletArr = [];
    }

    startGame(){
        
        this.car = new Car ();
        this.car.create();
        this.addEventlistener();
        
       
        setInterval(()=>{
            this.currentTime++;
            
            if(this.currentTime % 6 === 0){
                const newObstacle = new Obstacle();
                newObstacle.create();
                this.obstacleArr.push(newObstacle)
            }

            this.obstacleArr.forEach((obstacle) => {
                obstacle.moveObsLeft()
                obstacle.style();

                if(this.car.x < obstacle.x + obstacle.width &&
                    this.car.x + this.car.width > obstacle.x &&
                    this.car.y < obstacle.y + obstacle.height &&
                    this.car.y + this.car.height > obstacle.y){

                    alert("game over!");

                } else if(obstacle.x < 0) {
                    obstacle.remove(); 
                    this.obstacleArr.shift(); 
                }
            })

            if(this.currentTime % 2 === 0){
                const timer = document.getElementById('timer');
                timer.innerHTML = `Timer: ${this.currentTime/2}`;
            }
            
            
        }, 1000) 

        
        setInterval( () =>{
            this.rolex++;

            if(this.rolex % 6 === 0) {
                const bulletX = new Bullet();
                bulletX.create();
                this.bulletArr.push(bulletX)
            };

            this.bulletArr.forEach((elm)=>{ 
                elm.shoot()
                elm.draw();

                // if(this.car.x < obstacle.x + obstacle.width &&
                //     this.car.x + this.car.width > obstacle.x &&
                //     this.car.y < obstacle.y + obstacle.height &&
                //     this.car.y + this.car.height > obstacle.y){

                //     alert("Enemy died!");

                // } else 
                if(elm.x > 100) {
                    elm.remove(); 
                    this.bulletArr.shift(); 
                }
            });
 

        }, 200)

        

    }

    addEventlistener(){
        document.addEventListener("keydown", (e)=>{
            if(e.key === "ArrowLeft"){
                if(this.car.x > 0){
                    this.car.moveLeft()
                    this.car.draw();
                }
                
            } else if (e.key === "ArrowRight"){
                if(this.car.x + this.car.width < 100){
                    this.car.moveRight();
                    this.car.draw();
                }
            } else if (e.key === "ArrowUp"){
                if(this.car.y > 0){
                    this.car.moveUp();
                    this.car.draw();
                }
            } else if (e.key === "ArrowDown"){
                if(this.car.y + this.car.height < 100){
                    this.car.moveDown();
                    this.car.draw();
                }
            }
        })
    }

}


class Car {
    constructor(){
        this.x = 0;
        this.y = 50;
        this.width = 20;
        this.height = 15;
        this.domElm = null;
    }

    moveLeft(){
        this.x-=5
    }
    
    moveRight(){
        this.x+=5
    }

    moveUp(){
        this.y-=5
    }
    
    moveDown(){
        this.y+=5
    }

    create(){
        this.domElm = document.createElement('div');
        this.domElm.setAttribute("id", "car")
        const gameElm = document.getElementById("game");
        gameElm.appendChild(this.domElm)
    }


    draw(){
        this.domElm.style.width = this.width + '%';
        this.domElm.style.height = this.height + '%';
        this.domElm.style.left = this.x + '%'; 
        this.domElm.style.top = this.y + '%'; 
    }


}


class Obstacle {
    constructor(){
        this.width = 10;
        this.height = 10;
        this.y = Math.floor(Math.random()* (100 - this.height));
        this.x = 100; 
        this.obstacleElm = null;
        this.gameElm = document.getElementById("game");
    }

    moveObsLeft(){
        this.x -= 10;

    }

    create(){
        this.obstacleElm = document.createElement('div');
        this.obstacleElm.id = 'obstacle';
        // this.obstacleElm.innerHTML = "obstacle";
        this.gameElm.appendChild(this.obstacleElm)
    }

    style(){
        this.obstacleElm.style.width = this.width + '%';
        this.obstacleElm.style.height = this.height + '%';
        this.obstacleElm.style.left = this.x + '%'; 
        this.obstacleElm.style.top = this.y + '%'; 
    }

    remove(){
        this.gameElm.removeChild(this.obstacleElm)
    }

}

class Bullet {
    constructor(){
        this.height = 5;
        this.width = 5;
        this.x = 0;
        this.y = 50;
        this.bullElm = null; 
        this.gameElm = document.getElementById("game");
    }
    
    shoot(){
        this.x+=10
    }

    create(){
        this.bullElm = document.createElement('div');
        this.bullElm.id = 'bullet';
        this.gameElm.appendChild(this.bullElm)
    }
    
    draw(){
        this.bullElm.style.width = this.width + "%";
        this.bullElm.style.height = this.height + "%";
        this.bullElm.style.left = this.x + "%";
        this.bullElm.style.top = this.y + "%";
    }

    remove(){
        this.gameElm.removeChild(this.bullElm)
    }

}