FROM node:latest
RUN mkdir -p /usr/app
WORKDIR /usr/app
COPY . .
RUN rm -rf node_modules
RUN npm install
RUN npm install pm2 -g
RUN npm run build
EXPOSE 8080
CMD ["npm","run", "production"]