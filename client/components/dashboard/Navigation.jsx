import React, { Component } from 'react';
import banner from '../../images/banner.png';
import Breadcrumb from './Breadcrumb.jsx';
import CustomList from './CustomList.jsx';

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
        const {renderEnquiries,profileType,formatDate,formatMonth,pageLength} = this.props;
        return (
            <div>
                <div className="imageShip">                   
                    {showname}
                </div>
                <div className="Navigation">
                    <Breadcrumb showNavigationName={this.showNavigationName} showActive={showname} selected={selection}/>
                </div>
                <div>
                   <CustomList selected={selection} renderEnquiries={renderEnquiries} profileType={profileType} formatDate={formatDate} formatMonth={formatMonth} pageLength ={pageLength}/>
                </div>    
            </div>
        );
    }
}