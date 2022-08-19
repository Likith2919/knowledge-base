---
title: Public_Asset_Upload
# sidebar_position: 1
slug: public_asset
author: Likith Venkat
author_title: Jr.DevopsEngineer@ Ori

---
## For Developers

- While requesting to upload a image/file, make sure that
  - Their nomenclature `shouldn't` contain spaces and any special character.
    - File size `shouldn't` be large. `should be around < 100-200 kb`.
    - If requested files are more than 3, request the all files as a zip folder

## For DevOps Team

- Front-end teams need to use some images/files for respective brands.
- These Images/files needs to upload to a bucket which is in publicly visible.
- We use `oriserve.com` bucket to upload images.
- In bucket, we have brands as folders. (see below image as ref.)

![image_upload](/img/asset_upload/imageupload.png)

- If we got a request to upload a image/file for `bajaj` brand.
- Check the folder name/filename, whether previously, it has with same name.
- If the file has same name, change the new file name and upload it.
- If the request has came as folder to upload, check for the folder if it exists, upload the content of the folder into the existence folder.
- Bucket structure will be like `oriserve.com/brand/folder/`  or  `oriserve.com/brand/file`
- For example, if we got a request as :
  - upload a folder `Avenger160` in `umbrella-bot` brand. (Avenger160 folder contains the images)
    - Check for the `Avenger160` in `umbrella-bot`.
    - If it is there, upload the content of `Avenger160`

    ![brand_home](/img/asset_upload/umbrela-bot_home.png)

    - If the folder is not there, get the confirmation from the `DevOps-Lead` to create the folder.
    - Upload the content, in the respective folder.
    ![folder_content](/img/asset_upload/umbrella_content.png)
    - Share the respective object url's to the requested person.
    ![url](/img/asset_upload/umbrella_url.png)
