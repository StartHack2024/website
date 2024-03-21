import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import Slider from "./components/slider";

mapboxgl.accessToken =
  "pk.eyJ1IjoidGVldmlrIiwiYSI6ImNsdTE3ZnA2czBiOXoya21uMDJkbDg3Z2gifQ.7tv5DJpsbHVZUSfMQgvoPg";

const burnMaps = {
  2003: "mapbox://teevik.3zurb5kg",
  2004: "mapbox://teevik.7gfztcfr",
  2005: "mapbox://teevik.3foiefy4",
  2006: "mapbox://teevik.atm4mak8",
  2007: "mapbox://teevik.4be5og4r",
  2008: "mapbox://teevik.7pvy3f80",
  2009: "mapbox://teevik.3kmqfwd2",
  2010: "mapbox://teevik.4vpoaycj",
  2011: "mapbox://teevik.8h7qqdqa",
  2012: "mapbox://teevik.073jfw9e",
  2013: "mapbox://teevik.4yjpymud",
  2014: "mapbox://teevik.5r7avypp",
  2015: "mapbox://teevik.aajsivfk",
  2016: "mapbox://teevik.d872cdfm",
  2017: "mapbox://teevik.5lkk1nbf",
  2018: "mapbox://teevik.3lqnqzig",
  2019: "mapbox://teevik.andhdddk",
  2020: "mapbox://teevik.2z8nbtqv",
  2021: "mapbox://teevik.5oyivw6y",
  2022: "mapbox://teevik.6j9q789e",
};

const initialYear = 2022;
const burnOpacity = 0.85;

function burnLayer(year: number | string) {
  return `burn-${year}-layer`;
}

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/teevik/clu17y7ol00nu01qsdb4k6oyk",
      // style: "mapbox://styles/mapbox/satellite-v9",
      center: [-51, -9],
      zoom: 4,
    });

    map.current.on("load", () => {
      // Add all layers
      for (const [year, url] of Object.entries(burnMaps)) {
        map.current.addSource(`burn-${year}`, {
          type: "raster",
          // tileSize: 256,
          url,
        });

        map.current.addLayer({
          id: burnLayer(year),
          type: "raster",
          source: `burn-${year}`,
          paint: {
            "raster-opacity": 0, // Adjust the opacity as needed
            "raster-color": "#ff4400",
            "raster-opacity-transition": { duration: 200 },
          },
        });
      }

      map.current.setPaintProperty(
        burnLayer(initialYear),
        "raster-opacity",
        burnOpacity
      );
    });
  });

  const [currentYear, setCurrentyear] = useState(2022);

  function onChangeYear(year: number) {
    map.current.setPaintProperty(
      `burn-${currentYear}-layer`,
      "raster-opacity",
      0
    );
    map.current.setPaintProperty(
      burnLayer(year),
      "raster-opacity",
      burnOpacity
    );

    setCurrentyear(year);
  }

  return (
    <>
      <div ref={mapContainer} style={{ height: 800 }} />
      <Slider onChange={onChangeYear} />
    </>
  );
}
