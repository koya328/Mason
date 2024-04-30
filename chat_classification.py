from langchain_openai import ChatOpenAI
from langchain.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

from my_util import load_txt

api_key = load_txt("api_key.txt")
template_text = load_txt("prompts/chat_classification_prompt.txt")

prompt = ChatPromptTemplate.from_template(template_text)
model = ChatOpenAI(model_name="gpt-4", openai_api_key = api_key, temperature=0)
output_parser = StrOutputParser()

chain = prompt | model | output_parser

def chat_classification(user):
    return chain.invoke({"chat": user})