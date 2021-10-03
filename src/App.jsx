

import RegistroProductos from './pages/RegistroProductos';
import Inicio from './pages/Inicio';
import GestorProductos from './pages/Gestorproductos';
import GestorVentas from './pages/gestorVentas';





import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';



function App() {
  return (
    <div className="App">
      <Router>
       <Switch>

       <Route path ='/RegistroProductos'> 
           <RegistroProductos/>
         </Route>

         <Route path ='/GestorProductos'> 
           <GestorProductos/>
         </Route>
        
        <Route path = '/GestorVentas'>
          <GestorVentas/>
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
