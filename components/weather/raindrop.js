class Raindrop {

  constructor() {
    this.x = random(0, width);
    this.y = random(0, -height);
  }
  
  show() {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, random(1, 5), random(1, 5));   
  }

  update() {
    this.speed = random(5, 10);
    this.gravity = 1.05;
    this.y = this.y + this.speed*this.gravity;  
    
    if (this.y > height) {
      this.y = random(0, -height);
      this.gravity = 0;
    }
  }
}