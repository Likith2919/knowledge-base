---
title: Kibana Logs
sidebar_position: 6
slug: Kibana Logs
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to use handleAppError function to export logs to elasticSearch so that we can visualise the data on Kibana.

- **Example Usecase** :
    ```javascript
    let metadata = { agentPsid: psid, adminIP: agentIP };  
    let err = { name: 'Logger', message: 'Agent Kpis', description: 'Agent Lifecycle Logs' };  
    handleAppError({ err, metadata, scope: 'agentKpi', ship: true });
    ```

- **Note**:
    - The handleAppError function can be used in various cases like: Inside catch to get hold of the error, In order to find the flow of a particular function.
    - The metadata is any important data that needs to be exported to elasticSearch for future references. We can add any number of fields inside metadata.
    - The err object has some conventions attached with it.
        - name is generally kept as 'Logger'.
        - message is the details about the code section that needs to be logged. Like: 'Agent Kpis if condition', 'Agent Kpis else condition'
        - description serves a bigger purpose. This is useful in the case when we want to group certain logs together under a heading. For example:  
        'Agent Lifecycle Logs' - for agent activities
        'Client Lifecycle Logs' - for client activities
        'Report Errors' - for report errors.
    - handleAppError object contains 
        - err object
        - metadata object
        - scope - Generally the function name or the event name in which this handleAppError is written
        - ship - true/false (If it is true, the log will be exported. If its false, the log will not be exported)