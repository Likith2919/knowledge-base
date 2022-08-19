---
title: Enable logging on ELK for a brand.
# sidebar_position: 5
slug: enable_elk_logging
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

## Brief

Details about what ELK does in our system can be read [here](/docs/knowledge-base/documentation/integrations/elastic-logger/elastic-logger). In this document we will be looking at how to actually setup and enable the said loggers.  
*Throughout the example we will consider as the logging is being enabled for the Tatasky in production environment.*

## Pre-Requisites

- Admin access to ELK.
- (Optional) Admin access to AWS.

## Types of loggers

- [Filebeat](./enable_elk_logging#filebeat)
- [Elastic-Logger](./enable_elk_logging#elastic-logger)

----

## Filebeat

### Overview

Filebeat enables to ship raw/unformatted logs from servers to the ELK stack.
In terms of ELK, this provides data for the *[RAW]* dashboards.

- PROS:
  - It's not dependent on the process it self rather it depends on a filebeat service running directly on the servers.
  - Provides instantaneous raw logs.
- CONS:
  - Doesn't support aggregation.
  - Doesn't allow field based search.

### Initializing

#### Enabling the service

- Ensure that the ELK server's security group, *[sg-029d67b902031ab59](https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#SecurityGroups:groupId=sg-029d67b902031ab59;sort=groupId)* has a rule allowing incoming connection on port 9200 from the source servers.
  - The type of incoming address will be the public IP of the source servers if the source servers are connecting to ELK with public IPs.
  - The type of incoming address will be the security group of the incoming servers it the source servers are connecting to ELK with private IPs.
    - ![Example: ](/img/aws/elk/sg.png)
- Copy the *logging* directory from an existing brand to the respective location for the new branch for which logging needs to be enabled. This contains the following files:
  - ***filebeatU.yml:*** This is the main configuration file to enables filebeat. Brand name will have to edited as required, along with that few important fields to keep in mind:
    - **output.elasticsearch.index:** To be updated with new brand name.
    - **output.elasticsearch.hosts** To be updated according the VPC. As a general rule of thumb, only the servers in the *oriserve-vodafone* can connect with the private IP, servers in any other vpc will have to connect with public IP.
    - **type: logs** : Under this only enable the type of logs for the servers your enabling it for. Example, enable *usersLogs* & *schedulerLogs* when enabling for *Utility Server*.
    - S3 location will also vary, for example when enabling on *Database Server*, the *logging* folder will be copied to the *Database* directory and will have only *mongoLogs enabled*
  - ***setupFilebeat.sh:*** This is used to install and setup filebeat as required on the servers. Only the location to fetch the *filebeatU.yml* from S3 needs to be edited.
    - If the servers is of auto-scaling type, this shell script needs to be added in the respective *[Launch Template](https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#LaunchTemplateDetails:launchTemplateId=lt-0fe7aa18117b481e1)*.
    - Otherwise, copy the script to `/tmp` and execute it. This will start and enable the filebeat service on the server, now you can check ELK if you've started receiving the logs.

    - ```shell
      cd /tmp
      aws s3 cp s3://oriserve-demos/tatasky/AppTier/Environment/Production/logging/setupFilebeat.sh ./
      chmod 777 ./setupFilebeat.sh
      sudo sh setupFilebeat.sh
      ```

#### Creating searches and dashboard on ELK

- After enabling/starting the service you should be able to see the new index created under *[Stack Management --> Index Management](https://elk.oriserve.com/kibana/app/management/data/index_management/indices)* in ELK. If you don't see please verify the above steps are done. Most importantly re-verify that the security group is correctly configured.
- Index name will be in the format **`brandName-env-date-00001`**.
- ![Example:](/img/aws/elk/index_management.png)
- Once index is confirmed, head over to [Jenkins](https://jenkins.oriserve.com/view/elastic-logger/).
  - Trigger the job [create_raw_dashboard](https://jenkins.oriserve.com/view/elastic-logger/job/create_raw_dashboard/) with build parameters described below:
    - ***brand_name:*** All lowercase brand name.
    - ***env:*** All lowercase environment.
      - Allowed values are `dev` & `prod`.
    - ***index name:*** Index alias created by filebeat, general format is `brandName_env-*`.
    - ![Example:](/img/aws/elk/raw_dash.png)
- That's it, if the job runs with no errors it will create all the required saved searches and the *[[RAW] dashboard](https://elk.oriserve.com/kibana/app/dashboards#/view/e17bbc40-595f-11eb-8007-039ea68f5d39?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'Dashboard%20for%20raw%20logs%20of%20Tatasky%20Production.',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!t,title:'%5BRAW%5D%20%5BPROD%5D%20TataSky%20Logs',viewMode:view))* for the brand.

----

## Elastic-Logger

### Overview

Elastic-Logger use the elastic-logger library to parse and ship logs in neat JSON format. In terms of ELK, this provides the data for the *[Deep Insights]*  dashboards.

- PROS:
  - It supports aggregation and field based search.
  - It includes, api and access logs with processing time and response code.
- CONS:
  - It depends on the process, for example if the OCS process crashes, logs won't be shipped.

### Initializing

#### Enabling the package

- Ensure that the ELK server's security group, *[sg-029d67b902031ab59](https://ap-south-1.console.aws.amazon.com/ec2/v2/home?region=ap-south-1#SecurityGroups:groupId=sg-029d67b902031ab59;sort=groupId)* has a rule allowing incoming connection on port 9200 from the source servers.
  - The type of incoming address will be the public IP of the source servers if the source servers are connecting to ELK with public IPs.
  - The type of incoming address will be the security group of the incoming servers it the source servers are connecting to ELK with private IPs.
    - ![Example: ](/img/aws/elk/sg.png)
- Update the .env file to *[enable](/docs/knowledge-base/documentation/integrations/elastic-logger/elastic-logger#enabling)* the elastic-logger.
- Deploy or restart the process.

#### Creating searches and dashboard on ELK

- After enabling the elastic-logger .via the .env file, make sure of the following under *[Stack Management](https://elk.oriserve.com/kibana/app/management)* in ELK:
  - A new [Index](https://elk.oriserve.com/kibana/app/management/data/index_management/indices) should've been created with some initial docs.
    - Index name will be the of following format **`env_brandName$$-000001`**
    - ![Example: ](/img/aws/elk/i_ss.png)
  - A new [Index Template](https://elk.oriserve.com/kibana/app/management/data/index_management/templates) should've been created.
    - ![Example: ](/img/aws/elk/it_ss.png)
  - A new [ILM Policy](https://elk.oriserve.com/kibana/app/management/data/index_lifecycle_management/policies) should've been created.
    - ![Example: ](/img/aws/elk/ilm_ss.png)
  - A new [Index Pattern](https://elk.oriserve.com/kibana/app/management/kibana/indexPatterns) should've been created.
    - Index pattern will be in format **`env_brandName$$*`**
    - ![Example: ](/img/aws/elk/ip_ss.png)
- If any of the above isn't created on deployment/restart, you'll need to check the *console.log* for errors and take action accordingly.
  - Ensure connection from the source server to ELK server can be established either .via curl or telnet. If it gives an timeout, it's probably an issue with misconfigured security group.
- If everything is created as expected, head over to [Jenkins](https://jenkins.oriserve.com/view/elastic-logger/).
  - Trigger the job [create_deep_insight_dashboard](https://jenkins.oriserve.com/view/elastic-logger/job/create_deep_insight_dashboard/) with build parameters described below:
  - ***brand_name:*** All lowercase brand name.
  - ***env:*** Select from the dropdown.
  - ![Example: ](/img/aws/elk/deep_dash.png)
- That's it, if the job runs with no errors it will create all the required saved searches and the *[[DEEP INSIGHT] dashboard](https://elk.oriserve.com/kibana/app/dashboards#/view/006e66c0-85a7-11eb-bfa2-cf7b1239f0ec?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30m,to:now))&_a=(description:'Dashboard%20for%20deep%20insights%20on%20TataSky%20Production.',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'%5BDeep%20Insights%5D%20%5BPROD%5D%20TataSky',viewMode:view))* for the brand.

----
----
