CREATE TABLE `user` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,

  `company` varchar(255) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,

  `building` varchar(45) DEFAULT NULL,
  `street` varchar(45) DEFAULT NULL,
  `city` varchar(45) DEFAULT NULL,
  `country` varchar(45) DEFAULT NULL,
  
  `type` varchar(45) NOT NULL,
  `status` varchar(45) NOT NULL,
  `approved_client` int(1) NOT NULL DEFAULT 0,

  `registered_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE KEY `email_idx` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


CREATE TABLE `inspector_profile` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  
  `profile_pic` varchar(255) DEFAULT NULL,
  `passport` varchar(255) DEFAULT NULL,
  `dob` datetime DEFAULT NULL,
  `nationality` varchar(255) DEFAULT NULL,
  `valid_medical_insurance` int(1) DEFAULT 0,
  `valid_indemnity_insurance` int(1) DEFAULT 0,
  `valid_employment_medical_cert` int(1) DEFAULT 0,
  
  `seaport` varchar(45) DEFAULT NULL,

  `position` varchar(45) DEFAULT NULL,
  `qualification` varchar(45) DEFAULT NULL,

  `skills` text DEFAULT NULL,

  `background` longtext DEFAULT NULL,
  `covered_area` varchar(255) DEFAULT NULL,
  
  `highest_rank_onboard` varchar(255) DEFAULT NULL,
  `highest_rank_ashore` varchar(255) DEFAULT NULL,
  `experience_yrs` int(5) DEFAULT NULL,
  `approved_vessel_types` text DEFAULT NULL,
  `approved_inspection_types` text DEFAULT NULL,
  `total_inspection_done` int(5) DEFAULT NULL,

  `passport_doc` varchar(255) DEFAULT NULL,
  `seaman_book_doc` varchar(255) DEFAULT NULL,
  `qualification_doc` varchar(255) DEFAULT NULL,
  `shore_service_cert` varchar(255) DEFAULT NULL,
  `medical_fitness_cert` varchar(255) DEFAULT NULL, 
  `medical_insurance_doc` varchar(255) DEFAULT NULL, 
  `prof_indemnity_cert` varchar(255) DEFAULT NULL, 
  `identity_proof_doc_type` varchar(255) DEFAULT NULL, 
  `identity_proof_doc` varchar(255) DEFAULT NULL, 
  `cv_doc` varchar(255) DEFAULT NULL, 

  `rating` double(2,1) NOT NULL DEFAULT 0.0,

  PRIMARY KEY (`id`),
  UNIQUE KEY `user_idx` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `inspector_reviews` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `inspector_user_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,

  `comment` longtext NOT NULL,

  PRIMARY KEY (`id`),
  KEY `user_idx` (`user_id`),
  KEY `inspector_user_idx` (`inspector_user_id`)
  
)ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `enquiry` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `inspection_type` varchar(255) NOT NULL,
  `vessel_name` varchar(255) DEFAULT NULL,
  `imo_number` varchar(255) NOT NULL,
  `vessel_type` varchar(255) NOT NULL,
  `port_id` int(11) NOT NULL,
  `customer_quote_amount` double(12,2) DEFAULT NULL,
  `inspector_quote_amount` double(12,2) DEFAULT NULL,

  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,

  `status` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `email_idx` (`email`),
  KEY `user_idx` (`user_id`)

) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `enquiry_inspector_mapping` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `enquiry_id` bigint(20) NOT NULL,
  `inspector_user_id` bigint(20) NOT NULL,
  `status` varchar(15) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  KEY `enquiry_idx` (`enquiry_id`),
  KEY `inspector_user_idx` (`inspector_user_id`),
  KEY `status_idx` (`status`)

) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

CREATE TABLE `customer_order` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) NOT NULL,
  `email` varchar(255) NOT NULL,
  `inspection_type` varchar(255) NOT NULL,
  `vessel_name` varchar(255) DEFAULT NULL,
  `imo_number` varchar(255) NOT NULL,
  `vessel_type` varchar(255) NOT NULL,
  `port_id` int(11) NOT NULL,
  `user_quote_amount` double(12,2) DEFAULT NULL,

  `start_time` datetime NOT NULL,
  `end_time` datetime NOT NULL,

  `inspector_id` bigint(20) NOT NULL,
  `inspector_quote_amount` double(12,2) DEFAULT NULL,

  `payment_status` varchar(255) DEFAULT NULL,
  `enquiry_id` bigint(20) NOT NULL,
  `report_doc_url` varchar(255) DEFAULT NULL,

  `status` varchar(45) NOT NULL,
  `created_on` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,

  PRIMARY KEY (`id`),
  UNIQUE KEY `enquiry_idx` (`enquiry_id`),
  KEY `user_idx` (`user_id`),
  KEY `inspector_idx` (`inspector_id`)


) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;


CREATE TABLE `port` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `un_code` varchar(45) NOT NULL,
  `name` varchar(255) NOT NULL,
  `lat` varchar(45) NOT NULL,
  `lng` varchar(45) NOT NULL,
  `country_code` varchar(45) NOT NULL,
  `country_name` varchar(255) NOT NULL,
  `region_code` varchar(255) DEFAULT NULL,
  `region_name` varchar(255) NOT NULL,
  `tz_code` varchar(45) NOT NULL,
  `std_offset` varchar(45) NOT NULL,
  `dst_offset` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  `area` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `un_code_idx` (`un_code`),
  KEY `region_idx` (`region_code`),
  KEY `country_idx` (`country_code`),
  KEY `location_idx` (`lat`,`lng`)
) ENGINE=InnoDB AUTO_INCREMENT=15372 DEFAULT CHARSET=latin1;

CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `code` char(2) NOT NULL COMMENT 'Two-letter country code (ISO 3166-1 alpha-2)',
  `name` varchar(64) NOT NULL COMMENT 'English country name',
  `full_name` varchar(128) NOT NULL COMMENT 'Full English country name',
  `iso3` char(3) NOT NULL COMMENT 'Three-letter country code (ISO 3166-1 alpha-3)',
  `number` smallint(3) unsigned zerofill NOT NULL COMMENT 'Three-digit country number (ISO 3166-1 numeric)',
  `continent_code` char(2) NOT NULL,
  `phonecode` varchar(5) NOT NULL,

  PRIMARY KEY (`id`),
  UNIQUE KEY `idx_code` (`code`) USING BTREE,
  KEY `idx_continent_code` (`continent_code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 ROW_FORMAT=COMPACT;