import { useContext, useEffect } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import PreviewProyecto from "../components/PreviewProyecto";
import Spinner from "../components/Spinner";

const Proyectos = () => {
  const { obtenerProyectos, cargandoProyectos, proyectos } = useContext(ProyectosContext);

  useEffect(() => {
    obtenerProyectos();
  }, []);

  if(cargandoProyectos) return <Spinner />

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {proyectos.length ?
          proyectos.map(proyecto => (
            <PreviewProyecto
              key={proyecto._id}
              proyecto={proyecto}
            />
          ))
          : <p className="text-center text-gray-600 uppercase font-semibold py-4">No se han encontrado proyectos</p>}
      </div>
    </>
  )
}

export default Proyectos;