---
title: Standard Live Chats Tests
sidebar_position: 4
slug: standard_live_Chats_tests
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers all the necessary test cases for Live Chats.

1. **Basic** : ( For overall sanity testing of Live Chat )
    - Agent / Supervisor can login
    - Agent / Supervisor can logout
    - Agent / Supervisor can change states
    - Agent / Supervisor can view KPI page
    - Agent / Supervisor can see live KPIs in Chats page
    - Supervisor can see Chat History page
    - Supervisor can see Agent Monitoring Page
    - Agent can only see his chats in Chats page
    - Supervisor can see Inqueue chats, Agent Handling chats & his chats ( if any ) in Chats page
    - On clicking any chat in Chats page, details of that chat are getting displayed in the middle & user profile details on right side of the screen
    - Agent can send free texts & user can see them exactly as sent & vice versa
    - Agent can send canned responses & user can see them exactly as sent
    - Supervisor can join Agent's chat & can supervise it & then can send whisper & barge messages
    - Supervisor can force take over chat after supervising
    - Supervisor can stop supervising chats
    - Chats are getting auto routed when free load is available
    - User's chat moved to respective queue when there is no freeload available
    - User's chat that is in queue is transferred to agent as soon as freeload is available
    - Agent can transfer chats to groups or to any particular agent / supervisor
    - Agent can accept / reject pending chats that have come in through transfer
    - Chats are going back to queue if Pending Chat Timeout expires & agent does not accept / reject the incoming transferred chat
    - Agent can resolve the chat
    - User can end the chat
    - Chats end when Stale Timeout expires post user's last message
    - Chats end when Disconnect Timeout expires post user disconnecting from chat

2.  **Functionality Specific Live Chats Testing** :
   
    -  **Chat session end** :

       - Agent resolves the chat
       - User clicks on End chat
       - User disconnects & does not reconnect before Disconnect Timeout expires
       - Chat ended as Stale timeut expires

    -  **Transfer chat** :

       - Agent can accept transferred chat
       - Agent can reject transferred chat
       - Transfer chat to an agent is only possible when his free load is available
       - Transfer chat to a group is always possible & chats will go in queue when no free load is available or auto assigned in case free load is available
       - Chats are going back to queue if Pending Chat Timeout expires & agent does not accept / reject the incoming transferred chat

    - **Supervisor specific** :

      - Supervisor can see Inqueue, Agent chats & his chats ( if any ) in Chats page 
      - Supervisor can join agent chat room
      - Supervisor can Supervise an agent chat
      - Supervisor can Stop supervising an agent chat
      - Supervisor can send Whisper messages
      - Supervisor can send Barge messages
      - Supervisor can Force takeover a chat from an agent
      - When a chat is already being supervised, other Supervisors will not have this supervising functionality available

    -  **Agent Remaining capacity specific tests** :

       - Chat auto routed to agent
       - Chat handled by agent ended as Stale Timeout expires
       - Chat handled by agent ended as user click on End chat
       - Chat handled by agent ended as agent Resolved the chat
       - Chat handled by agent ended as user Disconnect & does not reconnect before Disconnect Timeout expires
       - Chat handled by agent is Force takeover by supervisor
       - Agent disconnects & does not reconnect before Admin Disconnect Timeout expires
       - Agent transfers chat to an agent
       - Agent transfers chat to a group
       - Agent accepts an incoming transferred chat
       - Agent rejects an incoming transferred chat
       - Agent ends chat while user is disconnected
       - Transfer chat to an agent & chat is pending ( waiting to be accepted or rejected ) & user ends chat
       - Transfer chat to a group & chat assigned to agent
       - Transfer chat to a group & no agent is assigned before Inqueue Timeout expires & chat is re-routed back to bot
       - Transfer chat to a group & chat in queue waiting to be assigned when free load is avialable & user ends chat while in queue
       - User ends chat while agent disconnected & agent returns before Admin Disconnect Timeout expires
