// on click event for each category
var navBars = document.querySelector(".navigation");
var mainArticle = document.querySelector(".grid");
var subArticles = document.querySelector(".column");
var mainTitle = document.querySelector("#mainTitle");

console.log("Hi");
function searchSports() {
  console.log("hello");
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=sports&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      //   for (let index = 0; index <= 5; index++) {
      //     const element = data[index];
      var first = data.response.docs[0].abstract;
      var firstTitle = data.response.docs[0].headline.main;
      mainTitle.innerHTML = firstTitle;
      mainArticle.innerHTML = first;
      subArticles.innerHTML = first;
    });
}

document.getElementById("Sports").addEventListener("click", searchSports);

//for loop to be added to have a different sports article in each section

function searchScience() {
  console.log("hello love");
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=science&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var first = data.response.docs[0].abstract;
      var firstTitle = data.response.docs[0].headline.main;
      mainTitle.innerHTML = firstTitle;
      mainArticle.innerHTML = first;
      subArticles.innerHTML = first;
    });
}
document.getElementById("Science").addEventListener("click", searchScience);

function searchPolitics() {
  console.log("hello");
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=politics&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var first = data.response.docs[0].abstract;
      var firstTitle = data.response.docs[0].headline.main;
      mainTitle.innerHTML = firstTitle;
      mainArticle.innerHTML = first;
      subArticles.innerHTML = first;
    });
}
document.getElementById("Politics").addEventListener("click", searchPolitics);

function searchEconomics() {
  console.log("hello");
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=economics&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var first = data.response.docs[0].abstract;
      var firstTitle = data.response.docs[0].headline.main;
      mainTitle.innerHTML = firstTitle;
      mainArticle.innerHTML = first;
      subArticles.innerHTML = first;
    });
}
document.getElementById("Economics").addEventListener("click", searchEconomics);

function searchCelebrity() {
  console.log("hello");
  var requestUrl =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=celebrity&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestUrl)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var first = data.response.docs[0].abstract;
      var firstTitle = data.response.docs[0].headline.main;
      mainTitle.innerHTML = firstTitle;
      mainArticle.innerHTML = first;
      subArticles.innerHTML = first;
    });
}
document.getElementById("Celebrity").addEventListener("click", searchCelebrity);
