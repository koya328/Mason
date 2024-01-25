import json

from langchain.chat_models import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain.output_parsers import PydanticOutputParser
from pydantic import BaseModel, Field

from my_util import load_txt

api_key = load_txt("api_key.txt")

template_text = load_txt("prompts/next_task_prompt.txt")

model = ChatOpenAI(model_name="gpt-4-1106-preview", openai_api_key=api_key, temperature=1)


class output(BaseModel):
    reasoning: str = Field(description="Based on the information I listed above, do reasoning about 30~45 word what the compleated task and next task should be.")
    task: str = Field(description="The next task.It should be a short phrase.")


output_parser = PydanticOutputParser(pydantic_object=output)
prompt = ChatPromptTemplate.from_template(template_text, partial_variables={
                                          "format_instructions": output_parser.get_format_instructions()})
chain = prompt | model | output_parser

def next_task(data):
    result = chain.invoke({
        "goals": data['goals'],
        "conversation": data['conversation'],
        "biome": data['biome'],
        "time": data['time'],
        "blocks": data['blocks'],
        "entities": data['entities'],
        "pos": data['pos'],
        "equip": data['equip'],
        "collected": data['collected'],
        "chest": data['chest']
    })
    return result.reasoning, result.task
    