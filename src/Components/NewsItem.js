import React, { Component } from 'react'

export default class NewsItem extends Component {
  render() {
    
    let {title,description,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <>
      <div className="card" >
      <img src={!imageUrl?"https://img.etimg.com/thumb/msid-95730715,width-1070,height-580,imgsize-54790,overlay-etmarkets/photo.jpg":imageUrl} className="card-img-top" alt="..."/>
      <div className="card-body">
      <span className="position-absolute top-0  translate-middle badge rounded-pill bg-danger" style={{zIndex:"1",left:"90%"}}>
    {source}
    <span className="visually-hidden">unread messages</span>
  </span>
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text"><small className="text-muted"> By {!author?"unknown":author} on {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read more</a>
      </div>
    </div>
      </>
    )
  }
}
// https://cdn-static.dagospia.com/img/patch/11-2022/elon-musk-twitter-meme-1749130.jpg