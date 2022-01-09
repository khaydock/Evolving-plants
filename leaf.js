class Leaf {
  constructor(x, y) {
    this.pos = createVector(x, y)
    this.width = 10
    this.height = 30
  }
  
  draw() {
    stroke(80,340,180);
    strokeWeight(3);
    fill(0, 220, 90);
    ellipse (this.pos.x, this.pos.y, this.width, this.height);
  }
}
