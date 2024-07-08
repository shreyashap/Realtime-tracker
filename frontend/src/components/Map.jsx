import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import { marker } from "leaflet";

const UpdateMapCentre = ({ latitude, longitude }) => {
  const map = useMap();

  useEffect(() => {
    if (latitude && longitude) map.setView([latitude, longitude]);
  }, [latitude, longitude, map]);
  return null;
};

const Map = ({ latitude, longitude, otherUsers }) => {
  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "100vh", width: "100vw" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
      {otherUsers.map((user) => (
        <Marker key={user.id} position={[user.latitude, user.longitude]}>
          <Popup>User ID : {user.id}</Popup>
        </Marker>
      ))}
      <UpdateMapCentre latitude={latitude} longitude={longitude} />
    </MapContainer>
  );
};

export default Map;
