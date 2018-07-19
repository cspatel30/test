import React from 'react';
const newsArr = [
  {
    title: 'SHIPPING CARGO INDUSTRY',
    by: 'by planet | in cargo posts: Courier Cargo',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample...',
  },
  {
    title: 'SHIPPING CARGO INDUSTRY',
    by: 'by planet | in cargo posts: Courier Cargo',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample...',
  },
  {
    title: 'SHIPPING CARGO INDUSTRY',
    by: 'by planet | in cargo posts: Courier Cargo',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample...',
  },
];
export default () => <div className="News">
  <div className="News-header">
    <h1>Latest News &amp; Events</h1>
    <p>
      We inspect vessels on behalf of Ship Owners, Banks, Financial Instituion
      etc.
    </p>
    <br />
    <br />
  </div>
  <div className="News-events">
    <div className="row">
      {newsArr.slice(0, 3).map((news, index) =>
        <div key={index} className="col-md-3">
          <div className="News-events-card">
            <div className="News-events-card-avatar">
              <img src={news.img} />
            </div>
            <div className="News-events-card-content">
              <div className="card-title">
                <h4>{news.title}</h4>
                <p>{news.by}</p>
              </div>
              <div className="card-content">
                <p>{news.content}</p>
                <br />
                <a>READ MORE&nbsp;&nbsp;&nbsp;<i className="fa fa-long-arrow-right" /></a>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  </div>
</div>