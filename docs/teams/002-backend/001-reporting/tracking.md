---
title: Report Tracking
# sidebar_position: 1
slug: tracking
author: Ekam Singh
---
---

## Report Tracking

As plenty of reports are sent over mail and a lack of efficient method to properly track reports. This feature aids us to debug reports in time effective manner.

For report generation there are 2 important steps:

  1. Fetching data from database and then writing it into an excel sheet.
  2. Mailing the report.

Only if both the steps is successful it means that the report was sent successfully, if even one of them fails report sending is deemed a failure.

For report tracking, there is a separate collection **TrackingReports**, in which we store:

   1. Name of the report.
   2. Completed: boolean value; it denotes if the sending of the report was a success or a failure.
   3. Cycle: array; stores start and end time of all the steps of the report generation.
   4. Error (if present).

For all the reports having the value of completed as false our reporting team receives the name of the reports in a mail.
