---
title: DB dependent report generation
# sidebar_position: 1
slug: dbSupport
author: Ekam Singh
---
---

## Database dependent report generation

There are many features in various report generation that are controlled using values present in the database. These are as follows:

   1. **brandspecificied** collection controls different aspects of the report generation (Note: these field values would affect all of the reports for a brand) such as :-
      - allowedChannels - it is a field in the documents of the collection which controls what all are the allowed channels whose data are to be included in the reports, for example, channel values can be whatsapp, ios, android, gbm, and website.
      - chatbotdump and channeldumpflag - these flags control should all the channel's dump data should be in one sheet or in multiple sheets. True would mean data should be present in one sheet and False would mean data would be written in multiple sheets.
  
   2. **autogenerate** collection (discussed in autogen section) have various values that can used to add certain features while generating reports, such as :-
      - every report object has a flags object, in which there are two flags values, makeZip and transferReport. makeZip flag controls whether to zip the report generated and transferReport controls the feature to send the report generated over to a predefined server of a brand.
  