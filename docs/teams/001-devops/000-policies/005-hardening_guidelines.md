---
title: Hardening Guidelines
# sidebar_position: 3
slug: hardening_guidelines
author: Manjeet
author_title: Devops Engineer @ Ori
---

## Server Level Hardening Guidelines

Server hardening guidelines followed by the devops team for all the servers.

- For Dev & UAT Servers
  - Only limited access is given acc. to need and requirements.
  - Only key based access is enabled using access management repo.
  - There is no sudo/admin level access to any team except devops team.

- For Prod Server
  - There is no direct prod server access to any team except devops team.
  - All prod servers are created in a sepearate VPC.
  - Bastion host is used to access the prod servers.
  - Shuttle & OpenVpn is used to access the prod infra.

## Networking Level Guidelines

Here is networking guidelines we follow to create security groups with required rules.

- we creates seperate security groups for servers.
- Shuttle & OpenVpn is used to access the prod infra.
- Only required port is open acc to application & their requirements.
- Security groups which we have for Dev/Prod Stacks.
  
- For Dev Stack we have 2 servers
  - FullStackServer
  - DevAI Server

- FullStackServerSG:
  - `80 ------ 0.0.0.0/0`
  - `443 ----- 0.0.0.0/0`
  - `27017 --- 0.0.0.0/0`
  - `6379 ---- 0.0.0.0/0`
  - `5672 ---- 0.0.0.0/0`
  - `22 ------ 0.0.0.0/0`
  - `9100 - prometheusSG ID's`
  
- DevAIserverSG:
  - `80 ----- 0.0.0.0/0`
  - `22 ----- 0.0.0.0/0`
  - `9100 - prometheusSG ID`

----  

- For Prod Stack we have:
  - WebApp Servers
  - WebApp Load Balancers
  - AI Load Balancer
  - AI Servers
  - DB Server
  - Utility Server
  
- WebAppServers
  - WebappTierSG : This sg is added to webappTier servers to allow traffic from webapp load balacer.
    - `80, 443 - allowed traffic from webappTierLBSG ID`

- WebApp Load Balancer
  - WebappTierLBSG: This sg is used for webapp load balancer.
    - `80, 443 ----- 0.0.0.0/0`
  
- AI Load Balancer
  - AILBSG: This sg is added to ai load balancer to allow traffic from webapp servers.
    - `80 - allowed traffic from webappTierSG ID`
    - `80 - allowed traffic from shuttleSG/openVpnProd_gatewaySG ID`

- AI Servers
  - AIServerSG: This sg is added to AI server to allow traffic from AI load balancer.
    - `80 - allowed traffic from AI Load balancer SG ID`

- DB Server
  - DatabaseServerSG: This sg is added on database server to access the db from webapps servers and ai servers and utility server.
    - `27017 - allowed traffic from webAppTierSG & AIServerSG & UtilityServerSG ID's`
    - `27017 - allowed from jenkinsserverSG ID for data migration.`
    - `6379 -- allowed traffic from UtilityserverSG & webAppTierSG ID's`

- Utility Server
  - UtilityServerSG: This sg is added on utility server to access the users and scheduler service from webapp servers.
    - `8087 -- allowed traffic from webappTierSG ID`
    - `5672 -- allowed traffic from webappTierSG ID`
    - `15672 - allowed traffic from webappTierSG ID`

----

Below are the additional sg's which are used as a gateway to access the prod infra. We attach these sg's to all prod servers.

- sshProdSG: This sg is used to access the prod servers using bastion host & to access the prod infra using shuttle.
  - `27017 - allow traffic from shuttleSG`
  - `22 ---- allow traffic from bashtionhostSG ID`
  - `6379 -- allow traffic from shuttleSG`
  - `5672 -- allow traffic from shuttleSG`

- allow_clustering_sg_prod: SG to allow clustering server access to production dbs. To be attached to prod DB servers
  - `27017 - allow traffic from clustering_sg_prodSG ID`
  - `27017 - clustering_sg_prod server public IP`

- openVpnProd_gatewaySG: This sg is used to access the prod infra using opnVpn.
  - `27017 - allow traffic from openVpnProd ID/IP`
  - `6379 -- allow traffic from openVpnProd ID/IP`
  - `5672 -- allow traffic from openVpnProd ID/IP`
