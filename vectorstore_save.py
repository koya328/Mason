import os
import glob

from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import OpenAIEmbeddings
from langchain_community.document_loaders import PyPDFLoader
from langchain_community.document_loaders import UnstructuredMarkdownLoader

from my_util import load_txt

PDF_LOAD = True
MARKDOWN_LOAD = True

def pdf_loader(path):
    loader = PyPDFLoader(path)
    pages = loader.load_and_split()
    contents = [page.page_content for page in pages]
    return contents

def markdown_loader(path):
    loader = UnstructuredMarkdownLoader(path)
    pages = loader.load_and_split()
    contents = [page.page_content for page in pages]
    return contents

def main():
    contents =[]
    if PDF_LOAD:
        pdf_files = glob.glob(os.path.join('./content', '*.pdf'))
        for pdf_file in pdf_files:
            contents.extend(pdf_loader(pdf_file))
    if MARKDOWN_LOAD:
        md_files = glob.glob(os.path.join('./content', '*.md'))
        for md_file in md_files:
            contents.extend(markdown_loader(md_file))
    


    api_key = load_txt("api_key.txt")
    embedding=OpenAIEmbeddings(openai_api_key=api_key)
    vectorstore = FAISS.from_texts(
        contents, embedding=embedding
    )

    vectorstore.save_local("./vectorstore")
    print("saved")

if __name__ == "__main__":
    main()