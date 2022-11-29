class Star {
  constructor(x,y,size){
    this.pos = createVector(x, y)
    this.size = size * 0.2
    }     
    
  show() {
    strokeWeight(3)
    // Draw three rings of lines around the star
    // let ry = 2
    push()
      translate(this.pos.x, this.pos.y)
      circle(random(3)-1, random(3)-1, random(5))
      for (let i = 0; i < 9; i++) {
        rotate (40)
        // stroke(255,255,255,40)
        let ry = random(-2,2)
         line (8+ry, 6, 10+this.size*.5, 10+this.size*.5+ry) 
         
      }  
      rotate(4)
        for (let i = 0; i < 18; i++) {
          rotate (20)
          strokeWeight(2)
          // stroke(255,255,255,20)
          let ry = random(-2,2) 
          line (10+this.size+ry, 11+ this.size, 17+this.size, 18+this.size+ry)
        }
        rotate(8)
        for (let i = 0; i < 36; i++) {
          rotate (10)
          strokeWeight(1)
          // stroke(255,255,255,10)
          let ry = random(-2,2) 
          line (22+this.size+ry, 21+ this.size, 30+this.size, 31+this.size+ry)
        }   
      pop () 
    
    }
  }