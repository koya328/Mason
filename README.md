# Mason
Mason (Minecraft AI Support ― Objectives and Novelty)は、Minecraftの中で次のタスクを提示したり構造物を自動生成することができるbotです。

## 導入方法
pythonとnode.jsの環境を整え以下をインストールしてください。

```bash
# Node.jsパッケージのインストール
npm install mineflayer
npm install minecraft-protocol
npm install minecraft-data
npm install mineflayer-pathfinder
npm install mineflayer-collectblock
npm install python-shell

# Node.jsパッケージのインストール
pip install openai
pip install langchain
```

## 使用方法

1. 以下の二つを準備してください。
- OpenAIのAPIキー
- minecraftアカウント(サーバーにログインさせる場合、Mason用のアカウントが必要になります。ローカルで1人で試す場合は不要です。)
2. OpenAIのAPIキーをapi_key.txtに記述してください。
3. main.js内のHOST, PORT等の定数を整え、以下のコマンドでMasonをログインできます。

```bash
node main.js
```

## デプロイ
デプロイ用のwebアプリケーションもあります。開発者以外の人がwebアプリケーションを使うことで環境構築を行うことなく簡単にMasonを使用できます。

webアプリケーションを使うためには導入方法でのパッケージインストールに加え、以下をインストールしてください。
```bash
npm install express
npm install body-parser
npm install ejs
```

以下のコマンドでwebアプリケーションを起動してください。
```bash
node app.js
```

ブラウザでwebアプリケーションにアクセスして使用できます。
適切にポート開放して外部の人も扱うこともできます。
```
http://localhost:8080/
```
