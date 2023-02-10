class Person {
  // Make a person
  constructor(x,y, variety) {
    this.pos = createVector(x, y)
    this.armAng = 0
    this.walkAng = 0
    this.wave = []
    this.v = variety
  }

  move() {
    // the person moves to the left and stops
    this.pos.x -= (this.pos.x > width/27) ? .3:0
    // they move up and down as they are walking along
    for (let i = 0; i <= 10; i++) {
      this.walkAng += (this.pos.x > width/27) ? 1:0
      this.wave[i] = .5 * cos(this.walkAng) 
    }
    // they lower their arm
    this.armAng -= (this.armAng > -30) ? .5:0
  }

  show() {
    fill (110,100,90)
    noStroke()
    scale(20)
    push ()
    for (let i = 0; i < 8; i++) {
      translate (0,this.wave[i])
      translate (this.pos.x,-this.pos.y)
      // the person
      beginShape()
        vertex(8, 13+this.v*2)
        // neck 
        bezierVertex(8,12,     5,8,     9.5,5) 
        bezierVertex(9.5,5,   9,4.3,   9,4.3) 
        // chin
        bezierVertex(9,4.3-this.v,   7.5,5.3, 7.3,4.) 
        bezierVertex(6.8,4.5, 7,4.3,   7,4.3) 
        // mouth
        bezierVertex(7,4.3,   6.3,4.3,  6.6+this.v,4-random()) 
        bezierVertex(7.4,3.5,  7.5,3.8,  7.4-random(),3.5)
        bezierVertex(7,3.2,  5.8-this.v,3.5,  6,3.3+this.v) 
        // nose
        bezierVertex(6.2,2.8,  6.4,2.5,  6.4,2.5)
        bezierVertex(6.4,2.5,  5.4,3,  5.5,2.4+this.v)
        bezierVertex(5.6,2.1,  6.3,1.5,  6.1,1.3)
        // eye
        bezierVertex(6.4,1.4,  6.7,1.4,  7.5,1.5+this.v*.5)
        bezierVertex(7.7,1.3,  6.7,0.7,  6.4,1.4)
        // head & back
        bezierVertex(5.7,1.7,  6.4,0-this.v*2,  8+this.v*3,0) 
        bezierVertex(9,0,  10.5,0,   11.5,1) 
        bezierVertex(12.7,2,  17,9,   18-this.v*5,13) 
        vertex(8,13) 
      endShape() 
     circle (6.76,1.26, .4)
    }
    pop ()

    // the arm
     push ()
     for (let i = 0; i < 8; i++) {
      translate (0,this.wave[i])
      translate (this.pos.x+9,-this.pos.y+7)
      rotate (this.armAng)
      beginShape()
        vertex(0,3)
        bezierVertex(-3,1,     -4,3,    -5,2.7)  
        bezierVertex(-6,2.5,  -9,-.5,   -9,-2)  
        bezierVertex(-9,-3,     -8,-4,     -8,-3.5) 
        bezierVertex(-8,-3,     -8,-2.5,   -7.5,-2)
        bezierVertex(-7.1,-2.7, -7.4,-2.9, -7,-2.7) 
        bezierVertex(-6.7,-2.7, -6.7,-1.4, -7,-1)  
        bezierVertex(-6.3,-.5,   -5.5,1,  -4.7,1)
        vertex(0, -1) 
      endShape()
    } 
    pop ()
    
    // the old fixed arm
    // vertex(9, 6)
    // bezierVertex(6,9,     5,11,    4,10.7)  
    // bezierVertex(3,10.5,  0,7.5,   0,6)  
    // bezierVertex(0,5,     1,4,     1,4.5) 
    // bezierVertex(1,5,     1,5.5,   1.5,6)
    // bezierVertex(1.9,5.7, 1.6,5.1, 2,5.3) 
    // bezierVertex(2.3,5.7, 2.3,6.6, 2,7)  
    // bezierVertex(2,7.5,   3.5,9,   4.3,9)
    // vertex(10,8) 
  }
}