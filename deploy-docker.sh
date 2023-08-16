# npm install --dev @types/react
npm run build
docker rmi jujemu/oauth-test:client
# docker build --platform linux/amd64 --tag jujemu/oauth-test:client -f ./Dockerfile  .
docker build --tag jujemu/oauth-test:client -f ./Dockerfile  .
docker push jujemu/oauth-test:client