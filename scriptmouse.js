const playagain = document.getElementById('playagain');
const menu = document.getElementById('menu'); 

playagain.addEventListener("click", (event)=>{
    window.location.href = "index.html";
})

menu.addEventListener("click", (event)=>{
    window.location.href = "home.html";
    let catWin = 0;
    let mouseWin = 0;
    localStorage.setItem("catWin", catWin);
    localStorage.setItem("mouseWin", mouseWin);

})

document.addEventListener("DOMContentLoaded", function () {
    let mouseWin = parseInt(localStorage.getItem("mouseWin")) || 0; // Get the stored value, or 0 if not set
    mouseWin += 1;  // Increment the score by 1
    localStorage.setItem("mouseWin", mouseWin);  // Save the updated score back to localStorage

    const scoreDisplay = document.querySelector('.score');
    scoreDisplay.innerText = `Mouse Wins: ${mouseWin}`;  // Display the updated score
});

