import logo from './logo.svg';
import Inicio from './pages/Inicio';
import RegistroProductos from './pages/RegistroProductos';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './styles/Inicio.css';

function App() {
  return (
    <div className="App">
      <Router>
       <Switch>

       <Route path ='/RegistroProductos'> 
           <RegistroProductos/>
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
