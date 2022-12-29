import React from "react";

const NewsItem = (props) => {

    let { article } = props;
    return (
      article && (
        <div className="col-md-4 my-2">
          <div className="card">
            <img
              height={160}
              src={
                article.urlToImage
                  ? article.urlToImage
                  : "https://images.livemint.com/img/2022/12/28/600x338/sensex_1661846646875_1672188436473_1672188436473.jpg"
              }
              className="card-img-top"
              alt="News"
            />
            <div className="card-body">
              <h5
                style={{
                  height: 60,
                  overflow: "hidden",
                  fontSize: 17,
                }}
                className="card-title"
              >
                {article.title ? article.title : "No Title"}
              </h5>
              <p
                className="card-text"
                style={{
                  height: 60,
                  overflow: "hidden",
                  fontSize: 12.5,
                }}
              >
                {article.description ? article.description : "No description"}
              </p>
              <a href={article.url} target="_blank" rel="noreferrer" className="btn btn-primary">
                Read More
              </a>
            </div>
          </div>
        </div>
      )
    );

}

export default NewsItem;