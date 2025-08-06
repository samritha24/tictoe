const boxs =document.querySelectorAll('.box')
const statusTxt= document.getElementById('status')
const btnRestart=document.getElementById('Restart')
let X="<img src='images/image.png' alt='X'>";
let O="<img src='images/O logo.png' alt='O'>";

const win=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

let options=["","","","","","","","",""]
let currentplayer=X;
let player="X"
let running=false;
 init();

function init(){
    boxs.forEach(box=>box.addEventListener('click',boxClick))
    btnRestart.addEventListener('click', restartGame);
    statusTxt.textContent=`${player} your Turn`;
    running=true;

}
function boxClick(){
const index=this.dataset.index;
if(options[index]!="" || !running){
    return;
}
updateBox(this, index);
checkWinner()
}

function updateBox(box,index){
options[index]=player;
box.innerHTML=currentplayer;
}

function changePlayer(){
  player=(player=='X') ? "0" : "X"
  currentplayer=(currentplayer==X) ? O :X;
  statusTxt.textContent=`${player} your Turn`
}

function checkWinner(){
    let isWon=false;
    for(let i=0; i<win.length;i++){
        const condition=win[i];
        const box1=options[condition[0]];
        const box2=options[condition[1]];
        const box3=options[condition[2]];
        if(box1==""||box2==""||box3==""){
            continue;
        }
        if(box1==box2 && box2==box3){
            isWon=true;
            boxs[condition[0]].classList.add('win');
            boxs[condition[1]].classList.add('win');
            boxs[condition[2]].classList.add('win');
            
        }
    }
    if(isWon){
        statusTxt.textContent=`${player} Won...`
        running=false;
        
    }else if(!options.includes("")){
        statusTxt.textContent=`Game Draw...!`;
        running=false
    }else{
        changePlayer();
    }

}


function restartGame(){
     options=["","","","","","","","",""]
 currentplayer=X;
 player="X"
 running=true;
 statusTxt.textContent=`${player} your Turn`

 boxs.forEach(box=>{
    box.innerHTML="";
    box.classList.remove('win');
 });

}