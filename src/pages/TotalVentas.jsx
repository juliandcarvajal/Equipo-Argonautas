import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';
import GestorVentas from "./GestorVentas";


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
  { ID_Venta: 1, Total_Venta: 18000, Fecha_Venta: "11/10/2021", ID_Cliente: 1, Nombre_Cliente: "Julian Carvajal", Vendedor: "Dario Gutierrez", Estado:"Disponible"},

];

class TotalVentas extends React.Component {
  state = {
    data: data,
    modalActualizar: false,
    modalInsertar: false,
    form: {
      ID_Venta:"",
      Total_Venta:"",
      Fecha_Venta:"",
      ID_Cliente:"",
      Nombre_Cliente:"",
      Vendedor:"",
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
      if (dato.ID_Venta == registro.ID_Venta) {
         arreglo[contador].Total_Venta = dato.Total_Venta;
        arreglo[contador].Fecha_Venta = dato.Fecha_Venta;
        arreglo[contador].ID_Cliente = dato.ID_Cliente;
        arreglo[contador].Nombre_Cliente = dato.Nombre_Cliente;
        arreglo[contador].Vendedor = dato.Vendedor;
        arreglo[contador].Estado = dato.Estado;
      }
      contador++;
    });
    this.setState({ data: arreglo, modalActualizar: false });
  };

  eliminar = (dato) => {
    var opcion = window.confirm("Estás Seguro que deseas eliminar el registro de venta Nro. "+dato.ID_Venta);
    if (opcion == true) {
      var contador = 0;
      var arreglo = this.state.data;
      arreglo.map((registro) => {
        if (dato.ID_Venta == registro.ID_Venta) {
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

        <Link to='/GestorVentas'><Button color = "success" type='button' >Registrar nueva venta</Button></Link>

          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-2 py-1  '  onChange={this.onChange}/>
         
          <br />
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID_Venta</th>
                <th>Total Venta</th>
                <th>Fecha Venta</th>
                <th>ID Cliente</th>
                <th>Nombre Cliente</th>
                <th>Vendedor</th>
                <th>Estado</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>


              {this.state.data.map((dato) => (
                <tr key={dato.ID_Venta}>
                  <td>{dato.ID_Venta}</td>
                  <td>{dato.Total_Venta}</td>
                  <td>{dato.Fecha_Venta}</td>
                  <td>{dato.ID_Cliente}</td>
                  <td>{dato.Nombre_Cliente}</td>
                  <td>{dato.Vendedor}</td>
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
           <div><h3>Detalles de venta</h3></div>
          </ModalHeader>

          <ModalBody>
            <FormGroup>
              <label>
               ID Venta:
              </label>
            
              <input
                className="form-control"
                readOnly
                name="ID_Venta"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.ID_Venta}
              />
            </FormGroup>
            
            <FormGroup>
              <label>
                Total Venta: 
              </label>
              <input
                className="form-control"
                readOnly
                name="Total_Venta"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.Total_Venta}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Fecha Venta: 
              </label>
              <input
                className="form-control"
                readOnly
                name="Fecha_Venta"
                type="date"
                onChange={this.handleChange}
                value={this.state.form.Fecha_Venta}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Identificación Cliente: 
              </label>
              <input
                className="form-control"
                readOnly
                name="ID_Cliente"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.ID_Cliente}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Nombre del Cliente: 
              </label>
              <input
                className="form-control"
                readOnly
                name="Nombre_Cliente"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Nombre_Cliente}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Vendedor: 
              </label>
              <input
                className="form-control"
                readOnly
                name="Vendedor"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.Vendedor}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado: 
              </label>
              <select  className="form-control" name="Estado" value={this.state.form.Estado} onChange={this.handleChange}>
               <option selected value="0">Seleccione para cambiar estado de venta</option>
               <option>En Proceso</option> 
                <option>Cancelada</option> 
                <option>Entregada</option> 
                
              </select>
            </FormGroup>
            
          </ModalBody>

          <ModalFooter>
            <Button
              color="primary"
              onClick={() => this.editar(this.state.form)}
            >
              Cambiar estado
            </Button>
            <Button
              color="danger"
              onClick={() => this.cerrarModalActualizar()}
            >
              Cancelar
            </Button>

            <Link to='/GestorVentas'><Button color = "success" type='button' >Editar Venta Completa</Button></Link>


          </ModalFooter>
        </Modal>



        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
           <div><h3>Registrar producto </h3></div>
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
export default TotalVentas;