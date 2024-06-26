import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";
import Slider from "./components/slider";
import { Checkbox } from "./components/Checkbox";
import SwitchComponent from "./components/SwtichComponent";

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

const landmassMaps = {
  2003: "mapbox://teevik.4n8ubv7o",
  2004: "mapbox://teevik.4vi3d5dg",
  2005: "mapbox://teevik.1yoxx5oq",
  2006: "mapbox://teevik.awdrr4ou",
  2007: "mapbox://teevik.74o4ye2b",
  2008: "mapbox://",
  2009: "mapbox://",
  2010: "mapbox://",
  2011: "mapbox://",
  2012: "mapbox://",
  2013: "mapbox://",
  2014: "mapbox://",
  2015: "mapbox://",
  2016: "mapbox://",
  2017: "mapbox://",
  2018: "mapbox://",
  2019: "mapbox://",
  2020: "mapbox://",
  2021: "mapbox://",
  2022: "mapbox://",
};

const burnOpacity = 0.85;

function burnLayer(year: number | string) {
  return `burn-${year}-layer`;
}

export default function App() {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>(null);

  const [hasLoaded, setHasLoaded] = useState(false);
  const [styleLoadChanged, setStyleLoadChanged] = useState(false);

  const [showBurnedAreas, setShowBurnedAreas] = useState(true);
  const [showPopulation, setShowPopulation] = useState(true);
  const [showProtectedAreas, setShowProtectedAreas] = useState(false);

  useEffect(() => {
    if (map.current) return; // initialize map only once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/teevik/clu17y7ol00nu01qsdb4k6oyk",
      center: [-51, -9],
      zoom: 4,
    });

    map.current.on("load", () => {
      setHasLoaded(true);
    });

    map.current.on("style.load", () => {
      setStyleLoadChanged((prev) => !prev);
    });

    map.current.on("click", (e) => {
      let coordinates = e.lngLat;
      window.open(
        `https://www.google.com/maps/@?api=1&map_action=pano&viewpoint=${coordinates.lat},${coordinates.lng}`
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

  const [enableSatellite, setEnableSatellite] = useState(false);

  useEffect(() => {
    if (!hasLoaded) return;

    map.current.setStyle(
      enableSatellite
        ? "mapbox://styles/mapbox/satellite-v9"
        : "mapbox://styles/teevik/clu17y7ol00nu01qsdb4k6oyk"
    );
  }, [enableSatellite]);

  useEffect(() => {
    if (!hasLoaded) return;

    for (const year of Object.keys(burnMaps)) {
      map.current.setLayoutProperty(
        burnLayer(year),
        "visibility",
        showBurnedAreas ? "visible" : "none"
      );
    }
  }, [hasLoaded, showBurnedAreas]);

  useEffect(() => {
    if (!hasLoaded) return;

    map.current.setLayoutProperty(
      "population-layer",
      "visibility",
      showPopulation ? "visible" : "none"
    );
  }, [hasLoaded, showPopulation]);

  useEffect(() => {
    if (!hasLoaded) return;

    map.current.setLayoutProperty(
      "protected-areas-layer",
      "visibility",
      showProtectedAreas ? "visible" : "none"
    );
  }, [hasLoaded, showProtectedAreas]);

  useEffect(() => {
    if (!hasLoaded) return;

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
          "raster-color": "#ef4444",
          "raster-opacity-transition": { duration: 200 },
        },
      });
    }

    map.current.addSource(`population`, {
      type: "raster",
      // tileSize: 256,
      url: "mapbox://teevik.4jiblzax",
    });

    map.current.addLayer({
      id: "population-layer",
      type: "raster",

      source: `population`,
      paint: {
        "raster-opacity": 1, // Adjust the opacity as needed
        "raster-color": "#3b82f6",
        "raster-color-range": [0, 10],
        "raster-opacity-transition": { duration: 200 },
        // "raster-emissive-strength": 100,
      },
    });

    map.current.addSource(`protected-areas`, {
      type: "vector",
      url: "mapbox://teevik.cnohapl1",
    });

    map.current.addLayer({
      id: "protected-areas-layer",
      type: "fill",

      source: "protected-areas",
      "source-layer": "protected_areas-cej619",

      paint: {
        "fill-color": "#ec4899",
        "fill-opacity": 0.3,
      },
    });

    map.current.setLayoutProperty(
      "protected-areas-layer",
      "visibility",
      showProtectedAreas ? "visible" : "none"
    );

    map.current.setPaintProperty(
      burnLayer(currentYear),
      "raster-opacity",
      burnOpacity
    );
  }, [hasLoaded, styleLoadChanged]);

  return (
    <>
      <div className="flex row-auto h-dvh relative">
        <aside
          style={{ width: 300 }}
          className="bg-slate-900 text-slate-200 p-6 py-8 flex flex-col justify-between"
        >
          <div>
            <h1 className="text-2xl mb-8">Datasets</h1>
            <Checkbox
              id="burning"
              label="Burned Area"
              description="Burned areas from 2003 to 2022, characterized by deposits of charcoal and ash, removal of vegetation, and alteration of the vegetation structure."
              checked={showBurnedAreas}
              onChange={setShowBurnedAreas}
              colour="bg-red-500"
            />
            <Checkbox
              id="population"
              label="Population"
              description="Population from 2022, estimates total number of people living in the area."
              checked={showPopulation}
              onChange={setShowPopulation}
              colour="bg-blue-500"
            />
            <Checkbox
              id="protected-areas"
              label="Protected Areas"
              description="Protected areas from 2024, terrestrial and marine protected areas"
              checked={showProtectedAreas}
              onChange={setShowProtectedAreas}
              colour="bg-pink-500"
            />
          </div>
          <SwitchComponent
            checked={enableSatellite}
            onChange={setEnableSatellite}
          />
        </aside>

        <div className="flex flex-1 relative">
          <div ref={mapContainer} className="flex-1" />
          <div className="absolute right-0 top-0 m-3 px-4 py-1 text-l font-bold  bg-slate-50 rounded-full shadow-xl">
            {currentYear}
          </div>
          <div className="absolute  bottom-8 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-slate-200 px-10 py-1 rounded-full ">
              <Slider className="pointer-events-auto" onChange={onChangeYear} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
