import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
  { ID_Producto: 1, des_Producto: "Naruto", Cantidad: 1, Precio_Unitario:2.5, Precio_Total:150, vendedor:"Dario"},

];


const data2 = [
  { ID_Venta: 1, Valor_Total_Venta: 0, Fecha_Venta: "25 agosto", ID_Cliente: 456, nombre_Cliente: "Julian", vendedor: "Dario"},
];
  


class GestorVentas extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      ID_Producto: "",
      des_Producto: "",
      Cantidad: "",
      Precio_Unitario:"",
      Precio_Total:"",
      vendedor: "",

    
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

  mostrarModalInsertar2 = () => {
    this.setState({
      modalInsertar2: true,
    });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  cerrarModalInsertar2 = () => {
    this.setState({ modalInsertar2: false });
  };

  editar = (dato) => {
    var opcion = window.confirm("Está seguro que desea actualizar el Resgistro de venta número  "+dato.ID_Producto);
    if(opcion ==true){
    var contador = 0;
    var arreglo = this.state.data;
    arreglo.map((registro) => {
      if (dato.ID_Producto == registro.ID_Producto) {
        arreglo[contador].ID_Producto = dato.ID_Producto;
        arreglo[contador].des_Producto = dato.des_Producto;
        arreglo[contador].Valor_unitario = dato.Valor_unitario;
        arreglo[contador].Precio_Unitario = dato.Precio_Unitario;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
    }
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el resgistro de venta número "+dato.ID_Producto);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.ID_Producto == registro.ID_Producto) {
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

  insertar2= ()=>{

    var valorNuevo2 ={...this.state.form};

    var lista2=this.state.data;
    lista2.push(valorNuevo2);
    this.setState({ modalInsertar2: false, data: lista2 });  

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
        <ul>
          <Button color="success" onClick={()=>this.mostrarModalInsertar()}>Ingresar Producto</Button>
          <> </>
          <Button color="success" onClick={()=>this.mostrarModalInsertar2()}>Información Venta</Button>
          </ul>
          <br />

          <br />

           <Table className="table table-striped">

            <thead>
{/* 
            {this.state.data.map((datoVenta) => (
                <tr key={dato1.ID_Venta}>
                  <td>{dato1.ID_Producto}</td>
                  <td>{dato1.des_Producto}</td>
                  <td>{dato1.Cantidad}</td>
                  <td>{dato1.Precio_Unitario}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato1)}
                    >
                      Cambiar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato1)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
*/}
              <tr>
                <th>ID Producto</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Precio unidad</th>
                <th>Total</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tfoot>
                <tr>
                    <th>Total Venta:</th>
                    <th align="center">Valor_Total_Venta</th>                   
                </tr>
                <tr>
                    <th>ID Venta:</th>
                    <th align="center">ID Venta</th>                   
                </tr>
                <tr>
                    <th>Fecha Venta:</th>
                    <th align="center">Fecha Venta</th>                   
                </tr>   
                <tr>
                    <th>Total Venta:</th>
                    <th align="center">Valor_Total_Venta</th>                   
                </tr>             
                <tr>
                    <th>Identificación Cliente:</th>
                    <th align="center">Identifcación Cliente</th>                   
                </tr>   
                <tr>
                    <th>Nombre Cliente:</th>
                    <th align="center">Nombre cliente</th>                   
                </tr>     
                <tr>
                    <th>Vendedor:</th>
{this.state.data.map((dato) => (
                    <th>{dato.vendedor}</th> ))}                  
                </tr>            
            </tfoot>

            <br />

            <tbody>
              {this.state.data.map((dato) => (
                <tr key={dato.ID_Producto}>
                  <td>{dato.ID_Producto}</td>
                  <td>{dato.des_Producto}</td>
                  <td>{dato.Cantidad}</td>
                  <td>{dato.Precio_Unitario}</td>
                  <td>{dato.Precio_Total}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar(dato)}
                    >
                      Cambiar
                    </Button>{" "}
                    <Button color="danger" onClick={()=> this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>

            <br />



          </Table>



        </Container>

        <Modal isOpen={this.state.modalActualizar}>
          <ModalHeader>
           <div><h3>Editar Registro</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID Producto:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ID_Producto}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción del Producto: 
              </label>
              <input
                className="form-control"
                name="des_Producto"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.des_Producto}
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
                value={this.state.form.Cantidad}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Unitario: 
              </label>
              <input
                className="form-control"
                name="Precio_Unitario"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Precio_Unitario}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Total: 
              </label>
              <input
                className="form-control"
                name="Precio_Total"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Precio_Total}
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
           <div><h3>Ingreso nuevo producto</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                ID Producto: 
              </label>
              
              <input
                className="form-control"
                name="ID_Producto"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Descripción del Producto: 
              </label>
              <input
                className="form-control"
                name="des_Producto"
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
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>


            <FormGroup>
              <label>
                Valor unitario: 
              </label>
              <input
                className="form-control"
                name="Precio_Unitario"
                type="number"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio Total: 
              </label>
              <input
                className="form-control"
                name="Precio_Total"
                type="number"
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


        <Modal isOpen={this.state.modalInsertar2}>
          <ModalHeader>
           <div><h3>Datos Venta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
                ID Venta: 
              </label>
              
              <input
                className="form-control"
                name="ID_Venta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Fecha de la venta: 
              </label>
              <input
                className="form-control"
                name="fecha_Venta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Identificación del Cliente: 
              </label>
              <input
                className="form-control"
                name="ID_Cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre del Cliente: 
              </label>
              <input
                className="form-control"
                name="nombre_Cliente"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vendedor: 
              </label>
              <input
                className="form-control"
                name="vendedor"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Valor Total Venta: 
              </label>
              <input
                className="form-control"
                name="total_Venta"
                type="text"
                onChange={this.handleChange}
              />
            </FormGroup>



          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.insertar2()}
            >
              Guardar
            </Button>
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar2()}
            >
              Cerrar
            </Button>
          </ModalFooter>
        </Modal>




      </>
    );
  }
}
export default GestorVentas;