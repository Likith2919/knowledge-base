---
title: Ubuntu ARM64 Jenkins Slave Changelog
slug: ubuntu-arm64-jenkins-slave_changelog
author: Nipun Jain
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---
---

:::info Description

- **Patched**: Security patches applied on 08-Jan-2022

- **Tools**:
  - **dev-tools**:
    - apt install unzip htop telnet git ruby-full -y
    - apt install --yes libssl-dev zlib1g-dev libbz2-dev libreadline-dev libsqlite3-dev llvm libncurses5-dev libncursesw5-dev xz-utils tk-dev libgdbm-dev lzma lzma-dev tcl-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev wget curl make build-essential python-openssl
    - apt install -y apt-transport-https ca-certificates curl software-properties-common
  - AWS CLI V2
  - CodeDeploy Agent
  - terraform_v1.1.3
  - docker
  - nginx_v18
  - jenkins_v2.319.1

- **Environments**
  - node(n)
    - v16
    - v14(default)
  - java_v8 & javac_v8
  - pyenv
    - python_v3.6.15
    - python_v3.7.12
    - python_v3.8.12(default)

:::

---

## ID: ami-0a4c0ef151a8d8dba

:::tip Latest | Stable
**Name**: ubuntu_arm64_jekins_slave_image_v1_08_jan_2021  
**Release Date**: 08th Jan, 2022  
**Type**: New AMI
:::

- ***Reason for update/Issues in previous version***
  - Needed to create an AMI for Jenkins to spawn slaves with AGS along with the required binaries/softwares installed.

- ***Changes***
  - Installation and setups directory in `/opt/installations` & `/opt/setups`
  - Installed node and managing multiple versions with the `n` package. Currently v16 and v14(default) installed.
  - Installed java_v8 and javac_v8
  - Installed pyenv
    - pyenv path configuration in `/etc/environment`
    - need to `source /etc/environment` to use it

    - ``` shell
        #[[ $(command -v pyenv) ]] && echo "pyenv found" || ((echo "pyenv not found, bootstrapping pyenv" && eval "$(pyenv init -)" && echo "pyenv bootstrap success")  || echo "pyenv bootstrap failed")
        if [[ $(command -v pyenv) ]]; then
          echo "found"
        else
          echo "not found"
          source /etc/environment
          eval "$(pyenv init -)"
        fi
      ```

    - v3.6.15, 3.7.12, 3.8.12(default) installed

|         |               Name           |           ID           |
|:-------:|:----------------------------:|:----------------------:|
| Current | ubuntu_arm64_jekins_slave_image_v1_08_jan_2021 | ami-0a4c0ef151a8d8dba |
| Source  | Ubuntu Server 20.04 LTS (HVM) | ami-0491e5015eb6e7a9b  |

---
<br></br>