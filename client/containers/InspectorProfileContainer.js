import { connect } from 'react-redux'
// import InspectorProfilePage from '../components/pages/InspectorProfilePage.jsx';
import InspectorProfilePage from '../components/pages/InspectorProfilePage1.jsx';

import { getProfile, uploadDocument, updateInspectorProfile, deleteEducationItem, deleteEmploymentItem } from '../actions/inspector';
import { getFeebackByOrderId } from '../actions/order';

const mapStateToProps = (state) => {
	const { userProfile, inspectorProfile, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications, 
    inspectorSkills, inspectorTitles, region, inspectorLevel, regionCodes, inspectionTypes, profileUpdateSuccess, feedbackbyOrderId } = state;
    return { userProfile, inspectorProfile, error, ports, countries, vesselTypes, inspectorPositions, inspectorQualifications,
      inspectorSkills, inspectorTitles, region, inspectorLevel, 
      regionCodes, inspectionTypes, profileUpdateSuccess, feedbackbyOrderId};
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
      getFeebackByOrderId: (orderId) => {
        dispatch(getFeebackByOrderId(orderId));
      },

      saveProfile: (inspectorProfile) => {
        dispatch(updateInspectorProfile(inspectorProfile));
      },

      deleteRecord: (arrName, id) => {
        if (arrName === 'education') {
          dispatch(deleteEducationItem(id));
        } else {
          dispatch(deleteEmploymentItem(id));
        }
      }
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(InspectorProfilePage);