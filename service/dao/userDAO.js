var db = require('../mysql/db');
var moment = require('moment');
require('../constants');
var countryDAO = require('../dao/countryDAO');

const inspectorStringFields = ['profilePic', 'qualification', 'position', 'passportNumber', 'nationality', 'skillsKeys', 'background', 'highestRankOnboard',
                                'highestRankAshore', 'cvDoc', 'passportDoc', 'seamanBookDoc', 'qualificationDoc', 'medicalInsuranceDoc',
                                'shoreServiceCert', 'medicalFitnessDoc', 'profIndemnityCert', 'identityProofDoc', 'idProofDocType',
                                'coveredAreasKeys', 'approvedVesselTypesKeys', 'approvedInspectionTypesKeys'];

const inspectorNumberFields = ['userId', 'seaport', 'totalInspections', 'experienceYears'];
const inspectorDateFields = ['dob'];
const inspectorBooleanFields = ['validMedicalInsurance', 'validIndemnityInsurance', 'validEmploymentMedicalCert'];

const inspectorEntryToEntityFieldMapping = {
  userId: 'user_id',
  seaport: 'seaport',
  profilePic: 'profile_pic',
  qualification: 'qualification',
  position: 'position',
  passportNumber: 'passport',
  dob: 'dob',
  nationality: 'nationality',
  validMedicalInsurance: 'valid_medical_insurance',
  validIndemnityInsurance: 'valid_indemnity_insurance',
  validEmploymentMedicalCert : 'valid_employment_medical_cert',
  skillsKeys: 'skills',
  approvedVesselTypesKeys: 'approved_vessel_types',
  approvedInspectionTypesKeys: 'approved_inspection_types',
  coveredAreasKeys: 'covered_area',
  background: 'background',
  highestRankOnboard: 'highest_rank_onboard',
  highestRankAshore: 'highest_rank_ashore',
  experienceYears: 'experience_yrs',
  totalInspections: 'total_inspection_done',
  cvDoc: 'cv_doc',
  rating: 'rating',
  passportDoc: 'passport_doc',
  seamanBookDoc: 'seaman_book_doc',
  qualificationDoc: 'qualification_doc',
  medicalInsuranceDoc: 'medical_insurance_doc',
  shoreServiceCert: 'shore_service_cert',
  medicalFitnessDoc: 'medical_fitness_cert',
  profIndemnityCert: 'prof_indemnity_cert',
  idProofDocType: 'identity_proof_doc_type',
  identityProofDoc: 'identity_proof_doc',
  cvDoc: 'cv_doc'
}

const userEntryToEntityFieldMapping = {
  id: 'id',
  name: 'name',
  email: 'email',
  type: 'type',
  company: 'company',
  phone: 'phone',
  building: 'building',
  street: 'street',
  city: 'city',
  countryCode: 'country',
  status: 'status',
  registeredOn: 'registered_on',
  passportName: 'passport_name',
  residenceAddress: 'address',
  nearestAirport: 'nearest_airport'
}

const userStringFields = ['nearestAirport', 'passportName', 'residenceAddress', 'name', 'email', 'type', 'company', 'phone', 'building', 'street', 'city', 'countryCode', 'status'];
const userNumberFields = ['id'];
const userDateFields = ['registeredOn'];

const educationEntryToEntityFieldMapping = {
  id: 'id',
  userId: 'user_id',
  inspectorId: 'inspector_id',
  level: 'level',
  courseName: 'course_name',
  institution: 'institution',
  country: 'country',
  startDate: 'start_date',
  endDate: 'end_date'
}

const educationStringFields = ['level', 'courseName', 'institution', 'country'];
const educationNumberFields = ['id', 'userId', 'inspectorId'];
const educationDateFields = ['startDate', 'endDate'];

const employmentEntryToEntityFieldMapping = {
  id: 'id',
  userId: 'user_id',
  inspectorId: 'inspector_id',
  jobTitle: 'job_title',
  companyName: 'company_name',
  shipType: 'ship_type',
  department: 'department',
  city: 'city',
  country: 'country',
  startDate: 'start_date',
  endDate: 'end_date'
}

const employmentStringFields = ['jobTitle', 'companyName', 'shipType', 'department', 'city', 'country'];
const employmentNumberFields = ['id', 'userId', 'inspectorId'];
const employmentDateFields = ['startDate', 'endDate'];


function signup(payload) {

  payload['status'] = 'CREATED';
  payload['registeredOn'] = Date.now();

  console.log("Sign up user with req ", payload);

  var keys = [];
  var values = [];
  Object.keys(userEntryToEntityFieldMapping).map((key) => {
    if(payload[key] && payload[key] !== "") {
      keys.push(userEntryToEntityFieldMapping[key]);
      if(userStringFields.includes(key)) {
        if(payload[key].trim() !== "")
          values.push(payload[key].trim());
      } else  if(userNumberFields.includes(key)) {
        values.push(parseInt(payload[key].trim()));
      } else if (userDateFields.includes(key)) {
        values.push(moment(payload[key]).format("YYYY-MM-DD HH:mm:ss"));
      }
    }
  });
  keys.push('password');
  values.push(payload.password);

  return db.mysql_insert_query("insert into user ("+keys.join(", ")+") values ? ", [values]);
}

function update_user_profile(userId, payload) {
  var setOps = [];

  Object.keys(userEntryToEntityFieldMapping).map((key) => {
    if(payload[key] && payload[key] !== "" && key !== "id") {
      if(userNumberFields.includes(key)) {
        setOps.push(userEntryToEntityFieldMapping[key]+" = "+ parseInt(payload[key]));
      } else if (userDateFields.includes(key)) {
        setOps.push(userEntryToEntityFieldMapping[key]+" = '"+moment(payload[key]).format("YYYY-MM-DD HH:mm:ss")+"'");
      } else if (userStringFields.includes(key)) {
        if(payload[key].trim() !== "")
          setOps.push(userEntryToEntityFieldMapping[key]+" = '"+payload[key]+"'");
      }
    }
  });

  if(payload.password && payload.password.trim() !== "") {
    setOps.push("password = '"+payload['password']+"'");
  }

  if(setOps.length > 0) {
    var updateQuery = "UPDATE user SET "+ setOps.join(",") +" WHERE id = "+ userId;
    console.log("Run user update query = ", updateQuery);
    return db.mysql_update_query(updateQuery);
  }

  return new Promise(function(resolve, reject) { resolve(true) });
}

function signup_inspector(userId, payload) {
  return db.mysql_insert_query("insert into inspector_profile (user_id, seaport, position, qualification ) VALUES ? ",
            [[userId, payload.seaport, payload.position, payload.qualification]]);
}

function update_inspector_profile(userId, payload) {
  var setOps = [];
  console.log(payload);
  Object.keys(inspectorEntryToEntityFieldMapping).map((key) => {
    if(payload[key] && payload[key] !== "") {
      if(inspectorNumberFields.includes(key)) {
        setOps.push(inspectorEntryToEntityFieldMapping[key]+" = "+ parseInt(payload[key]));
      } else if (inspectorDateFields.includes(key)) {
        setOps.push(inspectorEntryToEntityFieldMapping[key]+" = '"+moment(payload[key]).format("YYYY-MM-DD HH:mm:ss")+"'");
      } else if (inspectorBooleanFields.includes(key)) {
        setOps.push(inspectorEntryToEntityFieldMapping[key]+" = "+ parseInt(payload[key]));
      } else if(inspectorStringFields.includes(key)) {
        if(payload[key].trim() !== "")
          setOps.push(inspectorEntryToEntityFieldMapping[key]+" = '"+payload[key].trim()+"'");
      }
    }
  });

  if(setOps.length > 0) {
    var updateQuery = "UPDATE inspector_profile SET "+ setOps.join(",") +" WHERE user_id = "+ userId;
    console.log("Run inspector update query = ", updateQuery);
    return db.mysql_update_query(updateQuery);
  }

  return new Promise(function(resolve, reject) { resolve(true) });
}

function update_inspector_education(payload) {
  var setOps = [];
  console.log(payload);
  if(payload && payload.length > 0) {
    for(var i=0; i<payload.length; i++) {
      var id = payload[i]['id'];
      if(!id || id == "") {
        insert_inspector_education(payload[i]);
      } else {
        Object.keys(educationEntryToEntityFieldMapping).map((key) => {
          if(payload[i][key] && payload[i][key] !== "") {
            if(educationNumberFields.includes(key)) {
              setOps.push(educationEntryToEntityFieldMapping[key]+" = "+ parseInt(payload[i][key]));
            } else if (educationDateFields.includes(key)) {
              setOps.push(educationEntryToEntityFieldMapping[key]+" = '"+moment(payload[i][key]).format("YYYY-MM-DD HH:mm:ss")+"'");
            } else if(educationStringFields.includes(key)) {
              if(payload[i][key].trim() !== "")
                setOps.push(educationEntryToEntityFieldMapping[key]+" = '"+payload[i][key].trim()+"'");
            }
          }
        });

        if(setOps.length > 0) {
          var updateQuery = "UPDATE inspector_education_qualification SET "+ setOps.join(",") +" WHERE id = "+ id;
          console.log("Run inspector update query = ", updateQuery);
          db.mysql_update_query(updateQuery);
        }
      }
    }
    return true;
  } else {
    return false;
  }
  return new Promise(function(resolve, reject) { resolve(true) });
}

function insert_inspector_education(payload) {
  console.log("inspector payload ", payload);

  var keys = [];
  var values = [];
  Object.keys(educationEntryToEntityFieldMapping).map((key) => {
    if(payload[key] && payload[key] !== "") {
      keys.push(educationEntryToEntityFieldMapping[key]);
      if(educationStringFields.includes(key)) {
        if(payload[key].trim() !== "")
          values.push(payload[key].trim());
      } else if(educationNumberFields.includes(key)) {
        values.push(parseInt(payload[key]));
      } else if (educationDateFields.includes(key)) {
        values.push(moment(payload[key]).format("YYYY-MM-DD HH:mm:ss"));
      }
    }
  });
  return db.mysql_insert_query("insert into inspector_education_qualification ("+keys.join(", ")+") values ? ", [values]);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function update_inspector_employment(payload) {
  var setOps = [];
  console.log(payload);
  if(payload && payload.length > 0) {
    for(var i=0; i<payload.length; i++) {
      var id = payload[i]['id'];
      if(!id || id == "") {
        insert_inspector_employment(payload[i]);
      } else {
        Object.keys(employmentEntryToEntityFieldMapping).map((key) => {
          if(payload[i][key] && payload[i][key] !== "") {
            if(employmentNumberFields.includes(key)) {
              setOps.push(employmentEntryToEntityFieldMapping[key]+" = "+ parseInt(payload[i][key]));
            } else if (employmentDateFields.includes(key)) {
              setOps.push(employmentEntryToEntityFieldMapping[key]+" = '"+moment(payload[i][key]).format("YYYY-MM-DD HH:mm:ss")+"'");
            } else if(employmentStringFields.includes(key)) {
              if(payload[i][key].trim() !== "")
                setOps.push(employmentEntryToEntityFieldMapping[key]+" = '"+payload[i][key].trim()+"'");
            }
          }
        });

        if(setOps.length > 0) {
          var updateQuery = "UPDATE inspector_employment_history SET "+ setOps.join(",") +" WHERE id = "+ id;
          console.log("Run inspector update query = ", updateQuery);
          db.mysql_update_query(updateQuery);
        }
      }
    }
    return true;
  } else {
    return false;
  }
  return new Promise(function(resolve, reject) { resolve(true) });
}

function insert_inspector_employment(payload) {
  console.log("inspector payload ", payload);

  var keys = [];
  var values = [];
  Object.keys(employmentEntryToEntityFieldMapping).map((key) => {
    if(payload[key] && payload[key] !== "") {
      keys.push(employmentEntryToEntityFieldMapping[key]);
      if(employmentStringFields.includes(key)) {
        if(payload[key].trim() !== "")
          values.push(payload[key].trim());
      } else if(employmentNumberFields.includes(key)) {
        values.push(parseInt(payload[key]));
      } else if (employmentDateFields.includes(key)) {
        values.push(moment(payload[key]).format("YYYY-MM-DD HH:mm:ss"));
      }
    }
  });
  return db.mysql_insert_query("insert into inspector_employment_history ("+keys.join(", ")+") values ? ", [values]);
  return new Promise(function(resolve, reject) { resolve(true) });
}

function login(payload) {
  return db.mysql_query("select * from user u where email = '" + payload.email + "' and type = '" + payload.userType + "'" );
}

function find_user_by_email(email) {
  return db.mysql_query("select * from user u where email = '" + email + "'");
}

function fetchUserProfile(userId) {
  return db.mysql_query('select * from user u where id = ' + userId);
}

function fetchInspectorProfile(userId) {
  return db.mysql_query('select ip.*, u.name, u.company, u.phone, u.email, u.city, u.country from inspector_profile ip, user u where ip.user_id = u.id and u.id = ' + userId);
}

function fetchInspectorPublicProfile(userId) {
  return db.mysql_query('select ip.*, u.name, u.company, u.phone, u.email, u.city, u.country, u.passport_name, u.address, u.nearest_airport from inspector_profile ip, user u where ip.user_id = u.id and u.id = ' + userId);
}

function fetchInspectorEducation(inspectorId) {
  return db.mysql_query('select * from inspector_education_qualification edu where edu.inspector_id = ' + inspectorId);
}

function fetchInspectorEmployment(inspectorId) {
  return db.mysql_query('select * from inspector_employment_history emp where emp.inspector_id = ' + inspectorId);
}

function fetchInspectors(pageNo) {
  var offset = (pageNo - 1)*5;
  return db.mysql_query('select ip.*, u.name, u.company, u.phone, u.email, u.city, u.country from inspector_profile ip, user u where ip.user_id = u.id limit '+offset+' , 5');
}

function search_inspectors(region_code, inspection_type) {
  return db.mysql_query('select ip.*, u.name, u.company, u.phone, u.email, u.city, u.country from inspector_profile ip, user u where ip.user_id = u.id');
}

function fetch_customer_enquiry_inspectors(enquiryIds) {
  var csvIds = enquiryIds.join(',');
  console.log("Fetch inspectors for enquiry ids - ", csvIds);
  return db.mysql_query("select ip.*, u.name, u.company, u.phone, u.email, u.city, u.country, eim.enquiry_id as enquiry_id from enquiry_inspector_mapping eim, inspector_profile ip, user u where eim.inspector_user_id = ip.user_id and ip.user_id = u.id and eim.status = 'ACCEPTED' and eim.enquiry_id in ("+csvIds+")");
}

async function transformUserProfile(userDTOs) {
  var profiles = [];
  if(userDTOs && userDTOs.length > 0) {
    for(var i= 0 ; i < userDTOs.length ; i++) {
      var countryData = await countryDAO.get_country_by_code(userDTOs[i]['country']);

      profiles.push({id: userDTOs[i]['id'], name: userDTOs[i]['name'], email: userDTOs[i]['email'], 'type': userDTOs[i]['type'],
                      company: userDTOs[i]['company'], phone: userDTOs[i]['phone'], city: userDTOs[i]['city'],
                      'countryCode': userDTOs[i]['country'], 'country': countryData, 'approved': userDTOs[i]['approved_client'],
                      'passportName':userDTOs[i]['passport_name'], 'residenceAddress':userDTOs[i]['address'], 'nearestAirport':userDTOs[i]['nearest_airport']});
    }
  }
  return profiles;
}

function getReverseMapping(object) {
  var reverseMapping = {};
  Object.keys(object).map((key) => {
    reverseMapping[object[key]] = key;
  });
  return reverseMapping;
}

async function transformEducation(educationDTOs) {
  var educationEntityToEntryMapping = getReverseMapping(educationEntryToEntityFieldMapping);
  var education = [];
  if(educationDTOs.length > 0) {
    for(var i = 0; i < educationDTOs.length; i++) {
      var educationRecord = {'id': educationDTOs[i]['id']};
      Object.keys(educationEntityToEntryMapping).map((key) => {
        if(educationDTOs[i][key])
          educationRecord[educationEntityToEntryMapping[key]] = educationDTOs[i][key];
      });
      education.push(educationRecord);
    }
  }
  return education;
}

async function transformEmployment(employmentDTOs) {
  var employmentEntityToEntryMapping = getReverseMapping(employmentEntryToEntityFieldMapping);
  var employment = [];
  if(employmentDTOs.length > 0) {
    for(var i = 0; i < employmentDTOs.length; i++) {
      var employmentRecord = {'id': employmentDTOs[i]['id']};
      Object.keys(employmentEntityToEntryMapping).map((key) => {
        if(employmentDTOs[i][key])
          employmentRecord[employmentEntityToEntryMapping[key]] = employmentDTOs[i][key];
      });
      employment.push(employmentRecord);
    }
  }
  return employment;
}

async function transformInspectorProfile(inspectorDTOs) {

  var inspectorEntityToEntryMapping = getReverseMapping(inspectorEntryToEntityFieldMapping);
  var userEntityToEntryMapping = getReverseMapping(userEntryToEntityFieldMapping);

  if(inspectorDTOs.length > 0) {
    var inspectors = [];

    for(var i = 0; i < inspectorDTOs.length; i++) {

      var profile = {'id': inspectorDTOs[i]['id']};
      Object.keys(inspectorEntityToEntryMapping).map((key) => {
        if(inspectorDTOs[i][key])
          profile[inspectorEntityToEntryMapping[key]] = inspectorDTOs[i][key];
      });
      Object.keys(userEntityToEntryMapping).map((key) => {
        if(inspectorDTOs[i][key])
          profile[userEntityToEntryMapping[key]] = inspectorDTOs[i][key];
      });

      /*var profile = { userId: inspectorDTOs[i]['user_id'], seaport: inspectorDTOs[i]['seaport'], profilePic: inspectorDTOs[i]['profile_pic'],
                      qualification: inspectorDTOs[i]['qualification'], position: inspectorDTOs[i]['position'],
                      qualificationDisplayName: inspectorQualifications[inspectorDTOs[i]['qualification']],
                      positionDisplayName: inspectorPositions[inspectorDTOs[i]['position']],
                      passport: inspectorDTOs[i]['passport'], dob: inspectorDTOs[i]['dob'],
                      nationality: inspectorDTOs[i]['nationality'], validMedicalInsurance: inspectorDTOs[i]['valid_medical_insurance'],
                      validIndemnityInsurance: inspectorDTOs[i]['valid_indemnity_insurance'], validEmploymentMedicalCert : inspectorDTOs[i]['valid_employment_medical_cert'],
                      skills: inspectorDTOs[i]['skills'], background: inspectorDTOs[i]['background'],
                      highestRankOnboard: inspectorDTOs[i]['highest_rank_onboard'], highestRankAshore: inspectorDTOs[i]['highest_rank_ashore'],
                      experienceYears: inspectorDTOs[i]['experience_yrs'], totalInspections: inspectorDTOs[i]['total_inspection_done'],
                      cvDoc: inspectorDTOs[i]['cv_doc'], rating: inspectorDTOs[i]['rating'],
                      name: inspectorDTOs[i]['name'], email: inspectorDTOs[i]['email'], company: inspectorDTOs[i]['company'],
                      phone: inspectorDTOs[i]['phone'], city: inspectorDTOs[i]['city'],
                      passportDoc: inspectorDTOs[i]['passport_doc'], seamanBookDoc: inspectorDTOs[i]['seaman_book_doc'],
                      qualificationDoc: inspectorDTOs[i]['qualification_doc'], medicalInsuranceDoc: inspectorDTOs[i]['medical_insurance_doc'],
                      shoreServiceCert: inspectorDTOs[i]['shore_service_cert'], medicalFitnessDoc: inspectorDTOs[i]['medical_fitness_cert'],
                      profIndemnityCert: inspectorDTOs[i]['prof_indemnity_cert'], idProofDocType: inspectorDTOs[i]['identity_proof_doc_type'],
                      identityProofDoc: inspectorDTOs[i]['identity_proof_doc'], cvDoc: inspectorDTOs[i]['cv_doc']
                    };*/

      if(profile.position) {
        profile['positionDisplayName'] = inspectorPositions[profile.position];
      }
      if(profile.qualification) {
        profile['qualificationDisplayName'] = inspectorQualifications[profile.qualification];
      }

      if(profile.approvedVesselTypesKeys) {
        var approvedVesselTypes = [];
        var vesselTypesArr = profile.approvedVesselTypesKeys.split(",");
        for(var j = 0; j < vesselTypesArr.length; j++) {
          approvedVesselTypes.push(vesselTypes[vesselTypesArr[j].trim()]);
        }
        profile['approvedVesselTypes'] = approvedVesselTypes;
      }
      if(profile.approvedInspectionTypesKeys) {
        var approvedInspectionTypes = [];
        var inspectionTypesArr = profile.approvedInspectionTypesKeys.split(",");
        for(var j = 0; j < inspectionTypesArr.length; j++) {
          approvedInspectionTypes.push(inspectionTypes[inspectionTypesArr[j].trim()]);
        }
        profile['approvedInspectionTypes'] = approvedInspectionTypes;
      }
      if(profile.coveredAreasKeys) {
        var coveredAreaArr = profile.coveredAreasKeys.split(",");
        var coveredAreas = [];
        for(var j = 0; j < coveredAreaArr.length; j++)
          coveredAreas.push(regionCodes[coveredAreaArr[j].trim()]);

        profile['coveredAreas'] = coveredAreas;
      }

      var countryData = await countryDAO.get_country_by_code(profile.countryCode);
      profile['country'] = countryData;

      var rowsEducation = await this.fetchInspectorEducation(inspectorDTOs[i]['id']);
      var education = await this.transformEducation(rowsEducation);
      var rowsEmployment = await this.fetchInspectorEmployment(inspectorDTOs[i]['id']);
      var employment = await this.transformEmployment(rowsEmployment);

      profile['education'] = education;
      profile['employment'] = employment;

      inspectors.push(profile);
    }

    return inspectors;
  } else {
    return null;
  }
}

module.exports = {
  signup: signup,
  signup_inspector: signup_inspector,
  update_inspector_profile, update_inspector_profile,
  update_user_profile: update_user_profile,
  login: login,
  find_user_by_email: find_user_by_email,
  fetchUserProfile: fetchUserProfile,
  fetchInspectorProfile: fetchInspectorProfile,
  fetchInspectorPublicProfile: fetchInspectorPublicProfile,
  fetchInspectors: fetchInspectors,
  search_inspectors: search_inspectors,
  fetch_customer_enquiry_inspectors: fetch_customer_enquiry_inspectors,
  transformInspectorProfile: transformInspectorProfile,
  transformUserProfile: transformUserProfile,
  fetchInspectorEducation: fetchInspectorEducation,
  fetchInspectorEmployment: fetchInspectorEmployment,
  transformEducation: transformEducation,
  transformEmployment: transformEmployment,
  update_inspector_education : update_inspector_education,
  insert_inspector_education : insert_inspector_education,
  insert_inspector_employment : insert_inspector_employment,
  update_inspector_employment : update_inspector_employment
}
