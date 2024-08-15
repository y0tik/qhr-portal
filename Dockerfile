FROM node:20

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Set Default ENV Variables
ENV PORT=4444
ENV NODE_ENV=production

CMD ["npm", "run", "start"]

EXPOSE 4444
