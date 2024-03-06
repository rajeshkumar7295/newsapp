import React, { useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const [articles, setArticles] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)
  const [totalResults, setTotalResults] = useState(0)
  const capitalise = (word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  useEffect(() => {
    document.title = `${capitalise(props.category)} - NewsGround`;
    updateNews();
    
  }, [])
  const updateNews = async () => {
    props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    props.setProgress(30);
    let parseData = await data.json();
    props.setProgress(70);
    setArticles(parseData.articles);
    setTotalResults(parseData.totalResults);
    setLoading(false);
    props.setProgress(100);
  }

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    let data = await fetch(url);
    let parseData = await data.json();
    setArticles(articles.concat(parseData.articles));
    setTotalResults(parseData.totalResults);
    setLoading(false);
  };
  return (
    <>
      <h1 style={{ margin: "35px",marginTop:"90px", textAlign: "center" }}>GroundNews Top Headlines from {capitalise(props.category)}</h1>
      {loading && <Spinner />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={loading && <Spinner />}
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return <div className="col-md-4 my-3" key={element.url}>
                <NewsItem
                  title={element.title}
                  description={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                  source={element.source.name}
                />
              </div>

            })}
          </div>
        </div>
      </InfiniteScroll>

    </>
  );
}

export default News;