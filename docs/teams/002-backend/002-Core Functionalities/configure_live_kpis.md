---
title: Configure Live KPIs
sidebar_position: 3
slug: configure_live_kpis
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to configure the Live KPIs in Chat page on Dashboard at brand level. As for different brands, all the KPI figures won't be required on Chats page. This is done to send only the required figures.

- **Field in BrandSpecifiedValues** :
    ```javascript	
	"configureLiveKPIs" : {
		"SEND_LOGIN_HOURS" : true,
		"SEND_BREAK_TIME" : true,
		"SEND_ACHT" : true,
		"SEND_LTR" : true,
		"SEND_ASAT" : true,
		"SEND_FTF" : false,
		"SEND_SL" : true
	}
	```

- **Note**:
    - If the key configureLiveKPIs is not present in the database in Brand Specified Values collection in the required document, all the fields will be shown.
    - If the key configureLiveKPIs is an empty object, all the fields will be shown by default.
    - In order to not show a field, its necessary to set the field value as false. For eg: SEND_FTF" : false.
    - If a field (among these 7), is not present in the object, it will be shown as the default value is taken as true in code.