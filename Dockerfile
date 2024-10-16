# Stage 1: Build the application
FROM node:18 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN npm run build

# Stage 2: Run the application
FROM node:18 AS runner

# Set the working directory inside the container
WORKDIR /app

# Install 'serve' to run the production build
RUN npm install -g serve

# Copy the build from the previous stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose the port the Next.js app will run on
EXPOSE 3000

# Command to run the Next.js app
CMD ["npm", "run", "start"]
