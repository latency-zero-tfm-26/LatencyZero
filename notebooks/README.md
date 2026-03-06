# 📒 Documentación de Jupyter Notebooks

Este repositorio actúa como el laboratorio de ciencia de datos, estructuración e investigación detrás de **LatencyZero**. Alberga todos los *Cuadernos de Jupyter* (Jupyter Notebooks) iterados y diseñados por nuestro equipo a lo largo del ciclo de vida del proyecto.

![Python Version](https://img.shields.io/badge/python-3.12-blue?logo=python&logoColor=white)

---

## 📚 Notebooks Principales (Raíz)

Estos son los cuadernos nucleares que engloban el entrenamiento, las pruebas y los análisis fundamentales de Inteligencia Artificial de nuestra plataforma:

| 📓 Nombre del Cuaderno | 📝 Descripción Técnica del Proceso |
| :--- | :--- |
| `model_training_components_pc.ipynb` | **Entrenamiento de la Red Neuronal Convolucional (CNN).** Toma el dataset procesado de imágenes, construye la arquitectura (Keras/TensorFlow), aplica técnicas de Data Augmentation, entrena el modelo de clasificación de 11 categorías (`components_pc_model.keras`) y genera métricas de rendimiento (*Accuracy, Loss, Confusion Matrix*). |
| `model_ocr.ipynb` | **Extracción de Texto con OCR.** Utiliza la librería *EasyOCR* (basada en PyTorch) para escanear las imágenes del dataset, detectar contornos de texto, y extraer cadenas útiles (marcas, modelos, seriales, GBs, voltajes). Posteriormente limpia el texto para facilitar su ingesta por el Agente LLM. |
| `model_openai.ipynb` | **Filtro CLIP Vision.** Implementa pruebas con el modelo multimodal `openai/clip-vit-base-patch32` (Zero-Shot Image Classification) para calcular la probabilidad de que una imagen contenga un componente de PC válido, filtrando ruido visual antes de pasar por el clasificador de Keras. |
| `ingest.ipynb` | **Ingesta de Vectores (RAG).** Se encarga de transformar los documentos JSONL procesados en embeddings usando `BAAI/bge-m3`, empaquetarlos en lotes (batching) e inyectarlos en la base de datos vectorial (Milvus) para nutrir la base de conocimientos del Agente de IA. |

---

## 🖥️ HardvisionAI (`/hardvision_ai`)

Subdirectorio que contiene el flujo de trabajo secuencial para la preparación, limpieza y prueba conceptual de **HardVisionAI** antes de su integración oficial en el Backend de LatencyZero.

| 📓 Nombre del Cuaderno | 📝 Descripción Técnica del Proceso |
| :--- | :--- |
| `create_and_clean_dataset.ipynb` | **Génesis del Dataset Visual.** Se conecta a las fuentes crudas, extrae las URLs de las imágenes y mapea sus respectivas etiquetas (labels). Filtra enlaces rotos y unifica la taxonomía (ej. agrupa *CPU Coolers* bajo `cpu_fan`). |
| `dataset_processing.ipynb` | **Descarga y Transformación Vectorial.** Recorre el dataset anterior para descargar físicamente cada imagen en el disco duro, redimensionándolas y convirtiendo sus etiquetas categóricas en representaciones numéricas (*One-Hot Encoding* o *Label Encoding*) listas para Keras. |
| `app.ipynb` | **Prototipo Interactivo (Streamlit).** Código base de la aplicación de prueba que integra tanto la inferencia del modelo preentrenado como el OCR, presentando todo bajo la interfaz web interactiva de *Streamlit* mencionada en la documentación general. |

---

## 🌐 Web Scraping (`/scraping`)

Esta suite de cuadernos contiene los *spiders* (arañas web) diseñados para realizar el volcado masivo y automatizado de datos estructurados desde los portales de hardware más relevantes.

| 📓 Nombre del Cuaderno | 📝 Descripción Técnica del Proceso |
| :--- | :--- |
| `scraping_pccomponentes.ipynb` | Scraping general iterando sobre el catálogo de PcComponentes. Extrae listas de precios, nombres, características base y URLs de imágenes de cada categoría de componente. |
| `scraping_pcpartpicker.ipynb` | Extracción profunda de las bases de datos de PCPartPicker, capturando cada componente de cada categoría, esquivando bloqueos mediante delays controlados. |
| `scraping_pcpartpicker_motherboards.ipynb` | **Extracción Cruzada de Compatibilidad (PCPartPicker).** Script avanzado que entra placa base por placa base, y recolecta explícitamente qué RAM, CPU, y Almacenamiento específicos son 100% compatibles con esa placa base exacta, estructurando las relaciones. |
| `scraping_pangoly.ipynb` | **Extracción Cruzada de Compatibilidad (Pangoly).** Análogo al anterior pero extrayendo datos cruzados de validación de placas base desde la estructura web de Pangoly, garantizando una doble comprobación de compatibilidad. |
| `scraping_steam.ipynb` | **Minería de Requisitos Gaming.** Navega por la tienda de Steam capturando los metadatos de "Requisitos Mínimos" y "Recomendados" de los títulos más jugados. Adicionalmente, escrapea la *Steam Hardware Survey* para conocer el hardware top tier utilizado mundialmente. |
| `scraping_techpowerup.ipynb` | Scraping quirúrgico a TechPowerUp para descargar arquitecturas complejas de CPU (litografías, sockets exactos, transistores, IPC), datos cruciales para nuestro Agente Inteligente. |

---

## 🐍 Entorno Virtual y Versión de Python

Todo el código contenido en estos cuadernos está escrito y certificado bajo **Python 3.12**.

> [!NOTE]
> Es de suma importancia asegurar que tienes instalada la versión de **Python 3.12** antes de instanciar el entorno virtual. De lo contrario, librerías que gestionan tensores (como TensorFlow/Keras) o procesamiento en GPU (PyTorch/EasyOCR) podrían generar conflictos de compatibilidad al ejecutar las celdas.

## ⚡ Guía para Ejecutar Notebooks Localmente

Sigue esta metodología para levantar el entorno de Jupyter en tu máquina y experimentar con el código paso a paso:

### 1. Crear un Entorno Virtual (Aislamiento)

```bash
python -m venv venv
```

### 2. Activar el Entorno

* En **Linux / macOS**:
  ```bash
  source venv/bin/activate
  ```

* En **Windows**:
  ```cmd
  venv\Scripts\activate
  ```

### 3. Instalar Dependencias Centrales

Asegúrate de instalar los requerimientos listados para el entorno de Machine Learning:

```bash
pip install -r requirements.txt
```

### 4. Lanzar Jupyter Notebook

Instala el gestor interactivo y arranca el servidor local:

```bash
pip install notebook
jupyter notebook
```

Esto abrirá una nueva pestaña en tu navegador web por defecto, mostrando el árbol de directorios desde el cual podrás abrir, modificar y ejecutar celda por celda cualquier archivo `.ipynb`.