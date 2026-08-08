import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    mapRef.current = new mapboxgl.Map({
      accessToken:
        "",
      container: mapContainerRef.current,
      style: "mapbox://styles/lukeob02/cmskbakxb00wr01s9cxhqfrds",
      center: [-0.8132, 53.08],
      zoom: 9,
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
