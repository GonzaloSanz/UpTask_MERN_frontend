import { useContext, useState } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import Alerta from "./Alerta";
import { useParams } from "react-router-dom";
import { alertaError } from "../assets/js/funcionesUtiles";

const FormularioProyecto = () => {
    const { proyecto, nuevoProyecto, editarProyecto } = useContext(ProyectosContext);
    const params = useParams();

    const [id, setId] = useState(params.id ? params.id : '');
    const [nombre, setNombre] = useState(params.id ? proyecto.nombre : '');
    const [descripcion, setDescripcion] = useState(params.id ? proyecto.descripcion : '');
    const [fechaEntrega, setFechaEntrega] = useState(params.id ? proyecto.fechaEntrega?.split('T')[0] : '');
    const [cliente, setCliente] = useState(params.id ? proyecto.cliente : '');

    const handleSubmit = async e => {
        e.preventDefault();

        if ([nombre.trim(), descripcion.trim(), fechaEntrega, cliente.trim()].includes('')) {
            alertaError('Todos los campos son obligatorios');
            return;
        }

        if (new Date().getTime() > new Date(fechaEntrega).getTime()) {
            alertaError('La fecha de entrega no es válida');
            return;
        }

        // Si existe el id del proyecto, se estará editando
        if (id != '') {
            await editarProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
        } else {
            await nuevoProyecto({ id, nombre, descripcion, fechaEntrega, cliente });
        }

        // Reiniciar campos
        setId('');
        setNombre('');
        setDescripcion('');
        setFechaEntrega('');
        setCliente('');
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white py-10 px-5 w-full lg:w-1/2 rounded-lg shadow-lg">
            <div className="mb-6">
                <label htmlFor="nombre" className="text-gray-700 uppercase font-bold text-sm">Nombre</label>

                <input
                    id="nombre"
                    type="text"
                    className="border w-full p-2 my-2 placeholder:gray-400 rounded-md"
                    placeholder="Nombre del Proyecto"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="descripcion" className="text-gray-700 uppercase font-bold text-sm">Descripción</label>

                <textarea
                    id="descripcion"
                    className="border w-full p-2 my-2 placeholder:gray-400 rounded-md"
                    placeholder="Descripción del Proyecto"
                    rows="4"
                    value={descripcion}
                    onChange={e => setDescripcion(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="fecha_entrega" className="text-gray-700 uppercase font-bold text-sm">Fecha de Entrega</label>

                <input
                    id="fecha_entrega"
                    type="date"
                    className="border w-full p-2 my-2 placeholder:gray-400 rounded-md"
                    value={fechaEntrega}
                    onChange={e => setFechaEntrega(e.target.value)}
                />
            </div>

            <div className="mb-6">
                <label htmlFor="cliente" className="text-gray-700 uppercase font-bold text-sm">Cliente</label>

                <input
                    id="cliente"
                    type="text"
                    className="border w-full p-2 my-2 placeholder:gray-400 rounded-md"
                    placeholder="Nombre del Cliente"
                    value={cliente}
                    onChange={e => setCliente(e.target.value)}
                />
            </div>

            <input
                type="submit"
                value={params.id ? 'Editar Proyecto' : 'Crear Proyecto'}
                className="w-full bg-sky-600 p-3 uppercase font-bold text-white rounded-md cursor-pointer hover:bg-sky-700 transition-colors"
            />
        </form>
    )
}

export default FormularioProyecto;