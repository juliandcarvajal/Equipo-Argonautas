import React from 'react';
import '../styles/login.css';

import {
    Button,Container,FormGroup,Form,FormLabel,FormControl,FormText,ButtonGroup
  } from "reactstrap";

class App extends React.Component{
    render(){
        return(

    <>
    <div class="center-block">
    <Form>
        <h1 color="black">Inicio de sesion</h1>
        <br/>
        <br/>
        <br/>
    <FormGroup>
              <label>
                Usuario: 
              </label>
              <input
                className="contrase"
                name="Nombre"
                type="text"
                
              />
            </FormGroup>
            <br/>
            <FormGroup>
              <label>
                Contraseña: 
              </label>
              <input
                
                className="contrase"
                name="Nombre"
                type="password" 
                
              />
            </FormGroup>
     
            <ButtonGroup aria-label="Basic example">
            <Button variant="secundary">Iniciar sesion</Button>

             <Button variant="primary">Registrase</Button>
            </ButtonGroup>
            </Form>
  </div>
  </>

        );
    }
}
export default App;   
