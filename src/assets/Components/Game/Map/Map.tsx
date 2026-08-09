import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function convertData(stationData) {
  return {
    type: "FeatureCollection",
    features: stationData.map((country, idx) => ({
      type: "Feature",
      id: idx,
      properties: {
        name: country.name,
        displayName: country.displayName,
        country: country.country,
        found: country.found,
      },
      geometry: {
        type: "Point",
        coordinates: [country.location.lon, country.location.lat],
      },
    })),
  };
}

async function fetchStrippedStyle(theme) {
  const accessToken = import.meta.env.VITE_MAPBOX_API_KEY;
  const styleUrl = `https://api.mapbox.com/styles/v1/mapbox/${theme}-v11?access_token=${accessToken}`;

  const response = await fetch(styleUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch Mapbox style: ${response.status}`);
  }

  const style = await response.json();
  style.layers = style.layers.filter((layer) => layer.type !== "symbol");

  return style;
}

function Map({ stationData, userPreferences }) {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);
  const isStyleReady = useRef(false);
  const stationDataRef = useRef(stationData);
  const appliedThemeRef = useRef(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    stationDataRef.current = stationData;
  }, [stationData]);

  function addSourceAndLayers() {
    const map = mapRef.current;
    if (!map) return;

    if (map.getSource("guess-points")) return;

    map.addSource("guess-points", {
      type: "geojson",
      data: convertData(stationDataRef.current),
    });

    map.addLayer({
      id: "guess-points-circle",
      type: "circle",
      source: "guess-points",
      slot: "top",
      paint: {
        "circle-radius": [
          "interpolate",
          ["linear"],
          ["zoom"],
          4,
          3,
          8,
          8,
          12,
          12,
          16,
          12,
        ],
        "circle-color": [
          "case",
          ["boolean", ["get", "found"], false],
          "#2ecc71",
          "#e74c3c",
        ],
        "circle-stroke-width": 1,
        "circle-stroke-color": "#ffffff",
      },
    });

    map.addLayer({
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
        "text-opacity": ["case", ["boolean", ["get", "found"], false], 1, 0],
      },
    });

    isStyleReady.current = true;
  }

  function syncFoundState(data) {
    const map = mapRef.current;
    if (!map || !isStyleReady.current) return;

    const source = map.getSource("guess-points");
    if (!source) return;

    source.setData(convertData(data));
  }

  // Create map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    let cancelled = false;

    (async () => {
      const theme = userPreferences?.theme ? userPreferences.theme : "light";

      let style;
      try {
        style = await fetchStrippedStyle(theme);
      } catch (error) {
        style = `mapbox://styles/mapbox/${theme}-v11`;
      }

      if (cancelled || !mapContainerRef.current) return;

      const map = new mapboxgl.Map({
        accessToken: `${import.meta.env.VITE_MAPBOX_API_KEY}`,
        container: mapContainerRef.current,
        style,
        center: [-0.1281, 51.508],
        zoom: 3,
        minZoom: 3,
        maxZoom: 13,
      });

      mapRef.current = map;
      appliedThemeRef.current = theme;

      map.on("load", () => {
        if (cancelled) return;
        addSourceAndLayers();
        setMapReady(true);
      });
    })();

    return () => {
      cancelled = true;

      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Theme changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !mapReady) return;

    const theme = userPreferences?.theme ? userPreferences.theme : "light";

    if (appliedThemeRef.current === theme) return;

    let cancelled = false;

    (async () => {
      let style;
      try {
        style = await fetchStrippedStyle(theme);
      } catch (error) {
        style = `mapbox://styles/mapbox/${theme}-v11`;
      }

      if (cancelled) return;

      isStyleReady.current = false;
      map.setStyle(style);
      appliedThemeRef.current = theme;

      map.once("style.load", () => {
        if (cancelled) return;
        addSourceAndLayers();
      });
    })();

    return () => {
      cancelled = true;
    };
  }, [userPreferences?.theme, mapReady]);

  useEffect(() => {
    syncFoundState(stationData);
  }, [stationData]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        height: "800px",
        width: "100vw",
      }}
    />
  );
}

export default Map;
