import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
export default class News extends Component {
capitalise=(word)=>{

return word.charAt(0).toUpperCase()+word.slice(1);
}
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      page: 1,
      loading: false,
    };
    document.title=`${this.capitalise(this.props.category)} - NewsGround`;
  }
  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    let parseData = await data.json();
    this.setState({
      articles: parseData.articles,
      totalResults: parseData.totalResults,
      loading: false,
    });
  }
  async componentDidMount() {
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category}&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // console.log(parseData )
    // this.setState({
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
  }
  handlePrevClick = async () => {
    this.setState({
      page: this.state.page - 1
    })
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category
    //   }&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${this.state.page - 1
    //   }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page - 1,
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
  };
  handleNextClick = async () => {

    this.setState({ page: this.state.page + 1 })
    this.updateNews();
    // let url = `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.category
    //   }&apiKey=2733e18ba7314a3ea1d7b51a9ee636d6&page=${this.state.page + 1
    //   }&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parseData = await data.json();
    // this.setState({
    //   page: this.state.page + 1,
    //   articles: parseData.articles,
    //   totalResults: parseData.totalResults,
    //   loading: false,
    // });
  };
  render() {
    return (
      <>
        <div className="container my-3 text-center">
          <h1 style={{margin:"35px"}}>GroundNews Top Headlines from {this.props.category}</h1>
          {this.state.loading && <Spinner />}
          <div className="row">
            {!this.state.loading &&
              this.state.articles.map((element) => {
                return (
                  <div className="col-md-4 my-3" key={element.url}>
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
                );
              })}
          </div>
        </div>
        <div className="container my-3 d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            className="btn btn-dark"
            onClick={this.handlePrevClick}
          >
            &larr; previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page >=
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            className="btn btn-dark"
            onClick={this.handleNextClick}
          >
            {" "}
            next &rarr;
          </button>
        </div>
      </>
    );
  }
}
