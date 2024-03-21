import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVldmlrIiwiYSI6ImNsdTE3ZnA2czBiOXoya21uMDJkbDg3Z2gifQ.7tv5DJpsbHVZUSfMQgvoPg";

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);
  // const [lng, setLng] = useState(-51);
  // const [lat, setLat] = useState(-9);
  // const [zoom, setZoom] = useState(4);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      // style: "mapbox://styles/mapbox/streets-v12",
      style: "mapbox://styles/teevik/clu17y7ol00nu01qsdb4k6oyk",
      center: [-51, -9],
      zoom: 4,
    });

    map.current.on("load", () => {
      // https://cdn.discordapp.com/attachments/1216498279072792668/1220356400950284410/barea2003_bra.tif?ex=660ea477&is=65fc2f77&hm=ef267d23e32f1bf2e1ff5ae070e6c2a57ed805c42d01317027a5de75866b3624&

      map.current.addSource("burn-2002", {
        type: "raster",
        // Use the URL to your hosted GeoTIFF or the Tileset ID from Mapbox Studio
        url: "mapbox://teevik.1fv4f9vu",
        // tileSize: 256,
      });

      map.current.addLayer({
        id: "burn-2002-layer",
        type: "raster",
        source: "burn-2002",
        paint: {
          "raster-opacity": 0.85, // Adjust the opacity as needed
          "raster-color": "#ff6600",
          "raster-opacity-transition": { duration: 500 },
          // "raster-fade-duration": 500, // 500 milliseconds = 1/2 seconds
        },
      });
    });
  });

  const [isVisible, setIsVisible] = useState(true);

  function toggle() {
    if (isVisible) {
      map.current.setPaintProperty("burn-2002-layer", "raster-opacity", 0);
    } else {
      map.current.setPaintProperty("burn-2002-layer", "raster-opacity", 0.85);
    }

    setIsVisible(!isVisible);
  }

  return (
    <>
      <button onClick={toggle}>Toggle</button>
      <div ref={mapContainer} style={{ height: 800 }} />
    </>
  );
}
