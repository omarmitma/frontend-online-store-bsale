'use strict';


//Abrir y cerrar navegador mobile
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