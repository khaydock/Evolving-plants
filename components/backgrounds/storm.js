class StormBackground {
  constructor() {
    this.clouds = []
    this.moreClouds = []
    this.rain = []
    this.lightning = []

    this.numclouds = 8

    this.lightx = 200
    this.lighty = 0
    this.lightw = 10

    this.reset()
  }

  reset() {
    this.cloudtimer = 0

    this.changeR = 140
    this.changeG = 150
    this.changeB = 230

    this.moreclouds = false
    this.overcome = false
    this.lightnin = false
    this.raining = false
    this.clearing = false
    this.lessrain = false 

    this.done = false

     // Define each cloud in a random position
     for (let i = 0; i < this.numclouds; i++) {
      let x = random(-width-100,-100);
      let y = random(-10,300);
      this.clouds[i] = new Cloud(x, y)
    }
    // Define more clouds at random positions
    for (let i = 0; i < this.numclouds; i++) {
      let x = random(-width-100,-100);
      let y = random(-10,300);
      this.moreClouds[i] = new Cloud(x, y)
    }
    // Define a cloudy sky
    this.cloudysky = new Overcast()
    
    // Define rain
    for(let i = 0; i < 300; i++) {
      this.rain[i] = new Rain()
    }

    // Define flood
    this.groundLevel = height *.75
    this.flood = new Flood(200,this.groundLevel) 
        
    // Define a bolt of lightning
    for (let i = 0; i < 10; i++) {
      this.lightx += 10 * random(-8,8);
      this.lightw = random (1,10);
      this.lightning[i] = new Lightning(this.lightx, this.lighty, this.lightw, this.raining, this.lightnin); 
    }
  }


  move() {
    this.cloudtimer += .5
  }


  draw() {
    // Set background changes
    //Getting stormy
    if (this.cloudtimer > 260 && this.cloudtimer < 400) {
      this.changeR -= .3;
      this.changeG -= .3;
      this.changeB -= .6;
    }
    // Grey sky while raining
    if (this.cloudtimer > 400 && this.cloudtimer < 600) {
      this.changeR = 160;
      this.changeG = 165;
      this.changeB = 180;
    }
    // Sky clearing up
    if (this.cloudtimer > 400) {
      if (this.changeR > 141) {
        this.changeR -= .04;
        this.changeG -= .04;
        this.changeB += .08;
      }
    }
    background(this.changeR, this.changeG, this.changeB)

    // Draw the hills in a static daytime colour 
    fill(100,190,200,200)  
    noStroke()
    hills.draw()
    
    // Lightning
    if(this.cloudtimer >= 392 && this.cloudtimer <= 400) {
      for(let bolt of this.lightning) {
        bolt.make()
        fill (210,160,210,60)
        hills.draw()
      }    
    }
     
    // It's time to become overcast
    if (this.cloudtimer >= 200) {
      this.cloudysky.moveIn()
      this.cloudysky.show()
    }
    // It's time to clear up
    if (this.cloudtimer >= 600) {
      this.cloudysky.moveOut()
      this.cloudysky.show()
    }

    // Rain
    if (this.cloudtimer >= 400 && this.cloudtimer <= 700) {
      for (let drops of this.rain) {
        drops.show()
        drops.move()
      }
    }
    // Make double rain at the beginning
    if (this.cloudtimer >= 400 && this.cloudtimer <= 600) {
      for (let drops of this.rain) {
        drops.show()
        drops.move()
      }
    }

    // Make a flood
    if (this.cloudtimer >= 400 && this.cloudtimer <= 900) {
      this.flood.show()
    }

    // Make some plants get washed away
    if (this.cloudtimer >= 490 && this.cloudtimer <= 800) {
      // Find out which 1 or 2 plants have longer roots
      // Deselect all the others so they get washed away
      if (!this.done) {
        this.done = true

        // Find the plant with the longest roots
        this.longest = 0
        let leng = gen0.plants[0].genes.rootLength
        for (let i = 1; i < gen0.nPlants; i++) {
          let rootLen = gen0.plants[i].genes.rootLength
          if (rootLen > leng) {
            leng = rootLen
            this.longest = i
          }
        }
        if (gen0.nPlants >= 3) {
          // Find the plant with the next longest roots
          this.longer = (this.longest !=0 ) ? 0:1
          let leng = gen0.plants[0].genes.rootLength
          for (let i = 1; i < gen0.nPlants; i++) {
            let rootLen = gen0.plants[i].genes.rootLength
            if (rootLen > leng && i != this.longest) {
              leng = rootLen
              this.longer = i
            }
          }
          // Deselect all plants except those with the longest roots
          for (let i = 0; i < gen0.nPlants; i++) {
            if (i != this.longest && i != this.longer) {
              gen0.plants[i].toggleSelect()
            }
          }
        } else {
          if (gen0.nPlants == 2) {
            let i = 0
            if (i == this.longest) i = 1
            gen0.plants[i].toggleSelect()
          }
        }
      } 
    }


    // It's time to become cloudier - add moreClouds
    if (this.cloudtimer >= 100 && this.cloudtimer <= 400) {
      for (let cloud of this.moreClouds) { 
        cloud.show()
        cloud.move()
      }
    }

    // Scattered clouds will appear throughout
    for (let cloud of this.clouds) { 
      cloud.show()
      cloud.move()
    }

    if (this.cloudtimer > 1000) {
      this.reset()
    }

    // The ground
    fill(210,120,10,50)
    // This rectangle starts to the left of the canvas, so that the left stroke will not be seen
    rect (-10,this.groundLevel,width,height)
    
  }
}