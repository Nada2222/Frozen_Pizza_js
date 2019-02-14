var playerName=localStorage.getItem("name");
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName("modal-content")[0];
//var par = document.getElementsById("par").innerHTML;
var btn = document.getElementById("button");
var x=localStorage.getItem('highscore');
var y=localStorage.getItem('winner');

btn.onclick = function() {
    modal.style.display = "block";
    document.getElementById('par').innerText= x + "    "+ y;
    
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}  
