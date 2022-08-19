---
title: Bitbucket - branch permission policy
# sidebar_position: 1
slug: bitbucket_branch_policy
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---


## Scope

Currently applicable on the below branches.

1. *[ori-communication-service](https://bitbucket.org/oriserve1/ori-communication-service)*
2. *[brand-files](https://bitbucket.org/oriserve1/brand-files)*
3. *[chatbot-2.0](https://bitbucket.org/oriserve1/chatbot-2.0)*
4. *[chatbot-dashboard-2.0](https://bitbucket.org/oriserve1/chatbot-dashboard-2.0)*
5. *[chatbot-dashboard](https://bitbucket.org/oriserve1/chatbot-dashboard)*
6. *[scheduler](https://bitbucket.org/oriserve1/scheduler)*
7. *[user_management](https://bitbucket.org/oriserve1/user_management)*
8. *[email-communication-services](https://bitbucket.org/oriserve1/email-communication-services)*

## Pre-Requisites

Need to have a branch naming convention for each repository as, as permission can only be applied on a specific name/pattern.

1. *[ori-communication-service](https://bitbucket.org/oriserve1/ori-communication-service)*
   - **Main | Development**: `product-testFinal1`
   - **Brand specific(current)**: `brand-name_product-testFinal1`
   - **Brand specific**: `brand-name-environment-master`
2. *[brand-files](https://bitbucket.org/oriserve1/brand-files)*
   - **Development**: `brand-name-dev`
   - **UAT**: `brand-name-uat`
   - **Production**: `brand-name-prod`
3. *[chatbot-2.0](https://bitbucket.org/oriserve1/chatbot-2.0)*
   - **Development**: `brand-name-development-master`
   - **UAT**: `brand-name-uat-master`
   - **Production**: `brand-name-production-master`
4. *[chatbot-dashboard-2.0](https://bitbucket.org/oriserve1/chatbot-dashboard-2.0)*
   - **Development**: `brand-name-development-master`
   - **UAT**: `brand-name-uat-master`
   - **Production**: `brand-name-production-master`
5. *[chatbot-dashboard](https://bitbucket.org/oriserve1/chatbot-dashboard)*
   - **Development**: `brand-name-development-master`
   - **UAT**: `brand-name-uat-master`
   - **Production**: `brand-name-production-master`
6. *[scheduler](https://bitbucket.org/oriserve1/scheduler)*
   - **Development/Production** : `agent-routing`
7. *[user_management](https://bitbucket.org/oriserve1/user_management)*
   - **Development/Production** : `master`
8. *[email-communication-services](https://bitbucket.org/oriserve1/email-communication-services)*
   - **Development**: `brand-name-development-master`
   - **UAT**: `brand-name-uat-master`
   - **Production**: `brand-name-production-master`

----

## Branch Permissions

A branch permission policy will be majorly divided in five parts:

1. Ability to **directly push code** to the branch.
   - This is **required** to create new branches for the patterns on which the policy will be applied.
2. Ability to **merge** via **pull requests**.
3. Defined **minimum approvals required** to allow a pull request to be merged w.r.t. 2nd point.
4. Defined **minimum default approvals required** to allow a pull request to be merged w.r.t. 2nd point.
   - Default **reviewers** for a repository, who's **approval** will also count towards the defined **minimum default approvals required**.
   - These users will always be added as reviewers on a PR.
5. Ability to **delete** a branch.

Furthermore, access groups will be classified using the standard linux permission model.

1. ***Owner(s)***: The owner of the repository. This will be Anurag in most cases. The user(s) who solely manage a particular repository can also be included as owners. For example: Vivek for chatbot-2.0 and chatbot-dashboard-2.0
2. ***Group(s)***: [See below](./bitbucket_branch_policy#groups)
3. ***Other(s)***: All other users

## Groups

1. **Administrators:**
   - *Members:* Anurag, Nipun.
   - *Access:* Admin all repositories and all over bitbucket Admin.
2. **DevOps:**
   - *Members:* Nipun, Manjeet
   - *Access:*
     - *Read/Write:* brand-files, ori-communication-service, scheduler, user_management, chatbot-dashboard, chatbot-dashboard-2.0, chatbot-2.0, KnowledgeBase, accessManagement
3. **Leads:**
   - *Members:* Tanuj, Shivansh, Luv, Vivek, Palash, Saddam, Ajay, Nipun, Shivanshu, Harshit
   - *Access:*
      - *Read/Write:* brand-files, ori-communication-service, scheduler, user_management, chatbot-dashboard, chatbot-dashboard-2.0, chatbot-2.0, chatbot-message-types, email-dashboard, chatbot, KnowledgeBase
4. **Frontend:**
   - *Members:* All FE team members.
   - *Access:*
      - *Write:* chatbot-dashboard, chatbot-dashboard-2.0, chatbot-2.0, chatbot-message-types, email-dashboard, chatbot, KnowledgeBase
      - *Read:* N/A
5. **Backend:**
   - *Members:* All BE team members.
   - *Access:*
      - *Write:* brand-files, ori-communication-service, scheduler, user_management, KnowledgeBase
      - *Read:* chatbot-dashboard, chatbot-dashboard-2.0, chatbot-2.0, chatbot-message-types
6. **AI:**
   - *Members:* All AI team members.
   - *Access:*
      - *Write:*
      - *Read:*
7. **Brand-name_team:**
   - *Members:* Resources working on a particular assigned brand/project.
   - *Access:* *All members will also be subscribed to the Backend group and thus will inherit all permissions.*
      - *Write:* Inherited(Backend)
      - *Read:* brand-files + Inherited(Backend)

## Branching Model

1. ***[user_management](https://bitbucket.org/oriserve1/user_management)***
   - Single branch named `master` is deployed for all brands. Here and after referred to as the **main** branch for this repository.
   - Permissions will be applied to the `master` branch name/pattern.
   - Owner(s):
     - Anurag
   - Group(s):
     - Leads
     - Backend

2. ***[scheduler](https://bitbucket.org/oriserve1/scheduler)***
   - Single branch named `agent_routing` is deployed for all brands. Here and after referred to as the **main** branch for this repository.
   - Permissions will be applied to the 'agent_routing' branch name/pattern.
   - Owner(s):
     - Anurag
   - Group(s):
     - Leads
     - Backend

3. ***[ori-communication-service](https://bitbucket.org/oriserve1/ori-communication-service)***
   - Multiple brand specific branches. `product-testFinal1` is the **main** **development** branch.
   - Permissions will be applied to `*_product-testFinal1` pattern. Going forward all product branches will have to be created keeping this naming convention in mind.
   - Other than this, for existing branches permissions will be added on all existing branches:
     - ocs-prod
     - ocs-uat
     - tatasky_product-testFinal1
     - apparel_product-testFinal1
     - Ikea_product-testFinal1
     - Dish_product-testFinal1
     - vi-neo-prod
     - vi-neo-dev
     - These branches along with the *pattern* mentioned in second point, will be referred to as **main** branches for this repository.
   - Owner(s):
     - Anurag
   - Group(s):
     - Leads
     - Backend

4. ***[brand-files](https://bitbucket.org/oriserve1/brand-files)***
   - Brand and environment specific branches. ‘master’ is the **main** branch.
   - Permissions will be applied to patterns:
     - `brand-name-uat`
     - `brand-name-prod`
   - Owner(s):
     - Anurag
   - Group(s):
     - Leads
     - Brand-name_team

5. ***[email-communication-services](https://bitbucket.org/oriserve1/email-communication-services)***
   - Multiple brand specific branches. ‘vil-development-master’ is currently the **main** **development** branch.
   - Permissions will be applied patterns:
     - `*-development-master`
     - `*-uat-master`
     - `*-production-master`
     - Going forward all product branches will have to be created keeping this naming convention in mind.
   - Owner(s):
     - Anurag
   - Group(s):
   - Leads
   - Backend

## Policy

Based on above branch permissions we can have the following policies:

1. ### [user_management](https://bitbucket.org/oriserve1/user_management)/[scheduler](https://bitbucket.org/oriserve1/scheduler)

   - Direct **push** to **main branch**: `none`
   - Merge via pull requests
     - **Group(s)**: `Backend, Leads`
   - Minimum approvals required: `2`
   - Minimum approvals required by **default reviewers**: `1`
   - Default reviewers:
     - **User(s)**: `Luv, Ajay, Tanuj, Shivansh, Anurag, Shivanshu, Harshit.`
   - Ability to delete the **main branch**: *none*

2. ### [ori-communication-service](https://bitbucket.org/oriserve1/ori-communication-service)

   - Direct **push** to **main branches**:
     - **Groups(s**): `DevOps`
   - Merge via pull requests:
     - **Group(s)**: `Backend, Leads`
   - Minimum approvals required: `1`
   - Minimum approvals required by **default reviewers**: `1`
   - Default reviewers:
     - **User(s)**: `Luv, Ajay, Tanuj, Shivansh, Anurag, Shivanshu, Harshit.`
   - Ability to delete the **main branches**: `none`

3. ### [brand-files](https://bitbucket.org/oriserve1/brand-files)

   - Direct **push** to **main branches** will be based on environment:
     - Dev: `N/A`
     - Uat/Prod:
       - **Groups(s**): `DevOps`
   - Merge via pull requests:
     - **Group(s)**: `brand-name_team, Leads`
   - Minimum approvals required: `1`
   - Minimum approvals required by **default reviewers**: `0`
   - Default reviewers: `N/A`
   - Ability to delete the **main branches**: `none`

4. ### [email-communication-services](https://bitbucket.org/oriserve1/email-communication-services)

   - Direct **push** to **main branches**:
     - Dev:
       - **Users(s)**: `Harshit`
     - Uat/Prod:
       - **Groups(s)**: `DevOps`
   - Merge via pull requests:
     - **Group(s)**: `Backend, Leads`
   - Minimum approvals required: `1`
   - Minimum approvals required by **default reviewers**: `1`
   - Default reviewers:
     - **User(s)**: `Harshit`
   - Ability to delete the **main branches**: `none`
