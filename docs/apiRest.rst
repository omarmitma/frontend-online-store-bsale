API REST
========

La Api Rest esta desarrollada con el lenguaje java y utilizando como
framework Spring Boot, cuenta con las siguientes capas:

-  **Controller:** Esta capa es la encargada a responder a diferentes
   métodos HTTP definidos por la anotación **@GetMapping**.
-  **Model:** Esta capa es donde se encuentran las entidades que tienen
   una correspondencia directa con una tabla de la base de datos.
-  **Repository:** En esta capa estan las clases encargadas de gestionar
   el acceso a los datos, disponen de métodos básicos de CRUD, además
   podemos definir nuestras propias consultas con la ayuda de la
   anotacion **@Query**.
-  **Service:** Esta capa es la que accede a los datos almacenados en la
   base de datos de la aplicación a través de los repositorios, hacen
   una serie de operaciones, y envían los datos al controlador.

Tablas BD
---------

La base de datos que nos proporcionaron contiene 2 tablas llamadas
**product** y **category**.

Tabla product
~~~~~~~~~~~~~

============= ================================================
Variable      TIPO
============= ================================================
**id**        Identificador unico del producto (int).
**name**      Nombre del producto (varchar).
**url_image** URL de la imagen asociada al producto (varchar).
**price**     Precio de venta del producto (float).
**discount**  Porcentaje de descuento del producto (int).
**category**  Identificador de la categoría (int).
============= ================================================

Tabla category
~~~~~~~~~~~~~~

======== ==========================================
Variable TIPO
======== ==========================================
**id**   Identificador único de la categoría (int).
**name** Nombre de la categoría (varchar).
======== ==========================================

Productos
---------

Listar productos, filtrar productos, ordenar productos

Estructura JSON
~~~~~~~~~~~~~~~

Al realizar una petición HTTP, el servicio retornara un JSON con la
siguiente estructura:

.. code:: json

       [
           {
               "id": 5,
               "name": "ENERGETICA MR BIG",
               "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/misterbig3308256.jpg",
               "price": 1490.0,
               "discount": 20,
               "category": 1
           }
       ]

Listar todos los productos
~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``GET /findAll`` Nos devuelve todos los productos de la base de
   datos.

**Parámetros**

No se necesita pasar ningun parametro para obtener todos los productos
de la base de datos.

Filtrar producto por categoria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``GET /findByCategory`` Nos devuelve todos los productos de una
   categoria especificada.

**Parámetros**

-  category, id de la categoria a buscar.

**Ejemplo**

-  ``GET /api/v1/Product/findByCategory?category=7``

**Respuesta**

.. code:: json

   [
       {
           "id": 104,
           "name": "ABSOLUT",
           "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/absolut21381.png",
           "price": 8990.0,
           "discount": 30,
           "category": 7
       }
   ]

Filtrar productos por nombre y categoria
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``GET /getAmountOfFilteredProducts`` Nos devuelve todos los productos
   dependiendo del nombre y categoria buscada.

**Parámetros**

-  category, id de la categoria a buscar.
-  name, nombre del producto a buscar.

**Ejemplo**

-  ``GET /api/v1/Product/getAmountOfFilteredProducts?category=1&name=monster``

**Respuesta**

.. code:: json

       [
           {
               "id": 34,
               "name": "ENERGETICA MONSTER RIPPER",
               "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mosterriper0436.jpg",
               "price": 1990.0,
               "discount": 0,
               "category": 1
           },
           {
               "id": 36,
               "name": "ENERGETICA MONSTER VERDE",
               "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/monsterverde0476.jpg",
               "price": 1990.0,
               "discount": 0,
               "category": 1
           },
           {
               "id": 77,
               "name": "ENERGETICA MONSTER RIPPER",
               "url_image": "",
               "price": 1990.0,
               "discount": 0,
               "category": 1
           },
           {
               "id": 79,
               "name": "ENERGETICA MONSTER VERDE",
               "url_image": "",
               "price": 1990.0,
               "discount": 0,
               "category": 1
           }
       ]

Filtrar productos por nombre, categoria y poner un limite (Ordenado)
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  | ``GET /filterProductsByNameASCWithLimit``
   | Nos devuelve productos ordenados por **nombre Ascendente**
     dependiendo del nombre y categoria buscada.

-  | ``GET /filterProductsByNameDESCWithLimit``
   | Nos devuelve productos ordenados por **nombre Descendente**
     dependiendo del nombre y categoria buscada.

-  | ``GET /filterProductsByPrecioASCWithLimit``
   | Nos devuelve productos ordenados por **Precio Ascendente**
     dependiendo del nombre y categoria buscada.

-  | ``GET /filterProductsByPrecioDESCWithLimit``
   | Nos devuelve productos ordenados por **Precio Descendente**
     dependiendo del nombre y categoria buscada.

**Parámetros**

-  category, id de la categoria a buscar.
-  name, nombre del producto a buscar.
-  limit, limita la cantidad de productos a llamar.
-  offset, numero especifico de registros desde el inico de la
   sentencia.

**Ejemplo**

-  ``/api/v1/Product/filterProductsByNameASCWithLimit?category=1&name=monster&limit=4&offset=0``

**Respuesta**

.. code:: json

   [
       {
           "id": 34,
           "name": "ENERGETICA MONSTER RIPPER",
           "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/mosterriper0436.jpg",
           "price": 1990.0,
           "discount": 0,
           "category": 1
       },
       {
           "id": 77,
           "name": "ENERGETICA MONSTER RIPPER",
           "url_image": "",
           "price": 1990.0,
           "discount": 0,
           "category": 1
       },
       {
           "id": 36,
           "name": "ENERGETICA MONSTER VERDE",
           "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/monsterverde0476.jpg",
           "price": 1990.0,
           "discount": 0,
           "category": 1
       },
       {
           "id": 79,
           "name": "ENERGETICA MONSTER VERDE",
           "url_image": "",
           "price": 1990.0,
           "discount": 0,
           "category": 1
       }
   ]

Categorias
----------

Listar Categorias.

.. _estructura-json-1:

Estructura JSON
~~~~~~~~~~~~~~~

Al realizar una petición HTTP, el servicio retornara un JSON con la
siguiente estructura:

.. code:: json

   [
       {
           "id": 1,
           "name": "bebida energetica"
       }
   ]

Listar todos las categorias
~~~~~~~~~~~~~~~~~~~~~~~~~~~

-  ``GET /findAll`` Nos devuelve todas las categorias de la base de
   datos.

**Parametros**

No se necesita pasar ningun parametro para obtener todos los productos
de la base de datos.

**Ejemplo**

-  ``GET /api/v1/Category/findAll``

**Respuesta**

.. code:: json

   [
       {
           "id": 1,
           "name": "bebida energetica"
       },
       {
           "id": 2,
           "name": "pisco"
       },
       {
           "id": 3,
           "name": "ron"
       },
       {
           "id": 4,
           "name": "bebida"
       },
       {
           "id": 5,
           "name": "snack"
       },
       {
           "id": 6,
           "name": "cerveza"
       },
       {
           "id": 7,
           "name": "vodka"
       }
   ]
