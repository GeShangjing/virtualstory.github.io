var cvs = function(canvas,context){
  this.cvs = canvas;
  this.ctx = context;
};
cvs.prototype.strokeFillStyles = function(strokeStyle,fillStyle){
  this.ctx.strokeStyle = strokeStyle || "#000000";
  this.ctx.fillStyle = fillStyle || "#000000";
};
cvs.prototype.shadowStyle = function(shadowColor,shadowBlur,shadowOffsetX,shadowOffsetY){
  this.ctx.shadowColor = shadowColor || "#000000";
  this.ctx.shadowBlur = shadowBlur || 0;
  this.ctx.shadowOffsetX = shadowOffsetX || 0;
  this.ctx.shadowOffsetY = shadowOffsetY || 0;
};
cvs.prototype.lineStyle = function(lineWidth,lineCap,lineJoin,miterLimit){
  this.ctx.lineWidth = lineWidth || 1;
  this.ctx.lineCap = lineCap || "butt";     // round butt square
  this.ctx.lineJoin = lineJoin || "miter";  // bevel round miter
  this.ctx.miterLimit = miterLimit;
};

// fold line
cvs.prototype.drawFoldline = function(){
  var i,
    len = arguments.length,
    mlen = len;

  if(arguments.length < 4){
    console.error("Error: drawFoldline参数需要四个以上！");
    return;
  }
  if(typeof arguments[len-1] === 'boolean'){
    mlen = len - 1;
  }
  if(mlen%2 !== 0){
    console.warn("Warn: drawFoldline输入的参数应为成对的坐标！");
    return;
  }
  this.ctx.beginPath();
  this.ctx.moveTo(arguments[0],arguments[1]);
  for(i = 2; i < mlen;i += 2){
    this.ctx.lineTo(arguments[i],arguments[i+1]);
  }
  if(arguments[len-1] === true){
    this.ctx.closePath();
  }
  this.ctx.stroke();
};

// line
cvs.prototype.drawLine = function(x1,y1,x2,y2){
  this.drawFoldline(x1,y1,x2,y2);
};

// Rect
cvs.prototype.drawRect = function(x,y,w,h,classify){
  this.ctx.beginPath();
  this.ctx.rect(x,y,w,h);
  this.ctx.closePath();
  this.classify(classify);
};
cvs.prototype.drawStrokeRect = function(x,y,w,h){
  this.drawRect(x,y,w,h,"stroke");
};
cvs.prototype.drawFillRect = function(x,y,w,h){
  this.drawRect(x,y,w,h,"fill");
};
cvs.prototype.drawFillStrokeRect = function(x,y,w,h){
  this.drawRect(x,y,w,h,"both");
};

// circle
cvs.prototype.drawCircle = function(x,y,r,startAngle,endAngle,counterclockwise,classify){
  var clockwiseDefault = counterclockwise || false;
  this.ctx.beginPath();
  this.ctx.arc(x,y,r,startAngle,endAngle,clockwiseDefault);
  this.ctx.closePath();
  this.classify(classify);
};
cvs.prototype.drawFillCircle = function(x,y,r,startAngle,endAngle,counterclockwise){
  this.drawCircle(x,y,r,startAngle,endAngle,counterclockwise,"fill");
};
cvs.prototype.drawStrokeCircle = function(x,y,r,startAngle,endAngle,counterclockwise){
  this.drawCircle(x,y,r,startAngle,endAngle,counterclockwise,"stroke");
};
cvs.prototype.drawFillStrokeCircle = function(x,y,r,startAngle,endAngle,counterclockwise){
  this.drawCircle(x,y,r,startAngle,endAngle,counterclockwise,"both");
};

// 判断 填充方式 (stroke|fill|both) 
cvs.prototype.classify = function(strClassify){
  if(strClassify === "fill"){
    this.ctx.fill();
  }else if(strClassify === "stroke"){
    this.ctx.stroke();
  }else if(strClassify === "both"){
    this.ctx.fill();
    this.ctx.stroke();
  }else{
    console.error("Error: 参数错误！");
  }
};

// random color
cvs.prototype.randomColor = function(){
  return ("#"
    + Math.floor(16 * Math.random()).toString(16)
    + Math.floor(16 * Math.random()).toString(16)
    + Math.floor(16 * Math.random()).toString(16)
    + Math.floor(16 * Math.random()).toString(16)
    + Math.floor(16 * Math.random()).toString(16)
    + Math.floor(16 * Math.random()).toString(16)).toUpperCase();
};
cvs.prototype.randomRgba = function(){
  return "rgba("
    + Math.round(255 * Math.random()) + ","
    + Math.round(255 * Math.random()) + ","
    + Math.round(255 * Math.random()) + ","
    + Math.round(255 * Math.random()) + ")";
};

// ??????????????????????????????????????????????
function randomPosition(canvas,event){
  return {
    x: event.clientX - canvas.offsetLeft,
    y: event.clientY - canvas.offsetTop
  }
}