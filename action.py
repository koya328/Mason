# -*- coding: utf-8 -*-

import json

from openai import OpenAI

from my_util import load_txt
from functions import all_functiuons

MODEL = "gpt-4-1106-preview"

api_key = load_txt("api_key.txt")
client = OpenAI(api_key=api_key)

def action(data):
    prompt = f'''You are an agent performing tasks within Minecraft.
    My Conversation and My Information is as belows.

    #My Conversation
    {data['conversation']}

    #My Infomation
    Nearby blocks: {data['blocks']} (10-block radius.)
    Nearby entities: {data['entities']} (32-block radius.)
    Position: {data['pos']}
    Chests: {data['chest']} (You can ask me to deposit or take items from these chests. There also might be some unknown chest, you should ask me to open and check items inside the unknown chest.)

    Perform the task by function calling or answer "None" if you cannot.
    '''

    response = client.chat.completions.create(
        model=MODEL,
        messages=[{"role": "user", "content": prompt}],
        tools=all_functiuons(),
        tool_choice="auto",
    )

    msg = response.choices[0].message
    tool_calls = msg.tool_calls
    try:
        if tool_calls:
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                arguments = json.loads(tool_call.function.arguments)
                return "[act]"+function_name+"("+str(arguments)+")"
        else:
            return msg.content
    except Exception as e:
        return e
