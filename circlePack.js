function circlePack(cfg){
	let c = cfg;
	
	function Circle(p, r){
		this.pos = createVector(p.x, p.y);
		this.rad = r;
	}
	
	function getRandomPointInCircle(p, c) {
		let v = createVector(random(-1, 1), random(-1, 1));
		v.normalize();
		v.mult(random(0, c.rad));
		[p.x, p.y] = [v.x, v.y];
	}

	function distToCircle(c, pos, padding) {
		return dist(c.pos.x, c.pos.y, pos.x, pos.y) - c.rad;// - padding;
	}

	function pointInCircle(pos, c) {
		return dist(pos.x, pos.y, c.pos.x, c.pos.y) <= c.rad;
	}

	let R = 0;
	let G = 0;
	let B = 0;
	function getNextColor(){
		R+=20;
		if(R >=255){
			R = 0;
			G += 20;
			if(G >= 255){
				G = 0; 
				B+= 20;
			}
		}
		return [R,G,B];
	}
	
	// Should the circles be constrained within the parent circle bounds?
	// Setting to false yields prettier renders
	const stayInBounds = false;
	
	let parent = new Circle(createVector(), cfg.parentRad || c.gfx.width);
	let circles = [];
	
	let p = createVector();
	
	let iterations = 0;
	while(circles.length < c.maxCount && iterations < 10000){
		iterations++;
		
		let shortestDistance = Infinity;
		//
  	let rad = c.maxSize;
  	let invalidSpot = true;
  	let attempts = 0;
		
		// Make sure we didn't pick a point inside another circle
		while (invalidSpot && attempts < c.maxAttempts) {
			getRandomPointInCircle(p, parent);

			attempts++;
			invalidSpot = false;

			for (let cc = 0; cc < circles.length; cc++) {
				if (pointInCircle(p, circles[cc])) {
					invalidSpot = true;
				}
			}
		}
		
		// Use this to prevent really long loops
		if (invalidSpot) continue;

	  // If it's the first one
	  if (circles.length === 0) {
	    rad = c.maxSize;
	  } else {
	    // find closest circle
			for(let j = 0; j < circles.length; j++){
				let c = circles[j];
				let d = distToCircle(c, p, c.padding);
				if (d < shortestDistance) {
					shortestDistance = d;
					rad = d;
				}
			}
	  }

		// Shrink the circle if necessary to keep it in bounds
		if (stayInBounds) {
			let d = dist(0, 0, p.x, p.y);
			if (rad + d > parent.rad - c.padding) {
				rad = parent.rad - d - c.padding;
			}
		}

		// if we had to shrink the circle past what the user wants, reject it.
		if (rad < c.minSize) continue;

		rad = constrain(rad, c.minSize, c.maxSize);
		
		circles.push(new Circle(p, rad));
	}
	
	let colorKeys = [];
	c.gfx.push();
	c.gfx.translate(c.gfx.width/2, c.gfx.height/2);
	circles.forEach( (v,i,a) => {
		let col = getNextColor();
		colorKeys.push(col);
		c.gfx.fill(col[0], col[1], col[2]);
		c.gfx.ellipse(v.pos.x, v.pos.y, v.rad*2);
	});
	c.gfx.pop();
	
	c.gfx.loadPixels();
	c.gfx.updatePixels();
	
	return circles;
}