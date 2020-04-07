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

COPY . bonu_v2

COPY Gemfile /bonu_v2/Gemfile
COPY Gemfile.lock /bonu_v2/Gemfile.lock

RUN bundle config build.nokogiri --use-system-libraries
RUN bundle check || bundle install

COPY /client/package.json /client/yarn.lock ./
RUN yarn install --check-files
RUN cd bonu_v2/client && yarn install
RUN cd bonu_v2/client && yarn run build
# COPY . /bonu_v2

RUN chmod +x /entrypoint.sh
ENTRYPOINT ["./entrypoints/docker-entrypoint.sh"]
