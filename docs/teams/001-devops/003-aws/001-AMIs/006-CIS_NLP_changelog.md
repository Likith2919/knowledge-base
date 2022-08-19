---
title: CISNLP AMI Changelog
# sidebar_position: 2
slug: cisnlp_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---
:::info Description

- **Patched**: Security patches applied on 28-Mar-2022

- **Home Directory Content**
  - fastTextModelUpdated
  - projects
  - updatedFastTextEnv

- **Additional features**
  - added libicu-dev
  - CodeDeploy, CloudWatch(disabled)
  - SSH strong ciphers(CTR,GCM)
  - New venv
  - Added new User ori-devops.
  - Security patched updated
  - Installed clamAV
  - Modified
  - Changed the sshd config
  - Added the cronjob for devops
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.

:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |             |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-0836072036897cb3f  | ami-0114b406a0e3ccfee  | ami-01b84d98ec7ed2471  |
| Source  | ami-09f6c7c85764e16ae  | ami-0836072036897cb3f  | ami-0836072036897cb3f  |

---

## ID: ami-0836072036897cb3f

:::tip Latest | Stable
**Name**: oriNLP_06-APR-2022  
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
| Current |  oriNLP_06-APR-2022          | ami-0836072036897cb3f  |
| Source  |  oriNLP_28-Mar-2022          | ami-09f6c7c85764e16ae  |


---
## ID: ami-09f6c7c85764e16ae
:::tip Latest | stable
**Name**: oriNLP_28-Mar-2022  
**Release Date**: 28th March, 2022  
**Type**: clamAV installed
:::

- ***Reason for update/Issues in previous version***
  - Security patched to be applied
  - Need to scan and remove the vulnerabilities on the server.
  - Need to update the SSH configuration.

- ***Changes***
  - Updated the security patches.
  - Created the `ori-devops` user.
  - Installed the clamAV for scanning server.
  - Added cronjob for `synckeys_devops.sh`

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current |  oriNLP_28-Mar-2022 | ami-09f6c7c85764e16ae |
| Source  | oriNLP_16-Dec-2021  | ami-07213199c02d9bbec |

---
<br></br>

## ID: ami-07213199c02d9bbec

:::tip Latest | Stable
**Name**: oriNLP_16-Dec-2021  
**Release Date**: 16th Dec, 2021  
**Type**: AMI Cleanup
:::

- ***Reason for update/Issues in previous version***
  - Need to clean up the AMI
  - Security patched to be applied

- ***Changes***
  - Cleared codedeploy deployment root directory `/opt/codedeploy-agent/deployment-root/` with unwanted stuff.
  - Removed all existing history from server.
  - Updated security patches.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | oriNLP_16-Dec-2021           | ami-07213199c02d9bbec |
| Source  | oriNLP_31-Aug-2021           | ami-0d3709d687047e2d5 |

---
<br></br>

## ID: ami-0d3709d687047e2d5

:::note Stable
**Name**: oriNLP_31-Aug-2021  
**Release Date**: 31th Aug, 2021  
**Type**: Adding new ciphers
:::

- ***Reason for update/Issues in previous version***
  - Need to be added strong ssh ciphers

- ***Changes***
  - Added SSH strong ciphers

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | oriNLP_31-Aug-2021           | ami-0d3709d687047e2d5 |
| Source  | oriNLP_17-Aug-2021           | ami-0d1f48ad798629faf |

---
<br></br>