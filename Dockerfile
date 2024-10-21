FROM node:lts-alpine
COPY . .
EXPOSE 4000

# Command to run the Next.js app
CMD ["npm", "run", "start"]
