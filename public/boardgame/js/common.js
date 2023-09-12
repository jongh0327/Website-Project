// js/common.js
 
const balls = document.querySelectorAll(".balll");
 
balls.forEach(function(ball, idx){      
  // 공의 우선순위 설정
  let priority = ball.getAttribute("priority");
  if( !priority ){
    priority = idx+1;
    ball.setAttribute("priority", priority);
  }
  ball.style["z-index"] = priority;
  
  // 공 선택 이벤트 바인딩
  ball.addEventListener('mousedown', handleMouseDown);
  ball.addEventListener('touchstart',handleTouchStart);
});
 
// 마우스 이벤트 바인딩
document.addEventListener('mousemove', handleMouseMove);
document.addEventListener('touchmove', handleTouchMove);
document.addEventListener('mouseup', handleMouseUp);
document.addEventListener('touchend', handleTouchEnd);


var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    return randomNumber;
  }
}

//Prints dice roll to the page

function printNumber(number) {
  var placeholder = document.getElementById('placeholder');
  placeholder.innerHTML = number;
}

var d_button = document.getElementById('dice_button');

d_button.onclick = function() {
  var result = dice.roll();

  for(let j=1;j<3;j++){
    for(let i=1;i<7;i++){
      setTimeout(()=>printNumber(i),80*i*j);
    }
  } 
  setTimeout(()=>printNumber(result),1100);
};

var c_button = document.getElementById('card_button');

function card_gen(){
  var randomN = Math.floor(Math.random() * 24) + 1;
  return randomN;
}

c_button.onclick = function() {
  document.getElementById("card").src = "img/question"+card_gen().toString()+".jpg";
}

// window.onload = function(){

// }