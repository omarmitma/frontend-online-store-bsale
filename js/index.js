'use strict';
//Obtener parametros de url
let params = new URLSearchParams(location.search);
let pagination = params.get('pagination') || 1;
pagination = pagination - 1; 

//Variables para pasar en la url
let limit = 8;

let offset = 0;
if(pagination !== 0 ) offset = pagination * limit ;

const idCategory = params.get('category') || 0;
const nameProduct = params.get('name') || "";
let order = params.get('order') || "A-Z";
order = order.replace(/ /g, "");

//Url para obtener las categorias
const urlCategory = 'https://backend-online-store-bsale.herokuapp.com/api/v1/Category/findAll';

//Url para obtener todos los productos (no se mostrara todo esto solo se usara para ver la cantidad de paginacion a hacer)
let urlProductsPagination = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/`;
//Url para obtener los productos a mostrar segun paginacion
let urlShowProducts = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/order?order=${order}&limit=${limit}&offset=${offset}`;

//Cambiar url segun parametros
if(idCategory > 0){
    urlProductsPagination = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/bycategory?category=${idCategory}`;
    urlShowProducts = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/bycategorywithorder?category=${idCategory}&order=${order}&limit=${limit}&offset=${offset}`;
} 
else if(nameProduct != ""){
    urlProductsPagination = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/byname?name=${nameProduct}`;
    urlShowProducts = `https://backend-online-store-bsale.herokuapp.com/api/v1/Product/bynamewithorder?name=${nameProduct}&order=${order}&limit=${limit}&offset=${offset}`;
} 
// Obtener url sin parametros
const urlWithoutParams = window.location.href.match(/^[^\#\?]+/)[0];

//Funcion para obtener la cantidad de paginacion y llamar a la funcion getProducts
const main = document.getElementById("main");
function getProductsAllToPagination() {
    main.classList.add('loading');
    fetch(urlProductsPagination)
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
    fetch(urlShowProducts)
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

//Funcion para actualizar los parametros a mandar en la url
function updateParamsUrl(idCategory, order, name, pagination) {
    let params = '?';

    if(idCategory != 0) params += "category=" + idCategory;
    if(name != '') params += "&name=" + name;
    if(order != 'A-Z') params += "&order=" + order;
    if(pagination != 0 ) params += "&pagination=" + ( pagination + 1);

    if(params.length < 2) params = '';
    if(params.charAt(1) == '&') params = params.replace('?&','?');

    return params;
}

//Cambiar orden de los productos
function changeOrder(order){
    window.location.href = urlWithoutParams + updateParamsUrl(idCategory, order, nameProduct, pagination);
}

//Buscar producto por nombre
function searchProductByName(){
    let inputSearchProductByName = document.getElementById('inputSearchProductByName').value;
    window.location.href = urlWithoutParams + updateParamsUrl(0, order, inputSearchProductByName, 0);
}
function searchProductByNameEnter(e){
    let tecla = (document.all) ? e.keyCode : e.which;
    if (tecla==13) searchProductByName() ;
}

//Creacion de html
//Crear html para las categorias
function createListOfCategories(data) { 
    let ul = document.createElement("ul");
    data.forEach(element => {
        //Si la pagina actual es la misma se agrega la clase activa
        let classA = "";
        if(element.id == idCategory)classA = 'class ="activeCategory"'; 
        //
        let href = urlWithoutParams + updateParamsUrl(element.id, order, "", 0);
        ul.innerHTML += `<li>
                            <a href="${href}" ${classA}>${element.name}</a>
                        </li>`;
    });
    nav.appendChild(ul);
}
//Crear html para los productos
const productsContent = document.getElementById('productsContent');
function createHtmlForProducts(data) { 
    let ul = document.createElement('ul');
    data.forEach(element => {
        ul.innerHTML += `<li>
                            <div class="product">
                                <div class="productImage">
                                    <img src="${element.url_image}">
                                </div>
                                <div class="productName">
                                    <p>${element.name}</p>
                                </div>
                                <hr>
                                <div class="productPrice">
                                    <span>$${element.price}</span>
                                    <button>
                                        <img src="icons/add-to-cart.png">
                                    </button>
                                </div>
                            </div>
                        </li>`;
    });
    productsContent.appendChild(ul);
}
//Crear html de la paginacion
const paginationHtml = document.getElementById('pagination');
function createHtmlPagination(page) {
    let ul = document.createElement("ul");
    //Paginacion retroceder pagina
    let hrefPrevious = urlWithoutParams + updateParamsUrl(idCategory, order, nameProduct, pagination - 1 );
    let previous = `<li>
                        <a href="${hrefPrevious}" class="previous">
                            <img src="icons/arrow.png">
                        </a>
                    </li>`;
    if(pagination == 0) previous = `<li>
                                        <a disabled class="previous">
                                            <img src="icons/arrow.png">
                                        </a>
                                    </li>`;
    ul.innerHTML += previous; 
    //Paginacion Siguiente pagina
    let hrefNext = urlWithoutParams + updateParamsUrl(idCategory, order, nameProduct, pagination + 1 );
    let next = `<li>
                        <a href="${hrefNext}" class="next">
                            <img src="icons/arrow.png">
                        </a>
                    </li>`;
    if(pagination == page - 1) next = `<li>
                                        <a disabled class="next">
                                            <img src="icons/arrow.png">
                                        </a>
                                    </li>`; 
    //Cantidad de paginas y pintarlas con su url
    for (let i = 0; i < page; i++) {
        //Si la pagina actual es la misma se agrega la clase activa
        let classA = '';
        if(i == pagination) classA = 'class = "activePagination"'; 
        //
        let href = urlWithoutParams + updateParamsUrl(idCategory, order, nameProduct, i );
        ul.innerHTML += `<li>
                    <a href="${href}" disabled ${classA} >${i + 1}</a>
                </li>`;
    }
    ul.innerHTML += next; 
    paginationHtml.appendChild(ul);
}

let init = ()=>{
    //Poner en el input el nombre buscado
    document.getElementById('inputSearchProductByName').value = nameProduct;
    //Poner el texto dependiendo del orden filtrado
    const textOrder = document.getElementById('textOrder');
    textOrder.innerText = order;
    //Llama a la funcion getProductsAllToPagination y pintar todo los datos
    getProductsAllToPagination();
}

init();