import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function convertData(stationData) {
  return {
    type: "FeatureCollection",
    features: stationData.map((station, idx) => ({
      type: "Feature",
      id: idx,
      properties: {
        name: station.name,
        displayName: station.displayName,
        managedBy: station.managedBy,
      },
      geometry: {
        type: "Point",
        coordinates: [station.location.lon, station.location.lat],
      },
    })),
  };
}

function Map({ stationData }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const isStyleReady = useRef(false);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken: `${import.meta.env.VITE_MAPBOX_API_KEY}`,
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-0.8132, 53.08],
      zoom: 9,
      minZoom: 3,
      maxZoom: 13,
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
            4,2,
            8,4,
            12,8,
            16,12,
          ],
          "circle-color": [
            "case",
            ["boolean", ["feature-state", "found"], false],
            "#2ecc71",
            "#e74c3c",
          ],
          "circle-stroke-width": 1,
          "circle-stroke-color": "#ffffff",
        },
      });

      mapRef.current.addLayer({
        id: "guess-points-label",
        type: "symbol",
        source: "guess-points",
        slot: "top",
        layout: {
          "text-field": ["get", "displayName"],
          "text-offset": [0, 0.75],
          "text-anchor": "top",
          "text-size": 10,
        },
        paint: {
          "text-color": "#ffffff",
          "text-halo-color": "#000000",
          "text-halo-width": 1.5,
          "text-opacity": [
            "case",
            ["boolean", ["feature-state", "found"], false],
            1,
            0,
          ],
        },
      });

      isStyleReady.current = true;

      stationData.forEach((station, idx) => {
        if (station.found) {
          mapRef.current?.setFeatureState(
            { source: "guess-points", id: idx },
            { found: true },
          );
        }
      });
    });

    return () => {
      mapRef.current?.remove();
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !isStyleReady.current) return;

    stationData.forEach((station, idx) => {
      mapRef.current?.setFeatureState(
        { source: "guess-points", id: idx },
        { found: station.found },
      );
    });
  }, [stationData]);

  return (
    <div ref={mapContainerRef} style={{ height: "800px", width: "100vw" }} />
  );
}

export default Map;
