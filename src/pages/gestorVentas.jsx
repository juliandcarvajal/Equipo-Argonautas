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
  { ID: 1321312, Fecha: "Naruto", ID_Producto: "Naruto", Cantidad:"A",Precio_Unitario:"",Valor_Total:"",N_Documento:"",Cliente:"",Vendedor:""},
  { ID: 2232, Fecha: "Naruto", ID_Producto: "Naruto", Cantidad:"A",Precio_Unitario:"",Valor_Total:"",N_Documento:"",Cliente:"",Vendedor:""},
  { ID: 144523, Fecha: "Naruto", ID_Producto: "Naruto", Cantidad:"A",Precio_Unitario:"",Valor_Total:"",N_Documento:"",Cliente:"",Vendedor:""},
 ];

class Ap extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      ID: "",
      Fecha: "",
      ID_Producto: "",
      Cantidad:"",
      Precio_Unitario:"",
      Valor_Total:"",
      N_Documento:"",
      Cliente:"",
      Vendedor:"",
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
        arreglo[contador].Fecha = dato.Fecha;
        arreglo[contador].ID_Producto = dato.ID_Producto;
        arreglo[contador].Cantidad = dato.Cantidad;
        arreglo[contador].Precio_Unitario = dato.Precio_Unitario;
        arreglo[contador].Valor_Total = dato.Valor_Total;
        arreglo[contador].N_Documento = dato.N_Documento;
        arreglo[contador].Cliente = dato.Cliente;
        arreglo[contador].Vendedor = dato.Vendedor;
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
          <Button color="success"  onClick={()=>this.mostrarModalInsertar()}>Crear</Button>
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Fecha</th>
                <th>ID producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Valot total</th>
                <th> # Documento</th>
                <th>Cliente</th>
                <th>Vendedor</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.ID}>
                  <td>{dato.ID}</td>
                  <td>{dato.Fecha}</td>
                  <td>{dato.ID_Producto}</td>
                  <td>{dato.Cantidad}</td>
                  <td>{dato.Precio_Unitario}</td>
                  <td>{dato.Valor_Total}</td>
                  <td>{dato.N_Documento}</td>
                  <td>{dato.Cliente}</td>
                  <td>{dato.Vendedor}</td>
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
                Fecha: 
              </label>
              <input
                className="form-control"
                name="Fecha"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Fecha}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                ID producto: 
              </label>
              <input
                className="form-control"
                name="ID_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ID_Producto}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <select  className="form-control" name="Cantidad" value={this.state.form.Cantidad} onChange={this.handleChange}>
               <option selected value="0">Elige una opcion</option>
               <option>Disponible</option> 
                <option>No Disponible</option> 
                
              </select>
            </FormGroup>


            <FormGroup>
              <label>
               Precio Unitario:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Precio_Unitario}
              />
            </FormGroup>


            <FormGroup>
              <label>
               Valor Total:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Valor_Total}
              />
            </FormGroup>

            <FormGroup>
              <label>
               # Documento:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.N_Documento}
              />
            </FormGroup>

            <FormGroup>
              <label>
               Cliente:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Cliente}
              />
            </FormGroup>

            <FormGroup>
              <label>
              Vendedor :
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Vendedor}
              />
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
           <div><h3>Insertar Fecha</h3></div>
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
                Fecha: 
              </label>
              <input
                className="form-control"
                name="Fecha"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                ID_Producto: 
              </label>
              <input
                className="form-control"
                name="ID_Producto"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Cantidad: 
              </label>
              <input
                className="form-control"
                name="Cantidad"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
               Precio Unitario:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                
              />
            </FormGroup>


            <FormGroup>
              <label>
               Valor Total:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                
              />
            </FormGroup>

            <FormGroup>
              <label>
               # Documento:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                
              />
            </FormGroup>

            <FormGroup>
              <label>
               Cliente:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                
              />
            </FormGroup>

            <FormGroup>
              <label>
              Vendedor :
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID"
                type="text"
                onChange={this.handleChange}
                
              />
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
export default Ap;
