---
title: S3ConfigStructure
# sidebar_position: 1
slug: S3Config
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---

- The doc covers the S3 structure that we use.

- We use `oriserve-demos` bucket mostly to store the Env files of respective brands.
- For some brands, we use different buckets. First, check the brand in `oriserve-demos` bucket. If the brand is not present, then contact the DevOps-Lead for bucket name.
  - For `education-first` brand we use `oriserve-demos-ireland` bucket.
    - For `reliant-energy` brand we use `oriserve-demos-n-virginia` bucket.
- For example, let us say we need to access the `pd1` brand  files.

## BRAND STRUCTURE

- In every brand we will have below services.
        - AppTier
        - CodeDeploy
        - Database
        - oriNLP
        - Scheduler
        - Users
        - WebTier

  - `AppTier` is the folder which holds all the files that required for `OCS`.
    - As the name suggests, the main application of any brand will be the OCS. Hence, AppTier holds all files for OCS.
    ![Apptier](/img/s3_config/Apptier.png)
    - `CodeDeploy` is the folder which holds the code-deploy scripts for all services.
    ![codedeploy](/img/s3_config/code_deploy.png)
    - `Database` is the folder which holds the scripts which are used for monitoring. (Some brands, doesn't have database folder).
    ![database](/img/s3_config/database.png)
    - From the above image, we can see 2 folders ,
      - `cloudwatch` folder consists of configuration file used for cloudwatch service which is used for monitoring.
        - `logging` folder consists of
    - `oriNLP` is the folder which is used to store the scripts that needed for A.I training models.
    ![nlp](/img/s3_config/NLP.png)
    - In the above image,
      - `clearModels` folder consists of shell script that used for removingModels.
      - `config` folder consists of configuration file for NLP.
        - `merchant_config.py` - This is the file where, brand and env of the respective merchant/brand which executes by the AI code.
        - `nginx` folder consists of nginx config file for NLP
    - `Users` is the folder which holds the the scripts for users.
    ![users](/img/s3_config/users.png)
    - In the above image,
      - `env` is the file which is used to dB using default credentials.
        - `users_install.sh` is the file which is used to install the users.
    - `Scheduler` is the folder which holds the scripts for scheduling.
    ![scheduler](/img/s3_config/scheduler.png)
    - In the above image,
      - `env` is the file which is used to dB using default credentials.
        - `env_reporting_dishtv` : This is the default env which is used at code
        - `scheduler_install.sh` is the file which is used to install the users.
    - `WebTier` which holds the files for Chatboard,Dashboard, Dashboard2, configuration files for webserver.
    ![Dashboard](/img/s3_config/Dashboard.png)
    - In the above image,
      - `CloudWatch` folder has the configuraiton file for cloudwatch.
        - under `Dashboard` folder, you can find the files used for dashboard. For somebrands, Dashboard2 files are also present at this location.
        - `logging` folder consists of the nginx file.
        - under `nginx` folder, there will be files related to nginx. i.e, error.conf,nginx.conf.
        - under `nginx` folder, you will find the sub-folder `config.d`
          - `config.d` folder consists of the ocs,dashboard,dashboard2 configuration files.
        - `dynamic.js` : This is the skeleton file which used providing for web SDKs
        - `envadster_digital_ocean` : env used of adster deployments.
    - For `env` file access/sharing, refer to this [doc](/docs/teams/devops/Ad-hoc/S3Config)