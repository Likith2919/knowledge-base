---
title: sunrise
# sidebar_position: 1
slug: sunrise
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---


- This doc explains about the sunrise operation.
- `sunrise` is an operation which is used to retrieve the stopped/terminated instances.
- There are two types of sunset.
  - `Hard sunrise` : Where the recreating or retreiving the features/service which is terminated through sunrise operation.
  - `Soft sunrise` : Where the restarting the features/service which is stopped through sunrise operation.

## single stack

- single stack contains the `Fullstack`, `AI`  servers.

### soft_sunrise

- Let the brandName in this doc be `bajaj-thai`
- You will find the brand Folder in the Archived location in the s3 bucket `s3://oriservedemos/Archive/bajaj-thai`
- Move this brandFolder to the `s3://oriservedemos/`
- Now, the location of brand folder would be `S3://oriservedemos/bajaj-thai/`
- You will find the all files related to `bajaj-thai`
- Start the instances `Fullstack`, `AI` that are stopped through sunset operation.
- Login to the `Fullstack` instance.
- Create a `db_backup` folder on the home directory.
- You will find the backup of the database that we taken through sunset operation at `s3://ori-db-backup/bajaj-thai`
- copy the db backup to the newly created directory `db_backup`
  - command: `cd db_backup`
  - command : `s3://ori-db-backup/bajaj-thai/Backup/database/Development/oriserveDemoDB/ .`

#### mongo_restore

- We have the script to restore the database.





- Whenever we restart the instance, I.P will changed. So, update the new public I.P at the `Route53` under domainName
  - DomainName : `bajaj-thai-dev.oriserve.com` `bajaj-thai-dashboard.oriserve.com` `bajaj-thai-ai.oriserve.com`

#### JENKINS_JOBS_RETRIEVAL

- Now, we need to retrieve the jenkins jobs from the backup folder.
  
  - Let's say we need to retrieve the bajaj-thai brand.
  - Log into the Jenkins server.
  - Create a directory `/tmp`
  - Jenkins jobs backup is at the location in s3 `s3://oriserve-demos/bajaj-thai/Backup/Environment/Development/Jenkins/`
  - Copy this backup zip folder.

    - command : `sudo aws s3 cp s3://oriserve-demos/bajaj-thai/Backup/Environment/Development/Jenkins/tata_capital_devjobs.zip  /tmp`
  - Go to `/tmp` directory.
    - command : `cd /tmp`
  - Unzip the folder
    - command : `unzip bajaj-thai_devjobs.zip`
  - You will get the jobs folder. Copy this folder to the jenkins jobs folder.
    - command : `sudo mv bajaj-thai_devjobs /var/lib/jenkins/jobs/`
  - SafeRestart the jenkins

    `SafeRestart` : This type of restart will allow all running jobs to complete. New jobs will remain in the queue to run after the restart is complete.

    - To saferestart the jenkins, follow the below step.
      - `jenkins_url/safeRestart` in browser.  

- Check the jenkins console, you will find the new jobs.

#### PNG_DASHBOARD_SETUP

- To setup the PNG dashboards, we have configured a job.
- Login to Jenkins,
- Check for the `Iaas` --> `IaasUtilities` --> `IaaS_create_png_dashboard`
![png_jenkins_job](/img/sunrise/PNG_jenkins.png)
- Provide the values as per the stack.
  - `Type of stack` : `single` for single stack.
  - `jobBranchName` : This is the main master branch
  - `brandName` : Enter the brandName.
  - `env` : Dev

### hard_sunrise

- The entire backup of the previous database is stored in the S3 location:
  - `s3://ori-db-backup/bajaj-thai/Backup/database/Environment/dbName/`
    - Environment would be `Development`
  - Change the brandName as per the requirement.
- You will find the brand Folder in the Archived location in the s3 bucket `s3://oriservedemos/Archive/`
- Move this brandFolder to the `s3://oriservedemos/`
- Change the folder that created through stack to `brandName_backup`
  - `bajaj_thai_backup`
- Create the instances `Fullstack` and `devAi` servers..
  - Mostly, `AMI` would be the latest respective AMI
    - Refer the doc for [stack_creation](../001-automated_dev_stack_creation.md)
- Choose the right instance Configuration , SG, KeyPair.
  - For the confirmation of `AMI`, `SG`, `KeyName` contact to the `DevOpsTeam`.
- Login to the `Fullstack` instance
- Initially, copy the backup data to the newly created folder `dbBackup` on instance.
- Copy the data from `dbBackup` folder to docker container.
- We have the script, to restore the database.

  ```shell
  #!/bin/bash
  echo "Please enter DB name : "

  read -rp "Default[oriserveDemoDB] : " DBName
  [[ -z ${DBName}  ]] && DBName="oriserveDemoDB"
  echo "Please enter DB user : "
  read -rp "Default[dbOwner] : " DBuser
  [[ -z ${DBuser} ]] && DBuser="dbOwner"
  echo "Please enter DB user's password : "
  read -rp "Default[oriSaaSdemo1092] : " DBuserpass
  [[ -z ${DBuserpass} ]] && DBuserpass="oriSaaSdemo1092"
  mongorestore -v -h 127.0.0.1:27017 -u ${DBuser}r -p ${DBuserpass} --authenticationDatabase ${DBName} -d ${DBName} --dir ./db_backup --gzip --drop
  ```

- Run the script with `sudo` privilages.
  - While running the script you need to provide the `DBName` , `DBuser` , `DBpassword`

#### Jenkins_job_creation

We have configured the jenkins_job to create the new jenkins_jobs for a specific brand.

- Login to the Jenkins.
- Check for view `IaaS` then go the `IaaS` --> `IaaS_utilities` --> `IaaS_create_jenkins_jobs`
![jenkins_job](/img/sunrise/jenkins1.png)
![jenkins_job](/img/sunrise/jenkins2.png)
- Take above image as reference and provide the necessary details as per your requirement.
  - `jobBranchName` : This is our main branch, which is used to pull the collection.

  - `jenkinsUrl` : Based on the jenkins which is used in the region choose the value.

    - For mumbai   : `https://jenkins.oriserve.com`
    - For ireland  : `https://jenkins-ireland.oriserve.com`
    - For N.Virginia : `https://jenkins-nvirginia.oriserve.com`

  - `createOptionalJobs` : Check this if you need to create the two separate jobs for Datamigration and NLP models.

  - `bucketName` : Select the bucket as per your usage.
    - `manjeet-test-ori` for test_case
    - `oriserve-demos` for `Mumbai` region

    - `oriserve-demos-nvirginia` for `N.Virginia` region.

  - `cf_provisionAdster` : Check this if you need to create a jobs for `adster` deployments.
  - `brandName` : Give the brandName you want to create.
  - `env` : choose the env `Dev/Uat/Prod`
  - `cf_ocsBranch` : Choose the ocs branch 
  - `cf_brandFileBranch` : Choose the brandFiles branch
  - `cf_oriNlpBranch` : Choose the NLP branch
  - `cf_chatbotBranch` : Choose the chantbot branch
  - `cf_dashboardBranch` : Choose the dashboard  branch
  - `cf_dashboard2Branch` : Choose the dashboard2  branch
  - `cf_adsterBranch` : Choose the adster branch.
- Get the confirmation from the `DevOps Lead` before passing the values.
- After Providing the necessary values, build the job.

#### PNG_dashboards_creation

- For PNG dashboards creation [refer](sunrise.md#png-dashboard-setup)

## multi_stack

- Multistack contains the `Utility`, `NLP` , `Webapp`, `dB` servers.

### soft_sunrise

- `soft sunrise` refers to the starting the `Utility`, `NLP` , `Webapp`, `dB` servers which are stopped through sunset operation along with the backup data.

- In multistack we have the `Webapp` `NLP` `Utility` `DB` servers.
- You will find the brand Folder in the Archived folder in the s3 location `s3://oriservedemos/Archive/`
- Move this brandFolder to the `s3://oriservedemos/`
  - Let the brandName in this doc be `bajaj-thai`
- Now, the location of brand folder would be `S3://oriservedemos/bajaj-thai/`
- You will find the all files related to `bajaj-thai`
- Start the Instances `Utility`, `DB` that are stopped during the sunset operation.
- For Webapp and NLP, update the autoscaling configuration with Desired,minimum and maximum capacity as Desired values. So that, it will automatically spawn the respective instances.
- Update the loadbalancer `DNS name` as the respective Domain name Listeners.
![ASG_route53](/img/sunrise/ALB_R53.png)
- After Creating the stack, perform these actions.

#### DomainNames

- brandName-dashboard.oriserve.com
  - `tvs-dashboard.oriserve.com`
- brandName.oriserver.com
  - `tvs.oriserve.com`
- brandName-ai.oriserve.com
  - `tvs-ai.oriserve.com`
- brandName-dashboard2.oriserve.com   (Confirm with the DevOpsTeam)
  - `tvs-dashboard2.oriserve.com`

#### JENKINS_JOBS_RETRIEVAL

We have configured the jenkins_job to create the new jenkins_jobs.

- Login to the Jenkins.
- Check for view `IaaS` then go the `IaaS` --> `IaaS_utilities` --> `IaaS_create_jenkins_jobs`
![jenkins_job](/img/sunrise/jenkins3.png)
![jenkins_job](/img/sunrise/jenkins4.png)
- Take above image as reference and provide the necessary details as per your requirement.
  - `jobBranchName` : This is our main branch, which is used to pull the collection.

  - `jenkinsUrl` : Based on the jenkins which is used in the region choose the value.

    - For mumbai   : `https://jenkins.oriserve.com`
    - For ireland  : `https://jenkins-ireland.oriserve.com`
    - For N.Virginia : `https://jenkins-nvirginia.oriserve.com`

  - `createOptionalJobs` : Check this if you need to create the two separate jobs for Datamigration and NLP models.

  - `bucketName` : Select the bucket as per your usage.
    - `manjeet-test-ori` for test_case
    - `oriserve-demos` for `Mumbai` region

    - `oriserve-demos-nvirginia` for `N.Virginia` region.

  - `cf_provisionAdster` : Check this if you need to create a jobs for `adster` deployments.
  - `brandName` : Give the brandName you want to create.
  - `env` : choose the env `Prod`
  - `cf_ocsBranch` : Choose the ocs branch
  - `cf_brandFileBranch` : Choose the brandFiles branch
  - `cf_oriNlpBranch` : Choose the NLP branch
  - `cf_chatbotBranch` : Choose the chantbot branch
  - `cf_dashboardBranch` : Choose the dashboard  branch
  - `cf_dashboard2Branch` : Choose the dashboard2  branch
  - `cf_adsterBranch` : Choose the adster branch.
- Get the confirmation from the `DevOps Lead` before passing the values.
- After Providing the necessary values, build the job.

#### PNG DASHBOARD SETUP

- To setup the PNG dashboards, we have configured a job.
- Login to Jenkins,
- Check for the `Iaas` --> `IaasUtilities` --> `IaaS_create_png_dashboard`
- Provide the values as per the stack.
  - `Type of stack` : `multi` for multi stack.
  - `jobBranchName` : This is the main master branch
  - `brandName` : Enter the brandName.
  - `env` : Prod

### hard_sunrise

- `Hard sunrise` refers to the creating the new  `Utility`, `NLP` , `Webapp`, `dB` servers which are terminated through sunset operation along with the backup data.

- If the stack needs to create through cloudformation, create the stack by passing the desired values.
  - For the conformation of the values, contact to the `DevOpsTeam`
- We have configured the jenkins job for the multistack creation.
- Before performing this step, get confirmation from the `DevOpsLead`
  - Login to the jenkins
  - check for the view `IaaS` then, `IaaS` --> `multi_stack_deployment`.
  - You will find the `IaaS_trigger_cloud_formation_multi_stack_creation` job.
  - Pass the required values and start the job.
- After creating the stack, Login to the `dB` instance.
- The entire backup of the previous database is stored in the S3 location.
- The location for the s3 location would be,
  - `s3://ori-db-backup/bajaj-thai/Backup/database/Environment/dbName/`
    - Environment would be `Production`
- Change the brandName as per the requirement.
- Copy the data from ec2  `dbBackup` folder to docker container.
- In hard sunrise, Domain names creation and associating the loadbalancers will be done through cloudformation.

#### Jenkins_job_creation

We have configured the jenkins_job to create the new jenkins_jobs for a specific brand.

- Login to the Jenkins.
- Check for view `IaaS` then go the `IaaS` --> `IaaS_utilities` --> `IaaS_create_jenkins_jobs`
![jenkins_job](/img/sunrise/jenkins1.png)
![jenkins_job](/img/sunrise/jenkins2.png)
- Take above image as reference and provide the necessary details as per your requirement.
  - `jobBranchName` : This is our main branch, which is used to pull the collection.

  - `jenkinsUrl` : Based on the jenkins which is used in the region choose the value.

    - For mumbai   : `https://jenkins.oriserve.com`
    - For ireland  : `https://jenkins-ireland.oriserve.com`
    - For N.Virginia : `https://jenkins-nvirginia.oriserve.com`

  - `createOptionalJobs` : Check this if you need to create the two separate jobs for Datamigration and NLP models.

  - `bucketName` : Select the bucket as per your usage.
    - `manjeet-test-ori` for test_case
    - `oriserve-demos` for `Mumbai` region

    - `oriserve-demos-nvirginia` for `N.Virginia` region.

  - `cf_provisionAdster` : Check this if you need to create a jobs for `adster` deployments.
  - `brandName` : Give the brandName you want to create.
  - `env` : choose the env `Dev/Uat/Prod`
  - `cf_ocsBranch` : Choose the ocs branch 
  - `cf_brandFileBranch` : Choose the brandFiles branch
  - `cf_oriNlpBranch` : Choose the NLP branch
  - `cf_chatbotBranch` : Choose the chantbot branch
  - `cf_dashboardBranch` : Choose the dashboard  branch
  - `cf_dashboard2Branch` : Choose the dashboard2  branch
  - `cf_adsterBranch` : Choose the adster branch.
- Get the confirmation from the `DevOps Lead` before passing the values.
- After Providing the necessary values, build the job.
  
#### PNG_DASHBOARD_SETUP

- To setup the PNG dashboards, we have configured a job.
- Login to Jenkins,
- Check for the `Iaas` --> `IaasUtilities` --> `IaaS_create_png_dashboard`
- Provide the values as per the stack.
  - `Type of stack` : `multi` for multi stack.
  - `jobBranchName` : This is the main master branch
  - `brandName` : Enter the brandName.
  - `env` : Prod

#### Launch_Template_Retrieval

- We use LaunchTemplates for 2 services.
  - `Webapp` and `NLP`
- We need to create the new LaunchTemplate with the same configuration of previous LaunchTemplateData.
- We have taken a backup of LaunchTemplateData and stored in a s3 before it is deleted.
- The s3 location
  - `aws s3 cp LT.json s3://oriserve-demos/brandName/oriNLP/Environment/Development/LT_Data/LT.json`
  - `aws s3 cp LT.json s3://oriserve-demos/brandName/AppTier/Environment/Development/LT_Data/LT.json`
- Connect to the AWS CLI in your local.
- To connect to the AWS CLI refer to this [doc](../../003-aws/004-IAM/mfa.mdx)
- If you face any issue, while connecting to the CLI, contact to the `DevOpsTeam`.
- After connecting to the AWS CLI, get the `LT.json` file from the prescribed S3 location.
  - command : `aws s3 cp aws s3 cp LT.json s3://oriserve-demos/brandName/oriNLP/Environment/Development/LT_Data/LT.json .`
- Using this `LT.json` file, create a new LaunchTemplate by using this command.
  - WEB APP:
    - command : `aws ec2 create-launch-template --launch-template-name brandName-prod-webApp-LT --version-description version1   --launch-template-data file://LT.json`
  - NLP:  
    - commad : `aws ec2 create-launch-template --launch-template-name brandName-prod-AI-LT --version-description version1   --launch-template-data file://LT.json`
