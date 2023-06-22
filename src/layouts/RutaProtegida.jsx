import { useContext } from "react";
import { Outlet, Navigate } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import Spinner from "../components/Spinner";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";

const RutaProtegida = () => {
    const { auth, cargando } = useContext(AuthContext);

    if(cargando) return <Spinner/>

    return (
        <>
            {auth._id ? (
                <div className="bg-gray-100">
                    <Header />
                    <div className="md:flex md:min-h-screen">
                        <Sidebar />

                        <main className="p-10 flex-1">
                            <Outlet />
                        </main>
                    </div>
                </div>

            ) : <Navigate to="/" />}
        </>
    )
}

export default RutaProtegida;