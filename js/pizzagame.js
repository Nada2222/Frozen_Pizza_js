//david toast
function launch_toast(x) {
	const jsFrame = new JSFrame();
    jsFrame.showToast({
        html: 'You Reach level ' + x , align: 'center', duration: 2000
    });
}
// end david toast 




//david	 refresh	

let isReload=localStorage.getItem("isReload");
console.log("isReload =",isReload);

if(isReload == "true"){
	console.log("ok is reload");
	this.window.location.href = "startPage.html";
	console.log("isReload =",isReload);
}
window.addEventListener("beforeunload", function(event) {
	this.window.location.href = "startPage.html";
	this.localStorage.setItem("isReload",true);
	
});
//david refresh end





var playerName=localStorage.getItem("name");
var ctx = document.getElementById('ctx').getContext('2d');


		var catcherImg = new Image();
		var background = new Image();
		var over = new Image();
		var tile = new Image();
		var food = new Image();
		var bomb = new Image();


//islam functions
var tile1=function (){
		return 	"images/tile.png";
		}
		 var catcher1= function()
		 {
			if ( localStorage.getItem("character") ==='pizza')
				{return "images/pizzaman.png";}
			else 
			    {return "images/char2.png";}
		 }




		// Global Variables
		var winner=playerName;
		var score = 0;
		var score1 = 10;
		var level = 100;
		var level1=1;
		var finalscore=15;
		var animation = 0;
		var foodTimer = 0;
		var bombTimer = 0;
		var gameover = false;
		var intervalVar;
		var paused;
		var foodList = [];
		var tileList = [];
		var bombList = [];
		var foodDrop = [0,50,100,150,200,250,300,350,400,450,500,550,600,650,700,750,800,850,900,950,1000,1050,1100,1150,1200,1250,1300];


		var tileObject = {
			'height':20,
			'width':120
		};

		var catcher = {
			'x':150,
			'y':400,
			'width':100,
			'height':100,
			'jump':0, // How many pixels will it go up?
			'onair':false, // Whether the catcher is already in the air
			'jumpUnit':5, // Go up or down per frame
			'spd':0,
			'leftPressed':false,
			'rightPressed':false,
			'gravity':10,
			'safe':true
		};

		var foodObject = {
			'height':100,
			'width':100,
			'spd':3
		};
		
		
		var bombObject = {
			'height':60,
			'width':60,
			'spd':3
		}

		sound = function(src) {
			this.sound = document.createElement("audio");
			this.sound.src = src;
			this.sound.setAttribute("preload", "auto");
			this.sound.setAttribute("controls", "none");
			this.sound.style.display = "none";
			document.body.appendChild(this.sound);
			this.play = function(){
				this.sound.play();
			}
			this.stop = function(){
			    this.sound.pause();
			}
		}

		sound = function (src) {
			this.sound = document.createElement("audio");
			this.sound.src = src;
			this.sound.setAttribute("preload", "auto");
			this.sound.setAttribute("controls", "none");
			this.sound.style.display = "none";
			document.body.appendChild(this.sound);
			this.play = function () {
				this.sound.play();
			}
			this.stop = function () {
				this.sound.pause();
			}
		}

      	var eatingSound = new sound("sound/eat.mp3");
    	var droppingSound = new sound("sound/drop.mp3");

		background.onload = function(){
			over.onload = function() {
					catcherImg.onload = function() {
								food.onload = function() {
									tile.onload = function() {
										bomb.onload = function() {

											ctx.drawImage(background,0,0,1340,600);
											ctx.strokeStyle = "#594394";
											ctx.font=' italic small-caps 30px Arial';
										     

											drawObject = function(object,x,y,width,height) {
												ctx.drawImage(object,x,y,width,height);
												
											}
											
											document.getElementById('ctx').onmousedown = function() {
												
												if (!gameover) {
													clearInterval(intervalVar);

												}
											
											}


											document.onkeydown = function(event) {
												if (event.keyCode == 37 && catcher.x > 0) {
													catcher.spd = -8;
													catcher.leftPressed = true;
												}
												if (event.keyCode == 39 && catcher.x < 1340 - catcher.width) {
													catcher.spd = 8;
													catcher.rightPressed = true;
												}
												if (event.keyCode == 38 && !catcher.onair && catcher.y== 400) {
													if (!catcher.onair) {
														catcher.jump = 100;
														catcher.onair = true;
													}
												}
												if (event.keyCode == 32) {
													if (paused)
														paused = false;
													else
														paused = true;
												}
											}

											document.onkeyup = function(event) {
												if (event.keyCode == 37) {
													catcher.leftPressed = false;
												}
												if (event.keyCode == 39) {
													catcher.rightPressed = false;
												}
											}

											food_catcher_collision = function(f) {
												return ((f.x < catcher.x + catcher.width) &&
														(catcher.x < f.x + foodObject.width) &&
														(f.y < catcher.y + catcher.height) &&
														(catcher.y < f.y + foodObject.height));
											}

											food_tile_collision = function(f,t) {
												return ((f.x < t.x + tileObject.width) &&
														(t.x < f.x + foodObject.width) &&
														(f.y < t.y + tileObject.height) &&
														(t.y < f.y + foodObject.height));	
											}
											//bombtttttttttttttttttttttt1
											bomb_catcher_collision = function(f) {
												return ((f.x < catcher.x + catcher.width) &&
													(catcher.x < f.x + bombObject.width) &&
													(f.y < catcher.y + catcher.height) &&
													(catcher.y < f.y + bombObject.height));
											}

											catcher_tile_collision = function(t) {
												return ((catcher.x <= t.x + tileObject.width) &&
														(t.x <= catcher.x + catcher.width) &&
														(catcher.y + catcher.height <= t.y));
											}


											jump = function() {
												// Moving up
												if (catcher.jump > 0 && catcher.onair) {
													catcher.y -= catcher.jumpUnit;
													catcher.jump -= catcher.jumpUnit;
												}
												if (catcher.jump <= 0 && catcher.jump > -100 && catcher.onair) {
													catcher.y += catcher.jumpUnit;
													catcher.jump -= catcher.jumpUnit;
												}
												if (catcher.jump <= -100 && catcher.onair) {
													catcher.onair = false;
												}
											}

											updateFoodPosition = function() {
												for(var i in foodList) {
													if (foodList[i].y > 500) { 
														foodList.splice(i,1);
													}
													else {
														foodList[i].y += foodObject.spd;
													}
												}
											}
											//////////////update bomb2
											updatebombPosition = function() {
												for(var i in bombList) {
													if (bombList[i].y > 500) { 
														bombList.splice(i,1);
													}
													else {
														bombList[i].y += bombObject.spd;
													}
												}
											}

											updateCatcherPosition = function() {
												if (catcher.leftPressed && catcher.x > 0) {
													catcher.x += catcher.spd;
												}
												if (catcher.rightPressed && catcher.x < 1340 - catcher.width) {
													catcher.x += catcher.spd;	
												}
												if (catcher.y > 450) {
													gameover = true;
													catcher.y = 450;
													droppingSound.play();
												}
											}

											gameOver = function() {
												ctx.save();
												ctx.globalAlpha = 0.6;
												drawObject(over,400,200,500,300);
												ctx.globalAlpha = 1.0;
												ctx.strokeStyle = "#594394";
												ctx.font = "30px Calibri"
												ctx.fillText("Game Over",600,350);
												clearInterval(intervalVar);
											//	setTimeout(() => {
											//		window.open('startPage.html','_self');
											//	}, 1000);
											if (score >= finalscore)
											{
												finalscore=score;
											   
												localStorage.setItem('highscore',finalscore);
												localStorage.setItem('winner',winner);
												window.open('winnerpage.html','_self');
											}
											else{
												window.open('loserpage.html','_self');
											}
											
												
											}
											updatePosition = function() {
												if (!paused) {
													ctx.clearRect(0,0,500,1300);
													ctx.drawImage(background,0,0,1340,610);
													foodTimer++;
													bombTimer++;
													
													if (foodTimer>level){
														foodList.push({'x':foodDrop[Math.round(Math.random()*27)],'y':0});
														foodTimer = 0;
													}
													
													if (bombTimer>3*level) {
														bombList.push({'x':foodDrop[Math.round(Math.random()*27)],'y':-25});
														bombTimer = 0;
													}
												///////////////bomb3
													for (var i in bombList) {
														if (bomb_catcher_collision(bombList[i])) {
															droppingSound.play();
															gameover = true;
														}
													}

													if (gameover) {
														if (catcher.y>=450)
															drawObject(catcherImg,catcher.x,catcher.y+20,50,30);
														else 
															drawObject(catcherImg,catcher.x,catcher.y,30,50);
														gameOver();
													}

													else if (catcher.onair) {
														drawObject(catcherImg,catcher.x,catcher.y,catcher.width,catcher.height);
													}
													else if (animation == 0) {
														drawObject(catcherImg,catcher.x,catcher.y,catcher.width,catcher.height);
														animation = 1;
														}
													else if (animation == 1) {
														drawObject(catcherImg,catcher.x,catcher.y,catcher.width,catcher.height);
														animation = 0;
													}

													for (var i in foodList) {
														drawObject(food,foodList[i].x,foodList[i].y,foodObject.width,foodObject.height);
													}	

													for(var i=0;i<tileList.length;i++) {
														drawObject(tile,tileList[i].x,tileList[i].y,tileObject.width,tileObject.height);
													}
													////////bomb
													for (var i in bombList) {
														drawObject(bomb,bombList[i].x,bombList[i].y,bombObject.width,bombObject.height);
													}

													for (var i in foodList) {
														if (food_catcher_collision(foodList[i])) {
															score++;
															eatingSound.play();
															if (score % 2 == 0)
																level-=3;
															 

															foodList.splice(i,1);
														}
													}


													if (score == score1) {
														score1 += 10;
														ctx.fillStyle = "#FFFFFF";
														ctx.font = "20px Calibri";
														launch_toast(level1);
														//window.alert("Congratulation you passed level : " + level1);
														setTimeout(ctx.strokeText("Congratulation you passed level " + level1, 600, 300), 2000);
														level1++;

													}
													for (var i in foodList) {
														for (var j in tileList) {
															if (food_tile_collision(foodList[i],tileList[j])) {
																tileList.splice(j,1);
															}
														}
													}

													if (!catcher.onair) {
														for (var i in tileList) {
															if (catcher_tile_collision(tileList[i])) {
																catcher.safe = true;
																break;
															}
															catcher.safe = false;
														}
														if (!catcher.safe) { 
															catcher.y += catcher.gravity;
														}
													}

													drawObject(food,420,0,40,60);
													ctx.fillStyle = "#4E1ADB";
													ctx.font = "italic 20px Arial";
													ctx.fillText(score,465,27);
                                                    ctx.fillText("Player: "+ playerName,900,27);
													ctx.fillText("Level "+(level1),10,27);	
													
													/////////////bomb
													updatebombPosition();
													updateFoodPosition();
													updateCatcherPosition();
													jump();
												}
												else {
													ctx.save();
													ctx.strokeStyle = "#594394";
													ctx.font = "30px Calibri"
													ctx.fillText("Game Paused",600,300);
													ctx.restore();
												}
											}

											startGame = function() {
												score = 0;
												level = 100;
												catcher.y = 400;
												catcher.x = 100;
												catcher.onair = false;
												catcher.leftPressed = false;
												catcher.rightPressed = false;
												catcher.safe = true;
												animation = 0;
												foodTimer = 0;
												paused = false;
												gameover = false;
												tileList = [];
												foodList = [];
												bombList = [];

												for (var i=0;i<=26;i++) {
													tileList.push({'x':i*50,'y':500});
												}

												intervalVar = setInterval(updatePosition,10); // 100 fps game
											}
											startGame();
										}
										bomb.src = "images/bomb.png";
									}
									tile.src = tile1();
								}
								food.src = "images/food.png";
					}
					catcherImg.src =  catcher1();
			}
			over.src = "images/over.png";
		}
		background.src = "images/background.jpg";


