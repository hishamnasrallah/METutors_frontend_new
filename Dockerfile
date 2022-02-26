FROM trion/ng-cli:latest as build
WORKDIR /app
COPY . /app
RUN ng install
RUN ng update
RUN ng build
RUN mv /app/dist /app/html
FROM nginx:1.20.0 as statics
COPY --from=build /app/html /usr/share/nginx/html
RUN chmod 777 /usr/share/nginx/html -R
RUN sed -i 's#index  index.html index.htm;#index  index.html index.htm; try_files $uri $uri/ /index.html;#g' /etc/nginx/conf.d/default.conf
