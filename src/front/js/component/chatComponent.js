import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Navbar.module.css";
import Swal from "sweetalert2";
// import { FormLabel } from "react-bootstrap";


const ChatComponent = ({ userRole, userName, userAvatar }) => {
    const { store, actions } = useContext(Context);
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const [selectedContact, setSelectedContact] = useState(null); // Contacto seleccionado
    const [filterRole, setFilterRole] = useState(""); // Filtro por rol

    useEffect(() => {
        actions.getMessages();
        actions.getContacts();
    }, []);

    const filteredContacts = store.contactos.filter(contact =>
        filterRole ? contact.rol.toLowerCase() === filterRole.toLowerCase() : true
    );

    const handleSendMessage = async () => {
        if (!selectedContact) {
            Swal.fire({
                icon: 'warning',
                title: 'Atención',
                text: 'Por favor selecciona un contacto antes de enviar el mensaje.',
                confirmButtonText: 'Entendido',
            });
            return;
        }

        if (message.trim() !== "" && subject.trim() !== "") {
            const newMessage = {
                receiver_id: selectedContact.user_id, // ID del usuario al que va dirigido
                subject,
                content: message,
            };

            const response = await actions.sendMessage(newMessage);
            setMessage("");
            setSubject("");
            setSelectedContact(null);
            Swal.fire({
                title: "Mensaje enviado",
                text: response.msg,
                timer: 2000,
                icon: "success"
            });
        }
    };

    const handleContactSelection = (contact) => {
        setSelectedContact(contact);
    };

    return (
        <div
            className={`${styles.CardChat} card my-3 shadow-sm align-item-center ${store.isClosingChat ? styles.closing : ""}`}
            style={{ display: store.isChatVisible || store.isClosingChat ? "block" : "none" }}
        >
            <div className={`${styles.CardHeader} card-header bg-primary text-white d-flex justify-content-between align-items-center`}>
                <h5 className="mb-0" id="Mensajería">Mensajería</h5>
                <button
                    className={`${styles.closeChat}`}
                    onClick={actions.toggleChat}
                >
                    ✖
                </button>
            </div>
            <div className={`${styles.chatContainer}`} >
                <div className={`${styles.chatContacts}`} >
                    <div className="p-3">
                        <label htmlFor="filterRole" className="form-label">Filtrar por rol</label>
                        <select
                            id="filterRole"
                            className="form-select"
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value)}
                        >
                            <option value="">Todos</option>
                            <option value="admin">Administrador</option>
                            <option value="docente">Docente</option>
                            <option value="representante">Representante</option>
                        </select>
                    </div>

                    <div className={`${styles.contactos} p-3`} style={{ maxHeight: "450px", overflowY: "scroll" }}>
                        <h6>Seleccionar Contacto</h6>
                        {filteredContacts.length > 0 ? (
                            filteredContacts.map((contact, index) => (
                                <div
                                    key={index}
                                    className={`d-flex justify-content-between align-items-center mb-2 p-2 border rounded ${selectedContact?.user_id === contact.user_id ? 'bg-info text-white' : ''}`}
                                    onClick={() => handleContactSelection(contact)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <span>{contact.nombre} - {contact.rol}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted">No hay contactos disponibles.</p>
                        )}
                    </div>
                </div>

                <div className={`${styles.chatCont} d-flex flex-column w-100`}>
                    <div className={`${styles["card-footer"]} pt-3`}>
                        <label className="w-100" style={{ color: "white", textAlign: "left", paddingLeft: "20px", fontWeight: "bold" }}>Asunto:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={subject}
                            onChange={(e) => setSubject(e.target.value)}
                            style={{ borderRadius: "20px" }}
                        />
                        <label className="w-100" style={{ color: "white", textAlign: "left", paddingLeft: "20px", fontWeight: "bold" }}>Mensaje: </label>
                        <textarea
                            className="form-control"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            style={{ height: "100px", borderRadius: "25px", width: "90%" }}
                        />
                        <button
                            className={`${styles.buttonChatComponent} rounded-pill`}
                            onClick={handleSendMessage}
                            disabled={message.trim() === "" || subject.trim() === ""}
                        >
                            Enviar
                        </button>
                        <hr className="w-100 my-3 border-white" />
                    </div>
                    <div className={`${styles.chatMessages}`} style={{ overflowY: "scroll" }}>
                        <div className="card-body" style={{ height: "auto" }}>
                            {store.mensajes.length > 0 ? (
                                store.mensajes.map((msg, index) => (
                                    <div key={index} className="mb-3">
                                        <div className="d-flex align-items-start">
                                            <div>
                                                <strong>Remitente:</strong> {msg.remitente} - {msg.remitente_rol}
                                                <p className="mb-1"><strong>Asunto:</strong> {msg.subject}</p>
                                                <p className="mb-1"><strong>Contenido:</strong> {msg.content}</p>
                                                <p>
                                                    {!msg.read && (
                                                        <button
                                                            onClick={() => actions.markMessageAsRead(msg.id)}
                                                            className="btn btn-link"
                                                            style={{ color: "gold", textDecoration: "none" }}
                                                        >
                                                            Marcar como leído
                                                        </button>
                                                    )}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted text-center">No hay mensajes aún.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ChatComponent;
