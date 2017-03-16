window.utils = {};
/*
 var mouse = utils.captureMouse(canvas);
  canvas.addEventListener('mousedown',function(event){
    console.log("x:"+mouse.x+",y:"+mouse.y);
  });
*/
window.utils.captureMouse = function(element){
  var mouse = {x:0,y:0};
  element.addEventListener('mousemove',function(event){
    var event = event || window.event;
    var winX = event.clientX + document.body.scrollLeft + document.documentElement.scrollLeft || event.pageX,
        winY = event.clientY + document.body.scrollTop + document.documentElement.scrollTop || event.pageY;
    var canBox = element.getBoundingClientRect();
    // 不包含边框宽度值
    var can = {
      x: (winX - canBox.left)*(element.width/canBox.width),
      y: (winY - canBox.top)*(element.height/canBox.height)
    };
    // 包含边框宽度值
    winX -= element.offsetLeft;
    winY -= element.offsetTop;

    mouse.x = winX; // can.x
    mouse.y = winY; // can.y
  },false);
  return mouse;
};
window.utils.captureTouch = function(element){
  var touch = {
    x: null,
    y: null,
    isPressed: false,
    event: null
  };
  var body_scrollLeft = document.body.scrollLeft,
      element_scrollLeft = document.documentElement.scrollLeft,
      body_scrollTop = document.body.scrollTop,
      element_scrollTop = document.documentElement.scrollTop,
      offsetLeft = element.offsetLeft,
      offsetTop = element.offsetTop;
  // touchstart
  element.addEventListener('touchstart',function(event){
    touch.isPressed = true;
    touch.event = event;
  },false);
  // touchend
  element.addEventListener('touchend',function(event){
    touch.isPressed = false;
    touch.x = null;
    touch.y = null;
    touch.event = event;
  },false);
  // touchmove
  element.addEventListener('touchmove',function(event){
    var x, y, touch_event = event.touches[0];
    x = touch_event.pageX || touch_event.clientX + body_scrollLeft + element_scrollLeft;
    y = touch_event.pageY || touch_event.clientY + body_scrollTop + element_scrollTop;
    x -= offsetLeft;
    y -= offsetTop;

    touch.x = x;
    touch.y = y;
    touch.event = event;
  }, false);
  return touch;
};

// requestAnimationFrame
window.requestAnimationFrame = window.requestAnimationFrame 
                            || window.webkitRequestAnimationFrame 
                            || window.mozRequestAnimationFrame 
                            || window.msRequestAnimationFrame
                            || window.oRequestAnimationFrame
                            || function(cb){
                              return window.setTimeout(cb,17/* 1000/60 */);
                            };
// cancelAnimationFrame
window.cancelAnimationFrame = window.cancelAnimationFrame
                            || window.cancelRequestAnimationFrame
                            || window.webkitCancelAnimationFrame 
                            || window.webkitCancelRequestAnimationFrame 
                            || window.mozCancelAnimationFrame 
                            || window.mozCancelRequestAnimationFrame 
                            || window.msCancelAnimationFrame
                            || window.msCancelRequestAnimationFrame
                            || window.oCancelAnimationFrame
                            || window.oCancelRequestAnimationFrame
                            || window.clearTimeout;
//


/*
  window.addEventListener('keydown',function(event){
    utils.onKeyBoardG(event);
  },false);
*/
window.utils.onKeyBoardG = function(event){
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;
  switch(keyCode){
    case 38:case 87:
      // up
      console.log('up');
      break;
    case 40:case 83:
      // down
      console.log('down');
      break;
    case 37:case 65:
      // left
      console.log('left');
      break;
    case 39:case 68:
      // right
      console.log('right');
      break;
    default:
      console.log(keyCode);
      break;
  }
};
window.utils.onKeyBoard = function(event){
  var e = event || window.event;
  var keyCode = e.keyCode || e.which;
  switch(keyCode){
    case 38:
      // up
      console.log('up');
      break;
    case 40:
      // down
      console.log('down');
      break;
    case 37:
      // left
      console.log('left');
      break;
    case 39:
      // right
      console.log('right');
      break;
    default:
      console.log(keyCode);
      break;
  }
};
