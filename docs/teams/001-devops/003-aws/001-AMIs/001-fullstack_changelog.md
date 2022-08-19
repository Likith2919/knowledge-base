---
title: FullStack AMI Changelog
# sidebar_position: 1
slug: fullstack_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

:::info Description

- **Patched**: Security patches applied on 28-Mar-2022

- **DB**
  - MongoDB4.4 installed as service.
  - MongoDB3.6 installed as docker.
  - BaseDB
  - root user password updated

- **Nginx**
  - v1.20.x installed
  - modsec installed(disabled)
  - headers-more module installed
  - TLSv1.2 and TLSv1.3 | strong ciphers(updated)

- **Node**
  - added v14.7.x
  - npm symlinked

- **Additional features**
  - lshell
  - CodeDeploy, CloudWatch(disabled)
  - Docker images: redis, rabbitMQ
  - SSH strong ciphers(CTR,GCM)
  - Added new User ori-devops.
  - Security patched updated
  - Installed clamAV
  - Modified
  - Changed the sshd config
  - Added cron job for devops
  - Created the `/syncAccessKey` directory.
  - Modified the cron job duration for devops.sh to 10min.

:::
| Sr. No        |               Mumbai           |        Ireland              |       N-Virginia              |
|:-------:|:----------------------------:|:----------------------:|:----------------------:|
| Current | ami-0e1b4c99fe36b17e3  | ami-0d731008f309e3feb  | ami-005778813ce017bab  |
| Source  | ami-010485d7ad32fd695  | ami-0e1b4c99fe36b17e3  | ami-0e1b4c99fe36b17e3  |

---

## ID: ami-0e1b4c99fe36b17e3

:::tip Latest | Stable
**Name**: FullStackImage_06-APR-2022  
**Release Date**: 06th APRIL, 2022  
**Type**: Modified the duration cronjob of `synckeys_devops.sh` 30m to 10m.
:::

- ***Reason for update/Issues in previous version***
  - Need to create the `synckeys_devops.sh` file in `syncAccessKeys` directory &
  - Need to change the duration of cronjob for `synckeys_devops.sh` from 30m to 10m

- ***Changes***
  - Created the `synckeys_devops.sh` file in `syncAccessKeys` directory
  - Modified the cronjob duration for `synckeys_devops.sh` from 30min to 10min.

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | FullStackImage_06-APR-2022   | ami-0e1b4c99fe36b17e3  |
| Source  | FullStackImage_28-Mar-2022   | ami-010485d7ad32fd695  |

---
<br></br>

## ID: ami-010485d7ad32fd695

:::tip Latest | Stable
**Name**: FullStackImage_28-Mar-2022  
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
  - Added cronjob for `synckeys_devops.sh`

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | FullStackImage_28-Mar-2022  | ami-010485d7ad32fd695  |
| Source  | FullStackImage_17-Dec-2021  | ami-0996f77b55866f17e |

---
<br></br>

## ID: ami-0996f77b55866f17e

:::tip Latest | Stable
**Name**: FullStackImage_17-Dec-2021  
**Release Date**: 17th December, 2021  
**Type**: Base update
:::

- ***Reason for update/Issues in previous version***
  - Requirement to clean the AMI.

- ***Changes***
  - Cleared codedeploy deployment root directory `/opt/codedeploy-agent/deployment-root/` with unwanted stuff.
  - Removed all existing history from server.
  - Cleaned up all dbs with service based and container based.
  - Updated security patches.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | FullStackImage_17-Dec-2021                       | ami-0996f77b55866f17e |
| Source  | baseImageFullStackDeployment-nodev14_27-Aug-2021 | ami-08e49fda5afc02b20 |

<br></br>

## ID: ami-08e49fda5afc02b20

:::tip Stable
**Name**: baseImageFullStackDeployment-nodev14_27-Aug-2021  
**Release Date**: 23th August, 2021  
**Type**: Base update
:::

- ***Reason for update/Issues in previous version***
  - Requirement for baseDB for bot development with no irrelevant data.

- ***Changes***
  - Added a additional data directory to be used by both docker and mongoDB service with base DB created from `evolet` brand.
    - Docker can be started from `/home/ec2-user/new-mongo-data` to use this baseDB, else can be started form the original `/home/ec2-user/mongo-data`
    - Similarly, mongoDB(4.4) service can use either `/var/lib/mongo-base-new/` or the default `/var/lib/mongo`
  - Cleared directory `/etc/cfn/hooks.d/` to avoid possible CF restarts.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | baseImageFullStackDeployment-nodev14_27-Aug-2021 | ami-08e49fda5afc02b20 |
| Source  | baseImageFullStackDeployment-nodev14_23-Aug-2021 | ami-0d46abeace8e25ff3 |

---
<br></br>

## ID: <s> ami-0d46abeace8e25ff3 </s>

:::danger
**Name**: baseImageFullStackDeployment-nodev14_23-Aug-2021  
**Release Date**: 23th August, 2021  
**Type**: Security fixes
:::

- ***Reason for update/Issues in previous version***
  - weak SSH ciphers and SSL ciphers are present in previous version. Now we have added strong ciphers.

- ***Changes***
  - Added Strong SSH ciphers and SSL ciphers.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | baseImageFullStackDeployment-nodev14_23-Aug-2021 | ami-0d46abeace8e25ff3 |
| Source  | baseImageFullStackDeployment-nodev14_17-Aug-2021 | ami-0a7380f300c7260ac |

---
<br></br>

## ID: <s> ami-0a7380f300c7260ac </s>

:::danger
**Name**: baseImageFullStackDeployment-nodev14_17-Aug-2021  
**Release Date**: 17th August, 2021  
**Type**: Fixes breaking issues
:::

- ***Reason for update/Issues in previous version***
  - npm version for root and ec2-user was different due to difference in location of installed binaries. This was incompatible with node v14 upgrade in previous release.

- ***Changes***
  - A symlink was created to link updated binaries of with old ones to resolve this.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | baseImageFullStackDeployment-nodev14_17-Aug-2021 | ami-0a7380f300c7260ac |
| Source  | baseImageFullStackDeployment-nodev14_14-Aug-2021 | ami-018fade404244a93b |

---
<br></br>

## ID: <s> ami-018fade404244a93b </s>

:::danger
**Name**: baseImageFullStackDeployment-nodev14_14-Aug-2021  
**Release Date**: 14th August, 2021  
**Type**: Fixes breaking issues
:::

- ***Reason for update/Issues in previous version***
  - Default `dashboard.conf` had an incompatible setting. This caused nginx to crash on reload. Due to this all frontend deployments were failing during scale-up.
    - The setting was related to `modsec` module which was added in previous release. After testing module was disabled from `nginx.conf` but not `dashboard.conf`.

- ***Changes***
  - Commented the `modsec` setting that was left in `dashboard.conf`.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | baseImageFullStackDeployment-nodev14_14-Aug-2021 | ami-018fade404244a93b |
| Source  | baseImageFullStackDeployment-nodev14_06-Aug-2021 | ami-0d28dca7de07cd2d3 |

---
<br></br>

## ID: <s> ami-0d28dca7de07cd2d3 </s>

:::danger
**Name**: baseImageFullStackDeployment-nodev14_06-Aug-2021  
**Release Date**: 14th August, 2021  
**Type**: Major upgrade, Adding new feature
:::

- ***Reason for update/Issues in previous version***
  - Needed to add modsec module for nginx
  - baseDB had to be updated
    - Vodafone related stuff was to be deleted
    - Corrupt data in intents collections to be deleted.
  - root creds for DB had to be changed

- ***Changes***
  - Checked and applied security patches.
  - Updated node from v10.x to v14.7.x
  - nginx updates
    - Built nginx v1.20.x from source along with the below modules.
      - Installed modsec module along with OWASP rule set.
        - Default modsec config is added to `/etc/nginx/modsec`
        - Keeping it disabled by default.
        - Finalize the rules to be used from `/etc/nginx/modsec/main.conf` and update settings in `nginx.conf` as required to enable.
      - Installed headers-more module
    - Also, updated the install location structure. Now, it's more organized under `/opt/nginx`
    - Added nginx logrotate.
  - mongo updates
    - Installed mongoDB v4.4 as service with same data/users as baseDB.
    - Structured mongo installation in '/opt/mongo'
  - Removed vodafone related data from the base DB.
    - Removed additional workflows, intents etc.

|         |                       Name                       |           ID          |
|:-------:|:------------------------------------------------:|:-----------------------:|
| Current | baseImageFullStackDeployment-nodev14_06-Aug-2021 | ami-0d28dca7de07cd2d3 |
| Source  | baseImageFullStackDeployment-nodev10-13-July-2021 | ami-03d74daedad8c031d |

---
<br></br>