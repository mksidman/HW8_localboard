var latitude;
var longitude;

navigator.geolocation.getCurrentPosition(function(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
});

$(document).ready(function() {

  var tokenMatches = window.location.hash.match(/access_token=(.*)/);

  if (tokenMatches) {
    var accessToken = tokenMatches[1];

    window
      .sessionStorage
      .setItem("instagram_access_token", accessToken);
  }

  var source = $("#photo-template").html();
  var photoTemplate = Handlebars.compile(source);

  // $("#find-photos").on("click", function() {
  //   $.ajax({
  //     type: "GET",
  //     url: "https://api.instagram.com/v1/users/self/media/recent/",
  //     dataType: "jsonp",
  //     data: {
  //       access_token: window.sessionStorage.getItem("instagram_access_token"),
  //     },
  //     success: function(response) {
  //       // console.log(response);
  //
  //       response.data.forEach(function(photo) {
  //         $("#photo-container").append(photoTemplate(photo));
  //       });
  //
  //     },
  //     error: function() {
  //       alert("Something went wrong!");
  //     }
  //   });

  $("#find-photos").on("click", function() {
    $.ajax({
      type: "GET",
      url: "https://api.instagram.com/v1/media/search",
      dataType: "jsonp",
      data: {
        access_token: window.sessionStorage.getItem("instagram_access_token"),
        lat: latitude,
        lng: longitude,
      },
      success: function(response) {
        console.log(response);
      },
      error: function() {
        alert("Something went wrong!");
      }
    });



  });

});
