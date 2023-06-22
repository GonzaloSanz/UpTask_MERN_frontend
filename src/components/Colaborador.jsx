import { useContext } from "react";
import ProyectosContext from "../context/ProyectosProvider";
import Swal from "sweetalert2";

const Colaborador = ({ colaborador }) => {
  const { eliminarColaborador } = useContext(ProyectosContext);

  const { _id, nombre, email } = colaborador;

  const handleClick = () => {
    // Preguntar al usuario si desea eliminar el colaborador
    Swal.fire({
      title: '¿Deseas eliminar este colaborador?',
      text: "¡No podrás revertir los cambios!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Volver'

    }).then(async (result) => {
      // En caso afirmativo
      if (result.isConfirmed) {
        eliminarColaborador(_id);
      }
    })
  }
  return (
    <div className="border-b p-5 flex justify-between items-center">
      <div>
        <p>{nombre}</p>
        <p className="text-sm text-gray-700">{email}</p>
      </div>

      <div>
        <button onClick={handleClick} type="button" className="bg-red-600 hover:bg-red-700 cursor-pointer px-3 py-2 text-white font-bold rounded-md">Eliminar</button>
      </div>
    </div>
  )
}

export default Colaborador;