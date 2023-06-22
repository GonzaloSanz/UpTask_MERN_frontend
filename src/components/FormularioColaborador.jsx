import { useContext, useState } from "react";
import { alertaError } from "../assets/js/funcionesUtiles";
import { regExpEmail } from "../assets/js/regExp";
import ProyectosContext from "../context/ProyectosProvider";

const FormularioColaborador = () => {
    const { buscarColaborador } = useContext(ProyectosContext);

    const [email, setEmail] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();

        if (!regExpEmail.test(email)) {
            alertaError('El correo electrónico no es válido');
            return;
        }

        await buscarColaborador(email);
    }

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 w-full xl:w-1/2 rounded-lg shadow" noValidate>
            <div className="mb-6">
                <label htmlFor="email" className="text-gray-700 uppercase font-bold text-sm">Correo Electrónico</label>

                <input
                    id="email"
                    type="email"
                    className="border w-full p-2 my-2 placeholder:gray-400 rounded-md"
                    placeholder="Correo Electrónico del Usuario"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
            </div>

            <input
                type='submit'
                className='bg-sky-600 hover:bg-sky-600 w-full p-2.5 text-white uppercase font-bold rounded-md cursor-pointer transition-colors'
                value="Buscar Colaborador"
            />
        </form>
    )
}

export default FormularioColaborador;