function nextGen(){

  if(best<savedBirdBrains[TOTAL-1].fitness)best=savedBirdBrains[TOTAL-1].fitness;
  //console.log(best);

  for(let i=0;i<TOTAL;i++){
    bird[i]=new Bird();
    bird[i].brain.copy(savedBirdBrains[TOTAL-1]);
    bird[i].brain.mutate(0.1);
  }
  savedBirdBrains=[];
}
