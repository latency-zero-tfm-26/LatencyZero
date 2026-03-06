# 📥 Data Raw (Recolección Bruta)

Bienvenido al directorio raíz de nuestra ingesta de datos. Esta carpeta (`raw/`) actúa como el **Lago de Datos** (*Data Lake*) de LatencyZero, un espacio seguro donde se almacena en crudo toda la información estructurada y semi-estructurada recopilada a través de nuestros scripts de automatización web (Web Scraping).

Este directorio es vital, ya que representa la única "fuente de la verdad" de la que parten todos nuestros procesos posteriores de *Machine Learning*.

---

## 🏗️ Metodología de Recolección (Paso a Paso)

El flujo de trabajo que genera los archivos contenidos en estas subcarpetas sigue una rigurosa metodología técnica dividida en las siguientes fases:

1. **Definición de Arañas (Spiders):** Nuestros cuadernos Jupyter en la carpeta `/scraping` están configurados para navegar jerárquicamente por los mapas de sitio (Sitemaps) de diversas tiendas online, foros de hardware y plataformas de encuestas (Steam).

2. **Extracción Silenciosa y Eficiente:** Evitando sobrecargar servidores ajenos, nuestros scripts realizan la descarga de metadatos (precios, descripciones, especificaciones técnicas detalladas).

3. **Descarga en Crudo (Dump):** Toda esta información es escupida de manera automatizada a este directorio `raw/`. El formato en el que se guarda suele ser una mezcla de **JSON** (para especificaciones anidadas) y **CSV** (para tablas planas y relacionales).

4. **Acumulación de Ingesta (Vectorial):** Adicionalmente, ciertas carpetas (como `ai_db_vectorial/`) se preparan específicamente para generar el texto en formato **JSONL**, ideal para ser transformado directamente en vectores numéricos (Embeddings) que posteriormente nutrirán la memoria a largo plazo del Agente de IA (Base de datos Milvus).

---

## 🗂️ Estructura del Data Lake

Los datos se separan rigurosamente por la fuente o entidad que los provee, manteniendo una arquitectura modular:

| Carpeta de Origen | Descripción del Contenido | Importancia Técnica |
| :--- | :--- | :--- |
| `ai_db_vectorial/` | Ficheros JSONL unificados y transformados a texto plano conversacional. | El núcleo de la memoria del Agente IA (Arquitectura RAG). Contiene toda la información cruzada que lee el LLM. |
| `pangoly/` | Extracciones en crudo del portal Pangoly. | Fuente principal de comprobación cruzada de compatibilidad (ej. ¿Esta placa base soporta este módulo de RAM?). |
| `pccomponentes/` | Listados generales de precios y nombres desde PcComponentes. | Útil para alimentar el modelo con marcas y nombres actualizados al mercado hispanohablante. |
| `pcpartpicker/` | Bases de datos gigantescas y exhaustivas desglosadas en docenas de archivos JSON y CSV. | Provee todas las características técnicas estandarizadas mundialmente (frecuencias, voltajes, tamaños). |
| `steam/` | Encuestas globales de *Hardware Survey* y requerimientos de videojuegos AAA. | Dota al Agente de conocimiento real sobre lo que los usuarios usan y necesitan para jugar en la actualidad. |
| `techpowerup/` | Minería profunda de arquitecturas de CPU. | Información altamente técnica (litografías, sockets exactos) no siempre disponible en tiendas convencionales. |

> **Nota para Desarrolladores:** Los archivos en esta carpeta **no deben ser editados manualmente** bajo ninguna circunstancia. Cualquier manipulación, limpieza, normalización de strings o imputación de valores nulos (NaN) debe realizarse exclusivamente a través de los scripts en la carpeta `processed/` (ETL Pipeline), de lo contrario se corromperá la trazabilidad de los datos.
