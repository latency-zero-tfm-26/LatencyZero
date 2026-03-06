# ⚙️ LatencyZero Server (Core)

Este directorio conforma el corazón de la lógica de negocio, manejo de base de datos y enrutamiento del backend de **LatencyZero**. Ha sido diseñado bajo un enfoque modular y limpio basado en **FastAPI**, lo que garantiza que el sistema sea fácil de mantener y escalar.

A continuación, se detalla la estructura principal de la arquitectura del servidor, explicando paso a paso la función de cada módulo.

---

## 📂 Arquitectura de Directorios

Nuestra estructura de carpetas implementa el patrón de diseño "Capas" (o arquitectura en n-capas), lo que separa claramente la gestión de la base de datos (Repositories), las validaciones (Schemas) y la lógica de negocio (Services).

| Directorio | Función en el Sistema | Detalles Técnicos |
| :--- | :--- | :--- |
| `api/` | **Enrutamiento (Routers / Controladores)** | Aquí se definen todos los *endpoints* HTTP (`/login`, `/chat`, `/components`, etc.). Actúa como la puerta de entrada: recibe la petición del cliente (Frontend), invoca al servicio adecuado y devuelve la respuesta en formato JSON. |
| `core/` | **Configuración y Seguridad** | Contiene configuraciones críticas del sistema como la gestión de variables de entorno (`config.py`), el manejo de excepciones personalizadas y dependencias transversales (como inyecciones para el control de sesiones de usuarios). |
| `db/` | **Conexión a la Base de Datos** | Define la configuración nativa de *SQLAlchemy* para conectar el sistema a nuestra base de datos relacional (PostgreSQL), incluyendo el motor de sesiones de base de datos (`SessionLocal`). |
| `models/` | **Modelos de Base de Datos (ORM)** | Archivos Python que mapean directamente las tablas de PostgreSQL (ej: Tabla Usuarios, Tabla Sesiones, Tabla Historial). Son la representación en código de nuestra base de datos relacional. |
| `schemas/` | **Esquemas de Validación (Pydantic)** | Modelos DTO (*Data Transfer Objects*). Se aseguran de que los datos que entran y salen de la API tengan el tipo y formato estrictamente correctos. Si el Frontend envía una edad como texto en vez de número, este módulo rechaza la petición. |
| `repositories/` | **Acceso a Datos (Patrón Repository)** | Encapsula y aísla todas las consultas directas a la base de datos (operaciones CRUD). Esto evita tener queries SQL o consultas SQLAlchemy esparcidas por todo el código. |
| `services/` | **Lógica de Negocio** | El cerebro del servidor. Aquí residen funciones como el `chat_service.py` (Agente de IA) o `components_service.py` (Visión Artificial). Se encargan de aplicar reglas, realizar cálculos o conectarse a APIs externas. |
| `ml/` | **Machine Learning (Modelos)** | Carpeta donde residen los archivos `.keras` y otros artefactos de IA o scripts necesarios para ejecutar HardVisionAI directamente en tiempo de ejecución del backend. |
| `mappers/` | **Transformación de Objetos** | Funciones que "traducen" o convierten un modelo de base de datos (ORM) a un esquema seguro de respuesta (DTO) antes de enviarlo al cliente, ocultando información sensible como las contraseñas hasheadas. |
| `utils/` | **Utilidades Generales** | Pequeñas funciones transversales reutilizables como generadores de hashes, formateadores de fechas, constantes (como etiquetas de ML) y manejo de strings. |

---

## 🚀 Flujo de Ejecución (Paso a Paso)

Para comprender cómo funciona el backend cuando un usuario realiza una acción (por ejemplo, analizar una imagen), el flujo en segundo plano sigue este patrón lógico:

1. **Recepción (API Router):** El archivo dentro de `api/components/` recibe la imagen enviada por el usuario a través de una petición POST.

2. **Validación (Schemas):** FastAPI y Pydantic aseguran que el archivo recibido sea realmente una imagen y esté dentro de los límites de tamaño.

3. **Procesamiento (Service + ML):** El controlador pasa la imagen a `services/components_service.py`. Este servicio inicializa (si no lo está ya) el modelo de IA alojado en la carpeta `ml/`, procesa los bytes de la imagen, filtra ruido y realiza la predicción Keras junto con el OCR.

4. **Transformación (Mappers):** El resultado "en crudo" del modelo (índices numéricos y matrices) se envía a un *Mapper* para convertirse en un objeto amigable (`ComponentDTO`).

5. **Respuesta (API Router):** El controlador toma este DTO y lo envía de vuelta al Frontend como un JSON limpio, completando el ciclo de vida de la petición.
