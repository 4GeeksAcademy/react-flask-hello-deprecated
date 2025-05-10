import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import "../../styles/MainDashboard.css";
import Avatar from "./leftMenuParent/Avatar.jsx";
import { Spinner } from "react-bootstrap";
import { useContext } from "react";
import { Context } from "../store/appContext.js";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 95%;
  background-image: linear-gradient(
    to right,
    rgba(31, 118, 146, 0.8),
    rgba(67, 56, 135, 0.8)
  );
  color: white;
  font-weight: bold;
  border-radius: 30px;
`;

const StyledInput = styled.input`
  border-radius: 50px;
`;

const StyledImg = styled.img`
  border: 2px solid #ffffff;
  border-radius: 2rem;
  opacity: 1;
`;

const StyledFileInput = styled.input`
  background-color: transparent;
  border: 2px solid #ffffff;
  color: #ffffff;
  transition: background-color 0.2s, color 0.2s;

  &:hover {
    background-color: #e1e1e1;
    color: rgb(0, 0, 0);
  }
`;

const passwordChangeValidation = async () => {
  const { value: password } = await Swal.fire({
    title: "Ingresa tu nueva contraseña",
    showCancelButton: true,
    confirmButtonText: "Siguiente",
    cancelButtonText: "Cancelar",
    icon: "question",
    input: "password",
    inputLabel: "Contraseña",
    inputPlaceholder: "Ingresa tu nueva Contraseña",
    inputAttributes: {
      maxlength: "10",
      autocapitalize: "off",
      autocorrect: "off",
    },
  });
  if (!password) {
    return;
  }
  const { value: passwordConfirm } = await Swal.fire({
    title: "Confirma tu contraseña",
    showCancelButton: true,
    confirmButtonText: "Cambiar Contraseña",
    cancelButtonText: "Cancelar",
    icon: "question",
    input: "password",
    inputLabel: "Confirmar contraseña",
    inputPlaceholder: "Confirma tu contraseña",
    inputAttributes: {
      maxlength: "10",
      autocapitalize: "off",
      autocorrect: "off",
    },
  });
  if (password != passwordConfirm) {
    Swal.fire({
      title: "Contraseña de confirmacion Incorrecta",
      icon: "error",
    });
    return null;
  }
  return password;
};

const ProfileForm = ({ user }) => {
  const { store, actions } = useContext(Context);
  const [userData, setUserData] = useState({});
  const [picturePreview, setPicturePreview] = useState(null);
  const [pictureFile, setPictureFile] = useState([null]);
  const [isUploading, setIsUploading] = useState(false);
  const [isTeacher, setIsTeacher] = useState(false);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsUploading(true);
    if (!userData) {
      return;
    }
    try {
      delete userData.foto;
      const response = await actions.updateProfile(userData);
      if (response) {
        Swal.fire({
          title: "Perfil Actualizado",
          text: response.msg || "Actualizado Correctamente",
          icon: "success",
          customClass: {
            confirmButton: "btn-outline-register"
          },
          buttonsStyling: false
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al actualizar la informacion personal",
        text: error.message || "Error al procesar la solicitud",
        icon: "error",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    const password = await passwordChangeValidation();
    if (password) {
      try {
        const response = await actions.changePassword(password);
        Swal.fire({
          title: "Contraseña Actualizada con exito",
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error al Actualizar la contraseña",
          icon: "error",
          text: error.message || "Hubo un error al cambiar la contraseña",
        });
      }
    }
  };

  const uploadPicture = async () => {
    if (!pictureFile) {
      Swal.fire({
        title: "No se ha seleccionado ningun archivo",
        text: "No has seleccionado ninguna imagen para subir",
        icon: "error",
      });
    }
    setIsUploading(true);
    try {
      const response = await actions.postPicture(pictureFile);
      if (response) {
        Swal.fire({
          title: "Actualizar Imagen",
          text: response.msg || response.message,
          timer: 2000,
          icon: response.msg ? "success" : "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "Error al subir la imagen",
        text: error.message,
        icon: "error",
      });
    } finally {
      setIsUploading(false);
      setPicturePreview(null);
      setPictureFile(null)
    }
  };

  const handleChange = e => {
    let StyledInput = e.currentTarget;
    setUserData({ ...userData, [StyledInput.name]: StyledInput.value });
  };

  useEffect(() => {
    if (user) {
      let newData = { ...user };
      delete newData.estudiantes;
      delete newData.calendario;
      delete newData.statusResume;
      if (store.role == "docente") {
        setIsTeacher(true);
        delete newData.msg;
        delete newData.materias;
        delete newData.grados;
        delete newData.id;
      }
      setUserData(newData);
    }
  }, [user]);

  const handleUploadPhoto = e => {
    const file = e.target.files[0];
    if (file) {
      setPictureFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPicturePreview(reader.result);
      };
      reader.readAsDataURL(file);
      return;
    }
    setPicturePreview(null);
    setPictureFile(null)

  };

  return user ? (
    <Container className="container-fluid fadeIn">
      <div className="row">
        <div className="col-12 d-flex flex-column align-items-center">

          <div className="text-center">
            {!picturePreview ? <Avatar
              src={user.foto || "https://placehold.co/400"}
              alt={""}
              height={"200px"}
              className="mb-0 mt-3"
            /> : <Avatar
              src={picturePreview}
              alt={""}
              height={"200px"}
              className="mb-0 mt-3"
            />}
          </div>
          <div className="d-flex flex-column align-items-center">
            <StyledFileInput
              type="file"
              accept="image/*"
              className="form-control select-image rounded-pill"
              onChange={handleUploadPhoto}
              required

            />
            {picturePreview && (
              <div className="text-center m-3">
                <button
                  type="button"
                  className="btn btn-outline-register"
                  onClick={() => uploadPicture()}
                  disabled={isUploading}>
                  {isUploading ? (
                    <>
                      Subiendo <Spinner animation="border" size="sm" />
                    </>
                  ) : (
                    <>
                      Enviar <i className="bi bi-save"></i>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

      <div className="ms-3 me-2row mb-2">
        <hr className="dropdown-divider mt-2 mb-2" />
        <div className="d-flex gap-2 jusitfy-content-center align-items-center">
          <i className="bi bi-person-circle fs-3"></i>
          <h3 className="m-0">Información Personal </h3>
        </div>
      </div>

      <form onSubmit={e => handleSubmit(e)}>
        <div className="ms-2 me-2 row mb-4">
          <div className="col-md-4 col-sm-auto ">
            <label htmlFor="input-nombre" className="form-label">
              Nombre
            </label>
            <StyledInput
              type="text"
              id="input-nombre"
              name="nombre"
              className="form-control"
              value={userData.nombre || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto ">
            <label htmlFor="input-apellido" className="form-label">
              Apellido
            </label>
            <StyledInput
              type="text"
              id="input-apellido"
              name="apellido"
              className="form-control"
              value={userData.apellido || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto ">
            <label htmlFor="input-email" className="form-label">
              Correo Electronico
            </label>
            <StyledInput
              id="input-email"
              type="email"
              name="email"
              className="form-control"
              value={userData.email || ""}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="ms-2 me-2 row mb-6 ">
          <div className="col-md-4 col-sm-auto">
            <label htmlFor="input-telefono" className="form-label">
              Teléfono
            </label>
            <StyledInput
              id="input-telefono"
              type="tel"
              name="telefono"
              className="form-control"
              value={userData.telefono || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-8 col-sm-auto">
            <label htmlFor="input-direccion" className="form-label">
              Dirección
            </label>
            <StyledInput
              type="textarea"
              id="input-direccion"
              name="direccion"
              className="form-control"
              value={userData.direccion || ""}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="ms-2 me-2 row mt-3 mb-3">

          {isTeacher && (
            <div className="col-md-12 col-sm-auto">
              <label htmlFor="input-descripcion" className="form-label">
                Descripción
              </label>
              <textarea
                id="input-descripcion"
                type="textarea"
                name="descripcion"
                className="form-control"
                style={{ borderRadius: "1.5rem", height: " 6rem ", resize: "none" }}
                value={userData.descripcion || ""}
                onChange={e => handleChange(e)}
              />
            </div>
          )}
        </div>
        <div className="ms-2 me-2 row mt-2">
          <hr className="dropdown-divider mb-2" />
          <div className="d-flex gap-2 jusitfy-content-center align-items-center">
            <i className="bi bi-file-lock-fill fs-3"></i>
            <h3 className="m-0">Seguridad </h3>
          </div>
        </div>
        <div className="row d-flex justify-content-evenly mt-2">
          <div className="col-auto">
            <label htmlFor="telefono" className="form-label">
              Contraseña
            </label>
            <StyledInput
              type="password"
              placeholder="***********"
              name="password"
              className="form-control"
              disabled
            />
          </div>
          <div className="col-auto mt-auto">
            <button
              type="button"
              className="btn btn-outline-register"
              onClick={() => handlePasswordUpdate()}>
              <i className="bi bi-key-fill"></i> Cambiar Contraseña
            </button>
          </div>
          <hr className="dropdown-divider mt-4" />
        </div>
        <div className="ms-2 me-2 row mt-5 mb-5">
          <div className="col-md-3 col-sm-auto"></div>
          <div className="col-md-6 col-sm-auto text-center">
            <button
              type="submit"
              className="btn btn-outline-register w-75"
              disabled={isUploading}>
              Guardar
            </button>
          </div>
          <div className="col-md-3 col-sm-auto"></div>
        </div>
      </form>
    </Container>
  ) : (
    <div className="container-fluid d-flex justify-content-center h-100 align-items-center">
      <Spinner animation="border" />
    </div>
  );
};

export default ProfileForm;
