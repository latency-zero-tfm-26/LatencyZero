# 🖥️ LatencyZero Client (Frontend)

El **Cliente de LatencyZero** es la cara visible de nuestra plataforma, es decir, la interfaz web interactiva con la que los usuarios se comunican. Ha sido diseñada y desarrollada usando **Angular**, lo que nos permite ofrecer una experiencia de usuario rápida, dinámica y fluida.

A través de esta interfaz, cualquier usuario —incluso si no tiene conocimientos de programación o Inteligencia Artificial— puede interactuar con nuestros agentes virtuales, analizar componentes hardware mediante imágenes, y acceder a todo el ecosistema de herramientas de **LatencyZero** de manera intuitiva y visual.

Este proyecto fue estructurado y generado originalmente con la herramienta *Angular CLI 20.3.15*.

![Node Version](https://img.shields.io/badge/node-v22.22.0-339933?logo=node.js&logoColor=white)
![Angular CLI Version](https://img.shields.io/badge/angular_cli-v20.3.15-DD0031?logo=angular&logoColor=white)

---

## 📦 Herramientas y Versiones Necesarias

Para que el frontend funcione correctamente en tu ordenador, necesitas tener instalados dos programas principales con versiones específicas. Piensa en ellos como los motores que hacen funcionar la plataforma en tu entorno local:

| Tecnología | Versión requerida | Función principal |
| :--- | :--- | :--- |
| **Node.js** | **v22.22.0** | Es el entorno que permite ejecutar código fuera del navegador. Puedes descargarlo desde su [página oficial](https://nodejs.org/en/download). |
| **Angular CLI** | **20.3.15** | Es la herramienta de consola que nos ayuda a crear y mantener el proyecto Angular. |

### Cómo instalar Angular CLI

Una vez hayas instalado **Node.js**, puedes instalar Angular abriendo tu terminal o línea de comandos y escribiendo:

```bash
npm install -g @angular/cli@20.3.15
```

### 🔎 ¿Cómo compruebo qué versiones tengo instaladas?

Si ya tienes estos programas y quieres comprobar si tus versiones son correctas, abre tu terminal y ejecuta los siguientes comandos:

```bash
node -v
ng version
```

Si los números que aparecen no coinciden con las versiones requeridas, te recomendamos actualizarlos antes de continuar para evitar posibles problemas.

---

## ⚡ Guía de Instalación y Puesta en Marcha

Sigue estos sencillos pasos para instalar los archivos necesarios y arrancar la plataforma en tu ordenador para realizar pruebas.

### 1️⃣ Descargar las dependencias

El primer paso es decirle a tu ordenador que descargue todas las "piezas" adicionales que el proyecto necesita para funcionar. Dentro de la carpeta principal del frontend (`frontend`), ejecuta el siguiente comando:

```bash
npm install
```

> *¿Qué hace esto?* Lee el archivo `package.json` y descarga automáticamente todas las librerías necesarias, incluyendo Angular, herramientas de diseño visual (como Tailwind) y otras piezas de código creadas por terceros.

### 2️⃣ Arrancar el servidor de desarrollo

Para iniciar la aplicación y verla funcionando en tiempo real mientras trabajas en ella:

```bash
npm start
```

*(También puedes usar el comando directo de Angular: `ng serve`)*

Una vez que el proceso termine, abre tu navegador web favorito y entra en esta dirección:

👉 **http://localhost:4200**

¡Listo! Ya deberías estar viendo la interfaz gráfica de LatencyZero.

### 3️⃣ Preparar el proyecto para producción

Si en lugar de probarlo quieres generar la versión definitiva y optimizada (la que subirías a un servidor web real para que cualquiera en internet pueda usarla), utiliza este comando:

```bash
npm run build
```

Este proceso empaquetará, comprimirá y optimizará todo el código. Los archivos resultantes, listos para ser publicados, se guardarán automáticamente en una nueva carpeta llamada:

```text
dist/
```