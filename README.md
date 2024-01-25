# Mason
Mason (Minecraft AI Support ― Objectives and Novelty)は、Minecraftの中で次のタスクを提示したり構造物を自動生成することができるbotです。

## 導入方法
pythonとnode.jsの環境を整え以下を導入してください。

```bash
# Node.jsパッケージのインストール
npm install mineflayer
npm install minecraft-protocol
npm install minecraft-data
npm install mineflayer-pathfinder
npm install mineflayer-collectblock

# Node.jsパッケージのインストール
pip install openai
pip install langchain
```

## 使用方法

1. 以下の二つを準備してください。
- OpenAIのAPIキー
- minecraftアカウント(サーバーにログインさせる場合、Mason用のアカウントが必要になります。ローカルで1人で試す場合は不要です。)
1. OpenAIのAPIキーをapi_key.txtに記述してください。
1. main.js内のHOST, PORT等の定数を整え、以下のコマンドでBOTをログインさせてください。

```bash
node main.js  
```