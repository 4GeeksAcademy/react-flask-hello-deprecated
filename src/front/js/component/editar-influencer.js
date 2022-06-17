import { string } from "prop-types";
import React, { Component, useState, useEffect } from "react";
import { useParams } from "react-router-dom";


export const EditarInfluencer = () => {
    const parametro = useParams()
    var allData = {}
    var finalData = {}
    const [igLinks, addLinks] = useState([]);
    var getInfo = {}
    useEffect(() => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/influencers/${parametro.id}`)
            .then(function (response) {
                return response.json()
            })
            .then(function (result) {

                document.getElementById('email').value = result["email"];
                document.getElementById('password').value = "";
                document.getElementById('rep-password').value = "";
                document.getElementById('apellidos').value = result["apellidos"];
                document.getElementById('nombre').value = result["nombre"];
                document.getElementById('pais').value = result["pais"];
                document.getElementById('categoria').value = result["categoria"];
                document.getElementById('ig-user').value = result["ig_user"];
                document.getElementById('ciudad').value = result["ciudad"];
                document.getElementById('bio').value = result["bio"];
                document.getElementById('precio-reel').value = result["precio_reel"];
                document.getElementById('precio-story').value = result["precio_story"];
                document.getElementById('precio-post').value = result["precio_post"];

                var links = []
                if (result["post1"]) { links.push(result["post1"]) }
                if (result["post2"]) { links.push(result["post2"]) }
                if (result["post3"]) { links.push(result["post3"]) }
                if (result["post4"]) { links.push(result["post4"]) }
                if (result["post5"]) { links.push(result["post5"]) }
                if (result["post6"]) { links.push(result["post6"]) }
                addLinks(links)


                return console.log(result)
            })
            .catch(error => console.log('error', error));





    }, [])

    function updateData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(finalData);

        var requestOptions = {
            method: 'PUT',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/influencers/${parametro.id}`, requestOptions)
        .then(function (response) {
            if (response.ok == true) {
                alert("Usuario actualizado con éxito")
            } else {

                alert("Lo sentimos, no se ha podido crear el usuario. Por favor, contacta con nosotros.")
            }
            return response.text()
        })
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }

    function sendData() {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify(finalData);

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://3001-jaygosling-influere-s5lmjehtutj.ws-eu47.gitpod.io/api/registro-influencers", requestOptions)
            .then(function (response) {
                if (response.ok == true) {
                    alert("Usuario creado con éxito")
                } else {

                    alert("Lo sentimos, no se ha podido crear el usuario. Por favor, contacta con nosotros.")
                }
                return response.text()
            })
            .then(result => console.log(result))
            .catch(error => console.log('error', error));


    }
    function addData() {
        if (document.getElementById('password').value == document.getElementById('rep-password').value) {

            allData.email = document.getElementById('email').value;
            allData.password = document.getElementById('password').value;
            allData.apellidos = document.getElementById('apellidos').value;
            allData.nombre = document.getElementById('nombre').value;
            allData.pais = document.getElementById('pais').value;
            allData.ciudad = document.getElementById('ciudad').value;
            allData.bio = document.getElementById('bio').value;
            allData.ig_user = document.getElementById('ig-user').value;
            allData.categoria = document.getElementById('categoria').value
            allData.precio_post = document.getElementById('precio-post').value
            allData.precio_reel = document.getElementById('precio-reel').value
            allData.precio_story = document.getElementById('precio-story').value
            allData.post1 = igLinks[0]
            allData.post2 = igLinks[1]
            allData.post3 = igLinks[2]
            allData.post4 = igLinks[3]
            allData.post5 = igLinks[4]
            allData.post6 = igLinks[5]


            if (allData.email &&
                allData.password &&
                allData.apellidos &&
                allData.nombre &&
                allData.pais &&
                allData.ciudad &&
                allData.bio &&
                allData.ig_user &&
                allData.categoria &&
                allData.post1 &&
                allData.precio_post &&
                allData.precio_reel &&
                allData.precio_story) {
                finalData = allData
                console.log(finalData)
                updateData()
            } else {
                alert("Todos los campos son obligatorios")
            }
        } else {
            alert("Las contraseñas no coinciden")
        }
    }


    function delData() {
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('rep-password').value = "";
        document.getElementById('apellidos').value = "";
        document.getElementById('nombre').value = "";
        document.getElementById('pais').value = "";
        document.getElementById('categoria').value = "";
        document.getElementById('ig-user').value = "";
        document.getElementById('ciudad').value = "";
        document.getElementById('bio').value = "";
        document.getElementById('precio-story').value = "";
        document.getElementById('precio-reel').value = "";
        document.getElementById('precio-post').value = "";

    }


    function plusButton() {
        if (igLinks.length == 6) {
            alert("Has llegado al máximo de enlaces posibles.")
        } else {

            addLinks([...igLinks, document.getElementById("ig-link").value])
            document.getElementById("ig-link").value = ""
        }
    }

    return (
        <div className="container-fluid m-0 p-0">
            <div className="container-fluid pt-5">
                <p className="h1 text-center my-5">Editar datos</p>
                <div className="container row d-flex justify-content-center text-end mx-auto mb-3">
                    <div className="col">
                        <div className="mb-3 row">
                            <label for="email" className="col-sm-3 col-form-label">Email</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="email" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="apellidos" className="col-sm-3 col-form-label">Apellidos</label>
                            <div className="col-sm-9">
                                <input type="text" className="form-control" id="apellidos" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="categoria" className="col-sm-3 col-form-label">Categoría</label>
                            <div className="col-sm-9">
                                <select className="form-select" aria-label="Default select example" id="categoria" defaultValue="Selecciona">
                                    <option value="Moda y belleza">Moda y belleza</option>
                                    <option value="Maquillaje y cosméticos">Maquillaje y cosméticos</option>
                                    <option value="Tecnología">Tecnología</option>
                                    <option value="Fitness y gym">Fitness y gym</option>
                                    <option value="Comida y recetas">Comida y recetas</option>
                                    <option value="Mamá y premamá">Mamá y premamá</option>
                                    <option value="Vegano y vegetariano">Vegano y vegetariano</option>
                                    <option value="Deportes">Deportes</option>
                                    <option value="Emprendimiento">Emprendimiento</option>
                                    <option value="Viajes">Viajes</option>
                                    <option value="Coches y motos">Coches y motos</option>
                                    <option value="Reality y televisión">Reality y televisión</option>
                                    <option value="Actores y cantantes">Actores y cantantes</option>
                                    <option value="Mascotas">Mascotas</option>
                                    <option value="Family friendly">Family friendly</option>
                                    <option value="Otro">Otro</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3 row">
                            <label for="password" className="col-sm-5 col-form-label">Contraseña</label>
                            <div className="col-sm-7">
                                <input type="password" className="form-control" id="password" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="nombre" className="col-sm-5 col-form-label">Nombre</label>
                            <div className="col-sm-7">
                                <input type="text" className="form-control" id="nombre" />
                            </div>
                        </div>
                        <div className="mb-3 row d-flex">
                            <label for="pais" className="col-sm-5 col-form-label">País</label>
                            <div className="col-sm-7">
                                <select className="form-select" aria-label="Default select example" id="pais" defaultValue="Selecciona">
                                    <option value="ESPAÑA">ESPAÑA</option>
                                    <option value="AFGANISTÁN">AFGANISTÁN</option>
                                    <option value="ALBANIA">ALBANIA</option>
                                    <option value="ALEMANIA">ALEMANIA</option>
                                    <option value="ANDORRA">ANDORRA</option>
                                    <option value="ANGOLA">ANGOLA</option>
                                    <option value="ANTIGUA Y BARBUDA">ANTIGUA Y BARBUDA</option>
                                    <option value="ARABIA SAUDITA">ARABIA SAUDITA</option>
                                    <option value="ARGELIA">ARGELIA</option>
                                    <option value="ARGENTINA">ARGENTINA</option>
                                    <option value="ARMENIA">ARMENIA</option>
                                    <option value="AUSTRALIA">AUSTRALIA</option>
                                    <option value="AUSTRIA">AUSTRIA</option>
                                    <option value="AZERBAIYÁN">AZERBAIYÁN</option>
                                    <option value="BAHAMAS">BAHAMAS</option>
                                    <option value="BANGLADÉS">BANGLADÉS</option>
                                    <option value="BARBADOS">BARBADOS</option>
                                    <option value="BARÉIN">BARÉIN</option>
                                    <option value="BÉLGICA">BÉLGICA</option>
                                    <option value="BELICE">BELICE</option>
                                    <option value="BENIN">BENIN</option>
                                    <option value="BIELORRUSIA">BIELORRUSIA</option>
                                    <option value="BOLIVIA">BOLIVIA</option>
                                    <option value="BOSNIA-HERZEGOVINA">BOSNIA-HERZEGOVINA</option>
                                    <option value="BOTSUANA">BOTSUANA</option>
                                    <option value="BRASIL">BRASIL</option>
                                    <option value="BRUNEI">BRUNEI</option>
                                    <option value="BULGARIA">BULGARIA</option>
                                    <option value="BURKINA FASO">BURKINA FASO</option>
                                    <option value="BURUNDI">BURUNDI</option>
                                    <option value="BUTÁN">BUTÁN</option>
                                    <option value="CABO VERDE">CABO VERDE</option>
                                    <option value="CAMBOYA">CAMBOYA</option>
                                    <option value="CAMERÚN">CAMERÚN</option>
                                    <option value="CANADÁ">CANADÁ</option>
                                    <option value="CATAR">CATAR</option>
                                    <option value="CHAD">CHAD</option>
                                    <option value="CHILE">CHILE</option>
                                    <option value="CHINA">CHINA</option>
                                    <option value="CHIPRE">CHIPRE</option>
                                    <option value="COLOMBIA">COLOMBIA</option>
                                    <option value="COMORAS">COMORAS</option>
                                    <option value="COREA DEL NORTE">COREA DEL NORTE</option>
                                    <option value="COREA DEL SUR">COREA DEL SUR</option>
                                    <option value="COSTA DE MARFIL">COSTA DE MARFIL</option>
                                    <option value="COSTA RICA">COSTA RICA</option>
                                    <option value="CROACIA">CROACIA</option>
                                    <option value="CUBA">CUBA</option>
                                    <option value="DINAMARCA">DINAMARCA</option>
                                    <option value="DOMINICA">DOMINICA</option>
                                    <option value="ECUADOR">ECUADOR</option>
                                    <option value="EGIPTO">EGIPTO</option>
                                    <option value="EL SALVADOR">EL SALVADOR</option>
                                    <option value="EMIRATOS ARABES UNIDOS">EMIRATOS ARABES UNIDOS</option>
                                    <option value="ERITREA">ERITREA</option>
                                    <option value="ESLOVAQUIA">ESLOVAQUIA</option>
                                    <option value="ESLOVENIA">ESLOVENIA</option>
                                    <option value="ESTADOS UNIDOS">ESTADOS UNIDOS</option>
                                    <option value="ESTONIA">ESTONIA</option>
                                    <option value="ETIOPÍA">ETIOPÍA</option>
                                    <option value="FILIPINAS">FILIPINAS</option>
                                    <option value="FINLANDIA">FINLANDIA</option>
                                    <option value="FIYI">FIYI</option>
                                    <option value="FRANCIA">FRANCIA</option>
                                    <option value="GABÓN">GABÓN</option>
                                    <option value="GAMBIA">GAMBIA</option>
                                    <option value="GEORGIA">GEORGIA</option>
                                    <option value="GHANA">GHANA</option>
                                    <option value="GRANADA">GRANADA</option>
                                    <option value="GRECIA">GRECIA</option>
                                    <option value="GUATEMALA">GUATEMALA</option>
                                    <option value="GUINEA">GUINEA</option>
                                    <option value="GUINEA ECUATORIAL">GUINEA ECUATORIAL</option>
                                    <option value="GUINEA-BISSAU">GUINEA-BISSAU</option>
                                    <option value="GUYANA">GUYANA</option>
                                    <option value="HAITÍ">HAITÍ</option>
                                    <option value="HONDURAS">HONDURAS</option>
                                    <option value="HUNGRÍA">HUNGRÍA</option>
                                    <option value="INDIA">INDIA</option>
                                    <option value="INDONESIA">INDONESIA</option>
                                    <option value="IRÁN">IRÁN</option>
                                    <option value="IRAQ">IRAQ</option>
                                    <option value="IRLANDA">IRLANDA</option>
                                    <option value="ISLANDIA">ISLANDIA</option>
                                    <option value="ISLAS MARSHALL">ISLAS MARSHALL</option>
                                    <option value="ISLAS SALOMÓN">ISLAS SALOMÓN</option>
                                    <option value="ISRAEL">ISRAEL</option>
                                    <option value="ITALIA">ITALIA</option>
                                    <option value="JAMAICA">JAMAICA</option>
                                    <option value="JAPÓN">JAPÓN</option>
                                    <option value="JORDANIA">JORDANIA</option>
                                    <option value="KAZAJISTÁN">KAZAJISTÁN</option>
                                    <option value="KENIA">KENIA</option>
                                    <option value="KIRGUISTÁN">KIRGUISTÁN</option>
                                    <option value="KIRIBATI">KIRIBATI</option>
                                    <option value="KUWAIT">KUWAIT</option>
                                    <option value="LAOS">LAOS</option>
                                    <option value="LESOTO">LESOTO</option>
                                    <option value="LETONIA">LETONIA</option>
                                    <option value="LÍBANO">LÍBANO</option>
                                    <option value="LIBERIA">LIBERIA</option>
                                    <option value="LIBIA">LIBIA</option>
                                    <option value="LIECHTENSTEIN">LIECHTENSTEIN</option>
                                    <option value="LITUANIA">LITUANIA</option>
                                    <option value="LUXEMBURGO">LUXEMBURGO</option>
                                    <option value="MADAGASCAR">MADAGASCAR</option>
                                    <option value="MALASIA">MALASIA</option>
                                    <option value="MALAUI">MALAUI</option>
                                    <option value="MALDIVAS">MALDIVAS</option>
                                    <option value="MALI">MALI</option>
                                    <option value="MALTA">MALTA</option>
                                    <option value="MARRUECOS">MARRUECOS</option>
                                    <option value="MAURICIO">MAURICIO</option>
                                    <option value="MAURITANIA">MAURITANIA</option>
                                    <option value="MÉXICO">MÉXICO</option>
                                    <option value="MICRONESIA">MICRONESIA</option>
                                    <option value="MOLDAVIA">MOLDAVIA</option>
                                    <option value="MÓNACO">MÓNACO</option>
                                    <option value="MONGOLIA">MONGOLIA</option>
                                    <option value="MONTENEGRO">MONTENEGRO</option>
                                    <option value="MOZAMBIQUE">MOZAMBIQUE</option>
                                    <option value="MYANMAR">MYANMAR</option>
                                    <option value="NAMIBIA">NAMIBIA</option>
                                    <option value="NAURU">NAURU</option>
                                    <option value="NEPAL">NEPAL</option>
                                    <option value="NICARAGUA">NICARAGUA</option>
                                    <option value="NÍGER">NÍGER</option>
                                    <option value="NIGERIA">NIGERIA</option>
                                    <option value="NORUEGA">NORUEGA</option>
                                    <option value="NUEVA ZELANDA">NUEVA ZELANDA</option>
                                    <option value="OMÁN">OMÁN</option>
                                    <option value="PAÍSES BAJOS">PAÍSES BAJOS</option>
                                    <option value="PAKISTÁN">PAKISTÁN</option>
                                    <option value="PALAOS">PALAOS</option>
                                    <option value="PALESTINA">PALESTINA</option>
                                    <option value="PANAMÁ">PANAMÁ</option>
                                    <option value="PAPÚA NUEVA GUINEA">PAPÚA NUEVA GUINEA</option>
                                    <option value="PARAGUAY">PARAGUAY</option>
                                    <option value="PERÚ">PERÚ</option>
                                    <option value="POLONIA">POLONIA</option>
                                    <option value="PORTUGAL">PORTUGAL</option>
                                    <option value="PUERTO RICO">PUERTO RICO</option>
                                    <option value="REINO UNIDO">REINO UNIDO</option>
                                    <option value="REPÚBLICA CENTROAFRICANA">REPÚBLICA CENTROAFRICANA</option>
                                    <option value="REPÚBLICA CHECA">REPÚBLICA CHECA</option>
                                    <option value="REPÚBLICA DE MACEDONIA">REPÚBLICA DE MACEDONIA</option>
                                    <option value="REPÚBLICA DEL CONGO">REPÚBLICA DEL CONGO</option>
                                    <option value="REPÚBLICA DEMOCRÁTICA DEL CONGO">REPÚBLICA DEMOCRÁTICA DEL CONGO</option>
                                    <option value="REPÚBLICA DOMINICANA">REPÚBLICA DOMINICANA</option>
                                    <option value="RUANDA">RUANDA</option>
                                    <option value="RUMANIA">RUMANIA</option>
                                    <option value="RUSIA">RUSIA</option>
                                    <option value="SAMOA">SAMOA</option>
                                    <option value="SAN CRISTÓBAL Y NIEVES">SAN CRISTÓBAL Y NIEVES</option>
                                    <option value="SAN MARINO">SAN MARINO</option>
                                    <option value="SAN VICENTE Y LAS GRANADINAS">SAN VICENTE Y LAS GRANADINAS</option>
                                    <option value="SANTA LUCÍA">SANTA LUCÍA</option>
                                    <option value="SANTO TOMÉ Y PRÍNCIPE">SANTO TOMÉ Y PRÍNCIPE</option>
                                    <option value="SENEGAL">SENEGAL</option>
                                    <option value="SERBIA">SERBIA</option>
                                    <option value="SEYCHELLES">SEYCHELLES</option>
                                    <option value="SIERRA LEONA">SIERRA LEONA</option>
                                    <option value="SIRIA">SIRIA</option>
                                    <option value="SOMALIA">SOMALIA</option>
                                    <option value="SRI LANKA">SRI LANKA</option>
                                    <option value="SUAZILANDIA">SUAZILANDIA</option>
                                    <option value="SUDÁFRICA">SUDÁFRICA</option>
                                    <option value="SUDÁN">SUDÁN</option>
                                    <option value="SUDÁN DEL SUR">SUDÁN DEL SUR</option>
                                    <option value="SUECIA">SUECIA</option>
                                    <option value="SUIZA">SUIZA</option>
                                    <option value="SURINAM">SURINAM</option>
                                    <option value="TAILANDIA">TAILANDIA</option>
                                    <option value="TANZANIA">TANZANIA</option>
                                    <option value="TAYIKISTÁN">TAYIKISTÁN</option>
                                    <option value="TIMOR ORIENTAL">TIMOR ORIENTAL</option>
                                    <option value="TOGO">TOGO</option>
                                    <option value="TONGA">TONGA</option>
                                    <option value="TRINIDAD Y TOBAGO">TRINIDAD Y TOBAGO</option>
                                    <option value="TÚNEZ">TÚNEZ</option>
                                    <option value="TURKMENISTÁN">TURKMENISTÁN</option>
                                    <option value="TURQUÍA">TURQUÍA</option>
                                    <option value="TUVALU">TUVALU</option>
                                    <option value="UCRANIA">UCRANIA</option>
                                    <option value="UGANDA">UGANDA</option>
                                    <option value="URUGUAY">URUGUAY</option>
                                    <option value="UZBEKISTÁN">UZBEKISTÁN</option>
                                    <option value="VANUATU">VANUATU</option>
                                    <option value="VENEZUELA">VENEZUELA</option>
                                    <option value="VIETNAM">VIETNAM</option>
                                    <option value="YEMEN">YEMEN</option>
                                    <option value="YIBUTI">YIBUTI</option>
                                    <option value="ZAMBIA">ZAMBIA</option>
                                    <option value="ZIMBABUE">ZIMBABUE</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="mb-3 row">
                            <label for="rep-password" className="col-sm-6 col-form-label">Repite contraseña</label>
                            <div className="col-sm-6">
                                <input type="password" className="form-control" id="rep-password" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="ig-user" className="col-sm-6 col-form-label">Usuario Instagram</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="ig-user" />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label for="ciudad" className="col-sm-6 col-form-label">Ciudad</label>
                            <div className="col-sm-6">
                                <input type="text" className="form-control" id="ciudad" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container row d-flex justify-content-center mx-auto my-5 py-3">
                    <div className="col-8">
                        <p className="text-center">Enlace a posts de promociones que hayas hecho como influencer (máximo 6)</p>
                        <div className="d-flex ">
                            <input className="form-control" type="text" placeholder="Pega aquí el enlace a tu post" aria-label="default input example" id="ig-link" /><i className="fas fa-plus m-auto ms-3" onClick={() => plusButton()}></i>

                        </div>
                        <div className="text-center mt-3" id="mostrar-ig-links">
                            {igLinks.map((value, index) => {
                                return (
                                    <li className="list-group-item" key={`${index}`}>
                                        <div className="d-flex">
                                            <div className="col-10">{value}</div>
                                            <div className="col-2 text-end">
                                                <i
                                                    className="fas fa-times"
                                                    id="cross"
                                                    onClick={() => {
                                                        let newItemsArray = igLinks.filter(
                                                            (v, i) => {
                                                                return i != index;
                                                            }
                                                        );
                                                        addLinks(newItemsArray);
                                                    }}></i>
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </div>
                </div>
                <div className="container-fluid row text-center mx-0 py-3">
                    <div className="mb-3 col-8 mx-auto">
                        <label for="bio" className="form-label">Cuéntanos un poco más de ti</label>
                        <textarea className="form-control" id="bio" rows="3"></textarea>
                    </div>
                </div>
                <p className="h1 text-center my-5">Tus precios</p>
                <div className="container-fluid row d-flex justify-content-center mx-auto">
                    <div className="col-3 d-flex ">
                        <label for="precio-post" className="col-sm-3 col-form-label text-end me-3">Post</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-post" />
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <label for="precio-reel" className="col-sm-3 col-form-label text-end me-3">Reel</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-reel" />
                        </div>
                    </div>
                    <div className="col-3 d-flex">
                        <label for="precio-story" className="col-sm-3 col-form-label text-end me-3">Story</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="precio-story" />
                        </div>
                    </div>
                </div>
                <div className="button-container my-5 d-flex justify-content-center pb-5">
                    <button type="button" className="btn btn-danger btn-sm col-1 me-3" onClick={() => { delData() }}>Borrar</button>
                    <button type="button" className="btn btn-success btn-sm col-1 ms-3" onClick={() => { addData() }}>Enviar</button>
                </div>
            </div>
        </div>
    )
}
