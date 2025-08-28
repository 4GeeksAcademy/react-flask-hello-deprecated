import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "../../styles/home.css";

const Contact = () => {
    const form = useRef();
    const [errors, setErrors] = useState({});
    const [selectedCountry, setSelectedCountry] = useState({
        code: "+56",
        name: "Chile",
    });
    const [phoneNumber, setPhoneNumber] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);

    const countries = [
        { code: "+54", name: "Argentina" },
        { code: "+61", name: "Australia" },
        { code: "+56", name: "Chile" },
        { code: "+64", name: "New Zealand" },
    ];

    const validateForm = () => {
        const newErrors = {};
        if (!form.current["service"].value)
            newErrors.service = "Completa este campo obligatorio.";
        if (!form.current["name"].value)
            newErrors.name = "Completa este campo obligatorio.";
        if (!phoneNumber) newErrors.phone = "Completa este campo obligatorio.";
        if (!form.current["email"].value)
            newErrors.email = "Completa este campo obligatorio.";
        if (!form.current["company"].value)
            newErrors.company = "Completa este campo obligatorio.";
        if (!form.current["position"].value)
            newErrors.position = "Completa este campo obligatorio.";
        if (!form.current["industry"].value)
            newErrors.industry = "Completa este campo obligatorio.";
        if (!form.current["employees"].value)
            newErrors.employees = "Completa este campo obligatorio.";
        if (!form.current["message"].value)
            newErrors.message = "Completa este campo obligatorio.";
        return newErrors;
    };

const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        setIsSubmitting(false);
        return;
    }

    // Prepara los datos
    const templateParams = {
        service: form.current["service"].value,
        name: form.current["name"].value,
        phone: `${selectedCountry.code}${phoneNumber}`,
        email: form.current["email"].value,
        company: form.current["company"].value,
        position: form.current["position"].value,
        industry: form.current["industry"].value,
        employees: form.current["employees"].value,
        message: form.current["message"].value
    };

    console.log('Enviando datos:', templateParams);
    console.log('Service ID:', process.env.REACT_APP_EMAILJS_SERVICE_ID);
    console.log('Template ID Admin:', process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN);
    console.log('User ID:', process.env.REACT_APP_EMAILJS_USER_ID);

    // 1. PRIMERO enviar correo a OSCAR@COMPASIT.CL (template_78c855n)
    emailjs.send(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID_ADMIN, // ← ESTE es el importante
        templateParams,
        process.env.REACT_APP_EMAILJS_USER_ID
    )
    .then((adminResult) => {
        console.log('Correo a admin enviado:', adminResult);
        
        // 2. LUEGO enviar correo de confirmación al USUARIO (template_m386vdr)
        return emailjs.send(
            process.env.REACT_APP_EMAILJS_SERVICE_ID,
            process.env.REACT_APP_EMAILJS_TEMPLATE_ID, // ← Auto-reply para usuario
            templateParams,
            process.env.REACT_APP_EMAILJS_USER_ID
        );
    })
    .then((userResult) => {
        console.log('Correo a usuario enviado:', userResult);
        setSubmitSuccess(true);
        form.current.reset();
        setErrors({});
        setSelectedCountry({ code: "+56", name: "Chile" });
        setPhoneNumber("");
        setIsSubmitting(false);
        setTimeout(() => setSubmitSuccess(false), 5000);
    })
    .catch((error) => {
        console.error('Error completo:', error);
        
        let errorMessage = 'Error al enviar el mensaje. ';
        
        if (error.text) {
            errorMessage += `Detalles: ${error.text}`;
        } else {
            errorMessage += 'Por favor contacta a: oscar@compasit.cl';
        }
        
        alert(errorMessage);
        setIsSubmitting(false);
    });
};

    return (
        <div className="contact-container" style={{ marginTop: '0', paddingTop: '0' }}>
            <section className="mb-0 ecommerce-section" id="contact-form" style={{ paddingTop: '2rem' }}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-8">
                            {submitSuccess && (
                                <div className="alert alert-success text-center">
                                    ¡Mensaje enviado con éxito!
                                </div>
                            )}
                            
                            <h2 style={{ color: "#f7f1f1ff" }} className="text-center mb-4">
                                <p></p>
                            </h2>
                            
                            <form ref={form} onSubmit={sendEmail} className="contact-form">
                                {/* Servicio */}
                                <div className="form-group">
                                    <select name="service" required>
                                        <option value="">Seleccione el servicio a consultar</option>
                                        <option>ERP (SAP Business One, Consultoria y Migraciones)</option>
                                        <option>Consultoría tecnológica</option>
                                        <option>Data Analisis - Integración entre sistemas</option>
                                        <option>Visualización de Datos</option>
                                        <option>Desarrollo software</option>
                                        <option>E-commerce y Marketplace</option>
                                        <option>Mantención y soporte de infraestructura tecnológica</option>
                                        <option>Migración a la nube</option>
                                        <option>Seguridad de la información</option>
                                        <option>Aplicaciones web</option>
                                        <option>Otros</option>
                                    </select>
                                    {errors.service && <p className="error-message">{errors.service}</p>}
                                </div>

                                {/* Nombre */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Nombre completo*"
                                        required
                                    />
                                    {errors.name && <p className="error-message">{errors.name}</p>}
                                </div>

                                {/* Teléfono */}
                                <div className="form-group">
                                    <div className="d-flex align-items-center gap-2">
                                        <select
                                            className="form-select"
                                            style={{ width: '120px' }}
                                            value={selectedCountry.name}
                                            onChange={(e) => {
                                                const country = countries.find((c) => c.name === e.target.value);
                                                setSelectedCountry(country || { code: "+56", name: "Chile" });
                                                setPhoneNumber("");
                                            }}
                                            required
                                        >
                                            {countries.map((country) => (
                                                <option key={country.code} value={country.name}>
                                                    {country.name} ({country.code})
                                                </option>
                                            ))}
                                        </select>
                                        
                                        <input
                                            type="tel"
                                            className="form-control flex-grow-1"
                                            name="phone"
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Número telefónico*"
                                            required
                                        />
                                    </div>
                                    {errors.phone && <p className="text-danger small mt-1">{errors.phone}</p>}
                                </div>

                                {/* Email */}
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Correo corporativo*"
                                        required
                                    />
                                    {errors.email && <p className="error-message">{errors.email}</p>}
                                </div>

                                {/* Empresa */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="company"
                                        placeholder="Nombre de la empresa*"
                                        required
                                    />
                                    {errors.company && <p className="error-message">{errors.company}</p>}
                                </div>

                                {/* Cargo */}
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="position"
                                        placeholder="Cargo*"
                                        required
                                    />
                                    {errors.position && <p className="error-message">{errors.position}</p>}
                                </div>

                                {/* Industria */}
                                <div className="form-group">
                                    <select name="industry" required>
                                        <option value="">Seleccione la industria*</option>
                                        <option>Agricultura</option>
                                        <option>Agua y gas</option>
                                        <option>Alimentación</option>
                                        <option>Automotriz</option>
                                        <option>Banca e inversiones</option>
                                        <option>Comercio y retail</option>
                                        <option>Comunicaciones (medios y tecnología)</option>
                                        <option>Construcción</option>
                                        <option>Educación</option>
                                        <option>Energía</option>
                                        <option>Hotelería y turismo</option>
                                        <option>Industria química</option>
                                        <option>Mercado de capitales</option>
                                        <option>Mineria</option>
                                        <option>Producción</option>
                                        <option>Salud</option>
                                        <option>Seguros</option>
                                        <option>Servicios públicos</option>
                                        <option>Telecomunicaciones</option>
                                        <option>Transporte</option>
                                        <option>Textiles</option>
                                        <option>Productos varios</option>
                                        <option>Emprendimiento personal</option>
                                        <option>Otra</option>
                                    </select>
                                    {errors.industry && <p className="error-message">{errors.industry}</p>}
                                </div>

                                {/* Empleados */}
                                <div className="form-group">
                                    <select name="employees" required>
                                        <option value="">Cantidad de empleados*</option>
                                        <option>1 - 49</option>
                                        <option>50 - 99</option>
                                        <option>100 - 499</option>
                                        <option>1000 o más</option>
                                    </select>
                                    {errors.employees && <p className="error-message">{errors.employees}</p>}
                                </div>

                                {/* Mensaje */}
                                <div className="form-group">
                                    <textarea
                                        name="message"
                                        placeholder="Mensaje*"
                                        required
                                    ></textarea>
                                    {errors.message && <p className="error-message">{errors.message}</p>}
                                </div>

                                {/* Botón de enviar */}
                                <div className="form-group">
                                    <button 
                                        type="submit" 
                                        className="submit-button"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? 'Enviando...' : 'ENVIAR'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;