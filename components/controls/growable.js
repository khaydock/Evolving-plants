class Growable {
  // Starts the whole thing going
  
  // Because gen0 has to be defined before setup, there is no way to make one version in which the user can select whether to show plants growing (child.grow) or not (child.grown).

  constructor(bp) {
    this.timer = new Timer(bp)
    this.time = this.timer.time
    this.children = []
  }

  growMe() {
    this.time = this.timer.time
  }

  growChildren() {

  // For showing growth of plants:
      this.children.forEach(child => {
        child.timer.count()
        child.growMe()
        child.grow() 
      })
      }

    // For not showing growth of plants
      //   this.children.forEach(child => { 
      //     child.grown() 
      //   }) 
      // }

  grownChildren() {
    this.children.forEach(child => {
        child.grown() 
    })
  }

  setSpeed(speed) {
    this.timer.setInc(speed)
    this.children.forEach(child => child.setSpeed(speed))
  }

}