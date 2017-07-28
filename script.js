// Code goes here

var head;
var c = 1;
var eat = false;
var dir = 'r';

function Snake(x, y){
	this.x = x;
	this.y = y;
}

function init(){
	
	let heading = document.createElement('h2');
	heading.setAttribute('id', 'heading');
	heading.style.textAlign = 'center';
	heading.innerHTML = 'Snake Game';
	document.body.appendChild(heading);
	
	let map = document.createElement('div');
	map.setAttribute('id', 'map');
	document.body.appendChild(map);
	
	let score = document.createElement('div')
	score.setAttribute('id', 'score');
	score.style.fontWeight = 'bold';
	score.style.height = '100px';
	score.style.width = '402px';
	score.style.textAlign = 'center';
	score.style.fontSize = '20px';
	score.style.margin = 'auto';
	score.innerHTML = 'Score: ' + (c-1)*10;
	document.body.appendChild(score);
	
	head = new Snake(0,0);
	draw(head);
	createFood('100px', '100px');
}

function move(e){
	let fleft = document.getElementById('food').offsetLeft;
	let sleft = document.querySelectorAll('#head')[c-1].offsetLeft;
	let ftop = document.getElementById('food').offsetTop;
	let stop = document.querySelectorAll('#head')[c-1].offsetTop;
	
	if(e.which === 39){
		//console.log(head.x + ',' + head.y);
		if(sleft === 390)
			return;
		if(dir === 'l' && c > 1){
			alert('Wrong move !!!');
			return;
		}
		if(fleft - sleft === 10 && ftop === stop){
			c++;
			eat = true;
			//console.log(eat);
		}
		dir = 'r';
		head.x += 10;
	}
	if(e.which === 40){
		//console.log('hello');
		if(stop === 390)
			return;
		if(dir === 'u' && c > 1){
			alert('Wrong move !!!');
			return;
		}
		if(ftop - stop === 10 && fleft === sleft){
			c++;
			eat = true;
			//console.log(eat);
		}
		dir = 'd';
		head.y += 10;
	}
	if(e.which === 37){
		//console.log('hello');
		if(sleft === 0)
			return;
		if(dir === 'r' && c > 1){
			alert('Wrong move !!!');
			return;
		}
		if(sleft - fleft === 10 && stop === ftop){
			c++;
			eat = true;
			//console.log(eat);
		}
		dir = 'l';
		head.x -= 10;
	}
	if(e.which === 38){
		//console.log('hello');
		if(stop === 0)
			return;
		if(dir === 'd' && c > 1){
			alert('Wrong move !!!');
			return;
		}
		if(stop - ftop === 10 && sleft === fleft){
			c++;
			eat = true;
			//console.log(eat);
		}
		dir = 'u';
		head.y -= 10;
	}
	
	draw(head);
}

function createFood(left, top){
	let food = document.createElement('span');
  	food.setAttribute('class', 'rect');
  	food.setAttribute('id', 'food');
  	food.style.left = left;
  	food.style.top = top;
  	document.getElementById('map').appendChild(food);
}

function draw(s){
	
	if(document.getElementById('map').childNodes.length !== 0 && !eat){
		//console.log('removed...' + eat);
	
		for(let i=c-2;i>=0;i--){
			if(s.x === document.querySelectorAll('#head')[i].offsetLeft && s.y === document.querySelectorAll('#head')[i].offsetTop){
				//end = true;
				alert('Game Over !!! Score: ' + (c-1)*10);
				reset();
				return;
			}
		}
		
  	let head = document.querySelector('#head');
		head.parentNode.removeChild(head);
 	}
 	if(eat){
		let l = Math.round(Math.random()*10)*20 + 'px';
		let t = Math.round(Math.random()*10)*20 + 'px';
  
		if(document.getElementById('food') !== null){
			document.getElementById('food').parentNode.removeChild(document.getElementById('food'));
		}
		createFood(l,t);
 		eat = false;
 	}

	let snake = document.createElement('span');
	snake.setAttribute('class', 'rect');
	snake.setAttribute('id', 'head');
	snake.style.left = s.x + 'px';
	snake.style.top = s.y + 'px';
	document.getElementById('map').appendChild(snake);
  	
	document.getElementById('score').innerHTML = 'Score: ' + (c-1)*10;
	
}

function reset(){
	let l = document.querySelectorAll('#head').length;
	for(let i=0;i<l;i++){
		document.querySelectorAll('#head')[0].parentNode.removeChild(document.querySelectorAll('#head')[0]);
		//console.log(document.querySelectorAll('#head').length);
	}
	document.getElementById('food').parentNode.removeChild(document.getElementById('food'));
	document.getElementById('map').parentNode.removeChild(document.getElementById('map'));
	document.getElementById('score').parentNode.removeChild(document.getElementById('score'));
	document.getElementById('heading').parentNode.removeChild(document.getElementById('heading'));
	//console.log(document.querySelectorAll('#head').length);
	c = 1;
	main();
}

function main(){
	//console.log('hello');
	init();
	document.addEventListener('keydown', move);
}

main();

