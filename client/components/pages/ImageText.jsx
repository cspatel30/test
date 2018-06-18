import React, { Component } from 'react';
import profile from '../../images/Chrysanthemum.jpg';

export default class ImageText extends Component {
    
    render() {
        const {profilename}=this.props;
        return (            
                <div>
                    <img src={profile} width="80px" height="80px" style={{borderRadius: "50%"}} />                    
                    <div className="Imagetext">{profilename}</div>
                </div>                  
        );
    }
}