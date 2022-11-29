class Moon {
  constructor(x,y){
    this.pos = createVector(x, y)
    this.diam = 160
    this.moonC = 255
    }     
    
  show() {
    strokeWeight(35)
    // fill (this.moonC)
    let c = this.moonC -80
    stroke(c,c,c,100)
    push()
      translate(this.pos.x, this.pos.y)
      noStroke()
      circle(0, 0, this.diam) 
      let fluct = random (10,30)
      stroke (c,c,c, fluct)   
      noFill ()
      circle(0, 0, this.diam+30) 
      pop () 
    }
  }