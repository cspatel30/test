import { connect } from 'react-redux'
// import InspectorProfilePage from '../components/pages/InspectorProfilePage.jsx';
import InspectorProfilePage from '../components/pages/InspectorProfilePage1.jsx';

import { getProfile, uploadDocument, updateInspectorProfile } from '../actions/inspector';


const mapStateToProps = (state) => {
	const { userProfile, inspectorProfile, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, 
    regionCodes, inspectionTypes, profileUpdateSuccess } = state;
  	return { userProfile, inspectorProfile, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, 
      regionCodes, inspectionTypes, profileUpdateSuccess};
}

const mapDispatchToProps = (dispatch) => {
	return {
		getProfile: () => {
       		dispatch(getProfile());
    	},
    	handleFileUpload: (userId, bucket, folder, file) => {
        var re = /(?:\.([^.]+))?$/;
        var ext = re.exec(file.name)[1]; 
        console.log("ext = ", ext);
        if(!ext || !['jpg', 'jpeg', 'png', 'pdf', 'xls', 'xlsx'].includes(ext) ) {
          return "File has invalid extension. Please upload png/jpg/jpeg";
        }

    		dispatch(uploadDocument(bucket, folder, userId+"."+ext, file));
        
    	},

      saveProfile: (inspectorProfile) => {
        dispatch(updateInspectorProfile(inspectorProfile));
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorProfilePage);