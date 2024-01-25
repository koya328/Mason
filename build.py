# -*- coding: utf-8 -*-

import time
import sys

from openai import OpenAI

from my_util import load_txt, log

MODEL = "gpt-4-1106-preview"

PROMPT_FILE = "prompts/build_e.txt"
KEY_FILE = "api_key.txt"
LOG_FILE = "logs/build.log"

amount_tokens = 0
chat = []
response_times = []



key = load_txt(KEY_FILE)
client = OpenAI(api_key=key)
system = load_txt(PROMPT_FILE)
chat.append({"role": "system", "content": system})

print(f"Model is \"{MODEL}\"")
while True:
    user = input()
    if user == "quit":
        break
    
    chat.append({"role": "user", "content": user})
    log(LOG_FILE,"<user>:" + user + "\n")
    t = time.time()
    response = client.chat.completions.create(
        model=MODEL,
        messages=chat
    )
    msg = response.choices[0].message.content
    amount_tokens += response.usage.total_tokens
    print(msg)
    log(LOG_FILE,"<ChatGPT>:" + msg + "\n")
    response_times.append(time.time()-t)
    chat.append({"role": "assistant", "content": msg})

print(f"amount tokens:{amount_tokens}")
print(f"average response time:{sum(response_times)/len(response_times)}(s)")
    
