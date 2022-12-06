class Cloud {
  // Make a cloud at pos.x, pos.y that consists of 30 droplets
  // The clouds move from left to right at this.speed
  // The cloud will be of dimensions -this.x, this.y
  // The cloud is originally to the left of the y-axis
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.speed = 4
    this.droplets = []
    // Define the position and radius of the droplets that make a cloud
    // To make a more dense cloud, increase the number of droplets
    for (let i = 0; i < 30; i++) {
      this.x = random(-120,0)
      this.y = random(0,60)
      this.r = random(80,180)
      this.disp = random(0,100)
      this.droplets[i] = new Droplet(this.x, this.y, this.r, 170, 100);
    }
  }
  
  move() {
  // The cloud moves from left to right

    // Move in +x direction
    this.pos.x += this.speed
   
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