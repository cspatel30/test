import React, { Component } from 'react';
import banner from '../../images/banner.png';

const banners = {
    imageShip: {
        backgroundImage: `url(${banner})`,
        width: "100%",
        height: "300px",
        textAlign: "center",
        color: "#ECEFFF",
        backgroundSize:" cover",
        backgroundRepeat: "no-repeat",
        display:" flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "60px",
        fontFamily:"proxima_novaregular"
    }
}
export default class Banner extends Component {
    constructor(props) {
        super(props);
      
    }

    render() {
      
        return (            
                <div style={banners.imageShip}>                   
                    {'PROPOSALS'}
                </div>                  
        );
    }
}