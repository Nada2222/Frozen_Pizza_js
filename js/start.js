 

function login ()
{
var name=document.getElementById("username");
console.log(name.value);
if (name.value === "")
 {name.value="player";}
localStorage.setItem('name',name.value);
var get= localStorage.getItem('name');
console.log(get);

}



document.getElementById("startBtn").addEventListener("click",login);





