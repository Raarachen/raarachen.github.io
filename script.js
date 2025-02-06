const body = document.querySelector('body');
const player = document.querySelector('img.player');
const hole = document.querySelector('.hole');
const invisibleDiv = document.querySelector('.invisibleDiv');
const threeHearts = document.querySelector('.threeHearts');
const twoHearts = document.querySelector('.twoHearts');
const oneHeart = document.querySelector('.oneHeart');
/*const currentScore = document.querySelector('.score');*/
const over = document.querySelector('.over');
const currentScore = document.getElementById('currentScore');
/*const scoreElement = document.querySelector('.score');*/
const scoreCat = document.querySelector('.scoreCat');


let hearts = 3;
let normalSpeed = 5;
let currentSpeed = 5;
let catWin = 0;
let mouseWin = 0;
let timer = 10;
let score = 0;
let gameOver = false;

class Mousetrap {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.element = null;  // Make sure to initialize it properly
    }

    show() {
        const newImage = document.createElement('img');
        newImage.src = 'mousetrapfix.png';
        
        newImage.style.position = 'absolute';
        newImage.style.left = `${this.x - newImage.width / 2}px`;
        newImage.style.top = `${this.y - newImage.height / 2}px`;

        // Random rotation
        const randomDegree = Math.floor(Math.random() * 360);
        newImage.style.transform = `rotate(${randomDegree}deg)`;

        // Append the image to the body and save reference to it
        this.element = document.body.appendChild(newImage);
    }

    loop() {
        // Bind `this` to the `collision` method so it maintains the correct context
        requestAnimationFrame(() => this.collision());  // Using an arrow function here
    }

    collision() {

        if (this.element) {
            
            if (isCollide(player, this.element)) {
                var audio = new Audio ('damage.wav');
                audio.play();
                hearts -= 1;
                this.element.remove();  // Remove the element if collision is true

                currentSpeed = normalSpeed / 2;
                setTimeout(() => {
                    currentSpeed = normalSpeed; // Restore original speed
                }, 1000);

                player.classList.add('flash-red');
                setTimeout(() => {
                    player.classList.remove('flash-red');  // Remove the flash after 1 second
                }, 100);

                if (hearts === 2) {
                    threeHearts.style.display = "none"
                    twoHearts.style.display = "block"
                }
                if (hearts === 1) {
                    threeHearts.style.display = "none"
                    twoHearts.style.display = "none"
                    oneHeart.style.display = "block"
                }
                            player.classList.add('flash-red');
            setTimeout(() => {
                player.classList.remove('flash-red');  // Remove the flash after 1 second
            }, 1000);
            }
        } else {
            //console.log('No element found, collision not possible.');
        }
        requestAnimationFrame(() => this.collision());
    }
}
document.addEventListener('contextmenu', function(e) {
    e.preventDefault(); 
    const newMousetrap = new Mousetrap(e.pageX, e.pageY);
    newMousetrap.show();
    newMousetrap.loop();
});



/*if(isCollide(player, newImage)){
    console.log('is colliding with mousetrap')
    window.location = "catwins.html";
}*/


player.addEventListener("click", (event) => {
    catWin += 1;
    updateScore(); 

    setTimeout(() => {
        window.location.href = "catwins.html";
    }, 10);
});

function updateScore() {
    currentScore.innerText = `${mouseWin} | ${catWin}`;
    localStorage.setItem('catWin', catWin);
    localStorage.setItem('mouseWin', mouseWin);
}

/*player.addEventListener("mousedrag", (event)=>{
    window.location.href = "catwins.html";
})*/

player.setAttribute('draggable', false)
threeHearts.setAttribute('draggable', false)
twoHearts.setAttribute('draggable', false)
oneHeart.setAttribute('draggable', false)


let isMovingLeft = false;
let isMovingRight = false;
let isMovingUp = false;
let isMovingDown = false;


//changeText('Hello!') //Function is getting excuted as soon as page loads.
// You need to make inputField and button consts
//console.log(text); Then go to developer tools to check

  //Change the background with keys
  /*document.addEventListener('keydown', (event) =>{
    let playerX = parseInt(player.style.left);
    let playerY = parseInt(player.style.top);

    if(event.key === 'ArrowRight') {
        playerX += 100; //playerX = playerX +10
    } else if(event.key === 'ArrowLeft') {
        playerX -= 100;
    } else if(event.key === 'ArrowUp') {
        playerY -= 100;
    } else if(event.key === 'ArrowDown') {
        playerY += 100;
    }
    player.style.left = String(playerX)+'px';
    player.style.top = String(playerY)+'px';

  })*/

  //JS Animation Example
  function animatePlayer() {
    let playerX = parseInt(player.style.left);
    let playerY = parseInt(player.style.top);

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Set the player's boundaries
    const playerWidth = player.offsetWidth;
    const playerHeight = player.offsetHeight;

    if (isMovingLeft && playerX > 0) {
        playerX -= currentSpeed;
    }
    if (isMovingRight && playerX + playerWidth < viewportWidth) {
        playerX += currentSpeed;
    }
    if (isMovingUp && playerY > 0) {
        playerY -= currentSpeed;
    }
    if (isMovingDown && playerY + playerHeight < viewportHeight) {
        playerY += currentSpeed;
    }

    /*if(isMovingLeft) {
        playerX -= currentSpeed;
    }
    if(isMovingRight) {
        playerX += currentSpeed;
    }
    if(isMovingUp) {
        playerY -= currentSpeed;
    }
    if (isMovingDown) {
        playerY += currentSpeed;
    }*/


    player.style.left = String(playerX)+'px';
    player.style.top = String(playerY)+'px';
    invisibleDiv.innerText = timer;
    //currentScore.innerText = catWin, mouseWin;

    if(isCollide(player, hole)){
        console.log('is colliding')
        if(!gameOver) {
        mouseWin += 1;
        updateScore();
        gameOver = true;
        window.location = "mousewins.html";
        }
    }
    
    if(timer <= 0){
        if(!gameOver) {
        catWin += 1;
        updateScore();
        gameOver = true
        }
        window.location = "catwins.html";
    }

    if(hearts === 0) {
        if(!gameOver) {
            catWin += 1;
            updateScore();
            gameOver = true;
            window.location = "catwins.html";
            }
    }
    /*scoreElement.innerText = `Cat: ${catWin} | Mouse: ${mouseWin}`;*/

    requestAnimationFrame(animatePlayer) //write the name of the function itself inside
  }



  animatePlayer();

  document.addEventListener('keydown',(event)=>{
    if(event.key === "ArrowLeft" || event.key === "a") {
        isMovingLeft = true;
    }
    if(event.key === "ArrowRight" || event.key === "d") {
        isMovingRight = true;
    }
    if(event.key === "ArrowUp" || event.key === "w") {
        isMovingUp = true;
    }
    if(event.key === "ArrowDown" || event.key === "s") {
        isMovingDown = true;
    }
  })

  document.addEventListener('keyup',(event)=>{
    if(event.key === "ArrowLeft" || event.key === "a") {
        isMovingLeft = false;
    }
    if(event.key === "ArrowRight" || event.key === "d") {
        isMovingRight = false;
    }
    if(event.key === "ArrowUp" || event.key === "w") {
        isMovingUp = false;
    }
    if(event.key === "ArrowDown" || event.key === "s") {
        isMovingDown = false;
    }
  })

function isCollide(a, b) { 
    return !( ((a.offsetTop + a.offsetHeight) < (b.offsetTop)) || 
    (a.offsetTop > (b.offsetTop + b.offsetHeight)) || 
    ((a.offsetLeft + a.offsetWidth) < b.offsetLeft) || 
    (a.offsetLeft > (b.offsetLeft + b.offsetWidth)) ); 
    }

function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

document.addEventListener("DOMContentLoaded", function () {
    const box = document.querySelector('.hole');
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    const randomX = Math.random() * (viewportWidth - 100);  // 100 is the width of the box
    const randomY = Math.random() * (viewportHeight - 100); // 100 is the height of the box
    
    box.style.left = `${randomX}px`;
    box.style.top = `${randomY}px`;

    player.style.left = `200px`;
    player.style.top = `100px`;

    var audio = new Audio ('damage.wav');

    invisibleDiv.style.display = "block"
    threeHearts.style.display = "block"
    currentScore.style.display = "block"


        // Retrieve the scores from localStorage
        catWin = Number(localStorage.getItem('catWin')) || 0; // Default to 0 if not found
        mouseWin = Number(localStorage.getItem('mouseWin')) || 0; // Default to 0 if not found
        console.log(catWin, mouseWin)
        updateScore()

        


});

player.addEventListener("drag", (event) => {});

ondrag = (event) => {};


/*player.addEventListener("click", (event) => {
    invisibleDiv.style.display = "block"
});*/

//setInterval

setInterval(()=>{
    if(timer > 0) {
        timer -= 1;
    }
}, 1000)

//TEST FEEDBACK: If mouse DRAG, also brings to cat wins page. Issue with 
