const API_KEY = `d0bdfb14f0c84be0b4d39e8615497e5e`;
//const keyword = "";
let page = 1;
let totalPage = 1;
const PAGE_SIZE = 10;
let newsList = [];
let url = new URL(
  `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
);
const menus = document.querySelectorAll("#menu-list button");
menus.forEach((menu) => menu.addEventListener("click", (e) => getNewsByCategory(e)));

const getNews = async () => {
  try {
    url.searchParams.set("page", page);
    console.log("ttt", url);
    let response = await fetch(url);
    let data = await response.json();
    if (response.status == 200) {
      console.log("resutlt", data);
      if (data.totalResults == 0) {
        page = 0;
        totalPage = 0;
        renderPagination();
        throw new Error("검색어와 일치하는 결과가 없습니다");
      }

      newsList = data.articles;
      totalPage = Math.ceil(data.totalResults / PAGE_SIZE);
      render();
      renderPagination();
    } else {
      page = 0;
      totalPage = 0;
      renderPagination();
      throw new Error(data.message);
    }
  } catch (e) {
    errorRender(e.message);
    page = 0;
    totalPage = 0;
    renderPagination();
  }

  // const response = await fetch(url);
  // const data = await response.json();
  // newsList = data.articles;
  // console.log("dddd", newsList);
  // render();
};



const getLatestNews = ()=>{
 page = 1; // 새로 검색시 1로 리셋
 url = new URL(
   // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
   `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&pageSize=${PAGE_SIZE}`
  
  );
  getNews();
};

  const getNewsByCategory = (event) => {
    const category = event.target.textContent.toLowerCase();
    page = 1;
    console.log("category");
    url = new URL(
      `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?country=kr&category=${category}&pageSize=${PAGE_SIZE}`)
      console.log("SSS",category);
      getNews();

  };
  

const render = () => {
  const newsHTML = newsList.map((news) => { 
    return `<div class="row news">
          <div class="col-lg-4">
            <img class ="news-img-size" 
                src ="${
                  news.urlToImage ||
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqEWgS0uxxEYJ0PsOb2OgwyWvC0Gjp8NUdPw&usqp=CAU"
                }" />
          </div>
          <div class="col-lg-8">
            <a class="title" target="_blank" href="${news.url}">${
              news.title
      }</a>
            <p>${
              news.description == null || news.description == ""
                ? "내용없음"
                : news.description.length > 200
                ? news.description.substring(0, 200) + "..."
                : news.description
            }</p>
            <div>${news.source.name || "no source"}  ${moment(
              news.publishedAt
      ).fromNow()}</div>
        </div>
    </div>`;
    })
        
        .join("");
  
  document.getElementById("news-board").innerHTML=newsHTML
};

//1. 버튼들에 클릭이벤트주기
//2. 카테고리별 뉴스 가져오기
//3. 그 뉴스를 보여주기

const pageClick = (pageNum) => {
  page = pageNum;
  window.scrollTo({ top: 0, behavior: "smooth" });
  getNews();
};

const renderPagination = () => {
  let paginationHTML = ``;
  let pageGroup = Math.ceil(page / 5);
  let last = pageGroup * 5;
  if (last > totalPage) {
    last = totalPage;
  }
  let first = last - 4 <= 0 ? 1 : last - 4;
  if (first >= 6) {
    paginationHTML = `<li class="page-item" onclick="pageClick(1)">
                        <a class="page-link" href='#js-bottom'>&lt;&lt;</a>
                      </li>
                      <li class="page-item" onclick="pageClick(${page - 1})">
                        <a class="page-link" href='#js-bottom'>&lt;</a>
                      </li>`;
  }
  for (let i = first; i <= last; i++) {
    paginationHTML += `<li class="page-item ${i == page ? "active" : ""}" >
                        <a class="page-link" href='#js-bottom' onclick="pageClick(${i})" >${i}</a>
                       </li>`;
  }

  if (last < totalPage) {
    paginationHTML += `<li class="page-item" onclick="pageClick(${page + 1})">
                        <a  class="page-link" href='#js-program-detail-bottom'>&gt;</a>
                       </li>
                       <li class="page-item" onclick="pageClick(${totalPage})">
                        <a class="page-link" href='#js-bottom'>&gt;&gt;</a>
                       </li>`;
  }
  
  const paginationElement = document.querySelector(".pagination");
  if (paginationElement) {  // 수정된 부분
    paginationElement.innerHTML = paginationHTML;
  }
  //document.querySelector(".pagination").innerHTML = paginationHTML;
};



const getNewsByKeyword = () => {
  const keyword = document.getElementById("search-input").value;
  page = 1;
  url = new URL(
    `https://noona-times-be-5ca9402f90d9.herokuapp.com/top-headlines?q=${keyword}&country=kr&pageSize=${PAGE_SIZE}`
  
  );

    getNews();
  };

const errorRender = (message) => {
  document.getElementById(
    "news-board"
  ).innerHTML = `<h3 class="text-center alert alert-danger mt-1">${message}</h3>`;
};

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

getLatestNews();