import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);
const Handle = Slider.Handle;


const handle = (props) => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Tooltip
      prefixCls="rc-slider-tooltip"
      overlay={value}
      visible={dragging}
      placement="top"
      key={index}
    >
      <Handle value={value} {...restProps} />
    </Tooltip>
  );
};
const wrapperStyle = { width: 300 };

export default class FilterInspectorPage extends Component {
    constructor(props){
        super(props);
    }
   
  render() {
        return (
            <div className="shiptype">
                    <div className="col-md-12 pl-0 pr-0">
                        <span>Skills</span>
                        <div className="skills-filter" style={{color: "#5ab8f8",fontSize:13,fontWeight: "lighter",borderRadius:1}}>
                        <div className="d-flex p-3 tags ">
                        <div className="tag d-flex mt-25">
                            <div className="tagBg">
                            </div>
                            <div className="bgTag"><span data-role="remove"> crude oil washing</span></div>
                        </div>
                        <div className="tag d-flex">
                            <div className="tagBg">
                            </div>
                            <div className="bgTag">ISM Audtis <span data-role="remove"></span></div>
                        </div>
                        <div className="tag d-flex">
                            <div className="tagBg">
                            </div>
                            <div className="bgTag">Marina casualty investigation<span data-role="remove"></span></div>
                        </div>
                        </div>
                            <span className="ml-2">Add skill...</span> 
                        </div>  
                    </div>
                    <div className="col-md-12 pl-0 pr-0 mt-10">
                    <span>Ship Type</span>
                    <div className="skills-filter pb-10" style={{color: "#5ab8f8",fontSize:13,fontWeight: "lighter",borderRadius:1}}>
                        <ul className="ship-list mt-10">
                            <li>Car Carriers Ship</li>
                            <br/>
                            <li>Bulk Carriers Ship</li>
                        </ul>
                    <span className="ml-2">Add covered...</span> 
                    </div>
                </div>
                <div className="col-md-12 pl-0 pr-0 mt-10">
                <span>Areas Covered"</span>
                <div className="dropdown">
                <button type="button" className="btn btn-default dropdown-toggle ml-0 w-100" data-toggle="dropdown">
                Country
                </button>
                <div className="dropdown-menu w-100">
                    <a className="dropdown-item" href="#">Option 1</a>
                    <div className="dropdown-divider" />
                    <a className="dropdown-item" href="#">Option 2</a>
                    <div className="dropdown-divider" />
                        <a className="dropdown-item" href="#">Option 3</a>
                    </div>
                    </div>
                </div>
                <div className="col-md-12 pl-0 pr-0 mt-10">
                    <h5>Years of experience</h5>
                    <div style={wrapperStyle}>
                    <Range min={0} max={20} defaultValue={[0, 20]} tipFormatter={value=> `${value}`} />
                    </div>
                </div>
         </div>
        );
    }
}