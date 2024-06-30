const URL = "http://localhost:3000";

export function obtenerTodos() {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          }
          else {
            reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
          }
        }
      });
  
      xhr.open("GET", `${URL}`+'/planetas');
      xhr.send();
    });
  }

  export function obtenerUno(object) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          }
          else {
            reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
          }
        }
      });
  
      xhr.open("GET", `${URL}`+`/planetas/${object.id}`);
      xhr.send();
    });
  }
  
  export function crearUno(object) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
  
      xhr.addEventListener("readystatechange", function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            resolve(data);
          }
          else {
            reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
          }
        }
      });
  
      xhr.open("POST", `${URL}`+`/planetas`);
      xhr.setRequestHeader("Content-Type", "application/json");
      xhr.send(JSON.stringify(object));
    });
  }

  export function editarUno(object) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          const data = JSON.parse(xhr.responseText);
          resolve(data);
        } else {
          // falló algo
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
  
    // Ahora los datos lo pasamos via PUT, debido a que estamos por agregar/manipular el contenido del backend
    // debemos aclarar el tipo de dato que va a viajar en el cuerpo de la peticion
    xhr.open("PUT", `${URL}/planetas/${object.id}`);
    xhr.setRequestHeader("content-type", "application/json");
    xhr.send(JSON.stringify(object)); // lo convierto a un json string
    });
  }

  export function eliminarUno(object) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          const data = xhr.responseText;
          resolve(data);
        } else {
          // falló algo
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
  
    // Ahora los datos lo pasamos via PUT, debido a que estamos por agregar/manipular el contenido del backend
    // debemos aclarar el tipo de dato que va a viajar en el cuerpo de la peticion
    xhr.open("DELETE", `${URL}/planetas/${object.id}`);
    xhr.send(JSON.stringify(object)); // lo convierto a un json string
    });
  }

  export function eliminarTodos() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function () {
      //agregamos el manejador de eventos
      if (xhr.readyState == 4) {
        // Petición finalizada
        if (xhr.status == 200) {
          // respuesta del servidor si actualiza con exito
          const data = xhr.responseText;
          resolve(data);
        } else {
          // falló algo
          reject(new Error("ERR " + xhr.status + " :" + xhr.statusText));
        }
      }
    });
  
    // Ahora los datos lo pasamos via PUT, debido a que estamos por agregar/manipular el contenido del backend
    // debemos aclarar el tipo de dato que va a viajar en el cuerpo de la peticion
    xhr.open("DELETE", `${URL}/planetas`);
    xhr.send(JSON.stringify(xhr.responseText)); // lo convierto a un json string
    });
  }

  export async function obtenerTodosFetch() {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${URL}/planetas`, options);
    res = await res.json();
  
    return res;
  }

  export async function obtenerUnoFetch(id) {
    const options = {
      method: "GET",
      headers: { "content-type": "application/json" },
    };
  
    let res = await fetch(`${URL}/planetas/${id}`, options);
    res = await res.json();
  
    console.log(res);
    return res;
  }