import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const PetsView = () => {
  // Estado para los datos y los filtros
  const [pets, setPets] = useState([]);
  const [filteredPets, setFilteredPets] = useState([]);
  const [filters, setFilters] = useState({
    type: "", // Tipo de mascota (perro, gato, etc.)
    color: "", // Color de la mascota
    size: "",  // Tamaño de la mascota
    sex: "",   // Sexo de la mascota (macho o hembra)
  });

const BringAllPetsAPI = () => {
      fetch('https://super-duper-dollop-x5rqv9jj6pv7cvx4p-3001.app.github.dev/pets')
      .then((resp) => resp.json())
      .then((data) => {
        setPets(data.data);
        setFilteredPets(data.data); // Mostrar todo inicialmente      
        })
}


  // Simulación de datos o carga desde una API
  useEffect(() => {
    BringAllPetsAPI()
    // const petData = [
    //   { id: 1, name: "Max", type: "Perro", color: "Negro", sex: "Macho", size: "Grande", image: "" },
    //   { id: 2, name: "Bella", type: "Gato", color: "Amarillo", sex: "Hembra", size: "Pequeño", image:"" },
    //   { id: 3, name: "Rocky", type: "Perro", color: "marrón", size: "Mediano", image: "" },
    //   { id: 4, name: "Spike", type: "gato", color: "verde", sex:"macho", size: "Pequeño", image: "" },
    //   { id: 5, name: "Luna", type: "otro", color: "gris", size: "Grande", image: "" },
    //   { id: 6, name: "Chameleon", type: "reptil", color: "multicolor", size: "Pequeño", image: "https://mundoreptil.net/wp-content/uploads/primer-plano-increible-habilidad.webp" },
    //   { id: 7, name: "Blanquita", type: "otro", color: "Blanco y Negro", size: "Pequeño", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfkhMZAkUKlthC2a_1jMkEhoMzNakBrJcegQ&s" },
    //   { id: 8, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "https://vitalcan.es/wp-content/uploads/kitty-2903812_1280.jpg" },
    //   { id: 9, name: "Bella", type: "gato", color: "blanco", size: "pequeño", image: "data:image/jpeg;base64,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" },
    //   // Más datos...
    // ];
    // setPets(petData);
    // setFilteredPets(petData); // Mostrar todo inicialmente
  }, []);

  // Manejar cambios en los filtros
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  // Filtrar mascotas
  useEffect(() => {
    const filtered = pets.filter((pet) => {
      return (
        (filters.type === "" || pet.type === filters.type) &&
        (filters.color === "" || pet.color === filters.color) &&
        (filters.size === "" || pet.size === filters.size) &&
        (filters.sex === "" || pet.sex === filters.sex)
      );
    });
    setFilteredPets(filtered);
  }, [filters, pets]);
  return (
    <div className="container mt-4">
      <div className="row">
        {/* Columna de Filtros */}
        <div className="col-md-3">
          <div className="filters-container">
            <h5>Filtrar por:</h5>
            {/* Filtro por sexo */}
            <div className="filter mb-3">
              <label>Sexo:</label>
              <select name="type" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="perro">Macho</option>
                <option value="gato">Hembra</option>

              </select>
            </div>
            {/* Filtro por tipo */}
            <div className="filter mb-3">
              <label>Especie:</label>
              <select name="type" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="Perro">Perro</option>
                <option value="Gato">Gato</option>
                <option value="conejo">Conejo</option>
                <option value="reptil">Reptil</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            {/* Filtro por color */}
            <div className="filter mb-3">
              <label>Color:</label>
              <div>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value=""
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span className="ms-2">Todos</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="negro"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'black',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Negro</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="blanco"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'white',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Blanco</span>
                </label>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="gris"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'grey',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Gris</span>
                </label>
                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="multicolor"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: "linear-gradient(45deg, #FF6347, #6A5ACD, #32CD32, #FFD700)",
                      border: '1px solid black',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Multicolor</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="marrón"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      backgroundColor: 'brown',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                    }}
                  ></span>
                  <span className="ms-2">Marrón</span>
                </label>

                <label className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    name="color"
                    value="blanco-negro"
                    className="form-check-input"
                    onChange={handleFilterChange}
                  />
                  <span
                    className="ms-2"
                    style={{
                      background: 'linear-gradient(45deg, black 50%, white 50%)',
                      width: '15px',
                      height: '15px',
                      borderRadius: '50%',
                      border: '1px solid black',
                    }}
                  ></span>
                  <span className="ms-2">Blanco y Negro</span>
                </label>
              </div>
            </div>
            {/* Filtro por tamaño */}
            <div className="filter mb-3">
              <label>Tamaño:</label>
              <select name="size" className="form-control" onChange={handleFilterChange}>
                <option value="">Todos</option>
                <option value="pequeño">Pequeño</option>
                <option value="mediano">Mediano</option>
                <option value="grande">Grande</option>
              </select>
            </div>
          </div>
        </div>

        {/* Columna de Tarjetas */}
        <div className="col-md-9">
          <div className="row">
            {filteredPets.map((pet) => (
              <div className="col-md-4 mb-3" key={pet.id}>
                <div className="card">
                  <img src={pet.photo_1} className="card-img-top" alt={pet.name} />
                  <div className="card-body">
                    <h5 className="card-title">{pet.name}</h5>
                    <p className="card-text">
                      Tipo: {pet.type} <br />
                      Color: {pet.color} <br />
                      Sexo: {pet.size}
                    </p>
                    <Link to={`/petcard/${pet.id}`}>Más información</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetsView;
