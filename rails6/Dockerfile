FROM ruby:2.7.2

# FIXME: コンテナ実行ユーザをroot以外に設定

WORKDIR /app

ENV RAILS_ENV="development" \
    NODE_ENV="development"

ENV RAILS_VERSION="6.1.1" \
    NODE_VERSION="10.24.0~dfsg-1~deb10u1" \
    YARN_VERSION="0.15.0-1" \
    POSTGRESQL_VERSION="11+200+deb10u4"

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
 && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list

RUN apt-get update \
 && apt-get install -y \
    nodejs=${NODE_VERSION} \
    yarn=${YARN_VERSION} \
    postgresql-client=${POSTGRESQL_VERSION} \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*

RUN gem i rails -v ${RAILS_VERSION} \
 && gem cleanup

