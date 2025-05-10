
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import Cloudinary from "../component/cloudinary";
import "leaflet/dist/leaflet.css";
import L from "leaflet"
import UbicationMap from "../component/ubication_map";

const NewPetLost = () => {
  const navigate = useNavigate();
  const { store, actions } = useContext(Context)

  const [newPet, setNewPet] = useState({
    
    "name": "",
    "species": "",
    "breed": "",
    "color": "",
    "gender": "",
    "description": "",
    "photo_1": "",
    "photo_2": "",
    "photo_3": "",
    "photo_4": "",
    "event_date": "",
    "zone": "",
    "longitude": "-56.159328",
    "latitude": "-34.895992",
    "pet_status": "lost"

  });



  function handleChange(e) {
    setNewPet({
      ...newPet, [e.target.id]: e.target.value
    })
  }
  console.log(newPet);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("enviando post", newPet);
    actions.addNewPet(newPet);
    console.log("enviado");
    // navigate("/map")
  };

  const CustomIcon = L.divIcon({
    html: '<i class="fa-solid fa-paw"></i>',
    className: "custom-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  })


  return (
    <div className="container col-sm-10, col-md-8, col-lg-6 border rounded pet-form bg-light p-4 ">
      <div className="container ">
        <p className="post-title text-center">Información de la mascota perdida</p>
      </div>
      <div className=" container p-2 ">
        <form onSubmit={handleSubmit} >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">NOMBRE</label>
            <input type="text" className="form-control" id="name" placeholder="Ingresa el nombre de tu mascota" value={newPet.name} required onChange={handleChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="species" className="form-label">ESPECIE</label>

            <select className="form-select" id="species" aria-label="Default select example" value={newPet.species} required onChange={handleChange} >
              <option value="" disabled>Selecciona</option>
              <option value="perro">Perro</option>
              <option value="gato">Gato</option>
              <option value="conejo">Conejo</option>
              <option value="ave">Ave</option>
              <option value="reptil">Reptil</option>
              <option value="otro">Otro</option>

            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="breed" className="form-label">RAZA</label>
            <input type="text" className="form-control" id="breed" placeholder="Ingresa la raza de tu mascota" value={newPet.breed} required onChange={handleChange} />
          </div>
          <div className="row g-3 mb-3 ">
            <div className="col-md-6">
              <label htmlFor="gender" className="form-label">GENERO</label>

              <select className="form-select" id="gender" aria-label="Selecionar genero" value={newPet.gender} required onChange={handleChange} >
                <option value="" disabled>Selecciona</option>
                <option value="male">Macho</option>
                <option value="female">Hembra</option>
                <option value="unknow">No lo sé</option>
              </select>
            </div>
            <div className="col-md-6">
              <label htmlFor="color" className="form-label">COLOR</label>
              <input type="text" className="form-control" id="color" placeholder="Ingresa el color de tu mascota" value={newPet.color} required onChange={handleChange} />
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">DESCRIPCION</label>
            <textarea className="form-control" id="description" rows="3" value={newPet.description} required onChange={handleChange}></textarea>
          </div>
          <Cloudinary
            updatePhotos={(uploadedImages) => setNewPet((prev) => ({
              ...prev,
              photo_1: uploadedImages[0] || "",
              photo_2: uploadedImages[1] || "",
              photo_3: uploadedImages[2] || "",
              photo_4: uploadedImages[3] || "",
            }))
            }
          />
          <div className="d-block mb-3">
            <label htmlFor="date" className="form-label ">¿CUANDO SE PERDIÓ?</label>
            <input type="date" className="form-control" id="event_date" value={newPet.event_date} required onChange={handleChange} />
          </div>
          <div className="d-block mb-3">
            <label htmlFor="zone" className="form-label">¿EN QUÉ BARRIO SE PERDIÓ?</label>
            <input type="text" className="form-control" id="zone" placeholder="Barrio/zona" value={newPet.zone} required onChange={handleChange} />
          </div>
          <UbicationMap
            coordenates={(position) => setNewPet((prev) => ({
              ...prev,
              latitude: position.lat || "",
              longitude: position.lng || "",
            }))} />
          <div className="d-grid gap-2 col-6 mx-auto ">
            <button className="btn btn-primary btn-publicar rounded-pill m-2" type="submit">Publicar</button>
          </div>
        </form>
      </div>
    </div >


  )
}

export default NewPetLost