class Point {
  constructor(x, y, r) {
    this.position = createVector(x, y);
    this.r = r;
    this.nearest = null;
    this.scalar = -0.01;
    this.health = 10;
    this.in = false;
  }
  findNearestObjective(objectives) {
    for (let i = 0; i < objectives.length; i++) {
      if (i === 0) {
        this.nearest = objectives[0];
      } else {
        let nearestDistance = dist(
          this.position.x,
          this.position.y,
          this.nearest.position.x,
          this.nearest.position.y
        );
        let currentDistance = dist(
          this.position.x,
          this.position.y,
          objectives[i].position.x,
          objectives[i].position.y
        );
        if (
          currentDistance < nearestDistance &&
          objectives[i] !== this.ignore
        ) {
          this.nearest = objectives[i];
        }
      }
    }
  }
  show() {
    noFill();
    strokeWeight(2);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.r);
  }
  update() {
    let hp = map(this.health, 0.1, 100, 1, 3.9);
    this.r = this.health;
    if (this.r > 0 && !this.in) {
      // this.health -= 0.005;
    }

    let subV = createVector(
      this.position.x - this.nearest.position.x,
      this.position.y - this.nearest.position.y
    );
    subV.mult(this.scalar);
    this.position.add(subV.mult(hp));
    line(
      this.position.x,
      this.position.y,
      this.position.x + subV.x,
      this.position.y + subV.y
    );
  }
  intersects(objectives) {
    for (let i = 0; i < objectives.length; i++) {
      let nearestDistance = dist(
        this.position.x,
        this.position.y,
        this.nearest.position.x,
        this.nearest.position.y
      );
      if (nearestDistance < objectives[i].r / 2) {
        if (this.scalar < -0.010424) {
          this.scalar *= 1.02;
        }
        this.in = true;

        this.health += objectives[i].value * 0.25;
        let index = objectives.indexOf(this.nearest);
        objectives.splice(index, 1);
        objectives.push(
          new Objective(random(innerWidth), random(innerHeight), 50)
        );
      }
    }
  }
  collides(movers) {
    for (let i = 0; i < movers.length; i++) {
      let distanceBetween = dist(
        this.position.x,
        this.position.y,
        movers[i].position.x,
        movers[i].position.y
      );
      stroke(100, 100, 100);
    }
  }
}
