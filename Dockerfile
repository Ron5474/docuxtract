FROM node:23-alpine
EXPOSE 3000

WORKDIR /home/docuxtract


COPY ./package.json /home/docuxtract/package.json
COPY ./package-lock.json /home/docuxtract/package-lock.json

COPY app/.next/ /home/docuxtract/app/.next/
COPY app/package.json /home/docuxtract/app/package.json
COPY app/package-lock.json /home/docuxtract/app/package-lock.json
COPY app/next.config.ts /home/docuxtract/app/next.config.ts


# Copy Document microservice
COPY microservice/DocumentService/build/ /home/docuxtract/microservice/DocumentService/build/
COPY microservice/DocumentService/package.json /home/docuxtract/microservice/DocumentService/package.json
COPY microservice/DocumentService/package-lock.json /home/docuxtract/microservice/DocumentService/package-lock.json
COPY microservice/DocumentService/.env /home/docuxtract/microservice/DocumentService/.env

RUN npm run cis
CMD [ "npm", "start" ]

