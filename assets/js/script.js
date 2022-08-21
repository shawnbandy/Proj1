/*
*Psuedocode 
//TODO: create event listener for the category button pressed 
    *Populate the main article and sub-articles with the news category type
TODO: Populate/Fetch the side bar with the top stories API as cards, limit with 3
    *Add refresh button to the side bar 
//TODO: Populate/Fetch the main article
    *Change the body header to the category type
//TODO: Add hover effects to articles to show the abstract/summary
//TODO: Change 
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
var nextButton = document.getElementById("nextBut");
var prevButton = document.getElementById("prevBut");
var emailSubmitBtn = document.getElementById("emailSubmitBtn");
var firstNameInput = document.getElementById("firstName");
var lastNameInput = document.getElementById("lastName");
var emailInput = document.getElementById("emailInput");



window.addEventListener('load', (event) => {
  currentCategory.textContent = "Home";
  if (mainArticleArray.includes(localStorage.getItem("lastCategory"))) {
    GetMainArticleTopStory(localStorage.getItem("lastCategory"));
  } else if (localStorage.getItem("lastCategory")) {
    GetOtherNewsStory(localStorage.getItem("lastCategory"));
  } else {
    GetMainArticleTopStory("home");
  }
});


//*this checks localStorage for the last Category, and then runs either MainArticle or OtherNews depending on parameters. If there is no LS, it will default to Home page -SC
var mainArticleArray = ["US", "Politics", "Sports", "Business", "Insider"];
if (mainArticleArray.includes(localStorage.getItem("lastCategory"))) {
  GetMainArticleTopStory(localStorage.getItem("lastCategory"));
} else if (localStorage.getItem("lastCategory")) {
  GetOtherNewsStory(localStorage.getItem("lastCategory"));
} else {
  GetMainArticleTopStory("Home");
}

var globalCategory;
if (localStorage.getItem("lastCategory")) {
  globalCategory = localStorage.getItem("lastCategory");
}

//*populates the main page w/ descriptions when a navBar element is hit -SC
navigationBar.addEventListener("click", function (event) {
  event.preventDefault;
  localStorage.setItem("lastCategory", event.target.textContent);
  currentArticleIndex = 0;
  globalCategory = event.target.textContent;
  GetMainArticleTopStory(event.target.textContent);
  fetchData(event.target.textContent);
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
if (localStorage.getItem("currentArticleIndex")) {
  currentArticleIndex = localStorage.getItem("currentArticleIndex");
}

nextButton.addEventListener("click", function () {
  currentArticleIndex++;
  localStorage.setItem("currentArticleIndex", currentArticleIndex);

  if (MainOrOtherArticleChecker(globalCategory) == true) {
    GetMainArticleTopStory(globalCategory, true);
  } else {
    GetOtherNewsStory(globalCategory, true);
  }
});

prevButton.addEventListener("click", function () {
  if (currentArticleIndex == 0) {
    return;
  }
  currentArticleIndex--;
  localStorage.setItem("currentArticleIndex", currentArticleIndex);

  if (MainOrOtherArticleChecker(globalCategory) == true) {
    GetMainArticleTopStory(globalCategory, false);
  } else {
    GetOtherNewsStory(globalCategory, false);
  }
});

//*this will put a user's input into an email array and keep it over multiple sessions
var emailArray = [];
if (localStorage.getItem("emailList")) {
  emailArray = JSON.parse(localStorage.getItem("emailList"));

  localStorage.removeItem("emailList");
  console.log(emailArray);
}

emailSubmitBtn.addEventListener("click", function (event) {
  var input = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    email: emailInput.value,
  };

  emailArray.push(input);

  localStorage.setItem("emailList", JSON.stringify(emailArray));

  console.log(emailArray);

  emailSubmitBtn.textContent = "Thank you!";
  emailSubmitBtn.setAttribute("class", "cursor-not-allowed");
});

function MainOrOtherArticleChecker(string) {
  //*true will be a main article, false will be other
  var mainOrOther = false;
  if (mainArticleArray.includes(string)) {
    mainOrOther = true;
  }
  return mainOrOther;
}

function GetMainArticleTopStory(categoryOfNews, forward) {
  currentCategory.textContent = categoryOfNews;

  var requestURL =
    "https://api.nytimes.com/svc/topstories/v2/" +
    categoryOfNews +
    ".json?api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestURL)
    .then(function (response) {
      if (response.status == 429) {
        console.log("Too many requests!! Try again in a minute.");
      }
      return response.json();
    })
    .then(function (data) {
      if (
        forward == true &&
        data.results[currentArticleIndex].multimedia == null
      ) {
        while (data.results[currentArticleIndex].multimedia == null) {
          currentArticleIndex++;
        }
      } else if (
        forward == false &&
        data.results[currentArticleIndex].multimedia == null
      ) {
        while (data.results[currentArticleIndex].multimedia == null) {
          currentArticleIndex--;
        }
      }

      var articleImage = data.results[currentArticleIndex].multimedia[0].url;
      var articleTitle = data.results[currentArticleIndex].title;
      var articleDescription = data.results[currentArticleIndex].abstract;
      var articleHover =
        data.results[currentArticleIndex].multimedia[0].caption;
      var articleLink = data.results[currentArticleIndex].url;

      mainArticleToolTipText.textContent = articleHover;
      mainArticleTitle.textContent = articleTitle;
      mainArticleDescription.textContent = articleDescription;
      mainArticleImage.src = articleImage;
      mainArticleLink.href = articleLink;

      localStorage.setItem("currentArticleIndex", currentArticleIndex);
    });
}

function GetOtherNewsStory(categoryOfNews) {
  var requestURL =
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    categoryOfNews +
    "&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      currentCategory.textContent =
        data.response.docs[currentArticleIndex].type_of_material;

        if (data.response.docs[currentArticleIndex].multimedia[0].length == 0) {
          var articleImage =
            "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
        } else {
          var articleImage = "https://www.nytimes.com/" + data.response.docs[currentArticleIndex].multimedia[0].url;
        }
        
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

var topstoriesurl =
  "https://api.nytimes.com/svc/mostpopular/v2/shared/1/facebook.json?api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY";

fetch(topstoriesurl)
  .then(function (response) {
    return response.json();
  })

  .then(function (data) {
    //console.log("here it is", data);
    sidebarEL.innerHTML = " ";

    var topstorylist = data.results;

    for (var i = 0; i <= 3; i++) {
      //console.log("i is " + i);

      var title;
      var blurb;
      var picture;
      var sidelink;

      title = topstorylist[i].title;
      //console.log("TITLE",title)
      blurb = topstorylist[i].abstract;
      var mediaData = topstorylist[i].media[0]; //data.results[i].media[0]
      sidelink = topstorylist[i].url;

      //console.log("LINK",sidelink)

      if (topstorylist[i].media.length == 0) {
        picture =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png";
      } else {
        picture = mediaData["media-metadata"][1].url;
      }

      //picture = mediaData['media-metadata'][1].url

      //!make cards
      var storycard = document.createElement("div");
      storycard.classList.add(
        "flex",
        "justify-center",
        "content-evenly",
        "justify-evenly",
        "sm:w-full",
        "rounded",
        "overflow-hidden",
        "shadow-2xl",
        "sidebarcards",
        "bg-teal-50",
        "drop-shadow-2xl",
        "transition",
        "hover:-translate-y-1",
        "hover:scale-110",
        "lg:w-full"
      );

      //create card body
      var cardBody = document.createElement("div");
      cardBody.classList.add("px-6", "py-4");

      title = topstorylist[i].title;
      blurb = topstorylist[i].abstract;

      cardBody.innerHTML = `<h6 class="font-bold" >${title}</h6> 
                                <a href="${sidelink}">             
                                <img class="w-full" src= "${picture}"> </><br>
                                <p class="text-sm">${blurb}<p><br>
                                <p id="Copyme">Click Icon to Copy URL<p><p id="Copied"class="hide">Copied!<p>`;

      var Copyman = document.querySelector("#Copyme");
      var Copiedman = document.querySelector("#Copied");

      var abc = document.createElement("span");
      abc.setAttribute(
        "class",
        "linkshare material-symbols-outlined cursor-pointer active:opacity-75"
      );
      abc.textContent = "content_copy";
      abc.addEventListener("click", function (event) {
        console.log("HERE LOOK", event, sidelink);
        event.preventDefault();
        navigator.clipboard.writeText(sidelink);
        Copyman.classList.add("hide");
        Copiedman.classList.remove("hide");
      });

      cardBody.appendChild(abc);
      //                                 <span class="linkshare material-symbols-outlined">
      // content_copy
      // </span>`

      // const buttoncopy = document.querySelector(".linkshare")

      // console.log(buttoncopy)

      // buttoncopy.addEventListener("click", navigator.clipboard.writeText(sidelink))

      // button.onclick = () => {
      //   navigator.clipboard.writeText(sidelink);
      // }
      storycard.appendChild(cardBody);
      sidebarEL.append(storycard);
    }
  });

let articlesWrapper = document.querySelector(".articles-wrapper");

const fetchData = async (categoryOfNews) => {
  currentCategory.textContent = categoryOfNews;
  const res = await fetch(
    "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
      categoryOfNews +
      "&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY"
  );
  const data = await res.json();
  console.log("LEO LOOK",data.response.docs);
  if (data) {
    articlesWrapper.innerHTML = "";
  }
  data?.response?.docs?.forEach((article) => {
    if (article.multimedia.length == 0) {
      var picture = "https://www.freeiconspng.com/uploads/no-image-icon-15.png";
    } else {
      var picture = "https://www.nytimes.com/" + article.multimedia[0].url;
    }
    sidelink =  article.web_url
    
    console.log("HEEEEEY",article)
    articlesWrapper.innerHTML += `<div class="flex makeithappen flex-col 
     border border-slate-300 hover:-translate-y-1
    hover:scale-110 bg-teal-50/100 shadow-2xl">
               <p class="text-sm font-bold">${article.headline.main}</p>
               <a class="h-4/4 object-cover self-end" href="${sidelink}"> 
                  <img
                  class= "object-cover self-end"
                  src="${picture}"
                  alt="placeholder"
                   />
                </a>      
               </div>
             `;
      
  });
};

fetchData();
