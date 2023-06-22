import { Link, useParams } from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Alerta from '../components/Alerta';
import { useEffect, useState } from 'react';

const NuevaPassword = () => {
  const { token } = useParams();

  const [tokenValido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [passwordCambiada, setPasswordCambiada] = useState(false);

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);

      } catch (error) {
        setTokenValido(false);

        setAlerta({
          msg: error.response.data.msg,
          error: true
        })
      }
    }

    comprobarToken();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();

    if (password !== repetirPassword) {
      setAlerta({
        msg: 'Las contraseñas no coinciden',
        error: true
      });
      return;
    }

    if (password.trim().length < 8) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 8 caracteres',
        error: true
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password/${token}`, { password });
      setAlerta({
        msg: data.msg
      });

      setPasswordCambiada(true);
      setPassword('');
      setRepetirPassword('');

    } catch (error) {
      setPasswordCambiada(false);

      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-12">Restablecer tu contraseña y no pierdas acceso a tus <span className="text-slate-700">proyectos</span></h1>
      {msg && <Alerta alerta={alerta} />}

      {/* Si el token del usuario es válido, aparecerá el formulario */}
      {(tokenValido && !passwordCambiada) && (
        <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md rounded-lg p-10">
          <div className="mb-6">
            <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="Nueva Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <div className="mb-10">
            <label htmlFor="repetir_password" className="uppercase text-gray-600 block text-xl font-bold">Repetir Contraseña</label>
            <input
              id="repetir_password"
              type="password"
              placeholder="Repite la Contraseña"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>

          <input
            type="submit"
            value="Cambiar Contraseña"
            className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>
      )}

      {passwordCambiada && (
        <Link to="/" className="block text-center mt-8 text-slate-500 uppercase text-sm">Iniciar Sesión</Link>
      )}
    </>
  )
}

export default NuevaPassword;