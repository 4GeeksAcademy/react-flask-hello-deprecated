import React, { Component } from "react";

export const Footer = () => {
    return (
        <footer className="bg-white text-gray-900 py-8 border-t border-gray-300">
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-6 text-center md:text-left">
                {/* Sección de Información */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Sobre Nosotros</h3>
                    <p className="text-gray-600">En PupperEats queremos que tus peludos tengan la mejor calidad de vida posible. Somos defensores de la comida de calidad sin aditivos innecesarios que ofrezcan la mejor opción según las necesidades específicas de tu mascota.</p>
                </div>
                
                {/* Sección de Redes Sociales */}
                <div>
                    <h3 className="text-xl font-semibold mb-2">Síguenos</h3>
                    <div className="flex justify-center md:justify-start space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-facebook fa-lg"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-twitter fa-lg"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-instagram fa-lg"></i>
                        </a>
                    </div>
                </div>
            </div>
            <div className="text-center text-gray-500 text-sm mt-6">
                &copy; 2025 Pupper Eats - Todos los derechos reservados
            </div>
        </footer>
    );
};



