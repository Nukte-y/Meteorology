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
  var locQueryURL="http://api.openweathermap.org/geo/1.0/direct?q="+ input +"&limit=1"+"&appid=d7eab80b6a689fcdafaedb821b3c11eb" 
  "&format=json&limit=1" // added limit parameter to limit the results as 1  
    fetch(locQueryURL)
    .then(function(response) {
      return response.json();})
      .then(function(data) {
        console.log(data);
        var cityName=data[0].name; //getting searched city name
        var lat=data[0].lat;        //getting geographic coordinates
        var lon=data[0].lon;        //to use as a paremeter in my weather forecast URL
        console.log(lat+""+lon);
        var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid=d7eab80b6a689fcdafaedb821b3c11eb&units=metric";
        let res = fetch(queryURL)
          .then(function(weatherResponse){
            return weatherResponse.json();
          })
          .then(function(data){
            console.log(data)
          var weather=[
            {cityname: cityName},
            {date: data.list[0].dt_txt.substring(0,10),
             Temp: data.list[0].main.temp,
             Wind: data.list[0].wind.speed,
             humidity: data.list[0].main.humidity,
             icon: data.list[0].weather[0].icon
            },
            {date: data.list[7].dt_txt.substring(0,10),
             Temp: data.list[7].main.temp,
             Wind: data.list[7].wind.speed,
             humidity: data.list[7].main.humidity,
             icon: data.list[7].weather[0].icon
            },
            {date: data.list[14].dt_txt.substring(0,10),
            Temp: data.list[14].main.temp,
            Wind: data.list[14].wind.speed,
            humidity: data.list[14].main.humidity,
            icon: data.list[14].weather[0].icon
            },
            {date: data.list[21].dt_txt.substring(0,10),
            Temp: data.list[21].main.temp,
            Wind: data.list[21].wind.speed,
            humidity: data.list[21].main.humidity,
            icon: data.list[21].weather[0].icon
            },
            {date: data.list[28].dt_txt.substring(0,10),
            Temp: data.list[28].main.temp,
            Wind: data.list[28].wind.speed,
            humidity: data.list[28].main.humidity,
            icon: data.list[28].weather[0].icon
            },
            {date: data.list[39].dt_txt.substring(0,10),
            Temp: data.list[39].main.temp,
            Wind: data.list[39].wind.speed,
            humidity: data.list[39].main.humidity,
            icon: data.list[39].weather[0].icon
            }
          ];
          renderToday(weather);
          // console.log(res); // promise
        })
      })
}

function iconSearch(code){
  let iconQueryUrl="https://openweathermap.org/img/wn/"+code+"@2x.png";   //setting icon url
  let iconImg=$("<img>").attr("src", iconQueryUrl);                       //create img element
  return iconImg;
}


function renderToday(array){
  $("#today").empty();          //clear html before display another city
  let dateEl=array[1].date.replace(/-/g,"/");
  let iconEl=iconSearch(array[1].icon);
  $("<h2>").appendTo("#today").text(`${array[0].cityname} (${dateEl})`).append(iconEl)
}

function render5Days(data){
  //process data object and render
  return;
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
