---
title: Installation of New Monitoring Setup.
# sidebar_position: 1
slug: installation_setup
author: Manjeet 
author_title: Devops Engineer @ Ori

---


The docs cover installation of New Monitoring Setup with Prometheus Grafana & Node expotert on Server.

## Installation Steps

- Installation
  - [Installation Link](https://medium.com/devops-dudes/install-prometheus-on-ubuntu-18-04-a51602c6256b)
  - Before starting the installation please go through the latest release links of promtheus grafana & node exporter.
  - Please install the latest stable versions of all.
  - Below are the releases links:
  - [Prometheus](https://github.com/prometheus/prometheus/releases)
  - [Grafana](https://github.com/grafana/grafana/releases)
  - [NodeExporter](https://github.com/prometheus/node_exporter/releases)

- After installation follow the below steps to change the configs
  - Setup a domain and map to server public/elastic IP using Route 53.
  - Please go through the existing setup files like grafana.ini & prometheus.yml & nginx conf then modify your config files acc to your setup.
  - Server path of files
  - `cat /etc/grafana/grafana.ini`
  - `cat /etc/prometheus/prometheus.yml`
  - `cat /etc/nginx/conf.d/pmg.conf`
  - All above files are on s3 as well, now you can download the files from s3 and go through it.
  - s3 Path:
       `s3://oriserve-demos/TemplatesUsedForCreation/PNG/`

- After setup please verify with the domain that all are working fine.
- If all good [Congratulations](https://media.giphy.com/media/2xIOiAPXonois/giphy.gif) on your success.
