let field;
let movers = [];
let objectives = [];

function setup() {
  for (let i = 0; i < 25; i++) {
    movers.push(new Point(random(innerWidth), random(innerHeight), 10));
  }

  for (let i = 0; i < 25; i++) {
    objectives.push(new Objective(random(innerWidth), random(innerHeight)));
  }

  field = new Field(movers, objectives);
  createCanvas(innerWidth, innerHeight);
  background(0);
}

function draw() {
  background(200, 50);
  for (let mover of movers) {
    mover.show();
    mover.findNearestObjective(objectives);
    mover.intersects(objectives);
    mover.collides(movers);
    mover.update(objectives);
  }
  for (let objective of objectives) {
    objective.show();
    objective.update();
  }
  if (frameCount % 500 === 0) {
    console.log("#---------------HP-------------------#");

    for (let mover of movers) {
      console.log(mover.health);
    }
  }
}
