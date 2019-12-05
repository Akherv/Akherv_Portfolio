//---------------------------------CLICK SON-----------------------------------------------
var cake = document.getElementById('cake');
if (face) {
  listenerFaceDblclick();
  listenerFaceClick();
}


function listenerFaceDblclick() {
  face.addEventListener('dblclick', function (e) {
    if ('dblclick') {
      player = document.getElementById('player2');
      player.play();
    }
  }, false);
}


function listenerFaceClick() {
  face.addEventListener('click', function (e) {
    if ('click') {
      player = document.getElementById('player');
      player.play();
    }
  }, false);
}


var paille = document.getElementById('paille');
if (paille) {
  paille.addEventListener('click', function (e) {
    if ('click') {
      player = document.getElementById('player3');
      player.play();
    }
  }, false);
}

//  --------------------------------------SELECTION IMAGE FENETRE-------------------------------

var MOMENT = {
  aube: "url(./img/aube.png)",
  matin: "url(./img/matin.png)",
  aprem: "url(./img/aprem.png)",
  crepuscule: "url(./img/crepuscule.png)",
  nuit: "url(./img/nuit.png)",
}
var fenetre = document.querySelector('#fenetre');
var boutonFenetre = document.querySelector("#boutonFenetre");

if (boutonFenetre) {
  boutonFenetre.addEventListener('click', function (e) {
    var moment = Object.keys(MOMENT);
    var key = Number(this.getAttribute('data-key'));
    var newKey = key + 1;
    if (newKey >= moment.length) {
      newKey = 0;
    }
    var keyModif = this.setAttribute("data-key", newKey);
    var newUrl = MOMENT[moment[newKey]];
    fenetre.style.backgroundImage = newUrl;
  }, false);
}

//  --------------------------------------METEO--------------------------------------------------
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
}

var stationMeteo = document.getElementById('stationMeteo');
if (stationMeteo) {
  stationMeteo.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = document.getElementById('search').value;
    var urlIcon = "https://api.openweathermap.org/data/2.5/weather?q=" + data + "&lang=fr&units=metric&appid=86f688e0dcfbfb9db361b60d74c5c0fd";
    window.fetch(urlIcon)
      .then(res => res.json())
      .then(json => {
        // console.log(json);
        // console.log(json.main.temp);
        // console.log(json.weather[0].icon);
        // console.log(json.weather[0].description);

        var box = document.getElementById('result');
        console.log(box);
        box.innerHTML = '';

        var conteneur = document.createElement('div');
        var conteneur2 = document.createElement('div');
        var span1 = document.createElement('span');
        var img = document.createElement('img');
        var p = document.createElement('p');

        var info = json.main.temp;
        var info1 = json.weather[0].icon;
        var info2 = json.weather[0].description;


        span1.innerHTML = info + '°';
        img.src = "./img/" + info1 + ".png";
        p.innerHTML = info2;

        box.appendChild(conteneur);
        box.appendChild(conteneur2);
        conteneur.appendChild(span1);
        conteneur.appendChild(img);
        conteneur2.appendChild(p);

        conteneur.id = "conteneurResultMeteo";
        conteneur2.id = "conteneurResultMeteo1";
        span1.id = "span1";

        stationMeteo.style.backgroundImage = "none";

        var search = document.getElementById('search');
        if (search) {
          search.addEventListener('blur', function (e) {
            e.preventDefault;
            stationMeteo.style.backgroundImage = "url('./img/mirror.svg')";
            conteneur.style.display = "none";
            conteneur2.style.display = "none";
          });
        }
      })
  })
}

//----------------------------REVEIL--------------------------------------------------

var reveil = document.getElementById('reveil');
var span1 = document.createElement('span');
var span2 = document.createElement('span');
var span3 = document.createElement('span');

function update() {
  var maDate = new Date;
  var dataHeure = maDate.getHours();
  var dataMinute = maDate.getMinutes();

  span1.innerText = dataHeure;
  span2.innerText = ":";
  span2.id = "span2";

  if (dataMinute < 10) {
    span3.innerText = "0" + dataMinute;
  } else {
    span3.innerText = dataMinute;
  }

  reveil.appendChild(span1);
  reveil.appendChild(span2);
  reveil.appendChild(span3);
}
setInterval(
  update, 1000
);

//--------------------------------------------------------------------------------------
// (Intégration d'un calendrier créé par un autre développeur)
class Calendar {
  constructor(domTarget) {
    // On récupère l'élément DOM passé en paramètre
    domTarget = domTarget || '.calendar';
    this.domElement = document.querySelector(domTarget);
    // console.log(domTarget);
    // console.log(this.domElement);

    // Renvoit une erreur si l'élément n'éxiste pas
    if (!this.domElement) throw "Calendar - L'élément spécifié est introuvable";

    // Liste des mois
    this.monthList = new Array('janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aôut', 'septembre', 'octobre', 'novembre', 'décembre');

    // Liste des jours de la semaine
    this.dayList = new Array('dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi');

    // Date actuelle
    this.today = new Date();
    this.today.setHours(0, 0, 0, 0);

    // Mois actuel
    this.currentMonth = new Date(this.today.getFullYear(), this.today.getMonth(), 1);

    // On créé le div qui contiendra l'entête de notre calendrier
    let header = document.createElement('div');
    header.classList.add('header');
    this.domElement.appendChild(header);

    // On créé le div qui contiendra les jours de notre calendrier
    this.content = document.createElement('div');
    this.domElement.appendChild(this.content);
    // console.log(this.content);

    // Bouton "précédent"
    let previousButton = document.createElement('button');
    previousButton.setAttribute('data-action', '-1');
    previousButton.textContent = '\u003c';
    header.appendChild(previousButton);


    // Div qui contiendra le mois/année affiché
    this.monthDiv = document.createElement('div');
    this.monthDiv.classList.add('month');
    header.appendChild(this.monthDiv);

    // Bouton "suivant"
    let nextButton = document.createElement('button');
    nextButton.setAttribute('data-action', '1');
    nextButton.textContent = '\u003e';
    header.appendChild(nextButton);

    // Action des boutons "précédent" et "suivant"
    this.domElement.querySelectorAll('button').forEach(element => {
      element.addEventListener('click', () => {
        this.currentMonth.setMonth(this.currentMonth.getMonth() * 1 + element.getAttribute('data-action') * 1);
        this.loadMonth(this.currentMonth);

      });
    });

    // On charge le mois actuel
    this.loadMonth(this.currentMonth);
  }

  loadMonth(date) {
    // On vide notre calendrier
    this.content.textContent = '';

    // On ajoute le mois/année affiché
    this.monthDiv.textContent = this.monthList[date.getMonth()].toUpperCase() + ' ' + date.getFullYear();

    // Création des cellules contenant le jour de la semaine
    for (let i = 0; i < this.dayList.length; i++) {
      let cell = document.createElement('span');
      cell.classList.add('cell');
      cell.classList.add('day');
      cell.textContent = this.dayList[i].substring(0, 3).toUpperCase();
      this.content.appendChild(cell);
    }

    // Création des cellules vides si nécessaire
    for (let i = 0; i < date.getDay(); i++) {
      let cell = document.createElement('span');
      cell.classList.add('cell');
      cell.classList.add('empty');
      this.content.appendChild(cell);
    }

    // Nombre de jour dans le mois affiché
    let monthLength = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

    // Création des cellules contenant les jours du mois affiché
    for (let i = 1; i <= monthLength; i++) {
      let cell = document.createElement('span');
      cell.classList.add('cell');
      cell.textContent = i;
      this.content.appendChild(cell);

      // Timestamp de la cellule
      let timestamp = new Date(date.getFullYear(), date.getMonth(), i).getTime();

      // Ajoute une classe spéciale pour aujourd'hui
      if (timestamp === this.today.getTime()) {
        cell.classList.add('today');
      }
    }
  }
}

// Création de notre objet
const calendar = new Calendar('#calendar');


/*----------------------------------------------BOITE A IDEES-------------------------------------------------------------*/
// (en cours de développement)


var bulb = document.getElementById('bulb');
var calendrier = document.getElementById('calendar');
var conteneur = document.getElementById('calendrierConteneur');


if (bulb) {


  bulb.addEventListener('click', function (e) {

    if (calendrier.style.display == 'none') {
      ampouleEteinte();
    } else {
      var popup = document.createElement('div');
      var textArea = document.createElement('textArea');
      textArea.id = "textArea";
      popup.id = "popup";

      conteneur.appendChild(popup);
      popup.appendChild(textArea);

      calendrier.style.display = "none";
      popup.style.display = "block";
      textArea.setAttribute("placeholder", "Entrez votre note...");

      bulb.id = 'bulbAllume';

      afficherTaches();
    }

  }), false;

}

conteneur.addEventListener('dblclick', ampouleEteinte);



function afficherTaches() {
  var saved = localStorage.getItem('liste');
  if (saved) {
    document.getElementById('textArea').value = saved;
  }
}

function ampouleEteinte() {
  var popup = document.getElementById('popup');
  popup.style.display = "none";
  calendrier.style.display = "block";
  localStorage.setItem('liste', document.getElementById('textArea').value);
  popup.remove();
}