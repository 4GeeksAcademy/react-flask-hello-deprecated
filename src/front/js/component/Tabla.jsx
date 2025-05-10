import React from 'react'
import styles from "./Tabla.module.css"

const Row = ({ data }) => {
    // Definimos el orden exacto de las columnas
    const columnOrder = ['id', 'freelance_name', 'user_name', 'price', 'is_payed',"freelance_email","freelance_phone"];

    return (
        <tr>
            {columnOrder.map(column => {
                const valor = data[column];
                // Si es la columna id, usamos th, de lo contrario td
                if (column === "id") {
                    return (
                        <th
                            scope="row"
                            className={`${styles.tabla_td}`}
                            key={valor}
                        >
                            {`${valor}`}
                        </th>
                    );
                }
                return (
                    <td
                        className={`${styles.tabla_td}`}
                        key={valor}
                    >
                        {`${valor}`}
                    </td>
                );
            })}
        </tr>
    );
};

const Tabla = ({ lista }) => {
    return (
        <table className='table '>
            <thead style={{ backgroundColor: "#1E266D", color: "white" }} >
                <tr >
                    <td scope="col" className={`${styles.tabla_td} `} >
                        id
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        Nombre de freelance
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        Nombre de consumidor
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        precio
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        status
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        correo
                    </td>
                    <td scope="col" className={`${styles.tabla_td} `} >
                        telefono
                    </td>
                </tr>
            </thead>
            <tbody>
                {lista.map((item) => {
                    return <Row key={item.id} data={item} />;
                })}
            </tbody>
        </table>
    )
}

export default Tabla