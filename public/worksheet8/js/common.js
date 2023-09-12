// js/event_handler.js
//const canvas = document.getElementById("jsCanvas");
//const ctx = canvas.getContext("2d");

/*
var canvas = document.getElementById("jsCanvas");
var ctx = canvas.getContext("2d");
var img = new Image();
img.src = "img/1.png";
  
img.onload = function() {
  ctx.drawImage(img, 0, 0,300,150);
};*/

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

function save(){
  var orig_canvas = document.getElementById("jsCanvas");
  //orig_canvas.style.boxShadow="0px 0px 0px white";
  makeDivToImageFile(document.body);
  //orig_canvas.style.boxShadow="6px 6px 5px grey";
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
    saveAs("data:image/jpeg;base64,"+value,"학교 구성원.jpg");
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