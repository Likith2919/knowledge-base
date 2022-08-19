---
title: Queue Position
sidebar_position: 6
slug: queue_position
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers the queue position feature which shows the position of the customer in queue on each message while he's in queue.

- **Field in BrandSpecifiedValues** :
    ```javascript
    "SHOW_QUEUE_POSITION": true
    ```


- **Field in Redis** :
    -   To get the position of the customer in the queue, a sorted set is used.
    -   A sorted set for every group is created seperately with the name as group name.
    -   The sorted set has score as timestamp at which the customer was pushed into queue.
    -   The sorted set has the value as customer psid.
    -   The rank of the value in sorted set is the position of customer in queue.
    -   The enqueue and dequeue operations in the set happen at the same time when we push and pop a customer in RabbitMQ queue.


- **Note**:
    -   If SHOW_QUEUE_POSITION is not present in the respective BrandSpecifiedValues document or it's set as false,
    this functionality will be turned off.

