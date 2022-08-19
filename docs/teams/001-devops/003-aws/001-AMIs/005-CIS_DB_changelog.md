---
title: CISDB AMI Changelog
# sidebar_position: 2
slug: cisdb_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---
---

:::info Description

- **Patched**: Security patches applied on 31-Mar-2022

- **Node**
  - added v14.7.x

- **Mongo DB**
  - Installed Mongo 3.6

- **Additional features**
  - CIS hardened
  - Added new User oridevops
  - CodeDeploy, CloudWatch(disabled)
  - Git installed
  - Installed ClamAV
  - SSH strong ciphers(CTR,GCM)
  - Changed the sshd config
  - Added the Cronjob for Devops
  - Updated security patches.
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.
:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |       Singapore              |       Milan              |       Sydney              |       Tokyo              |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-07f26ed2591cf7e7b  | ami-0b13ae4f6c319a83e  | ami-026dc10037cb719f3  |
| Source  | ami-07c5581d7101577c3  | ami-07f26ed2591cf7e7b  | ami-07f26ed2591cf7e7b  |

---

## ID: ami-07f26ed2591cf7e7b

:::tip Latest | Stable
**Name**: CISDBImage_06-APR-2022  
**Release Date**: 06th APRIL, 2022  
**Type**: Modified the duration cronjob of `synckeys_devops.sh` to 10m.
:::

- ***Reason for update/Issues in previous version***
  - Need to create the `synckeys_devops.sh` file in `syncAccessKeys` directory &
  - Need to change the duration of cronjob for `synckeys_devops.sh` from 30m to 10m

- ***Changes***
  - Created the `synckeys_devops.sh` file in `syncAccessKeys` directory
  - Modified the cronjob duration for `synckeys_devops.sh` from 30min to 10min.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISDBImage_06-APR-2022        | ami-07f26ed2591cf7e7b |
| Source  | CISDBImage_31-Mar-2022       | ami-07c5581d7101577c3 |


## ID: ami-07c5581d7101577c3

:::tip Latest | Stable
**Name**: CISDBImage_31-Mar-2022  
**Release Date**: 31th March, 2021  
**Type**: `ori-devops` user Creation
:::

- ***Reason for update/Issues in previous version***
  - Need to create ori-devops user
  - Need to change sshd_config

- ***Changes***
  - Created ori-devops user
  - changed sshd_config.
  - Added cron job for devops.
  - Updated security patches.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISDBImage_31-Mar-2022        | ami-07c5581d7101577c3 |
| Source  | CISDBImage_22-Dec-2021        | ami-056af6e56820c9485 |

---
<br></br>

###### Latest changes ############  

## ID: ami-056af6e56820c9485

:::tip Latest | Stable
**Name**: CISDBImage_22-Dec-2021  
**Release Date**: 22th December, 2021  
**Type**: Git installation
:::

- ***Reason for update/Issues in previous version***
  - Need to install git
  - Need to add ssh ciphers

- ***Changes***
  - Git installed
  - Added ssh ciphers

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISDBImage_22-Dec-2021        | ami-056af6e56820c9485 |
| Source  | CISDBImage_17-Dec-2021        | ami-0757030db4290712c |

---
<br></br>

## ID: ami-0757030db4290712c

:::tip Stable
**Name**: CISDBImage_17-Dec-2021  
**Release Date**: 17th December, 2021  
**Type**: AMI Cleanup
:::

- ***Reason for update/Issues in previous version***
  - Security patched to be applied
  - Need to clean up the AMI

- ***Changes***
  - Cleared codedeploy deployment root directory `/opt/codedeploy-agent/deployment-root/` with unwanted stuff.
  - Removed all existing history from server.
  - Updated security patches.
  - Removed all extra stuff like certs,pem files from ec2-user and ori-devops user home directory.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISDBImage_17-Dec-2021        | ami-0757030db4290712c |
| Source  | CISDBImageVodaProd            | ami-05d6b45d8a8ff8923 |

---
<br></br>