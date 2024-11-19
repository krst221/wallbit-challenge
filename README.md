<h1 align="center">Wallbit Junior Frontend Challenge</h1>

## Índice

- [Índice](#índice)
- [Acerca del proyecto](#acerca-del-proyecto)
- [Instalación](#instalación)
- [Tests](#tests)
- [Despliegue](#despliegue)
- [Dependencias](#dependencias)
- [Proyecto](#proyecto)

  
## Acerca del proyecto

> Proyecto para el desafío de Wallbit Junior Frontend Challenge. El proyecto consiste en un carro de la compra con las siguientes funcionalidades:

- Añadir productos al carrito introduciendo un id y la cantidad deseada (entre 1 y 100).
- Al crear un nuevo carro, se añade y se guarda la fecha de creación, hasta que se vacía.
- Eliminar productos del carro.
- Modificar la cantidad de productos en el carro. Si se inserta un producto que ya existe, se añadirá la cantidad.
- Ver el precio total y la cantidad total de productos.
- Vaciar el carro entero.
- El carro se guarda y se actualiza en el localStorage.
- Modal de confirmación de eliminación, toast informativo y manejo de errores.

> En cuanto a la implementación técnica, el proyecto queda así:

- Proyecto desarrollado enteramente con Typescript y completamente tipado.
- Diseño completamente responsive y adaptado al uso y necesidades tanto de mobile como de desktop.
- Uso de createContext y useReducer para manejar el estado y las funcionalidades a nivel global.
- Arquitectura CLEAN, principios SOLID, abstracción y parametrización de componentes.
- Conversión dinámica del formato de la fecha, basada en la localización del usuario.
- Tests de integración para verificar el flujo completo de uso.

[Puntuación perfecta en Lighthouse](https://ibb.co/bNBN9Bm)

## Instalación

Después de descargar e instalar [Node.js](https://nodejs.org/), ejecutar los siguientes comandos:

Clonar el repositorio:

```sh
git clone https://github.com/krst221/wallbit-challenge
```

```sh
cd wallbit-challenge
```

Después de clonar el repositorio, instalar las dependencias y ejecutar el proyecto con los siguientes comandos:

```sh
pnpm install
```

```sh
pnpm dev
```

## Tests

```sh
pnpm test
```

## Despliegue

```sh
pnpm build
```

## Dependencias

- Pnpm - Gestor de paquetes.
- Vite - Servidor de desarrollo local.
- React - Biblioteca de JavaScript para construir interfaces de usuario.
- Tailwind CSS - Framework de CSS centrado en la utilidad.
- Vitest y React Testing Library - Herramientas para testear tu web, con tests unitarios y de integración.

## [Proyecto](https://wallbit-challenge.onrender.com/)