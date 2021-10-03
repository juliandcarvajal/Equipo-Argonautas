import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function prueba(){

    return(


<nav class="navbar navbar-expand-lg navbar-dark bg-dark text-white">
  <div class="container-fluid">
    <a class="navbar-brand" href="./pages/gestorVentas">Inicio</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <a class="nav-link active" aria-current="page" href="./pages/inicio">Home</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="./pages/inicio">Link</a>
        </li>

      </ul>
      <form class="form-inline mx-auto">
        <ul>
            <li>
            <input class="form-control me-2" type="search" placeholder="Digite su búsqueda" aria-label="Bucar"/>
            </li>
            <li>
        <button class="btn btn-outline-success" type="submit">Buscar</button>
            </li>
            </ul>
        

      </form>
    </div>
  </div>
</nav>

    )

}


export default prueba;
