import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";
import { useContext, useState } from "react";
import { regExpEmail } from "../assets/js/regExp";
import AuthContext from "../context/AuthProvider";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if ([email.trim, password.trim()].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if(!regExpEmail.test(email)) {
      setAlerta({
        msg: 'El correo electrónico con es válido',
        error: true
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post('/usuarios/login', { email, password });
      
      // Guardar token en localStorage
      localStorage.setItem('upTask_token', data.token);
      setAuth(data);

      navigate('/proyectos');

      setEmail('');
      setPassword('');

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">Inicia sesión y administra tus <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md rounded-lg p-10" noValidate>
        <div className="mb-6">
          <label htmlFor="email" className="uppercase text-gray-600 block text-xl font-bold">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            placeholder="Correo Electrónico de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-10">
          <label htmlFor="password" className="uppercase text-gray-600 block text-xl font-bold">Contraseña</label>
          <input
            id="password"
            type="password"
            placeholder="Contraseña de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        <input
          type="submit"
          value="Iniciar Sesión"
          className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">No tengo una cuenta</Link>
        <Link to="/olvide-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvidé mi contraseña</Link>
      </nav>
    </>
  )
}

export default Login;