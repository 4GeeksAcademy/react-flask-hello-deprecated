import React from "react";
import oscar from '../../img/oscar.png';
import alejandro from '../../img/alejandro.png';
import saray from '../../img/saray.png';

export const SobreNosotros = () => {
  const team = [
    {
      id: 1,
      name: "Alejandro Arraga",
      role: "Desarrollador Full-Stack Developer",
      image: alejandro,
      skills: ["SQL Server", "PostgreSQL", "MySQL", "Python", "JavaScript", "HTML", "CSS", "Bootstrap", "Flask", "React", "APIs", "Git", "Node.js", "Jest", "Next.js"]
    },
    {
      id: 2,
      name: "Saray Rodríguez",
      role: "Desarrolladora Full Stack - Diseñadora UX/UI",
      image: saray,
      skills: ["SQL Server", "PostgreSQL", "Python", "MySQL", "JavaScript", "CSS", "React", "Flask", "Figma", "Adobe XD", "Photoshop / Illustrator"]
    },
    {
      id: 3,
      name: "Oscar Villalobos",
      role: "Consultor ERP y Desarrollos BI",
      image: oscar,
      skills: ["Consultor Certificado SAP B1 ", "Manejo SQL y HANA DB", "Crystal Report", "Power BI", "Data Migration"]
    },
  ];

  return (
    <section
      style={{
        padding: "40px",
        backgroundColor: "#f4f4f4",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{
        textAlign: "center",
        fontSize: "2rem",
        marginBottom: "30px",
        color: "#36b0a1"
      }}>
        Sobre Nosotros
      </h2>

      <div
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          marginBottom: "40px",
          lineHeight: "1.6",
          fontSize: "16px",
        }}
      >
        <p>
          Somos tres profesionales del área tecnológica que nos conocimos en una academia de tecnología. Unidos por el deseo de crear soluciones
          innovadoras, rentables y funcionales para empresas.
        </p>
        <p>
          Estamos increíblemente entusiasmados con el futuro de nuestro proyecto y su potencial para ayudar y mejorar la forma en que las empresas trabajan
          y se comunican con sus clientes.
        </p>
      </div>

      <h3
        style={{
          textAlign: "center",
          fontSize: "1.8rem",
          marginBottom: "20px",
          color: "#36b0a1"
        }}
      >
        Nuestro Equipo
      </h3>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "20px",
        }}
      >
        {team.map((member) => (
          <div
            key={member.id}
            style={{
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              width: "250px",
              padding: "20px",
              textAlign: "center",
              transition: "transform 0.2s",
            }}
          >
            <img
              src={member.image}
              alt={member.name}
              style={{
                width: "100px",
                height: "100px",
                objectFit: "cover",
                borderRadius: "50%",
                marginBottom: "15px",
              }}
            />
            <h4 style={{ fontSize: "18px", marginBottom: "8px" }}>
              {member.name}
            </h4>
            <p style={{ color: "#666", fontSize: "14px" }}>{member.role}</p>

            {/* Solo si tiene skills */}
            {member.skills && (
              <ul style={{ textAlign: "left", paddingLeft: "20px", marginTop: "10px", fontSize: "14px" }}>
                {member.skills.map((skill, index) => (
                  <li key={index}>{skill}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
