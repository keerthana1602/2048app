
var checkerBoard = [
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0],
					[0,0,0,0]
				]  
var checkerBoardId = [
					['0-0','0-1','0-2','0-3'],
					['1-0','1-1','1-2','1-3'],
					['2-0','2-1','2-2','2-3'],
					['3-0','3-1','3-2','3-3']
				]
var color = {
	'2': '#eee4da',
	'4': '#ede0c8',
	'8': '#f2b179',
	'16': '#f59563',
	'32': '#f67c5f',
	'64': '#f65e3b',
	'128': '#edcf72',
	'256': '#edcc61',
	'512': '#edc850',
	'1024': '#edc53f',
	'2048': '#edc22e',
}
var score = 0; 

window.onload = function(){
	start();
}


function start(){
	randomTwo();
	randomTwo();
	
	$(document).keyup(function(event){
		if(event.which>=37&&event.which<=40){
			judge(event.which);
		}
	});
}


function randomTwo(){
	let status = false;
	while(!status){
		let x = Math.floor(Math.random()*4);
		let y = Math.floor(Math.random()*4);
		if(checkerBoard[x][y]===0){
			checkerBoard[x][y]=2;
			status = true;
		}
	}
	render();
}


function judge(button){
	
	if(button==38){ //上
		for(var j=0; j<4; j++){
			for(var i=1; i<4;i++){
				if(checkerBoard[i][j]!==0){ 
					for(var m=0; m<i; m++){
						if(checkerBoard[m][j]==0&&!shuCanMove(j,i,m)){
							checkerBoard[m][j] = checkerBoard[i][j];
							checkerBoard[i][j] = 0;
						}else if(checkerBoard[m][j]==checkerBoard[i][j]&&!shuCanMove(j,i,m)){
							checkerBoard[m][j] = (checkerBoard[m][j] * 2);
							checkerBoard[i][j] = 0;
							score += checkerBoard[m][j];
						}
					}
				}
			}	
		}
	}else if(button==40){ //下
		for(var j=0; j<4; j++){
			for(var i=2; i>=0;i--){
				if(checkerBoard[i][j]!==0){
					for(var m=3; m>i;m--){
						if(checkerBoard[m][j]==0&&!shuCanMove(j,i,m)){
							checkerBoard[m][j] = checkerBoard[i][j];
							checkerBoard[i][j] = 0;
						}else if(checkerBoard[m][j] == checkerBoard[i][j] && !shuCanMove(j,i,m)){
							checkerBoard[m][j] = (checkerBoard[m][j] * 2);
							checkerBoard[i][j] = 0;
							score += checkerBoard[m][j];
						}
					}
				}
			}
		}
	}else if(button == 37){
		for(var i=0; i<4; i++){
			for(var j=1; j<4; j++){
				if(checkerBoard[i][j]!=0){
					for(var m=0; m<j; m++){
						if(checkerBoard[i][m]==0 && !hengCanMove(i,j,m)){
							checkerBoard[i][m] = checkerBoard[i][j];
							checkerBoard[i][j] = 0;
						}else if(checkerBoard[i][m] == checkerBoard[i][j]&&!hengCanMove(i,j,m)){
							checkerBoard[i][m] = (checkerBoard[i][m]*2);
							checkerBoard[i][j] = 0;
							score += checkerBoard[i][m];
						}
					}
				}
			}
		}
	}else if(button == 39){
		for(var i=0; i<4; i++){
			for(var j=2; j>=0; j--){
				if(checkerBoard[i][j]!=0){
					for(var m=3; m>j; m--){
						if(checkerBoard[i][m]==0&&!hengCanMove(i,j,m)){
							checkerBoard[i][m] = checkerBoard[i][j];
							checkerBoard[i][j] = 0;
						}else if(checkerBoard[i][m] == checkerBoard[i][j]&&!hengCanMove(i,j,m)){
							checkerBoard[i][m] = (checkerBoard[i][m]*2);
							checkerBoard[i][j] = 0;	
							score += checkerBoard[i][m];
						}
					}
				}
			}
		}
	}
	render();
	randomTwo();
}


function render(){
	checkerBoard.forEach(function(x,xIndex){
		x.forEach(function(y,yIndex){
			if(y!==0){
				text(checkerBoardId[xIndex][yIndex],y);
			}else{
				text(checkerBoardId[xIndex][yIndex],'');
			}
		})
	});
	document.getElementById('realScore').innerText = score;
}


function text(id,text){
	let ele = document.getElementById(id);
	ele.innerText = text;
	ele.setAttribute('style','background:'+color[text]);	
}

function conso(){
	console.log(checkerBoard[0][0],checkerBoard[0][1],checkerBoard[0][2],checkerBoard[0][3]);
	console.log(checkerBoard[1][0],checkerBoard[1][1],checkerBoard[1][2],checkerBoard[1][3]);
	console.log(checkerBoard[2][0],checkerBoard[2][1],checkerBoard[2][2],checkerBoard[2][3]);
	console.log(checkerBoard[3][0],checkerBoard[3][1],checkerBoard[3][2],checkerBoard[3][3]);	
	console.log('-----------------------');
}

function shuCanMove(j,i,m){
	var from,to;
	if(i>m){
		from = m;
		to = i;
	}else{
		from = i;
		to = m;
	}
	for(var n=from+1; n<to;n++){
		if(checkerBoard[n][j]!=0){
			return true;
		}
	}
	return false;
}

function hengCanMove(j,i,m){
	var from,to;
	if(i>m){
		from = m;
		to = i;
	}else{
		from = i;
		to = m;
	}

	for(var n=from+1;n<to;n++){
		if(checkerBoard[j][n]!=0){
			return true;
		}
	}
	return false;

}