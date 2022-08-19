---
title: Auto Generate Collection 
sidebar_position: 1
slug: autoGen
author: Ekam Singh
---
---

## Report Auto Generation

Instead of sending reports manually, we have a collection **autogeneratereports** which automatically schedules reports for a particular time. For instance, if we would like to send MIS report at 4 am in the morning we add it to this collection.

### Autogeneratereports Collection

This collection fields are as follows:

  1. name of brand of which the report is part of.
  2. env of the server - dev/uat/prod.
  3. generate_reports: boolean; true means that reports have to generated for this brand and env, false means we dont need to generate reports.
  4. reports: array; it contains details of all the reports which needs to be generated. Details such as:
     - reportName : { key : Name of the report, worksheetName : [ all sheets of this report that needs to be generated ] }
     - frequency: { key : (how many times do we need to generated the report) daily/weekly/monthly, value : [cronJob](https://www.npmjs.com/package/node-schedule)}
     - mails: list of all mailIds who would recieve this report.
     - flags object: has 2 values makeZip and transferReport. makeZip flag controls whether to zip the report generated and transferReport controls the feature to send the report generated over to a predefined server of a brand.

### Flow

Along with production OCS, we also have a production scheduler that is up 24*7. Whenever the time matches a report's cronJob, the scheduler hits a request to the OCS, and then the report is generated in the same way it gets generated when we hit request using postman. The only difference in this request is that the startDate and endDate parameters are calculated on the basis of frequency-key. For example, if the frequency is daily; startDate would be the start of the day and endDate would be the end of the day, for weekly, we will get start and end of the week and similarly for month.
