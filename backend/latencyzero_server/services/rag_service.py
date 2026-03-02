import os
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_milvus import Milvus
from langchain_groq import ChatGroq
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_core.runnables import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from langchain_core.messages import HumanMessage, AIMessage

from ..core.config import settings

# Variable global para no recargar el modelo pesado en cada peticion HTTP
_rag_chain = None
_retriever = None

def get_rag_chain():
    global _rag_chain, _retriever
    if _rag_chain is not None:
        return _rag_chain, _retriever

    # 1. Cargar del modelo de embeddings
    embeddings = HuggingFaceEmbeddings(
        model_name="BAAI/bge-m3",
        model_kwargs={'device': 'cpu'}, 
        encode_kwargs={'normalize_embeddings': True}
    )

    # 2. Conectar a Zilliz Cloud
    vectorstore = Milvus(
        embedding_function=embeddings,
        connection_args={"uri": settings.ZILLIZ_URI, "token": settings.ZILLIZ_TOKEN, "secure": True},
        collection_name="ai_data", 
    )

    # 3. Configuracion buscador (25 resultados por el lote de 4)
    _retriever = vectorstore.as_retriever(search_kwargs={"k": 25})

    # 4. Configuracion LLM
    llm = ChatGroq(
        temperature=0.1,
        model_name="llama-3.3-70b-versatile",
        groq_api_key=settings.GROQ_API_KEY
    )

    # 5. Leer el System Prompt desde el archivo markdown
    prompt_path = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "system_prompt.md"))
    try:
        with open(prompt_path, "r", encoding="utf-8") as f:
            system_prompt = f.read()
    except Exception:
        print(f"Error al cargar el System Prompt: {e}")
        system_prompt = "Eres un asistente de hardware. [CONTEXTO RECUPERADO]:\n{context}"

    # 6. Crear el prompt incluyendo el historial de chat
    prompt = ChatPromptTemplate.from_messages([
        ("system", system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])

    def formatear_documentos(docs):
        return "\n\n".join(doc.page_content for doc in docs)

    # 7. Tuberia LCEL
    _rag_chain = (
        RunnablePassthrough.assign(
            context=lambda x: formatear_documentos(_retriever.invoke(x["input"]))
        )
        | prompt
        | llm
        | StrOutputParser()
    )
    
    return _rag_chain, _retriever

# Recibe la nueva pregunta y el historial en formato de diccionarios, lo adapta a objetos de LangChain y ejecuta la tubería RAG.
def ask_rag_with_history(user_input: str, history_dicts: list) -> str:
    chain, _ = get_rag_chain()
    
    # Convertir el historial de diccionario a objetos message de LangChain
    chat_history = []
    for msg in history_dicts:
        if msg["role"] == "user":
            chat_history.append(HumanMessage(content=msg["content"]))
        elif msg["role"] == "assistant":
            chat_history.append(AIMessage(content=msg["content"]))
            
    # Ejecutar la IA
    response = chain.invoke({
        "input": user_input,
        "chat_history": chat_history
    })
    
    return response