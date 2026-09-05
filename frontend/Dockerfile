FROM node:22-alpine
WORKDIR /app
COPY package.json ./
RUN npm install
COPY app ./app
CMD ["npm", "run", "dev"]
