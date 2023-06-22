const Spinner = () => {
    return (
        <>
            {/* Spinner de carga */}
            <div className="w-full flex justify-center mt-14 md:mt-20">
                <div className="sk-chase">
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                    <div className="sk-chase-dot"></div>
                </div>
            </div>
        </>
    )
}

export default Spinner;