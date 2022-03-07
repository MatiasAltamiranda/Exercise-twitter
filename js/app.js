const inputTweet = document.querySelector('#tweet');
const tweetList = document.querySelector('#lista-tweets');
const formulario = document.querySelector('#formulario');
let tweets =[];


loadListeners();
function loadListeners(){
    formulario.addEventListener('submit',loadTweets);
    tweetList.addEventListener('click',deleteTweet );
    document.addEventListener('DOMContentLoaded',()=>{
        tweets = JSON.parse(localStorage.getItem('setTweets')) || [];
        addTweets();
      } );
}


function loadTweets(e){
    e.preventDefault();
    const tweet = e.target.parentElement.parentElement;
    if(inputTweet.value == '' || inputTweet.value == ' '){
        alert('Ingresa un tweet valido')
    }
    else{  createTweets(tweet)}
}

function createTweets(tweet){
    const infoTweet = {
        contenido : tweet.querySelector('#tweet').value
    }
    tweets.push(infoTweet);
    addTweets();
    formulario.reset();
}

function addTweets(){
    clearTweets();
    c=0;
    tweets.forEach(tweet =>{
        let createTweet = document.createElement('p');
        createTweet.innerHTML=`${tweet.contenido} <button type="button" class="deleteTweet" data-id='${c++}'>X</button>`;
        syncUpStorage();
        tweetList.append(createTweet); 
    })
}

function syncUpStorage(){
    localStorage.setItem('setTweets', JSON.stringify(tweets))
}

function clearTweets(){
    while(tweetList.firstElementChild){
        tweetList.removeChild(tweetList.firstElementChild)}
}

function deleteTweet(e){
    e.preventDefault();
    if (e.target.classList.contains('deleteTweet')){
       let buttonDeleteId = e.target.getAttribute('data-id')
       tweets = tweets.filter((e,i) => i!= buttonDeleteId)
  }
  localStorage.removeItem('setTweets');
  addTweets()
}
