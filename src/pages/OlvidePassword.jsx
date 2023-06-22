import { Link } from "react-router-dom";
import { useState } from "react";
import { regExpEmail } from "../assets/js/regExp";
import Alerta from "../components/Alerta";
import clienteAxios from "../../config/axios";

const OlvidePassword = () => {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async e => {
    e.preventDefault();

    if (!regExpEmail.test(email)) {
      setAlerta({
        msg: 'El correo electrónico no es válido',
        error: true
      });
      return;
    }

    setAlerta({});

    try {
      const { data } = await clienteAxios.post(`/usuarios/olvide-password`, { email });

      setAlerta({
        msg: data.msg
      });

    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize mb-10">Recupera el acceso y no pierdas tus <span className="text-slate-700">proyectos</span></h1>
      
      {msg && <Alerta alerta={alerta} />}

      <form onSubmit={handleSubmit} className="my-10 bg-white shadow-md rounded-lg p-10">
        <div className="mb-10">
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

        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-sky-700 w-full py-3 text-white font-bold uppercase rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link to="/registrar" className="block text-center my-5 text-slate-500 uppercase text-sm">No tengo una cuenta</Link>
        <Link to="/" className="block text-center my-5 text-slate-500 uppercase text-sm">Ya tengo una cuenta</Link>
      </nav>
    </>
  )
}

export default OlvidePassword;