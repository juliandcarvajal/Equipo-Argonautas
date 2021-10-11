import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/usuarios.css';

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const data = [
  { ID: 1, descripción: "Collar de perro", Valor_unitario: "$ 10.000", Estado:"Disponible"},
  { ID: 2, descripción: "Gimnasio de gato pequeño", Valor_unitario: "$80.000", Estado:"Disponible"},
  { ID: 3, descripción: "Comedero de perros", Valor_unitario: "$30.000",Estado:"Dispoible" },
  { ID: 4, descripción: "Gimnasio  de gato grande", Valor_unitario: "$130.000",Estado:"No disponible" },
  { ID: 5, descripción: "Galletas artesanales de perro ", Valor_unitario: "$6.000",Estado:"Disponible"},
  { ID: 6, descripción: "Cama de perro", Valor_unitario: "$35.000" ,Estado:"Disponible"},
];

class App extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      ID: "",
      Descripción: "",
      Valor_unitario: "",
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

  editar = (dato) => {
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.ID == registro.ID) {
         arreglo[contador].ID = dato.ID;
        arreglo[contador].descripción = dato.descripción;
        arreglo[contador].Valor_unitario = dato.Valor_unitario;
        arreglo[contador].Estado = dato.Estado;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento "+dato.ID);
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

  insertar= ()=>{
    var valorNuevo= {...this.state.form};
    
    var lista= this.state.data;
    lista.push(valorNuevo);
    this.setState({ modalInsertar: false, data: lista });
  }

  onChange=async e=>{
    e.persist();
    await this.setState({busqueda:e.target.value});
    /*console.log(this.state.busqueda);
    console.log('lista filtrada',this.state.data.filter((elemento)=>{
      console.log("elemento",elemento);
      return JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase());
    })
    );
    esto era para vefiricar salida por consola*/
    
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
    this.setState({data:data});
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
        
          <Button color="success"  onClick={()=>this.mostrarModalInsertar()}>Crear un nuevo producto</Button>
          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-2 py-1  '  onChange={this.onChange}/>
         
          <br />
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Descripción</th>
                <th>Valor Unitario</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.ID}>
                  <td>{dato.ID}</td>
                  <td>{dato.descripción}</td>
                  <td>{dato.Valor_unitario}</td>
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
                value={this.state.form.ID}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción: 
              </label>
              <input
                className="form-control"
                name="descripción"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.descripción}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor unitario: 
              </label>
              <input
                className="form-control"
                name="Valor_unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Valor_unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="Estado" value={this.state.form.Estado} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Disponible</option> 
                <option>No Disponible</option> 
                
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
           <div><h3>Insertar descripción</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                ID: 
              </label>
              
              <input
                className="form-control"
                name="ID"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                descripción: 
              </label>
              <input
                className="form-control"
                name="descripción"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Valor_unitario: 
              </label>
              <input
                className="form-control"
                name="Valor_unitario"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="Estado" value={this.state.form.Estado} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Disponible</option> 
                <option>No Disponible</option> 
                
              </select>
            </FormGroup>

          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar()}
            >
              Insertar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}
export default App;