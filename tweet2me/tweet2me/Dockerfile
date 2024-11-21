FROM node:16.15.0

WORKDIR /app/frontend

COPY package-lock.json package.json /app/frontend/

RUN npm install

# ENTRYPOINT ["npm", "start"]