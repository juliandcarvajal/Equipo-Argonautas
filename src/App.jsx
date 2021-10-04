

import Inicio from './pages/Inicio';
import GestorProductos from './pages/Gestorproductos';
import GestorUsuarios from './pages/GestorUsuarios';
import GestorVentas from './pages/GestorVentass';
import Navegador from './pages/Navegador';
import Login from './pages/Login';



import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
       <Switch>

       <Route path ='/Navegador'> 
           <Navegador/>
        </Route>

       <Route path ='/GestorUsuarios'> 
           <GestorUsuarios/>
        </Route>

        <Route path ='/GestorVentas'> 
           <GestorVentas/>
        </Route>


       <Route path ='/Login'> 
           <Login/>
       </Route>

=
         <Route path ='/GestorProductos'> 
           <GestorProductos/>
         </Route>

         
         <Route path ='/'> 
           <Inicio/>
         </Route>


         
        

       </Switch>
       
      </Router>
      
    </div>  
      
  );
}

export default App;
