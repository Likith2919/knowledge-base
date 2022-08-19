---
title: Configure Live Chat Constants
sidebar_position: 1
slug: configure_LiveChats_Constants
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to configure Constants at Database Level.

1. Add the **constants** object in the respective document in BrandSpecifiedValues collection. Then add the desired field inside the object. If the **constants** object is already present, just add the field.
    - Eg:  "constants" : {  
                           "JCR_TIMEOUT": 3000,  
                           "DISCONNECT_TIMEOUT": 18000    
                         }
    - Here, JCR_TIMEOUT and DISCONNECT_TIMEOUT are the constant fields.

2. In the bsvConstants.js file in ocs, add the constant in the same fashion (as done already in the file), in constantValues object.
    - **IMP:** The edge case should also be handled if value is not present in database.
    - Eg: constantValues['JCR_TIMEOUT'] = constants ? constants.JCR_TIMEOUT ? constants.JCR_TIMEOUT : 3000 : 3000;

3. Require the bsvConstants in the file in which the constant is to be used.
    - Eg: let JCR_TIMEOUT;  
          require('../helpers/bsvConstants').then(async(constantValues) => {
              JCR_TIMEOUT = constantValues.JCR_TIMEOUT;  
          })

4. If the constant was already imported from the file constants.js, remove it from the imports in the file. This will make sure that the particular constant's value is no longer taken from constants.js.