ARG RUBY_VERSION
FROM ruby:${RUBY_VERSION}

ARG NODE_MAJOR
ARG BUNDLER_VERSION
ARG YARN_VERSION

RUN apt-get update -qq \
  && apt-get dist-upgrade -y \
  && DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    build-essential \
    gnupg2 \
    curl \
    less \
    git \
    libjemalloc-dev \
    libjemalloc2 \
    locales \
    tzdata \
    time \
    vim \
  && update-locale LANG=C.UTF-8 LC_ALL=C.UTF-8 \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/cache/apt/archives/* \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

ENV LANG=C.UTF-8 LC_ALL=C.UTF-8
ENV LD_PRELOAD=/usr/lib/x86_64-linux-gnu/libjemalloc.so.2

RUN \
  curl -sL https://deb.nodesource.com/setup_$NODE_MAJOR.x | bash - && \
  curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - && \
  echo 'deb http://dl.yarnpkg.com/debian/ stable main' > /etc/apt/sources.list.d/yarn.list && \
  apt-get update -qq && DEBIAN_FRONTEND=noninteractive apt-get -yq dist-upgrade && \
  DEBIAN_FRONTEND=noninteractive apt-get install -yq --no-install-recommends \
    default-libmysqlclient-dev \
    default-mysql-client \
    nodejs \
    yarn=${YARN_VERSION}-1 \
  && apt-get autoremove -y \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* \
  && truncate -s 0 /var/log/*log

ENV BUNDLE_JOBS=4 BUNDLE_RETRY=3

RUN gem update --system && \
    gem install bundler:$BUNDLER_VERSION

WORKDIR /app
