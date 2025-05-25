FROM node:18-bullseye

WORKDIR /app

COPY package*.json ./
RUN npm install --include=dev

COPY . .

CMD ["node", "src/index.js"]
