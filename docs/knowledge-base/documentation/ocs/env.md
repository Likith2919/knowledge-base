---
slug: env
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
tags: [documentation, env, onboarding]
---

# Environment File

Rest of the file here..

## .env Example

``` ELK CONFIG
#======== elk config =======#

##micro service name for elk
MS_NAME="ocs"
#elasticEnv="dev"
#elasticBatchSize="100"
#elasticDebug="true"

##enable/disable elastic-loggers
exportLogs=true
exportAccessLogs=true
outGoingApiLogger=true
#exportSocketLogs=true
#socketEventsToLog='reset_chat'

##for prod vpc
elasticUrl='https://10.0.48.196:9200,https://10.0.48.237:9200'
kibanaUrl='https://elk.oriserve.com/kibana'

##for default vpc
#elasticUrl=''

elasticAuthType='api'
elasticApiKey=''

##index and ilm settings //edit to overwrite, comment for defaults
##this should be a valid json string
elasticTimezone='Asia/Calcutta'
ilmObject='{"size":"2gb", "hotDuration":"2d", "warmAfter":"1h", "deleteAfter":"5d", "shrinkShards":1, "overwriteILM":false }'
indexSettings='{ "primaryShards":3, "replicaShards":1, "overwrite":false }'

#======== elk config =========#

```
