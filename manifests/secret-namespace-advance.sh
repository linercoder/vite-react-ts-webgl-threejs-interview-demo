#!/bin/bash
kubectl create secret docker-registry __NAMESPACE__-secret --docker-server=__ALI_IMAGE_REGISTRY_PRODUCTION__  --docker-username='__ALI_IMAGE_USER__' --docker-password='__ALI_IMAGE_PASSWORD__'  -n __NAMESPACE__
