import React, { Component } from 'react';
import Tooltip from 'rc-tooltip';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'rc-tooltip/assets/bootstrap.css'
import './FilterInspectorPage.scss';
import './InspectorDashboard.scss';
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
const wrapperStyle = { width: "100%",paddingLeft:5,paddingRight:5 };

export default class FilterInspectorPage extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount(){
        $(document).ready(function () {
          $('.dropdown-button').dropdown({
              constrainWidth: false,
              hover: true,
              belowOrigin: true,
              alignment: 'left'
          });
          $('select').material_select();
          
          $('.button-collapse').sideNav();
        });
      }
   
  render() {
        return (
            <div className="shiptype">
                    <div className="col-md-12 pl-0 pr-0">
                        <span className="fw-bold">Skills</span>
                        <div className="skills-filter mt-5" style={{color: "#5ab8f8",fontSize:13,fontWeight: "lighter",borderRadius:1}}>
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
                            <span className="p-0 ml-5">Add skill...</span> 
                        </div>  
                    </div>
                    <div className="col-md-12 pl-0 pr-0 mt-10">
                    <span className="fw-bold mt-5">Ship Type</span>
                    <div className="skills-filter pb-10 filterpadding mt-5 " style={{color: "#5ab8f8",fontSize:13,fontWeight: "lighter",borderRadius:1}}>
                        <ul className="ship-list mt-10">
                            <li>Car Carriers Ship</li>
                            <br/>
                            <li>Bulk Carriers Ship</li>
                        </ul>
                    <span className="p-0 ml-5">Add covered...</span> 
                    </div>
                </div>
                <div className="col-md-12 pl-0 pr-0 mt-10">
                <span className="fw-bold">Areas Covered"</span>
                <div className="dropdown">
                <select name="inspectorCountry mt-5">
                        <option value="" required>Country</option>
                        <option value="Option 1">Option 1</option>
                        <option value="Option 2">Option 2</option>
                        <option value="Option 3">Option 3</option>
                </select>
                </div>
                </div>
                <div className="col-md-12 pl-0 pr-0 mt-20">
                    <span className="fw-bold">Years of experience</span>
                    <div className="mt-5" style={wrapperStyle}>
                    <Range min={0} max={20} defaultValue={[0, 20]} tipFormatter={value=> `${value}`} />
                    </div>
                </div>
         </div>
        );
    }
}