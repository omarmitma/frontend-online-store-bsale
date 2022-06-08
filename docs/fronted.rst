Frontend
========

La parte del frontend esta desarrollada con html, scss y vanilla
javascript. Esta estructurado con carpetas como:

-  **icons**, en la que se encuentra todos los iconos a utilizar en la
   pagina web.

-  **js**, en esta carpeta se encontraran todos los archivos
   javascripts.

-  **style**, en esta carpeta estaran todos los archivos scss que luego
   se compilaran a css para que la pagina pueda leerlo.

HTML
----

La pagina esta estructurada con este Lenguaje de Marcas de Hipertexto,
tiene como idioma el español.

La etiqueta ``<head>`` contiene los links para los estilos, titulo del
proyecto y algunos metas comunes como ``charset="UTF-8"``.

La etiqueta ``<body>`` contiene todo el contenido de la pagina, esta
etiqueta contiene una cabezera (``<header>``) en el que estara el boton
de abrir el navegador, un navegador que se llenara de acuerdo a las
categorias traidas desde la API REST, el titulo de la app y un boton de
carrito de muestra. Ademas contiene la parte principal de la pagina que
se encuentra dentro de la etiqueta ``<main>``, en la parte principal de
la pagina tiene una cabezera que contiene un buscador de productos,
elegir orden de productos, tambien contiene todos los productos que se
muestran de acuerdo a la respuesta de la base de datos.

**Estructura de la pagina**

.. code:: html

   <!DOCTYPE html>
   <html lang="es">
   <head>
       <meta charset="UTF-8">
       <meta http-equiv="X-UA-Compatible" content="IE=edge">
       <meta name="viewport" content="width=device-width, initial-scale=1.0">
       <link rel="stylesheet" href="style/style.css">
       <title>Bsale Challenge</title>
   </head>
   <body>
       <header>
           <div class="btnNavMobile">
               <button class="btnMenu" id="btnOpenNav">
                   <img src="icons/menu.png" class="iconMenu">
                   <img src="icons/cancel.png" class="iconClose">
               </button>
           </div>
           <nav class="navMobile" id="nav">
           </nav>
           <div class="title">
               <h1>Bsale Challenge</h1>
           </div>
           <div class="shoppingCart">
               <button>
                   <img src="icons/carrito.png">
               </button>
           </div>
       </header>
       <main id="main">
           <div class="content">
               <div class="headerMain">
                   <div class="orderProducts">
                       <button class="btnOrder" onclick="openOrderList()">
                           <span id="textOrder">A-Z</span>
                           <img src="icons/flecha-hacia-abajo.png">
                       </button>
                       <div class="orderList" id="orderList">
                           <button onclick="changeOrder('A-Z')">A-Z</button>
                           <button onclick="changeOrder('Z-A')">Z-A</button>
                           <button onclick="changeOrder('Precio Menor')">Precio Menor</button>
                           <button onclick="changeOrder('Precio Mayor')">Precio Mayor</button>
                       </div>
                   </div>
                   <div class="productsFinder">
                       <input type="text" placeholder="Buscar Producto" onkeypress="searchProductByNameEnter(event)" id="inputSearchProductByName" >
                       <button onclick="searchProductByName()">
                           <img src="icons/search.png">
                       </button>
                   </div>
               </div>
               <div class="productsContent" id="productsContent">
                   
               </div>
               <div class="paginationContent">
                   <div class="pagination" id="pagination">
                      
                   </div>
               </div>
               <div id="notFound">
                   <p>Producto no encontrado</p>
               </div>
           </div>
           <div class="loadModal">
               <div class="contentImg">
                   <img src="icons/cargando-loading.gif">
               </div>
           </div>
       </main>
       <script src="js/openMenuList.js"></script>
       <script src="js/index.js"></script>
   </body>
   </html>

SCSS
----

Este pre-procesador nos permite trabajar mucho mas rápido en la creacion
de estilos con la posibilidad de crear funciones que realicen ciertas
operaciones matemáticas y reutilizar código gracias a los mixins,
variables que nos permiten guardar valores.

**Variables**

.. code:: scss

   $orange: #ff6800;
   $gray: #70747e;

**Mixin**

.. code:: scss

   @mixin modal {
       background-color: #fff;
       position: absolute;
       top: 0;
       left: 0;
       width: 100%;
       height: 100%;
       justify-content: center;
       align-items: center;
   }

JAVASCRIPT
----------

Existen 2 archivos javascript en el proyecto, en el que esta separado
por eventos click en los que puede ser abrir el navegador de categorias,
abrir la lista de orden en el que se puede ordenar los productos, este
archivo se llama **openMenuList.js**. El otro archivo es toda la logica
para llamar a la API REST y mostrar los productos y las categorias.

Obtener Parametros
~~~~~~~~~~~~~~~~~~

Para filtrar o buscar por categoria los parametros iran en la url
actual, para obtener estos parametros y guardarlo en variables se uso
``URLSearchParams(location.search)`` para luego llamar a la variable en
la que se guardo con un ``.get(parametro)``, como se muestra a
continuacion.

.. code:: js

   //Obtener parametros de url
   let params = new URLSearchParams(location.search);
   let pagination = params.get('pagination') || 1;
   pagination = pagination - 1; 

   //Variables para pasar en la url
   let limit = 8;

   let offset = 0;
   if(pagination !== 0 ) offset = pagination * limit + 1;

   const idCategory = params.get('category') || 1;
   const nameProduct = params.get('product') || "";
   const method = params.get('order') || "A-Z";

Variables URL
~~~~~~~~~~~~~

Para obtener los productos necesitamos una url de la API para poder
traer los productos de acuerdo a los que queramos, en la url principal
para llamar a los productos ordenando y filtrando los productos le
pasamos las variables que tengamos en la url actual, como creamos que la
API ordene los productos con nombres diferentes debemos crear una
funcion que nos devuelva el nombre de metodo que queramos pasandole el
tipo de orden que haya seleccionado el usuario.

.. code:: js

   //Url para pedir a la api los productos a mostrar dependendiendo de la paginacion
   const url = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/${this.methodName(method)}?category=${idCategory}&name=${nameProduct}&limit=${limit}&offset=${offset}`;

   //Url para saber cuantos productos en total se mostraran y saber cuantas paginaciones hacer
   const urlProductAll = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/getAmountOfFilteredProducts?category=${idCategory}&name=${nameProduct}`;

   //Url para obtener las categorias
   const urlCategory = 'https://backend-online-store-bsale.herokuapp.com/api/v1/Category/findAll';

   // Obtener url sin parametros
   const urlWithoutParams = window.location.href.match(/^[^\#\?]+/)[0];

   //Obtener nombre de metodo a llamar a la api dependiendo el orden
   function methodName (order){
       switch (order){
           case "A-Z":
               return "filterProductsByNameASCWithLimit";
           case "Z-A":
               return "filterProductsByNameDESCWithLimit";
           case "Precio Menor":
               return "filterProductsByPrecioASCWithLimit";
           case "Precio Mayor":
               return "filterProductsByPrecioDESCWithLimit";
           default:
               return "filterProductsByNameASCWithLimit";
       }
   }

Llamar API
~~~~~~~~~~

Creamos funciones las cuales llamaran a la url de la API y esta nos
devolvera un JSON que luego pasaremos a una funcion que creara el html y
los añadimos a su respectivo lugar.

-  getProductsAllToPagination, Obtendra la cantidad de productos en
   total y dependiendo de esto se sabra cuantas paginaciones se crearan
   o si no es necesario tener una, luego de que se cargue esto se
   llamara a las demas funciones.

-  getProducts, Obtendra todos los productos dependiendo de la
   paginacion y el limite que le pusimos, luego de que termine de
   obtener los productos se llamara a una funcion que crea el html de
   los products.

-  getCategorys, Obtendra todas las categorias que existan en la base de
   datos, luego de que termine de obtener las categorias llamara a una
   funcion que crea el html de las categorias.

.. code:: js

   //Funcion para obtener la cantidad de paginacion y llamar a la funcion getProducts
   function getProductsAllToPagination() {
       main.classList.add('loading');
       fetch(urlProductAll)
           .then((response) => response.json())
           .then((data)=>{
               //Si la paginacion tiene mas de 1 pagina se llamara al metodo createHtmlPagination
               let page = Math.ceil(data.length / 8);
               if(page > 1) createHtmlPagination(page);
               //Llama a los metodos para obtener las categorias y productos
               getCategorys();
               getProducts();
           })
           .catch(error =>{
               console.error('Error:', error);
               main.classList.remove('loading');
           })
   }
   //Funcion para obtener todos los productos a mostrar segun paginacion y pantalla de carga
   function getProducts(){
       fetch(url)
           .then((response) => response.json())
           .then((data) => {
               if(data.length > 0)createHtmlForProducts(data);
               else document.getElementById('notFound').style.display = 'block';
           })
           .catch(error => console.error('Error:', error))
           .finally(()=>main.classList.remove('loading'));
   }
   //Funcion para obtener las categorias y mostrarlas
   function getCategorys(){
       fetch(urlCategory)
           .then((response) => response.json())
           .then((data) => {
               createListOfCategories(data)
           })
           .catch(error => console.error('Error:', error));
   }

Actualizar parametros de la pagina
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para redirigir la pagina con los parametros filtrados necesitamos una
funcion que devuelva todos los parametros a mandar, esta funcion nos
devolvera un string de los nuevos parametros para cuando filtremos algun
producto la pagina se actualize con los nuevos parametros.

.. code:: js

   //Funcion para actualizar los parametros a mandar en la url
       function updateParamsUrl(idCategory, order, name, pagination) {
       let params = '?';

       if(idCategory != 1) params += "category=" + idCategory;
       if(order != 'A-Z') params += "&order=" + order;
       if(name != '') params += "&product=" + name;
       if(pagination != 0 ) params += "&pagination=" + ( pagination + 1);

       if(params.length < 2) params = '';
       if(params.charAt(1) == '&') params = params.replace('?&','?');

       return params;
   }

Eventos
-------

Abrir menu
~~~~~~~~~~

Dar click al boton menu nos abrira un navegador en el que estara las
categorias que podemos seleccionar, para abrir este navegador se tuvo
que crear una funcion que agregara una clase que esta desarrollada en
scss.

.. code:: js

   //Abrir y cerrar navegador
   const btnNav = document.getElementById('btnOpenNav');
   const nav = document.getElementById('nav');
   let navOpen = false;
   btnNav.addEventListener('click',()=>{
       if(navOpen){
           navOpen = false;
           btnNav.classList.add('btnMenu');
           btnNav.classList.remove('btnClose');
           nav.classList.add('navMobile');
           nav.classList.remove('navMobileActive');
       }else {
           navOpen = true;
           btnNav.classList.add('btnClose');
           btnNav.classList.remove('btnMenu');
           nav.classList.add('navMobileActive');
           nav.classList.remove('navMobile');
       }
   });

Abrir orden
~~~~~~~~~~~

Dar click al boton de ordenes, nos abrira una lista de botones en las
que podemos ordenar segun nuestro gusto, para poder abrir esta lista el
boton llama a una funcion que agrega una clase de scss al boton.

.. code:: js

   //Abrir la lista de orden
   let orderActive = false;
   function openOrderList(){
       let orderList = document.getElementById('orderList');
       if(orderActive){
           orderActive = false;
           orderList.classList.remove('orderListActive');
       }else{
           orderActive = true;
           orderList.classList.add('orderListActive');
       }
   }

Cambiar orden de productos
~~~~~~~~~~~~~~~~~~~~~~~~~~

Una ves abierto la lista de ordenes podremos dar click a cualquier boton
de esta lista, esto llamara a la funcion ``changeOrder(PARAMETRO)`` que
tendremos que pasarle un parametro, esta funcion nos redirigira a la
pagina actualizando el parametro de order.

.. code:: js

   //Cambiar orden de los productos
   function changeOrder(order){
       window.location.href = urlWithoutParams + updateParamsUrl(idCategory, order, nameProduct, pagination);
   }

Buscar Producto
~~~~~~~~~~~~~~~

Al dar click o presionar ENTER en el buscador esto nos llamara a una
funcion que buscara en la base de datos un nombre de producto que
contenga lo ingresado en el input.

.. code:: js

   //Buscar producto por nombre
   function searchProductByName(){
       let inputSearchProductByName = document.getElementById('inputSearchProductByName').value;
       window.location.href = urlWithoutParams + updateParamsUrl(idCategory, method, inputSearchProductByName, pagination);
   }
   function searchProductByNameEnter(e){
       let tecla = (document.all) ? e.keyCode : e.which;
       if (tecla==13) searchProductByName() ;
   }

Link
----

-  Url de la pagina : https://frontend-online-store-bsale.herokuapp.com
