# Official Node.js image as the base
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy only package files to leverage Docker layer caching
COPY package*.json ./

# Install backend dependencies
RUN npm install

# Copy the rest of your app’s backend code into the container
COPY . .

# Expose the port your app runs on
EXPOSE 5001

# Start the server using nodemon or node
CMD ["npm", "run", "dev"]

