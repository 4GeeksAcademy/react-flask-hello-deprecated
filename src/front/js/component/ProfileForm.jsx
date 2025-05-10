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
    setPictureFile(null);
    setPicturePreview(null);
  };

  return user ? (
    <Container className="container-fluid fadeIn">
      <div className="row ">
        <div className="col-md-4 col-sm-auto text-center">
          <Avatar
            src={userData.foto || "https://placehold.co/400"}
            alt={""}
            height={"200px"}
            className="mb-0 mt-3"
          />
        </div>
        <div className="col-md-4 col-sm-auto d-flex flex-column align-items-center justify-content-around">
          <label className="form-label">Subir foto:</label>
          <StyledFileInput
            type="file"
            accept="image/*"
            className="form-control select-image rounded-pill"
            onChange={handleUploadPhoto}
            required
          />
          {picturePreview && (
            <div className="text-center">
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

        {picturePreview && (
          <div className="col-md-4 col-sm-auto d-flex justify-content-center">
            <StyledImg
              src={picturePreview}
              alt="Preview"
              className="mt-2"
              style={{ width: "50vw", height: "auto", maxWidth: "150px" }}
            />
          </div>
        )}
      </div>

      <div className="row">
        <div className="d-flex gap-2 jusitfy-content-center align-items-center">
          <i className="bi bi-person-circle fs-3"></i>
          <h3 className="m-0">Informacion Personal </h3>
        </div>
        <hr className="dropdown-divider mt-2" />
      </div>

      <form onSubmit={e => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <StyledInput
              type="text"
              name="nombre"
              className="form-control"
              value={userData.nombre || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="apellido" className="form-label">
              Apellido
            </label>
            <StyledInput
              type="text"
              name="apellido"
              className="form-control"
              value={userData.apellido || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="email" className="form-label">
              Correo Electronico
            </label>
            <StyledInput
              type="email"
              name="email"
              className="form-control"
              value={userData.email || ""}
              onChange={e => handleChange(e)}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4 col-sm-auto m-2">
            <label htmlFor="telefono" className="form-label">
              Telefono
            </label>
            <StyledInput
              type="tel"
              name="telefono"
              className="form-control"
              value={userData.telefono || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          <div className="col-md-6 col-sm-auto m-2">
            <label htmlFor="direccion" className="form-label">
              Direccion
            </label>
            <StyledInput
              type="textarea"
              name="direccion"
              className="form-control"
              value={userData.direccion || ""}
              onChange={e => handleChange(e)}
            />
          </div>
          {isTeacher && (
            <div className="col-md-6 col-sm-auto m-2">
              <label htmlFor="descripcion" className="form-label">
                Descripcion
              </label>
              <StyledInput
                type="textarea"
                name="descripcion"
                className="form-control"
                value={userData.descripcion || ""}
                onChange={e => handleChange(e)}
              />
            </div>
          )}
        </div>
        <div className="row mt-2">
          <div className="d-flex gap-2 jusitfy-content-center align-items-center">
            <i className="bi bi-file-lock-fill fs-3"></i>
            <h3 className="m-0">Seguridad </h3>
          </div>
          <hr className="dropdown-divider mt-2" />
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
        <div className="row mt-5 mb-5">
          <div className="col-md-3 col-sm-auto"></div>
          <div className="col-md-6 col-sm-auto text-center">
            <button
              type="submit"
              className="btn btn-success w-75"
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
