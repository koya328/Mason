from operator import itemgetter

from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import ChatPromptTemplate
from langchain_community.vectorstores import FAISS
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from my_util import load_txt

api_key = load_txt("api_key.txt")
embedding=OpenAIEmbeddings(openai_api_key=api_key)

vectorstore = FAISS.load_local("./vectorstore", embedding, allow_dangerous_deserialization=True)
retriever = vectorstore.as_retriever(search_kwargs={"k": 2})

template = """You are Minecraft Assistant.
Answer the Question in one paragraph of 30~45 words.
When explaining the craft, please mention that you can view the recipe by pressing the book button on the craft screen.
You can also answer a Question based on the following contexts:
{context}

Question: {question}
"""

prompt = ChatPromptTemplate.from_template(template)
model = ChatOpenAI(model_name="gpt-4-1106-preview",openai_api_key=api_key)

chain = (
    {"context": retriever, "question": RunnablePassthrough()}
    | prompt
    | model
    | StrOutputParser()
)

def chat(data):
    return chain.invoke(data['conversation'])