FROM node:16.13.0
ARG GITHUB_TOKEN
WORKDIR /app
COPY package*.json ./
COPY .npmrc .npmrc  
RUN npm install
COPY . .
EXPOSE 5008
VOLUME /app/public
CMD [ "npm", "run", "dev" ]
