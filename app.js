// const getApiHash = require('marvel-api-hash-generator').getApiHash;
// const timeStamp = 1;
// const privateKey = 'b985686c1c0b6f14a9fd0e49a2689bdd85a863bb';
// const publicKey = '40aee22aa299751916a8415647973013';
// const hashValue = getApiHash(timeStamp, privateKey, publicKey);

// const requestConstantCharacters = 'https://gateway.marvel.com/v1/public/characters?';
// const targerUrl = `${requestConstantCharacters}ts=${timeStamp}&apikey=${publicKey}&hash=${hashValue}`;
// // https://gateway.marvel.com/v1/public/characters?ts=1&apikey=<public-key>&hash=09fe991c34996e64c0424e446f27c9f0
// console.log(targerUrl);

const targetUrl = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=40aee22aa299751916a8415647973013&hash=6e4ee48831a71ddd5ca9ff0dcbb70fea';


const searchURL2 = 'https://gateway.marvel.com/v1/public/characters?name=&ts=1&apikey=40aee22aa299751916a8415647973013&hash=6e4ee48831a71ddd5ca9ff0dcbb70fea';

const searchURL = 'https://gateway.marvel.com/v1/public/characters?name=';

const restURL = '&ts=1&apikey=40aee22aa299751916a8415647973013&hash=6e4ee48831a71ddd5ca9ff0dcbb70fea';

const superHeroSection = document.querySelector('.superhero-main');


//get Character
function getCharacters(url){
  fetch(url).then(res => res.json()).then (data => {
    //console.log(data.data.results);
    showCharacters(data.data.results);
    
  });
}

//show characters
function showCharacters(data){
  superHeroSection.innerHTML = '';
  data.forEach(characters => {
    
    
    //console.log(characters.thumbnail.path + '/portrait_fantastic' + '.' + characters.thumbnail.extension);
    //var errorHandlesImage = (characters.thumbnail.path);
    //var error = 'image_not_available';
    
      //console.log(characters.name + 'true');
      const characterInfo = document.createElement('div');
    
      characterInfo.classList.add('superhero-character');
      characterInfo.innerHTML = `
      <img src="${characters.thumbnail.path +  '.' + characters.thumbnail.extension}" alt="" class="superhero-img">
    
      <div class="superhero-content">
        
          <h2 class="superhero-name">${characters.name}</h2>
          <i id = "likeButton" class="fa-regular fa-heart"></i>
        
      </div>
      `
      superHeroSection.appendChild(characterInfo);
    
    

  });
}

//display characets on page load
getCharacters(targetUrl);

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