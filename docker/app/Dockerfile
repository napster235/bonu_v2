FROM ruby:2.6.3-alpine
RUN apk add --update --no-cache \
      binutils-gold \
      build-base \
      curl \
      file \
      g++ \
      gcc \
      git \
      less \
      libstdc++ \
      libffi-dev \
      libc-dev \ 
      linux-headers \
      libxml2-dev \
      libxslt-dev \
      libgcrypt-dev \
      make \
      netcat-openbsd \
      nodejs \
      openssl \
      pkgconfig \
      postgresql-dev \
      python \
      tzdata \
      yarn

RUN mkdir /bonu_v2

WORKDIR /bonu_v2

COPY ./Gemfile* ./
COPY ./vendor ./vendor
RUN bundle install 

COPY . .

RUN cd ./client && yarn && yarn build

# RUN chmod +x /docker-entrypoint.sh
ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"] 😡😡😡
