import _ from 'lodash';
import React, { Component } from 'react';
import './Header.scss';
import { withRouter } from 'react-router';
import Cookie from 'js-cookie';

class Header extends Component {
  constructor(props){
    super(props);
    this.state= {
      token:''
    }
  }
  componentWillReceiveProps(props) {
    const profile_name = Cookie.get('inspector_name')
    const token = Cookie.get('token')
    this.setState({token})
  }
  componentWillMount() {
    const profile_name = Cookie.get('inspector_name')
    const token = Cookie.get('token')
    this.setState({token})
  }
  logout() {
    Cookie.remove('token')
    localStorage.clear();
    this.props.history.push('/')
  }
  render() {
    const token = this.state.token ? this.state.token : ''
   
    return (
      <div className="header-wrapper d-flex align-items-center justify-content-between px-5">
        <div className="logo mx-2"><img src="/public/img/headerLogo.jpg" alt="#logo"/></div>
            {
              (token)?(
                <div className="nav-wrap d-flex align-items-center">
                  <div className="mx-3 pointer"><img src="https://i1.wp.com/askgerald.co.za/wp-content/uploads/2014/08/Mark-profile-pic-colour-round.png?fit=453%2C449" style={{"height": "55px",
    "width": "55px"}} /></div>
                  <div className="mx-3 pointer" style={{fontWeight: 500,
    "fontSize": "16px"}}>Inspector</div>
                  <div className="mx-2 pointer" onClick={()=>{this.props.history.push('/newprofile')}}><button type="button" className="btn btn-head btn-pink">PROFILE</button></div>
                  <div className="mx-2 pointer" onClick={this.logout.bind(this)}><button type="button" className="btn btn-head btn-white align-items-center">LOGOUT</button></div>
                </div>
              ):(
                <div className="nav-wrap d-flex align-items-center">
                  <div className="mx-3 pointer" onClick={()=>{this.props.history.push('/login')}}><i className="fa fa-sign-in mr-1" aria-hidden="true" />LOGIN</div>
                  <div className="mx-3 pointer" onClick={()=>{this.props.history.push('/register')}}><i className="fa fa-pencil-square-o mr-1" aria-hidden="true" />SIGN UP</div>
                </div>
              )
            }
      </div>
    )
  }    
}

export default withRouter(Header);

