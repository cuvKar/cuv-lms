FROM node:14-alpine3.12
COPY . .
EXPOSE 4000

# Command to run the Next.js app
CMD ["npm", "run", "start"]
