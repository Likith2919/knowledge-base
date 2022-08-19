---
title: Accept Incoming Chats
sidebar_position: 2
slug: accept_Incoming_Chats
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to give agents the access to Accept the incoming chats. The functionality can be enabled and disabled for a specific brand and for a specific user.

1. To enable for a Brand: Add the **ACCEPT_INCOMING_CHAT** field as true in the respective document in BrandSpecifiedValues collection.
If it's is not present, it will be considered as false and chats will be automatically routed to all the agents.
    - Eg: "ACCEPT_INCOMING_CHAT" : true

2. To enable for an Agent: Add the **chatAutoAccept** field as false for the respective agent in adminusers collection.
If it's is not present, it will be considered as true and chats will be automatically routed to the respective agent.
    - Eg: "chatAutoAccept" : false

3. Pending Chat Timeout is the time after which the chat (if the chat is neither accepted or rejected by the agent) is moved back to the queue.
Configure Pending chat timeout for the brand: Add **PENDING_CHAT_TIMEOUT** field as the number of minutes (integer) in the respective document in BrandSpecifiedValues collection. Pending chat timeout should be less than or equal to the inqueue timeout.
    - Eg: "PENDING_CHAT_TIMEOUT" : 1