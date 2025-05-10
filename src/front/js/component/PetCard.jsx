import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";

const PetCard = () => {
  const { store } = useContext(Context);
  const { theid } = useParams();
  const [detail, setDetail] = useState(null);
  const [mainImage, setMainImage] = useState("https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg"); // Imagen principal inicial

  const findDetail = () => {
    const result = store.petData.find((item) => item.id == theid);
    setDetail(result);
    setMainImage(result?.image || "https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg"); // Establecemos la imagen principal
  };

  useEffect(() => {
    findDetail();
  }, [theid]);

  return (
    <div className="pet-card-container">
      {/* Navigation path */}
      <div className="d-flex justify-content-end navigation-path mb-3">
        <a
          href="https://sturdy-space-invention-q7947gjpqj76fx57r-3000.app.github.dev/"
          className="text-secondary mx-2"
        >
          Home
        </a>{" "}
        >{" "}
        <a
          href="https://sturdy-space-invention-q7947gjpqj76fx57r-3000.app.github.dev/PetView"
          className="text-secondary mx-2"
        >
          Mascotas
        </a>{" "}
         > Más información
      </div>

      <div className="row">
        {/* Imagen y carrousel */}
        <div className="col-md-6 image-section">
          {/* Imagen principal */}
          <div className="main-image-container">
            <img
              className="main-image img-fluid rounded"
              src={mainImage}
              alt="Main Pet"
            />
          </div>

          {/* Miniaturas debajo de la imagen principal */}
          <div className="image-thumbnails mt-3 d-flex">
            <img
              className="thumbnail img-fluid mx-2"
              src="https://via.placeholder.com/150x100"
              alt="Thumbnail 1"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage("https://via.placeholder.com/600x400")}
            />
            <img
              className="thumbnail img-fluid mx-2"
              src="https://via.placeholder.com/150x100/ff7f7f"
              alt="Thumbnail 2"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage("https://via.placeholder.com/600x400/ff7f7f")}
            />
            <img
              className="thumbnail img-fluid mx-2"
              src="https://via.placeholder.com/150x100/7fff7f"
              alt="Thumbnail 3"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage("https://via.placeholder.com/600x400/7fff7f")}
            />
            <img
              className="thumbnail img-fluid mx-2"
              src="https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg"
              alt="Thumbnail 4"
              style={{ width: "80px", height: "auto", cursor: "pointer" }}
              onClick={() => setMainImage("https://cdn.pixabay.com/photo/2023/11/12/17/12/puppy-8383633_1280.jpg")}
            />
          </div>

          {/* Botón Share debajo de la carrousel */}
          <div className="share-section mt-3">
            <h5>Compartir</h5>
            <div className="social-share d-flex justify-content-start">
              <a href="https://www.facebook.com/sharer/sharer.php?u=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-facebook"></i>
              </a>
              <a href="https://twitter.com/intent/tweet?url=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="https://wa.me/?text=https://your-website.com" target="_blank" className="btn btn-outline-secondary mx-2">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
        </div>

        {/* Pet details */}
        <div className="col-md-6 info-section">
          <h3 className="text-primary">{detail?.name}</h3>
          <p className="text-danger" style={{ fontSize: "1.5rem" }}>
            Perdido/Encontrado el {detail?.lostDate}
          </p>
          <a
            href="#contactForm"
            className="btn btn-primary mb-3"
            data-bs-toggle="modal"
            data-bs-target="#contactModal"
            style={{
              backgroundColor: "darkblue", // Azul marino
              borderRadius: "20px", // Bordes curvos
              color: "white", // Texto blanco
              padding: "10px 20px", // Espaciado interno
              border: "none", // Sin borde adicional
              fontSize: "16px", // Tamaño del texto
            }}
          >
            Comunicarse
          </a>
          <table className="table">
            <tbody>
              <tr>
                <th scope="row">NOMBRE:</th>
                <td>{detail?.name}</td>
              </tr>
              <tr>
                <th scope="row">SEXO:</th>
                <td>{detail?.gender}</td>
              </tr>
              <tr>
                <th scope="row">EDAD:</th>
                <td>{detail?.age}</td>
              </tr>
              <tr>
                <th scope="row">TAMAÑO:
                </th>
                <td>{detail?.size}</td>
              </tr>
              <tr>
                <th scope="row">COLOR:</th>
                <td>{detail?.color}</td>
              </tr>
              <tr>
                <th scope="row">SE PERDIÓ EN:</th>
                <td>{detail?.location}</td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>INFORMACIÓN ADICIONAL:</strong> {detail?.additionalInfo}
          </p>
        </div>
      </div>

      {/* Modal para contacto */}
      <div
        className="modal fade"
        id="contactModal"
        tabIndex="-1"
        aria-labelledby="contactModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="contactModalLabel">
                Enviar un mensaje
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Tu Correo Electrónico
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Tu correo"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label">
                    Tu Mensaje
                  </label>
                  <textarea
                    className="form-control"
                    id="message"
                    rows="3"
                    placeholder="Escribe tu mensaje aquí"
                  ></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancelar
              </button>
              <button type="button" className="btn btn-primary">
                Enviar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetCard;
