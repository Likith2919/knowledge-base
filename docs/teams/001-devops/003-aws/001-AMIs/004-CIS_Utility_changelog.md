---
title: CISUtility AMI Changelog
# sidebar_position: 2
slug: cisutility_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---
:::info Description

- **Patched**: Security patches applied on 28-Mar-2022

- **Node**
  - added v14.7.x

- **Additional features**
  - CIS hardened
  - SSH strong ciphers(CTR,GCM)
  - Added new User oridevops
  - CodeDeploy, CloudWatch(disabled)
  - Git installed
  - Added new User ori-devops.
  - Security patched updated
  - Installed clamAV
  - Modified
  - Changed the sshd config
  - Added cronjob for Devops
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.
:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-0cb44081b7ac200c1  | ami-0750a9d1a3e3299d3  | ami-0a68f2edb2fe259f5  |
| Source  | ami-0407c18d2b143d50c  | ami-0cb44081b7ac200c1  | ami-0cb44081b7ac200c1  |

---

## ID: ami-0cb44081b7ac200c1

:::tip Latest | Stable
**Name**: CISUtilityImage_06-APR-2022
**Release Date**: ami-08ce17fe82b4cef10  
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
| Current | CISUtilityImage_06-APR-2022 | ami-08ce17fe82b4cef10   |
| Source  | CISUtilityImage_28-Mar-2022  | ami-0cb44081b7ac200c1  |

---

## ID:  ami-0cb44081b7ac200c1

:::tip Latest | Stable
**Name**: CISUtilityImage_28-Mar-2022  
**Release Date**: 28th March, 2022  
**Type**: AMI Cleanup
:::

- ***Reason for update/Issues in previous version***
  - Security patched to be applied
  - Need to scan and remove the vulnerabilities on the server.

- ***Changes***
  - Updated the security patches.
  - Created the `ori-devops` user.
  - Installed the clamAV for scanning server.
  - Added cronjob for `synckeys_devops.sh`

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISUtilityImage_28-Mar-2022  | ami-0cb44081b7ac200c1 |
| Source  | CISUtilityImage_17-Dec-2021  | ami-0407c18d2b143d50c |

---
<br></br>

## ID:  ami-0407c18d2b143d50c

:::tip Latest | Stable
**Name**: CISUtilityImage_17-Dec-2021  
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

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISUtilityImage_17-Dec-2021   | ami-0407c18d2b143d50c |
| Source  | CISuserSchedulerImageVodaProd | ami-0587f356871f4915a |

---
<br></br>