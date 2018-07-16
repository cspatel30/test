import React, {Component} from 'react';
import ReactStars from 'react-stars';
import './newProfile.scss';

export default class SkillsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DSkills: ''
        }
    }

    componentWillReceiveProps(props) {
        if (props) {
            console.log("PROP$: "+JSON.stringify(props.userDashboard.skills))
            var skillspilt = props.userDashboard.skills.split(",");
            this.setState({DSkills: skillspilt})
        }
    }
    render() {
        if (this.state.DSkills && this.state.DSkills.length > 0) {
            return (
                <div className="col-md-12" style={{ float: "left", marginBottom: "15px" }}>
                    <div className="trapezoid">
                        <div className="title mr-auto pl-3">SKILLS</div>
                        <div className="rtCorner"></div>
                    </div>
                    <div className="shadow skill-minheight">
                        <div className="d-flex p-3 tags ">
                            {this
                                .state
                                .DSkills
                                .map((skill, key) => {
                                    return <div className="tag d-flex mt-25">
                                        <div className="tagBg"></div>
                                        <div className="bgTag">{skill}
                                            <span data-role="remove"></span>
                                        </div>
                                    </div>
                                })
}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <h4></h4>
        }

    }
}