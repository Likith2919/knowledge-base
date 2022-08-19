---
title: Mounting EBS SOP
# sidebar_position: 1
slug: mount
author: Nipun Jain
tags: [help-docs]
author_title: Sr. Devops Engineer @ Ori
author_url: https://github.com/niccsj
---

## Scenarios

- EBS volume created from a snapshot.
- Attaching an existing volume to another instance.
- Attaching a new EBS volume to an instance.

## Steps

Assuming that we already have an EBS volume to attach to an instance.

- The device could be attached to the instance with a different device name than you specified while attaching the volume.
  - For example: `/dev/sdf` can be changed to `/dev/nvme1n1`, the new namind depends on how many existing volumes are currently attached.
- Use `lsblk -f` to view available disks
  - ![Image](/img/aws/lsblk-f.png)
- Checked whethere or not the new volume has a filesystem on it.
  - This can be checked either from the outout of the `lsblk -f` command in the ***FSTYPE*** column. As seen in this case, we have ***FSTYPE*** of ***xfs***, which is correct since, this volume was create from a snapshot.
  - Or, `file -s /dev/nvme1n1p1`, here ***p1*** denotes the partition. If you get an output where new volume isn't partitioned, then simple check filesystem for whole disk, `file -s /dev/nvme1n1`
    - ![Image](/img/aws/file-s.png)
  - Ideally, a new volume shouldn't have a FileSystem on it.
  - While, if you're restoring from a snapshot, then it should as seen in above image. If it doesn't have a filesystem in this case, it means something when wrong with either the snapshot or while attaching the volume.
    - In this case, detach the volume from the AWS console.
    - Delete this and create a new volume from the snapshot and try again.
- (Conditional) Create a file system with `mkfs -t xfs /dev/nvme1n1`
- Create a mount point with the mkdir command, `mkdir -p /mnt/newvol`
- Mount the new volume.
  - If mounting a volume which already had a partition make sure to mount the partition which had the filesystem.
    - `mount /dev/nvmen1p1 /mnt/newvol`
  - If mounting a new volume for which filesystem was create in above step.
    - `mount /dev/nvmen1 /mnt/newvol`
- Make it permanent.

## Common Error

- ***wrong fs type, bad option, bad superblock on /dev/nvme1n1p1, missing codepage or helper program, or other error.***
  - Check the mount logs with `dmesg | tail`
  - If you see, `Filesystem has duplicate UUID` errors. This means the volume you're mounting has the same ID as an existing volume. Follow the below additional setps to mount.
    - ![Error](/img/aws/mount_error.png)
    - ![Here](/img/aws/lsblk-f.png)

    - ```shell
      # mount without uuid
      mount -o nouuid /dev/nvme1n1p1 /mnt/newvol
      # now unmount
      umount /mnt/newvol
      # generate a new uuid
      xfs_admin -U generate /dev/nvme1n1p1
      #finally mount with uuid
      mount /dev/nvme1n1p1 /mnt/newvol
      ```

  - [ref](https://ripon-banik.medium.com/cannot-mount-nvme-volume-on-ec2-b4f3ae9ddda)
