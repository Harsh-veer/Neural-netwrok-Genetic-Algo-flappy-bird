const TOTAL=500;
var bird=[];
var savedBirdBrains=[];
var pipes = [];
var speedSlider;
var counter=0;
var best=0;

function setup() {
  speedSlider=select("#speedSlider");
  createCanvas(450, 300);
  for(let i=0;i<TOTAL;i++)
    bird[i] = new Bird();
  pipes.push(new Pipe());
}

function draw() {

  let cycles=speedSlider.value();
  for(let c=0;c<cycles;c++){
    if(bird.length==0){
      nextGen();
    }


    for (var i = pipes.length-1; i >= 0; i--) {
      pipes[i].update();
      // pipes[i].show();

      for(let j=bird.length-1;j>=0;j--){
        if (pipes[i].hits(bird[j]) || bird[j].hitTop() || bird[j].hitBottom()) {// || bird[j].hitTop() || bird[j].hitBottom()
          savedBirdBrains.push(bird.splice(j,1)[0].brain);
        }
      }

      if (pipes[i].offscreen()) {
        pipes.splice(i, 1);
      }
    }

    for(let i=0;i<bird.length;i++){
      bird[i].makeGuess(pipes);
      bird[i].update();
      // bird[i].show();
      bird[i].brain.fitness++;
    }

    if (counter % 75 == 0) {
      pipes.push(new Pipe());
    }
    counter++;
  }

  background(0);

  for (var i = pipes.length-1; i >= 0; i--) {
    pipes[i].show();
  }
  for (var i = bird.length-1; i >= 0; i--) {
    bird[i].show();
  }

}

// function keyPressed() {
//   if (key == ' ') {
//     bird.up();
//     //console.log("SPACE");
//   }
// }
