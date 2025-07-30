# Use Nginx to serve static files
FROM nginx:alpine

# Remove default nginx static files
RUN rm -rf /usr/share/nginx/html/*

# Copy your frontend files to Nginx's public folder
COPY . /usr/share/nginx/html

# Expose port 80 for web traffic
EXPOSE 80

# Nginx runs automatically, no need for CMD
