import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";
import { regExpEmail, regExpNombre } from "../assets/js/regExp";

const Registrar = () => {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});


  const handleSubmit = async e => {
    e.preventDefault();

    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({
        msg: 'Todos los campos son obligatorios',
        error: true
      });
      return;
    }

    if (!regExpNombre.test(nombre)) {
      setAlerta({
        msg: 'El nombre no es válido',
        error: true
      });
      return;
    }

    if (!regExpEmail.test(email)) {
      setAlerta({
        msg: 'El correo electrónico no es válido',
        error: true
      });
      return;
    }

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

    // Insertar el usuario en la base de datos
    try {
      const { data } = await clienteAxios.post('/usuarios', { nombre, email, password });
      setAlerta({
        msg: data.msg
      });

      // Reiniciar campos
      setNombre('');
      setEmail('');
      setPassword('');
      setRepetirPassword('');

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
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">Crea tu cuenta y administra tus <span className="text-slate-700">proyectos</span></h1>

      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md rounded-lg p-10" noValidate>
        <div className="mb-6">
          <label htmlFor="nombre" className="uppercase text-gray-600 block text-xl font-bold">Nombre</label>
          <input
            id="nombre"
            type="text"
            placeholder="Nombre de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>

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

        <div className="mb-6">
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
          value="Registrarse"
          className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">Ya tengo una cuenta</Link>
        <Link to="/olvide-password" className="block text-center my-5 text-slate-500 uppercase text-sm">Olvidé mi contraseña</Link>
      </nav>
    </>
  )
}

export default Registrar;