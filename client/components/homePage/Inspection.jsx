import React from 'react';
import { Carousel } from 'react-responsive-carousel';

export default () => <div className="Inspection">
  <div className="Inspection-header">
    <h1>Most Popular Inspections</h1>
    <p>
      We inspect vessels on behalf of Ship Owners, Banks, Financial Instituion, P&amp;I clubs,
      etc. for assesment of the condition of vessels various areas including Hull, Deck, Machineries,
      Equipment, Fire and Safety arrangements emergency preparedness and ISM implementation to determine whether
      vessel confirms to acceptable standards of Vessle operation, maintainence and management.
    </p>
    <br />
    <br />
  </div>
  <Carousel
    showThumbs={false}
    showArrows={false}>
    <div>
      <img src="/public/img/inspection-1.jpg" />
    </div>
    <div>
      <img src="/public/img/inspection-1.jpg" />
    </div>
  </Carousel>
</div>