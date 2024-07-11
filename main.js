const API_KEY = `d0bdfb14f0c84be0b4d39e8615497e5e`;
const keyword = "";
const PAGE_SIZE = "10";
let newsList = [];

const getLatesNews = async()=>{
  const url = new URL(
   // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
   `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}&country=kr&pageSize=${PAGE_SIZE}`
  );
  
  const response = await fetch(url);
  const data = await response.json();
  newsList = data.articles;
  render();
  console.log("dddd", newsList);

};

const render = () => {
  const newsHTML =newsList.map((news) => `<div class="row news">
          <div class="col-lg-4">
            <img class ="news-img-size" 
                src =${news.urlToImage} />
          </div>
          <div class="col-lg-8">
            <h2>${news.title}</h2>
            <p>
              ${news.description}
            </p>
            <div>
              ${news.source.name} * ${news.publishedAt}
            </div>
          </div>
        </div>`
        ).join("");
  
  document.getElementById("news-board").innerHTML=newsHTML
}

getLatesNews();

const openNav = () => {
  document.getElementById("mySidenav").style.width = "250px";
};

const closeNav = () => {
  document.getElementById("mySidenav").style.width = "0";
};

const openSearchBox = () => {
  let inputArea = document.getElementById("input-area");
  if (inputArea.style.display === "inline") {
    inputArea.style.display = "none";
  } else {
    inputArea.style.display = "inline";
  }
};