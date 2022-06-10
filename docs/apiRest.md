# API REST

La Api Rest esta desarrollada con el lenguaje java y utilizando como framework Spring Boot, cuenta con las siguientes capas:  

- **Controller:**  Esta capa es la encargada a responder a diferentes métodos HTTP definidos por la anotación **@GetMapping**.
- **Model:**  Esta capa es donde se encuentran las entidades que tienen una correspondencia directa con una tabla de la base de datos.
- **Repository:**  En esta capa estan las clases encargadas de gestionar el acceso a los datos, disponen de métodos básicos de CRUD, además podemos definir nuestras propias consultas con la ayuda de la anotacion **@Query**.
- **Service:**  Esta capa es la que accede a los datos almacenados en la base de datos de la aplicación a través de los repositorios, hacen una serie de operaciones, y envían los datos al controlador.

## Tablas BD

La base de datos que nos proporcionaron contiene 2 tablas llamadas **product** y **category**.

### Tabla product

Variable        | TIPO
----------------|---------------------------------------------
**id**          | Identificador unico del producto (int).
**name**        | Nombre del producto (varchar).
**url_image**   | URL de la imagen asociada al producto (varchar).
**price**       | Precio de venta del producto (float).
**discount**    | Porcentaje de descuento del producto (int).
**category**    | Identificador de la categoría (int).

### Tabla category

Variable        | TIPO
----------------|---------------------------------------------
**id**          | Identificador único de la categoría (int).
**name**        | Nombre de la categoría (varchar).

## Productos

Listar productos, filtrar productos, ordenar productos

### Estructura JSON
Al realizar una petición HTTP, el servicio retornara un JSON con la siguiente estructura:

``` JSON
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
```


### Listar todos los productos
- ` GET / `  Nos devuelve todos los productos de la base de datos.  

**Parámetros**  

No se necesita pasar ningun parametro para obtener todos los productos de la base de datos.

**Ejemplo**  

- ` GET /api/v1/Product/ `

### Filtrar producto por categoria

- ` GET /bycategory `  Nos devuelve todos los productos de una categoria especificada.

**Parámetros**  

- category, id de la categoria a buscar.
  
**Ejemplo**  

- ` GET /api/v1/Product/bycategory?category=7 `

**Respuesta**

``` JSON
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
```

### Filtrar producto por nombre

- ` GET /byname `  Nos devuelve todos los productos filtrando por nombre.

**Parámetros**  

- name, nombre del producto a buscar.
  
**Ejemplo**  

- ` GET /api/v1/Product/byname?name=coca `

**Respuesta**

``` JSON

[
    {
        "id": 37,
        "name": "COCA COLA ZERO DESECHABLE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/cocazero9766.jpg",
        "price": 1490.0,
        "discount": 0,
        "category": 4
    },
    {
        "id": 57,
        "name": "COCA COLA NORMAL DESECHABLE 1500cc",
        "url_image": null,
        "price": 1500.0,
        "discount": 0,
        "category": 4
    },
    {
        "id": 58,
        "name": "COCA COLA LIGHT DESECHABLE",
        "url_image": null,
        "price": 1500.0,
        "discount": 0,
        "category": 4
    }
]

```

### Filtrar productos ordenados 

- ` GET /order `  Nos devuelve una cantidad de productos ordenados dependiendo de los parametros.

**Parámetros**  

- order, tipo de orden.("A-Z","Z-A","PrecioMenor","PrecioMayor")  
- limit, limita la cantidad de productos a llamar.
- offset, numero especifico de registros desde el inico de la sentencia.
  
**Ejemplo**  

- ` GET /api/v1/Product/order?order=PrecioMenor&limit=4&offset=0 `

**Respuesta**
``` JSON
[
    {
        "id": 53,
        "name": "Mani Sin Sal",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisinsalmp6988.jpg",
        "price": 500.0,
        "discount": 0,
        "category": 5
    },
    {
        "id": 55,
        "name": "Papas Fritas Bolsa Pequeña",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/papaslisas7271.jpg",
        "price": 500.0,
        "discount": 0,
        "category": 5
    },
    {
        "id": 47,
        "name": "Maní salado",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/manisaladomp4415.jpg",
        "price": 600.0,
        "discount": 0,
        "category": 5
    },
    {
        "id": 98,
        "name": "Cerveza Escudo Normal LATA 350CC",
        "url_image": "",
        "price": 600.0,
        "discount": 0,
        "category": 6
    }
]
```

### Filtrar productos por nombre y ordenados

- ` GET /bynamewithorder ` Nos devuelve una cantidad de productos filtrados por **nombre** ordenados.

**Parámetros**  

- name, nombre del producto a buscar.
- order, tipo de orden.("A-Z","Z-A","PrecioMenor","PrecioMayor")  
- limit, limita la cantidad de productos a llamar.
- offset, numero especifico de registros desde el inico de la sentencia.
  
**Ejemplo**  

- ` /api/v1/Product/bynamewithorder?name=coca&order=PrecioMenor&limit=3&offset=0 `

**Respuesta**
``` JSON
[
    {
        "id": 37,
        "name": "COCA COLA ZERO DESECHABLE",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/cocazero9766.jpg",
        "price": 1490.0,
        "discount": 0,
        "category": 4
    },
    {
        "id": 57,
        "name": "COCA COLA NORMAL DESECHABLE 1500cc",
        "url_image": null,
        "price": 1500.0,
        "discount": 0,
        "category": 4
    },
    {
        "id": 58,
        "name": "COCA COLA LIGHT DESECHABLE",
        "url_image": null,
        "price": 1500.0,
        "discount": 0,
        "category": 4
    }
]
```



### Filtrar productos por categoria y ordenados

- ` GET /bycategorywithorder ` Nos devuelve una cantidad de productos filtrados por **categoria** ordenados.

**Parámetros**  

- category, id de la categoria.
- order, tipo de orden.("A-Z","Z-A","PrecioMenor","PrecioMayor")  
- limit, limita la cantidad de productos a llamar.
- offset, numero especifico de registros desde el inico de la sentencia.
  
**Ejemplo**  

- ` /api/v1/Product/bycategorywithorder?category=2&order=PrecioMenor&limit=3&offset=0 `

**Respuesta**
``` JSON
[
    {
        "id": 12,
        "name": "PISCO CAMPANARIO 35º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario8845.jpg",
        "price": 2990.0,
        "discount": 20,
        "category": 2
    },
    {
        "id": 10,
        "name": "PISCO ARTESANOS 35º ",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/artesanos8818.jpg",
        "price": 3990.0,
        "discount": 0,
        "category": 2
    },
    {
        "id": 13,
        "name": "PISCO CAMPANARIO 40º",
        "url_image": "https://dojiw2m9tvv09.cloudfront.net/11132/product/campanario408881.jpg",
        "price": 3990.0,
        "discount": 20,
        "category": 2
    }
]
```


## Categorias

Listar Categorias.

### Estructura JSON
Al realizar una petición HTTP, el servicio retornara un JSON con la siguiente estructura:

``` JSON
[
    {
        "id": 1,
        "name": "bebida energetica"
    }
]
```

### Listar todos las categorias
- ` GET /findAll `  Nos devuelve todas las categorias de la base de datos.  

**Parametros**  

No se necesita pasar ningun parametro para obtener todos los productos de la base de datos.

**Ejemplo**  

- ` GET /api/v1/Category/findAll `

**Respuesta**

``` JSON
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
```
