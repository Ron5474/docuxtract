# FROM node:23-alpine
# EXPOSE 3001

# WORKDIR /home/docuxtract


# COPY ./package.json /home/docuxtract/package.json
# COPY ./package-lock.json /home/docuxtract/package-lock.json

# COPY app/.next/ /home/docuxtract/app/driver/.next/
# COPY app/package.json /home/docuxtract/app/driver/package.json
# COPY app/package-lock.json /home/docuxtract/app/driver/package-lock.json
# COPY app/next.config.ts /home/docuxtract/app/driver/next.config.ts


# # Copy Auth microservice
# COPY microservice/DocumentService/build/ /home/docuxtract/microservice/DocumentService/build/
# COPY microservice/DocumentService/package.json /home/docuxtract/microservice/DocumentService/package.json
# COPY microservice/DocumentService/package-lock.json /home/docuxtract/microservice/DocumentService/package-lock.json
# COPY microservice/DocumentService/.env.production /home/docuxtract/microservice/DocumentService/.env.production

# RUN npm run cis
# CMD [ "npm", "start" ]


FROM node:23-alpine

# Set working directory
WORKDIR /home/docuxtract

# Expose app port
EXPOSE 3001

########################################
# Copy and Build: DocumentService
########################################

# Copy only package files first for better caching
COPY microservice/DocumentService/package.json ./microservice/DocumentService/package.json

# Install dependencies
WORKDIR /home/docuxtract/microservice/DocumentService
RUN npm install

# Copy the rest of the microservice code
COPY microservice/DocumentService/ ./ 

# Build the microservice
RUN npm run build

########################################
# Copy and Build: Next.js App
########################################

# Copy only package files first
COPY app/package.json ./app/package.json

# Install dependencies
WORKDIR /home/docuxtract/app
RUN npm install

# Copy the rest of the app code
COPY app/ ./ 

# Build the Next.js app
RUN npm run build

########################################
# Back to root dir & Set up start command
########################################

WORKDIR /home/docuxtract

# Copy .env file (adjust path if needed)
COPY microservice/DocumentService/.env.production ./microservice/DocumentService/.env.production

# Start both services using concurrently
RUN npm install -g concurrently

# Optional: if you use a root-level package.json for orchestration, copy and install it
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# Define the startup command
CMD ["concurrently", "--kill-others", "npm run start-document", "npm run start-app"]
