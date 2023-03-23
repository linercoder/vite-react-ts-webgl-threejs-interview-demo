#!/bin/bash
echo -e "\033[45;30m NAMESPACE \033[0m"
kubectl get ns | grep -wq $NAMESPACE
if [ $? -eq 0 ]; then
  echo "The namespace already exists and does not need to be created"
else
  echo "The namespace does not exist and needs to be created"
  sed -i "s/__NAMESPACE__/${NAMESPACE}/g" realibox-namespace.yaml
  cat realibox-namespace.yaml
	kubectl apply -f realibox-namespace.yaml
fi

echo -e "\033[45;30m SECRETS \033[0m"
kubectl get secrets -n $NAMESPACE | grep -wq $NAMESPACE-secret
if [ $? -eq 0 ]; then
  echo "Secret already exists, no need to create it"
else
  echo "Secret does not exist. It needs to be created"
  sed -i "s/__ALI_IMAGE_REGISTRY__/${ALI_IMAGE_REGISTRY}/" secret-namespace-advance.sh
  sed -i "s/__ALI_IMAGE_USER__/${ALI_IMAGE_USER}/" secret-namespace-advance.sh
  sed -i "s/__ALI_IMAGE_PASSWORD__/${ALI_IMAGE_PASSWORD}/" secret-namespace-advance.sh
  cat secret-namespace-advance.sh
  sh -x secret-namespace-advance.sh
fi

echo -e "\033[45;30m DEPLOYMENT \033[0m"
kubectl get deployment -n $NAMESPACE | grep -wq ${CI_PROJECT_NAME}
if [ $? -eq 0]; then
  echo "=> Patching deployment to force image update."
  kubectl patch -f deployment/${CI_COMMIT_REF_NAME//\//-}.yaml -p "{\"spec\":{\"template\":{\"metadata\":{\"annotations\":{\"ci-last-updated\":\"$(date +'%s')\"}}}}}"
  kubectl set image deployment ${CI_PROJECT_NAME} ${CI_PROJECT_NAME}=${REGISTRY_IMAGE}
else
  ###deployment
  sed -i "s#__REGISTRY_IMAGE__#${REGISTRY_IMAGE}#g" deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__NAMESPACE__/${NAMESPACE}/g" deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__CI_PROJECT_NAME__/${CI_PROJECT_NAME}/g"  deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__VERSION__/"${CI_COMMIT_REF_NAME//\//-}-$CI_PIPELINE_ID"/" deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__PORT__/${PORT}/g" deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  cat deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
  kubectl apply -f deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
fi

echo -e "\033[45;30m SERVICE \033[0m"
kubectl get service -n $NAMESPACE  | grep -wq ${CI_PROJECT_NAME}
if [ $? -eq 0 ]; then
  echo "Service already exists, no need to create it"
else
  echo "Service does not exist. It needs to be created"
  sed -i "s/__NAMESPACE__/${NAMESPACE}/g" svc.yaml
  sed -i "s/__PORT__/${PORT}/g" svc.yaml
  sed -i "s/__CI_PROJECT_NAME__/${CI_PROJECT_NAME}/g" svc.yaml
  cat svc.yaml
	kubectl apply -f svc.yaml
fi

echo -e "\033[45;30m INGRESS \033[0m"
kubectl get ingress -n $NAMESPACE  | grep -wq ${CI_PROJECT_NAME}
if [ $? -eq 0 ]; then
  echo "Ingress already exists, no need to create it"
else
  ###ingress
  echo "Ingress does not exist. It needs to be created"
  sed -i "s/__NAMESPACE__/${NAMESPACE}/g" ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__PORT__/${PORT}/g" ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__CI_PROJECT_NAME__/${CI_PROJECT_NAME}/g" ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
  sed -i "s/__INGRESS_PUBLIC_PATH__/${PUBLIC_PATH}/g" ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
  
  cat ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
  kubectl apply -f ingress/${CI_COMMIT_REF_NAME//\//-}.yaml
fi

echo -e "\033[45;30m Final resource allocation \033[0m"
kubectl rollout status -f  deployment/${CI_COMMIT_REF_NAME//\//-}.yaml
kubectl get all -l name=${CI_PROJECT_NAME} -n ${NAMESPACE}
