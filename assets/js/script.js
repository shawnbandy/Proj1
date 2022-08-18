/*
*Psuedocode 
TODO: create event listener for the category button pressed 
    *Populate the main article and sub-articles with the news category type
TODO: Populate/Fetch the side bar with the top stories API as cards, limit with 3
    *Add refresh button to the side bar 
TODO: Populate/Fetch the main article
    *Change the body header to the category type
TODO: Add hover effects to articles to show the abstract/summary
TODO: Change 
*/

//!API KEYS:
//* L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY
//*This has access to: Archive, Article Search, Most Popular, Times Wire, and Top Stories

//*Top Stories:
//?Arts, homes, science, US, world
//*Times Wire:
//?Business, World, All
//*Most Popular:
//?Most shared on FB, most emailed articles, most viewed articles

var a = 1;
function outer(){
    var a = 2;
    function inner(){
        a++;
    console.log(a);
        var a = 5;
    }
    inner();
}
outer();
console.log(a)

var mainArticleTitle = document.getElementById("mainArticleTitle");
var mainArticleImage = document.getElementById("mainArticleImage");
var mainArticleDescription = document.getElementById("mainArticleDescription");
var mainArticleLink = document.getElementById("mainArticleLink");
var currentCategory = document.getElementById("currentCategory");
var testButton = document.getElementById("testButton");
var mainArticleToolTipText = document.getElementById("tooltiptext");
var navigationBar = document.getElementById("navigationBar");
var searchButton = document.getElementById("searchButton");
var searchInput = document.getElementById("searchInput");
var nextButton = document.getElementById("nextBut");
var prevButton = document.getElementById("prevBut");


//*this checks localStorage for the last Category, and then runs either MainArticle or OtherNews depending on parameters. If there is no LS, it will default to Home page -SC
if (
  localStorage.getItem("lastCategory") == "US" ||
  localStorage.getItem("lastCategory") == "Politics" ||
  localStorage.getItem("lastCategory") == "Sports" ||
  localStorage.getItem("lastCategory") == "Business" ||
  localStorage.getItem("lastCategory") == "Insider"
) {
  GetMainArticleTopStory(localStorage.getItem("lastCategory"));
} else if (localStorage.getItem("lastCategory")) {
  GetOtherNewsStory(localStorage.getItem("lastCategory"));
} else {
  GetMainArticleTopStory("Home");
}

var globalCategory;
if (localStorage.getItem("lastCategory")){
    globalCategory = localStorage.getItem("lastCategory")
} 

//*populates the main page w/ descriptions when a navBar element is hit -SC
navigationBar.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.setItem("lastCategory", event.target.textContent);
  currentArticleIndex = 0;
  globalCategory = event.target.textContent;
  GetMainArticleTopStory(event.target.textContent);
});

//*populates the main page w/ descriptions when a search is made -SC
searchButton.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.setItem("lastCategory", searchInput.value);
  console.log(searchInput.value);
  globalCategory = searchInput.value;
  currentArticleIndex = 0;
  GetOtherNewsStory(searchInput.value);
});


//*this will change the current displayed article and descriptions to the next SubArticle -SC
var currentArticleIndex = 0;
if (localStorage.getItem("currentArticleIndex")){
    currentArticleIndex = localStorage.getItem("currentArticleIndex")
}

nextButton.addEventListener("click", function(){
    currentArticleIndex++;
    localStorage.setItem("currentArticleIndex", currentArticleIndex);
    console.log("Next button hit");
    console.log(currentArticleIndex);

    if (MainOrOtherArticleChecker(globalCategory) == true) {
        GetMainArticleTopStory(globalCategory);
    } else {GetOtherNewsStory(globalCategory)}
})

prevButton.addEventListener("click", function(){
    if (currentArticleIndex == 0){
        return;
    }
    currentArticleIndex--;
    localStorage.setItem("currentArticleIndex", currentArticleIndex)
    console.log("Prev button hit");
    console.log(currentArticleIndex);

    if (MainOrOtherArticleChecker(globalCategory) == true) {
        GetMainArticleTopStory(globalCategory);
    } else {GetOtherNewsStory(globalCategory)}
})

console.log(MainOrOtherArticleChecker("US"));


function MainOrOtherArticleChecker(string){
    //*true will be a main article, false will be other
    var mainOrOther = false;
    var mainArticleArray = ["US", "Politics", "Sports", "Business", "Insider"];
    if (mainArticleArray.includes(string)){
        mainOrOther = true;
    }
    return mainOrOther;
}



function GetMainArticleTopStory(categoryOfNews) {
  currentCategory.textContent = categoryOfNews;

  var requestURL =
    "https://api.nytimes.com/svc/topstories/v2/" + categoryOfNews + ".json?api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      var articleIndex = currentArticleIndex
       if (data.results[articleIndex].multimedia == null){
            articleIndex++;
            console.log("art " + articleIndex)
       } 

      var articleImage = data.results[articleIndex].multimedia[0].url;
      var articleTitle = data.results[articleIndex].title;
      var articleDescription = data.results[articleIndex].abstract;
      var articleHover = data.results[articleIndex].multimedia[0].caption;
      var articleLink = data.results[articleIndex].url;

      mainArticleToolTipText.textContent = articleHover;
      mainArticleTitle.textContent = articleTitle;
      mainArticleDescription.textContent = articleDescription;
      mainArticleImage.src = articleImage;
      mainArticleLink.href = articleLink;

    });
}

function GetOtherNewsStory(categoryOfNews) {
  var requestURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + categoryOfNews + "&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentCategory.textContent = data.response.docs[currentArticleIndex].type_of_material;
      var articleImage = "https://www.nytimes.com/" + data.response.docs[currentArticleIndex].multimedia[0].url;
      var articleTitle = data.response.docs[currentArticleIndex].headline.main;
      var articleDescription = data.response.docs[currentArticleIndex].abstract;
      var articleHover = data.response.docs[currentArticleIndex].snippet;
      var articleLink = data.response.docs[currentArticleIndex].web_url;

      mainArticleToolTipText.textContent = articleHover;
      mainArticleTitle.textContent = articleTitle;
      mainArticleDescription.textContent = articleDescription;
      mainArticleImage.src = articleImage;
      mainArticleLink.href = articleLink;
    });
}

//!LEO'S SECTION
var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var sidebarEL = document.querySelector(".newssidebar");
const APIkey = "L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

// When the user clicks the button, open the modal
btn.onclick = function () {
  modal.style.display = "block";
};
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};


//Populate side bar
// function sidebararticles(topstoriesurl){

  //Clear out daily forecast
  // $( ".newssidebar" ).empty();

  var topstoriesurl = 'https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY'

  fetch(topstoriesurl)
      .then(function(response){
          return response.json();
      })
      
      .then(function(data){
        console.log("here it is",data)
        sidebarEL.innerHTML=" "

        var topstorylist = data.results
        for (var i = 0; i <=3; i++) {
          

          var title;
          var blurb;
          var picture;

          title = topstorylist[i].title
          console.log("TITLE",title)
          blurb =topstorylist[i].abstract
          var mediaData = topstorylist[i].media[0]
          picture=mediaData['media-metadata'][1].url

          

          //make cards
          var storycard = document.createElement("div");
          storycard.classList.add("max-w-sm","rounded","overflow-hidden","shadow-lg","sidebarcards")
          
          //create card body
          var cardBody = document.createElement("div");
          cardBody.classList.add("px-6","py-4")

          title = topstorylist[i].title
          blurb =topstorylist[i].abstract
          cardBody.innerHTML = `<h6 class="font-bold" >${title}</h6>
                                 <img class="w-full" src= "${picture}"> </><br>
                                   <p class="text-sm">${blurb}<p><br>`

      storycard.appendChild(cardBody);
      sidebarEL.append(storycard);
    }
  });
