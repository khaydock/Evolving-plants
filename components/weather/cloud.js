class Cloud {
  // Make a cloud at pos.x, pos.y that consists of 30 droplets
  // The cloud will be of dimensions -this.x, this.y
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.droplets = []
    // Define the position and radius of each droplet
    // The cloud is originally to the left of the y-axis
    for (let i = 0; i < 30; i++) {
      this.x = random(-120,0)
      this.y = random(0,60)
      this.r = random(60,140)
      this.disp = random(0,100)
      this.droplets[i] = new Droplet(this.x, this.y, this.r, 170, 100);
    }
  }
  
  move() {
  // The cloud moves from left to right

    // Move in +x direction
    this.pos.x += 2
   
    // Re-enter on left after exiting on the right, with some displacement
    if (this.pos.x > width + 200) {
      this.pos.x = this.pos.x - width*1.3 -this.disp
      this.pos.y = this.pos.y + this.disp * 3
      if (this.pos.y < 0 || this.pos.y > 300 ) {this.pos.y = this.disp * 3}
    }
  }

  show() {
     // The cloud keeps changing shape due to the jiggling and displacement of each droplet
    push();
      translate(this.pos.x, this.pos.y) 
      for(let droplet of this.droplets) {
        droplet.jiggle()
        droplet.show()
      }
    pop();     
  }
}