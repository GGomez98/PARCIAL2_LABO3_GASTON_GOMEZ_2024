import {obtenerTodos, crearUno, editarUno, eliminarUno, obtenerUno, eliminarTodos, obtenerTodosFetch, obtenerUnoFetch} from "./api.js";
import {Planeta} from "./Planeta.js";

let items = []; // array vacio
const formulario = document.forms[0];
const formularioFiltro = document.forms[1];
const btnGuardar = document.getElementById("btnGuardar");
const btnEliminar = document.getElementById("btnEliminar");
const btnCancelar = document.getElementById("btnCancelar");
const btnModificar = document.getElementById("btnModificar");
const btnBorrarTodo = document.getElementById("delete-all-button");
const btnCalcular = document.getElementById("btnCalcular");
const btnFiltrar = document.getElementById("btnFiltrar");

document.addEventListener('DOMContentLoaded', onInit)
btnFiltrar.addEventListener('click', filtrarTabla);
btnCalcular.addEventListener('click', calcularPromedio);

function onInit(){
    loadItems();
    rellenarTabla();
    escuchandoFormulario();
    document.addEventListener('click', handlerClick);
    btnEliminar.addEventListener('click', handlreEliminarAnuncio);
    btnCancelar.addEventListener('click', handlerCancelar);
    btnModificar.addEventListener('click', handlreModificarAnuncio);
    btnBorrarTodo.addEventListener('click', handlerBorrarTodo);
}

async function loadItems() {
    inyectarSpinner();
    const objetos = await obtenerTodosFetch();
    removerSpinner();

    objetos.forEach(obj => {
        const model = new Planeta(
            obj.id,
            obj.nombre,
            obj.tamanio,
            obj.masa,
            obj.tipo,
            obj.distancia,
            obj.vida,
            obj.anillo,
            obj.compAtmosfera
        );
    
        items.push(model);
    });
    rellenarTabla();
}

function rellenarTabla() {
  const tabla = createTable(items);
  const contenedor = document.getElementById('divTabla');
  renderizarTable(tabla,contenedor);
}

function renderizarTable(tabla, contenedor) {
  while (contenedor.hasChildNodes()) {
    contenedor.removeChild(contenedor.firstChild);
  }
  if (tabla) {
    contenedor.appendChild(tabla);
  }
}

async function escuchandoFormulario() {
    formulario.addEventListener("submit", async (e) => {
      e.preventDefault();
  
      const model = new Planeta(
        items.length+1,
        formulario.nombre.value,
        formulario.tamanio.value,
        formulario.masa.value,
        formulario.tipo.value,
        formulario.distancia.value,
        formulario.vida.value,
        formulario.anillo.value,
        formulario.compAtmosfera.value
      );

      const respuesta = model.verify();

      if(!parseFloat(formulario.distancia.value)){
        alert("La distancia debe ser numerica");
        respuesta = respuesta.rta;
      }

      if(!parseFloat(formulario.distancia.value)){
        alert("La distancia debe ser numerica");
        respuesta = respuesta.rta;
      }

      if(!parseFloat(formulario.tamanio.value)){
        alert("El tamanño debe ser numerico");
        respuesta = respuesta.rta;
      }

      if(formulario.vida.checked){
        model.vida = 'Si';
      }
      else{
        model.vida = "No";
      }

      if(formulario.anillo.checked){
        model.anillo = 'Si';
      }
      else{
        model.anillo = "No";
      }
  
      if (respuesta.success) {
        inyectarSpinner();
        await crearUno(model);
        items.push(model);
        removerSpinner();
        actualizarFormulario();
        rellenarTabla();
      }
      else {
          alert(respuesta.rta);
      }
    });
}

async function filtrarTabla(){
  //obtengo todos los items
  inyectarSpinner();
  items = await obtenerTodos()
  //filtro los items por filtro
  if(formularioFiltro.querySelector("#selectTipo").value != ''){
    items = items.filter(planeta => planeta.tipo.toLowerCase() == formularioFiltro.querySelector("#selectTipo").value.toLowerCase());
  }
  rellenarTabla();
  //cargo la tabla de vuelta
    const checkboxes = formularioFiltro.querySelectorAll('#cbxsColumnas .checkbox');
    checkboxes.forEach(element => {
      let header = document.querySelector('#'+element.name+'-header');
      let celdas = document.querySelectorAll('.'+element.name+'-cell');
      if(!element.checked){
        header.classList.add('oculto');
        celdas.forEach(element => {
          element.classList.add('oculto');
        });
      }
      else{
        if(items.length>0){
          header.classList.remove('oculto');
          celdas.forEach(element => {
            element.classList.remove('oculto');
          });
        }
      }
    });
  removerSpinner();
}

  function actualizarFormulario() {
    formulario.reset();
    formulario.vida.removeAttribute("checked");
    formulario.anillo.removeAttribute("checked");
}

/**
 * Crea la tabla
 */
function createTable(items) {
  const tabla = document.createElement("table");
  tabla.appendChild(createThead(items[0]));
  tabla.appendChild(createTbody(items));
  tabla.className = "table table-bordered border-primary"
  return tabla;
}

function createThead(items) {
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  for (const key in items) {
    const th = document.createElement("th");
    th.textContent = key;
    th.id = key+'-header';
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  return thead;
}

function createTbody(items) {
  const tbody = document.createElement("tbody");
  items.forEach((element) => {
    const tr = document.createElement("tr");
    for (const key in element) {
      if (key === "id") {
        tr.setAttribute("data-id", element[key]);
      } 
      const td = document.createElement("td");
      td.textContent = element[key];
      td.classList.add(key+"-cell");
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  });
  return tbody;
}

function cargarFormulario(formulario, ...datos) {
  //metodo que cargar el formulario con datos segun un ID recibido

  formulario.id.value = datos[0]; // este atributo esta como hidden, oculto
  formulario.nombre.value = datos[1];
  formulario.tamanio.value = datos[2];
  formulario.masa.value = datos[3];
  formulario.tipo.value = datos[4];
  formulario.distancia.value = datos[5];
  formulario.vida.value = datos[6];
  if(formulario.vida.value == 'Si'){
    formulario.vida.setAttribute("checked", "checked");
  }
  else{
    formulario.vida.removeAttribute("checked");
  }
  formulario.anillo.value = datos[7];
  if(formulario.anillo.value == 'Si'){
    formulario.anillo.setAttribute("checked", "checked");
  }
  else{
    formulario.anillo.removeAttribute("checked");
  }
  formulario.compAtmosfera.value = datos[8];
}

function modificarFuncionBoton(target) {
  if (target.matches("td")) {
    btnGuardar.classList.add("oculto");
    btnEliminar.classList.remove("oculto");
    btnCancelar.classList.remove("oculto");
    btnModificar.classList.remove("oculto");
  }
  else{
    btnGuardar.classList.remove("oculto");
    btnEliminar.classList.add("oculto");
    btnCancelar.classList.add("oculto");
    btnModificar.classList.add("oculto");
  }
}

function handlerCancelar(e){
  actualizarFormulario();
  modificarFuncionBoton(e.target);
}

async function handlerClick(e) {
  if (e.target.matches("td")) {
    //console.log(e.target.parentNode.dataset.id); // el id lo recupero asi porque lo meti en data-id,

    let id = e.target.parentNode.dataset.id;

    let planeta = items.filter((p) => p.id === parseInt(id))[0]; //filter devuelve un array de las coincidencias, entonces le paso la pos 0
    inyectarSpinner();
    await obtenerUno(planeta);
    removerSpinner();

    console.log("🚀 ~ handlerClick ~ planeta:", planeta);
    cargarFormulario(
      formulario,
      id,
      planeta.nombre,
      planeta.tamanio,
      planeta.masa,
      planeta.tipo,
      planeta.distancia,
      planeta.vida,
      planeta.anillo,
      planeta.compAtmosfera
    );
    modificarFuncionBoton(e.target);
  }else if (!e.target.matches("input")&&!e.target.matches("select")&&!e.target.matches("textarea")) {
    actualizarFormulario();
    modificarFuncionBoton(e.target);
  }
}

async function handlreEliminarAnuncio(e) {
  if (confirm("Confirma la Eliminacion?")) {
    inyectarSpinner();
    let planeta = new Planeta(parseInt(formulario.id.value), formulario.nombre.value, formulario.tamanio.value, formulario.masa.value, formulario.tipo.value, formulario.distancia.value, formulario.vida.value, formulario.anillo.value, formulario.compAtmosfera.value);
    await eliminarUno(planeta);
    items = await obtenerTodos();
    rellenarTabla();
    removerSpinner();
    modificarFuncionBoton(e.target);
    actualizarFormulario();
  }
}


async function handlerBorrarTodo(e){
  if(items == ""){
    alert("La lista esta vacia!");
  }
  else{
    if(confirm("Esta seguro de que desea borrar todo?")){
      if(!btnEliminar.classList.contains('oculto')){
        modificarFuncionBoton(e.target);
        actualizarFormulario();
      }
      inyectarSpinner();
      await eliminarTodos();
      items = await obtenerTodos();
      rellenarTabla();
      removerSpinner();
      actualizarFormulario();
    }
  }
}

async function handlreModificarAnuncio(e) {
  if (confirm("Confirma la Modificacion")) {
    inyectarSpinner();
    let planeta = new Planeta(parseInt(formulario.id.value), formulario.nombre.value, formulario.tamanio.value, formulario.masa.value, formulario.tipo.value, formulario.distancia.value, formulario.vida.value, formulario.anillo.value, formulario.compAtmosfera.value);
    await editarUno(planeta);
    items = await obtenerTodos();
    rellenarTabla();
    removerSpinner()
    modificarFuncionBoton(e.target);
    actualizarFormulario();
  }
}

function inyectarSpinner() {
  const spinner = document.createElement("img");
  const contenedor = document.getElementById("spinner-container");
  spinner.setAttribute("src", "./img/logo.svg");
  spinner.setAttribute("alt", "imagen spinner");
  spinner.setAttribute("height", "64px");
  spinner.setAttribute("width", "64px");
  spinner.setAttribute("id","spinner");
  spinner.classList.add("rotating");
  contenedor.appendChild(spinner);
}

function removerSpinner() {
  const contenedor = document.getElementById("spinner-container");
  contenedor.removeChild(contenedor.firstChild);
}

function calcularPromedio() {
  const listaConFiltroParaCalcular =
  formularioFiltro.querySelector("#selectTipo").value === ""
    ? items
    : items.filter((elemento) => elemento.tipo === formularioFiltro.querySelector("#selectTipo").value);

  let sumatoria = listaConFiltroParaCalcular.reduce((a, b) => a + parseInt(b.distancia), 0);
  let promedio = sumatoria / listaConFiltroParaCalcular.length;
  if(listaConFiltroParaCalcular.length == 0){
    promedio = 0;
  }
  document.getElementById("inputPromedio").value = promedio;
}