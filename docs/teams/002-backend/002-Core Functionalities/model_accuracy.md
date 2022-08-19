---
title: Model Accuracy
sidebar_position: 2
slug: model_accuracy
author: Divyansh 
author_title: Software Developer @ Ori

---


The doc covers how to configure the Model Accuracy functionality.

- **Fields in BrandSpecifiedValues** :
    ```javascript
    "modelAccuracyFilters": [
        {
            "label": "Reviewed",
            "value": "review"
        },
        {
            "label": "Utterances",
            "value": "utterance"
        },
        {
            "label": "ShortName",
            "value": "shortName"
        }
    ] 
    ```
    ```javascript
    "modelAccuracyReviewsInterval": NumberInt(7)
    ```

- **Fields in Scheduler env to get ModelAccuracy Report on Slack**
    - modelAccuracyToSlack = true
    - chatReviewDays = 2
    - modelAccuracy_channelId

- **To get prod Model Accuracy results on Dev Dashboard**
    - modelAccuracyUrl
    - put the prod server url in this field in env.

- **Note**:
    - In the modelAccuracyFilters array, put the desired labels and values.
    - chatReviewDays should be less than or equal to modelAccuracyReviewsInterval.
    - modelAccuracy_channelId should be the id of the slack channel to which the report needs to be transported.
