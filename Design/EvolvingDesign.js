// Change nDesigns here to set the number of designs in the population
const gen0 = new Generation(4) 

let newGenerationButton 

function setup() {
  createCanvas(window.innerWidth, window.innerHeight)
  angleMode(DEGREES)

  newGenerationButton = createButton('new generation')
  newGenerationButton.position(10, 10) 
  // When the new generation button is pressed, create a new population of designs
  newGenerationButton.mousePressed(() => {
    gen0.newGeneration()
  })
  gen0.init() 
}

function draw() { 
  background (0)// purple:(120,80,210)
 
  strokeWeight(1)
  fill(10, 240, 10)
  // text("("+mouseX+", "+mouseY+", )", mouseX, mouseY);

  gen0.make()
  gen0.draw()

}

function mousePressed() {

  // Allow any number of designs to be selected
  // Select design i if the mouse is pressed near design i
  for(let i = 0; i < gen0.designs.length; i++) {
    let d = gen0.designs[i]
    let leftLimit = d.pos.x - width / (gen0.designs.length * 4)
    let rightLimit = d.pos.x + width / (gen0.designs.length * 4)
    if(mouseX > leftLimit && mouseX < rightLimit && mouseY > 40)
    {
      // Draw circle as soon as plant is selected,
      // but selection is possible only if plant has reached its final height 

      let currDesign = d.toggleSelect()
      console.log ("SELECTED", currDesign.selected)
      } 
    } 
}