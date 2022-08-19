---
title: EC2 Tags
# sidebar_position: 1
slug: ec2_tags
author: Manjeet 
author_title: Devops Engineer @ Ori

---

The docs cover various tags which is used to differentiate the servers.

## Tags

A tag is a label that you assigns to an AWS resources. Each tag key have only one value. Here we allocate tags to track our resources. we have various tags as below.

- cfm_tier
- cfm_env
- cfm_db_arc
- cfm_db_sub_type
- cfm_db_service_type
- cfm_db_redis_on_server
- cfm_stack_type
- cfm_brand_name
- cfm_is_ssm_managed
- cfm_phase_aplha
- cfm_is_patchable

## Tags with Key & Value

|  Sr. no       |               Key           |           Value           |
|:-------:|:----------------------------:|:----------------------:|
| 1 |  cfm_tier  |  web_tier / db_tier / app_tier / webapp_tier / utility_tier / full_stack_tier / ai_tier |
| 2 |  cfm_env   | development / testing / production |
| 3 |  cfm_db_arc | primary / psa / pss |
| 4 |  cfm_db_sub_type | primary / secondary / arbiter |
| 5 |  cfm_db_service_type | system / docker |
| 6 |  cfm_db_redis_on_server | true / false |
| 7 |  cfm_stack_type | single_stack / multi_stack |
| 8 |  cfm_brand_name | projectname |
| 9 |  cfm_is_ssm_managed | true / false |
| 10|  cfm_phase_aplha| true / false |
| 11|  cfm_is_patchable | true / false |

## Tags Explanation

- **cfm_tier**: It is used to describe the server type.
  - For ex:  web_tier | db_tier | app_tier | webapp_tier | utility_tier | full_stack_tier | ai_tier

- **cfm_env**: It is used to describe the environment of the server.
  - For ex: development | testing | production

- **cfm_db_arc**: It is used to describe the db architecture of db.
  - For ex: primary | psa | pss

- **cfm_db_sub_type**: It is used to describe the replica set member of db.
  - For ex: primary | secondary | arbiter

- **cfm_db_service_type**; It is used to describe the db service. i.e it's running as a service in server or in docker container.
  - For ex: system | docker

- **cfm_db_redis_on_server**: It is used to describe the redis is running in docker container or not.
  - For ex: true | false

- **cfm_stack_type**: It is used to describe the stack types for the project.Basically we have 2 types as shown below:
  - single_Stack : In which basically we have only 2 servers. i.e fullStack and AI
  - multi_Stack: In which basically we have 4 or 5  server. i.e webApptier & aitier & dbtier & utilitytier & apptier
  - For ex: single_stack | multi_stack

- **cfm_brand_name**: It is used to describe the name of the project.
  - For ex: projectname

- **cfm_is_ssm_managed**: It is used to describe that it's managed by ssm or not.
  - For ex: true | false

- **cfm_phase_aplha**: It is used for testing purpose. if we need to test something on any server then we can enable it.
  - For ex: true | false

- **cfm_is_patchable**: It is used to describe that server is patchable or not.
  - For ex: true | false
