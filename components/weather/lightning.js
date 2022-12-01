class Lightning {
  // Makes lightning
  constructor(x, y, w, raining, lightnin) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.raining = raining
    this.lightnin = lightnin
    this.boltCounter = 0;
  }
  make() {
    // The sky will be black while lightning is striking
    background('black')
    stroke('white')
    noFill()
    beginShape()
    let x = this.x, y = this.y
    for(let i = 0; i< 100; i++) {
      if (this.y >= 0 && this.y <= height+100) {
        x += 20 * random(-1.01,1.01)
        y += 30 * random(.01,1.01)
        strokeWeight(this.w + random(-4,1))
        vertex(x, y) 
      }
    }     
    endShape()

    // After passing 10 times, lightnin will signal that it's time to stop lightning and start raining
      this.boltCounter ++
      if (this.boltCounter == 10) {
      this.lightnin = false 
      this.raining = true
      }
  }
}