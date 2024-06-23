# Bootcamp KeepCoding

## Módulo: Fundamentos de React y React Avanzado

Este repositorio contiene la solución al proyecto propuesto en este módulo, que consiste en la creación de una aplicación web para un servicio de venta y búsqueda de artículos de segunda mano, que llamaremos `Nodepop in React`.

La aplicación debe mostrar una página con los anuncios de los artículos, la página con los detalles del anuncio, un formulario para crear nuevos anuncios, y una página para iniciar sesión.

Además, se configurará un store Redux para el manejo de la sesión del usuario y la información de los anuncios.

Por último, se deberán crear tests unitarios de las acciones, reducers y selectors del store, un snapshot testing y un test para comprobar el funcionamiento del componente del login.

## Contenido

El repositorio contiene el proyecto desarrollado en React con JavaScript, inicializado usando [Create React App](https://facebook.github.io/create-react-app/docs/getting-started).

Para el backend se utilizó el proyecto [nodepop-api](https://github.com/davidjj76/nodepop-api).

## Instalación

Una vez clonado el proyecto, en primer lugar se deben instalar las dependencias:

```javascript
npm install
```

## Development

Luego, se puede correr la aplicación en el ambiente de desarrollo:

```javascript
npm run start
```

La aplicación en el ambiente de desarrollo corre en [http://localhost:3000](http://localhost:3000) y se puede visualizar en el navegador.

El backend corre por defecto en [http://localhost:3001](http://localhost:3001) y contiene un swagger que permite interactuar con el API [http://localhost:3001/swagger/](http://localhost:3001/swagger/).

## Testing

Para correr los tests de toda la app:

```javascript
npm run test
```
