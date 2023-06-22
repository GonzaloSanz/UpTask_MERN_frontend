import { useContext } from "react";
import formatearFecha from "../helpers/formatearFecha";
import ProyectosContext from "../context/ProyectosProvider";
import Swal from "sweetalert2";
import useAdmin from "../hooks/useAdmin";

const Tarea = ({ tarea }) => {
    const { handleModalEditarTarea, eliminarTarea, completarTarea } = useContext(ProyectosContext);
    const { _id, nombre, descripcion, fechaEntrega, prioridad, estado } = tarea;

    const admin = useAdmin();

    const handleClickEliminarTarea = () => {
        Swal.fire({
            title: '¿Deseas eliminar esta tarea?',
            text: "¡No podrás revertir los cambios!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Eliminar',
            cancelButtonText: 'Volver'

        }).then(async (result) => {
            // En caso afirmativo
            if (result.isConfirmed) {
                eliminarTarea(tarea);
            }
        })
    }

    return (
        <div className="border-b p-5 flex justify-between md:items-center">
            <div className="flex flex-col items-start">
                <p className="mb-2 text-xl">{nombre}</p>
                <p className="mb-2 text-gray-500">{descripcion}</p>
                <p className="mb-2 text-sm">{formatearFecha(fechaEntrega)}</p>
                <p className="mb-2 text-gray-600">Prioridad: {prioridad}</p>
                {estado && <p className="text-xs bg-green-600 uppercase p-1.5 rounded-lg text-white font-bold">Completada por: {tarea.completado?.nombre}</p>}
            </div>

            <div className="flex flex-col lg:flex-row gap-2">
                {(admin && !estado) && (
                    <button onClick={() => handleModalEditarTarea(tarea)} className="bg-indigo-600 hover:bg-indigo-700 cursor-pointer transition-colors p-2.5 text-white uppercase font-bold text-sm rounded-lg">Editar</button>
                )}

                <button onClick={() => completarTarea(_id)} className={`${estado ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} cursor-pointer transition-colors p-2.5 text-white uppercase font-bold text-sm rounded-lg`}>{estado ? 'Completa' : 'Incompleta'}</button>
                
                {admin && (
                    <button onClick={() => handleClickEliminarTarea()} className="bg-red-600 hover:bg-red-700 cursor-pointer transition-colors p-2.5 text-white uppercase font-bold text-sm rounded-lg">Eliminar</button>
                )}

            </div>
        </div>
    )
}

export default Tarea;