import json

from chat_classification import chat_classification
from next_task import next_task
from action import action
from chat import chat

from my_util import log

while True:
    user = input()
    json_data = json.loads(user)
    class_result = chat_classification(json_data['conversation'])
    if class_result == "Request Next Task":
        reason,task = next_task(json_data)
        print(reason)
        print(f"task: {task}")
        json_data['conversation'] = task
        act = action(json_data)
        print(act)
    elif class_result == "Order":
        act = action(json_data)
        print(act)
    else:
        chat = chat(json_data)
        print(chat)