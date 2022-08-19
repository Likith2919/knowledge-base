---
title: sunset
# sidebar_position: 1
slug: sunset
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---
:::danger

- DONT PERFORM THIS ACTIONS UNLESS IT IS MANDATORY
- Get the strong confirmation from the `DevOPs Lead`
:::

- This doc explains about the sunset operation.
- sunset of a server is to `plan to intentionally remove or discontinue it`.
- There are two types of sunset.
  - `Hard sunset` : Where the server or feature will completely terminated after taking the backup.
  - `Soft sunset` : Where the server or feature will be stopped rather than terminating.

## single_stack

### common_steps

- These are the common steps need to perform for both `soft` and `hard` sunset.
- single stack contains the `Fullstack` and `devAI` servers.
- The sunset process for single_stack refers to the
  - Login to the `Fullstack` server of respective brand.
    - Take the backup of the existing data from the mongodB container
    - create a directory `db-backup` on home directory.
    - Copy the content of the database into the newly created folder for backup `db-backup`.
    - Now, copy the content of the `db-backup` folder to the `s3://ori-db-backup/brand_name/Backup/database/Development/oriserveDemoDB/` (change the brand_name as per the requirement.)
- You can use the below script for taking the backup of the database and copy to the S3 bucket.

 ```shell
 #!/bin/bash
echo "Please enter DB service type : "
read -rp "Default[docker] : " dbServiceType
[[ -z ${dbServiceType}  ]] && dbServiceType="docker"
echo "Please enter DB name : "
read -rp "Default[oriserveDemoDB] : " DBName
[[ -z ${DBName}  ]] && DBName="oriserveDemoDB"
echo "Please enter DB user : "
read -rp "Default[dbOwner] : " DBuser
[[ -z ${DBuser} ]] && DBuser="dbOwner"
echo "Please enter DB user's password : "
read -rp "Default[oriSaaSdemo1092] : " DBuserpass
[[ -z ${DBuserpass} ]] && DBuserpass="oriSaaSdemo1092"
echo "Please enter S3BucketName to upload backed up DB : "
read -rp "Default[ori-db-backup] : " S3BucketName
[[ -z ${S3BucketName} ]] && S3BucketName="ori-db-backup"
echo "Please enter ProjectName : "
read ProjectName
echo "Please enter Environment : "
read -rp  "Default[Development] : " Environment
[[ -z ${Environment} ]] && Environment="Development"
#echo "${Development} ${DBName} ${DBuser} ${DBuserpass} ${S3BucketName} "
############ BackupDB ############################################
sudo mkdir -p /backupDB
cd /backupDB
if [[ ${dbServiceType} = 'docker' ]]; then
    ############### DOCKER ###################
    #mongodump -d ${DBName} -h 127.0.0.1:27017 -u ${DBuser} -p ${DBuserpass} --authenticationDatabase ${DBName} --gzip -o ./
    docker exec mongoDB mongodump -d ${DBName} -h 127.0.0.1:27017 -u ${DBuser} -p ${DBuserpass} --authenticationDatabase ${DBName} --gzip -o ./
    [ "$?" -eq 0 ] && sudo docker cp mongoDB:/${DBName} /backupDB/${DBName}  || exit 1
    [ "$?" -eq 0 ] && (docker exec mongoDB [ -d "/${DBName}"  ]  && (echo "dump dir exists in container" && exit 0) || (echo "dump dir doesn't exist" && exit 1)) || exit 1
    [ "$?" -eq 0 ] && (docker exec mongoDB rm -rf /${DBName} && echo "dump dir removed from container" || echo "unable to remove dump dir from container")
    ############### DOCKER ###################
else
    ############### SERVICE ###################
    mongodump -d ${DBName} -h 127.0.0.1:27017 -u ${DBuser} -p ${DBuserpass} --authenticationDatabase ${DBName} --gzip -o ./
    ############### SERVICE ###################
fi
#################### UploadtoS3 #####################################
[ "$?" -eq 0 ] && echo uploading to s3
aws s3 cp /backupDB/${DBName} s3://${S3BucketName}/${ProjectName}/Backup/database/${Environment}/${DBName}/ --recursive
#aws s3 cp /backupDB/${DBName} s3://${S3BucketName}/${ProjectName}/Backup/database/${Environment}/${DBName}/ --recursive --storage-class GLACIER
echo removing local backup directory
sudo rm -rf /backupDB
 ```

- Run the script with `sudo` privilages.
- While running the script you need to provide some details like `DBname`, `DB user`, `DB user's password`, `s3bucketName`, `projectname/brandName`, `Environment`.

#### JENKINS_JOBS_BACKUP

- Now, we need to take the backup of the respective brand jobs.
- Login to the `jenkins` server.
  - Go to the location `/var/lib/jenkins/`.
  - check for the backup folder. If it is not there create a directory `jobBackup`.
  - Create a new folder for the brand_backup `brandName_jobs` inside the `jobBackup`
  - Switch to jenkins user `sudo su jenkins`
  - Let's say brandName is `tata_capital` create a directory named `dev_tata_capital_jobs`
  - Copy the all jobs of `tata_capital` to the `tata_capital_jobs` directory.
    - command : `cp -a /var/lib/jenkins/jobs/dev_tata-capital_* /var/lib/jenkins/jobBackup/dev_tata_capital_jobs/`
- Now, you have taken backup of all jobs of required brand.
- Zip the folder `tata_capital_jobs`
  - command : `zip -r tata_capital_devjobs.zip dev_tata_capital_jobs`
- You will find a folder in s3 under the respective brand `backup`
- Upload this zip folder to the location `s3://oriserve-demos/tata-capital/Backup/Environment/Development/Jenkins/`
- Replace the Environment according to the requirement.
  ![backup](/img/sunset/backup.png)
- Disable the respective jenkins jobs.
  
![disable_jobs](/img/sunset/tata-capita.png)

#### PNG_DASHBOARD

- After deleting all the resources,
- Login to the [grafana](https://pmg.oriserve.com/grafana/)
- Whenever you opened the Grafana, click on the  `General`, top left.
- Search the brand you want to delete.
  ![PNG_search](/img/sunset/air_arabia_PNG.png)
- Search for the respective dashboard, here incase `air-arabia` dashboard. You can see in below image reference.
- Delete all the monitoring dahsboards. Below image is for only ref.
- Click on the specification you want to delete, click on the `Remove` and confirm the removal.
- Delete all the dashboards under repective brand.
![PMG_DELTE](/img/sunset/PNG_delete.png)

### soft

- After successfully taking the backup,
- Enable the `TerminationProtection`.
  - Go to `Actions` --> `Instance settings` --> `Change instance termination protection` and select `enable`.

![temination_protection](/img/sunset/instance_protection.png)

- Stop the `Fullstack`, `AI` instances as below.
  - Go to `Instance state` --> `Stop Instance`
  
  - ![instance_stop](/img/sunset/Stop_instance.png)

### hard

- If the stack is created through `cloudformation` , delete the stack through cloudformation only.Below image is for reference.
- Go to the AWS console and search for the `cloudformation` service.
- Search for the required brand. Let's say `Baja-thai`

![stack_delete](/img/sunset/CF_dev.png)

- If the stack is created manually, delete the instances manually.
- Archive (move) the  deleted brands to the `Archieved/` folder in the `oriserve-demos` bucket.

## multi_stack

### common

- These are common steps need to perform for both `soft` and `hard` sunset.
- Multistack contains the `Utility`, `NLP` , `Webapp`, `dB` servers.
- `Hard sunset` refers to the terminating the `Utility`, `NLP` , `Webapp`, `dB` servers after taking the backup of the database.
- `soft sunset` refers to the stopping the `Utility`, `NLP` , `Webapp`, `dB` servers after taking the backup of the database
- The sunset process for multistack refers to the
  - Login to the `DB` server.
    - Take the  backup of the existing mongodB container.
    - For sunset operation, we have a script.
    - create a directory `db-backup` on home directory.
    - For script, Please refer the above script. script is same for single stack and multistack.
    - Run the script with `sudo` privilage.
    - While running the script you need to provide some details like `DBname`, `DB user`, `DB user's password`, `s3bucketName`, `projectname/brandName`, `Environment`.

#### JENKINS_JOB_BACKUP

- After successfully taking the backup of the database, take the jenkins_job backup refer the [jenkins_job_backup](./sunset.md#jenkins-jobs-backup)

#### PNG_DASHBOARD

- After deleting all the resources,
- Login to the [grafana](https://pngdash.oriserve.com/grafana/)
- Whenever you opened the Grafana, click on the  `General`, top left.
- Search the brand you want to delete.
  ![PNG_search](/img/sunset/air_arabia_search.png)
- Search for the respective dashboard, here incase `air-arabia` dashboard. You can see in below image reference.
- Delete all the monitoring dahsboards. Below image is for only ref.
- Click on the specification you want to delete, click on the `Remove` and confirm the removal.
- Delete all the dashboards under repective brand.
![PMG_DELTE](/img/sunset/PNG_prod.png)

### soft_sunset

- After successfully taking the backup,
  - Enable the `TerminationProtection`.
  - Go to `Actions` --> `Instance settings` -->  `Change instance termination protection` and select `enable`.

    ![temination_protection](/img/sunset/instance_protection.png)
  - Stop the `Utility`, `dB` instances. `webApp` and `AI` servers will be done by `ASG` which is explained below.
  
![instance_stop](/img/sunset/Stop_instance.png)

- Delete the `Webapp`, `AI` load balancers, by enabling the Deletion protection (if it is not enabled.)
  - Load_balancers naming will be `brandName-prod-ai-ALB` , `brandName-prod-webApp-ALB`
  - Here, `bajaj-thai-prod-ai-ALB`, `brandName-prod-webApp-ALB`
![Load_balancer_delete_protection](/img/sunset/LB_delete.png)
- For Webapp and NLP, update the autoscaling configuration with Desired,minimum and maximum capacity as zero. So that, it will automatically delete the respective instances.
  - AutoscalingGroups naming will be `brandName-prod-AI-ASG`, `brandName-prod-webApp-ASG`
  - Here, `bajaj-thai-prod-AI-ASG`, `bajaj-thai-prod-webApp-ASG`

![ASG](/img/sunset/ASG.png)

### hard_sunset

- If the stack is created through `cloudformation` , delete the stack through cloudformation only.Below image is only for reference.

![stack_delete](/img/sunset/CF_prod.png)

- If the stack is created manually, delete the instances manually.

- Delete the load balancer,by enabling the deletion_protection.
  - Select the load balancer.
  - on the `Description` tab, choose `Edit attributes`
  - On the `Edit loab balancer attributes` page, select `Enable` for `Deletion Protection`, and then choose `Save`.
![lb_delete](/img/sunset/LB_delete.png)

#### Launch_Template_Backup

- We use LaunchTemplates for 2 services.
  - `Webapp` and `NLP`
- We need to take the backup of the launchtemplate data from  `NLP` and `WebApp` LaunchTemplates.
  - command : `aws ec2 describe-launch-template-versions --versions '$Latest'  --launch-template-id <--launchtemplate-Id-->  --query "LaunchTemplateVersions[*].LaunchTemplateData" > LT.json`
- It will save the launchtemplate data of the latest version into the `LT.json` file.
- Upload this LaunchTemplate backup file into S3. Location will be as follows.
  - For NLP : `s3://oriserve-demos/brandName/oriNLP/Environment/Development/LT_Data/`
    - Command : `aws s3 cp LT.json s3://oriserve-demos/brandName/oriNLP/Environment/Development/LT_Data/`
  - For Webapp : `s3://oriserve-demos/brandName/AppTier/Environment/Development/LT_Data/`
    - Command : `aws s3 cp LT.json s3://oriserve-demos/brandName/AppTier/Environment/Development/LT_Data/`
