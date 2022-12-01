class Rain {
  constructor() {
    this.x = random(0, width);
    this.y = random(height, height * 2)
    // Change const to adjust speed of rainfall
    // between .1 and 3 works best
    this.const = 1;
  }
  show() {
    stroke(255,255,255,100);
    strokeWeight(3);
    line(this.x + random(-2,2), this.y - 3*random(2,5), this.x, this.y); 
    stroke(255);
    fill(100);
    strokeWeight(1);
    circle(this.x, this.y, 2.2)
  }
  move() {
    this.speed = this.const * random(5, 20);
    this.y = this.y + this.speed;  
    if (this.y > height *.75) {
      this.y = random(0, -height *.75);
    }
}
}