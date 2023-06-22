import { Link } from "react-router-dom";

const NoExiste = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-14 w-11/12 mx-auto md:p-8">
      <h1 className="text-5xl font-bold text-center">¡Vaya!</h1>
      <h1 className="mt-3 text-2xl font-bold text-center">No hemos podido encontrar la página que buscas</h1>

      <Link to="/proyectos" className="mt-14 px-3 py-2 bg-gray-800 text-white font-bold rounded-md hover:bg-gray-900 hover:-translate-y-2 ease-in-out transition-all duration-500">Volver a UpTask</Link>
    </div>
  )
}

export default NoExiste;