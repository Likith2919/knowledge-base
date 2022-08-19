---
title: SalesBot Creation
sidebar_position: 1
slug: salesbot_Creation
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers the apis to create ContentMap, Intents, Utterances, AbResponses in bulk using .xlsx file.

**Conditions for data** :
- contentmap sheet
    -  Column names: S.No, intent, category, shortName, useInSuggestion
    -  Each category should also have a row in the knowledge sheet with intent = category.
    -  In case of multiple short names, shortName values should be separated by a comma.


- intents sheet
    - Column names: S.No, intent, Utterance 1, Utterance 2, Utterance 3 and so on.

- messages sheet
    - Column names: S.No, intent, Response 1, Response 2, Response 3 and so on.

- **Note**: intent names should be same in all three sheets.

**APIs**

1.  Create Sales bot (To do all the process using single API):

    - Endpoint - /admin/v1/createSalesBot
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form- data
            - Key- file1  
            Value- .xlsx file (contentmap sheet)   
            - Key- file2  
            Value- .xlsx file (intents sheet)  
            - Key- file3  
            Value- .xlsx file (messages sheet)
    - Response - Doesn't return any response since it takes very long to create the intents and utterances. Response shows could not get any response.
    - **Note**: The file names in the API don't matter but the order of files should be the same as above.

2.  Create Content Map:

    - Endpoint -/admin/v1/createContentMap
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form- data
            - Key- file1  
            Value- .xlsx file (contentmap sheet)
    - Response - ContentMap created.

3.  Create Intents:

    - Endpoint - /admin/v1/createIntents
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form-data
            - Key- file1  
            Value- .xlsx file (intent sheet)
    - Response - Doesn't return any response since it takes very long to create the intents and utterances. Response shows could not get any response.

4.  Create Messages:

    - Endpoint - /admin/v1/createMessages
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form- data
            - Key- file1  
            Value- .xlsx file (messages sheet)
    - Response - Messages created.

5.  Set Reset Parameters to Content Map (Prerequisite: Create Intents) :

    - Endpoint - /admin/v1/setResetParameters
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form- data
            - Key- file1  
            Value- .xlsx file (contentmap sheet)
    - Response - Reset Parameters set.

6.  Map Messages (Prerequisite: Create Content Map & Create Messages) :

    - Endpoint - /admin/v1/mapMessageIdToContentMap
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: none
    - Response - Messages mapped.

7.  Create NLP Cache Response (Prerequisite: Create Content Map) :

    - Endpoint - /admin/v1/createNLPCache
    - Type - post
    - Authorization - Auth Token
    - Payload format
        - Header: Key - Origin  
                  Value - <http://abc.oriserve.com>
        - Body: form- data
            - Key- file1  
            Value- .xlsx file (contentmap sheet)
    - Response - NLP cache created.