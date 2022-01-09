class LSystem {
  constructor() {
    this.axiom = 'F'
    this.rules = [
      {
        a: 'F',
        b: 'F[+F]F[-F]F'
      }
    ]
    this.sentence = this.axiom
    this.angle = 30
    this.len = 150
  }

  generate() {
    let nextGen = Array.from(this.sentence).map(letter => {
      let rule = this.rules.find(r => r.a === letter)
      if(rule == null) return letter
      else return rule.b 
    }).join('')
    this.sentence = nextGen
    this.len *= 0.5
  }

}
