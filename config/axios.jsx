import axios from "axios";

// Crear un cliente axios con la URL base del backend ya definida
const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
});

export default clienteAxios;