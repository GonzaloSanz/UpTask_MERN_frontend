import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import { useEffect, useState } from 'react';
import Alerta from '../components/Alerta';

const ConfirmarCuenta = () => {
  const { token } = useParams();

  const [alerta, setAlerta] = useState({});
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const { data } = await clienteAxios(`/usuarios/confirmar-cuenta/${token}`);
        setAlerta({
          msg: data.msg
        });

        setCuentaConfirmada(true);

      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    confirmarCuenta();
  }, []);

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">Confirmar tu cuenta y comienza a crear tus <span className="text-slate-700">proyectos</span></h1>

      <div className='mt-12 shadow-lg px-5 py-10 rounded-xl bg-white'>
        {msg && <Alerta alerta={alerta} />}

        {cuentaConfirmada && (
          <Link to="/" className="block text-center mt-8 text-slate-500 uppercase text-sm">Iniciar Sesión</Link>
        )}
      </div>

    </>
  )
}

export default ConfirmarCuenta;