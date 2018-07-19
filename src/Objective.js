class Objective {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.value = random(5, 10);
    this.r = this.value * 10;
  }
  show() {
    let valueColor = map(this.value, 5, 10, 0, 255);
    noStroke();
    strokeWeight(2);
    fill(valueColor, 0, 100, 200);
    ellipse(this.position.x, this.position.y, this.value * 10);
  }
  update() {}
}
