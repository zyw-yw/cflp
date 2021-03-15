import React, { useState, useCallback } from "react";
import ReactMapGL, { Marker } from "react-map-gl";
import Pin from "./assets/pin";
// import "mapbox-gl/dist/mapbox-gl.css";

interface ViewportType {
  width: number;
  height: number;
  latitude: number;
  longitude: number;
  zoom: number;
}

const MAPBOX_TOKEN =
  "pk.eyJ1Ijoid3V3ZW5xaS1kZXBwIiwiYSI6ImNrbWE2cDJodzB6Z24yc28yeWxiZHd2aGwifQ.sW0Dt7X0RXnp5IZ7LTC_Aw";

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const [marker, setMarker] = useState({
    latitude: 40,
    longitude: -100,
  });
  const [events, logEvents] = useState({});

  const onMarkerDragStart = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragStart: event.lngLat }));
  }, []);

  const onMarkerDrag = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDrag: event.lngLat }));
  }, []);

  const onMarkerDragEnd = useCallback((event) => {
    logEvents((_events) => ({ ..._events, onDragEnd: event.lngLat }));
    setMarker({
      longitude: event.lngLat[0],
      latitude: event.lngLat[1],
    });
  }, []);
  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      width="100vw"
      height="100vh"
      onViewportChange={(nextViewport: ViewportType) =>
        setViewport(nextViewport)
      }
      mapboxApiAccessToken={MAPBOX_TOKEN}
    >
      <Marker
        longitude={marker.longitude}
        latitude={marker.latitude}
        offsetTop={-20}
        offsetLeft={-10}
        draggable
        onDragStart={onMarkerDragStart}
        onDrag={onMarkerDrag}
        onDragEnd={onMarkerDragEnd}
      >
        <Pin size={20} />
      </Marker>
    </ReactMapGL>
  );
}

document.body.style.margin = "0px";

export default App;
