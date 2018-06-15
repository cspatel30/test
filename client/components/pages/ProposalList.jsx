import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ReactPaginate from "react-paginate";
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
  overflowX: 'inherit',
  boxShadow: "0px 1px 5px 0px rgba(0, 0, 0, 0.2), 0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 3px 1px -2px rgba(0, 0, 0, 0.12)"
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

const proposals=[{id:5,name:'M.chan',consultant:'Marine Engineer Consultant',engineer:'Chief Engineer',rating:'3',city:'Shanghai',country:'China',type:'Car carrie Ship',areas:['Singapore','Indonesia','Malaysia'],experience:'5',amount:'1050',message:'Excluding boat charges',status:'Availability',from:'08-08-2018',to:'08-18-2018'},{id:6,name:'Howard Ford',consultant:'Marine Engineer Consultant',enginner:'Chief Engineer',rating:'4',city:'Janisview',country:'',type:'Car carrie Ship',areas:['Singapore','Indonesia','Malaysia'],experience:'5',amount:'1150',message:'Excluding boat charges',status:'Availability',from:'08-08-2018',to:'08-18-2018'}];


class ProposalList extends Component {

  constructor(props) {
    super(props); 
    this.state ={checkedA: false,selectAll: false}
    this.getItems = this.getItems.bind(this);        
  }

  componentWillMount = () => {
    this.selectedCheckboxes = new Set();
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  toggleCheckbox = label => {
    if (this.selectedCheckboxes.has(label)) {
      this.selectedCheckboxes.delete(label);
    } else {
      this.selectedCheckboxes.add(label);
    }
  }

  toggleAllCheckbox() {
    let newSelected = {};

    if (this.state.selectAll === false) {
        proposals.forEach(x => {
            newSelected[x.id] = true;
        });
    }

    this.setState({
        selected: newSelected,
        selectAll: true
    });
}

  getItems(page, items) {
    const _start = page * 2 - 2;
    const _end = page * 2;    
    return items.slice(_start, _end);
  }

  

 
  render() { 
    const { formatDate,page,pageCount } = this.props;
    
    return (  
        
      
        <Table style={table}>
          <TableHead>
          <TableRow style={rows}>
            <CustomTableCell colSpan="2"><Checkbox                    
                    handleCheckbox={this.toggleAllCheckbox}  style={{ color: "#FE3D6C" }}                 
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
              return (
                <TableRow style={rowt}>
                  <CustomTableCell component="th" scope="row">
                  <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={this.state.checkedA ? this.state.checkedA : this.state.selectAll}
              onChange={this.handleChange(n.id)}
              value={n.id}
              style={{ color: "#FE3D6C" }}
            />
          }
          
        />
        </FormGroup>                  
                  </CustomTableCell>
                  <CustomTableCell>
                     <div className="enquiry-details-box">
                      <div className="details">
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
                        <div><span className="value" style={{color:"#6AC259"}}><img src={circle} width="14px" height="14px" /> {'Recommend'}</span></div>
                          
                       </div>
                    </div> 
                </CustomTableCell>
                  <CustomTableCell colSpan="3">
                  <div className="enquiry-details-box">
                      <div className="details">
                         <div><span className="consultant">{n.consultant}</span></div>
                         <div><span className="value">{n.engineer}</span></div>
                         <div><span className="value">
                         <Rating
                          value={n.rating}
                          max={5}
                          onChange={(value) => console.log(`Rated with value ${value}`)}
                        /> ({n.rating})
                         </span></div>
                         <div><span className="FilterHead"><img src={map} width="14px" height="14px" />{n.city} {n.country}</span></div>
                         <div><span className="ship">{'Ship Type: '}</span><span className="consultant" style={{border: "1px solid #0D99EF"}}>{n.type}</span>   <span className="consultant" style={{border: "1px solid #0D99EF"}}>{n.type}</span></div> 
                         <div><span className="ship">{'Areas Covered : '}</span><span className="value">{n.areas.join(',')}</span></div>  
                         <div><span className="ship">{'Experience : '}</span><span className="value">{n.experience} Years</span></div>  
                      
                      </div>
                    </div> 
                  </CustomTableCell>
                 
                  <CustomTableCell> 
                    <div className="enquiry-details-box">
                      <div className="details">
                        <div><span className="amount">$ {n.amount}</span></div>
                        <div><Breakdown/></div>
                        <div><span className="value">{'Message :'}<br/>
                        <ReadMoreReact text={n.message}
                              min={5}
                              ideal={20}
                              max={100} />
                        </span></div>
                        <div><span className="consultant">{n.status}</span> </div>
                        <div><span className="FilterHead"><img src={clock} width="14px" height="14px" /> { formatDate(n.from)} -to {formatDate(n.to)}</span></div>
                      </div>
                    </div> 
                  </CustomTableCell>
                </TableRow>
              );
            })}
            {pageCount > 1 &&
              <div className="pagination-outer-div">
                <ReactPaginate
                  initialPage={page - 1}
                  previousLabel={'<<'}
                  nextLabel={'>>'}
                  breakLabel={<span>...</span>}
                  breakClassName="break-me"
                  pageCount={pageCount}
                  marginPagesDisplayed={1}
                  pageRangeDisplayed={2}
                  onPageChange={(page) => this.setState({ page: page.selected + 1 })}
                  containerClassName="paginationproposal"
                  subContainerClassName="pages paginationproposal"
                  activeClassName="paginationproposal active"
                />
              </div>
            }
          </TableBody>
        </Table>
    
      
    );
  
  }
  }

export default ProposalList;
