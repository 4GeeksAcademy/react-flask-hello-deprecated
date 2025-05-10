import React, { useContext, useEffect, useState } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";

export const Contacts = () => {
    const { store, actions } = useContext(Context);
    const [newContact, setNewContact] = useState({ name: "", phone: "", email: "", address: "" });
    const [editingContact, setEditingContact] = useState(null);

    useEffect(() => {
        actions.loadContacts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (editingContact) {
            setEditingContact({ ...editingContact, [name]: value });
        } else {
            setNewContact({ ...newContact, [name]: value });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editingContact) {
            actions.updateContact(editingContact);
            setEditingContact(null);
        } else {
            actions.addContact(newContact);
            setNewContact({ name: "", phone: "", email: "", address: "" });
        }
    };

    return (
        <div className="container mt-5">
            <h1>Contact List</h1>
            <button className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#contactModal">
                Add New Contact
            </button>
            <ul className="list-group">
                {store.contacts.map((contact) => (
                    <li key={contact.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div>
                            <strong>{contact.name}</strong><br />
                            {contact.phone}<br />
                            {contact.email}<br />
                            {contact.address}
                        </div>
                        <div>
                            <button className="btn btn-warning btn-sm me-2" onClick={() => setEditingContact(contact)} data-bs-toggle="modal" data-bs-target="#contactModal">
                                Edit
                            </button>
                            <button className="btn btn-danger btn-sm" onClick={() => actions.deleteContact(contact.id)}>
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>

            <div className="modal fade" id="contactModal" tabIndex="-1" aria-labelledby="contactModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="contactModalLabel">{editingContact ? "Edit Contact" : "Add New Contact"}</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={editingContact ? editingContact.name : newContact.name} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Phone</label>
                                    <input type="text" className="form-control" name="phone" value={editingContact ? editingContact.phone : newContact.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-control" name="email" value={editingContact ? editingContact.email : newContact.email} onChange={handleInputChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={editingContact ? editingContact.address : newContact.address} onChange={handleInputChange} required />
                                </div>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                                    {editingContact ? "Update Contact" : "Add Contact"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};