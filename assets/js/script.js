let articlesWrapper = document.querySelector(".articles-wrapper");

const fetchData = async () => {
  const res = await fetch(
    `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=election&api-key=L9MwQmBLexoyZvvhv5AtqIfzJ3pyM5HY`
  );
  const data = await res.json();
  console.log(data.response.docs);
  if (data) {
    articlesWrapper.innerHTML = "";
  }
  data?.response?.docs?.forEach((article) => {
    articlesWrapper.innerHTML += ` <div class="column m-1">
                <p>${article.headline.main}</p>
      
                <div>
                  <img 
                
                  src="https://www.nytimes.com/${article.multimedia[0].url}"
                  alt="placeholder"
                  />
                </div>
              </div>`;
  });
};

fetchData();
