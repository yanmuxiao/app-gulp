var game;
var onceVariable = true;
function Basketball() {
	
	this.version = '0.1';
	this.balls = [];
	this.hoops = [];
	this.texts = [];
	this.res = {}; // 存储图片和音频
	this.score = 0;
	this.started = false;
	this.gameOver = false;
	this.ballX = 320 / 2;
	this.ballY = 880;
	this.ballVel = 800;//篮球的速度
	this.ballAngleVel = 100;
	this.ballAngle = 0;
	this.ballsShot = 1;
	this.ballCharge = 0;
	this.time = 60;
	this.toNextSecond = 1;
	this.sound = false;
	this.state = 'menu';
    this.menuText = new AnimatedText("点击开始!", 640 / 2, 960 / 2 + 50, 40, 0.01);
    this.overText = new AnimatedText("点击继续!", 640 / 2, 800, 40, 0.01);
    this.flashText = [];
    this.scored = 0;
    this.totalBalls = 3; // 未命中的投篮机会
    this.round = 1;
    this.missed = 0;
    this.displayScore = 0;
    this.storage = (typeof(Storage) !== "undefined") ? true : false;


    var tlTimes = document.getElementById('tlTimes');
    var tlGrade = document.getElementById('tlGrade');


	this.init = function() {
		this.setupCanvas(); // 第一步
		this.load();	// 第二步
		this.setupEventListeners();
		this.resizeToWindow();
		return this;
	};
	
	// 设置画布(第一步) 
	this.setupCanvas = function() {
		this.canvas = document.getElementById('canvas');
		this.canvas.width = 640;
		this.canvas.height = 960;
		this.ctx = this.canvas.getContext('2d');
	};
	
	this.setupEventListeners = function() {
		var self = this;
		this.canvas.addEventListener('mousedown', function() {
			self.click = true;
		}, false);
		this.canvas.addEventListener('mouseup', function() {
			self.click = false;
		}, false);
		this.canvas.addEventListener('touchstart', function() {
			self.click = true;
		}, false);
		this.canvas.addEventListener('touchend', function() {
			self.click = false;
		}, false);
		
		window.addEventListener('resize', function() {
			self.resizeToWindow();
		}, false);
	};
	
	this.resizeToWindow = function() {
		var h2 = parseInt(parseInt(window.innerWidth) * 960 / 640);
		var w = this.canvas.width / this.canvas.height;
		var h = h2;
		var ratio = h * w;
		this.canvas.style.width = Math.floor(ratio) + 'px';
		this.canvas.style.height = Math.floor(h) + 'px';
	};
	

	this.start = function() {
		var self = this;
		var then = Date.now();
		setInterval(function() {
			var now = Date.now();
			var delta = now - then;
			self.loop(delta / 1000);
			then = now;
		}, 60 / 1000);
		//this.hoops.push(new Hoop(120, 520), new Hoop(640 - 148 - 120, 520), new Hoop(640 / 2 - (148 / 2), 260));
/****/		this.hoops.push(new Hoop(120, 460), new Hoop(640 - 148 - 120, 460), new Hoop(640 / 2 - (148 / 2), 200));
	};
	
	// 绘制loading...的方法
	this.drawLoadingScreen = function() {
		var ctx = this.canvas.getContext('2d');
		ctx.fillStyle = 'black';
		ctx.fillRect(0, 0, 960, 640);
		ctx.textAlign = 'center';
		this.drawText(ctx, 'Loading...', 640 / 2, 960 / 2, 40);
		ctx.textAlign = 'left';
	};
	

	// 需要用到的图片和音频资源
	this.getResources = function() {
/****/		var images = [
			'image/background.jpg',
			'image/alertTop.png',
			'image/alertBottom.png',
			'image/alertCenter.png',
			'image/ball.png',
			'image/hoop.png',
			'image/hoop1.png',
			'image/hoop2.png'
		];
		var sounds = [
			'image/bounce_1.wav'
		];
		if(this.sound) {
			return images.concat(sounds);
		}
		return images;
	};
	
	// 需要用到的资源是否已经加载完成的判断(第二步)
	this.load = function() {
		this.drawLoadingScreen(); // loading...的出现
		var self = this;
		var loaded = 0;
		var res = this.getResources();
		for(var i = 0; i < res.length; i++) {
			var type = res[i].split('.').pop();
			if(type == 'png' || type == 'jpg') {// png图片
				var image = new Image();
				image.src = res[i];
				image.addEventListener('load', function() {
					loaded++;
					if(loaded == res.length) {
	/****/					self.start();// 图片加载完成后调用函数绘制
						$('.tl-header').css({
							'display': '-webkit-box'
						});
						$('.tl-buttons').css({
							'display': '-webkit-box'
						})
						$('.threeTime').show();
					}
				}, false);
				this.res[res[i]] = image;
			}else { // 音频
				var sound = new Audio();
				sound.src = res[i];
				sound.addEventListener('canplaythrough', function() {
					loaded++;
					if(loaded == res.length) {
						self.start();// 音频加载完成
					}
				}, false);
				this.res[res[i]] = sound;
			} 
		}
	};
	
	// 播放音频
	this.playSound = function(name) {
		if(this.sound) {
			this.res[name].currentTime = 0;
			this.res[name].play();
		}
	};

	// 绘制文字如：’点击开始’、‘您有多少次机会’
	this.drawText = function(ctx, string, x, y, size) {
		ctx.font = size + 'px Contrail One';
		ctx.lineWidth = 5;
		ctx.strokeStyle = 'white';
		ctx.strokeText(string, x, y);
		ctx.fillStyle = '#0098BF';
		ctx.fillText(string, x, y);
	};
	
	this.loop = function(delta) {
		this.update(delta);
		this.draw(this.canvas.getContext('2d'));		
	};
	
	this.update = function(delta) {
		if(this.state == 'menu') {
			if(this.click) {
				this.state = 'play';
                this.flashText.push(new FlashText("开始"));
				this.click = false;
			}
            this.menuText.update(delta);
		}
		if(this.state == 'play') {
			this.ballX += this.ballVel * delta;
			if(this.ballX > 640 - 93) {
				this.ballVel = -this.ballVel;
				this.ballX = 640 - 93;
			}
			if(this.ballX < 0) {
				this.ballVel = -this.ballVel;
				this.ballX = 0;
			}
			for(var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if(ball.falling) {
					for(var j = 0; j < this.hoops.length; j++) {
						var hoop = this.hoops[j];
						var cx = hoop.x + (148 /2);
/****/						var cy = hoop.y + 150; // 篮球的进框y轴位置
						var dx = cx - ball.x;
						var dy = cy - ball.y;
						var mag = Math.sqrt(dx * dx + dy * dy);
						if(mag < 47 + 5) {
							if(!ball.scored) {
								ball.setAngle(90);
								this.score += 10;
								tlGrade.innerHTML = this.score;
								this.texts.push(new PopText('+ 10', hoop.x, hoop.y));
							}
							ball.scored = true;
						}
						if(!ball.scored) {
							for(var z = 0; z < hoop.points.length; z++) {
								var point = hoop.points[z];
								var dx = point.x - ball.x;
								var dy = point.y - ball.y;
								var mag = Math.sqrt(dx * dx + dy * dy);
								var angle = Math.atan2(point.y - ball.y, point.x - ball.x);
								if(mag > 47 + 7 && !ball.canBounce){
									ball.canBounce = true;
								}
								if(mag < 47 + 5 && ball.canBounce) {
									this.playSound('image/bounce_1.wav');
									ball.bounces++;
									ball.setAngle((angle * 180 / Math.PI) + 180 + Math.floor(Math.random() * 10) - Math.floor(Math.random() * 10));
									if(ball.bounces > 3) {
										ball.bounces = 3;
									}
									var deg = angle * 180 / Math.PI;
									if(deg > 0 && deg < 180) {
										ball.gravity = 950 + (ball.bounces * 100);
									}
									ball.angleVel = -ball.angleVel;
									ball.canBounce = false;
								}
							}
						}
					}
				}
				ball.update(delta);
				if(ball.y > 960) {
					this.ballX = ball.x;
					this.balls.splice(i, 1);
                    if(!ball.scored) {
                        this.flashText.push(new FlashText("没投进"));
                        tlTimes.innerHTML = this.missed + 1;
                        if(++this.missed >= this.totalBalls) {//不进球次数
                            this.state = 'over';
                        }
                    }
				}
                if(ball.x < -100 || ball.x > 740) {
                    this.ballX = ball.x;
                    this.balls.splice(i, 1);
                    if(!ball.scored) {
                        this.flashText.push(new FlashText("没投进"));
                        tlTimes.innerHTML = this.missed + 1;
                        if(++this.missed >= this.totalBalls) {//不进球次数
                            this.state = 'over';
                        }
                    }
                }
			}
			if(this.click && this.ballY <= 950) {
				if(this.balls.length < 1) {
					var ball = new Ball(this.ballX + (93 / 2), this.ballY);
					ball.drawAngle = this.ballAngle;
					ball.shoot(1480);
					this.balls.push(ball);
					this.ballY = 961;
				}
			}
			if(this.balls.length < 1 && this.ballY > 880) {
				this.ballY -= 100 * delta;
			}
			if(!this.click) {
				this.ballsShot = 0;
			}
			for(var i = 0; i < this.texts.length; i++) {
				var text = this.texts[i];
				text.update(delta);
			}
            for(var i = 0; i < this.hoops.length; i++) {
                var hoop = this.hoops[i];
                hoop.update(delta);
            }
            for(var i = 0; i < this.flashText.length; i++) {
                var text = this.flashText[i];
                text.update(delta);
                if(text.opacity <= 0) {
                    this.flashText.splice(i, 1);
                }
            }
		}
        if(this.state == 'over') {
        	if(myFlag){
        		updateShare(this.score); 
				Play68.setRankingScoreDesc(this.score);
        		myFlag=0;
        	}
            var score = localStorage.getItem("score");
            if(!score) {
                localStorage.setItem("score", 0);
            }
            if(this.displayScore < this.score) {
                this.displayScore += 3;
            }else {
                this.displayScore = this.score;
                if(score) {
                    if(this.score > score) {
                        localStorage.setItem("score", this.score);
                    }
                }
            }
            this.overText.update(delta);
        }
		if(this.state == 'over' && this.click && this.displayScore >= this.score) {
			myFlag=1;
			this.score = 0;
			this.time = 60;
			this.balls = [];
			this.state = 'menu';
			this.click = false;
            this.scored = 0;
            this.missed = 0;
            this.flashText = [];
/****/
            tlTimes.innerHTML = this.missed;
            tlGrade.innerHTML = this.scored;
		}
		this.ballAngle += 100 * delta;

	};
	
	this.draw = function(ctx) {
		ctx.drawImage(this.res['image/background.jpg'], 0, 0);

		//当前状态 ==> 还没点击开始玩游戏
		if(this.state == 'menu') {

			// 绘制title ==> '投篮'
			//ctx.drawImage(this.res['image/title.png'], 640 / 2 - (492 / 2), 100);
            
            // 绘制点击开始 ==> '点击开始'的动画
            this.menuText.draw(ctx);
            this.ctx.textAlign = "center";

            // 绘制投篮的规则
			// this.drawText(ctx, '您有' + this.totalBalls +'次投篮未命中的机会！', 640 / 2, 900, 26);
			// ctx.textAlign = 'left';
		}

		// 当前状态 ==> 点击开始玩游戏后
		if(this.state == 'menu' || this.state == 'play') {
			// 绘制点击开始 ==> '点击开始'的动画
            

/****/		onceVariable = true;
			for(var i = 0; i < this.hoops.length; i++) {
				var hoop = this.hoops[i];
				hoop.drawBack(ctx);
			}
			for(var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if(ball.falling) {
					ball.draw(ctx);
				}
			}
			for(var i = 0; i < this.hoops.length; i++) {
				var hoop = this.hoops[i];
				hoop.drawFront(ctx);
			}
			for(var i = 0; i < this.balls.length; i++) {
				var ball = this.balls[i];
				if(!ball.falling) {
					ball.draw(ctx);
				}
			}
			if(this.balls.length < 1) {
				drawImage(ctx, this.res['image/ball.png'], this.ballX, this.ballY, 0, 0, 93, 93, 45, 45, this.ballAngle);
			}
            ctx.textAlign = "left";
            // this.drawText(ctx, "分数: " + this.score, 50, 70, 40);
            // this.drawText(ctx, "未命中: " + this.missed, 400, 70, 40);
			for(var i = 0; i < this.texts.length; i++) {
				var text = this.texts[i];
				text.draw(ctx);
			}
            for(var i = 0; i < this.flashText.length; i++) {
                var text = this.flashText[i];
                text.draw(ctx);
            }
		}

		// 当前状态 ==> 玩游戏结束后
		if(this.state == 'over'){
			// ctx.textAlign = 'center';
			// this.drawText(ctx, '游戏结束', 640 / 2, 200, 80);
			// this.drawText(ctx, '分数: ' + this.displayScore, 640 / 2, 400, 50);
   //          if(this.storage) {
   //              this.drawText(ctx, "最高分: " + localStorage.score, 640 / 2, 500, 50);
   //          }
			// if(this.displayScore >= this.score) this.overText.draw(ctx);
			// ctx.textAlign = 'center';
/****/
			if(onceVariable) {
				$('#gameOver').css({
		    		'display': '-webkit-box'
		    	});
		    	$('#tlButtons').show();
		    	onceVariable = false;

		    	console.log(parseInt(tlGrade.innerHTML));

		    	myFlag=1;
				this.score = 0;
				this.time = 60;
				this.balls = [];
				this.state = 'menu';
				this.click = false;
	            this.scored = 0;
	            this.missed = 0;
	            this.flashText = [];

			}
		}

	};
	
}
/****/
var hoopArr = ['image/hoop.png', 'image/hoop1.png', 'image/hoop2.png']
var hoopIndex = 0;
// 绘制篮筐
function Hoop(x, y) {
	this.hoopUrl = hoopArr[hoopIndex++];/****/
	this.x = x;
	this.y = y;
    this.move = true;
    this.vel = 150;/****/
	
	this.points = [{
		x: x + 7,
		y: y + 175 //80
	},
	{
		x: x + 141,
		y: y + 175 //80
	}];
	
	var oIndex = 0;/****/
	var arrA = [10,5,15];
	this.update = function(delta) {
		
        if(this.move) {
            this.x += this.vel * delta;
            for(var i = 0; i < this.points.length; i++) {
                var point = this.points[i];
                point.x += this.vel * delta;
            }
            var accelerateA = arrA[oIndex%3];/****/
			oIndex++;
            if(this.x > 640 - 148 - 110) {
                this.vel = -this.vel - accelerateA;
                this.x = 640 - 148 - 110;
            }else if(this.x < 110) {
                this.vel = -this.vel- accelerateA;
                this.x = 110;
            }
        }
	};
	/****/
	// 绘制篮筐==>在篮球的后面
	this.drawBack = function(ctx) {
		//drawImage(ctx, game.res['image/hoop.png'], this.x, this.y, 0, 0, 148, 22, 0, 0, 0);
		drawImage(ctx, game.res[this.hoopUrl], this.x, this.y, 0, 0, 148, 160, 0, 0, 0);

		//drawImage(ctx, game.res['image/hoop.png'], this.x, this.y + 135, 0, 135, 148, 299 - 135, 0, 0, 0);

	};
	/****/
	// 绘制篮筐==>在篮球的前面
	this.drawFront = function(ctx) {
		//drawImage(ctx, game.res['image/hoop.png'], this.x, this.y + 22, 0, 22, 148, 178 - 22, 0, 0, 0);
		//drawImage(ctx, game.res[this.hoopUrl], this.x, this.y + 160, 0, 160, 148, 299 - 160, 0, 0, 0);
		drawImage(ctx, game.res[this.hoopUrl], this.x, this.y + 160, 0, 160, 148, 280 - 160, 0, 0, 0);
		for(var i = 0; i < this.points.length; i++) {
			var point = this.points[i];
			ctx.beginPath();
			ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI, false);
			ctx.fillStyle = '#f00';
			//ctx.fill();
		}
	};
		
}

function Ball(x, y) {
	
	this.x = x;
	this.y = y;
	this.vx = 0;
	this.vy = 0;
	this.speed = 100;
	
	this.canBounce = true;
	
	this.angle = 270;
	this.gravity = 0;
	this.falling = false;
	this.bounces = 0;
	this.scored = false;
	
	this.drawAngle = 0;
	this.angleVel = 100;
	
	this.solid = false;
	
	this.z = 1;
		
	this.setAngle = function(angle) {
		this.angle = angle;
		this.vx = this.speed * Math.cos(this.angle * Math.PI / 180);
		this.vy = this.speed * Math.sin(this.angle * Math.PI / 180);
		this.gravity = 0;
	};
	
	this.shoot = function(power) {
		this.speed = power + Math.floor(Math.random() * 40);
		this.setAngle(270);
	};
	
	this.update = function(delta) {
		this.y += this.gravity * delta;
		this.gravity += 1500 * delta;
		this.x += this.vx * delta;
		this.y += this.vy * delta;
		if(this.vx > 500) this.vx = 500;
		if(this.vy > 500) this.vy = 500;		
		if(this.y < 300) {
			this.solid = true;
		}
		if(this.gravity > this.speed) {
			this.falling = true;
		}
        if(this.x + 47 > 640) {
            this.vx = this.vx * -1;
            this.x = 640 - 47;
        }
        if(this.x - 47 < 0) {
            this.vx = this.vx * -1;
            this.x = 47;
        }
		this.drawAngle += this.angleVel * delta;
	};
	
	this.draw = function(ctx) {
		drawImage(ctx, game.res['image/ball.png'], Math.floor(this.x - (93 / 2)), Math.floor(this.y - (93 / 2)), 0, 0, 93, 93, 93 / 2, 93 / 2, this.drawAngle);
	};
	
}


// 绘制进篮筐是的分数文字动画，如：+ 150 、 + 100
function PopText(string, x, y) {
	this.string = string;
	this.x = x;
	this.y = y;
	this.vy = -500;
	this.opacity = 1;
	
	this.update = function(delta) {
		this.y += this.vy * delta;
		this.vy += 1000 * delta;
		if(this.vy > 0 && this.opacity > 0) {
			this.opacity -= 2 * delta;
		}
		if(this.opacity <= 0) {
			this.opacity = 0;
		}
	};
	
	this.draw = function(ctx) {
		ctx.globalAlpha = this.opacity;
		game.drawText(ctx, this.string, this.x + 15, this.y);
		ctx.globalAlpha = 1;
	};
}


// 绘制放大缩小的文字(点击开始 + 点击继续)
function AnimatedText(string, x, y, size, speed) {
    this.string = string;
    this.x = x;
    this.y = y;
    this.size = size;
    this.vel = 50;
    this.speed = speed;
    this.toNextSize = 0;

    this.update = function(delta) {
        this.size += this.vel * delta;
        if(this.size >= 60) {
            this.vel = -this.vel;
            this.size = 60;
        }else if(this.size <= 40) {
            this.vel = -this.vel;
            this.size = 40;
        }
    }

    this.draw = function(ctx) {
        ctx.save();
        ctx.textAlign = "center";
        game.drawText(ctx, this.string, this.x, this.y, this.size);
        ctx.restore();
    }
}

// 绘制刚开始玩游戏的‘开始’和‘没投进’的动画
function FlashText(string) { 
    this.string = string;
    this.size = 10;
    this.speed = 170;
    this.opacity = 1;

    this.update = function(delta) {
        this.size += this.speed * delta;
        if(this.size > 100) {
            this.opacity -= 2 * delta;
        }
    }

    this.draw = function(ctx) {
        ctx.textAlign = "center";
        ctx.save();
        ctx.globalAlpha = this.opacity;
        game.drawText(ctx, this.string, 640 / 2, 960 / 2, this.size);
        ctx.restore();
    }
}


// 绘制不停滚动的篮球
function drawImage(ctx, image, x, y, sx, sy, w, h, rx, ry, a) {
	ctx.save();
	ctx.translate(x + rx, y + ry);
	ctx.rotate(a * Math.PI / 180);//球旋转
	ctx.drawImage(image, sx, sy, w, h, -rx, -ry, w, h);
	ctx.restore();
}

window.onload = function() {
	game = new Basketball().init();
};

