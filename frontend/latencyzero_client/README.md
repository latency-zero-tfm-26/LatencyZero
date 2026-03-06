# 🖥️ LatencyZero Client (Frontend Core)

Bienvenido al directorio principal del **Cliente de LatencyZero**. Este proyecto ha sido desarrollado utilizando el framework web **Angular**, ofreciendo una interfaz de usuario interactiva, rápida y fluida para consumir los servicios de Inteligencia Artificial y bases de conocimiento de nuestro ecosistema.

Esta documentación está enfocada para el equipo técnico y desarrolladores, pero redactada de forma accesible y directa.

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 20.3.15.

![Node Version](https://img.shields.io/badge/node-v22.22.0-339933?logo=node.js&logoColor=white)
![Angular CLI Version](https://img.shields.io/badge/angular_cli-v20.3.15-DD0031?logo=angular&logoColor=white)

---

## ⚡ Servidor de Desarrollo

Para iniciar el servidor de desarrollo local y previsualizar la aplicación:

1. Ejecuta el comando `ng serve` en tu terminal o consola de comandos.
2. Abre tu navegador web favorito y dirígete a `http://localhost:4200/`.

La aplicación se recargará automáticamente en el navegador cada vez que modifiques y guardes cualquier archivo del código fuente.

---

## 🏗️ Generación de Componentes y Código (Scaffolding)

Angular CLI proporciona una forma rápida de generar nuevas piezas de código, respetando la arquitectura del framework.

Para crear un nuevo **componente**, ejecuta:

```bash
ng generate component nombre-del-componente
```

> **Consejo:** Puedes utilizar este mismo comando para crear otros elementos estructurales del proyecto como directivas, pipes, servicios, clases, guardias (guards) o interfaces. Por ejemplo: `ng generate service nombre-del-servicio`.

---

## 🚀 Construcción para Producción (Build)

Cuando la aplicación esté lista para ser desplegada en un servidor en vivo (producción), debes compilarla y optimizarla.

Para generar la versión de producción, ejecuta:

```bash
ng build
```

Este proceso empaquetará la aplicación y almacenará los artefactos compilados (archivos HTML, CSS y JS minificados y optimizados) dentro del directorio `dist/`. Estos archivos son los que se deben subir al servidor web (por ejemplo, Nginx, Apache, Vercel, etc.).

---

## 🧪 Pruebas Unitarias (Unit Testing)

Las pruebas unitarias garantizan que las piezas individuales de la aplicación funcionen correctamente de forma aislada.

Para ejecutar las pruebas unitarias a través de [Karma](https://karma-runner.github.io), utiliza el comando:

```bash
ng test
```

---

## 🌍 Pruebas de Integración (End-to-End Testing)

Las pruebas de integración (E2E) simulan el comportamiento real de un usuario interactuando con la aplicación completa en el navegador.

Para ejecutar las pruebas End-to-End, ejecuta:

```bash
ng e2e
```

> **Nota importante:** Antes de ejecutar las pruebas E2E por primera vez, asegúrate de añadir un paquete de pruebas que lo soporte, ejecutando: `ng add @angular/e2e`.

---

## 📚 Documentación Adicional

Para obtener más información sobre las capacidades, configuración y comandos avanzados de Angular CLI, te invitamos a consultar la documentación oficial o ejecutar el comando de ayuda interactiva:

```bash
ng help
```

También puedes visitar el repositorio oficial del equipo de Angular CLI: [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).