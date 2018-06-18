import { connect } from 'react-redux'

import DocumentDownloadPage from '../components/pages/DocumentDownloadPage.jsx';
import { downloadDocument } from '../actions/inspector';

const mapStateToProps = (state) => {
	const {downloadUrl} = state;
  	return  {downloadUrl};
}

const mapDispatchToProps = (dispatch) => {
	return {
		startDocumentDownload: (docType, fileName) => {
       		dispatch(downloadDocument(docType, fileName));
    	}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(DocumentDownloadPage);