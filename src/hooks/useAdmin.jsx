import { useContext } from 'react'
import AuthContext from '../context/AuthProvider'
import ProyectosContext from '../context/ProyectosProvider';

const useAdmin = () => {
    const { auth } = useContext(AuthContext);
    const { proyecto } = useContext(ProyectosContext);

    return proyecto.creador === auth._id;
}

export default useAdmin;