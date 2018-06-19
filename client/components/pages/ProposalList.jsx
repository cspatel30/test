import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import leftarrow from '../../images/left-arrow.svg';
import rightarrow from '../../images/right-arrow.svg';
import RaisedButton from 'material-ui/RaisedButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import ImageText from './ImageText.jsx';
import circle from '../../images/circle-with-check-symbol.svg';
import map from '../../images/map.svg';
import clock from '../../images/clock.svg';
import { Rating } from 'material-ui-rating';
import Breakdown from './Breakdown.jsx'; 
import ReadMoreReact from 'read-more-react';

const CustomTableCell = withStyles(theme => ({
  head: { 
    backgroundColor:'#ffffff',     
    color: "#27292E",    
    fontSize:"18px",
    textAlign:"left",
    padding:"5px 0px",
  },
  body: {
    fontSize: 16,
    padding:"18px 12px",
    color:"#14436D"
  },
}))(TableCell);


const table = {
  minWidth: 700,
  width: '100%',
  marginTop: 3,
  marginBottom :0,
  overflowX: 'inherit',
  boxShadow: "rgba(0, 0, 0, 0.2) 0px -2px 8px 0px"
};
const rowt = {
  textAlign:"left",
  fontWeight:300,
  verticalAlign:"top"
};

const rows ={
  textAlign:"left"
}

const root= {
    color: "#FE3D6C",
}

const proposals=[{id:5,name:'M.chan',consultant:'Marine Engineer Consultant',engineer:'Chief Engineer',rating:'3',city:'Shanghai',country:'China',type:'Car carrie Ship',areas:['Singapore','Indonesia','Malaysia'],experience:'5',amount:'1050',message:'Excluding boat charges Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',status:'Availability',from:'08-08-2018',to:'08-18-2018'},{id:6,name:'Howard Ford',consultant:'Marine Engineer Consultant',engineer:'Chief Engineer',rating:'4',city:'Janisview',country:'',type:'Car carrie Ship',areas:['Singapore','Indonesia','Malaysia'],experience:'5',amount:'1150',message:'Excluding boat charges Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',status:'Availability',from:'08-08-2018',to:'08-18-2018'},{id:7,name:'M.chan',consultant:'Marine Engineer Consultant',engineer:'Chief Engineer',rating:'3',city:'Shanghai',country:'China',type:'Car carrie Ship',areas:['Singapore','Indonesia','Malaysia'],experience:'5',amount:'1050',message:'Excluding boat charges Lorem Ipsum has been the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged',status:'Availability',from:'08-08-2018',to:'08-18-2018'}];


class ProposalList extends Component {

  constructor(props) {
    super(props); 
    this.state ={select: false,selectAll: false,setId:{}}
    this.getItems = this.getItems.bind(this);  
    this.handleChange = this.handleChange.bind(this);    
    this.toggleAllCheckbox = this.toggleAllCheckbox.bind(this);  
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange(event){
    console.log(event.target.value);
    console.log(event.target.checked);
    this.state.setId[event.target.value] = !this.state.selectAll
    this.setState({select: !this.state.select,setId : this.state.setId});
   
    console.log(this.state);
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  toggleAllCheckbox() {
     

    //if (this.state.selectAll === false) {
      this.getItems(this.props.page,proposals).forEach(x => {
            this.state.setId[x.id] = !this.state.selectAll;
        });
   // }

    this.setState({        
        selectAll: !this.state.selectAll,
        setId : this.state.setId
    });
    console.log(this.state);
}

  getItems(page, items) {
    const _start = page * 2 - 2;
    const _end = page * 2;    
    return items.slice(_start, _end);
  }

  

 
  render() { 
    const { formatDate,page,pageCount } = this.props;
    console.log(this.state);
    return (  
        
      
        <Table style={table}>
          <TableHead>
          <TableRow style={rows}>
            <CustomTableCell colSpan="2"><Checkbox                    
                    onChange={this.toggleAllCheckbox}  style={{ color: "#FE3D6C" }}                 
                /></CustomTableCell>
            <CustomTableCell colSpan="3">INSPECTORS({proposals.length})</CustomTableCell>            
            <CustomTableCell><RaisedButton
                label="PLACE ORDER"
                labelColor="#FE3D6C"
                backgroundColor="#FFF"
                buttonStyle={{ borderRadius: 25 }}
                labelStyle={{fontWeight: "600"}}
                style={{ borderRadius: 25, border: '2px solid #FE3D6C',float: "left",
                margin: "10px 0 0",width: "192px"}}
              /></CustomTableCell>
          </TableRow>
          </TableHead>
          <TableBody>            
              {this.getItems(page,proposals).map(n => {
                console.log(this.state.setId[n.id]);
              return (
                <TableRow style={rowt}>
                  <CustomTableCell component="th" scope="row" style={{width:"5%"}}>
                  <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.setId[n.id] ? this.state.setId[n.id] :this.state.selectAll}
              onChange={this.handleChange}              
              style={{ color: "#FE3D6C" }}
              value={n.id}
            />
          }
          
        />
        </FormGroup>                  
                  </CustomTableCell>
                  <CustomTableCell style={{width:"18%"}}>
                     <div className="proposalEngineer">
                      <div className="details proposalImg">
                        <div><span className="value"><ImageText profilename={n.name}/></span></div>
                        <div><span className="value">
                        <RaisedButton
                          label="VIEW FULL PROFILE"
                          labelColor="#FE3D6C"
                          backgroundColor="#FFF"
                          buttonStyle={{ borderRadius: 25 }}
                          labelStyle={{fontWeight: "600"}}
                          style={{ borderRadius: 25, border: '2px solid #FE3D6C'}}
                        /></span></div>
                       {this.state.setId[n.id] == true && <div style={{padding: "15px 0px 0"}}><span className="value" style={{color:"#6AC259",fontSize:"16px"}}><img src={circle} width="14px" height="14px" /> {'Recommend'}</span></div>}
                          
                       </div>
                    </div> 
                </CustomTableCell>
                  <CustomTableCell colSpan="3">
                  <div className="proposalEngineer">
                      <div className="details">
                         <div><span className="consultant" style={{fontSize:"16px"}}>{n.consultant}</span></div>
                         <div><span className="value">{n.engineer}</span></div>
                         <div><span className="value">
                         <div className="ratingIns">
                         <Rating
                          value={n.rating}
                          max={5}
                          itemStyle={{ width: 12,height: 12,padding: "0 20px 0 0"}}
                          itemIconStyle={{height:15,width:15}}
                          onChange={(value) => console.log(`Rated with value ${value}`)}
                        /> <span style={{fontSize:"10px"}}>({n.rating})</span>
                        </div>
                         </span></div>
                         <div><span className="FilterHead"><img src={map} width="14px" height="14px" style={{ verticalAlign: "textTop",padding: "0 5px 0 0"}}/>{n.city} {n.country}</span></div>
                         <div><span className="ship">{'Ship Type: '}</span><span className="consultant arrowInspector">{n.type}</span>   <span className="consultant arrowInspector">{n.type}</span></div> 
                         <div><span className="ship">{'Areas Covered : '}</span><span className="value">{n.areas.join(',')}</span></div>  
                         <div><span className="ship">{'Experience : '}</span><span className="value">{n.experience} Years</span></div>  
                      
                      </div>
                    </div> 
                  </CustomTableCell>
                 
                  <CustomTableCell style={{width:"24%"}}> 
                    <div className="proposalEngineer">
                      <div className="details">
                        <div style={{lineHeight: "21px"}}><span className="amount">$ {n.amount}</span></div>
                        <div><Breakdown/></div>
                        <div><span className="value">{'Message :'}<br/>
                        <ReadMoreReact text={n.message}
                              min={6}
                              ideal={7}
                              max={100} 
                              />
                        </span></div>
                        <div><span className="consultant">{n.status}</span> </div>
                        <div><span className="FilterHead"><img src={clock} width="14px" height="14px" style={{verticalAlign: "sub",margin:"0 6px 0 0"}}/> { formatDate(n.from)} -to {formatDate(n.to)}</span></div>
                      </div>
                    </div> 
                  </CustomTableCell>
                </TableRow>
              );
            })}          
          </TableBody>
        </Table>
    
      
    );
  
  }
  }

export default ProposalList;
