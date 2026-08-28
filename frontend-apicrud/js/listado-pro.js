//Variables globales
let tablePro = document.querySelector("#table-pro > tbody");
let searchInput = document.querySelector("#search-input");

//Evento para probar el campo de buscar
searchInput.addEventListener("keyup",  ()=>{
    console.log(searchInput.value);
});

//Evento para el navegador
document.addEventListener("DOMContentLoaded", ()=>{
    getTableData();
});


//Función para traer los datos de la BD a la tabla
let getTableData = async ()=>{
    let url = "http://localhost/Tienda-Virtual-M1/backend-apiCrud/productos"; //validar URL

 try {
    let respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
     });
     if(respuesta.status === 204){
        console.log("No hay datos en la BD")
     }else{
         let tableData = await respuesta.json();
         console.log(tableData)
     }
   
    } catch (error) {
    console.log(error);
  }};
