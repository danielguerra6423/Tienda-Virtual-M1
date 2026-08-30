//Variables globales
let tablePro = document.querySelector("#table-pro > tbody");
let searchInput = document.querySelector("#search-input");

//Variables globales del formulario de edicion
let formEdit = document.querySelector("#form-edit");
let idEdit = document.querySelector("#id-edit");
let nameEdit = document.querySelector("#nombre-edit");
let descriptionEdit = document.querySelector("#des-edit");
let priceEdit = document.querySelector("#precio-edit");
let stockEdit = document.querySelector("#stock-edit");
let imagenEdit = document.querySelector("#imagen-edit");
let btnUpdate = document.querySelector(".btn-update");
let btnCancel = document.querySelector(".btn-cancel");

//Aqui se guardan los productos que llegan de la API,
//asi editDataTable(pos) puede leer productos[pos] y sacar su id
let productos = [];

//Evento para probar el campo de buscar
searchInput.addEventListener("keyup", () => {
  console.log(searchInput.value);
});

//Evento para el navegador
document.addEventListener("DOMContentLoaded", () => {
  getTableData();
});

//Evento al boton de guardar cambios del formulario de edicion
btnUpdate.addEventListener("click", () => {
  let dataProduct = getEditProduct();
  //solo se envia si el formulario paso la validacion
  if (dataProduct) {
    updateDataProduct(dataProduct);
  }
});

//Evento al boton cancelar: esconde el formulario sin enviar nada
btnCancel.addEventListener("click", () => {
  formEdit.classList.add("d-none");
});

//Función para traer los datos de la BD a la tabla
let getTableData = async () => {
  let url = "http://localhost/backend-apiCrud/productos"; //validar URL

  try {
    let respuesta = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (respuesta.status === 204) {
      console.log("No hay datos en la BD");
    } else {
      let tableData = await respuesta.json();
      console.log(tableData);
      //Se guardan en la variable global para poder editarlos/eliminarlos despues
      productos = tableData;
      //Se limpia la tabla antes de pintar, si no las filas se duplican al refrescar
      tablePro.innerHTML = "";
      //Agregar los datos a la tabla
      tableData.forEach((dato, i) => {
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${i + 1}</td>
        <td>${dato.nombre}</td>
        <td>${dato.descripcion}</td>
        <td>${dato.precio}</td>
        <td>${dato.stock}</td>
        <td> <img src="${dato.imagen}"width="100px"></td>
        <td>
            <button id="btn-edit" onclick="editDataTable(${i})" type="button" class="btn btn-warning">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                 <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                </svg>
            </button>
            <button id="btn-delete" onclick="deleteDataTable(${i})" type="button" class="btn btn-danger">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                </svg>
            </button>
        </td>
        `;
        tablePro.appendChild(row);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//Funcion para editar productos de la tabla
//pos es la posicion de la fila (0,1,2...), no el id de la BD
let editDataTable = (pos) => {
  //Se busca el producto completo que ya se habia guardado del fetch
  let producto = productos[pos];
  console.log(producto);

  //Se precargan los datos del producto en el formulario
  idEdit.value = producto.id;
  nameEdit.value = producto.nombre;
  descriptionEdit.value = producto.descripcion;
  priceEdit.value = producto.precio;
  stockEdit.value = producto.stock;
  imagenEdit.value = producto.imagen;

  //Se muestra el formulario y se lleva la vista hasta el
  formEdit.classList.remove("d-none");
  formEdit.scrollIntoView();
};

//Obtener los datos del formulario de edicion
let getEditProduct = () => {
  //valida formulario
  let product;
  if (
    nameEdit.value &&
    descriptionEdit.value &&
    priceEdit.value &&
    stockEdit.value &&
    imagenEdit.value
  ) {
    product = {
      id: idEdit.value, //el backend lo necesita para saber que fila actualizar
      nombre: nameEdit.value,
      descripcion: descriptionEdit.value,
      precio: priceEdit.value,
      stock: stockEdit.value,
      imagen: imagenEdit.value,
    };
    console.log(product);
  } else {
    alert("Todos los campos obligatorios");
  }
  return product;
};

//Funcion para recibir los datos y enviar la actualizacion al servidor
let updateDataProduct = async (data) => {
  let url = "http://localhost/Tienda-Virtual-M1/backend-apiCrud/productos";

  try {
    let respuesta = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data), //el objeto viaja como texto JSON
    });
    if (respuesta.status === 406) {
      alert("los datos enviados no son admitidos");
    } else {
      let mensaje = await respuesta.text();
      console.log("Lo que respondió el servidor:", mensaje);
      alert("Producto actualizado con exito");
      //Se esconde el formulario y se vuelve a pintar la tabla ya actualizada
      formEdit.classList.add("d-none");
      getTableData();
    }
  } catch (error) {
    console.log(error);
  }
};

//Funcion para eliminar productos de la tabla
//pos es la posicion de la fila (0,1,2...), no el id de la BD
let deleteDataTable = (pos) => {
  //Se busca el producto completo que ya se habia guardado del fetch
  let producto = productos[pos];
  console.log(producto);

  //Se pide confirmacion: confirm() devuelve true (Aceptar) o false (Cancelar)
  let confirmar = confirm(`¿Seguro que desea eliminar el producto "${producto.nombre}"?`);

  //Si el usuario cancela no se envia nada al servidor
  if (!confirmar) {
    return;
  }

  //Si confirmo, se manda el id al servidor
  deleteDataProduct(producto.id);
};

//Funcion para recibir el id y enviar la eliminacion al servidor
let deleteDataProduct = async (id) => {
  let url = "http://localhost/Tienda-Virtual-M1/backend-apiCrud/productos";

  try {
    let respuesta = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }), //el backend lee el id del cuerpo de la peticion
    });
    if (respuesta.status === 406) {
      alert("los datos enviados no son admitidos");
    } else {
      let mensaje = await respuesta.text();
      console.log("Lo que respondió el servidor:", mensaje);
      alert("Producto eliminado con exito");
      //Si el producto borrado era el que estaba abierto en el formulario, se esconde
      if (idEdit.value == id) {
        formEdit.classList.add("d-none");
      }
      //Se vuelve a pintar la tabla ya sin ese producto
      getTableData();
    }
  } catch (error) {
    console.log(error);
  }
};
