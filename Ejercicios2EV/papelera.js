document.getElementById("trash").addEventListener("click", function(){alert("Se vacia la papelera")}, false);
document.getElementById("trash").addEventListener("click", function(){this.style.backgroundImage = 'url("https://cdn.icon-icons.com/icons2/12/PNG/256/recycling_recyclebin_empty_delete_trash_1771.png")';}, false); //Con ruta desde la pagina donde se descarga
//document.getElementById("trash").addEventListener("click", function(){this.style.backgroundImage = 'url("papeleraVacia.png")';}, false); Con ruta del archivo
document.querySelector(".trash").addEventListener("click", function(){alert("Se ha hecho click con el querySelector")}, false) 
//querySelector hace return de el primer elemento de CSS o elemento HTML que encuentra
