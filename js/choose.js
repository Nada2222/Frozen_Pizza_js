

function pizza(){
    choiceSelected="pizza";  
    localStorage.setItem('character',choiceSelected);
 localStorage.getItem('character');
}
function deliver(){
    choiceSelected="delivery";  
    localStorage.setItem('character',choiceSelected);
    localStorage.getItem('character');
}

document.getElementById("pizza").addEventListener("click",pizza);
document.getElementById("deliver").addEventListener("click",deliver);

this.localStorage.setItem("isReload",false);