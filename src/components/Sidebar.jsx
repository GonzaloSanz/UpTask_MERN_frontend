import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const Sidebar = () => {
  const { auth } = useContext(AuthContext);

  return (
    <aside className="md:w-1/3 lg:w-1/5 xl:w-1/6 px-5 py-10">
      <p className="text-xl font-bold">Hola: {auth.nombre}</p>

      <Link to="nuevo-proyecto" className="bg-sky-600 hover:bg-sky-700 transition-colors w-full p-2.5 text-white font-bold uppercase block mt-5 text-center rounded-lg">Nuevo proyecto</Link>
    </aside>
  )
}

export default Sidebar;