import React from 'react';
import PropTypes from 'prop-types';
import './admin.scss';

const PageBase = (props) => {

    const {titleComponent, title, navigation, beforeLoginClass, titleUrl} = props;

    return (
        <div className="admin-panel-main-wrapper">
            <div className="padding-md">
                    <div className="row">
                        <div className="col-md-12">
                            <h3 className="headline m-top-md">
                                {
                                    !titleComponent?
                                        <div className="page-main-heading">
                                            <div className="page-sub-heading">
                                                {title?title:titleUrl}
                                            </div>
                                        </div>
                                        :
                                        title?title:titleUrl
                                }
                            </h3>
                            {
                                titleComponent?
                                    titleComponent
                                    :""
                            }
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="panel blog-container">
                                        <div className="panel-body">
                                            {props.children}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

        </div>
    );
};

PageBase.propTypes = {
    navigation: PropTypes.string,
    children: PropTypes.element
};

export default PageBase;