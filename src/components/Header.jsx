import { useContext } from "react";
import { Link } from "react-router-dom";
import ProyectosContext from "../context/ProyectosProvider";
import Busqueda from "./Busqueda";
import AuthContext from "../context/AuthProvider";

const Header = () => {
  const { cerrarSesionAuth } = useContext(AuthContext);
  const { handleBuscador, cerrarSesionProyectos } = useContext(ProyectosContext);

  const handleCerrarSesion = () => {
    cerrarSesionAuth();
    cerrarSesionProyectos();

    localStorage.removeItem('upTask_token');
  }

  return (
    <header className="px-4 py-5 bg-white border-b">
      <div className="flex flex-col md:flex-row md:justify-between">
        <Link to="/proyectos" className="inline-block text-4xl text-sky-600 font-black text-center mb-5 md:mb-0">UpTask</Link>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <button
            onClick={handleBuscador}
            type="button"
            className="font-bold uppercase"
          >Buscar Proyecto</button>

          <Link to="/proyectos" className="font-bold uppercase">Proyectos</Link>

          <button
            onClick={handleCerrarSesion}
            type="button"
            className="text-white text-sm bg-sky-600 hover:bg-sky-700 transition-colors p-2.5 rounded-md uppercase font-bold"
          >Cerrar Sesión</button>

          <Busqueda />
        </div>
      </div>
    </header>
  )
}

export default Header;