# ServerlessFramework サンプル

## 本アプリの概要

AWS LambdaにアプリをCLIからデプロイする

参考:[Serverless Framework & DockerによるローカルフレンドリーなLambda開発・運用 - Zenn.dev](https://zenn.dev/samuraikun/articles/4b5e2becae7c6b)


## 事前準備

- AWSアカウントが作成済み
- AWS CLIインストール済み
- Dockerのインストール

## ServerlessFramworkについて

Lambdaをデプロイするまでに必要な各設定を簡単にできるツール

公式サイト
[serverless framework](https://www.serverless.com/)

## ServerlessFramworkを実行できるdocker-compose環境

イメージの構築
```bash
$ docker-compose build
```

環境の起動
```bash
$ docker-compose run --rm serverless sh
```

## アプリのデプロイ

```bash
$ docker-compose run --rm serverless sls deploy
```

## アプリの削除

```bash
$ docker-compose run --rm serverless sls remove
```

## ライブラリのインストール

### ローカル

環境を起動し、下記コマンドを実行
```bash
sh-4.2# bundle config set path "vendor/bundle"
sh-4.2# bundle install
```

### Lambda

下記のGithubDockerイメージをlambda layerに登録

[ruby-vips-lambda - Github](https://github.com/customink/ruby-vips-lambda)
```bash
$ cd customink
$ git clone https://github.com/customink/ruby-vips-lambda.git
$ cd ruby-vips-lambda
$ bin/deploy
```

東京リージョンにデプロイするときはスクリプトを修正
```diff
export VIPS_VERSION=$(cat share/VIPS_VERSION)
export LAYER_NAME="rubyvips${VIPS_VERSION//./}-27"
- export AWS_REGION=${AWS_REGION:=us-east-1}
+ export AWS_REGION=${AWS_REGION:=ap-northeast-1}
```
