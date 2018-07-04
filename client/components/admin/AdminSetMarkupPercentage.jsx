import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import Confirm from 'react-confirm-bootstrap';
import './admin.scss';

export default class AdminSetMarkupPercentage extends Component {

  constructor(props) {
    super(props);
  }

  render() {
      const { markupFieldsDeduction, onChange } = this.props;
      return (
            <form className="row enqueries-form">
                <div className="col-md-6">
                    <div className="form-group">
                        <label for="formGroupExampleInput">Inspector Deduction</label>
                        <input type="text" className="form-control" id="formGroupExampleInput"
                         placeholder="15%" value={markupFieldsDeduction.inspector}
                         onChange={(e)=>{onChange(e.target.value, "inspector")}}
                         max="30"
                         />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label for="formGroupExampleInput2">Client Mark up</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="15%"
                         value = {markupFieldsDeduction.client}
                         onChange={(e)=>{onChange(e.target.value, "client")}}
                         max="30"
                         />
                    </div>
                </div>
                {/*<div className="clear col-md-6">
                    <button className="btn btn-class" onClick="">Submit</button>
                </div>*/}
            </form>
      )
    
  }
}