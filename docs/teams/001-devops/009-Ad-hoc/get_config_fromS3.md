---
title: GetConfigfromS3
# sidebar_position: 1
slug: S3Config
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---
- This doc explains about how to get any `env` file from S3.
- To understand the overall S3 structure, refer this [Doc](/docs/teams/devops/aws/S3/S3Config)
- In every service, there will be environments -- `Development/Testing/Production`.
- For example, you need to access the `OCS` env, then path would be like

    `bucket-name/brand-name/service/Environment`

- `s3://oriserve-demos/air-arabia/AppTier/Environment/Development/env`
- If you need to access the env of `Dashboard`, then path would be like

    `bucket-name/brand-name/service/Environment/`

- `s3://oriserve-demos/air-arabia/WebTier/Environment/Development/Dashboard/env`

![brandstructure](/img/asset_upload/s3structure.png)