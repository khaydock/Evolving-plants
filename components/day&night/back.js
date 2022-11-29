class Back { 
  constructor() {
    this.startColour = 120;
    this.speedAnimate = 1
    this.am = true
    this.time = 12
    this.darkness = 0
    this.hillC = 180
    this.angle = 0
    this.col1Hue = 220

    // Define sky
    this.sky = new NightSky()
  }

  transition(darkness) {
    // The daytime sky colour: (120,160,230) 
    // The daytime hills colour: (100,190,200) 
    // this.time increases from 0 and 12, and is then reset back to 0
    // This.am is true from 12am (midnight) to 12pm (noon)
    // This.am is false from 12pm (noon) to 12am (midnight)
    // Dusk begins when this.time reaches 5 pm
    // Dawn begins when this.time reaches 5 am

    // Make time pass
    this.time += 0.1 // was .1 
   
    // Adjust darkness to make it darker after 8:30 pm
    if (this.time > 8.5 && this.am == false) {
      this.darkness += (this.darkness < 50)? 2:0
    }
   
    // At 5 am, it starts getting light
    if (this.am == true && this.time > 5) {
      this.darkness -= (this.darkness > 0)? 2:0
    }
  
    // Set time back to 0 after 12, and toggle am and pm
    if (this.time >= 12) {
      this.am = !this.am 
      this.time = 0
    }


    // Colours change for sunset and sunrise

    this.col1 = color(230, 50, 90);
    this.col2 = color(this.col1Hue, 10, 90);

    // Dusk: sky gets red at 5pm - col1Hue increases to 350
    if (this.time > 5 && this.am == false) {
      this.col1Hue += (this.col1Hue < 350) ? 2:0
    }
    
    // Dawn: sky goes from black to red to blue - col1Hue decreases from red to blue
    if (this.time > 5 && this.am == true) {
      this.col1Hue -= (this.col1Hue > 220) ? 2.5:0
    }

    // For the hills:
    if (this.time > 5 && this.am == false) {
      // Dusk: hillC (red) increases to 255
      this.hillC -= (this.hillC > 0)? 4.5:0
    }
    if (this.time > 5 && this.am == true) {
      // Dawn: hillC (red) changes to daytime sky colour
      this.hillC += (this.hillC < 180)? 4.5:0
    }
  }

  draw() {

    colorMode(HSB)
      for (let i = 0; i <= height; i+=10) {
        let inter = map(i, 0, height, 0, 1);
        let c = lerpColor(this.col1, this.col2, inter);
        strokeWeight(10);
        stroke(c);
        line(0, i, width, i);
      }

    // The stars come out between 8:30 pm and 7 am
    colorMode(RGB)
    if ((this.time > 8.5 && this.am == false) || (this.time < 7 && this.am == true)) { 
      // The sky gets blacker or less black, depending on darkness
      fill (16,16,16,this.darkness*7)
      rect (0,0,width,height)
      stroke(255,255,255,this.darkness)
      this.sky.turn()
      this.sky.show() 
    }

    // Before 8pm, rotate the stars back to 0 to begin a new night
    if (this.time >= 7.8 && this.time < 8. && this.am == false) {
      this.sky.begin()
    }
    // Make the hills get darker at dusk and lighter at dawn
    // The daytime hills colour: (100,190,200) 
    // colorMode(RGB)
    fill (this.hillC-50,this.hillC-50,this.hillC+10)
    // fill(124-this.hillC*.2,250-this.hillC*.5,248-this.hillC*.4)
    noStroke() 
    hills.draw()
    // Draw the ground
    // fill(200,190,10)
    // rect (0,height-250,width,height)
  } 

}