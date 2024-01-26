// var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=d7eab80b6a689fcdafaedb821b3c11eb";

// var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=51.5156177&lon=-0.0919983&appid=d7eab80b6a689fcdafaedb821b3c11eb";


$("#search-button").on("click",function (event) {
  event.preventDefault();
  var input=$("#search-input").val();   //getting input from user and use it in URL to search and get the related data
  console.log(input);
  var locQueryURL="https://eu1.locationiq.com/v1/search?key=pk.6518198b4777ed389d4ba7bb066ef984&q=" + input + "&format=json&limit=1" 
  // added limit parameter to limit the results as 1  
  
  fetch(locQueryURL)
.then(function(response) {
  return response.json();
}).then(function(data) {
  console.log(data);
});

})



// var locQueryURL="https://eu1.locationiq.com/v1/search?key=pk.6518198b4777ed389d4ba7bb066ef984&q=london&format=json"

