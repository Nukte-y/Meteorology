var storageArray=[];
if(localStorage.length!==0){
  storageArray=JSON.parse(localStorage.getItem("storageArray"));  //getting stored array
  render(storageArray);
}

function render(array){
  $("#history").empty();
  for(i=array.length-1;i>=0;i--){         
    if(i<7){                    //limited history display
     $("<button>").text(array[i]).addClass("historyButton").appendTo("#history");
    }
 }
}

function search(input){
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
          .then(function(weatherResponse){
            return weatherResponse.json();
          })
        .then(function(data){
          console.log(data);
          console.log(data.list[0].dt_txt);
          console.log(new Date(data.list[0].dt))
          let today = new Date(data.list[0].dt_txt)
          let dt = today.getUTCDate();
          console.log(new Date(data.list[0].dt_txt) )
          console.log(today.getFullYear() +" " +today.getMonth()+1 +" " + today.getDay() );
          console.log(data.list[0].dt_txt.substring(0,10))
        })
      })
}

$("#search-button").on("click",function (event) {
  event.preventDefault();
  let input=$("#search-input").val().trim();   //getting input from user and use it in URL to search and get the related data
    if(!storageArray.includes(input)){             //check if the city is already in history
      storageArray.push(input);                    //add input to the array
      render(storageArray);
    }
  var string=JSON.stringify(storageArray);      //convert array to the string
  localStorage.setItem("storageArray",string);  //add array into localStorage
  search(input);
  }
);

$("#history").on("click",".historyButton",function(event){
  event.preventDefault();
  let input=$(this).text();
  search(input);
})
