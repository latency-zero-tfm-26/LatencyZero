# 🌐 LatencyZero Server

Backend desarrollado en **FastAPI** para exponer servicios de Machine Learning, agentes basados en LLM y otras funcionalidades del ecosistema LatencyZero.

![Python Version](https://img.shields.io/badge/python-3.12-blue?logo=python\&logoColor=white)

## 📌 Diagrama Entidad-Relación

![latencyzero](/backend/db/latencyzero.png)


<!-- ## 📁 Estructura del proyecto -->

## 🧪 Instalación y ejecución

Sigue estos pasos para levantar el servidor en entorno local:

> [!IMPORTANT]
> Es necesario tener instalado Python 3.12 para ejecutar el backend correctamente.

Puedes comprobar tu versión instalada con:

```bash
python --version
```

Si no tienes la versión correcta, asegúrate de instalar **Python 3.12** antes de continuar.

### 1️⃣ Entrar al proyecto

```bash
cd backend
```

### 2️⃣ Crear el archivo `.env`

En el directorio `backend/`, crea un archivo llamado `.env` con el siguiente contenido:

```env
# Entorno
ENV=development

# Base de datos producción
DATABASE_URL=

# JWT
SECRET_KEY=

# CORS
CORS_ORIGINS=

# LLM
GROQ_API_KEY=

# HUGGING FACE
HF_TOKEN=

# ZILLIZ CLOUD
ZILLIZ_URI=
ZILLIZ_TOKEN=
```

⚠️ Asegúrate de completar los valores necesarios antes de ejecutar el servidor.


### 3️⃣ Crear entorno virtual

```bash
python -m venv venv
```


### 4️⃣ Activar entorno virtual

#### 🪟 Windows

```bash
venv\Scripts\activate
```

#### 🐧 Linux / 🍎 macOS

```bash
source venv/bin/activate
```


### 5️⃣ Instalar dependencias

```bash
pip install -r requirements.txt
```

### 6️⃣ Ejecutar el servidor

```bash
uvicorn latencyzero_server.main:app --reload
```

### 7️⃣ Acceder a la API

Una vez iniciado el servidor, podrás acceder a:

* 🌍 **API raíz**
  👉 [http://127.0.0.1:8000](http://127.0.0.1:8000)

* 📚 **Documentación interactiva (Swagger)**
  👉 [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
