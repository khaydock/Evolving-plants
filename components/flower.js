class Flower extends Growable {
  // Making a flower at pos(x,y), growing & opening it
  constructor(x, y, angle, plant){
    super()
    this.pos = createVector(x, y)
    this.angle = angle
    this.plant = plant
    this.lincrement = 10;
    this.wincrement = 10;
    this.dropping = false
    this.groundLevel = height * .75
    // Adjust the direction and speed of petal dropping here
    // To make them fall on the visible ground, change to (random(0,20), random(0,20))
    this.dropVector = createVector(random(25,40), random(.02,.05)) 

    this.seedpod = new SeedPod(
      this.pos.x,
      this.pos.y, 
      this.angle < 0 ? -1 : 1,
      abs(this.angle),
      this.plant,
      this.pos
    )
    this.children = [this.seedpod]

  }

  update(pos, angle) {
    if(this.time > 200) {
      this.drop()
      this.seedpod.update(this.lastpos, this.lastangle)
    }
    else if(this.time >= 0){
      this.pos = pos
      this.angle = angle
      this.lastpos = createVector(this.pos.x, this.pos.y)
      this.lastangle = angle
      this.seedpod.update(this.pos, this.angle)
    }
  }

  grow() {
     //TRY THIS !!!!!!
     if (timeSlider.value() == 0) {
      this.grow
      this.growChildren()
      return
    }

    if(this.time > 50) {
      this.growChildren()
    }
    else if(this.time > 0){
      this.lincrement += 1 * this.timer.inc
      this.wincrement += 1 * this.timer.inc

    }
  }

  grown() {
    // Do not grow any flower
    
    this.grow()
    this.grownChildren()
  }


  draw() {
    if(this.time <= 100) {
    }
    this.drawBack()
    this.seedpod.draw()
    this.drawFront()
    if(this.time <= 100) {
    }
  }


  drawBack() {
    // Draw back flower petals
    let amount = back.darkness*4
    stroke(250-amount, 200-amount, 0);
    strokeWeight(2);
    fill(250-amount, 230-amount, 0)
    let linc = this.lincrement;
    let winc = this.wincrement;
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      scale(0.2)
    // unfolding flower:
    // Second petal
      beginShape();
        vertex(0, 0);
        bezierVertex( 5+winc*.3,  0-linc*.05,  -3+winc*.05,-25-linc*.2,    -1+winc*.4,-20-linc*1);
        bezierVertex(-5+winc*.8,-20-linc*1.8,  -5+winc*2.7, -3-linc*.7,  -20+winc*2.2,4-linc*2.6); 
        bezierVertex(-0+winc*.7,   -5-linc*4,   -6+winc*.1,-20-linc*1.1,   -5+winc*.1,-10-linc*1.4);
        bezierVertex(-2-winc*.3, -3-linc* .1,           -1, 0,                      0,  0);
      endShape();
     // Fourth petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  3-winc*.05,-25-linc*.2,    1-winc*.4,-20-linc*1);
        bezierVertex( 5-winc*.8,-20-linc*1.8,  5-winc*2.7, -3-linc*.7,  20-winc*2.2, 4-linc*2.6);
        bezierVertex( 0-winc*.7, -5-linc*4,     6-winc*.1,-20-linc*1.1,   5-winc*.1,-10-linc*1.4);
        bezierVertex( 2+winc*.3, -3-linc* .1,           1, 0,                     0,  0);
      endShape();
    pop()
    // Stamen
    if(this.lincrement > 45 && this.dropping == false){
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(-10);
        this.drawStamen(-190);
      pop()
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(-18);
        this.drawStamen(-170);
      pop();
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(-26);
        this.drawStamen(-120);
      pop();
    }
  }

  drawFront() {
    // Draw front flower petals
    // stroke(250, 200, 0);
    // strokeWeight(2);
    // fill(250, 230, 0)
    let linc = this.lincrement;
    let winc = this.wincrement;
    push()    
      translate(this.pos.x, this.pos.y)
      rotate(this.angle)
      scale(0.2);
    // unfolding flower:
    // First petal
      beginShape();
        vertex(0, 0);
        bezierVertex(  5+winc*.3,  0-linc*.05, -1+winc*.05,-25-linc*.2,    -1+winc*.5,-20-linc*.8);
        bezierVertex( -1+winc*.5,-20-linc* .8,  -1+winc*.3, -1+linc*.5,  -20+winc*2.2, -3-linc*.3);
        bezierVertex(-15+winc* 3, -5-linc*1.1,     -5+winc,-30-linc*1.2,   -5+winc*.5,-10-linc*1.5);
        bezierVertex( -2-winc*.3, -3-linc* .1,          -1, 0,                      0,  0);
      endShape();
    // Third petal
      beginShape();
        vertex(0, 0);
        bezierVertex(-5-winc*.3,  0-linc*.05,  1-winc*.05,-25-linc*.2,    1-winc*.5,-20-linc*.8);
        bezierVertex( 1-winc*.5,-20-linc* .8,   1-winc*.3, -1+linc*.5,  20-winc*2.2, -3-linc*.3);
        bezierVertex(15-winc* 3, -5-linc*1.1,     5-winc,-30-linc*1.2,    5-winc*.5,-10-linc*1.5);
        bezierVertex( 2+winc*.3, -3-linc* .1,          1, 0,                      0,  0);
      endShape();
    pop()
    // Stamen
    if(this.lincrement > 45 && this.dropping == false){
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(10);
        this.drawStamen(190);
      pop()
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(18);
        this.drawStamen(170);
      pop();
      push();
        translate(this.pos.x, this.pos.y)
        rotate(this.angle)
        scale(0.2);
        rotate(26);
        this.drawStamen(120);
      pop();
    }
  }

  // To drop the flower petals to the ground, remove the +100
  drop() {
    if(this.pos.y < this.groundLevel+100) {
      // The following adds a little flutter to the dropping petals
      this.pos.y += random(0,10)
      this.pos.x += random(-5,10)
      this.pos.add(this.dropVector)

      // The following is to signal that stamen disappear
      this.dropping = true
    }  
  }
  drawStamen(stalen) {
    // Draw a stamen in the flower beginning at (0,0) of length abs(stalen)
    // If stalen < 0, rotate the anther counterclockwise
    this.stalen = stalen
    let yd = abs(this.stalen)
    stroke(210, 140, 10)
    strokeWeight(3)
    noFill()
    bezier(0,0, this.stalen*.1,0, -this.stalen*.2,-yd*.8,  0, -yd)

    let rmove = this.time <= 100 ? random(-3, 3) : 0

    // Draw anther
    fill(250, 200, 0)
         push()
          translate(0, -yd)
          rotate(120 * this.stalen/yd)
          ellipse(0+rmove, 0+rmove, 36, 14)
         pop()
      // }
    // pop()
  }
}