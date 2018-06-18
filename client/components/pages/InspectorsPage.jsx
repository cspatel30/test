// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';
import { NavLink } from 'react-router-dom';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { Rating } from 'material-ui-rating';

import Divider from 'material-ui/Divider';
import Avatar from 'material-ui/Avatar';

import IconButton from 'material-ui/IconButton';
import Done from 'material-ui/svg-icons/action/done';
import Clear from 'material-ui/svg-icons/content/clear';
import ActionInfo from 'material-ui/svg-icons/action/info';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import ActionAssignment from 'material-ui/svg-icons/action/assignment';
import CommunicationCall from 'material-ui/svg-icons/communication/call';
import CommunicationEmail from 'material-ui/svg-icons/communication/email';
import LocationOn from 'material-ui/svg-icons/communication/location-on';
import Previous from 'material-ui/svg-icons/navigation/chevron-left';
import Next from 'material-ui/svg-icons/navigation/chevron-right';
import FirstPage from 'material-ui/svg-icons/navigation/first-page';
import LastPage from 'material-ui/svg-icons/navigation/last-page';

import {green500, red500, blue500, yellow600, orange600, fullWhite} from 'material-ui/styles/colors';

import Chip from 'material-ui/Chip';

const styles = {
	unselected: {
		backgroundColor: '#fff'
	},
	icon : {
		marginTop: 15
	},
	largeIcon: {
		width: 60,
		height: 60,
	},
	large: {
		width: 120,
		height: 120,
		padding: 30,
	}
}

export default class InspectorsPage extends Component {

  constructor(props) {
  	super(props);

    this.state = {
      pageNo: 1,
      inspectors: [],
      viewMore: true
    }

  	this.renderInspectorRow = this.renderInspectorRow.bind(this);
  	this.renderInspectors = this.renderInspectors.bind(this);
    this.fetchNextPage = this.fetchNextPage.bind(this);

  }

  fetchNextPage() {
    this.props.getInspectors(this.state.pageNo + 1);
  }

  componentWillMount() {
  	this.props.getInspectors(1);
  }

  componentWillReceiveProps(props) {
    if(props.inspectors && props.inspectors.length > 0) {
      this.setState( (state) => { state.pageNo = props.inspectorPageNo; state.inspectors = state.inspectors.concat(props.inspectors); state.viewMore = true;});
    } else {
      if(!props.error && ( !props.inspectors || props.inspectors.length == 0 )) {
        this.setState((state) => { state.viewMore = false; });
      }
    }
  }

  renderChipsArray(dataArray, type) {
    var elements = [];
    if(dataArray && dataArray.length > 0) {
      dataArray.map((data) => { elements.push(<Chip style={{margin: 5, float: 'left'}} labelColor={fullWhite} backgroundColor={blue500} key={type+"_"+data}>{data.trim()}</Chip>); });
  }
    return(<div>{elements}<div className="clear"></div></div>);
  }

  renderChips(dataString, type) {
    if(!dataString || dataString.trim() == "")
      return null;

    return this.renderChipsArray(dataString.split(","), type);
  }

  renderProfilePicAvatar(inspector) {
  	if(inspector.profilePic && inspector.profilePic.trim() !== "") {
  		return (<Avatar src={"https://s3-ap-southeast-1.amazonaws.com/sinotechmarineassets/profileimages/"+inspector.profilePic} size={150}/>);
  	} else {
  		return (<Avatar size={150}>{inspector.name.substring(0,1)}</Avatar>);
  	}
  }

  renderInspectorRow(inspector) {

  	return(
  		<div key={"inspector_row_"+ inspector.userId}>
	  		<div className="profile-summary">
	  			<div className="profile-summary-image" style={{textAlign: 'center'}}>
	  				{this.renderProfilePicAvatar(inspector)}
	  				<Divider style={{visibility: 'hidden', marginTop: 50}}/>
	  				<Rating readOnly={true} value={3} max={5} />
	  			</div>
	      		<div className="profile-summary-details">
	      			<h1>{inspector.name} - ({inspector.qualificationDisplayName})</h1>
              <div className="detail-line"><label>Position :</label> {inspector.positionDisplayName} </div>
              <div className="detail-line"><label>Skills :</label> {this.renderChips(inspector.skills, 'skills')}</div>
              <div className="detail-line">
                <label>Covered Regions :</label> 
                {this.renderChipsArray(inspector.coveredAreas, 'covered_area')}
              </div>
              <div className="detail-line">
                <label>Approved Vessel Types :</label>
                {this.renderChipsArray(inspector.approvedVesselTypes, 'vessel_type')}
              </div>
              <div className="detail-line">
                <label>Approved Inspection Types :</label>
                {this.renderChipsArray(inspector.approvedInspectionTypes, 'inspection_type')}
              </div>
	      			<Divider/>
	      			<p>
	      				{inspector.background}
	      			</p>
	      			<div><NavLink className="link" key="inspector_link_profile" to={"/inspector/profile/"+inspector.userId} onClick={this.handleClose}>View Complete Profile</NavLink></div>
	      		</div>
	      		<div className="clear"></div>
	  		</div>
  		</div>
  	);
  }

  renderPaginationSection() {
    if(this.props.userProfile && this.props.userProfile.approved == 1) {
      var items = [];
      if(this.state.pageNo <= 1) {
        //items.push(<IconButton iconStyle={styles.largeIcon}><Previous key="prev_link"/></IconButton>);
      } else {
        items.push(<IconButton iconStyle={styles.largeIcon} tooltip="Previous Page"><Previous key="prev_link" color={blue500} onClick={() => { console.log("prev click")}}/></IconButton>);
      }

      if(this.state.viewMore) {
        items.push(<IconButton iconStyle={styles.largeIcon} tooltip="Next Page"><Next key="next_link" color={blue500} onClick={this.fetchNextPage}/></IconButton>); 
      } else {
        //items.push(<IconButton iconStyle={styles.largeIcon}><Next key="next_link"/></IconButton>); 
      }

      return(<div className="inspector-pagination">
              {items}
            </div>);
    } else {
      return null;
    }
  }

  renderInspectors(inspectors) {
  	var elements = [];
  	if(inspectors && inspectors.length > 0) {
  		elements = inspectors.map(this.renderInspectorRow);
  	}

  	return(<div>{elements}</div>);
  }

  render() {
    const { inspectors } = this.state;
	  return (
        <div className="page">
        	<h1>Inspectors</h1>
        	<p>Ship Inspector has inspectors in over 70 locations worldwide. We have a network of over 100 inspectors. Our inspectors are competent across a wide range of ship types including bulk carriers, container vessels, tankers, gas ships and offshore vessels.</p>

        	<div style={{fontSize: 14, fontWeight: 400, marginTop: 10, marginBottom: 10}}>
        		<h3>Meet a few of our marine experts below...</h3>
        	</div>
        	<Divider/>

        	{this.renderInspectors(inspectors)}
        	<Divider/>

          {this.renderPaginationSection()}
          <div className="clear"></div>
        </div>
    );
  }
}