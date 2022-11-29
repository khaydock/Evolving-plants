class Droplet {
  // Jiggles a water droplet around within the sizx by sizy rectangle.
  // The droplet size is constrained within limits proportional to its size.
  // And the droplet is shown.
      constructor(x, y, r, sizx,sizy) {
      this.x = x;
      this.y = y;
      this.r = r;
  
      this.sizx = -sizx;
      this.siyy = sizy;
      this.sizr = sizy/4
      }
    jiggle() {
      this.x += random(-1.2, 1.2);
      this.y += random(-.3, .3); 
      this.r += this.r * random(-.03, .03);
      if (this.x > 0) {
        this.x = 0
      }
      if (this.x < this.sizx) {
        this.x = this.sizx
      }
      if (this.y < 0) {
        this.y = 0
      }
        if (this.y > this.sizy) {
        this.y = this.sizy
      }
      if (this.r > 3*this.sizr) {
        this.r = 3*this.sizr
      }
      if (this.r < this.sizr)
        this.r = this.sizr
        }
    show() {
      fill(255,20);
      noStroke();
      ellipse(this.x, this.y, this.r);
    }
  }