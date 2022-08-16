// const getApiHash = require('marvel-api-hash-generator').getApiHash;
// const timeStamp = 1;
// const privateKey = 'b985686c1c0b6f14a9fd0e49a2689bdd85a863bb';
// const publicKey = '40aee22aa299751916a8415647973013';
// const hashValue = getApiHash(timeStamp, privateKey, publicKey);

// const requestConstantCharacters = 'https://gateway.marvel.com/v1/public/characters?';
// const targerUrl = `${requestConstantCharacters}ts=${timeStamp}&apikey=${publicKey}&hash=${hashValue}`;
// // https://gateway.marvel.com/v1/public/characters?ts=1&apikey=<public-key>&hash=09fe991c34996e64c0424e446f27c9f0
// console.log(targerUrl);

//target URL
const targetUrl = SECRET_KEY.targetUrl;




const searchURL = SECRET_KEY.searchURL;

const restURL = SECRET_KEY.restURL;

const superHeroSection = document.querySelector('.superhero-main');


//display characets on page load
getCharacters(targetUrl);

//get Character
function getCharacters(url){
  fetch(url).then(res => res.json()).then (data => {
    //console.log(data.data.results);
    showCharacters(data.data.results);
    
  });
}

//show characters
if(superHeroSection){
  function showCharacters(data){
    superHeroSection.innerHTML = '';
    data.forEach(characters => {
      
        //console.log(characters.name + 'true');
        const characterInfo = document.createElement('div');
      
        characterInfo.classList.add('superhero-character');
        characterInfo.innerHTML = ` <a href = "singlepage.html?id=${characters.id}">
        <img src="${characters.thumbnail.path +  '.' + characters.thumbnail.extension}" alt="" class="superhero-img"></a>
      
        <div class="superhero-content">
          
            <h2 class="superhero-name">${characters.name}</h2>
            <i id = "likeButton" class="fa-regular fa-heart"></i>
          
        </div>
        `
        superHeroSection.appendChild(characterInfo);
        
      
      //console.log(singleCharacterURL);
      
  
    });
  
    document.querySelector('.superhero-character').addEventListener('click',function(){
      console.log(singleCharacterURL);
    });
  
    
  }
}







var baseUrl = (window.location).href;
var koopId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
console.log(koopId);
var singleCharacterURL = `https://gateway.marvel.com/v1/public/characters/${koopId}?ts=1&apikey=40aee22aa299751916a8415647973013&hash=6e4ee48831a71ddd5ca9ff0dcbb70fea`;

getSingleCharater(singleCharacterURL);

function getSingleCharater(url){
  fetch(url).then(res => res.json()).then (data => {
    console.log(data.data.results);
    showSingleCharacters(data.data.results);
    
  });
}

const singleCharacter = document.querySelector('.superhero-details-section');


//Show Single Character
function showSingleCharacters(data){
  singleCharacter.innerHTML = '';
  data.forEach(character => {
   const superheroDetails = document.createElement('div');
    superheroDetails.classList.add('superhero-details');
    superheroDetails.innerHTML = `
      <img src="${character.thumbnail.path +  '.' + character.thumbnail.extension}" alt="" class="superhero-details-img">
      <div class="superhero-details-info">
        <h2 class="superhero-details-info-name">${character.name}</h2>
        <p class="superhero-details-info-para">${character.description}</p>
      </div>
    `
    singleCharacter.appendChild(superheroDetails);

    if(character.comics.items.length >=3  && character.stories.items.length >=3 && character.series.items.length >=3 && character.events.items.length >=3){
        const superheroInfo = document.createElement('div');
        superheroInfo.classList.add('superhero-more-info');
        superheroInfo.innerHTML = `
          <!--Comics-->
          <div class="more-info comics" onclick="showComics()" ><h2>Comics</h2><i class="fa-solid fa-angle-down"></i></div>

          <!--Comics Details Page-->
          <div class="show-info comics-details" style="display: none;" >
            <h2 class="availability">Total Comics available : ${character.comics.available}</h2>
            <h4 class="comics-name"><i class="fa-solid fa-angle-right"></i>${character.comics.items[0].name}</h4>
            <h4 class="comics-name"><i class="fa-solid fa-angle-right"></i>${character.comics.items[1].name}</h4>
            <h4 class="comics-name"><i class="fa-solid fa-angle-right"></i>${character.comics.items[2].name}</h4>
            <h4 class="comics-name"><i class="fa-solid fa-angle-right"></i>${character.comics.items[3].name}</h4>
          </div>

          <!--Series-->
          <div class="more-info series" onclick="showSeries()" ><h2>Series</h2><i class="fa-solid fa-angle-down"></i></div>

          <!--Series Details Page-->
          <div class="show-info series-details" style="display: none;">
            <h2 class="availability">Total Series available : ${character.series.available}</h2>
            <h4 class="series-name"><i class="fa-solid fa-angle-right"></i>${character.series.items[0].name}</h4>
            <h4 class="series-name"><i class="fa-solid fa-angle-right"></i>${character.series.items[1].name}</h4>
            <h4 class="series-name"><i class="fa-solid fa-angle-right"></i>${character.series.items[2].name}</h4>
            <h4 class="series-name"><i class="fa-solid fa-angle-right"></i>${character.series.items[3].name}</h4>
          </div>

          <!--Stories-->
          <div class="more-info stories" onclick="showStories()"><h2>Stories</h2><i class="fa-solid fa-angle-down"></i></div>

          <!--Stories Details Page-->
          <div class="show-info stories-details" style="display: none;" >
            <h2 class="availability">Total Stories available : ${character.stories.available}</h2>
            <h4 class="stories-name"><i class="fa-solid fa-angle-right"></i>${character.stories.items[0].name}</h4>
            <h4 class="stories-name"><i class="fa-solid fa-angle-right"></i>${character.stories.items[1].name}</h4>
            <h4 class="stories-name"><i class="fa-solid fa-angle-right"></i>${character.stories.items[2].name}</h4>
            <h4 class="stories-name"><i class="fa-solid fa-angle-right"></i>${character.stories.items[3].name}</h4>
          </div>

          <!--Events-->
        <div class="more-info events" onclick="showEvents()" ><h2>Events</h2><i class="fa-solid fa-angle-down"></i></div>

          <!--Event Details Page-->
          <div class="show-info events-details" style="display: none;" >
            <h2 class="availability">Total Events available : ${character.events.available}</h2>
            <h4 class="events-name"><i class="fa-solid fa-angle-right"></i>${character.events.items[0].name}</h4>
            <h4 class="events-name"><i class="fa-solid fa-angle-right"></i>${character.events.items[1].name}</h4>
            <h4 class="events-name"><i class="fa-solid fa-angle-right"></i>${character.events.items[2].name}</h4>
            <h4 class="events-name"><i class="fa-solid fa-angle-right"></i>${character.events.items[3].name}</h4>
            
          </div>
        `
        singleCharacter.appendChild(superheroInfo);
      }else{
        const superheroInfo = document.createElement('div');
        superheroInfo.classList.add('superhero-more-info');
        superheroInfo.innerHTML = `
          <!--Comics-->
          <div class="more-info comics" onclick="showComics()" ><h2>No Details present in the DB</h2><i class="fa-solid fa-angle-down"></i></div>
        `
        singleCharacter.appendChild(superheroInfo);
      }

    
    
    

    

  });
}



//search characters
document.addEventListener('submit', (e) =>{
  const searchInput = search.value;

  if(searchInput){
    getCharacters(searchURL + searchInput + restURL);
    
  
  }

  e.preventDefault();
});







function showComics(){
  var comics = document.querySelector(".comics-details");
  if (comics.style.display === "none") {
    comics.style.display = "flex";
  } else {
    comics.style.display = "none";
  }
}

  
function showSeries(){
  var series = document.querySelector(".series-details");
  if (series.style.display === "none") {
    series.style.display = "flex";
  } else {
    series.style.display = "none";
  }
}

function showStories(){
  var stories = document.querySelector(".stories-details");
  if (stories.style.display === "none") {
    stories.style.display = "flex";
  } else {
    stories.style.display = "none";
  }
}

function showEvents(){
  var events = document.querySelector(".events-details");
  if (events.style.display === "none") {
    events.style.display = "flex";
  } else {
    events.style.display = "none";
  }
  
}