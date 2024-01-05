let boxes=document.querySelectorAll(".box");
let resetBtn=document.querySelector("#reset-button");
let newGameBtn=document.querySelector("#new-button");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let turnO=true; //playerX or playerO
let turnCounter=0;
let matchOver=false;

const winPatterns= [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () =>{
    turnO=true;
    turnCounter=0;
    matchOver=false;
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) =>{
    box.addEventListener("click",()=>{
        if(turnO){ //PlayerO
            box.innerText="O";
            box.style.color="#09814a";
            turnO=false;
        } else{ //PlayerX
            box.innerText="X";
            box.style.color="maroon";
            turnO=true;
        }
        box.disabled=true; 
        turnCounter+=1;
        checkWinner();
    });
});

const disableBoxes = () =>{
    for(let box of boxes){
        box.disabled=true; 
    }
};

const enableBoxes = () =>{
    for(let box of boxes){
        box.disabled=false; 
        box.innerText="";
    }
};

const showWinner = (winner) =>{
    msg.innerText=`Congratulations, Winner is ${winner}!!`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const showDraw= () =>{
    msg.innerText=`Match Tie!!`;
    msgContainer.classList.remove("hide");
}

const checkWinner=() =>{
    for(let pattern of winPatterns){ 
        let pos1Val=boxes[pattern[0]].innerText;
        let pos2Val=boxes[pattern[1]].innerText;
        let pos3Val=boxes[pattern[2]].innerText;

        if(pos1Val!=""&&pos2Val!=""&&pos3Val!=""){
            if(pos1Val===pos2Val&&pos2Val===pos3Val){
                showWinner(pos1Val);
                matchOver=true;
            } 
        }
        if(turnCounter==9&&matchOver==false){
            showDraw();
        }
    }
};

newGameBtn.addEventListener("click",resetGame);
resetBtn.addEventListener("click",resetGame);