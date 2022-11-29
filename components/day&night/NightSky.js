class NightSky {
  constructor(x,y){
    this.pos = createVector(x, y)
    this.stars = []
    this.angle = 0
    this.moon = new Moon(80,100)
    this.moonC = 10

    // Define the position and radius of each star
    for (let i = 0; i < 100; i++) {
      this.sx = (random(-30,width))
      this.sy = (random(-20,height*.6))
      if (this.sx < 280 && this.sy <300) {
        this.sy += 400
      }
      this.size = random(5,100)
      this.stars[i] = new Star(this.sx, this.sy, this.size)
    }
  }   
  turn() {
    this.angle += (this.angle <= 11) ? .1:0
    if (this.angle < 8) {
      this.moonC += (this.moonC <= 255) ? 10:0
    } else {
      this.moonC -= 10
    }
  }  
  
  begin() {
    this.angle = 0
    this.moonC = 5
  }
    
  show() {
    fill (255)
    push ()
    translate (width*.5, 10)
      // the earth rotates, relative to the stars
      rotate(-this.angle)
      translate (-width*.5, -10)
      fill (255,255,255,this.moonC)
      this.moon.show()
      for(let star of this.stars) {
        star.show() 
     }  
    pop ()
  } 
}