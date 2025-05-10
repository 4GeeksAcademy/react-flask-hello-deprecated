import React, { useState } from "react";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, useMapEvents, Marker, Popup } from 'react-leaflet'
import { Icon, divIcon, map } from "leaflet"
import MarkerClusterGroup from 'react-leaflet-cluster';
import L from "leaflet"

const UbicationMap = ({ coordenates }) => {

  const CustomIcon = L.divIcon({
    html: '<i class="fa-solid fa-paw"></i>',
    className: "custom-icon",
    iconSize: [24, 24],
    iconAnchor: [12, 24]
  })

  const [position, setPosition] = useState(null)
  function ClickHandler() {
    useMapEvents({
      click: (e) => {
        const { lat, lng } = e.latlng;
        const newPosition = {lat, lng} 
        setPosition(newPosition);
        console.log(`Latitud: ${lat}, Longitud: ${lng}`);
        if (coordenates) {
          coordenates(newPosition); //para pasar las urls a los componentes newPet
        }
      }
    });

    return position === null ? null : (
      <Marker position={position}>
      </Marker>
    )
  }

  console.log("position:", position)
  return (
    <div className="row">
      <MapContainer center={[-34.91709426939976, -56.16318765994477]} zoom={13}>
        <TileLayer url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png'>
        </TileLayer>
        <ClickHandler />
      </MapContainer>
    </div>
  )
}
export default UbicationMap