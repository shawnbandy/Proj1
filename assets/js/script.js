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