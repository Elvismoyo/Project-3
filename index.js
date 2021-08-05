

let messages = ["You won!", "Too low, guess again", 
"Too High guess again",  "You lost :(", "Make A Guess", "Guess My Number"];

let remaingGuesses = 10;
var highscore = localStorage.getItem("highscore");
var checkDuplicateGuesses = [];
var randomNumber = Math.floor(Math.random()*100) + 1;
var nguess = 1;
// localStorage.clear();

const initGame = () =>{

    

    let winnerNumber = randomNumber;
    console.log("Psst the winner is : " + winnerNumber);
    let guessingHistory = doc(".guessed-numbers");    
    let inputNumber = doc(".input-number").value;
    
    if(inputNumber == "0"){
        doc(".highest-score").textContent = 0;
        localStorage.setItem(highscore, 0);
        localStorage.clear();
        return;
    }

    if(checkDuplicateGuesses.includes(inputNumber)){
        return doc(".info-1-text").innerHTML =
        "Don't repeat the same number, or your score will suffer.";
    }
    if(isNaN(inputNumber) || inputNumber == "" 
        || inputNumber > 100 || inputNumber < 1){
        doc(".info-1-text").innerHTML = 
        "Please, enter a valid number.";
        return;
    }
    else if(inputNumber == winnerNumber){
            if (remaingGuesses > highscore) {
                doc(".highest-score").textContent = remaingGuesses;
                localStorage.setItem("highscore", remaingGuesses);      
            }
        displayMessage(1);
        
    }
    else if(inputNumber < winnerNumber)
        displayMessage(2);
    else if(inputNumber > winnerNumber)
        displayMessage(3);
    
    
    checkDuplicateGuesses.push(inputNumber);
    doc(".guessed-numbers").style.visibility = "visible";
    guessingHistory.innerHTML += `Guess ${nguess++}: ${inputNumber} <br>`;

}


const displayMessage = (n) => {

    let resultMessage = doc(".subtitle-game");
    let lowOrhigh = doc(".info-1-text");
    let showNum = doc(".show-number");
    let score = doc(".score");
    if(n==1){
    doc('body').style = "background: linear-gradient(to right, #dce35b, #45b649);"
    resultMessage.innerHTML = messages[0];
    showNum.style.visibility = "visible";
    showNum.innerHTML = randomNumber;
    lowOrhigh.innerHTML = messages[0];
    doc(".check").disabled = true;
    doc(".try-again").style.visibility = "visible";
    }
    else if(n==2){
    lowOrhigh.innerHTML = messages[1]
    remaingGuesses--;
    }
    else if(n==3){
    lowOrhigh.innerHTML = messages[2]
    remaingGuesses--;
    }
    if(remaingGuesses == 0){
        resultMessage.innerHTML = messages[3] + `<br>The number was:`;
        showNum.style.visibility = "visible";
        showNum.innerHTML = randomNumber;
        lowOrhigh.innerHTML = messages[3];
        doc(".check").disabled = true;
        doc(".try-again").style.visibility = "visible";
        doc("body").style = "background: linear-gradient(to right, #ee0979, #ff6a00);"
    }
    score.textContent = remaingGuesses;

}

const resetGame = () =>{
    checkDuplicateGuesses = [];
    doc(".show-number").style.visibility = "hidden";
    doc(".try-again").style.visibility = "hidden";
    doc(".check").disabled = false;
    doc(".info-1-text").innerHTML = messages[4];
    doc(".subtitle-game").innerHTML = messages[5];
    nguess = 1;
    remaingGuesses = 10;
    randomNumber = Math.floor(Math.random()*100) + 1;
    doc(".score").textContent = remaingGuesses;
    doc(".guessed-numbers").innerHTML = "";
    doc(".guessed-numbers").style.visibility = "hidden";
    doc(".input-number").value = "";
    doc(".slider").value = 50;
    doc("body").style = "background: linear-gradient(to right, #E5E5BE, #003973);"
}

const doc = (type) => {
    return document.querySelector(type);
}
    
    
window.onload = () =>{
    console.log("To reset highest score, enter 0 and press enter or click the button check");
    if(highscore === null){
    doc(".highest-score").textContent = 0;
    localStorage.setItem(highscore, 0);
    }
    else
    doc(".highest-score").textContent = highscore;
    let tryAgainbtn =  doc(".try-again");
    let outputNumber = doc(".input-number");
    let slider = doc('.slider');
    outputNumber.value = slider.value;
    let guess = doc(".check");
    guess.addEventListener("click", initGame);
    doc(".input-number").addEventListener("keyup", (event)=>{;
        if(event.keyCode == 13)
        guess.click();
    })
    tryAgainbtn.addEventListener("click", resetGame);
    
}

const updateNumber = () =>{
    let outputNumber = doc(".input-number");
    let slider = doc('.slider');
    outputNumber.value = slider.value

}



