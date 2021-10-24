import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Table,Button,Container,Modal,ModalHeader,ModalBody,FormGroup,ModalFooter,
} from "reactstrap";
import '../styles/usuarios.css';
import { Link } from 'react-router-dom';

const data = [
  { ID: 1, Nombre: "Angelica", Rol: "Administrador", Estado:"Autorizado"},
  { ID: 2, Nombre: "Julian", Rol: "Vendedor", Estado:"Pendiente"},
  { ID: 3, Nombre: "Larry", Rol: "Vendedor",Estado:"Autorizado" },
  { ID: 4, Nombre: "Alejandro", Rol: "Vendedor",Estado:"Autorizado" },
  { ID: 5, Nombre: "Daniela", Rol: "Vendedor",Estado:"Pendiente"},
  
];

class App extends React.Component {
  state = {
    busqueda:'', 
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      ID: "",
      Nombre: "",
      Rol: "",
      Estado:"",
    },
  };

  mostrarModalActualizar = (dato) => {
    this.setState({
      form: dato,
      modalActualizar: true,
    });
  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({
      modalInsertar: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  listar = async () => {
    try {
      const resp = await fetch("http://localhost:3002/api/usuarios", { method: "GET" })
      const data = await resp.json()
      this.setState({ data: data })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  editar = async (dato) => {
    try {
      const resp = await fetch("http://localhost:3002/api/usuarios/"+dato._id, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    this.listar()
    this.cerrarModalActualizar()
    
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el usuario "+dato.ID);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.ID == registro.ID) {
          arreglo.splice(contador, 1);
        }
        contador++;
      });
      this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  insertar = async () => {
    try {
      const resp = await fetch("http://localhost:3002/api/usuarios", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    this.listar()
    this.cerrarModalInsertar()
  }


  
  /*captura el valor del input*/
  onChange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value});
    console.log(this.state.busqueda);
    console.log('lista filtrada',this.state.data.filter((elemento)=>{
      console.log("elemento",elemento);
      return JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase());
    })
    );
    
    this.filtrar();  /*Se llama a la funcion filtar cada que se escribe en el buscador*/
  }
  filtrar=()=>{
    var search=data.filter((elemento)=>{
      if(JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase())){
        return elemento;
      }
    });
    this.setState({data:search}); /*actualiza la tabla*/
  }

  componentDidMount(){
    this.listar()
  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    
    return (
      <>
        <Container >
        <br />
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Crear nuevo usuario</Button>
          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-3 py-1'  onChange={this.onChange}/>
          <br />
        
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Documento</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato._id}>
                  <td>{dato._id}</td>
                  <td>{dato.NombreApellido}</td>
                  <td>{dato.Documento}</td>
                  <td>{dato.Correo}</td>
                  <td>{dato.Role}</td>
                  <td>{dato.Estado}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="secondary" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form._id}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Documento: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Documento}
              />
            </FormGroup>
                        
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.NombreApellido}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Telefono: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Telefono}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Correo: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Correo}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Sucursal: 
              </label>
              <input
                className="form-control"
                name="Nombre"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Sucursal}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Rol: 
              </label>
              <select  className="form-control" name="Role" value={this.state.form.Role} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Administrador</option> 
                <option>Vendedor</option> 
                
              </select> 
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="Estado" value={this.state.form.Estado} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Autorizado</option> 
                <option>No Autorizado</option> 
                <option>Pendiente</option> 
              </select>  
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Editar
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Crear Usuario</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
              Documento: 
              </label>
              
              <input
                className="form-control"
                name="Documento"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Nombre: 
              </label>
              <input
                className="form-control"
                name="NombreApellido"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Telefono: 
              </label>
              <input
                className="form-control"
                name="Telefono"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Correo: 
              </label>
              <input
                className="form-control"
                name="Correo"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Sucursal: 
              </label>
              <input
                className="form-control"
                name="Sucursal"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Rol: 
              </label>
              <select  className="form-control" name="Role" value={this.state.form.Role} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Administrador</option> 
                <option>Vendedor</option> 
                
              </select> 
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="Estado" value={this.state.form.Estado} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Autorizado</option> 
                <option>No Autorizado</option> 
                <option>Pendiente</option> 
              </select>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Crear
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
        <Link  to='/Navegador'>
          <button type='button' className="bton">Volver</button>  
        </Link>
      </>
    );
  }
}
export default App;