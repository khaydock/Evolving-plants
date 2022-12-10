class Plant {
  constructor(x, y) {
    this.leaves = []
    this.lsystem = new LSystem()
    this.pos = createVector(x, y)
  }
  
  init() {
    this.lsystem.generate()
    this.turtle()
  }

  draw() {
    this.turtle()
  }

  turtle() {
    let tree = this.lsystem
    let sentence = tree.sentence
    let angle = tree.angle
    let len = tree.len

    strokeWeight(3);
    stroke(180, 280, 20);
  
    push()
    translate(this.pos.x, this.pos.y)
    Array.from(sentence).forEach(current => {
      if (current == "F") {
        line(0, 0, 0, -len)
        translate(0, -len)
        
        // drawing first leaf
        push()
        translate(0, len * 1/3)
        // circle(0, 0, 10)
        push()
        rotate(-radians(120))
        let l1 = new Leaf(0, 0)
        // translate(0, l1.height/2+30)
        // circle(0,0,5)
        line(0, 0, 0, 20)
        translate(0, l1.height * 2/3)
        l1.draw()
        pop()
        pop()
        
        // drawing second leaf
        push()
        translate(0, len * 2/3)
        push()
        rotate(radians(120))
        let l2 = new Leaf(0, 0)
        // translate(0, l2.height/2+30)
        // circle(0,0,5)
        line(0, 0, 0, 20)
        translate(0, l2.height * 2/3)
        l2.draw()
        pop()
        pop()

      } else if (current == "+") {
        rotate(angle);
      } else if (current == "-") {
        rotate(-angle)
      } else if (current == "[") {
        push();
      } else if (current == "]") {
        pop();
      }
    })
    pop()
  
  }
}
