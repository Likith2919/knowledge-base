---
title: Logging Review
# sidebar_position: 2
slug: logging_review
author: Manjeet
author_title: Devops Engineer @ Ori
author_url: https://github.com/manjeetv
---

We have enabled logging using ELK stack.

<!-- ## Access Logging Review

Check ELK for unnecessary or unauthorized access on the servers.

- We have installed suricata IDS/IPS on vpn/shuttle server. because all services are accessed by using vpn/shuttle only.
- Log into the ELK console.
- Go the dashboard tab and search for particular brand dashboard.
- Open the dashboard and check for access_monitor logs.
- In this you got source ips and destination ips in monitoring logs.
- Source ips should be shuttle and openVpn ip and destination ips are server ips. -->

## DB Access Logging Review [New Method]

Check ELK for unnecessary or unauthorized access of database.

- Log into the ELK console.
- Go the dashboard tab and search for particular brand dashboard.
- Open the dashboard and check for mongo_monitor logs.
- In the dashboard there are 3 parts.
  - Network Tracking
  - Access Tracking
  - OPS
- Network tracking is used to continuously monitor network traffic collecting a real-time and historical record of what’s happening on your network.
  - There is a connection id which links to remote ip & platform i;e nosql, nodejs etc.
  - find the connection id or ctx you need to track and search like below
  - `json.attr.connectionId:4493 or json.ctx:conn4493` .Below screenshot is for you reference.
  - ![dbmonitorLogs1](/img/dbloggingImg/Selection_068.png)
- Access tracking is used to continuously monitor the access that your have successfully authenticated or not with username & database.
  - Here you will track the connection with username like `json.attr.principalName: root` and database `json.attr.authenticationDatabase: admin`.
  - Below screenshot is for you reference.
  - ![dbmonitorLogs2](/img/dbloggingImg/Selection_069.png)
- OPS is used to monitor all the operations done by a particular user (which we got from access tracking) by a particular IP (which we got from network tracking). Below screenshot is for you reference.
  - ![dbmonitorLogs3](/img/dbloggingImg/Selection_070.png)
- Do a monthly review of unneccesary or unathorized access of database.
  
## DB Access Logging Review [Old Method]

Check ELK for unnecessary or unauthorized access of database.

- Log into the ELK console.
- Go the dashboard tab and search for particular brand dashboard.
- Open the dashboard and check for mongo_monitor logs.
- Here you will get all info together.
- First track you ip then you will get connection id.
- By using connection id search all the operations done by a particular user like below in the screenshot.
  - ![dbmonitorLogs4](/img/dbloggingImg/Selection_071.png)
- If someone don't have sufficient permissions and try to perform any activity on db then check the message unauthorized like in screenshot below.
  - ![dbmonitorLogs5](/img/dbloggingImg/Selection_072.png)
- If someone try to access db with incorrect creds or by the unauthorized way then track the logs with message authentication failed like in below screenshot.
  - ![dbmonitorLogs6](/img/dbloggingImg/Selection_073.png).
  