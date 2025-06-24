FROM node:latest AS build
WORKDIR /usr/local/app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
FROM nginx:latest
COPY --from=build /usr/local/app/dist/frontend/browser /usr/share/nginx/html
EXPOSE 80

