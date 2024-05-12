# Mason
Mason (Minecraft AI Support ― Objectives and Novelty)は、Minecraftの中で次のタスクを提示したり構造物を自動生成することができるbotです。

デモ動画
https://github.com/koya328/Mason/assets/120627306/a45354ad-dfea-49b7-95b2-072dd3e45577

https://github.com/koya328/Mason/assets/120627306/96928aa2-f3e5-4d10-8fb5-4af5c6ad6014

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

# pythonパッケージのインストール
pip install openai
pip install langchain
pip install -U langchain-community
pip install -U langchain-openai
pip install unstructured
pip install markdown
pip install tiktoken
pip install faiss-cpu
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

## Future work
### サバイバルモードの機能的な面

**取得できる情報を増やす：**　今は主人となるプレイヤー1人の情報しか取得できていないためもっとワールドの情報などを広く取得するとプレイヤーに教えられることが増えるかもしれない。

**ReActの導入：**　ObservationをLLMに伝えるのが難しいと思うが、もしできたら関数を連鎖的に実行し、より複雑なことができるかもしれない

### クリエイティブモードの機能的な面
**ファインチューニング用データを増やす：**　数十件しかないので増やす。

**高性能モデルでファインチューニングする：**　GPT-4待ち

### 研究の展望
AIの部分を高校生でも触れるレベルにするとAI学習に役に立つのではないか(難しそうだけど学会での指摘)
