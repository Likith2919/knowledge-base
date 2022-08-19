---
title: Hold Functionality
sidebar_position: 5
slug: hold_functionality
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers the hold feature which enables the agents to put the customer in a state where automated responses will be sent to him at regular interval, while he's busy out there with some other customers.  
Solution document: https://docs.google.com/document/d/1srmBmQwXQ3-82p5XQCvHSnrPkTq3QhStgbIlG32ui60/edit


- **Field in BrandSpecifiedValues** :
    ```javascript
    "HOLD_CONSTANTS": {
        "HOLD_COUNT": 3,
        "HOLD_TIME": 4,
        "HOLD_THRESHOLD": 60000,
        "HOLD_REENABLE_TIME": 120000,
        "HOLD_MESSAGES": [
            ["Let me check this for you, can you stay online? Please confirm!", "I'll take a moment to check this for you. Can you stay online?  Please confirm!"],
            ["This is taking a little longer than expected. Shall take few more minutes and hope that’s fine with you? Please confirm.", "Thanks for your time, request you to grant me with few more mins to get the required details. Request your concurrence."],
            ["Usually this does not take time, I really appreciate your patience and will need another minute to fetch the details, kindly stay connected! Please acknowledge."],
            ["Thank you for your cooperation. Your patience is highly appreciated."]
        ]
    }
    ```


- **Field in Customer Redis Hash** :
    -   holdStatus: true/false (If the customer is on hold or not at the instance)
    -   holdCount: The number of times the customer can be put on hold (The count decreases everytime the customer is put on hold)
    -   holdInstances: The number of messages sent to the customer, when he was put on un-Hold after hold.
    -   holdEndReason: automatic/agent (If the timer runs out or was the customer put on un-Hold by the agent)
    -   holdMsgTimeStamp: The time at which the last automated message was sent to the customer.
    -   holdEndTimeStamp: The time at which the un-Hold event was trigerred from the Dashboard.
    -   holdChatTimeStamp: It's used to set the decreasing timer in chats panel for the chat on hold.


- **Data captured for hold in DB** :
    - holdCount: The overall count of hold in a particular session.
    - holdInstances: The count of messages sent in each hold.
    - holdEndReason: The reason for unhold of chat. (Can be: 'agent', 'automatic', 'chatDisconnected', 'agentDisconnected')
    - holdStartTimeStamp: The time at which the customer was put on hold.
    - holdEndTimeStamp: The time at which the customer was put on un-hold.


- **Note**:
    - HOLD_COUNT is the number of times a customer can be put on hold by the agent in a session.
    - HOLD_TIME is the time in minutes for which the customer is put on hold in a single time. (Eg: 4 minutes)
    - HOLD_THRESHOLD is the time after which every automated response is being sent to the customer.
    - HOLD_REENABLE_TIME is the time after which the customer can be put on hold if the customer is put on unhold automatically. (If all the automated responses are being sent to him)
    - HOLD_MESSAGES is the array of arrays of messages which will be sent to the customer. For eg: In the above HOLD_CONSTANTS object, the customer is put on hold for 4 minutes
        - The 1st response be sent at the beginning of 1st minute randomly selected from HOLD_MESSAGES[0] array.
        - The 2nd response be sent at the beginning of 2nd minute randomly selected from HOLD_MESSAGES[1] array.
        - The 3rd response be sent at the beginning of 3rd minute randomly selected from HOLD_MESSAGES[2] array.
        - The 4th response be sent at the beginning of 4th minute randomly selected from HOLD_MESSAGES[3] array.
    - HOLD_THRESHOLD and HOLD_REENABLE_TIME are in milliseconds.
    - If the key HOLD_CONSTANTS is not present in the database in Brand Specified Values collection in the required document, HOLD_COUNT will be taken as 3, HOLD_TIME will be taken as 4 minutes, HOLD_THRESHOLD will be taken as  60 seconds, HOLD_REENABLE_TIME will be taken as 120 seconds, HOLD_MESSAGES will be an empty array. So, in that case the customer will be put on hold for 4 minutes but no responses will be sent.
    - **IMP**: To enable this functionality for a particular agent, we need to set "permissions.events.hold" as true in the adminusers collection. Then only the hold button will be visible on the chats page for the agent.


