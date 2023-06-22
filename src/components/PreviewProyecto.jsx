import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

const PreviewProyecto = ({ proyecto }) => {
    const { auth } = useContext(AuthContext);
    const { _id, nombre, cliente, creador } = proyecto;

    return (
        <div className="border-b p-5 flex flex-col md:flex-row md:items-center">
            <div className="flex-1 text-xl font-semibold mb-5 md:mb-0">
                {nombre}
                <p className="mt-1 text-sm text-gray-600 uppercase">{cliente}</p>

                {auth._id !== creador && (
                    <p className=" mt-4 inline-block p-2 text-xs bg-green-500 rounded-md text-white font-bold">Colaborador</p>
                )}
            </div>

            <Link to={`${_id}`} className="text-gray-600 hover:text-gray-800 uppercase text-sm font-bold">Ver Proyecto</Link>
        </div>
    )
}

export default PreviewProyecto;