FROM node:latest
ENV MONGO_URL=${MONGO_URL}
ENV PORT=${PORT}
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE $PORT
CMD ["npm", "start"]