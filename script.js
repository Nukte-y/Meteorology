var storageArray=[];
if(localStorage.length!==0){
  storageArray=JSON.parse(localStorage.getItem("storageArray"));  //getting stored array
  console.log(storageArray);
}


$("#search-button").on("click",function (event) {
  event.preventDefault();
  var input=$("#search-input").val().trim();   //getting input from user and use it in URL to search and get the related data
  storageArray.push(input);                    //add input to the array
  var string=JSON.stringify(storageArray);      //convert array to the string
  localStorage.setItem("storageArray",string);  //add array into localStorage
  var buttonEl=$("<button>").appendTo("#history").text(input);
  var locQueryURL="https://eu1.locationiq.com/v1/search?key=pk.6518198b4777ed389d4ba7bb066ef984&q="+ input + 
  "&format=json&limit=1" // added limit parameter to limit the results as 1  
    fetch(locQueryURL)
    .then(function(response) {
      return response.json();})
      .then(function(data) {
        var lat=data[0].lat;      //getting geographic coordinates
        var lon=data[0].lon;      //to use as a paremeter in my weather forecast URL
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=d7eab80b6a689fcdafaedb821b3c11eb";
        fetch(queryURL)
          .then(function(weatherObject){
            var object = weatherObject.json();
            console.log(object);
          }
        )
      }
    )
  }
);

