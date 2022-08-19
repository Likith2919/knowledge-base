---
title: CISApp AMI Changelog
# sidebar_position: 3
slug: cisapp_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---
:::info Description

- **Patched**: Security patches applied on 28-Mar-2022

- **Node**
  - Added v14.17.6

- **Additional features**
  - Added voda prod db servers ip's in /etc/hosts for replica setup.
  - Added voda dxl API ip's in /etc/hosts for whitelisting.
  - CodeDeploy, CloudWatch.
  - CIS Hardened
  - Git installed
  - Added new User oridevops
  - AV Anti-virus installed
  - Increased limits in limits.conf file in location `/etc/security/limits.conf`
  - Added sysctl.conf in location `/etc/sysctl.conf`
  - This AMI has Vodafone DB's Ip's in location `/etc/hosts`
  - Added new User ori-devops.
  - Security patched updated
  - Installed clamAV
  - Modified
  - Changed the sshd config
  - Added the Cronjob for Devops
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.
:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-01c98427ca2db0349  | ami-0996f77b55866f17e  | ami-0996f77b55866f17e  |
| Source  | ami-03ee06ca939e19eac  | ami-0996f77b55866f17e  | ami-0996f77b55866f17e  |

---

## ID: ami-01c98427ca2db0349

:::tip Latest | Stable
**Name**: CISAppImage_6APR2022  
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
| Current | CISAppImage_6APR2022         | ami-01c98427ca2db0349 |
| Source  | CISAppImage_28Mar2022        | ami-03ee06ca939e19eac |

## ID: ami-03ee06ca939e19eac

:::tip Latest | Stable
**Name**: CISAppImage_28Mar2022  
**Release Date**: 28th March, 2022  
**Type**: clamAV installation
:::

- ***Reason for update/Issues in previous version***
  - Security patched to be applied
  - Need to scan and remove the vulnerabilities on the server.

- ***Changes***
  - Updated the security patches.
  - Created the `ori-devops` user.
  - Installed the clamAV for scanning server.
  - Added cronjob for devops.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISAppImage_28Mar2022  | ami-03ee06ca939e19eac |
| Source  | CISAppImageVodaProd_14Feb2022  | ami-09f673b6c4e88d140 |

---

## ID: ami-09f673b6c4e88d140

:::tip Latest | Stable
**Name**: CISAppImageVodaProd_14Feb2022  
**Release Date**: 14th Feb, 2022  
**Type**: Security Fixes | Fixing Breaking issues  
:::

- ***Reason for update/Issues in previous version***
  - Getting below error during scale-up and BG deployments in user-data.log
    - `Error: Rpmdb checksum is invalid: pkg checksums: amazon-ssm-agent-0:2.3.662.0-1.amzn2.x86_64`
  - On checking, this seemed like dependency conflicts b/w yum and rpm. Also, could've been related to some outdated packages.

- ***Changes***
  - Latest security patches installed | `yum update --security`
  - Synced yum history | `yum history sync`
  - Installed the ca-certificates | `yum install ca-certificates -y`

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | CISAppImageVodaProd_14Feb2022 | ami-09f673b6c4e88d140 |
| Source  | CISAppImage_24Jan2022         | ami-01272354f513b2006 |

---
<br></br>

## ID: <s> ami-01272354f513b2006 </s>

:::danger Danger
**Name**: CISAppImage_24Jan2022  
**Release Date**: 24th Jan, 2022  
**Type**: Node version Upgrade  
:::

- ***Reason for update/Issues in previous version***
  - We need to upgrade the node version from 10 to 14.

- ***Changes***
  - Node updated
  - PM2 updated

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | CISAppImage_24Jan2022        | ami-01272354f513b2006 |
| Source  | CISAppImageVodaProd30Jun2021 | ami-086817bdc01e9c8c4 |

---
<br></br>

## ID: ami-086817bdc01e9c8c4

:::tip Stable
**Name**: CISAppImageVodaProd30Jun2021  
**Release Date**: 30th June, 2021  
**Type**: Git version installation  
:::

- ***Reason for update/Issues in previous version***
  - we were install git by using Launch template. it's took a long time to install during scale out. so, we have added in AMI as well.

- ***Changes***
  - Git installed.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | CISAppImageVodaProd30Jun2021 | ami-086817bdc01e9c8c4 |
| Source  | CISAppImageVodaProd29Jan2021 | ami-0cdc38ac78474b706 |

---
<br></br>