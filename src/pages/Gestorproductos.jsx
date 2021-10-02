import '../styles/Gestorproductos.css';

function Gestorproductos(){
   return(
<body class="body">
<header>

    <ul class="navbar">


    <li>
        <div class="buscar">
        <input type="text" placeholder="Buscar un producto"/>
        <i class="fas fa-search botonGenerico iconoBusqueda"></i>
        </div>
        </li>
<li>
    <a href="./RegistroProductos.html">
 <button class="boton">
 Registrar producto
 </button>
</a>
</li>

<li>
    <a href="">
 <button class="boton">
 Actualizar producto
 </button>
</a>
</li>


</ul>


</header>

<main>

    
   <div class="tabla1">
    <h1>Lista de productos</h1>

    
    <table class="tabla" border="3">
     <tr>
    <th ><strong>ID </strong></th>
      <th><strong>Descripción</strong></th>
      <th ><strong>Valor Unitario</strong></th>
      <th  ><strong>Estado </strong></th>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

     <tr>
        <td >45454   </td>
        <td > Collar de perro </td>
        <td >$ 20.000 </td>
        <td >Disponible  </td>

     </tr>

    
    </table>
    
</div>
</main>


    
</body>
);
}

export default Gestorproductos;
