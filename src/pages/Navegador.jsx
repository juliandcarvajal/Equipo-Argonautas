import { Link } from 'react-router-dom';
import '../styles/Navegador.css';


function navegador(){
    return(
        <body className="cuer">
            <h1 className="titu">Navegador</h1>
            <Link to='/Inicio'>
                <button type='button' className="bot">Inicio</button>
            </Link>
            <Link to='/Gestorproductos'>
                <button type='button' className="bot1">Gestor de productos</button>
            </Link>
            <Link to='/GestorVentas'>
                <button type='button' className="bot2">Gestor de ventas</button>
            </Link>
            <Link to='/GestorUsuarios'>
                <button type='button' className="bot3">Gestor de usuarios</button>
            </Link>
        </body>
    );
}
export default navegador;