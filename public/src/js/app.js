window.onload = function () {
  var token;
  getToken();

  function getToken() {
   $.ajax({
    method: "GET",
     url: "http://localhost:3000/getToken"
   }).done(function(data) {
     token = data;
     getTrack(token);
   });
  }

  function getTrack(token) {
   $.ajax({
     url: "http://localhost:3000/music/"+token+"/tracks",
     method: "GET",
   }).done(function(data) {
     console.log(data);
   });
  }


  var audio = document.getElementById("audio");
  audio.play();

};