global.inspectionTypes = {
  "VPPI" : "Vessel Pre-purchase Inspection",
  "VCA": "Vessel Condition Assessment",
  "DDM": "Dry-Dock Management",
  "SOI": "Ship Owner Inspection",
  "PCI": "Pre-Charter Inspection",
  "RS": "Repair Supervision",
  "PVI": "Pre-Vetting Inspection",
  "ISMIA": "ISM Internal Audit",
  "ISMTI": "ISM Technical Inspection",
  "CS": "Cargo Survey",
  "DS": "Damage Survey",
  "WS": "Warranty Survey",
  "PICI": "P&I Condition Inspection",
  "BS": "Bunker Survey",
  "OHCS": "On Hire & Off-hire Condition Survey",
  "RDI": "Re-delivery Inspection" 
};

global.vesselTypes = {
  "LNG": "LNG Carrier" ,
  "LPG": "LPG Carrier" ,
  "CHEM_TANK": "Chemical Tanker" ,
  "OIL_TANK": "Oil Tanker" ,
  "PROD_TANK": "Products Tanker" ,
  "BULK_CAR": "Bulk Carrier" ,
  "OBO_CAR": "Ore Bulk Carrier (OBO)" ,
  "SELF_DIS": "Self Discharging" ,
  "BULK_DRY": "Bulk Dry" ,
  "MPP": "Other Bulk - Multipurpose (MPP or MPV)" ,
  "GEN_CAR": "General Cargo" ,
  "P/G_CAR": "Passenger/General Cargo" ,
  "CONTAINERSHIP": "Containership" ,
  "REEFER": "Refrigerated (Reefer) Cargo Ship" ,
  "CAR_RR_CAR": "Car Carrier / Ro-Ro Cargo" ,
  "P_RR_CAR": "Passenger/Ro-Ro Cargo" ,
  "PASS_SHIP": "Passenger Ship / Ferry / Cruise" ,
  "OTH_DRY_CAR": "Other Dry Cargo" ,
  "OSV_PSV": "Offshore/Platform Supply Vessel (OSV/PSV)" ,
  "ANCHOR": "Anchor Handler" ,
  "RES_VESSEL": "Research Vessel" ,
  "TUG": "Tug" ,
  "DREDGER": "Dredger" ,
  "IN_WAT_TANK": "Inland Waterways Tanker" ,
  "IN_WAT_DRY_CAR": "Inland Waterways Dry Cargo" ,
  "NON_PROP": "Non Propelled" ,
  "OIL_SPLILL_RV": "Oil Spill Recovery Vessels"                   
};

global.inspectorPositions = {
    "TECH_SI": "Technical Superintendent",
    "MARINE_SI": "Marine Superintendent",
    "PORT_CAPTAIN": "Port Captain" ,
    "CARGO_SURVERYOR": "Cargo Surveyor",
    "SITE_MANAGER": "Site Manager",
    "SHIP_OWNER_REP": "Ship Owner Representative",
    "BANK_SURVEYOR": "Bunker Surveyor ",
    "P&I INSPECTOR": "P&I Inspector",
    "OTHERS": "Others"
};

global.inspectorQualifications = {
  "CHIEF_MARINE_ENGG": "Chief Marine Engineer",
  "MASTER_MARINER": "Master Mariner",
  "SENIOR_MARINE_ENGG": "Senior Marine Engineer",
  "CHIEF_MATE": "Chief Mate",
  "GRAD_NAVAL_ARCH": "Graduate Naval Architect",
  "GRAD_ELEC_ENGG": "Graduate Electrical Engineer",
  "CERT_MARINE_SURVEYOR": "Certified Marine Surveyor",
  "OTHERS": "Others"
};

global.regionCodes = {
  "AF": "Africa",
  "AN": "Antarctica",
  "AS": "Asia",
  "EU": "Europe",
  "NA": "North America",
  "OC": "Oceania",
  "SA": "South America"
};

global.mysqlConfig = {
  host: "localhost",
  user: "root",
  password: "",
  database: "shipinspector"
};

global.appConfig = {
  emailTemplatesPath : '/Users/m00265/code/node/shipinspector-web/service/emailtemplates/',
  accessKeyId: 'AKIAIFENAUAFOPXUTNQQ',
  secretAccessKey: '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',
  defaultFrom: 'Team ShipInspector <noreply@shipinspectors.com>',
  serverHost: 'http://localhost:7100'
}

