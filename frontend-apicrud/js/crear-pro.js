//Variable grlobales del formulario
const d = document;
let nameInput = d.querySelector("#productos-select");
let priceInput = d.querySelector("#precio-pro");
let stockInput = d.querySelector("#stock-pro");
let descriptionInput = d.querySelector("#des-pro");
let imagenInput = d.querySelector("#imagen-pro");
let btnCreate = d.querySelector(".btn-create");

//evento al boton de formulario
btnCreate.addEventListener("click", () => {
  // alert('Producto:'+ nameInput.value);
  let dataProduct = getDataProduct();
  sendDataProduct(dataProduct);
});

//funcion para validar el formulario

//obtener los datos del formulario
let getDataProduct = () => {
  //valida formulario
  let product;
  if (
    nameInput.value &&
    priceInput.value &&
    stockInput.value &&
    descriptionInput.value &&
    imagenInput.src
  ) {
    product = {
    nombre: nameInput.value,
    descripcion: descriptionInput.value,
    precio: priceInput.value,
    stock: stockInput.value,
    imagen: imagenInput.src,
    };
    //Limpia el formulario
    priceInput.value = "";
    descriptionInput.value = "";
    stockInput.value = "";
    imagenInput.src = "https://m.media-amazon.com/images/I/61XV8PihCwL._SY250_.jpg";
    console.log(product);
} else {
    alert("Todos los campos obligatorios");
}
return product;

};

//funcion para recibir los datos y
//realizar la peticion al servidor
let sendDataProduct = async (data) => {
    let url = "http://localhost/Tienda-Virtual-M1/backend-apiCrud/productos";
    try {
    let respuesta = await fetch(url, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
    },
        body: JSON.stringify(data),
    });
    if (respuesta.status === 406) {
        alert("los datos enviados no son admitidos");
    } else {
        let Mensaje = await respuesta.text();
        alert("Lo que respondió el servidor:", Mensaje);
        location.href = "";
    }
} catch (error) {
    console.log(error);
    }
};
