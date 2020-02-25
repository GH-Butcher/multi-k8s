docker build -t gbutchers/multi-client:latest -t gbutchers/multi-client:$GIT_SHA -f ./client/Dockerfile ./client
docker build -t gbutchers/multi-server:latest -t gbutchers/multi-server:$GIT_SHA -f ./server/Dockerfile ./server
docker build -t gbutchers/multi-worker:latest -t gbutchers/multi-worker:$GIT_SHA -f ./worker/Dockerfile ./worker

docker push gbutchers/multi-client:latest
docker push gbutchers/multi-server:latest
docker push gbutchers/multi-worker:latest

docker push gbutchers/multi-client:$GIT_SHA
docker push gbutchers/multi-server:$GIT_SHA
docker push gbutchers/multi-worker:$GIT_SHA

kubectl apply -f k8s

kubectl set image deployments/server-deployment server=gbutchers/multi-server:$GIT_SHA
kubectl set image deployments/client-deployment client=gbutchers/multi-client:$GIT_SHA
kubectl set image deployments/worker-deployment worker=gbutchers/multi-worker:$GIT_SHA
