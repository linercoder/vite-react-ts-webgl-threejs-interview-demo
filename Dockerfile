# build environment
FROM node:16.18.0 as build

RUN npm install -g pnpm

ARG CI_COMMIT_SHORT_SHA
ARG DEPLOY_ENV
ARG PUBLIC_PATH
ENV PATH /app/node_modules/.bin:$PATH

WORKDIR /app
COPY . /app
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm build

# production environment
FROM nginx:1.16-alpine

ARG API_SERVER_HOST
ARG PUBLIC_PATH

COPY --from=build /app/dist /usr/share/nginx/html/${PUBLIC_PATH}
ADD ./configs/nginx/env.nginx.conf /etc/nginx/conf.d/default.conf
RUN sed -i -e "s#{{API_SERVER_HOST}}#$API_SERVER_HOST#g" -e "s#{{PUBLIC_PATH}}#$PUBLIC_PATH#g"  /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
