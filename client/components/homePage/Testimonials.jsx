import React from 'react';
import { Carousel } from 'react-responsive-carousel';
const tesimonial = [
  {
    id: 1,
    title: 'Sanjay Yadav, Myntra.com',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample. MO likely to include requirements for sulphur verification of in-use bunker sample',
  },
  {
    id: 2,
    title: 'Pallavi Yadav, Myntra.com',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample. MO likely to include requirements for sulphur verification of in-use bunker sample',
  },
  {
    id: 3,
    title: 'Sanjay Yadav, Myntra.com',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample. MO likely to include requirements for sulphur verification of in-use bunker sample',
  },
  {
    id: 4,
    title: 'Pallavi Yadav, Myntra.com',
    img: '/public/img/user_img.png',
    content: 'MO likely to include requirements for sulphur verification of in-use bunker sample. MO likely to include requirements for sulphur verification of in-use bunker sample',
  },
];
const slideCount = tesimonial.length / 2;
const dummyArr = new Array(slideCount).fill(1);

const cases = [
  {
    id: 1,
    time: '12 MAY, 2018',
    text: 'SINOTECH - Surveyor Surfaces a Major Defect During Pre-Purchase Inspection...',
  },
  {
    id: 2,
    time: '12 MAY, 2018',
    text: 'SINOTECH - Surveyor Surfaces a Major Defect During Pre-Purchase Inspection...',
  },
  {
    id: 3,
    time: '12 MAY, 2018',
    text: 'SINOTECH - Surveyor Surfaces a Major Defect During Pre-Purchase Inspection...',
  },
  {
    id: 4,
    time: '12 MAY, 2018',
    text: 'SINOTECH - Surveyor Surfaces a Major Defect During Pre-Purchase Inspection...',
  },
];
const Comment = ({ comment }) => <div className="comment">
  <h4>{comment.title}</h4>
  <p>{comment.content}</p>
  <img src={comment.img} />
</div>

export default () => <div><div className="Testimonial">
  <br />
  <br />
  <div className="Testimonial-header">
    <h1>Great Things People are Saying About Us</h1>
    <p>
      We inspect vessels on behalf of Ship Owners, Banks, Financial Instituion
      etc.
      </p>
    <br />
    <br />
  </div>
  <div className="Testimonial-slider">
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
    >
      {
        dummyArr.map((x, index) => <div key={index} className="row comments">
          {(tesimonial.slice(2 * index, (2 * index) + 2))
            .map(comment => <div className="col-md-6 comments-item" key={comment.id}>
              <Comment comment={comment} />
            </div>)}
        </div>)
      }
    </Carousel>
  </div>
  <div className="Testimonial-header">
    <br />
    <br />
    <br />
    <h1>Case Studies</h1>
    <p>
      We inspect vessels on behalf of Ship Owners, Banks, Financial Instituion
      etc.
      </p>
    <br />
    <br />
    <br />
    <br />
    <br />
  </div>
</div>
  <div key={1} className="Testimonial-cases">
    <div className="cases">
      {cases.map(ca =>
        <div key={ca.id} className="case">
          <h4>{ca.time}</h4>
          <p>{ca.text}</p>
          <a>READ MORE&nbsp;&nbsp;&nbsp;<i className="fa fa-long-arrow-right" /></a>
        </div>
      )}
    </div>
    <br />
    <center>
      <button className="exploreBtn">EXPLORE MORE&nbsp;&nbsp;&nbsp;<i className="fa fa-long-arrow-right" /></button>
    </center>
    <br />
    <br />
  </div>
</div>