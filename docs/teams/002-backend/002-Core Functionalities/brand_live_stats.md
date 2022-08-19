---
title: Brand Live Stats
sidebar_position: 5
slug: brand_live_stats
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to enable the Brand Live Stats for a brand from BSV.

- **Field in BrandSpecifiedValues** :
    ```javascript
    "SHOW_BRAND_LIVE_STATS": true
    ```

- **Note**:
    - If the key SHOW_BRAND_LIVE_STATS is not present in the database in Brand Specified Values collection in the required document, the Brand Live Stats will not be shown by default.
    - The data is send to the Front-end using socket event **brandLiveStats** on the same room as groupLiveStats data is emitted.
    - The fields that are shown on the screen are:
        -   Total Chats
        -   Total Answered
        -   Total Disconnected
        -   Total Abandoned
        -   Total Rerouted
        -   Total Chats Answered within SL
        -   Total Chats Inqueue
        -   Average Waiting Time
        -   Total LoggedIn Agents
        -   Total Active Agents
        -   Total Idle Agents
        -   Total FreeLoad
    - Currently all the fields are shown. But this can be configured from BSV if needed in the similar fashion as Group Live Stats.