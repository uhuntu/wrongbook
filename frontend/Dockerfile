FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY app ./app
CMD ["npm", "run", "dev"]
