import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import OptionsEnquiry from './OptionsEnquiry.jsx';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14
  },
}))(TableCell);

const
  root = {
    width: '100%',
    marginTop: 3,
    overflowX: 'auto',
    boxShadow: "none"
  };
const table = {
  minWidth: 700,
  border: 'none'
};
const rowt = {
  '&:nth-of-type(even)': {
    background: 'red'
  }
};

class CustomizedTable extends Component {

  constructor(props) {
    super(props);  
    this.state = {
      expanded: false
    }
    this.getItems = this.getItems.bind(this); 
    this.getTableHeaders = this.getTableHeaders.bind(this);
  }

  
  getItems(page, items) {
    const _start = page * 2 - 2;
    const _end = page * 2;    
    return items.slice(_start, _end);
  }

  getTableHeaders() {
    const { itemType } = this.props;

    switch (itemType) {
      case "Manage Enquiries":      
        return (
          <TableRow>
            <CustomTableCell>Ref.No</CustomTableCell>
            <CustomTableCell>Enquiries</CustomTableCell>
            <CustomTableCell>Quotations</CustomTableCell>
            <CustomTableCell>Status</CustomTableCell>
            <CustomTableCell>More</CustomTableCell>
            <CustomTableCell>Actions</CustomTableCell>
          </TableRow>
        );
      case "Manage Orders":
        return (
          {/*<tr>
            <th width="40%" className="th-primary">Name</th>
            <th width="20%" className="th-secondary">Activities</th>
            <th width="20%" className="th-secondary">{!window.location.href.includes("publisher") && "Budget"}</th>
            <th width="15%" className="th-primary"/>
          </tr>
          */}
        );
        default:
        return (
          <tr>
            <th />
          </tr>
        );
    }
  }

  render() {
    const { renderEnquiries,formatDate,page } = this.props;
    const { expanded } = this.state;
    const toggledClass = expanded ? 'expanded' : 'collapsed';
    return (  
        
      <Paper style={root}>
        <Table style={table} className="Listing">
          <TableHead>
          {this.getTableHeaders()}
          </TableHead>
          <TableBody>
            {this.getItems(page,renderEnquiries).map(n => {
              return (
                <TableRow style={rowt} key={n.id}>
                  <CustomTableCell component="th" scope="row">
                  {n.id}
                  </CustomTableCell>
                  <CustomTableCell>
                     <div className="enquiry-details-box">
                      <div className="details">
                        <div><span className="titleEnquiry">Vessel</span> - <span className="value">{n.vesselName}</span>, <span className="titleEnquiry">IMO</span> - <span className="value">{n.imo}</span></div>
                        <div><span className="titleEnquiry">Vessel Type </span>- <span className="value">{n.vesselTypeDisplayName}</span></div>
                        <div><span className="titleEnquiry">Inspection Type </span>- <span className="value">{n.inspectionTypeDisplayName}</span></div>
                        <div><span className="titleEnquiry">Port</span> - <span className="value">{n.portData.name}, {n.portData.countryName}</span></div>
                        <div><span className="titleEnquiry">From </span>- <span className="value">{formatDate(n.startTime)}</span><span className="titleEnquiry"> to</span> - <span className="value">{formatDate(n.endTime)}</span></div>
                        <div><span className={`content ${toggledClass}`}>{n.message}</span><span className="value"><a onClick={() => this.setState({ expanded: !expanded })}>{expanded ? 'View Less' : 'View More'}</a></span></div>  
                        <div><span className="value"><a href="#"> { "VIEW SUGGESTED INSPECTORS"}</a></span></div>  
                      </div>
                    </div> 
                </CustomTableCell>
                  <CustomTableCell>
                  <div className="enquiry-details-box">
                      <div className="details">
                        <div><span className="value">{n.quotations}</span></div>
                        <div><span className="value" align="center">{n.proposalstatus}</span></div>
                        <div><span className="value"><a href="#">{'VIEW PROPOSALS'}</a></span></div>
                        <div><span className="titleEnquiry">{'Recommended Inspector'} </span>- <span className="value">{n.inspectorname !== ''  ? n.inspectorname.name : ''}</span></div>
                        <div><span className="titleEnquiry">Amount-US$ </span><span className="value">{n.inspectoramount !== null ? n.inspectoramount.amountinspector : ''}</span></div>
                        <div><span className="value"><a href="#">{'VIEW FULL PROFILE'}</a></span></div>
                      </div>
                    </div> 
                  </CustomTableCell>
                  <CustomTableCell>
                  <div className="enquiry-details-box">
                      <div className="details">
                        <div><span className="value">{n.status}</span></div>
                        </div>
                    </div> 
                  </CustomTableCell>                 
                  <CustomTableCell>{<OptionsEnquiry/>}</CustomTableCell>
                  <CustomTableCell> 
                    <div className="enquiry-details-box">
                      <div className="details">
                        <div><span className="value"><a href="#">{'CREATE ORDER'}</a></span></div>
                        <div><span className="value"><a href="#">{'VIEW REPORT'}</a></span></div>
                      </div>
                    </div> 
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>
      
    );
  
  }
  }


/*CustomizedTable.propTypes = {
  classes: PropTypes.object.isRequired,
};*/

export default CustomizedTable;
