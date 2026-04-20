FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy application code
COPY . .

# Build the React application
RUN npm run build

# Install a simple static file server
RUN npm install -g serve

# Cloud Run requires applications to listen on port 8080
EXPOSE 8080

# Serve the built application
CMD ["serve", "-s", "dist", "-l", "8080"]
