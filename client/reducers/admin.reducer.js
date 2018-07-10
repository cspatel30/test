import _ from 'lodash';



let enquiryList = [

  {
     "createdOn" : "2018-03-21T14:01:51.000Z",
      "customerQuote" : null,
      "email" : "mailsanjayyadav@gmail.com",
      "endTime" : 1522261800000,
      "endTimeFmt" : "2018-03-29",
      "id" : 24,
      "imo" : "940044",
      "portId" : 7576,
      "startTime" : 1522348200000,
      "startTimeFmt" : "2018-03-30",
      "status" : "CREATED",
      "vesselName" : "Bulk Carrier",
      "vesselTypeDisplayName" : "Oil/Chemical Tanker",
      "inspectionType" : "Pre-Purchase Inspection",
      "portData" :{
          "id": [7576],
          "name": "16N RED SEA", 
          "regionCode": "AS",
          "regionName": "Asia",
          "countryName": "SAUDI ARABIA",
          "countryCode": "SA"
      },
      "client": {
          "name": "ABS Shipping",
          "id": 1
      },
      "clientMessage": "Use our reporting format",
      "assignedInspector": {
          "name": "Inspector",
          "id": 1
      },
      "adminMessage": "Use Client Report Format",
      "clientOrderAmount": "$1,150",
      "inspectorQuotationAmount": "$1,000",
      "inspectorOrderAmount": "$850",
      "enquiryQuotation": [
        {
          "id": 11,
          "no": 3,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        },
        {
          "id": 12,
          "no": 5,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        },
        {
          "id": 11,
          "no": 3,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        },
        {
          "id": 13,
          "no": 3,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        },
        {
          "id": 14,
          "no": 3,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        },
        {
          "id": 15,
          "no": 3,
          "name": "Capt. Sachin D Khaire",
          "location": "Gujarat India",
          "inspectorQuotationFp": 1000,
          "inspectorOrderAmountAfterDeduction": 850,
          "clientMarkup": "15%",
          "clientQuotation":"1150",
          "rate": "Per Hour",
          "inspectionFee": 750,
          "travelingFee": 250,
          "inspectionDuration": "1",
          "travelingDuration" : "2",
          "inspectorTotalEstimatedQuotation": "$1,250",
          "inspectorOrderAmount": "$1,062",
          "inspectorClientMarkup": "15%",
          "inspectorClientQuotation": "$1,437",
          "status": "Sent"                          
        }

      ]
  },
  {
     "createdOn" : "2018-03-21T14:01:51.000Z",
                            "customerQuote" : null,
                            "email" : "mailsanjayyadav@gmail.com",
                            "endTime" : 1522261800000,
                            "endTimeFmt" : "2018-03-29",
                            "id" : 24,
                            "imo" : "940044",
                            "portId" : 7576,
                            "startTime" : 1522348200000,
                            "startTimeFmt" : "2018-03-30",
                            "status" : "CREATED",
                            "vesselName" : "Bulk Carrier",
                            "vesselTypeDisplayName" : "Oil/Chemical Tanker",
                            "inspectionType" : "Pre-Purchase Inspection",
                            "portData" :{
                                "id": [7576],
                                "name": "16N RED SEA", 
                                "regionCode": "AS",
                                "regionName": "Asia",
                                "countryName": "SAUDI ARABIA",
                                "countryCode": "SA"
                            },
                            "client": {
                                "name": "ABS Shipping",
                                "id": 1
                            },
                            "clientMessage": "Use our reporting format",
                            "assignedInspector": {
                               "name": "Inspector",
                                "id": 1
                            },
                            "adminMessage": "Use Client Report Format",
                            "clientOrderAmount": "$1,150",
                            "inspectorQuotationAmount": "$1,000",
                            "inspectorOrderAmount": "$850",
     "enquiryQuotation": [
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 12,
                          "no": 5,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 13,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 14,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 15,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        }

                      ]
  },
  {
     "createdOn" : "2018-03-21T14:01:51.000Z",
                            "customerQuote" : null,
                            "email" : "mailsanjayyadav@gmail.com",
                            "endTime" : 1522261800000,
                            "endTimeFmt" : "2018-03-29",
                            "id" : 24,
                            "imo" : "940044",
                            "portId" : 7576,
                            "startTime" : 1522348200000,
                            "startTimeFmt" : "2018-03-30",
                            "status" : "CREATED",
                            "vesselName" : "Bulk Carrier",
                            "vesselTypeDisplayName" : "Oil/Chemical Tanker",
                            "inspectionType" : "Pre-Purchase Inspection",
                            "portData" :{
                                "id": [7576],
                                "name": "16N RED SEA", 
                                "regionCode": "AS",
                                "regionName": "Asia",
                                "countryName": "SAUDI ARABIA",
                                "countryCode": "SA"
                            },
                            "client": {
                                "name": "ABS Shipping",
                                "id": 1
                            },
                            "clientMessage": "Use our reporting format",
                            "assignedInspector": {
                               "name": "Inspector",
                                "id": 1
                            },
                            "adminMessage": "Use Client Report Format",
                            "clientOrderAmount": "$1,150",
                            "inspectorQuotationAmount": "$1,000",
                            "inspectorOrderAmount": "$850",
     "enquiryQuotation": [
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 12,
                          "no": 5,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 11,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 13,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 14,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        },
                        {
                          "id": 15,
                          "no": 3,
                          "name": "Capt. Sachin D Khaire",
                          "location": "Gujarat India",
                          "inspectorQuotationFp": 1000,
                          "inspectorOrderAmountAfterDeduction": 850,
                          "clientMarkup": "15%",
                          "clientQuotation":"1150",
                          "rate": "Per Hour",
                          "inspectionFee": 750,
                          "travelingFee": 250,
                          "inspectionDuration": "1",
                          "travelingDuration" : "2",
                          "inspectorTotalEstimatedQuotation": "$1,250",
                          "inspectorOrderAmount": "$1,062",
                          "inspectorClientMarkup": "15%",
                          "inspectorClientQuotation": "$1,437",
                          "status": "Sent"                          
                        }

                      ]
  }
];


let adminOrderList = [
                        {
                            "createdOn" : "2018-03-21T14:01:51.000Z",
                            "customerQuote" : null,
                            "email" : "mailsanjayyadav@gmail.com",
                            "endTime" : 1522261800000,
                            "endTimeFmt" : "2018-03-29",
                            "id" : 24,
                            "imo" : "940044",
                            "portId" : 7576,
                            "startTime" : 1522348200000,
                            "startTimeFmt" : "2018-03-30",
                            "status" : "CREATED",
                            "vesselName" : "Bulk Carrier",
                            "vesselTypeDisplayName" : "Oil/Chemical Tanker",
                            "inspectionType" : "Pre-Purchase Inspection",
                            "portData" :{
                                "id": [7576],
                                "name": "16N RED SEA", 
                                "regionCode": "AS",
                                "regionName": "Asia",
                                "countryName": "SAUDI ARABIA",
                                "countryCode": "SA"
                            },
                            "client": {
                                "name": "ABS Shipping",
                                "id": 1
                            },
                            "clientMessage": "Use our reporting format",
                            "assignedInspector": {
                               "name": "Inspector",
                                "id": 1
                            },
                            "adminMessage": "Use Client Report Format",
                            "clientOrderAmount": "$1,150",
                            "inspectorQuotationAmount": "$1,000",
                            "inspectorOrderAmount": "$850"
                        },
                        {
                            "createdOn" : "2018-03-21T14:01:51.000Z",
                            "customerQuote" : null,
                            "email" : "mailsanjayyadav@gmail.com",
                            "endTime" : 1522261800000,
                            "endTimeFmt" : "2018-03-29",
                            "id" : 25,
                            "imo" : "940044",
                            "portId" : 7576,
                            "startTime" : 1522348200000,
                            "startTimeFmt" : "2018-03-30",
                            "status" : "CANCELLED",
                            "vesselName" : "Bulk Carrier",
                            "vesselTypeDisplayName" : "Oil/Chemical Tanker",
                            "inspectionType" : "Pre-Purchase Inspection",
                            "portData" :{
                                "id": [7576],
                                "name": "16N RED SEA", 
                                "regionCode": "AS",
                                "regionName": "Asia",
                                "countryName": "SAUDI ARABIA",
                                "countryCode": "SA"
                            },
                            "client": {
                                "name": "ABS Shipping",
                                "id": 1
                            },
                            "clientMessage": "Use our reporting format",
                            "assignedInspector": {
                               "name": "Inspector",
                                "id": 1
                            },
                            "adminMessage": "Use Client Report Format",
                            "clientOrderAmount": "$1,000",
                            "inspectorOrderAmount": "$850"
                        }
                ];

const initialState = {
  userProfile: '', 
  enquiryMarkup: '',
  adminEnquiryList: enquiryList,
  adminOrderList: adminOrderList
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'USER_PROFILE':
      return _.assign({}, state, { userProfile: action.payload });
    case 'ENQUIRY_MARKUP':
    return _.assign({}, state, { enquiryMarkup: action.payload });  
    case 'ADMIN_ENQUIRY_LIST': console.log("set ADMIN_ENQUIRY_LIST action payload", enquiryList);
    return _.assign({}, state, { adminEnquiryList: enquiryList });  
    case 'ADMIN_ORDER_LIST': 
    return _.assign({}, state, { adminOrderList: adminOrderList });  
    default:
      return state;
  }
};
