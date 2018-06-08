function NN(inp,hid,out){

  function sig(x){
    for(i=0;i<x.length;i++){
      x[i]=1/(1+Math.exp(-x[i]));
    }
    return x;
  }

  function dot(w,x,b){
    a=[];
    for(i=0;i<w.length;i++){
      s=0;
      for(j=0;j<w[i].length;j++){
        s+=w[i][j]*x[j];
      }
      s+=b[i];
      a.push(s);
    }
    return a;
  }

  this.fitness=0;

  this.inputs=[];
  this.setINP=function(inp){
    this.inputs=[];
    for(let i=0;i<inp.length;i++){
      this.inputs[i]=inp[i];
    }
  }

  this.Wih=[];
  for(let i=0;i<hid;i++){
    let temp=[];
    for(let j=0;j<inp;j++){
      temp.push(randomGaussian());
    }
    this.Wih.push(temp);
  }


  this.Wha=[];
  for(let i=0;i<out;i++){
    let temp=[];
    for(let j=0;j<hid;j++){
      temp.push(randomGaussian());
    }
    this.Wha.push(temp);
  }

  this.Bh=[];
  for(let i=0;i<hid;i++){
    this.Bh.push(randomGaussian());
  }

  this.Ba=[];
  for(let i=0;i<out;i++){
    this.Ba.push(randomGaussian());
  }


  this.mutate=function(eta){

    for(let i=0;i<this.Wih.length;i++){
      for(let j=0;j<this.Wih[i].length;j++){
        if(random(0,1)<eta){
          this.Wih[i][j]+=randomGaussian();
        }
      }
    }

    for(let i=0;i<this.Wha.length;i++){
      for(let j=0;j<this.Wha[i].length;j++){
        if(random(0,1)<eta){
          this.Wha[i][j]+=randomGaussian();
        }
      }
    }

    for(let i=0;i<this.Bh.length;i++){
      if(random(0,1)<eta){
        this.Bh[i]+=randomGaussian();
      }
    }

    for(let i=0;i<this.Ba.length;i++){
      if(random(0,1)<eta){
        this.Ba[i]+=randomGaussian();
      }
    }

  }


  this.copy=function(hostBrain){

    for(let i=0;i<this.Wih.length;i++){
      for(let j=0;j<this.Wih[i].length;j++){
        this.Wih[i][j]=hostBrain.Wih[i][j];
      }
    }

    for(let i=0;i<this.Bh.length;i++){
      this.Bh[i]=hostBrain.Bh[i];
    }

    for(let i=0;i<this.Wha.length;i++){
      for(let j=0;j<this.Wha[i].length;j++){
        this.Wha[i][j]=hostBrain.Wha[i][j];
      }
    }

    for(let i=0;i<this.Ba.length;i++){
      this.Ba[i]=hostBrain.Ba[i];
    }
  }

  this.getAV=function(){
    //console.log(this.inputs);
    var z1=dot(this.Wih,this.inputs,this.Bh);
    var a1=sig(z1);
    var z2=dot(this.Wha,a1,this.Ba);
    var a2=sig(z2);
    //console.log(a2.indexOf(max(a2)));
    return a2;
  }


}
