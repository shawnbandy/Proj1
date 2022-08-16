var btn = document.getElementById("myBtn");
var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
var sidebarEL =document.querySelector(".newssidebar");
const APIkey = "L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";
var topstoryone = document.q

// When the user clicks the button, open the modal 
btn.onclick = function() {
    modal.style.display = "block";
    
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


      
      })
      // )}