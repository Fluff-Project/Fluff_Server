From node:12

MAINTAINER Lucas Shin <yuns994@gmail.com>

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

RUN npm install -g pm2

RUN wget http://download.redis.io/redis-stable.tar.gz 
RUN tar xvzf redis-stable.tar.gz
RUN cd redis-stable
RUN make install
RUN redis-server

COPY . .

EXPOSE 3000

CMD ["pm2-runtime", "start", "./bin/www"]