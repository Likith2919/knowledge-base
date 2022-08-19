---
title: Automated Dev Stack Creation.
sidebar_position: 1
slug: dev_stack_creation
author: Manjeet 
author_title: Devops Engineer @ Ori

---


The docs cover automated dev stack creation using cloudformation. We have setup jenkins pipeline to deploy a new stack. In this stack generally 2 server will be created.

- FullStack Server.
- AI Server

  - In FullStack server 5 services will be deployed i.e [ocs, scheduler, users, chatbot, dashboard].
  - In AI server nlp service will be deployed. i.e [gunicorn]

### Automated Steps using jenkins pipeline

- Log into the jenkins.
- Check for view `IaaS` then go the `IaaS` -> `dev_SingleStack_deployment` -> jobs.
- Here are the all jobs which we used to create a stack. Below screenshot for your reference.
  - ![img2](/img/Iaas/Selection_082.png)
- There will be a master job `IaaS_trigger_cloud_formation_stack_creation` only this you have to use to create a stack. other jobs are triggered with this job like jenkins deployment job creation & png dash creation etc.

- Open the job and enter the required parameters and build the job. Below screenshot for the better understanding of job.

     ***please don't change default values of any parameters until it's not necessary***
  - ![img3](/img/Iaas/Selection_090.png)
  - ![img4](/img/Iaas/Selection_091.png)
  - ![img5](/img/Iaas/Selection_092.png)
  - ![img6](/img/Iaas/Selection_093.png)
  - ![img7](/img/Iaas/Selection_094.png)
  - ![img8](/img/Iaas/Selection_095.png)
  
- After the job succeeds, all stack details will go on defined slack channel in the job.
- Also please verify with the chatbot and dashboard urls that all are working fine or not. Make extra sure that the backend URLs of both chatbot and dashboard are correctly configured.
  - For this launch the Chatbot/Dashboard URL
  - Using chrome dev tools inspect the page
    - Go to the **network tab** and filter for only **WS** requests.
    - You'll notice a few WS requests there, if you don't, click on the chatbot or reload the page once.
    - Hover on that request on you'll get the full URL, make sure that URL should be the configured backend URL for that brand.
    - Here's a screenshot for reference. This shows only for chatbot, same has to be done for dashboard as well.
    - ![img10](/img/Iaas/check_be_url.png)

- Do chat with the chatbot with msg `The Devil` & chatbot should be responsive. it means reply coming from nlp server and nlp server are working fine as well and then check with login in dashboard that are working fine.
- After that check in access management repo there will be a PR which created during stack creation from branch name like `tmp/dir_add_brandName`.
- This PR will be approved and merged by devops lead.
- After merged with tha main branch then run git pull to update your branch in your local system then add required users access in the folder and push into the branch and run the required accessmanagement job in jenkins.
- After that create a brand parameter in aws parameter store and add the db details here. you can take reference from any other brands parameter as well.
- Now all good [Congratulations](https://media.giphy.com/media/2xIOiAPXonois/giphy.gif) on your success.

***Note***

- Please use this [link](https://passwordsgenerator.net/plus/) to generate a strong password for the parameter `cf_dbUserPassword`.
- Password generator settings should be as in the below image. this will have to be done once per browser after that it will save in browser cache.
- ![img9](/img/Iaas/Selection_083.png)

## Troubleshooting

Below are the Steps to debugging the errors in stacks.

- if job fails in any step then first check console logs of job and analyse the issue.
- If job fails in stack validation and any other syntax error the check the console logs & analyse the issue & fix it.
- If job fails in stack creation then check cloudformation console logs and analyse the issue & fix it. Here are the cloudformation console link [Cloudformation Console](https://ap-south-1.console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks?filteringStatus=active&filteringText=&viewNested=true&hideStacks=false)
- Check for your brandName stack in cloudformation console and go to events and resources of stack to check the errors.
