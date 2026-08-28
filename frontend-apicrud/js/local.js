//Variables globlaes admin
const d = document;
let nameUser = d.querySelector("#nombre-usuario");
let btnLogout = d.querySelector("#btnLogout");
//Evento recargar pagina o iniciar carga el nombre usuario
d.addEventListener("DOMContentLoaded", () => {
  getUser();
});

//Funcion para mostrar el nombre del usuario iniciado
let getUser = () => {
  let user = JSON.parse(localStorage.getItem("userLogin"));
  nameUser.textContent = user.nombre;
};
//Evento para el boton logout
btnLogout.addEventListener("click", () => {
  localStorage.removeItem("userLogin");
  location.href = "login.html";
});
