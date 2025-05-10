import React, {useContext,useState} from 'react';
import { Context } from "../store/appContext";

export const PlayerCard = ({use}) => {
    console.log("PlayerCard use:", use);
    const { store, actions } = useContext(Context);
    
    const [playerData, setPlayerData] = useState({
        name:store.player_info?.name || '',
        gender:store.player_info?.gender ||'',
        age:store.player_info?.age ||'',
        rating:store.player_info?.rating ||'',
        side:store.player_info?.side ||'',
        hand:store.player_info?.hand ||'',
        phone:store.player_info?.phone ||'',
    });

    const handleChange = (e) => {
        setPlayerData({
            ...playerData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       
        if (!playerData.name || !playerData.gender || !playerData.age || !playerData.rating || !playerData.side || !playerData.hand) {
            console.log("Por favor, completa los campos obligatorios.");
            return;
        }

        console.log("Submit data:", playerData, "use:", use);
        
        use === 'player'
        ? actions.playerPage(playerData)
        : actions.updatePlayer(playerData) 
        
         
    };

    return (
        <>
        {use === 'playerPage' ? (
            <div className="card" style={{ width: "18rem" }}>
                <img src="..." className="card-img-top" alt="..." />
                <div className="card-body">
                    <h5 className="card-title">{playerData.name || ''}</h5>
                    <p className="card-text"><b>Género:</b> {playerData.gender || ''}</p>
                    <p className="card-text"><b>Edad:</b> {playerData.age}</p>
                    <p className="card-text"><b>Categoría:</b> {playerData.rating}</p>
                    <p className="card-text"><b>Lado:</b> {playerData.side}</p>
                    <p className="card-text"><b>Mano:</b> {playerData.hand}</p>
                    <p className="card-text"><b>Phone:</b> {playerData.phone}</p>
                </div>
            </div>
        ) : (
            
            <form onSubmit={handleSubmit}>
                <div className="m-3">
                    <label htmlFor="name"><b>Nombre</b></label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nombre"
                        value={playerData.name}
                        onChange={handleChange}
                        required
                        />
                </div>
                <div className="m-3">
                        <label htmlFor="gender"><b>Género</b></label>
                        <select
                            id="gender"
                            name="gender"
                            value={playerData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un género</option>
                            <option value="Femenino">Femenino</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Otro">Otro</option>
                        </select>
                </div>
                <div className="m-3">
                    <label htmlFor="age"><b>Edad</b></label>
                    <input
                        type="number"
                        id="age"
                        name="age"
                        placeholder="Edad"
                        value={playerData.age}
                        onChange={handleChange}
                        required
                        min="0"
                        max= "99"
                        />
                </div>
                <div className="m-3">
                        <label htmlFor="rating"><b>Categoría</b></label>
                        <select
                            id="rating"
                            name="rating"
                            value={playerData.rating}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona tu categoría</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                    </div>
                <div className="m-3">
                        <label htmlFor="side"><b>Lado</b></label>
                        <select
                            id="side"
                            name="side"
                            value={playerData.side}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona un lado</option>
                            <option value="Izquierdo">Drive</option>
                            <option value="Derecho">Revés</option>
                            <option value="Derecho">Cualquiera</option>
                        </select>
                    </div>
                    <div className="m-3">
                        <label htmlFor="hand"><b>Mano</b></label>
                        <select
                            id="hand"
                            name="hand"
                            value={playerData.hand}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Selecciona una mano</option>
                            <option value="Diestro">Diestro</option>
                            <option value="Zurdo">Zurdo</option>
                        </select>
                    </div>
                <div>
                    <input type="submit" value={'Actualizar datos'} />
                </div>
            </form>
        )}
        </>
        
    );
};
