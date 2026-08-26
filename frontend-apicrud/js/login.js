// Variables globales formulario
// Tip la constante d, Es igual al documento del navegador
const d = document;
userInput = d.querySelector("#usuarioForm");
passInput = d.querySelector("#contraForm");
btnLogin = d.querySelector(".btnLogin");

//Evento al boton del login
btnLogin.addEventListener("click", () => {
  //   alert("Escribio: " + userInput.value);
  // (getdata devuelve el usuario que se esta ingresando al formulario
  //lo que se hace es  guardarlo en la variable dataForm)
  let dataForm = getData();
  //los datos de dataForm se le pasan a la funcion sendData para poder
  //realizar la peticion
  sendData(dataForm);
});

//Funcion de validacion del formulario
//obtener datos del formulario
let getData = () => {
  //valida formulario
  let user;
  if (userInput.value && passInput.value) {
    user = {
      usuario: userInput.value,
      contrasena: passInput.value,
    };
    //Limpia el formulario
    userInput.value = "";
    passInput.value = "";
  } else {
    alert("El usuario ya la contraseña es obligatorio");
  }
  console.log(user);
  return user;
};

//Funcion para recibir los datos y
//realizar la peticion al servidor
let sendData = async (data) => {
  ///Import la funcion flecha es una promesa y debe
  //devolver una respuesta despues de que se realiza la peticion
  //Para realizar la peticion se neceesita el enpoint(url) a donde
  // se va a envidar la data
  let url = "http://localhost/backend-apiCrud/login";

  //url sacada de peticiones Login de Admin
  try {
    let respuesta = await fetch(url, {
      //configuracion de la peticion
      //metodo POST por que se le enviaran datos
      method: "POST",
      //Headersel encabezado de la peticion
      //enviamos el tipo de contenido en tipo JSON
      headers: {
        "Content-Type": "application/json",
      },
      //Body cuerpo de la peticion
      //Enviamos la data configurada en dato JSON
      body: JSON.stringify(data),
    });
    //.json por que los datos se mandaron en formato texto y para usarlos los pasamos
    //a su formato original (La respuesta queda en la variable  userLogin)
    let userLogin = await respuesta.json();
    // console.log(userLogin);
    //Saludo basado en el nombre ese nombre esta en la base de datos
    alert(`Bienvenido: ${userLogin.nombre}`);

    location.href = "index.html";
  } catch (error) {
    console.log(error);
  }
};
