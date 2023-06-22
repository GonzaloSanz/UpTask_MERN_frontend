import { useContext, useEffect } from "react";
import FormularioColaborador from "../components/FormularioColaborador";
import ProyectosContext from "../context/ProyectosProvider";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../components/Spinner";

const NuevoColaborador = () => {
  const { obtenerProyecto, proyecto, cargandoProyecto, colaborador, agregarColaborador } = useContext(ProyectosContext);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    (!proyecto?._id) ? navigate('/proyectos') : obtenerProyecto(params?.id);
    
  }, []);

  if (cargandoProyecto) return <Spinner />
  return (
    <>
      <h1 className="text-4xl font-black">Añadir colaborador(a) al Proyecto: {proyecto.nombre}</h1>

      <div className="mt-14 flex justify-center">
        <FormularioColaborador />
      </div>

      {colaborador?._id && (
        <div className="flex justify-center mt-10">
          <div className="bg-white py-10 px-5 w-full xl:w-1/2 rounded-lg shadow">
            <h2 className="text-center mb-10 text-2xl font-bold">Resultado:</h2>

            <div className="flex justify-between items-center">
              <p>{colaborador.nombre}</p>

              <button
                onClick={() => agregarColaborador({ email: colaborador.email })}
                type="button"
                className="bg-slate-500 hover:bg-slate-600 transition-colors cursor-pointer px-5 py-2 rounded-lg uppercase text-white font-bold text-sm"
              >Agregar al Proyecto</button>
            </div>
          </div>

        </div>
      )}
    </>
  )
}

export default NuevoColaborador;