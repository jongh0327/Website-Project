// js/event_handler.js
//const canvas = document.getElementById("jsCanvas");
//const ctx = canvas.getContext("2d");
 
// 공 선택 이벤트 핸들러
function handleMouseDown(event){
  event.preventDefault();;

  //const letters = document.querySelectorAll("img");
  const balls = document.querySelectorAll(".ball");
  const el = event.currentTarget;
  const classList = el.classList;
  
  if( !classList.contains("hold") ){
    // 공을 클릭했을 때, 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
    const ballPos = el.getBoundingClientRect();
    const ballX = ballPos.x;
    const ballY = ballPos.y;
    
    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = mouseX - ballX;
    const gapY = mouseY - ballY;
    
    el.setAttribute("gap-x", gapX);
    el.setAttribute("gap-y", gapY);
    
    // 선택한 공을 맨 앞으로 가지고 오기
    const maxPriority = (
      balls.length > 0 
        ? Math.max.apply(null, Array.from(balls).map(ball=>ball.getAttribute("priority"))) 
        : 9999
    ) + 1;
    el.setAttribute("priority", maxPriority);
    el.style["z-index"] = maxPriority;
    
    // 선택한 공에 'hold' class를 추가
    classList.add("hold");
  }
}

function handleTouchStart(event){
    event.preventDefault();;
    
    const balls = document.querySelectorAll(".ball");
    const el = event.currentTarget;
    const classList = el.classList;
    
    if( !classList.contains("hold") ){
      // 공을 클릭했을 때, 마우스 커서의 XY좌표
      const mouseX = event.touches[0].clientX;
      const mouseY = event.touches[0].clientY;
      
      // 선택한 공의 XY좌표 (왼쪽 상단 모서리 기준)
      const ballPos = el.getBoundingClientRect();
      const ballX = ballPos.x;
      const ballY = ballPos.y;
      
      // 선택한 공 안에 있는 마우스 커서의 XY좌표
      const gapX = mouseX - ballX;
      const gapY = mouseY - ballY;
      
      el.setAttribute("gap-x", gapX);
      el.setAttribute("gap-y", gapY);
      
      // 선택한 공을 맨 앞으로 가지고 오기
      const maxPriority = (
        balls.length > 0 
          ? Math.max.apply(null, Array.from(balls).map(ball=>ball.getAttribute("priority"))) 
          : 9999
      ) + 1;
      el.setAttribute("priority", maxPriority);
      el.style["z-index"] = maxPriority;
      
      // 선택한 공에 'hold' class를 추가
      classList.add("hold");
      //console.log(event);
  }
}
 
// 공 움직임 이벤트 핸들러
function handleMouseMove(event){
  event.preventDefault();
  
  const el = document.querySelector(".ball.hold");
  if( el ){
    // 움직이는 마우스 커서의 XY좌표
    const mouseX = event.clientX;
    const mouseY = event.clientY;
    
    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");
    
    // 마우스 커서의 위치에 따른 공의 XY좌표
    const ballX = mouseX - gapX;
    const ballY = mouseY - gapY;
    
    // 공의 위치를 변경
    el.style.left = ballX+"px";
    el.style.top = ballY+"px";
  }
}

function handleTouchMove(event){
  const el = document.querySelector(".ball.hold");  
  //console.log(event);
  if( el ){
    // 움직이는 마우스 커서의 XY좌표
    const x = event.touches[0].clientX;
    const y = event.touches[0].clientY;
    
    // 선택한 공 안에 있는 마우스 커서의 XY좌표
    const gapX = el.getAttribute("gap-x");
    const gapY = el.getAttribute("gap-y");
    
    // 마우스 커서의 위치에 따른 공의 XY좌표
    const ballX = x - gapX;
    const ballY = y - gapY;
    
    // 공의 위치를 변경
    el.style.left = ballX+"px";
    el.style.top = ballY+"px";
  }
}
 
// 공 놓기 이벤트 핸들러
function handleMouseUp(event){
  event.preventDefault();
    
  const el = document.querySelector(".ball.hold");
  if( el ){
    // 움직이면 적용된 속성 및 class를 삭제
    el.removeAttribute("gap-x")
    el.removeAttribute("gap-y")
    
    el.classList.remove("hold");
  }
}

function handleTouchEnd(event){
  //event.preventDefault();
    
  const el = document.querySelector(".ball.hold");
  //console.log(event);
  if( el ){
    
    // 움직이면 적용된 속성 및 class를 삭제
    el.removeAttribute("gap-x")
    el.removeAttribute("gap-y")
    
    el.classList.remove("hold");
  }
}

function addimage($this){
  var img=document.createElement("div");
  var canvas = document.getElementById("jsCanvas");
  var offset_left = canvas.offsetLeft + canvas.offsetWidth/2 - 25;
  var offset_top = canvas.offsetTop + canvas.offsetHeight/2 - 40;
  img.style.position = "absolute";
  img.style.left = offset_left.toString() + "px";
  img.style.top = offset_top.toString() + "px";
  img.innerHTML = "<img src = 'img/"+$this.value+".png' height='80' width='80'>"
  document.body.appendChild(img);
  img.className="ball";
  img.addEventListener('mousedown', handleMouseDown);
  // js/common.js
 
  const balls = document.querySelectorAll(".ball");

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
}

function addimage_person($this){
  var img=document.createElement("div");
  var canvas = document.getElementById("jsCanvas");
  var offset_left = canvas.offsetLeft + canvas.offsetWidth/2 - 25;
  var offset_top = canvas.offsetTop + canvas.offsetHeight/2 - 40;
  img.style.position = "absolute";
  img.style.left = offset_left.toString() + "px";
  img.style.top = offset_top.toString() + "px";
  img.innerHTML = "<img src = 'img/"+$this.value+".png' height='250' width='150'>"
  document.body.appendChild(img);
  img.className="ball";
  img.addEventListener('mousedown', handleMouseDown);
  // js/common.js
 
  const balls = document.querySelectorAll(".ball");

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
}

function addimage_big ($this){
  var img=document.createElement("div");
  var canvas = document.getElementById("jsCanvas");
  var offset_left = canvas.offsetLeft + canvas.offsetWidth/2 - 25;
  var offset_top = canvas.offsetTop + canvas.offsetHeight/2 - 40;
  img.style.position = "absolute";
  img.style.left = offset_left.toString() + "px";
  img.style.top = offset_top.toString() + "px";
  img.innerHTML = "<img src = 'img/"+$this.value+".png' height='300' width='300'>"
  document.body.appendChild(img);
  img.className="ball";
  img.addEventListener('mousedown', handleMouseDown);
  // js/common.js
 
  const balls = document.querySelectorAll(".ball");

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
}

function addimage_mid ($this){
  var img=document.createElement("div");
  var canvas = document.getElementById("jsCanvas");
  var offset_left = canvas.offsetLeft + canvas.offsetWidth/2 - 25;
  var offset_top = canvas.offsetTop + canvas.offsetHeight/2 - 40;
  img.style.position = "absolute";
  img.style.left = offset_left.toString() + "px";
  img.style.top = offset_top.toString() + "px";
  img.innerHTML = "<img src = 'img/"+$this.value+".png' height='150' width='150'>"
  document.body.appendChild(img);
  img.className="ball";
  img.addEventListener('mousedown', handleMouseDown);
  // js/common.js
 
  const balls = document.querySelectorAll(".ball");

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
}

function changeback($this){
  document.getElementById("jsCanvas").style.backgroundImage = "url(img/"+$this.value+".png)";
  document.getElementById("jsCanvas").style.backgroundSize = "cover";
}

function reset(){
  location.reload();
}

function toBase64(arr) {
  arr = new Uint8Array(arr);
  console.log(arr);
  return btoa(
     arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
  );
}

function close(){
  window.close();
}

function save(){
  var orig_canvas = document.getElementById("jsCanvas");
  orig_canvas.style.boxShadow="0px 0px 0px white";
  makeDivToImageFile(document.body);
  orig_canvas.style.boxShadow="6px 6px 5px grey";
}

function makeDivToImageFile(captureDiv) {
  
  var canvas = document.getElementById("jsCanvas");

  var x = canvas.offsetLeft;
  var y = canvas.offsetTop;
  var width = canvas.offsetWidth;
  var height = canvas.offsetHeight;

  html2canvas(captureDiv, {
    allowTaint: true,
    useCORS: true,
    width: captureDiv.offsetWidth,
    height: captureDiv.offsetHeight,
    scale: 1
  }).then(function (canvas){
    var imageURL = canvas.toDataURL('image/jpeg');
    //console.log(imageURL);
    //saveAs(imageURL, 'image.jpg');
    fetch("https://"+location.host+":4500/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "image":imageURL,
      "x" : x,
      "y" : y,
      "width" : width,
      "height" : height
  }),
  }).then((response) => response.text().then(value =>{
    console.log("then")
    saveAs("data:image/jpeg;base64,"+value,"학교꾸미기.jpg");
  }));
  }).catch(function (err) {
    console.log(err);
  });
}

function saveAs(url, fileName) {
  console.log("enter saveAs")
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}