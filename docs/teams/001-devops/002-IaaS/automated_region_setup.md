---
title: Automated_region_setup
sidebar_position: 1
slug: Automated_region_setup
author: LikithVenkat
author_title: Jr.Devops Engineer @ Ori

---
- This document gives you brief understanding aboutthe  region setup, that we have done through Terraform.

- We have created the Jenkins Job to `plan and apply` the terraform script.

- While triggering the jenkins job, we need to pass some values to the script like, Cidr ranges, Names, Region e.t.c.

- First lets us see, what are the resources that are creating through terraform for region setup.

- VPC
- PUBLIC_SUBNETS
- PRIVATE_SUBNETS
- SECURITY_GROUPS
- PRIVATE_ROUTE_TABLE
- PUBLIC_ROUTE_TABLE
- INTERNET_GATEWAY
- ELASTIC_IP'S
- NAT GATEWAY'S
- S3 BUCKET
- SNS TOPICS,
- JENKINS_INSTANCE
- BASTION_INSTANCE
- OPENVPN_INSTANCE
- DNS
  - for jenkins with the domain name of `jenkins-{region_name}.oriserve.com`

## STEPS TO CREATE INFRASTRUCTURE IN A NEW REGION

- Log in to jenkins.
- Check for view `IaaS` then go the `IaaS`-> `Terraform` 
![loginview](/img/region_setup/Terraform.png)
- In the above image/location, you can find the job `Intial_new_region_setup`
- select the job and provide the necessary values that are needed to create the infra. 
![terr_1](/img/region_setup/Terr_1st.png)

![terr_2](/img/region_setup/Terr_2nd.png)

![terr_3](/img/region_setup/Terr_3.png)

- In the above images, all values are only for reference. Change those values according to the requirement.
- By default, bucket will be `manjeet-test-ori`. If you want to contact the DevOps Lead.
- Along with with `bucketName` verify and provide the value of `bucket_region` from DevOps Lead.
- The `brandName` is to differentiate your every build, and store all the files of current Build.
  - For example, bucket_name is `manjeet-test-ori` and brandName is `oriserve15`, then the path that files will be stored at `s3://manjeet-test-ori/Terraform/templates/oriserve15/Development/`.
    ![s3_path](https://destroy23.s3.amazonaws.com/s3loca.png)
    - Files, that present at this location will be used to destroy the infrastruce that created by this job in future.
- `region` option is code of region you want to create the infrastructure. This is the region-code. `NOT` region name.

- In the above reference,`region` is `ap-southeast-1`
  - `region_name` is the name of region, you want to create the infra.

- In this reference, `region_name` is `singapore`  
- For `Instance_types`,`Instance_ami's`, `Cidr_blocks` contact the DevOps Lead for confirmation.
  - In this doc,
        - Jenkins_instance_type - `t3a.micro`
        - openvpn_instance_type - `t4g.small`
        - bastion_instance_type - `t3a.micro`
    - These values are subjected to change according to the region. While selecting the type, contact the DevOps-Lead.
- While selecting the `Instance_ami's`, copy the ami from the existing region to desired region.
  - Example. copy the ami from `mumbai` to `singapore`
- While choosing the `cidr_blocks` contact to the DevOps-Lead. Make sure that cidr_blocks are not overlapping in region.
- After giving all desired & appropritate values, start the job.
- For Create apply, JenkinsAdministrator/DevOpsLead should approve.
- It will take the 40 minutes to get success the job.
- After getting SUCCESS , pem key which is required to login into instances is at `workspaces`
![pemkey](https://regionsetuo.s3.amazonaws.com/singapore_region.png)
- Verify the jenkins server by browsing the jenkins domain name : `jenkins-region_name.oriserve.com`
- Make sure, SSL also enabled.

## STEPS TO DESTROY THE CREATED INFRASTRUCTURE

:::danger

- DONT PERFORM THIS ACTION UNLESS IT IS MANDATORY
- Before triggering this action, get the strong confirmation from `DevOpsLead only`
:::
- In this section, we will see steps to destroy the created infrastructure at above.
- Log in to jenkins.
- Check for view `IaaS` then go the `IaaS`-> `Terraform`
![loginview](https://regionsetuo.s3.amazonaws.com/Terraform.png)
- In the above image/location, you can find the job `destroy_resources_terraform`
- select the job and provide the necessary values that are needed to destroy the infra.
![destroy_job](https://destroy23.s3.amazonaws.com/Destoryjob.png)
- In the above image, provide the `brandName` that you given while creating the infra.
- S3 location that specified at starting about the files storing, you will find the file `destroy_this.zip`. Mention the URI of this file in the `s3PathToDestroThisZip` field.
![final_uri](https://destroy23.s3.amazonaws.com/finalURI.png)
- After providing the all necessary values,start the build.
- For Destroy apply, JenkinsAdministrator/DevOpsLead should approve.
