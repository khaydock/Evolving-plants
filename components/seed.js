class Seed extends Growable {
  // Makes a seed at the position determined in seedpod
  // Makes the seed grow to a max of seediam
  // Drops selected seeds (after they are fully grown)
  constructor(x, y, plant, seediam) {
    super()
    this.seediam = seediam // dont really need
    this.plant = plant
    this.death = death
    this.deathTime = 0
    // The position of a seed is pos (in pod or dropping)
    this.pos = createVector(x, y)

    // The seed diameter is incremented by this.r
    this.r = 0.01

    // Initially, the seed coat is green (130,210,20)
    this.seedR = 130
    this.seedG = 210
    this.seedB = 20

    // Create the random points just above the ground to drop the seeds to
    this.groundLevel = height *.75
    this.dropPoint = createVector(
      random(0, width),
      this.groundLevel
    )
  }

  update(pos) {
    this.pos = pos
  }


  grow() {

    if(this.time > 550) {
      this.growChildren()
      
      // Dropping seeds after the plant is selected occurs here
      if(this.plant.selected === true) {
        this.dropVector = p5.Vector.sub(this.dropPoint, this.pos).normalize().mult(10) 
        this.drop()
      }

    } 
    else {
      // Increase the seed diameter until it reaches the maximum (this.seediam)
      this.r += (this.r < this.seediam) ? 0.01 * this.timer.inc : 0.0
          
      // Seed coat turns dark brown (150,100,20) at end of growth
      if(this.r > this.seediam*.4) {
        this.seedR += (this.seedR < 150) ? 2* this.timer.inc  :0
        this.seedG -= (this.seedG > 100) ? 2* this.timer.inc  :0
        // this.seedB -= (this.seedB > 10) ? 2* this.timer.inc  :0
      }
    }
  }

  grown () {
    // Instead of growing, the seed is already fully grown
    this.r = this.seediam
    this.grownChildren()
  }

  draw() {
    // Draw a seed
     // The plant falls over
     if (death && !this.plant.selected) {
      // limit determines how far the plant moves to the right as it falls over
      let limit = 200
      if (bulldozer) limit = 70
      // flow determines how fast the plants move to the right
      let flow = 1
      if (stormy) flow = 10
      if (this.deathTime < limit) {
        this.deathTime += 1
        this.pos.x += flow * this.deathTime* .02
        this.pos.y -= (this.deathTime < 70) ? this.deathTime*.02 : 0
      }
    }

    push()
    translate(this.pos.x, this.pos.y)
    stroke(this.seedR, this.seedG, this.seedB)
    strokeWeight(1)
    fill(250, 220, 20)
    circle(0, 0, this.r)
    pop()
  }

  // Drop the seeds to the point just above the ground
  drop() {
    if(this.pos.y < this.groundLevel) {
      this.pos.add(this.dropVector)
    }
  }
}