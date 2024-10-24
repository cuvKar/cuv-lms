# Base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
#RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port Next.js will run on
EXPOSE 3000

# Set environment variable to production
ENV NODE_ENV=production

# Build the Next.js app
#RUN npm run build

# Start the Next.js app
CMD ["npm", "run", "start"]
