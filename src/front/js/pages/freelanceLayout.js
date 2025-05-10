import React, { useContext, useState } from "react";
import { Context } from "../store/appContext.js";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

export const FreelanceLayout = () => {
    const { actions } = useContext(Context);
    const [formData, setFormData] = useState({
        basic: { title: "", description: "", price: "", time: "" },
        pro: { title: "", description: "", price: "", time: "" },
        enterprise: { title: "", description: "", time: "", price: "" },
    });


    const [photo, setPhoto] = useState(null);
    const [activeCategory, setActiveCategory] = useState("basic");
    const [imagePreview, setImagePreview] = useState("");

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "img_url" && files && files[0]) {
            setPhoto(files[0]);
            setImagePreview(URL.createObjectURL(files[0]));
        } else {
            setFormData((prev) => ({
                ...prev,
                [activeCategory]: { ...prev[activeCategory], [name]: value },
            }));
        }
    };

    const handleNextCategory = () => {
        const categories = ["basic", "pro", "enterprise"];
        const currentIndex = categories.indexOf(activeCategory);
        const nextIndex = (currentIndex + 1) % categories.length; 
        setActiveCategory(categories[nextIndex]);

    };

    const handleSubmitAll= async () => {
        const categories = ["basic", "pro", "enterprise"];
        if (!photo){
            toast.error("Por favor sube una imagen de portada");
            return;
        }

        for (let cat of categories) {
            const data = formData[cat];
            if (!data.title || !data.description || !data.price || !data.time) {
                toast.error(`Completa todos los datos del paquete ${cat}`);
                return;
            }

            const fd = new FormData();
            fd.append("title", data.title);
            fd.append("description", data.description);
            fd.append("price", parseInt(data.price));
            fd.append("time", data.time);
            fd.append("category", cat);
            fd.append("img_url", photo);


            try {
                await actions.createProduct(fd);

          } catch (err) {
                console.error(`Error al guardar el paquete ${cat}:`, err);
                toast.error(`Error al guardar el paquete ${cat}`);
                return;
            }
        }
        toast.success("Todos los paquetes han sido guardados exitosamente");
    };
 

    return (
        <div className="container">

            <h5 className="card-title m-3">
                <span className="badge me-2" style={{ background: "#FF6B6B" }}>2</span>
                Agrega tus servicios
            </h5>
            <p>Para ayudarte a ofrecer tus servicios de forma clara y atractiva, te pedimos que completes la información de tres paquetes: Básico, Pro y Empresarial. Cada paquete debe reflejar un nivel diferente de servicio, precio y valor.</p>
            <div className="progress mb-3" style={{ height: "20px" }}>
                <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                        width: `${((['basic', 'pro', 'enterprise'].indexOf(activeCategory) + 1) / 3) * 100}%`,
                        backgroundColor: "#1E266D"
                    }}
                >
                    {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 mt-4">
                    <h2>Formulario para {activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}</h2>
                    <div className="d-flex flex-column">

                        <div className="input-group w-100 mb-4">
                            <input
                                type="text"
                                name="title"
                                className="form-control"
                                placeholder="Título del producto"
                                value={formData[activeCategory].title}
                                onChange={handleChange}
                                style={{
                                    border: "none",
                                    borderBottom: "2px solid #1E266D",
                                    outline: "none",
                                    width: "100%",
                                    padding: "8px 0",
                                    fontSize: "20px",
                                    color: "#1E266D",
                                    background: "aliceblue",
                                }}
                            />
                        </div>

                        {/* Subir imagen */}
                        <div className="card border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                Foto de portada
                            </div>
                            <div className="card-body">
                                <div className="border p-4 rounded" style={{ background: "white", justifyContent: "center" }}>
                                    <i className="fa-solid fa-image fa-8x" style={{ opacity: 0.5 }}></i>
                                    <div className="custom-file mb-4">
                                        <input
                                            type="file"
                                            className="form-control"
                                            name="img_url"
                                            accept="image/*"
                                            onChange={handleChange}
                                        />
                                        {imagePreview && (
                                            <img
                                                src={imagePreview}
                                                alt="Vista previa"
                                                className="img-thumbnail mt-3"
                                                style={{ maxHeight: "200px" }}
                                            />
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className="card border rounded shadow mb-4" style={{ background: "aliceblue" }}>
                            <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                Información del Producto
                            </div>
                            <div className="card-body">
                                <label htmlFor="description">Descripción</label>
                                <textarea
                                    className="form-control"
                                    id="description"
                                    name="description"
                                    value={formData[activeCategory].description}
                                    onChange={handleChange}
                                    rows="3"
                                ></textarea>
                            </div>
                        </div>
                        
                            <div className="row justify-content-around ">
                                <div className="col-6 d-flex aling-items-strech">
                                    <div className=" card border rounded shadow mb-4 w-100" style={{ background: "aliceblue" }}>
                                        <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                            Precio
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="price">Precio</label>
                                            <input
                                                type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                value={formData[activeCategory].price}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-6 d-flex aling-items-strech">
                                    <div className="card border rounded shadow mb-4 w-100" style={{ background: "aliceblue" }}>
                                        <div className="card-header" style={{ background: "#1E266D", color: "#ffffff", fontSize: "1.5rem" }}>
                                            Tiempo de entrega estimado
                                        </div>
                                        <div className="card-body">
                                            <label htmlFor="price">Tiempo estimado</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="time"
                                                name="time"
                                                value={formData[activeCategory].time}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                       
                        {/* Botones */}
                        <div className="d-flex justify-content-between">
                            <button
                                type="button"
                                className="btn"
                                onClick={handleNextCategory}
                                style={{ width: "150px", background: "#1e266d", color: "aliceblue" }}
                            >
                                Siguiente
                            </button>

                            <Link to="/freeCV">
                                   <button
                                type="button"
                                className="btn"
                           
                                style={{ width: "150px", background: "#1e266d", color: "aliceblue" }}
                            >
                                Atrás
                            </button>             
                            </Link>
                             
                            <button
                                type="button"
                                className="btn"
                                onClick={handleSubmitAll}
                                style={{ width: "150px", background: "#00D1B2", color: "aliceblue" }}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>


                <div className="col-md-4 mt-4">
                    <h3>Vista previa de paquetes</h3>
                    <div className="row">
                        {["basic", "pro", "enterprise"].map((category) => (
                            <div className="card p-3 shadow-sm mb-3" key={category}>
                                <h5>{formData[category].title || "Título no definido"}</h5>
                                <h6>${formData[category].price || "0.00"}</h6>
                                <p>{formData[category].time || "Escribe un tiempo aproximado"}</p>
                                 <p>{formData[category].description || "Descripción no definida"}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FreelanceLayout;