FROM nginx:stable-alpine3.17-slim
LABEL   "title"="nginx-and-react" \
        "version"="1.0"

EXPOSE 80

COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/conf.d /etc/nginx/conf.d
COPY ./dist /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]