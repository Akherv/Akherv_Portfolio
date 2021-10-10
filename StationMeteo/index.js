/**** WINDOW ****/
var MOMENT = {
  aube: "url(./img/aube.png)",
  matin: "url(./img/matin.png)",
  aprem: "url(./img/aprem.png)",
  crepuscule: "url(./img/crepuscule.png)",
  nuit: "url(./img/nuit.png)",
};
var windowWrapper = document.querySelector("#windowContainer__wrapper");
var window__button = document.querySelector("#window__button");

if (window__button) {
  window__button.addEventListener(
    "click",
    function (e) {
      var moment = Object.keys(MOMENT);
      var key = Number(this.getAttribute("data-key"));
      var newKey = key + 1;
      if (newKey >= moment.length) {
        newKey = 0;
      }
      var keyModif = this.setAttribute("data-key", newKey);
      var newUrl = MOMENT[moment[newKey]];
      
      windowWrapper.style.backgroundImage = newUrl;
    },
    false
  );
}

/**** WEATHER CHANNEL ****/
var ICON = {
  icon1d: "url(./img/01d.png)",
  icon1n: "url(./img/01n.png)",
  icon2d: "url(./img/02d.png)",
  icon2n: "url(./img/02n.png)",
  icon3d: "url(./img/03d.png)",
  icon3n: "url(./img/03n.png)",
  icon4d: "url(./img/04d.png)",
  icon4n: "url(./img/04n.png)",
  icon9d: "url(./img/09d.png)",
  icon9n: "url(./img/09n.png)",
  icon10d: "url(./img/10d.png)",
  icon10n: "url(./img/10n.png)",
  icon11d: "url(./img/11d.png)",
  icon11n: "url(./img/11n.png)",
  icon13d: "url(./img/12d.png)",
  icon13n: "url(./img/12n.png)",
  icon50d: "url(./img/12d.png)",
  icon50n: "url(./img/12n.png)",
};

var weatherChannel = document.getElementById("weatherChannel");
if (weatherChannel) {
  weatherChannel.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("ENTER YOUR API KEY");
    var data = document.getElementById("search").value;
    const SECRET = "YOUR_API_KEY";

    if (SECRET !== "YOUR_API_KEY") {
      var urlIcon =
        "http://api.openweathermap.org/data/2.5/weather?q=" +
        data +
        "&lang=fr&units=metric&appid=" +
        SECRET;
      window
        .fetch(urlIcon)
        .then((res) => res.json())
        .then((json) => {
          var box = document.getElementById("weatherChannel__results");
          console.log(box);
          box.innerHTML = "";

          var container = document.createElement("div");
          var container2 = document.createElement("div");
          var span1 = document.createElement("span");
          var img = document.createElement("img");
          var p = document.createElement("p");

          var info = json.main.temp;
          var info1 = json.weather[0].icon;
          var info2 = json.weather[0].description;

          span1.innerHTML = info + "°";
          img.src = "./img/" + info1 + ".png";
          p.innerHTML = info2;

          box.appendChild(container);
          box.appendChild(container2);
          container.appendChild(span1);
          container.appendChild(img);
          container2.appendChild(p);

          container.id = "containerweatherChannel__resultsMeteo";
          container2.id = "containerweatherChannel__resultsMeteo1";
          span1.id = "span1";

          weatherChannel.style.backgroundImage = "none";

          var search = document.getElementById("search");
          if (search) {
            search.addEventListener("blur", function (e) {
              e.preventDefault;
              weatherChannel.style.backgroundImage = "url('./img/mirror.svg')";
              container.style.display = "none";
              container2.style.display = "none";
            });
          }
        });
    }
  });
}

/**** CLOCK ****/
var clock = document.getElementById("clock");
var date = document.getElementById("date");
var minutes = document.getElementById("minutes");
var hours = document.getElementById("hours");
var day = document.getElementById("day");
var month = document.getElementById("month");
var year = document.getElementById("year");

monthList = new Array(
  "janv.",
  "fév.",
  "mars",
  "avril",
  "mai",
  "juin",
  "juil.",
  "aôut",
  "sept.",
  "oct.",
  "nov.",
  "déc."
);

var maDate = new Date();
var dataMinute = maDate.getMinutes();
var datahour = maDate.getHours();
var dataYear = maDate.getFullYear();
var dataMonth = monthList[maDate.getMonth()];
var dataDay = maDate.getDate();

(function updateDate() {
  day.innerText = dataDay;
  month.innerText = dataMonth;
  year.innerText = dataYear;
})();

function update() {
  hours.innerText = datahour;
  if (dataMinute < 10) {
    minutes.innerText = "0" + dataMinute;
  } else {
    minutes.innerText = dataMinute;
  }
}
setInterval(update, 1000);

/**** IDEA BOX ****/
var lamp__bulb = document.getElementById("lamp__bulb");
var container = document.getElementById("ideaBoxContainer");
var ideaBox = document.getElementById("ideaBox");

if (lamp__bulb) {
  lamp__bulb.addEventListener("click", function (e) {
    if (ideaBox.style.display !== "block") {
      afficherTaches();
    } else {
      ampouleEteinte();
    }
  });
}

function afficherTaches() {
  var saved = localStorage.getItem("list");
  if (saved) {
    document.getElementById("textArea").value = saved;
  }
  ideaBox.style.display = "block";
  lamp__bulb.id = "lamp__bulbAllume";
}

function ampouleEteinte() {
  localStorage.setItem("list", document.getElementById("textArea").value);
  ideaBox.style.display = "none";
  lamp__bulb.id = "lamp__bulb";
}
