/*
* tabswitch(obj) JS
*  @obj为最外面盒子的DOM
 */
function tabswitch(obj){
  var aTabs = obj.getElementsByClassName('tab'),
      aShows = obj.getElementsByClassName('show');
  var len = aTabs.length, curIndex = 0, timer = null;
  
  setTimer();

  for(var i = 0; i < len; i++){
    (function(i){
      aTabs[i].addEventListener('mouseover', function(){
        clearTimeout(timer);
        tabiSwitch(i);
      },false);
      aTabs[i].addEventListener('mouseout', function(){
        curIndex = i;
        setTimer();
      }, false);
      aShows[i].addEventListener('mouseover', function(){
        clearTimeout(timer);
        tabiSwitch(i);
      },false);
      aShows[i].addEventListener('mouseout', function(){
        curIndex = i;
        setTimer();
      }, false);
    })(i);
  }

  function setTimer(){
    if(curIndex >= len){
      curIndex = 0;
    }
    tabiSwitch(curIndex);
    curIndex ++;
    timer = setTimeout(setTimer, 2000);
  }

  function tabiSwitch(i){
    for(var j = 0; j < len; j++){
      aTabs[j].setAttribute("class", aTabs[j].getAttribute("class").replace(/\s+\bactive\b/ig,""));
      aShows[j].setAttribute("class", aShows[j].getAttribute("class").replace(/\s+\bactive\b/ig,""));
    }
    aTabs[i].setAttribute("class", aTabs[i].getAttribute("class") + " active");
    aShows[i].setAttribute("class", aShows[i].getAttribute("class") + " active");
  }
}
