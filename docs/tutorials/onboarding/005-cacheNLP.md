caheNLP Act as a cache between user query and NLP service. Sometimes, there are some queries which are oftenly used eg. "recharge" in Vodafone bot. In such cases these queries intent can be map in caheNLP section so that every time bot does not hit the NLP server.

## How cacheNLP works?

Path: `ori/ori-communication-service/controllers/admin/botBuilder.js`
```javascript
const getNLPResponse = async (req, res) => {
  try{
      const searchQuery = { ￼Copy

        _id : req.body._id
      };
      const Response = await cacheNLPResponse.findOne( searchQuery ).lean().exec();
      if(Response) {
        sendResponse(res, 200, { nlpResponse: Response }, 'Cache NLP Response displayed successfully.');
      }
      else {
        sendResponse(res, 404, {}, 'Cache NLP Response not present with the id');
      }
  } catch (err) {
      console.log('​}catch -> err', err);
      sendResponse(res, 500, {}, 'Some error occured.');
      handleAppError({ err });
  }
};
```
## How to add Utterances in cacheNLP?
##### step 1: go to chacheNLP in DB and click on the Add document

![cacheNLP](/img/mayankImg/cacheNLP.png)

##### step 2: write utterance and intent name to which you want to attach the utterance 

![cacheNLP](/img/mayankImg/cacheNLP2.png)