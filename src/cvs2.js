(function(){
  var canvas = {
    // public 属性
    version: '0.1',
    name: 'cvs',
    author: 'Dom',

  };
  // 把cvs放入全局
  this.cvs = canvas;
  // 默认的canvas
  canvas.defaultCanvas = function(){
    return document.getElementById("canvas") || document.getElementsByTagName("canvas")[0];
  };
  // 默认的context
  canvas.defaultContext = function(){
    return this.defaultCanvas().getContext("2d");
  };
  // 当前的canvas, 在浏览器端可用cvs.canvas替换掉
  canvas.currentCanvas = canvas.canvas = function(){
    return this.defaultCanvas();
  };
  // 当前的context, 在浏览器端可用cvs.context替换掉
  canvas.currentContext = canvas.context = function(){
    return this.defaultContext();
  }

  // 临时变量
  var cvs = canvas.canvas();
  var ctx = canvas.context();

  

})(this); // 在node下this为global,在浏览器下this为window