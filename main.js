const API_KEY = `d0bdfb14f0c84be0b4d39e8615497e5e`;
let news = [];

const getLatesNews = async()=>{
  const url = new URL(
   // `https://newsapi.org/v2/top-headlines?country=kr&apiKey=${API_KEY}`
   `http://times-node-env.eba-appvq3ef.ap-northeast-2.elasticbeanstalk.com/top-headlines?q=${keyword}&country=kr&pageSize=${PAGE_SIZE}`
  );
  
  const response = await fetch(url);
  const data = await response.json();
  news = data.articles;
  console.log("dddd", news);

};

getLatesNews();