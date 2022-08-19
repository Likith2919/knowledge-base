---
title: Concurrent Logins
sidebar_position: 3
slug: concurrent_logins
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to restrict the number of logins for all the users for a specific brand. The functionality can be enabled and disabled using a flag in BrandSpecifiedValues collection for a specific brand.

- **Field in BrandSpecifiedValues** :
    ```javascript
    "CONCURRENT_LOGINS" : {
        "CONCURRENT_LOGINS_CAPPING" : true,
        "CONCURRENT_LOGINS_CAPPING_LIMIT" : 2
    }
    ```

- **Note**:
    - If the key CONCURRENT_LOGINS is not present in the database in Brand Specified Values collection in the required document, all the users on dashboard can login as many number of times.
    - If the key CONCURRENT_LOGINS is an empty object, all the users on dashboard can login as many number of times.
    - If the key CONCURRENT_LOGINS_CAPPING in CONCURRENT_LOGINS is set to false or this does not exist, all the users on dashboard can login as many number of times.
    - If the key CONCURRENT_LOGINS_CAPPING in CONCURRENT_LOGINS is set to true and CONCURRENT_LOGINS_CAPPING_LIMIT is not present in the object CONCURRENT_LOGINS, CONCURRENT_LOGINS_CAPPING_LIMIT will be taken as 3 (default value) and a user can login at maximum 3 instances at the any point of time.
    - The key, CONCURRENT_LOGINS_CAPPING_LIMIT in CONCURRENT_LOGINS is used to set the number of maximum logins at any point of time.
