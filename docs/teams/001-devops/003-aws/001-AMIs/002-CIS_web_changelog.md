---
title: CISWeb AMI Changelog
# sidebar_position: 2
slug: cisweb_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

:::info Description

- **Patched**: Security patches applied on 28-Mar-2022

- **Nginx**
  - v1.20.x installed, build from source
  - modsec installed(disabled)
  - headers-more module installed
  - TLSv1.2 and TLSv1.3 | strong ciphers

- **Additional features**
  - CIS hardened
  - lshell
  - CodeDeploy, CloudWatch(disabled)
  - Increased ulimits .via `/etc/security/limits/conf` and .via `sysctl.conf` placed in S3.
  - ClamAV and ossec is installed.(not being utilized)
  - Added new User ori-devops.
  - Security patched updated
  - Modified
  - Changed the sshd config
  - Added the Cronjob for Devops.
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.
:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-07a8386e46ba53f76  | ami-0996f77b55866f17e  | ami-0996f77b55866f17e  |
| Source  | ami-09386cee0ae19041e  | ami-0996f77b55866f17e  | ami-0996f77b55866f17e  |

---

## ID: ami-07a8386e46ba53f76

:::tip Latest | Stable
**Name**: CISWebImageVodaProd06APR2022  
**Release Date**: 06th APRIL, 2022  
**Type**: Modified the duration cronjob of `synckeys_devops.sh` to 10m.
:::

- ***Reason for update/Issues in previous version***
  - Created the `synckeys_devops.sh` file in `syncAccessKeys` directory
  - Modified the cronjob duration for `synckeys_devops.sh` from 30min to 10min.

- ***Changes***
  - Need to create the `synckeys_devops.sh` file in `syncAccessKeys` directory &
  - Need to change the duration of cronjob for `synckeys_devops.sh` from 30m to 10m

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISWebImageVodaProd06APR2022 | ami-07a8386e46ba53f76  |
| Source  | CISWebImageVodaProd28MAR2022 | ami-09386cee0ae19041e  |


## ID: ami-09386cee0ae19041e

:::tip Latest | Stable
**Name**: CISWebImageVodaProd28MAR2022  
**Release Date**: 28rd March, 2022  
**Type**: Adding cronjob
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
| Current | CISWebImageVodaProd28MAR2022 | ami-09386cee0ae19041e |
| Source  | CISWebImageVodaProd03AUG2021 | ami-051dd2f39eb2eabed |

---
<br></br>


## ID: ami-051dd2f39eb2eabed

:::tip Latest | Stable
**Name**: CISWebImageVodaProd03AUG2021  
**Release Date**: 03rd August, 2021  
**Type**: Major upgrade, Adding new feature
:::

- ***Reason for update/Issues in previous version***
  - Needed to add modsec module for nginx
  - Security patched to be applied

- ***Changes***
  - nginx updates
    - Built nginx v1.20.x from source along with the below modules.
      - Installed modsec module along with OWASP rule set.
        - Default modsec config is added to `/etc/nginx/modsec`
        - Keeping it disabled by default.
        - Finalize the rules to be used from `/etc/nginx/modsec/main.conf` and update settings in `nginx.conf` as required to enable.
      - Installed headers-more module
    - Also, updated the install location structure. Now, it's more organized under `/opt/nginx`
    - Added nginx logrotate.?

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISWebImageVodaProd03AUG2021 | ami-051dd2f39eb2eabed |
| Source  | CISWebImageVodaProd03FEB2021 | ami-0705cb623a7bb80b1 |

---
<br></br>

## ID: ami-0705cb623a7bb80b1

:::note Stable
**Name**: CISWebImageVodaProd03FEB2021  
**Release Date**: 03rd Feb, 2021  
**Type**: Major upgrade, Adding new features
:::

- ***Reason for update/Issues in previous version***
  - Nginx update required for security reasons
  - Security patched to be applied

- ***Changes***
  - Checked and applied security patches.
  - nginx upgrade
    - Built nginx v1.17.x from source along with the below modules.
      - Installed headers-more module

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | CISWebImageVodaProd03FEB2021 | ami-0705cb623a7bb80b1 |
| Source  |                -             |            -          |

---
<br></br>