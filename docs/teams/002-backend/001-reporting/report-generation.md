---
title: Report Generation 
# sidebar_position: 1
slug: reportgen
author: Ekam Singh
---
---

## Report generation flow

- First, one has to hit a request on the server using postman via the below requests:
- If you are generating a report on your local system use: **localhost:8080/getReport**
  
  - If you are generating a report via a production server, the request varies from server to server and you would need that particular request from the devops team.
  
  - Parameters used in the request are:
    1. scheduler: boolean; must be true
    2. startDate: string; denotes the starting date from which data has to be fetched.
    3. endDate: string; denotes the ending date till which data has to be fetched.
    4. worksheetName: array; contains the name of the sheet for data has to be fetched ( multiple sheets are in a single report, there can be 2 report scenarios: one sheetName which represents the whole report or one sheetName which represents only one sheet out of all the sheets in a report).
    5. emailId: string; mail address on which the report will be mailed.
       - **Sample request: localhost:8080/getReport?scheduler=true&worksheetName[0]=MNP Flow Report&worksheetName[1]=Node Level Report&startDate=2021-06-22T18:30:00.000Z&endDate=2021-06-23T18:30:00.000Z**
    6. frequency (optional): used to generate reports with cumulative data (Note: this feature is valid only in few reports that have numerical data). Possible values: daily and weekly
    7. flags (optional): has 2 values makeZip and transferReport. makeZip flag controls whether to zip the report generated and transferReport controls the feature to send the report generated over to a predefined server of a brand.
  
- Then, the request goes onto a route '/getReport' defined in routes/index.js in OCS
  
- After, in this route, a check is done to see if reportfunction ( handles all the report generation and mailing ) named **mainReportFunction** is defined in brandFiles or not: if yes then it is called else basic reportFunction in ocs is invoked.
  
- Once inside mainReportFunction, specific files are called depending on the value of elements in the worksheetName array, for example, if there is 'MNP Flow Report' defined in worksheetName array, file specific to 'MNP Flow Report' is invoked. ( Note: there are different files for different reports )
  
- Basically, a file for a report has the major objective of fetching data from the database ( each report has a separate file for queries which is written in a second folder named 'Chat' ), data manipulation according to the report requirements, and then writing the final data into an excel sheet using Exceljs library.
  
- Once the writing process for the report is complete, the report is delivered via mail using the mail mentioned in emailId of the request.
