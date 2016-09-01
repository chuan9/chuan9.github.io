$(document).ready(function(){
// 全局变量，inspector的console中可以查看
video = document.querySelector("video#video_play"); // get video element ref
display = $("#display");
//video = $("#video_play");
constraints = {audio: false, video: true}; // only need video
$("#jump").click(function(){
  window.location.href="http://chuan9.github.io";
});
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
 
/**
 * successCallback
 * getUerMedia成功获得一个MediaStream时，会回调此方法
 **/

function successCallback(stream){
  window.stream = stream; // stream available to console
  //video.src = stream;
  
  if (window.URL) { // 生成视频流的地址，将其做为video的输入
    video.src = window.URL.createObjectURL(stream);
  } else {
    video.src = stream;
  }
navigator.mediaDevices.enumerateDevices().then(function(sources){
  console.log(sources);
  var label = "deviceLabel---";
  for(var i=0; i<sources.length; i++){
    label += "object[" + i + "]" + ":" + sources[i].label + "----";
  }
  display.text(label);
})

}
 
function errorCallback(error){
  console.log("navigator.getUserMedia error: ", error);
}
 
navigator.mediaDevices.getUserMedia(constraints)
.then(successCallback)
.catch(errorCallback);

});
