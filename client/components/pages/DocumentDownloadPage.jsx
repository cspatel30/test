// import 'regenerator-runtime/runtime';

import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {FormattedMessage} from 'react-intl';

export default class DownloadDocumentPage extends Component {

  componentWillMount() {
  	this.props.startDocumentDownload(this.props.match.params.docType, this.props.match.params.fileName);
  }

  render() {
    if(this.props.downloadUrl) {
      return (
            <div className="page">
              <embed src={this.props.downloadUrl} style={{ width: '100%', height: '500px'}} />
            </div>
        );
    } else {
      return(<div></div>)
    }
  }
}