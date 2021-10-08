class Game {
    constructor(){
        this.currentTime = 0;
        this.rolex = 0;
        this.car = null; 
        this.obstacleArr = [];
        this.bulletArr = [];
        this.prizeArr = [];
        this.rocketArr = [];
        this.numBull = 10;
        this.rocketNum = 10;
    }

    startGame(){
        
        this.car = new Car ();
        this.car.create();
        this.addEventlistener();
        
        //OBSTACLE ------------------------

        const intervalId = setInterval(()=>{
            this.currentTime++;
            
            //create obstacles
            if(this.currentTime % 80 === 0){
                const newObstacle = new Obstacle();
                newObstacle.create();
                this.obstacleArr.push(newObstacle)
            }

            this.obstacleArr.forEach((obstacle) => {

                //move obstacles
                obstacle.moveObsLeft()
                obstacle.style();

                //collision detection
                if(this.car.x < obstacle.x + obstacle.width &&
                    this.car.x + this.car.width > obstacle.x &&
                    this.car.y < obstacle.y + obstacle.height &&
                    this.car.y + this.car.height > obstacle.y){
                    clearInterval(intervalId)
                    alert("game over!");

                } else if(obstacle.x < 0) {
                    obstacle.remove(); 
                    this.obstacleArr.shift(); 
                } else if(this.currentTime === 600){
                    clearInterval(intervalId)
                }
            })

            if(this.currentTime % 10 === 0){
                const timer = document.getElementById('timer');
                timer.innerHTML = `Timer: ${this.currentTime/10}`;
            }

            if(this.currentTime === 600){
                const background = document.getElementById('gameOver')
                background.style.visibility = 'visible';
            }
            
            
        }, 100) 

        // BULLET ---------------------
         setInterval( () =>{

            this.bulletArr.forEach((bullet, bulletIndex)=>{
                //move bullets
                bullet.shoot()
                bullet.draw();
                console.log('bullet X', bullet.x)
                

                    
                // this.bulletArr.forEach((bullet, index)=>{
                    
                    this.obstacleArr.forEach((obstacle, obstacleIndex)=>{
                        if (bullet.x < obstacle.x + obstacle.width &&
                            bullet.x + bullet.width > obstacle.x &&
                            bullet.y < obstacle.y + obstacle.height &&
                            bullet.y + bullet.height > obstacle.y) {
                                console.log('it touched')

                                if(this.numBull > 0) {

                                    this.bulletArr.splice(bulletIndex, 1);
                                    bullet.remove();
                                    
                                    
                                    this.obstacleArr.splice(obstacleIndex, 1);
                                    obstacle.remove();
                                    
                                }
                            } 
                        })
        
                    //  })
                
                if(bullet.x > 100) {
                  bullet.remove();                    
                  this.bulletArr.shift(); 
                 }
                
            });
 

         }, 200)

         // ROCKET ---------------------
         setInterval( () =>{

            this.rocketArr.forEach((rocket, rocketIndex)=>{
                //move bullets
                rocket.moveRocketRight()
                rocket.draw();

                    
                // this.bulletArr.forEach((bullet, index)=>{
                    
                    this.obstacleArr.forEach((obstacle, obstacleIndex)=>{
                        if (rocket.x < obstacle.x + obstacle.width &&
                            rocket.x + rocket.width > obstacle.x &&
                            rocket.y < obstacle.y + obstacle.height &&
                            rocket.y + rocket.height > obstacle.y) {
                                console.log('it touched')

                                if(this.numBull > 0) {

                                    this.rocketArr.splice(rocketIndex, 1);
                                    rocket.remove();
                                    
                                    
                                    this.obstacleArr.splice(obstacleIndex, 1);
                                    obstacle.remove();
                                    
                                }
                            } 
                        })
        
                    //  })
                
                if(rocket.x > 100) {
                  rocket.remove();                    
                  this.rocketArr.shift(); 
                 }
                
            });
 

         }, 200)


        //PRIZE ---------------------------
        setInterval(()=>{
            this.rolex++;
            
            //create prizes
            if(this.currentTime % 100 === 0){
                const newPrize = new Prize();
                newPrize.create();
                this.prizeArr.push(newPrize)
            }

            this.prizeArr.forEach((prize, indexPrize) => {

                //move obstacles
                prize.movePrizeLeft()
                prize.drawPrize();

                //collision detection
                if(this.car.x < prize.x + prize.width &&
                    this.car.x + this.car.width > prize.x &&
                    this.car.y < prize.y + prize.height &&
                    this.car.y + this.car.height > prize.y){

                    this.numBull += 5;
                    prize.remove();
                    this.prizeArr.splice(indexPrize, 1);

                } else if(prize.x < 0) {
                    prize.remove(); 
                    this.prizeArr.shift(); 
                }
            })
            
        }, 100)

        

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
            } else if(e.key === 'z' ){
                if(this.numBull > 0){
                    const bulletX = new Bullet(this.car.x + 5, this.car.y+5);
                    bulletX.create();
                    bulletX.draw();
                    this.bulletArr.push(bulletX)
                    this.numBull--;
                    const numBullet = document.getElementById('numOfBul');
                    numBullet.innerHTML = `#Bullet: ${this.numBull}`
                    // console.log(this.numBull)
                }
            } else if (e.key === 'x'){
                if(this.rocketNum > 0){
                    const rocketX = new Rocket(this.car.x + 5, this.car.y+5);
                    rocketX.create()
                    this.rocketArr.push(rocketX)
                    this.rocketNum--;
                    const rocketNum = document.getElementById('rocketNum');
                    rocketNum.innerHTML = `#Rocket: ${this.rocketNum}`
                }

            }
        })
    }

}


class Car {
    constructor(){
        this.x = 0;
        this.y = 50;
        this.width = 12;
        this.height = 24;
        this.domElm = null;
    }

    moveLeft(){
        this.x-=4
    }
    
    moveRight(){
        this.x+=4
    }

    moveUp(){
        this.y-=7
    }
    
    moveDown(){
        this.y+=7
    }

    create(){
        this.domElm = document.createElement('div');
        console.log('player DOM')
        console.log(this.domElm)
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
        this.height = 20;
        this.y = Math.floor(Math.random()* (100 - this.height));
        this.x = 100; 
        this.obstacleElm = null;
        this.gameElm = document.getElementById("game");
    }

    moveObsLeft(){
        this.x -= 1;

    }

    create(){
        this.obstacleElm = document.createElement('div');
        this.obstacleElm.className = 'obstacle';
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
        console.log(this.obstacleElm);
        this.gameElm.removeChild(this.obstacleElm)
    }

}

class Rocket {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 7;
        this.height = 7;
        this.rocket = null, 
        this.gameElm = document.getElementById("game");
    }

    create(){
        this.rocket = document.createElement('div');
        this.rocket.className = 'rocket';
        this.gameElm.appendChild(this.rocket)
    }

    moveRocketRight(){
        this.x+=4;
    }

    draw(){
        this.rocket.style.width = this.width + '%';
        this.rocket.style.height = this.height + '%';
        this.rocket.style.left = this.x + '%'; 
        this.rocket.style.top = this.y + '%'; 
    }

    remove(){
        this.gameElm.removeChild(this.rocket)
    }
}



class Bullet {
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.width = 8;
        this.height = 5;
        this.bullElm = null, 
        this.gameElm = document.getElementById("game");
    }

    create(){
        this.bullElm = document.createElement('div');
        this.bullElm.className = 'bulletX';
        this.gameElm.appendChild(this.bullElm)
    }

    shoot(){
        this.x+=4;
    }

    draw(){
        this.bullElm.style.width = this.width + '%';
        this.bullElm.style.height = this.height + '%';
        this.bullElm.style.left = this.x + '%'; 
        this.bullElm.style.top = this.y + '%'; 
    }

    remove(){
        this.gameElm.removeChild(this.bullElm)
    }
}



class Prize {
    constructor(){
        this.width = 7;
        this.height = 12;
        this.y = Math.floor(Math.random()* (100 - this.height));
        this.x = 100; 
        this.prizeElm = null;
        this.gameElm = document.getElementById("game");
    }
    
    movePrizeLeft(){
        this.x -= 1;
        
    }
    
    create(){
        this.prizeElm = document.createElement('div');
        this.prizeElm.className = 'prize';
        this.gameElm.appendChild(this.prizeElm)
        console.log(this.prizeElm)
    }

    drawPrize(){
        this.prizeElm.style.width = this.width + '%';
        this.prizeElm.style.height = this.height + '%';
        this.prizeElm.style.left = this.x + '%'; 
        this.prizeElm.style.top = this.y + '%'; 
    }

    remove(){
        this.gameElm.removeChild(this.prizeElm)
    }

}