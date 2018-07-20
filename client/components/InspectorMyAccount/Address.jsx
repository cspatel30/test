import React, { Component } from 'react';
import Calendar from '../../resources/static/img/calendar.png';

class Address extends Component {
  render() {
    const address = {
      building: 'MAERSK SINGAPORE PTE LTD',
      street: '2341XS',
      city: 'creamin@maersk.com',
      country: 'Swissmalaybr',
      postalCode: '417-799-7107',
    };
    return (
      <div className="InspectorMyAccount-Address">
        <div className="row">
          <div className="col-12">
            <p><span>Building:</span>{address.building}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p><span>Street:</span> {address.street}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p><span>City:</span> {address.city}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p><span>Country:</span> {address.country}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <p><span>Postal Code:</span> {address.postalCode}</p>
          </div>
        </div>
        <br />
        <div style={{ paddingLeft: 0 }} className="col-md-12">
          <button className="secondary">UPDATE</button>
        </div>
      </div>
    )
  }
}
export default Address;