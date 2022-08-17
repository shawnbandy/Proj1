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
    
    
    
    if (localStorage.getItem("lastCategory") == "US" ||
        localStorage.getItem("lastCategory") == "Politics" ||
        localStorage.getItem("lastCategory") == "Sports" ||
        localStorage.getItem("lastCategory") == "Business" ||
        localStorage.getItem("lastCategory") == "Insider"
    ){
        GetMainArticleTopStory(localStorage.getItem("lastCategory"));
    } else if (localStorage.getItem("lastCategory")){

        GetOtherNewsStory(localStorage.getItem("lastCategory"));

    } else {GetMainArticleTopStory("Home")}
    
    navigationBar.addEventListener("click", function(event){
        event.preventDefault;
        localStorage.setItem("lastCategory", event.target.textContent);
        GetMainArticleTopStory(event.target.textContent);
    })
    
    searchButton.addEventListener("click", function(event){
        event.preventDefault;
        localStorage.setItem("lastCategory", searchInput.value);
        console.log(searchInput.value)
        GetOtherNewsStory(searchInput.value);
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
    
        var requestURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + categoryOfNews + "&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY"

        fetch(requestURL)
            .then(function(response){
                return response.json()
            })
            .then(function(data){
                console.log(data)
                currentCategory.textContent = data.response.docs[0].type_of_material;
                var articleImage = "https://www.nytimes.com/" + data.response.docs[0].multimedia[0].url;
                var articleTitle = data.response.docs[0].headline.main;
                var articleDescription = data.response.docs[0].abstract;
                var articleHover = data.response.docs[0].snippet;
                var articleLink = data.response.docs[0].web_url;
    
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
    var sidebarEL =document.querySelector(".newssidebar");
    const APIkey = "L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";
    
    // When the user clicks the button, open the modal 
    btn.onclick = function() {
        modal.style.display = "block";
        
      }
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
      }

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
      
      });
    