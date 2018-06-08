function Bird() {
  this.y = height/2;
  this.x = 64;

  this.gravity = 0.7;
  this.lift = -12;
  this.velocity = 0;

  this.brain=new NN(6,8,2);

  this.show = function() {
    fill(255,150);
    ellipse(this.x, this.y, 20, 20);
  }

  this.up = function() {
    this.velocity += this.lift;
  }

  this.update = function() {
    this.velocity += this.gravity;
    // this.velocity *= 0.9;
    this.y += this.velocity;

    // if (this.y > height) {
    //   this.y = height;
    //   this.velocity = 0;
    // }
    //
    // if (this.y < 0) {
    //   this.y = 0;
    //   this.velocity = 0;
    // }

  }

  this.hitTop=function(){
    if(this.y<0)return true;
    else return false;
  }

  this.hitBottom=function(){
    if(this.y>height)return true;
    else return false;
  }

  this.makeGuess=function(pipes){

    let closestPipe=null;
    let record=Infinity;
    for(let i=0;i<pipes.length;i++){
      let diff=pipes[i].x-this.x;
      if(diff>0 && diff<record){
        record=diff;
        closestPipe=pipes[i];
      }
    }

    if(closestPipe!=null){
      let input=[];
      input[0]=this.y;
      input[1]=this.velocity;
      input[2]=closestPipe.x;
      input[3]=closestPipe.top;
      input[4]=closestPipe.bottom;
      input[5]=closestPipe.speed;

      this.brain.setINP(input);
      let output=this.brain.getAV();
      if(output[0]>output[1]){
        this.up();
      }
    }
  }

}
