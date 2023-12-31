const Alerta = ({alerta}) => {
  return (
    <div className={`${alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'} bg-gradient-to-br text-center p-3 uppercase text-white font-bold text-sm mt-3 mb-6 rounded-md`}>
        {alerta.msg}
    </div>
  )
}

export default Alerta;