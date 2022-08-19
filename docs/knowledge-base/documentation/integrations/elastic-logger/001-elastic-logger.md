---
# sidebar_position: 1
slug: elastic-logger
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
tags: [documentation, integration]
---

# Elastic Logger

![npm (scoped)](https://img.shields.io/npm/v/@niccsj/elastic-logger)
![npm bundle size (scoped)](https://img.shields.io/bundlephobia/min/@niccsj/elastic-logger)

## Brief

This integration allows *detailed visualization and analysis* of the JavaScript applicaiton.

## Links

- [Kibana](https://elk.oriserve.com/kibana)
- For complete details on the package and it's features checkout the **[GitHub's](https://github.com/NiccsJ/elastic-logger)** README.md.
- [NPM](https://npmjs.com/package/@niccsj/elastic-logger) package.

## Integration

If you're product branch was checked out after [this](https://bitbucket.org/oriserve1/ori-communication-service/commits/45c0a54d1436fd5a617affe7f1d0af826d446493) commit of *`product-testFinal1`*, then the elastic-logger is already integrated within the code and you just have to *[enable](./elastic-logger#enabling)* it.

If the integration is not available in the product branch, review the the chanegs from *this [commit](https://bitbucket.org/oriserve1/ori-communication-service/commits/7859e8b8f8ba2b9fed3d803ffeaa004ec04b5db9?at=elasticLogger_tagv2.0.0)* to the *[this](https://bitbucket.org/oriserve1/ori-communication-service/commits/7859e8b8f8ba2b9fed3d803ffeaa004ec04b5db9?at=elasticLogger_tagv2.0.0)*, on the feature branch to see what's added.

### Enabling

you just have to add the following *`env`* varibale to the projects *[.env](./../../ocs/env)* file to enable the elastic-logger.

### .env additions

```shell
#======== elk config =======#

#micro service name for elk
MS_NAME="ocs"
CS_ENV="dev"
elasticEnv="dev"

#enable/disable elastic-loggers
exportLogs=true
exportAccessLogs=true
outGoingApiLogger=true

##for prod vpc
elasticUrl='https://10.0.48.196:9200,https://10.0.48.237:9200'
kibanaUrl='https://elk.oriserve.com/kibana'

##for default vpc
#elasticUrl='https://65.0.39.142:9200,https://13.234.185.180:9200'

elasticAuthType='api'
elasticApiKey=''

##index and ilm settings //edit to overwrite, comment for defaults
##this should be a valid json string
elasticTimezone='Asia/Clacutta'
elasticBatchSize='100'
ilmObject='{"size":"2gb", "hotDuration":"2d", "warmAfter":"1h", "deleteAfter":"5d", "shrinkShards":1, "overwriteILM":false }'
indexSettings='{ "primaryShards":3, "replicaShards":1, "overwrite":false }'

#======== elk config =========#
```

**Note:** Detailed explanation of each option can be found in *[.env](./../../ocs/env)* documentation.

## Kibana

Shipping data from application to elastic search is one thing. Next come the main part, to actually make sense of it. This is accomplished .via *Kibana*, a GUI tool with which we can create all sorts of visualization based on the aggregated data.

### Features

The elastic-logger integraiton provides the following:

- **2 Dashboards:**
  - **Deep Insights:** *This is the dashboard which utilizes the elastic-logger library.*
    - By default, come equipped with visualizaitons to analyse the following:
      - Top 30 incoming access logs.
      - Top 30 outgoing api logs.
      - Top 20 most common errors.
      - Top 20 uniqueue errors.
      - All error logs table.
    - *[See it in action](https://elk.oriserve.com/kibana/app/dashboards#/view/006e66c0-85a7-11eb-bfa2-cf7b1239f0ec?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-30m,to:now))&_a=(description:'Dashboard%20for%20deep%20insights%20on%20TataSky%20Production.',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!f),query:(language:kuery,query:''),timeRestore:!t,title:'%5BDeep%20Insights%5D%20%5BPROD%5D%20TataSky',viewMode:view))*
  - **RAW:** *This dashboard on the other hand, utilizes filebeat, and ships raw and unparsed data to elastic search. consider this eqvivalent to `pm2 logs` on the servers. The logs available here are raw with no filteration. Although, searches and filters can be added from the dashboard it self.*
    - Available Logs:
      - nginx access/error logs.
      - ocs logs.
      - scheduler logs.
      - users logs.
      - mongoDB logs.
    - *[See it in action](https://elk.oriserve.com/kibana/app/dashboards#/view/e17bbc40-595f-11eb-8007-039ea68f5d39?_g=(filters:!(),refreshInterval:(pause:!t,value:0),time:(from:now-15m,to:now))&_a=(description:'Dashboard%20for%20raw%20logs%20of%20Tatasky%20Production.',filters:!(),fullScreenMode:!f,options:(hidePanelTitles:!f,useMargins:!t),query:(language:kuery,query:''),timeRestore:!t,title:'%5BRAW%5D%20%5BPROD%5D%20TataSky%20Logs',viewMode:view))*
- **Saved Searches:** *Kibana provides a **Discover** tab, which can be used by developers to do custom searches on the data, in case you're looking for something specific. You can open pre-defined searches and modify the filers as per your need.*
  - **Deep Insights Searches:** *3 saved searhces*
    - **Access Logs:** Nomenclature: *[Deep Insights] `brand`_`env`_access_logs*
    - **API Logs:** Nomenclature: *[Deep Insights] `brand`_`env`_api_logs*
    - **Error Logs:** Nomenclature: *[Deep Insights] `brand`_`env`_error_logs*
  - **Raw Searches:** *7 saved searches*
    - **OCS:** Nomenclature: *brand:`brand`_env:`env`_type:ocs-logs*
    - **OCS-error:** Nomenclature: *brand:`brand`_env:`env`_type:ocs-handleAppError*
    - **Scheduler:** Nomenclature: *brand:`brand`_env:`env`_type:scheduler-logs*
    - **Users:** Nomenclature: *brand:`brand`_env:`env`_type:users-logs*
    - **mongoDB:** Nomenclature: *brand:`brand`_env:`env`_type:mongo-logs*
    - **nginx-access:** Nomenclature: *brand:`brand`_env:`env`_type:nginx-access-logs*
    - **nginx-error:** Nomenclature: *brand:`brand`_env:`env`_type:nginx-error-logs*
  - **Note:** *Searches, as the name suggests does the respective search, don't make me write everything. :)*
  - **Nomenclature** *is subject to change.*
