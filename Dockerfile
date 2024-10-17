# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Expose the port the Next.js app will run on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "run", "start"]
