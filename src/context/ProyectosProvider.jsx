import { useState, useEffect, createContext } from "react";
import clienteAxios from "../../config/axios";
import { useNavigate } from 'react-router-dom';
import { alertaError, alertaExito } from "../assets/js/funcionesUtiles";
import io from 'socket.io-client';
let socket;

const ProyectosContext = createContext();

const ProyectosProvider = ({ children }) => {
    const navigate = useNavigate();

    const [proyectos, setProyectos] = useState([]);
    const [alerta, setAlerta] = useState({});
    const [proyecto, setProyecto] = useState({});
    const [cargandoProyectos, setCargandoProyectos] = useState(true);
    const [cargandoProyecto, setCargandoProyecto] = useState(true);
    const [modalFormularioTarea, setModalFormularioTarea] = useState(false);
    const [tarea, setTarea] = useState({});
    const [colaborador, setColaborador] = useState({});
    const [buscador, setBuscador] = useState(false);
    const [errorPermisos, setErrorPermisos] = useState(false);

    const obtenerProyectos = async () => {
        setCargandoProyectos(true);
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios('/proyectos', config);
            setProyectos(data);
            setCargandoProyectos(false);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        obtenerProyectos();
    }, []);

    useEffect(() => {
        socket = io(import.meta.env.VITE_BACKEND_URL);
    }, [])

    const nuevoProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos', proyecto, config);
            setErrorPermisos(false);

            // Actualizar los proyectos
            setProyectos([...proyectos, data]);

            alertaExito('¡Proyecto creado con éxito!');

            navigate('/proyectos');

        } catch (error) {
            console.log(error);
        }
    }

    const editarProyecto = async proyecto => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/proyectos/${proyecto.id}`, proyecto, config);

            // Actualizar los proyectos
            const proyectosActualizados = proyectos.map(proyectoState => proyectoState._id === data._id ? data : proyectoState);
            setProyectos(proyectosActualizados);

            alertaExito('¡Proyecto editado con éxito!');

            navigate('/proyectos');

        } catch (error) {
            console.log(error);
        }
    }

    const obtenerProyecto = async id => {
        setCargandoProyecto(true);

        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios(`/proyectos/${id}`, config);
            setProyecto(data);
            setCargandoProyecto(false);
            setErrorPermisos(false);

        } catch (error) {
            console.log(error);
            setCargandoProyecto(false);
            setErrorPermisos(true);
        }
    }

    const eliminarProyecto = async id => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/proyectos/${id}`, config);

            // Actualizar los proyectos
            const proyectosActualizados = proyectos.filter(proyectoState => proyectoState._id !== id);
            setProyectos(proyectosActualizados);

            alertaExito(data.msg);

            navigate('/proyectos');

        } catch (error) {
            console.log(error);
        }
    }

    const nuevaTarea = async tarea => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/tareas', tarea, config);

            alertaExito('¡Tarea agregada con éxito!');
            setModalFormularioTarea(false);

            // Socket io
            socket.emit('nueva tarea', data);

        } catch (error) {
            console.log(error);
        }
    }

    const editarTarea = async tarea => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.put(`/tareas/${tarea.id}`, tarea, config);

            // Socket io
            socket.emit('actualizar tarea', data);

            alertaExito('¡Tarea editada con éxito!');
            setModalFormularioTarea(false);

        } catch (error) {
            console.log(error);
        }
    }

    const eliminarTarea = async tarea => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.delete(`/tareas/${tarea._id}`, config);

            // Socket io
            socket.emit('eliminar tarea', tarea);

            alertaExito(data.msg);

        } catch (error) {
            console.log(error);
        }
    }

    const handleModalTarea = () => {
        setModalFormularioTarea(!modalFormularioTarea);
        setTarea({});
    }

    const handleModalEditarTarea = tarea => {
        setTarea(tarea);
        setModalFormularioTarea(true);
    }

    const buscarColaborador = async email => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            const { data } = await clienteAxios.post('/proyectos/colaboradores', { email }, config);
            setColaborador(data);

        } catch (error) {
            alertaError(error.response.data.msg);
            setColaborador({});
        }
    }

    const agregarColaborador = async email => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/colaboradores/${proyecto._id}`, { email }, config);

            alertaExito(data.msg);
            setColaborador({});

        } catch (error) {
            alertaError(error.response.data.msg);
        }
    }

    const eliminarColaborador = async idColaborador => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/proyectos/eliminar-colaboradores/${proyecto._id}`, { id: idColaborador }, config);
            alertaExito(data.msg);

            const proyectoActualizado = { ...proyecto };
            proyectoActualizado.colaboradores = proyectoActualizado.colaboradores.filter(colaboradorState => colaboradorState._id !== idColaborador);
            setProyecto(proyectoActualizado);

        } catch (error) {
            alertaError(error.response.data.msg);
        }
    }

    const completarTarea = async id => {
        try {
            const token = localStorage.getItem('upTask_token');
            if (!token) return;

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            const { data } = await clienteAxios.post(`/tareas/estado/${id}`, {}, config);

            // Socket io
            socket.emit('cambiar estado', data);

            setTarea({});

        } catch (error) {
            alertaError(error.response.data.msg);
        }
    }

    const handleBuscador = () => {
        setBuscador(!buscador);
    }

    // Funciones Socket io
    const submitTareasProyecto = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = [...proyecto.tareas, tarea];
        setProyecto(proyectoActualizado);
    }

    const eliminarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.filter(tareaState => tareaState._id !== tarea._id);
        setProyecto(proyectoActualizado);
    }

    const editarTareaProyecto = tarea => {
        const proyectoActualizado = { ...proyecto }
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActualizado);
    }

    const cambiarEstadoTarea = tarea => {
        const proyectoActualizado = { ...proyecto };
        proyectoActualizado.tareas = proyectoActualizado.tareas.map(tareaState => tareaState._id === tarea._id ? tarea : tareaState);
        setProyecto(proyectoActualizado);
    }

    const cerrarSesionProyectos = () => {
        setProyectos([]);
        setProyecto({});
        setAlerta({});
    }

    return (
        <ProyectosContext.Provider
            value={{
                cargandoProyectos,
                obtenerProyectos,
                proyectos,
                alerta,
                setAlerta,
                nuevoProyecto,
                editarProyecto,
                eliminarProyecto,
                obtenerProyecto,
                proyecto,
                cargandoProyecto,
                handleModalTarea,
                nuevaTarea,
                editarTarea,
                eliminarTarea,
                modalFormularioTarea,
                setModalFormularioTarea,
                handleModalEditarTarea,
                tarea,
                colaborador,
                buscarColaborador,
                agregarColaborador,
                eliminarColaborador,
                completarTarea,
                buscador,
                handleBuscador,
                submitTareasProyecto,
                eliminarTareaProyecto,
                editarTareaProyecto,
                cambiarEstadoTarea,
                errorPermisos,
                cerrarSesionProyectos
            }}
        >
            {children}
        </ProyectosContext.Provider>
    )
}

export { ProyectosProvider }

export default ProyectosContext;