
import Inicio from './pages/Inicio';
import GestorProductos from './pages/Gestorproductos';
import GestorUsuarios from './pages/GestorUsuarios';
import GestorVentas from './pages/gestorVentas';
import Navegador from './pages/Navegador';


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

        <Route path ='/gestorVentas'> 
           <GestorVentas/>
        </Route>

       
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
