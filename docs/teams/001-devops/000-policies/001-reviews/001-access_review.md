---
title: Access Review
# sidebar_position: 1
slug: access_review
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

## Monthly IAM Review

Check for unused roles and users from the IAM console. Individual user permissions needs to be verified and if required modified following the principal of least privilege.
This will be triggered on a monthly basis .via JIRA automated task. The task will be assigned to the lead of **DEV-OPS(DO)** project.

- Open the IAM console
- Go to users
- For all users, check the ***Access Advisor*** tab.
  - ![iam](/img/aws/iam.png)
- Check the *Last Accessed* column for the latest activity.
  - If *Last Accessed* is older than 2 month:
    - Ask the user if that access is still needed, if access isn't needed now or in the near future, add the user in the *DisabledUsersRoles* group.
    - If the user has left the organization, remove the user.
  - If *Last Accessed* us older than 3 months:
    - Add the user in the *DisabledUsersRoles* group.
    - Inform the user that the access has been revoked. If they need it in the future, they need to request again.

## IAM Access Key Rotation

All existing user access keys needs to be review and rotated every 90 days. This will be triggered .via JIRA automated task. The task will be assigned to the lead of **DEV-OPS(DO)** project.
Task should be further divided into DEV-OPS team. Each task should be updated with comments and action taken(if any). Furthermore, subtasks for making a key inactive and finally roving old keys should be created after the task is done.

- Create a new task for the list of users you'll be taking action on.
- Open the IAM console
- Go to users
- Check the ***Access key age*** column for each user.
- Can be safely ignored if access key age is under 90 days.
- When access key age is greater than 90 days:
  - If the user is an individual
    - Create a new access key and share the details with the user
      - Open user profile, navigate to the ***Security credentials*** tab.
      - Under *Access keys*, click *Create access key*.
    - Ask them to update their local creds/env and verify access once.
  - If the user is used in pragmatic calls, either in application of any onPrem server.
    - Create a new access key and find out where the key is being used.
      - You can find brief about the key usage in ***Tags*** tab.
      - You can also check the ***Access Advisor*** tab to get info on which service used the key and when.
        - ![iam](/img/aws/iam.png)
    - Once you've found the usage of key, update the respective credentials.
  - Create a sub-task, **make-inactive** enlisting all the keys you took action on.
    - Review the keys once a day, note the date in *Last used* column.
      - ![lastused](/img/aws/last_used.png)
      - If it's changing that means, key is still being used somewhere find it out.
      - If not, make sure the date in *Last used* column for the previous key is at least 2 weeks old. Once it is, click *Make inactive*, to well make the key inactive.
        - ![lastused](/img/aws/last_used_inactive.png)
  - Create a sub-task, **remove-old-keys** enlisting all the keys you made inactive.
    - Check after 1 week, if no issue has been notices or reported, remove the key.

**NOTE:** Make sure no access key's age is more than 180 days.

## Access Management Review

Check for unnecessary or unauthorized access of an employees. All existing members access needs to be review in accessmanagement repository. During the review, Please check of employees for change in position and employee termination.

- In user access review check access rights and privileges.
- Do a monthly review of access rights for all of an organization’s employees with co-ordination of HR.
- If an employee recently changed their position, acquired new responsibilities then we will update access acc to their requirements.
- If an employee left the company then we will remove their keys and access from repo & respective brand folders.

**NOTE:** Make sure you have removed keys and access from repository and respective brand folders.

## Bitbucket Repository Review

Check for unnecessary or outdated users and groups permissions. All existing members' access needs to be review. During the review, check user accounts of employees who recently changed their position or left the company.

- Do a monthly review of access rights for all of an organization’s employees with co-ordination of HR.
- Go to bitbucket users and groups console then check unnecessary or outdated access rights and privileges.
- If an employee recently changed their position, acquired new responsibilities then we will update access acc to their requirements.
- If an employee left the company then we will delete their account from bitbucket.
- Below are the links of users and group consoles.
- **[Userslink](https://bitbucket.org/oriserve1/workspace/settings/plan-users)**
- **[GroupsLink](https://bitbucket.org/oriserve1/workspace/settings/groups)**
