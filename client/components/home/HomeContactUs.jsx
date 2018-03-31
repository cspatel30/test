// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';
import Paper from 'material-ui/Paper';
import GoogleMap from 'google-map-react';

import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Email from 'material-ui/svg-icons/communication/email';
import {blue500} from 'material-ui/styles/colors';

const styles = {
  icon: {
    width: 30,
    height: 30,
  }
}

export default class HomeContactUs extends Component {

  render() {

    const location = { lat: 22.262272, lng: 114.1303702 };

    return (
        <div className="home-contact">
        	<Paper className="home-contact-paper">
            <div className="home-contact-widget">
              <div className="contact-us-details">
                <h2>Contact Us</h2>
                <div className="contact-address-row">
                  <div className="contact-item">
                    <div className="image"><img src="http://www.sinotechmarine.com/wp-content/uploads/2017/12/hongkong-flag-1.jpg" width="50" height="30"/></div> <div className="label">+852-52456106</div>
                    <div className="clear"></div>
                  </div>
                  <div className="contact-item">
                    <div className="image"><img src="http://www.sinotechmarine.com/wp-content/uploads/2017/12/singapore-flag-1.jpg" width="50" height="30"/></div> <div className="label">+65-31581460</div>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="contact-address-row">
                  <div className="contact-item">
                    <div className="image"><img src="http://www.sinotechmarine.com/wp-content/uploads/2017/12/UK-flag-1.jpg" width="50" height="30"/></div> <div className="label">+44-2074425848</div>
                    <div className="clear"></div>
                  </div>
                  <div className="contact-item">
                    <div className="image"><img src="http://www.sinotechmarine.com/wp-content/uploads/2017/12/greece.png" width="50" height="30"/></div> <div className="label">+30-2103007223</div>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="contact-address-row">
                  <div className="contact-item">
                    <div className="image"><img src="http://www.sinotechmarine.com/wp-content/uploads/2017/12/USA-flag-1.jpg" width="50" height="30"/></div> <div className="label">+1-6465830707</div>
                    <div className="clear"></div>
                  </div>
                  <div className="contact-item">
                    <div className="image"></div>
                    <div className="label"></div>
                    <div className="clear"></div>
                  </div>
                </div>
                <div className="contact-address-row">
                  <div className="contact-item">
                    <div className="image"><Email color={blue500} style={styles.icon}/></div><div className="label"><a style={{color: '#3e3e3e'}} href="mailto:enquiries@shipinspectors.com">enquiries@shipinspectors.com</a></div>
                    <div className="clear"></div>
                  </div>
                  <div className="contact-item">
                    <div className="image"></div>
                    <div className="label"></div>
                    <div className="clear"></div>
                  </div>
                </div>

                <div className="contact-address-row">
                  <div className="contact-item-address">
                    <div className="image"><LocationOn color={blue500} style={styles.icon}/></div> 
                    <div className="label">1234, Sed Smart space-2, Units 1205-1208, Level 12,
                    Cyberport-2, 100 Cyberport Road Hong Kong</div>
                    <div className="clear"></div>
                  </div>
                </div>
              </div>
              <div className="contact-map">
                <div style={{'textAlign': 'center', width: '100%', height: '100%'}}>
                  <GoogleMap yesIWantToUseGoogleMapApiInternals={true} bootstrapURLKeys={{key: 'AIzaSyA7GW_hVzuB75WbgYg-M2ZaP9Vn48aS-2I'}} center={location} defaultZoom={17}  onGoogleApiLoaded={({map, maps}) => {let marker = new maps.Marker({ position: location, map, title: 'Address'})}}/>
                </div>
              </div>
            </div>
          </Paper>
        </div> 
    );
  }
}