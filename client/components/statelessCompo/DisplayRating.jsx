import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import { Rating } from 'material-ui-rating';

class DisplayRating extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      display: props.display,
      order: null,
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
    const { order, feedback } = this.props;
    console.log('feedback..........', feedback);
    const { display } = this.state;
    const arr = [
      { label: 'Inspector\'s Availability', rating: feedback && feedback[0].availability },
      { label: 'Inspector\'s Reporting Quality', rating: feedback && feedback[0].reportQuality },
      { label: 'Inspector\'s Skills and Experience', rating: feedback && feedback[0].skillAndExp },
      { label: 'Stick to Dead Line', rating: feedback && feedback[0].deadline },
    ];
    // const arr = [
    //   { label: 'Inspector\'s Availability', rating: 2 },
    //   { label: 'Inspector\'s Reporting Quality', rating: 3 },
    //   { label: 'Inspector\'s Skills and Experience', rating: 4 },
    //   { label: 'Stick to Dead Line', rating: 5 },
    // ];
    return (
      <Dialog
        title="Display of Rating" modal={false} open={display}
        autoScrollBodyContent={true}
      >
        <div className="py-2" style={{color: '#000000'}}>
          <div className="d-flex mb-3">
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Order No. : </b><span>{order.id}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Inspection Type : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>Port : </b><span>{`value`}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>From : </b><span>{`value`}</span></div>
            </div>
            <div className="col-6">
              <div className="mb-2" style={{fontSize:'15px'}}><b>Vessel : </b><span>{order.vesselName}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>IMO : </b><span>{order.imoNumber}</span></div>
              <div className="mb-2" style={{fontSize:'15px'}}><b>To : </b><span>{`value`}</span></div>
            </div>
          </div>
          <div className="mb-3 d-flex align-items-center">
            <span className="mr-2">Average Rating:</span>
            <div className="profile-rating"><Rating readOnly={true} value={feedback && feedback[0].overallRating} max={5} /></div>
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
              <div className="p-1 mb-2" style={{ border: '1px solid #000' }}>{feedback && feedback[0].comment}</div>
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