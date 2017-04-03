window.ownAlert = function(isAllowScroll, hasMask){
  this.isAllowScroll = isAllowScroll || true; // 弹出框出现时，是否允许滚动条滚动
  this.hasMask = hasMask || false; // 是否有遮罩，默认无
  this.clickFlag = false;
  var oOwnAlert,oOwnAlertMask;
  // 是否从HTML上添加, 还是从实例化上添加
  if(oOwnAlert = document.querySelector('.ownAlert')){ // 从HTML上添加
    if(oOwnAlertMask = document.querySelector('.ownAlert-mask')){
      hasMask = true;
    }
  }else{ // 从实例化上添加
    oOwnAlertMask = document.createElement('div');
    oOwnAlertMask.className = 'ownAlert-mask';
    oOwnAlertMask.innerHTML = '<div class="ownAlert"><header>' + 
      'header' + 
      '<a href="#" class="close">x</a></header><main class="content">' + 
      'content' + 
      '</main><footer><button class="check">确定</button><button class="close">关闭</button></footer></div>';
    document.body.appendChild(oOwnAlert);
  }
  this.oOwnAlert = oOwnAlert;
  this.oOwnAlertMask = oOwnAlertMask;
}
ownAlert.prototype.open = function(){
  this.oOwnAlertMask.style.width = window.innerWidth + 'px';
  this.oOwnAlertMask.style.height = document.body.style.height = window.innerHeight + 'px';
  this.eventsListener();
  // console.log(this.oOwnAlertMask.querySelector('main').getBoundingClientRect());
  // console.log(this.oOwnAlertMask.getElementsByTagName('header')[0]);
  // this.oOwnAlertMask.style.height = this.oOwnAlertMask.getElementsByTagName('header')[0].style.height;
  this.oOwnAlertMask.style.display = 'block';
}
ownAlert.prototype.close = function(){
  this.oOwnAlertMask.style.display = 'none';
}

ownAlert.prototype.eventsListener = function(){
  // 阻止滚轮滚动
  if(!this.isAllowScroll){
    window.addEventListener('mousewheel', function(event){
      event.preventDefault();
    }, false);
    // FF
    window.addEventListener('DOMMouseScroll', function(event){
      event.preventDefault();
    }, false);
  }

  this.oOwnAlert.addEventListener('click',function(event){
    this.clickFlag = true;
    event.stopPropagation();
  },false);

  this.oOwnAlertMask.addEventListener('click', function(){
    this.clickFlag = false;
    if(!this.clickFlag){
      this.style.display = 'none';
    }
  },false);

  var oOwnAlertMask = this.oOwnAlertMask;
  oOwnAlertMask.querySelectorAll('.close')[0].addEventListener('click', function() {
    oOwnAlertMask.style.display = 'none';
  }, false);
  oOwnAlertMask.querySelectorAll('.close')[1].addEventListener('click', function() {
    oOwnAlertMask.style.display = 'none';
  }, false);
  oOwnAlertMask.querySelector('.checked').addEventListener('click', function() {
    oOwnAlertMask.style.display = 'none';
  }, false);
  
}