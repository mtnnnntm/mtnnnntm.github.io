// Andor Saga

let gfx;
let circles;

let paperGfx;
let paperGfxLines;

function setup () {
	createCanvas(windowWidth, windowHeight);
	smooth();
	
	// paperGfx = createGraphics(width, height);
	// genPaper(paperGfx);
	
	paperGfx = createGraphics(width, height);
	paperGfxLines = createGraphics(width, height);
	
	genPaper(paperGfx, 2, 15, 7000);
	paperGfx.filter(BLUR, 2);
	genPaper(paperGfx, 10, 5, 4000);
	
	genPaperLines(paperGfxLines, 10, 1000);
	genPaperLines(paperGfxLines, 20, 40);
	genPaperLines(paperGfxLines, 40 , 5);
	
	
	
	gfx = createGraphics(1080, 1080);
	circles = circlePack({
		gfx: gfx,
		minSize: 10,
		maxSize: 60,
		maxAttempts: 350,
		padding: 0,
		maxCount: 1250,
		parentRad: 400
	});
}

function draw(){
  background(0);
	
	image(paperGfx,0,0);
	image(paperGfxLines,0,0);
	
	translate(width/2, height/2);
	
	let target = createVector(mouseX - width/2, mouseY - height/2);
	// target.mult(0);//center;
	
	circles.forEach( c => {	
		strokeWeight(2);
		fill(255,215);
		ellipse(c.pos.x, c.pos.y, c.rad*2);
		let circlePos = createVector(c.pos.x, c.pos.y);
		
		let pupil = p5.Vector.sub(target, circlePos);
		pupil.normalize();
		
		let temp = pupil.copy();
		temp.mult(c.rad/2);
		
		pupil.mult(c.rad);
		pupil.sub(temp);
		pupil.add(circlePos);
		
		stroke(0);
		strokeWeight(1);
		fill(0);
		ellipse(pupil.x, pupil.y, c.rad - 5);
	});
}

function keyPressed(){
if(key === 's')save();
}