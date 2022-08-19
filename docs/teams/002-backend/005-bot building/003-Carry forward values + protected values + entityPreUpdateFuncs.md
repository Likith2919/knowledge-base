---
title: Carry forward values , protected values , entityPreUpdateFunctions
---

# **Protected values, Carry forward values , entityPreUpdateFunctions**

## **Overview**
------
In this doc, we will understand about:-
 
* Protected values
* Carry forward values
* entityPreUpdateFunctions 

## **Protected values**
------
Protected values are those which are preserved after a session ends.

**Why it is used**<br/>
Generally the values we store in our session_doc->context_variables gets cleared when the session expires by default timeout/end chat. If you want to preserve the variable's data even after the session ends then you must add that variable inside sessionDocResetProtectedValues.

**How to add Protected values in brand_specified_values.**

* Go into the collection named brand_specified_values in DB and click on Add document.

* You will find an array of sessionDocResetProtectedValues

```json
"sessionDocResetProtectedValues" : [
	"oriTestKey",
	"language",
	"recorded_web_order_no",
	"recorded_article_no",
	"email",
	"query",
	"ongoing_intent_wid",
	"phoneNumber",
	"timeTransfer",
	"customerGroup",
	"country"
],

```

* Add the variable you want to protect the values of.

* email, query, country etc are some example of this.

## **Carry forward values**
------
Carry forward values are those whose data is simply carry forwarded to the next session.<br/>
<b>NOTE</b>:<br/> variables will be carry forwarded if and only if they were previously added in <b>sessionDocResetProtectedValues</b> and <b>PSID</b> of the current session and the previous session are same.<br/>

**Why it is used**<br/>
Consider a scenario for WhatsApp where PSID remains same for all the users: we are asking details from the user for example his/her name, and when we have saved the name, now we do not have to ask for the name again and again instead we can show the name if he/she wants to continue with this or not.


**How to add Carry forward values in brand_specified_values.**

* Go into the collection named brand_specified_values.
* There you will find an object of objects of sessionCarryForwardValues.

```json
 "sessionCarryForwardValues": {
    "carryForwardedPrimaryIdentifier": {
        "newKeyName": "carryForwardedPrimaryIdentifier",
        "newKeyValue": "_OLD_VAL"
    },
    "profileDataSubmitted": {
        "newKeyName": "profileDataSubmitted",
        "newKeyValue": "_OLD_VAL"
    },
    "promptPincode": {
        "newKeyName": "promptPincode",
        "newKeyValue": "_OLD_VAL"
    },
    "userName": {
        "newKeyName": "userName",
        "newKeyValue": "_OLD_VAL"
    },
    "userPhone": {
        "newKeyName": "userPhone",
        "newKeyValue": "_OLD_VAL"
    },
    "userEmail": {
        "newKeyName": "userEmail",
        "newKeyValue": "_OLD_VAL"
    }
},

```

* You can add your variable in place of <b>Your_variable</b> , you want to carry forward the value of.

```json
 "Your_variable": {
    "newKeyName": "Your_variable",
    "newKeyValue": "_OLD_VAL"
},
```
* profileDataSubmitted, promptPincode, userPhone, userEmail are some example of this.

## **entityPreUpdateFunctions**
------
At any moment during execution if some certain defined variable is assigned some value then the respective function will run.<br/>
<b>NOTE</b><br/>The functions defined will execute before even if you are in a middle of a worklow, and if there is race condition for a workflow defined on a intent or the entityPreUpdateFunctions then every time the entityPreUpdateFunctions will run first and then the execution will be switched to the respective workflow.

**Why it is used**<br/>
When we have to trigger a function when no intent is to be triggered but we have to continue the coversation entityPreUpdateFunctions are used.

**How to add entityPreUpdateFunctions in brand_specified_values.** 

* Go into the collection named brand_specified_values in DB and click on Add document.

* You will find an array of objects of entityPreUpdateFunctions

```json

"entityPreUpdateFuncs" : [
	{
		"action" : "userProvideWebOrderNumber",
		"description" : "This entity is returned from NLP whenever user enter web order no",
		"name" : "userEnteredWebOrderNo"
	},
	{
		"action" : "userProvidedProductInfo",
		"description" : "This entity is returned from NLP whenever user enter yes/no",
		"name" : "key_words"
	},
	{
		"action" : "userProvideArticleNo",
		"description" : "This entity is returned from NLP whenever user enter yes/no",
		"name" : "userEnteredArticleNo"
	},
	{
		"action" : "userProvideProceedEntity",
		"description" : "This entity is returned from NLP whenever user enter yes/no",
		"name" : "proceed"
	},
	{
		"action" : "userEnteredStoreName",
		"description" : "This entity is returned from external entity whenever user enters store name",
		"name" : "userEnteredStore"
	}
],
```
* You can add your action , description , and name of the variable in the similar manner. 

**Function body example** :
```javascript
const function_name = async ({ session_doc, entity, oldEntities, socket, userData }) => new Promise(async (resolve, reject) => {
    try {
		/**
		*
		* 
		*
		*/
		return resolve({ session_doc, oldEntities })
    } catch (err) {
		handleAppError({err})
    }
})
```
<b>NOTE :</b><br/>
At the end of the function do return resolve, because we are sending promise here.