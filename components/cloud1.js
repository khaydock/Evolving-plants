class Cloud {
  constructor() {
    
    this.cloudimage;  
    this.xPos = random(0,600);
    this.yPos  = random(0,150);
    this.w     = random(75, 90);
    this.h     = random(25,40)
    this.speed = random(0.2,0.5);
  }
  
  move(){
    this.xPos = this.xPos + this.speed;
    if(this.xPos>width){
      this.xPos = 0 - this.w;
    }
    
  }
  
  show(){
    image(this.cloudimage, this.xPos, this.yPos, this.w, this.h);
  } 
}