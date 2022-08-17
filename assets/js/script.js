var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var sidebarEL =document.querySelector(".newssidebar");
const APIkey = "L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";


//!API KEYS:
//* L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY
//*This has access to: Archive, Article Search, Most Popular, Times Wire, and Top Stories

//*Top Stories:
    //?Arts, homes, science, US, world
//*Times Wire:
    //?Business, World, All
//*Most Popular:
    //?Most shared on FB, most emailed articles, most viewed articles



    var mainArticleTitle = document.getElementById("mainArticleTitle");
    var mainArticleImage = document.getElementById("mainArticleImage");
    var mainArticleDescription = document.getElementById("mainArticleDescription");
    var mainArticleLink = document.getElementById("mainArticleLink");
    var currentCategory = document.getElementById("currentCategory");
    var testButton = document.getElementById("testButton");
    var mainArticleToolTipText = document.getElementById("tooltiptext");
    var navigationBar = document.getElementById("navigationBar");
    

    if (localStorage.getItem("lastCategory")){
        GetMainArticleTopStory(localStorage.getItem("lastCategory"));
    } else {
        GetMainArticleTopStory("Home")
    }
    
    navigationBar.addEventListener("click", function(event){
        event.preventDefault;
        localStorage.setItem("lastCategory", event.target.textContent);
        GetMainArticleTopStory(event.target.textContent);
    })
    
    testButton.addEventListener("click", function(){
        var category = "Arts";
        GetMainArticleTopStory(category);
        console.log(category);
    })
    
    
    
    function GetMainArticleTopStory(categoryOfNews){
    
        currentCategory.textContent = categoryOfNews;
        
        var requestURL = "https://api.nytimes.com/svc/topstories/v2/" + categoryOfNews + ".json?api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";
    
        fetch(requestURL)
            .then(function(response){
                return response.json();
            })
            .then(function(data){
                var articleImage = data.results[0].multimedia[0].url;
                var articleTitle = data.results[0].title;
                var articleDescription = data.results[0].abstract;
                var articleHover = data.results[0].multimedia[0].caption;
                var articleLink = data.results[0].url
    
                mainArticleToolTipText.textContent = articleHover;
                mainArticleTitle.textContent = articleTitle;
                mainArticleDescription.textContent = articleDescription;
                mainArticleImage.src = articleImage;
                mainArticleLink.href = articleLink
    
            })
    
    
    }
    
    function GetOtherNewsStory(categoryOfNews){
    
        currentCategory.textContent = categoryOfNews;
    
        var requestURL = "https://api.nytimes.com/svc/semantic/v2/concept/name/nytd_des/" + categoryOfNews + ".json?fields=all&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY"
    
        fetch(requestURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                var articleImage = data.results[0].multimedia[0].url;
                var articleTitle = data.results[0].title;
                var articleDescription = data.results[0].abstract;
                var articleHover = data.results[0].multimedia[0].caption;
                var articleLink = data.results[0].url
    
                mainArticleToolTipText.textContent = articleHover;
                mainArticleTitle.textContent = articleTitle;
                mainArticleDescription.textContent = articleDescription;
                mainArticleImage.src = articleImage;
                mainArticleLink.href = articleLink;
            })
    
        
    }
    
    
    
    //!LEO'S SECTION
    var btn = document.getElementById("myBtn");
    var modal = document.getElementById("myModal");
    var span = document.getElementsByClassName("close")[0];
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        
      }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
      }
>>>>>>> main

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}





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
          storycard.classList.add("max-w-sm","rounded","overflow-hidden","shadow-lg")
          
          //create card body
          var cardBody = document.createElement("div");
          cardBody.classList.add("px-6","py-4")

          title = topstorylist[i].title
          blurb =topstorylist[i].abstract
          cardBody.innerHTML = `<h6 class="font-bold" >${title}</h6>
                                  <img src= "${picture}"> </><br>
                                   <p class="text-sm">${blurb}<p><br>`


          storycard.appendChild(cardBody);
          sidebarEL.append(storycard)
          
        }


      
      })