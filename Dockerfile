FROM node:17.6.0-buster as build
WORKDIR /app
COPY . /app
ENV imageURL=https://test.zaptatechnologies.com/public/uploads/images/
ENV videoURL=https://test.zaptatechnologies.com/public/uploads/teacher_videos/
RUN npm install
RUN npm run build
RUN mv /app/dist/metutors /app/html
FROM nginx:1.20.0 as statics
COPY --from=build /app/html /usr/share/nginx/html
RUN chmod 777 /usr/share/nginx/html -R
RUN sed -i 's#index  index.html index.htm;#index  index.html index.htm; try_files $uri $uri/ /index.html;#g' /etc/nginx/conf.d/default.conf
