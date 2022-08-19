---
title: NLP model
# sidebar_position: 1
slug: AI
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---
- This doc explains about the S3 bucket structure used for NLP service.
- we use `oriserve-dev-nlp` bucket to store the NLP files.
- Below, you can see the bucket and its content (Brands).
- These brand names are dynamic, which are subjected to change based on `model trainings` that mentioned below.
![nlp_bucket](/img/NLP_bucket/NLP_bucket.png)
- In brand folders, it contains their NLP models.
- Inside every brand, there will be three environments - `dev`, `uat`, `prod`
- For every brand, there will be different models are used.
  - `classifier_models`: this model is used by most of the brands.
  - `MUSE_dual`, `spellchecker`: these models are specific to the brand.
    ![air_arabia_nlp](/img/NLP_bucket/NLP_airarabia.png)
    - In the `air-arabia` brand you can find the model `subtheme_models` and `classifier_models`.
    ![tata_sky](/img/NLP_bucket/NLP_tatasky.png)
    - In the `tata-sky` brand, you can find the models `classifier_models/` and `NER_models`
    ![vodafone](/img/NLP_bucket/NLP_Vodafone.png)
    - For the `vodafone` brand, you can find the models `classifier_models/` and `MUSE_dual`.
    - To confirm the which models are using for the specific brand, you can get confirmation from the `AI-team`.
- When the developers train the model, the respective files will be stored in Dev environment.
- DevOps person have to perform data migration from `dev` to `uat` or `prod` according on the request/requirement.
- To do this data migration, a jenkins job has configured.
  - For example, we got a request for `dt ai model from dev to prod` for `air-arabia` brand.
  - Log into jenkins.
    - Check for view `air-arabia` then go to `air-arabia`. take below image for reference.

    ![air_arabia](/img/NLP_bucket/air_arabia.png)

    - In the above,image you will find the job `publish_air-arabia_dev_to_prod_ai`.
      - The trained dev model will store in dev folder in s3 bucket (as we seen in starting of doc). This job will publish the dev model to prod.
        - After successfully publishing onto the prod, It has a downstream job `prod_air-arabia_nlp`, which will deploy the prod model onto the prod AI server.
        ![down_stream](/img/NLP_bucket/prod_nlp.png)
        - After success of this job, we have downstream project `prod_air-arabia_nlp`.
        - Where,`prod_air-arabia_nlp` will deploy the latest model on prod servers.
    - Select the respective job and start build.
    - After the job getting success, Verify that NLP model are migrated from dev to prod.
