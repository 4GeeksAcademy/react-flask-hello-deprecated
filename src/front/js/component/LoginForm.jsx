import React from "react";

const LoginForm = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen">
            {/* Sección Inzquierda: Welcome Back */}
            <div className="bg-indigo-500 text-white flex flex-col items-center justify-center md:w-1/2 p-8">
                <h1 className="text-4xl font-bold mb-4">Welcome Back!</h1>
                <p className="text-lg mb-6">To keep connected, please login with your account.</p>
                {/* Botón de iniciar sesión */}
                <button className="px-6 py-2 bg-white text-indigo-500 rounded-full font-semibold shadow-md hover:bg-gray-100">
                    SING IN
                </button>
            </div>

            {/* Sección derecha: Create Account */}
            <div className="bg-white flex flex-col items-center justify-center md:w-1/2 p-8">
                <h1 className="text-3xl font-bold text-indigo-500 mb-4">Create Account</h1>
                <p className="text-sm text-gray-500 mb-6">or use your email for registration</p>
                {/* Formulario de registro */}
                <form className="w-full max-w-sm space-y-4">
                    <div>
                        <label htmlFor="name" className="sr-only">Name</label>
                        <input
                            type="text"
                            id="name"
                            placeholder="Name"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="email" className="sr-only">Email</label>
                        <input
                            type="text"
                            id="email"
                            placeholder="Email"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <div>
                        <label htmlFor="password" className="sr-only">Password</label>
                        <input
                            type="text"
                            id="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500" />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-600 transition"
                    >
                        SING UP
                    </button>
                </form>
                {/* Íconos Sociales */}
                <div className="flex space-x-4 mt-6">
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <i className="fab fa-twitter text-indigo-500"></i>
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <i className="fab fa-facebook text-indigo-500"></i>
                    </button>
                    <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                        <i className="fab fa-linkedin text-indigo-500"></i>
                    </button>
                </div>
            </div>
        </div >
    );
};

export default LoginForm;