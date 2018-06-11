import React, { Component } from 'react';
import banner from '../../images/banner.png';
import Breadcrumb from './Breadcrumb.jsx';
import CustomList from './CustomList.jsx';

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
        fontSize: "60px"
    }
}
export default class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showname: 'Manage Enquiries',
            showActive:'',
            selection: 'Manage Enquiries'
        }
        this.showNavigationName = this.showNavigationName.bind(this);
    }

    showNavigationName(navigateName) {
        this.setState({
            showname: navigateName,
            showActive:true,
            selection:navigateName
        });
    }

    render() {
        const { showname,showActive,selection } = this.state;
        const {renderEnquiries,profileType,formatDate,pageLength} = this.props;
        return (
            <div>
                <div style={banners.imageShip}>                   
                    {showname}
                </div>
                <div className="Navigation">
                    <Breadcrumb showNavigationName={this.showNavigationName} showActive={showname} selected={selection}/>
                </div>
                <div>
                   <CustomList selected={selection} renderEnquiries={renderEnquiries} pageLength = {pageLength} profileType={profileType} formatDate={formatDate}/>
                </div>    
            </div>
        );
    }
}