import io, { Socket } from "socket.io-client";
import Map from "./components/Map";
import { useState, useEffect } from "react";

const socket = io("hhttps://realtime-tracker-nd8e.onrender.com");

function App() {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [otherUsers, setOtherUsers] = useState([]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;

          socket.emit("send-location", { id: socket.id, latitude, longitude });
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (err) => {
          console.error(err);
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );
    }

    socket.on("receive-location", (data) => {
      setOtherUsers((prevUser) => {
        const userIndex = prevUser.findIndex((user) => user.id === data.id);
        if (userIndex > -1) {
          const updatedUser = [...prevUser];
          updatedUser[userIndex] = data;
          return updatedUser;
        } else {
          return [...prevUser, data];
        }
      });
    });

    return () => {
      socket.off("receive-location");
    };
  }, []);

  return (
    <>
      <div>
        <Map
          latitude={latitude || 51.505}
          longitude={longitude || -0.09}
          otherUsers={otherUsers}
        />
      </div>
    </>
  );
}

export default App;
