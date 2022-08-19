
//target URL
const targetUrl = SECRET_KEY.targetUrl;

//search URL
const searchURL = SECRET_KEY.searchURL;

const restURL = SECRET_KEY.restURL;


/* *************** HOMEPAGE Section ******************** */

//superhero main section to display superhero
const superHeroSection = document.querySelector('.superhero-main');

//superhero fav section to display fav superhero
const superHeroFav = document.querySelector('.superhero-favorites');


//function to display characets on page load
getCharacters(targetUrl);

//get Character - fetching characters from marvel api
function getCharacters(url){
  fetch(url).then(res => res.json()).then (data => {
    //console.log(data.data.results);
    showCharacters(data.data.results);
    
  });
}



//using the fetched data from marvel api, displaying it on the homepage
if(superHeroSection){
  function showCharacters(data){

    superHeroSection.innerHTML = '';
    //fetching liked superheroes from local storage
    let likedSuperHero = getSuperHeroList();
    const persistSuperheroLikes = likedSuperHero.map(t => t.id);
    
    //function to show likes being persisted in the frontend
    function likeCheck(id){
      
      for(var i = 0; i < persistSuperheroLikes.length; i++){
        if(id == persistSuperheroLikes[i]){
          return 'fa-solid';
        }
      }
      return 'fa-regular';
    }
    
    
    data.forEach(characters => {

      const characterInfo = document.createElement('div');
    
      characterInfo.classList.add('superhero-character');
      
      //grabbing the id and sending it over as query parameter when navigated to single page
      characterInfo.innerHTML = ` <a href = "singlepage.html?id=${characters.id}" class = "single-page" id = "${characters.id}">
      <img src="${characters.thumbnail.path +  '.' + characters.thumbnail.extension}" alt="" class="superhero-img"></a>
    
      <div class="superhero-content">
        
          <h2 class="superhero-name">${characters.name}</h2>
          <i id="like" class="${likeCheck(characters.id)} fa-heart"></i>
        
      </div>
      `
      superHeroSection.appendChild(characterInfo);
      
    });
  }
}


//search characters
document.addEventListener('submit', (e) =>{
  const searchInput = search.value;
  console.log(searchInput);
  if(searchInput){
    
    getCharacters(searchURL + searchInput + restURL);
    setTimeout(listenForLikes,3000);
    
  }
  e.preventDefault();
});


//get favorite data
const getFaveData = (elem) =>{
  
  const parent = elem.parentElement.parentElement;
  
  const id = parent.querySelector('.single-page').id;
  const name = parent.querySelector('.superhero-name').textContent;
  const img = parent.querySelector('.superhero-img').src;
  const singlePageLink = parent.querySelector('.single-page').href;
  
  const superHeroCard = {
    id: id,
    superheroName: name,
    superHeroImg: img,
    singlePageLink: singlePageLink
    
  }
  //console.log(superHeroCard);
  storeInLocalStorage(superHeroCard);
}


//remove fav data
const removeFavData = (elem) =>{
  const parent = elem.parentElement.parentElement;
  const id = parent.querySelector('.single-page').id;
  removeFromLocalStorage(id);
}

//listenForLikes();
setTimeout(listenForLikes,3000);

//listen for likes function
function listenForLikes(){
  const likes = document.querySelectorAll('#like');
  likes.forEach(like => {
    like.addEventListener('click', (event) => {
      like.classList.toggle('fa-solid')
      like.classList.toggle('fa-regular');
      if(event.target.classList.contains('fa-solid')){
        console.log('favortite added');
        //gathering fav data to add in local storage
        getFaveData(event.target);
        
      }else{
        console.log('removing favorite');
        //gathering remove fav data to remove from local storage
        removeFavData(event.target);
        //like = 'fa-regular'
      }
    })
  })
}





//store in local storage
function storeInLocalStorage(superHeroCard){
  let tasks = getSuperHeroList();
  if (!tasks.includes(superHeroCard)) {
    
    tasks.push(superHeroCard);
    
    localStorage.setItem('tasks',JSON.stringify(tasks));
    
  }

}

//remove from local storage
function removeFromLocalStorage(superHeroCardRemove){
  let tasks = getSuperHeroList();
  tasks.forEach(function(task,index){
    if(superHeroCardRemove === task.id){
      tasks.splice(index,1);
    }
  });
  
  localStorage.setItem('tasks', JSON.stringify(tasks));
}


function getSuperHeroList(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  return tasks;
}

  





/* *************** Single Hero Section ******************** */

//fetching the base url and getting the id from the base url
var baseUrl = (window.location).href;
var koopId = baseUrl.substring(baseUrl.lastIndexOf('=') + 1);
// console.log(koopId);

//passing the id in API call
var singleCharacterURL = SECRET_KEY.characterURL + koopId + SECRET_KEY.characterURLRest;


//function to display single character when clicked on the character in homepage
getSingleCharater(singleCharacterURL);

//get Character - fetching single character by id from marvel api
function getSingleCharater(url){
  fetch(url).then(res => res.json()).then (data => {
    console.log(data.data.results);
    showSingleCharacters(data.data.results);
    
  });
}

const singleCharacter = document.querySelector('.superhero-details-section');


//using the fetched data from marvel api, displaying it on the single character page
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

    //validation to check if any superhero have less or no comics/series/events or stories present in the DB to avoid error

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


//function for toggle display on single character page
function showComics(){
  var comics = document.querySelector(".comics-details");
  if (comics.style.display === "none") {
    comics.style.display = "flex";
  } else {
    comics.style.display = "none";
  }
}

//function for toggle display on single character page  
function showSeries(){
  var series = document.querySelector(".series-details");
  if (series.style.display === "none") {
    series.style.display = "flex";
  } else {
    series.style.display = "none";
  }
}

//function for toggle display on single character page
function showStories(){
  var stories = document.querySelector(".stories-details");
  if (stories.style.display === "none") {
    stories.style.display = "flex";
  } else {
    stories.style.display = "none";
  }
}

//function for toggle display on single character page
function showEvents(){
  var events = document.querySelector(".events-details");
  if (events.style.display === "none") {
    events.style.display = "flex";
  } else {
    events.style.display = "none";
  }
  
}