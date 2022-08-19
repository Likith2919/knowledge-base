---
title: Non Native Channel Integration
sidebar_position: 1
slug: nonnative 
author: Anmol Monga
---
---

This doc covers how to add a non native channel in the whatsapp for message sending and also shows about the flow of code.

For netcore channel the code is fully functional in prod that's why we can cannot change that .Netcore has its own route, index.js and other code.
But for the new channels we have implemented a generic approach , so we don't have to define everything again and again. We made a non_native_index for all the new channels and you have to define the request and response handler only for the new channels.

## STEPS 

* ## Set Route For the Request


So Lets start with the first step, Whenever user send the message it recieves at the web hook and from that web hook we recieve a request at the defined route according to company. So We can say this step as **```Request From The Non Native Channel```**. So 

e.g In the Netcore , we have this route
```javascript 
app.use('/netcore', netcore);
```
And for the other non-native channels , we just have to access the non-native_index route and for that get the vendor name from env.This part will work for other non-native channels. 
```javascript 
app.use(`/whatsappvendor/${process.env.whatsappProviderName}`, whatsappVendorRoutes);
```
***Note- You can find this code in app.js***

And the non_native_index.js will route the request accordingly.
>Non_native_index.js

```javascript
const express = require("express");
const router = express.Router();

const { morphToNativeWhatsappObject } = require(`../${process.env.whatapp}/whatsapp/requestHandler`)

const { handleAppError } = require("../../errorHandlers");


router.post("/:brandName", async (request, response) => {
try {
    console.log('called with brandName');
    morphToNativeWhatsappObject(request, response);
    // response.sendStatus(200);
} catch (err) {
    handleAppError({ err });
}
});

router.post("/", async (request, response) => {
    try {
        console.log('called in root');
        morphToNativeWhatsappObject(request, response);
        // response.sendStatus(200);
    } catch (err) {
        handleAppError({ err });
    }
});

module.exports = {
    router
};

```

* ## Request Handler


You will have to create a folder named /`vendor name`/whatsapp, and make handler files for the request and response . So whenever you get a request the non_native_index.js will route your request to this request handler.

So in requestHandler we will process the request and make object and further send it to whatsappReqHandler to process this message.

e.g- In NetCore , suppose the message type is text so we make the whatsappObject to send it to WhatsappReqHandler
``` javascript
const morphToNativeWhatsappObject = async (request, response) => {
    try {
       if (request.body.incoming_message && request.body.   incoming_message[0].message_type) {
            switch (request.body.incoming_message[0].message_type) {
                case 'TEXT':
                    request = await morphFromTextToNativeText(request);
                    whatsAppReqHandler(request, response);
                    console.log('switch: text');
                    break;
```

In Netcore , `morphFromTextToNativeText` will make the value of isNetcore as true in the request object so that it can send messages back from netcore.  
```javascript
const morphFromTextToNativeText = async (request) => {
    try {
        request.body.isNetcore = true;
        return request;
    } catch (err) {
        handleAppError({ err });
    }
};
```

But in case of ValueFirst , it is making isNetcore value as `false`, isOtherVendor as `true` and otherVendorName fetches from the env.

```javascript
const makeTextObject = async(request)=>{
    try{
        request.body.isNetcore= false;
        request.body.isOtherVendor = true;
        request.body.otherVendorName = process.env.whatsappProviderName; //same in other functions too
        return request;
    }
    catch(err){
        handleAppError(err);
    }
}
```


In `morphFromTextToNativeText` it will make the object ,according to format what is needed in the `whatsappReqHandler`.

If you are adding a new channel make sure you also make your object in such a format that is accepted in `whatsappReqHandler`.

Now In `whatsappReqHandler`, this is main part which will do the processing of the message and will send the reply accordingly.

The `getWhatsappInitializers` will make the `whatsappObj` and `userData` which is required to process the message.

```javascript
        let { whatsappObj, userData } = getWhatsappInitializers({ senderId, userText, data: null, brandName:brandBotId, isNetcore: request.body.isNetcore,isOtherVendor : request.body.isOtherVendor, otherVendorName: request.body.otherVendorName ,  context });
    
        BrainService.processCustomerMessage(whatsappObj, userData);
```

* ## Process Customer Message


So when the processCutomerMessage is called , it will do the bot processing and after matching the channel as whatsapp it will call `emitMsgToWhatsappClient`

```javascript
session_doc = await emitMsgToWhatsappClient({
            socket, messageDoc: message_doc, session_doc, generatedMessageData: message_json,
          });
```

* ## Making Response For The User

Now , when the `emitMsgToWhatsappClient` will be called it starts making the native object according to type of the message. And this object is called as `responseOptions`.

```javascript 
async function emitMsgToWhatsappClient({ socket, messageDoc, session_doc, generatedMessageData, isFallbackEnabled = true }) {
  try {
  

    let responseOptions = {};
    console.log(generatedMessageData.result.bot_messages[0].type, "TYPE OF MESSAGE")

    switch (generatedMessageData.result.bot_messages[0].type) {
      case 'text':
        responseOptions = await emitTextMsgWhatsapp({ socket, messageDoc, generatedMessageData, session_doc });
        break;
      case 'text_with_buttons':
        responseOptions = await emitTextWBtnMsgWhatsapp({ socket, messageDoc, generatedMessageData, session_doc });

```
There are more types too.

And When the `responseOptions` is ready it will check whether there is any non native channel present or not by `conditions`.
```javascript
if (!session_doc.isNetcore && !session_doc.isOtherVendor) {
      
      await emitMessage(socket, responseOptions,isFallbackEnabled, messageDoc,session_doc, generatedMessageData);
      
    } 
    else if(session_doc.isNetcore){
        const status = await emitToNetcoreWhatsapp(responseOptions);
    }

    else {
      const status = await whatsappChannelResponseFunctions[`emitToWhatsapp`](responseOptions);
    }
```
If Both flags are not present , it means it is native message and 
If `isNetCore` is present , it will call `emitToNetcoreWhatsapp(responseOptions)` with the `responseOptions` .
Else if `isOtherVendor` is present , it will call a generic function for all other non-native whatsapp channels with the same `responseOptions`;
```javascript
let whatsappProviderName = (process.env.whatsappProviderName)? process.env.whatsappProviderName : 'valuefirst' ;


let whatsappChannelResponseFunctions = require(`../${whatsappProviderName}/whatsapp/responseHandler`)

 if(session_doc.isOtherVendor) {
const status = await whatsappChannelResponseFunctions[`emitToWhatsapp`](responseOptions);}
```

* ## Response Handler
Now we have a `responseOptions` object but we have to format the object in order to hit the api.

And for every Vendor there is a different request body format to include in for api request.

So the responseHandler function will make request accordingly.

Like For Netcore. `emitToNetcoreWhatsapp(responseOptions)`  is called and then it further checks for the different type and then send the request.So for a text type :- 

   ```javascript
const emitToNetcoreWhatsapp = (options, recipientNumber, isFallback = false) => {
  return new Promise(async (resolve, reject) => {
    try {

      const parsedOptionsBody = JSON.parse(options.body);
      const responseBody = {};
      const messageObject = {};

      if (parsedOptionsBody.type == 'text') {

       (options.body);
        console.log('parsedOptionsBody------------->', parsedOptionsBody);
        messageObject.recipient_whatsapp = parsedOptionsBody.to;
        messageObject.message_type = parsedOptionsBody.type;
        messageObject.source = netcoreSourceID;
        messageObject.recipient_type = parsedOptionsBody.recipient_type;
        messageObject.type_text = [{
          preview_url: (parsedOptionsBody.preview_url && parsedOptionsBody.preview_url == true) ? 'true' : 'false',
          content: parsedOptionsBody.text.body
        }];
        responseBody.message = [messageObject];

        options.method = 'POST';
        options.url = `${netcoreWhatsappUrl}/api/v2/message/`;
        options.headers = {
          'Content-Type': 'application/json',
          'Authorization': netcoreAuthToken
        };
        options.body = JSON.stringify(responseBody);
        options.rejectUnauthorized = false;

        console.log('Final response object sent to netcore: ', responseBody);
        console.log('Final response sent to netcore: ', options);

      } 


          req(options, (err, res) => {
          if (err) {
          // throw new Error(err);
          return reject(err);
        } else {
          console.log('message sent successfully-------->', res.body);
          return resolve(true);
        }
      });

    } catch (err) {
      handleAppError({ err })
    }
  });
};
```

And for `ValueFirst`, it `makeTextObject` will only make the object for text type and return that object to further call `sendReq` function.
```javascript

const makeTextObject = async (optionBody) => {
    try {
        let responseBody = {
            "@VER": "1.2",
            "USER": {
                "@USERNAME": username,
                "@PASSWORD": password,
                "@UNIXTIMESTAMP": ""
            },
            "DLR": {
                "@URL": ""
            },
            "SMS": [
                {
                    "@UDH": "0",
                    "@CODING": "1",
                    "@TEXT": optionBody.text.body,
                    "@PROPERTY": "0",
                    "@ID": '123', //we will write a function to make id
                    "ADDRESS": [{
                        "@FROM": `${from_number}`,
                        "@TO": optionBody.to,
                        "@SEQ": "1",
                        "@TAG": "SOME RANDOM DATA"

                    }]
                }
            ],

        }
        console.log(responseBody);

        return JSON.stringify(responseBody);
    }

    catch (err) {
        handleAppError({ err });
    }

}


const emitToWhatsapp = async (options, recipientNumber) => {
    try {
        const parsedOptionBody = JSON.parse(options.body);
        let responseBody;
        console.log(parsedOptionBody.type);

        switch (parsedOptionBody.type) {
            case 'text':
                responseBody = await makeTextObject(parsedOptionBody);
                break;

            case 'image':
                responseBody = await makeImageObject(parsedOptionBody);
                break;

            case 'carousel':
                responseBody = await  handmakeCarouselObject(parsedOptionBody);
                break;

            case 'template':
                responseBody = await makeTemplateObject(parsedOptionBody);
                break;

            default:
                responseBody = await makeTextObject(parsedOptionBody);
                break;
        }
        url=''; 
        console.log("sending request");
        let response = await sendReq(responseBody , url)
        return response;
    }
    catch (err) {
        handleAppError({ err })
    }
}

```

And if you add new non native channel , you have to define all the response handler functions in order to send message correctly.


If request is made but it is failed to send message ,
or show errors in response . Handling of those cases will be added soon.
