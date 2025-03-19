# Use Node.js LTS as base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install --production

# Copy the entire project
COPY . .

# Expose the application port
EXPOSE 8080

# Start the server
CMD ["node", "App.js"]
