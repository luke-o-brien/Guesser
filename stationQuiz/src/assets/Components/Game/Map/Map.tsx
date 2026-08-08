import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { stationData } from '../../../../data/StationData'

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);


  const convertData = (stationData) => {
    console.log(stationData)
    return {
    type: 'FeatureCollection',
    features: stationData
      .map((station, idx) => ({ station, idx }))
      .map(({ station, idx }) => ({
        type: 'Feature',
        id: idx,
        properties: {
          name: station.name,
          displayName: station.displayName,
          managedBy: station.managedBy,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            station.location.lon,
            station.location.lat
          ],
        },
      })),
  };
  }

  
  useEffect(() => {
    convertData(stationData)
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken:
        "",
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.8132, 53.08],
      zoom: 9,
      minZoom: 5,
      maxZoom: 15,
    });

 mapRef.current.on("style.load", () => {
   if (!mapRef.current) return;

   const layers = mapRef.current.getStyle().layers;
   layers?.forEach((layer) => {
     if (layer.type === "symbol") {
       mapRef.current?.setLayoutProperty(layer.id, "visibility", "none");
     }
   });
 });

    mapRef.current.on("load", () => {
      if (!mapRef.current) return;

      mapRef.current.addSource("guess-points", {
        type: "geojson",
        data: convertData(stationData),
      });

      mapRef.current.addLayer({
        id: "guess-points-circle",
        type: "circle",
        source: "guess-points",
        slot: "top",
          paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      4, 2, 
      8, 4,   
      12, 8,  
      16, 12, 
    ],
    "circle-color": "#e74c3c",
    "circle-stroke-width": 1,
    "circle-stroke-color": "#ffffff",
  },
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  return (
    <div ref={mapContainerRef} style={{ height: "800px", width: "100vw" }} />
  );
}

export default Map;
