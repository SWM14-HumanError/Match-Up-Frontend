#!/bin/bash
set -a
build_part="nginx_react"
version="${build_part}-v1.0"
docker_image_name="ghcr.io/jujemu/match-up"
docker_version="${version}-$(date +"%y%m%d")"

echo -e "\033[1;33m # React build\033[0m"
pnpm run build

echo "\n"
echo -e "\033[1;33m # Dockerfile build\033[0m"
docker build --platform linux/amd64 -t ${docker_image_name}:${docker_version} .
docker build -t webserver:test .
docker tag ${docker_image_name}:${docker_version} ${docker_image_name}:web

if [ ${PUSH} = "push" ]
then
    echo "\n"
    echo -e "\033[1;33m # Docker image push on ghcr.io/jujemu\033[0m"
    docker push ${docker_image_name}:${docker_version}
    docker push ${docker_image_name}:web
    docker rmi -f ${docker_image_name}:${docker_version}
fi