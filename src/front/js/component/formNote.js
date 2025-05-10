import React, { useState, useEffect } from "react";



export const FormNote = () => {
  const [note, setContact] = useState({})
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  
  //console.log((note));
  

  async function createNote() {
    // if (name === "" || email === "" || phone === "" || address === "") {
    //   throw new Error("Contacto no creado. Complete todos los campos de manera correcta");
    // } else {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "title": title,
        "description": description
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      try {
        let response = await fetch(process.env.BACKEND_URL+"/api/note", requestOptions);
        if (response === !201) {
          alert("Ups! This note was not create")
        }
        let result = await response.json();
        setContact=(result)
        setTitle("")
        setDescription("")
      } catch (error) {
        console.error(error);
      };
    // }
  }

 
  useEffect(() => {
    createNote()
  }, [])

  return (
    <div className="container">
      <form>
        <div className="mb-3">
          <label htmlFor="title" className="form-label d-flex">Title</label>
          <input className="form-control" id="title" type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label d-flex">Description</label>
          <textarea className="form-control" rows="3" id="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
        </div>
      </form>
    </div>
  )
};