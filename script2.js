const playagain = document.getElementById('playagain');
const menu = document.getElementById('menu'); 
let catWin
let mouseWin

playagain.addEventListener("click", (event)=>{
    localStorage.setItem("catWin", catWin);
    localStorage.setItem("mouseWin", mouseWin);
    window.location.href = "game.html";
})

menu.addEventListener("click", (event)=>{
    let catWin = 0;
    let mouseWin = 0;
    localStorage.setItem("catWin", catWin);
    localStorage.setItem("mouseWin", mouseWin);
    window.location.href = "index.html";

})

document.addEventListener("DOMContentLoaded", () => {
    catWin = localStorage.getItem('catWin') || 0;
    mouseWin = localStorage.getItem('mouseWin') || 0;
    const scoreElement = document.querySelector('.score');
    scoreElement.innerText = `${mouseWin}`;
    const scoreCat = document.querySelector('.scoreCat');
    scoreCat.innerText = `${catWin}`;

});
