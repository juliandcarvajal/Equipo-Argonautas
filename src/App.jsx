
import Inicio from './pages/Inicio';
import GestorProductos from './pages/Gestorproductos';
import GestorUsuarios from './pages/GestorUsuarios';
import GestorVentas from './pages/GestorVentas';


import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
       <Switch>

       <Route path ='/GestorUsuarios'> 
           <GestorUsuarios/>
        </Route>

        <Route path ='/GestorVentas'> 
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
