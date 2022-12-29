import React, { Component } from "react";
import NewsItem from "./NewsItem";
import { useParams } from "react-router-dom";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}


export class NewsSearch extends Component {
  constructor() {
    super();
    this.state = {
      articles: [],
      totalNews: 0,
      pageSize: 20,
      pageIndex: 1,
    };
  }

  async updateNews(){
    this.props.setProgress(10);
    let { q } = this.props.params;
    let data = await fetch(`${this.props.newsUrl}&page=${this.state.pageIndex}&pageSize=${this.state.pageSize}&q=${q}`);
    this.props.setProgress(50);
    let parsedData = await data.json();
    this.props.setProgress(100);
    console.log(parsedData);
    this.setState({ articles: parsedData.articles, totalNews: parsedData.totalResults });
  }

  fetchMoreData = () => {
    this.setState({ pageIndex: this.state.pageIndex + 1 }, async () => {
      let { q } = this.props.params;
    let data = await fetch(`${this.props.newsUrl}&page=${this.state.pageIndex}&pageSize=${this.state.pageSize}&q=${q}`);
    let parsedData = await data.json();
    console.log(parsedData);
      this.setState({
        articles: this.state.articles.concat(parsedData.articles),
      });
    });
  };
  
  componentDidMount() {
    this.updateNews();
  }

  componentDidUpdate(prevProps){
    if(this.props.params.q !== prevProps.params.q){
      this.updateNews();
    }
  }

  nextClickEvent = () => {
    this.setState({ pageIndex: this.state.pageIndex + 1, articles:null }, ()=>{this.updateNews();});
  }
  previousClickEvent = () => {
    this.setState({ pageIndex: this.state.pageIndex - 1, articles:null }, ()=>{this.updateNews();});
  }

  render() {
    if (this.state.articles.length !== 0) {
      return (
        <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={!(Math.ceil(this.state.totalNews / this.state.pageSize) < this.state.pageIndex + 1)}
            loader={<Spinner/>}
          >
        <div className="container text-center my-3">
          <h4 className="my-5">News Cat - {this.props.heading}</h4>
          <div className="row">
            {this.state.articles.map((article) => {
              return <NewsItem key={article.url} article={article} />;
            })}
          </div>
          {/* <div className="d-flex flex-row-reverse bd-highlight my-3">
          <button disabled={Math.ceil(this.state.totalNews/this.state.pageSize) < this.state.pageIndex + 1} type="button" className="btn btn-primary mx-1" onClick={this.nextClickEvent}>Next</button>
          <button disabled={this.state.pageIndex <= 1} type="button" className="btn btn-primary mx-1" onClick={this.previousClickEvent}>Previous</button>
          </div> */}
        </div>
        </InfiniteScroll>
      );
    } else {
      return (
        <Spinner heading={this.props.heading}/>
      );
    }
  }
}

export default withParams(NewsSearch);