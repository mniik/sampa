FROM node:18

LABEL maintainer="Mahdi Niksirat"
##
ARG uid=999
ARG gid=999

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb http://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y git yarn \
    && apt-get -y autoremove \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

RUN npm install pm2 -g

RUN usermod -u $uid node
RUN groupmod -g $gid node
