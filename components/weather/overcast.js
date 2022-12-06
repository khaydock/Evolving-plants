class Overcast {
  // Make a cloudysky that consists of 100 droplets
  constructor(x,y) {
    this.pos = createVector(x, y)
    this.droplets = []
    // Define the position and radius of each droplet
    for (let i = 0; i < 100; i++) {
      this.x = random(-width-50,-50)
      this.y = random(-10,height*.3)
      this.r = random(200,300)
      this.disp = random(10,100)
      this.stay = false
      this.droplets[i] = new Droplet(this.x, this.y, this.r, width, 10+height*.3)
    }
  }
  
  moveIn() {
    // The droplets move in from off the canvas to their positions on the canvas 
    this.pos.x += (this.pos.x <= width)? 3:0
  }

  moveOut() {
    // The droplets move out to make the sky clear up 
    this.pos.x += (this.pos.x < width*2+200)? 1:0
  }

  show() {
    push()
      translate(this.pos.x, this.pos.y) 
      for(let droplet of this.droplets) {
        droplet.jiggle()
        droplet.show()
      }
    pop()    
  }
} 