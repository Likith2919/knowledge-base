---
title: Access Management
# sidebar_position: 1
slug: access_management
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

## AWS Access

AWS access is mostly restricted to the DevOps team. However, if and when someone makes and request, following needs to be considered:

- ### Console/API

  - Individual user needs to be created and must be added to ***forceMFA*** group.
  - If a new policy has to be created, it should be created in a generalized way and attached to a group.
    - The user must now be added to this group. In future if any one else requests for similar access, he/she must be added to the same group.

- ### Infrastructure

  [Access Management Repo](https://bitbucket.org/oriserve1/accessmanagement/src/v2/) will be used to track all access a user has.
  Server Access and Database access for a particular brand must be given according to the values present `users` file under `userKeys` for that particular brand.

  - Add user's Public Key is present under `allKeys` directory if not already present.
    - .key naming: ***firstName_lastName.key***
  - Append the name of the .key file to `users` file under `userKeys` directory for the project he/she needs access to.
  - If the project dir doesn't exist, consult with DevOvs team's lead before moving ahead.

  ***Note:*** Access to production infrastructure is limited only to the DevOps team.

------------

## Database Access

[Access Management Repo](https://bitbucket.org/oriserve1/accessmanagement/src/v2/) will be used to track all access a user has.
Server Access and Database access for a particular brand must be given according to the values present `users` file under `userKeys` for that particular brand.  
****Note:*** Never share root db URI with anyone.*

- ### DEV

  - Each user will have his/her own set of database credentials, if not new user must be created.
    - *Naming Convention:* ori-nipunRW
    - The user should have the ***readWrite*** role for that **brands database** only.
    - Make sure user for **admin** database isn't created by mistake.
  - These will be same across all the brands user works on.

- ### UAT/PROD

  - Access to client data bearing collections is strictly prohibited, all roles and user creation should be done with this point in mind.
    - Under situations where this cannot be avoided, approval from **DevOps Lead** and **Anurag** is required.
  - A common read-only user should be created if not already exists.
    - *Role:* **productionReadRole**
  - If under exceptional cases, someone needs write access:
    - We will create a new user for that particular case.
      - *Naming Convention:* ori-nipunRW
      - *Role:* **productionWriteRole**
      - New user should ideally be created with a specific role based on the use case, the **readWrite** role should be avoided unless absolutely necessary.
    - Share the credentials with the user.
    - Make sure to delete the user once the work is done, after 2 days otherwise.
      - This needs to be ensured at all cost. When a new user is being created on prod, create a JIRA task to remove that user to avoid confusions.

------------

## .env Sharing

- Do not share the same credentials as in the .env from S3.
- While setting up production environment, a new read only used needs to be created.
  - This user will be shared with the requestor.
- If someone asks for production/uat env(mostly ai or reporting team), the read only access should technically work, .env needs to be updated accordingly before sharing.
- If someone needs write access:
  - We will create a new user for that particular case.
  - Share the credentials with the user.
  - And make sure to delete the user once the work is done, after 2 days otherwise.

------------

## Access Revocation

When an employee leaves the following access revocation needs to be done:

- IAM user needs to removed from the *IAM* console.
- emailID needs to be deleted from the *Google Admin* console.
- Access keys form servers needs to be removed:
  - This will be done by removing user's key from [Access Management Repo](https://bitbucket.org/oriserve1/accessmanagement/src/v2/).
  - Remove `.key` file from `allKeys` dir.
  - For each item in `projects` directory.
    - Check and remove user's name from `users` file in `userKeys`.
    - Check and remove user credentials from the corresponding database server.

------------
------------
