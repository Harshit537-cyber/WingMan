import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";

const MapView = () => {
  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
        <GoogleMap
          mapContainerStyle={{
            height: "100%",
            width: "100%",
          }}
          center={{ lat: 28.6139, lng: 77.209 }}
          zoom={14}
        >
          <Marker position={{ lat: 28.6139, lng: 77.209 }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default MapView;
