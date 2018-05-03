import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Rating } from 'material-ui-rating';

class DisplayRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      display: props.display,
    }  
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ display: nextProps.display });
  }
  renderBarChart(label, value, max) {
    const w = (value/max) * 100;
    return(
      <div className="d-flex flex-column">
        <span className="pl-1">{label}</span>
        <div style={{ height: '25px', width: '100%', background: '#ccddff' }}>
          <div style={{ height: 'inherit', background: '#1475af', width: `${w}%` }}></div>
        </div>
      </div>
    )
  }

  renderModal() {
    const { display } = this.state;
    const arr = [
      { label: 'Inspector\'s Availability', rating: 4 },
      { label: 'Inspector\'s Reporting Quality', rating: 5 },
      { label: 'Inspector\'s Skills and Experience', rating: 3 },
      { label: 'Stick to Dead Line', rating: 4 },
    ];
    return (
      <Dialog
        title="Display of Rating" modal={false} open={display}
        autoScrollBodyContent={true}
      >
        <div className="py-2" style={{color: '#000000'}}>
          <div className="d-flex mb-3">
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Order No. : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Inspection Type : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Port : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>From : </b><span>{`value`}</span></div>
            </div>
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>IMO : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>To : </b><span>{`value`}</span></div>
            </div>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <span className="mr-2">Average Rating:</span>
            <div className="profile-rating"><Rating readOnly={true} value={3} max={5} /></div>
          </div>
          <div>
            {
              arr.map((x, key) => (
                <div className="d-flex mb-2" key={key}>
                  <div className="col-2 p-0 text-right">{key + 1}</div>
                  <div className="col-8">{this.renderBarChart(x.label, x.rating, 5)}</div>
                  <div className="col-2 d-flex align-items-end">{x.rating}</div>
                </div>
              ))
            }
            <div className="d-flex flex-column mt-4">
              <span className="mb-1">Comments</span>
              <textarea className="px-3 py-2 mb-2" onChange={(e) => this.setState({comment: e.target.value})} rows="4" cols="50" maxLength={200}></textarea>
            </div>
          </div>
          <button type="button" style={{width: 'fit-content', float: 'right'}} className="btn btn-primary" onClick={() => this.setState({display: false})}>Close</button>
        </div>  
      </Dialog>       
    )
  }
  render() {
    return this.renderModal();
  }
}

export default DisplayRating;