FROM nginx:1.19.5-alpine
ADD dist/ /artefact
COPY docker-build-files/default.conf /etc/nginx/conf.d/
EXPOSE 8000
