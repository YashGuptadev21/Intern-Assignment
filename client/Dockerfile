# frontend/Dockerfile

FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install frontend dependencies
COPY package*.json ./
RUN npm install

# Copy React app
COPY . .

# Building the React app
RUN npm run build

# Serve React app using serve
RUN npm install -g serve

# Expose frontend port
EXPOSE 5173

# Serve the build
CMD ["serve", "-s", "dist", "-l", "5173"]
