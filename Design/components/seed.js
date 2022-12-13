class Seed {
  // Makes a seed
  // Draws a seed
  // Drops a seed

  constructor(x, y, design) {
    // The position of a seed is pos (before or while dropping)
    this.pos = createVector(x, y) 
    this.design = design
    this.seediam = 10
  
    //The seed position in the design is podPos (after seed dropped)

    // The seed colour
    this.seedR = 130
    this.seedG = 210
    this.seedB = 20

    // Create the random points just above the ground to drop the seeds to
    this.dropPoint = createVector(
      random(0, width),
      height-20
    )
  }

  update(pos) {
    this.pos = pos

  }

  make() {
    // Dropping seeds after the design is selected occurs here
    console.log (" Is it TRUE?")
      if(this.design.selected === true) {
        console.log (" Yes, it's TRUE!")
        this.dropVector = p5.Vector.sub(this.dropPoint, this.pos).normalize().mult(10) 
        this.drop()
      }
      this.update()
  }

  draw() {
    // Draw a seed
    push()
    translate(this.pos.x, -84+this.pos.y)
    // stroke(this.seedR, this.seedG, this.seedB)
    strokeWeight(1)
    fill(250, 220, 20)
    circle(0, 0, 10)
    pop()
  }

  // Drop the seeds to the point just above the ground
  drop() {
    console.log ("DROP IT NOW")
    if(this.pos.y < height-10) {
      this.pos.add(this.dropVector)
    }
  }
}