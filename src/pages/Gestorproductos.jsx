import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/usuarios.css';
import { Link } from 'react-router-dom';

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


const stateToAvailable = { Disponible: true, "No Disponible": false }
class App extends React.Component {
  state = {
    data: [],
    modalActualizar: false,
    modalInsertar: false,
    form: {
      //Actuzalizar está parte con los campos que son
      ID: "",
      Descripción: "",
      Valor_unitario: "",
      Estado: "",
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
      const resp = await fetch("http://localhost:3002/api/products", { method: "GET" })
      const data = await resp.json()
      this.setState({ data: data })
      console.log(data)
    } catch (err) {
      console.log(err)
    }
  }

  editar = async (dato) => {

    try {
      const resp = await fetch(`http://localhost:3002/api/products/${dato._id}`, {
        method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form,
          disponible: stateToAvailable[this.state.form.disponible]

        })
      })
      const data = await resp.text()

      console.log(data)
    } catch (err) {
      console.log(err)
    }
    const lista = this.state.data;
    lista[dato.index] = { ...lista[dato.index], ...dato }
    this.setState({ modalActualizar: false, data: lista });
  };

  eliminar = async (id, index) => {
    var opcion = window.confirm("Estás Seguro que deseas Eliminar el elemento");
    if (opcion == true) {
      try {
        const resp = await fetch(`http://localhost:3002/api/products/${id}`, {
          method: "DELETE",
        })
        const data = await resp.text()

        console.log(data)
      } catch (err) {
        console.log(err)
      }
      const lista = this.state.data;
      lista.splice(index, 1)
      this.setState({ modalActualizar: false, data: lista });

    }
  };

  insertar = async () => {
    try {
      const resp = await fetch("http://localhost:3002/api/products", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({
          ...this.state.form,
          disponible: stateToAvailable[this.state.form.disponible]

        })
      })
      const data = await resp.text()
      console.log(data)
    } catch (err) {
      console.log(err)
    }

    const lista = this.state.data;
    lista.push(this.state.form);
    this.setState({ modalInsertar: false, data: lista });
  }

  onChange = async e => {
    e.persist();
    await this.setState({ busqueda: e.target.value });
    /*console.log(this.state.busqueda);
    console.log('lista filtrada',this.state.data.filter((elemento)=>{
      console.log("elemento",elemento);
      return JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase());
    })
    );
    esto era para vefiricar salida por consola*/

    this.filtrar();  /*Se llama a la funcion filtar cada que se escribe en el buscador*/
  }
  filtrar = () => {
    var search = this.data.filter((elemento) => {
      if (JSON.stringify(elemento).toLowerCase().includes(this.state.busqueda.toLowerCase())) {
        return elemento;
      }
    });
    this.setState({ data: search }); /*actualiza la tabla*/
  }

  componentDidMount() {
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

          <Button color="success" onClick={() => this.mostrarModalInsertar()}>Crear un nuevo producto</Button>
          <input name="busqueda" value={this.state.busqueda} placeholder='buscar' className='border-gray-700 px-2 py-1  ' onChange={this.onChange} />

          <br />
          <br />
          <br />
          <Table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Tille</th>
                <th>Price</th>
                <th>URL</th>
                <th>Categoría</th>
                <th>Disponible</th>
              </tr>
            </thead>

            <tbody>
              {this.state.data.map((dato, index) => (
                <tr key={dato._id}>
                  <td>{dato._id}</td>
                  <td>{dato.title}</td>
                  <td>{dato.price}</td>
                  <td>{dato.url}</td>
                  <td>{dato.categoria}</td>
                  <td>{dato.disponible ? "Disponible" : "No disponible"}</td>
                  <td>
                    <Button
                      color="primary"
                      onClick={() => this.mostrarModalActualizar({ ...dato, index })}
                    >
                      Editar
                    </Button>{" "}
                    <Button color="secondary" onClick={() => this.eliminar(dato._id, index)}>Eliminar</Button>
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
                Nombre
              </label>

              <input
                className="form-control"
                readOnly
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.title}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio
              </label>

              <input
                className="form-control"
                readOnly
                name="price"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.price}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripción:
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.description}
              />
            </FormGroup>

            <FormGroup>
              <label>
                URL
              </label>
              <input
                className="form-control"
                name="url"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.url}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Categoría
              </label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.categoria}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <select className="form-control" name="disponible" value={this.state.form.disponible} onChange={this.handleChange}>
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
            <div><h3>Registrar producto </h3></div>
          </ModalHeader>

          <ModalBody>

            <FormGroup>
              <label>
                Nombre
              </label>

              <input
                className="form-control"
                name="title"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.title}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Precio
              </label>

              <input
                className="form-control"
                name="price"
                type="number"
                onChange={this.handleChange}
                value={this.state.form.price}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Descripción:
              </label>
              <input
                className="form-control"
                name="description"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.description}
              />
            </FormGroup>

            <FormGroup>
              <label>
                URL
              </label>
              <input
                className="form-control"
                name="url"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.url}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Categoría
              </label>
              <input
                className="form-control"
                name="categoria"
                type="text"
                onChange={this.handleChange}
                value={this.state.form.categoria}
              />
            </FormGroup>

            <FormGroup>
              <label>
                Estado:
              </label>
              <select className="form-control" name="disponible" value={this.state.form.disponible} onChange={this.handleChange}>
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
        <Link to='/Navegador'>
          <button type='button' className="bton">Volver</button>
        </Link>
      </>
    );
  }
}
export default App;