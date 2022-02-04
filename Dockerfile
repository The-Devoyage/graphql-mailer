FROM node:16.13.0
ARG PORT
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN chmod -R 777 node_modules
COPY . .
EXPOSE 5008
VOLUME /app/public
RUN npx tsc
CMD [ "npm", "run", "dev" ]
