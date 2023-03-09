function genPaper(g, op, r, cnt){
	// let cnt = 80000;
	// let r = 5;
	// let op = 10;
	
	g.push();
	// let artSize = [cols*sz + 30, rows * sz + 30];
	// translate(WW/2 - artSize[0]/2, WH/2 - artSize[1]/2);
	
	g.noStroke();
	g.fill(255,255, 255, op);
	for(let i = 0; i < cnt; i++){
		let rx = random(0, width);
		let ry = random(0, height);
		g.ellipse(rx, ry, r)
	}
	g.pop();
}

function genPaperLines(g, op, cnt){
	// let cnt = 80000;
	// let r = 5;
	// let op = 10;
	
	g.push();
	
	g.stroke(200, op);
	g.noFill();
	
	for(let i = 0; i < cnt; i++){
		let rx = random(0, width);
		let ry = random(0, height);
		let len = random(0,40);
		
		g.push();
		g.translate(rx, ry);
		g.rotate(random()*TAU);
		
		// g.line(0,0, len, 0);
		
		let a0 = createVector(0,0);
		let c0 = randomVec(PI, 3/4*TAU);
		c0.mult(40);
				
		// p5.Vector.random2D();
		// c0.mult(30);
		//a0.copy();
		let a1 = createVector(50, 0);
		let c1 = a1.copy();
		let v = randomVec(PI/2, 3/4 * TAU);
		v.x *= -1;
		v.mult(40);
		a1.add(v);
		
		g.bezier(a0.x, a0.y,
						 c0.x, c0.y,
						 c1.x, c1.y,
						 a1.x, a1.y);
		
		g.pop();
	}
	g.pop();
}


function randomVec(lower, higher){
	let r = random(lower, higher);
	
	let v = createVector(0, 1);
	v.rotate(r);
	return v;
}