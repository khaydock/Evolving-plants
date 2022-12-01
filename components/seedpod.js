class SeedPod extends Growable {
  // Makes the seedpod, calls seed to add the seeds
  // Sets the distances between the seeds in the seedpod and the curvature of the seedpod
  constructor(x, y, dir, angle, plant, posEnd) {
    super()
    this.plant = plant
    this.seeds = []
    this.pos = createVector(x, y)
    this.posEnd = posEnd
    this.death = death
    this.deathTime = 0
    this.dir = dir
    this.angle = this.dir * angle
    // Define the number of seeds in a seedpod (this.nSeeds)
    this.nSeeds = this.plant.genes.numSeeds + floor(random(-1.4,1.4))
    // Every pod on same plant should have numSeeds +- 1 seeds
    if (this.nSeeds < 3) {this.nSeeds = 3}
    if (this.nSeeds > 14) {this.nSeeds = 14}
      // Define the initial separation distance between seeds
    this.seedSeparation = .001
    this.seediam = this.plant.genes.seediam + random(-1,1)

    // Define the initial seedpod colour
    this.podR = 50
    this.podG = 200
    this.podB = 20

    // Define the seeds
    for(let i = 0; i < this.nSeeds; i++) {
      const seed = new Seed(0, 0, this.plant,this.seediam)
      this.seeds.push(seed)
      this.children.push(seed)
      this.plant.allChildren.push(seed)
    }
    this.updateSeedPositions()
  }
  update(pos, angle, posEnd) {
    // Positions the seedpod at the end of the stem  
    this.pos = pos
    this.angle = angle
  }

  grow() {  
    this.growChildren()

    if(this.time > 550){
      // Begin changing seedpod colour at 550
      // Final colour is 230,230,150
      this.podR += (this.podR < 230) ? 3 * this.timer.inc : 0.
      this.podG += (this.podG < 230) ? 2 * this.timer.inc : 0.
      this.podB += (this.podB < 150) ? 3 * this.timer.inc : 0.
    
    }
    else {
      // makes separation between seeds increase
      this.seedSeparation += (this.seedSeparation < this.seediam*3.8) ? 0.06 * this.timer.inc : 0.0
      // this.nSeeds += (floor(this.seedSeparation) % 35 == 0) ? 1 : 0  
      this.updateSeedPositions()
    }
  }


  grown() {
    // Instead of growing, make the seedpod fully grown
    this.grownChildren()
    this.seedSeparation = this.seediam*3.8 
    this.updateSeedPositions()
  }

  
  draw() {
    // Shows the seedpod with seeds 

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

    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      sx = sx + sep * 1/(i+2) * this.dir
      sy = sy - sep *(0.5 - 1/(i+2)) 
      let posFromBase = createVector(sx, sy)
      posFromBase = p5.Vector.add(this.pos, posFromBase)

      posFromBase.y -= 5  // was 10
      posFromBase.x -= 5 * this.dir
      //The above repositions the pod on the end of the stem

      // Create a vector for the position of the pod end:
      let posEnd = createVector(sx, sy)
      
      this.drawPod(posFromBase, posEnd)
      
    } 

    this.seeds.forEach((seed, i) => {
      seed.draw()
    })
  }

  drawPod(pos, posEnd) {
    // Draw a seedpod
    push()
    translate(pos.x, pos.y)
    let amount = back.darkness*4
    stroke(this.podR-amount, this.podG-amount, this.podB-amount)
    strokeWeight(5)
    fill(this.podR-amount, this.podG-amount, this.podB-amount)
    // to make the pointed end
    let nx = .2*posEnd.x
    let ny = posEnd.y
      bezier(0,0,  nx*1.2,ny*.05, nx*.5,ny*.5,  nx,ny)
      bezier(0,0, -nx*1.2,ny*.05, -nx*.05,ny*.5,  nx,ny)
      circle(0,0,this.seediam)
    pop()
  }

  updateSeedPositions() {
    // The curvature of the seedpod is determined here 
    let sx = 0
    let sy = 0
    let sep = this.seedSeparation
    for(let i = 0; i < this.nSeeds; i++) {
      let seed = this.seeds[i]
      sx = sx + sep * 1/(i+2) * this.dir
      sy = sy - sep *(0.5 - 1/(i+2)) 
      let posFromBase = createVector(sx, sy)
      posFromBase = p5.Vector.add(this.pos, posFromBase)

      posFromBase.y -= 5
      posFromBase.x -= 5 * this.dir
      //The above repositions the seed on the end of the stem

      // Create a vector for the position of the pod end:
      let posEnd = createVector(sx, sy)
      
      seed.update(posFromBase, posEnd) 
    
    } 
  }
}