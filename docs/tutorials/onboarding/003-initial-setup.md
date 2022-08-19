---
title: Setting up repositories
sidebar_position: 1
---

## Cloning your repositories

### Always clone your repository through SSH key

- Generation of SSH key

    ```shell
    cd ~/.ssh
    ssh-keygen
    cat ~/.ssh/id_rsa.pub
    ```

- Get this SSH key
- [Add](https://bitbucket.org/account/settings/ssh-keys/) this SSH key in bitbucket

## Repository access to get started

Get Repo access from DevOps team, by following this [link](/docs/teams/devops/policies/request_access).  
***Note:*** For any further clarification/doubs, contact in your respective slack channel.

## Change your branch of every repo to the below listed

- oriserve-comminication-service
  - [Branch URL](https://bitbucket.org/oriserve1/ori-communication-service/src/product-testFinal1/)
  - Branch Name: *product-testFinal1*
- chatbot-2.0
  - [Branch URL](https://bitbucket.org/oriserve1/chatbot-2.0/src/poc/)
  - Branch Name: *poc*
- chatbot-dashboard
  - [Branch URL](https://bitbucket.org/oriserve1/chatbot-dashboard/src/poc/)
  - Branch Name: *poc*
- brand-files
  - [Branch URL](https://bitbucket.org/oriserve1/brand-files/src/poc-prod/)
  - Branch Name: *poc-prod*
    - `brand-files` should be cloned under ```ori-communication-service/Brainservice``` as shown below.

    - ```shell
      git clone git@bitbucket.org:oriserve1/ori-communication-service.git
      cd ori-communication-service
      git checkout product-testFinal1
      cd BrainService
      git clone git@bitbucket.org:oriserve1/brand-files.git
      cd brand-files
      git checkout poc-prod
      ```

- knowledgebase
  - [Branch URL](https://bitbucket.org/oriserve1/knowldgebase/src/kb-development/)
  - Branch Name: *kb-development*

## Creation and modification of .env file

- ### Create .env file under oriserve-communication-service

  --Explanation--

  .env file is used for storing configuration in the environment separate from code.

- ### changes to be made in .env

  ```shell
  CS_REDIS_URL=65.0.29.61
  CS_DB_URL=65.0.29.61
  cacheNLPResponse='true'
  ```

## Connection of Chatbot with OCS

### Setting up the OCS URL inside Chatbot-2.0

- Inside Chatbot open --```urls.js```--
- Path: --```chatbot-2.0/src/data/config/urls.js```--
- Change the --socketUrl-- path to - ```http://localhost:8080/liveConversations```

## Installing npm packages

### Install npm packages for each repo

cd over each Repo from terminal and run this command

  ```shell
  npm install
  ```

## Run Chatbot and OCS

## check if local environment is set up by running both Chatbot and OCS

- Any message from Chatbot should be displayed on the console of OCS
- Equivalent response to be delivered in Chatbot as well
