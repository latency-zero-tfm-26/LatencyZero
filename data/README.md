# 🗃️ Data & Dataset

Este directorio es el núcleo del almacenamiento, recopilación y estructuración de los datos utilizados para entrenar nuestros modelos de inteligencia artificial (visión e inferencia) y nutrir la base de conocimientos de los agentes de **LatencyZero**. Toda la información contenida aquí ha sido meticulosamente conseguida y adaptada mediante técnicas estructuradas de **Web Scraping** y procesos de limpieza de datos (ETL).

Las fuentes primarias de información se basan en los portales líderes en componentes de PC a nivel global, lo que nos ha garantizado la creación de un dataset (conjunto de datos) veraz, representativo y de alta calidad para el entrenamiento óptimo de los modelos.

**Fuentes clave del dataset:**
- [PCComponentes](https://www.pccomponentes.com)  
- [TechPowerUp](https://www.techpowerup.com)  
- [PCPartPicker](https://pcpartpicker.com)
- [Pangoly](https://pangoly.com)
- [Steam](https://store.steampowered.com)

Estos portales proveen información crucial detallando cientos de miles de marcas, especificaciones técnicas de alta precisión (sockets, arquitecturas, consumos), compatibilidades cruzadas y fotografías estructuradas de cada componente.

![dataset](/img/dataset_components_03.png)

Como información complementaria vital, hemos extraído y procesado automáticamente los **requisitos de hardware mínimos y recomendados de videojuegos** a través de la API y páginas de Steam en español. Gracias a este trabajo, el agente IA posee un contexto actualizado para asesorar a los usuarios que preguntan: *"¿Es mi ordenador compatible con el juego X?"*.

## 📂 Estructura del Directorio de Datos

A continuación, se detalla el árbol de carpetas del proyecto, indicando cómo fluye la información desde su estado virgen hasta su formato final procesado:

```text
data/
├── README.md
├── images/               # Recursos gráficos (imágenes) escrapeados para entrenamiento visual.
├── raw/                  # Datos originales en crudo obtenidos directamente mediante scraping web.
│   ├── ai_db_vectorial/      # Archivos JSONL preparados para inyección vectorial de la IA (RAG).
│   ├── pangoly/              # Datos en bruto extraídos de Pangoly.
│   ├── pccomponentes/        # Datos extraídos (CSV y JSON) de PCComponentes.
│   ├── pcpartpicker/         # Bases de datos completas de PCPartPicker divididas por categoría.
│   ├── steam/                # Estadísticas y encuestas de hardware sacadas de Steam y requirimientos.
│   └── techpowerup/          # Información en crudo de CPUs (arquitecturas, frecuencias, TDP, etc).
│
└── processed/            # Datos limpios, normalizados y estructurados listos para ML.
    ├── components_01.csv
    ├── components_01.json
    ├── components_02.csv
    ├── components_03.csv
    └── components_04.csv
```

### Explicación del Flujo de Datos (Data Pipeline)

1. **`raw/` (Datos en bruto):** Aquí se almacenan los volcados directos de los scripts de web scraping. Contienen ruido, inconsistencias y formatos mixtos (CSV, JSON, JSONL). Sirven como la "verdad absoluta" desde la cual partimos.

2. **`processed/` (Datos limpios):** Los notebooks de Python procesan los archivos en `raw/`, limpiando valores nulos, estandarizando unidades métricas (por ejemplo, asegurando que toda la memoria RAM esté en GB o MHz) y uniendo bases de datos dispares para crear los ficheros consolidados (`components_xx.csv`). Estos archivos son los que se utilizan directamente en el entrenamiento del agente y de las redes neuronales.

3. **`images/` (Recursos gráficos):** En paralelo a los metadatos textuales, nuestros scripts descargan fotografías de alta resolución de las partes, las cuales son procesadas posteriormente para la red neuronal convolucional del proyecto (`HardVisionAI`).
