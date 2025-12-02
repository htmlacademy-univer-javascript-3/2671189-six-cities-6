import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images so the bundler finds them
import markerIconUrl from 'leaflet/dist/images/marker-icon.png';
import markerIcon2xUrl from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadowUrl from 'leaflet/dist/images/marker-shadow.png';

import { Offer } from '../../mocks/offers';

type MapProps = {
  offers: Offer[];
  center?: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
};

// Create custom icon
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

function Map({ offers, center }: MapProps): JSX.Element {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);

  // Configure default icon paths
  L.Icon.Default.mergeOptions({
    iconUrl: markerIconUrl as string,
    iconRetinaUrl: markerIcon2xUrl as string,
    shadowUrl: markerShadowUrl as string,
  });

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    // Initialize map once
    if (!leafletMapRef.current) {
      const initialCenter = center
        ?? offers[0]?.city.location
        ?? { latitude: 52.37454, longitude: 4.897976, zoom: 13 };

      leafletMapRef.current = L.map(mapRef.current, {
        center: [initialCenter.latitude, initialCenter.longitude],
        zoom: initialCenter.zoom,
        zoomControl: false,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(leafletMapRef.current);

      markersLayerRef.current = L.layerGroup().addTo(leafletMapRef.current);

      setTimeout(() => {
        leafletMapRef.current?.invalidateSize();
      }, 0);
    }

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove();
        leafletMapRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update markers and center when offers or center change
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    offers.forEach((offer) => {
      const marker = L.marker(
        [offer.location.latitude, offer.location.longitude],
        { icon: defaultIcon }
      );
      marker.addTo(markersLayerRef.current as L.LayerGroup);
    });

    // Update map center when center prop changes or use first offer's location
    if (center) {
      map.setView([center.latitude, center.longitude], center.zoom);
    } else if (offers[0]?.city.location) {
      const loc = offers[0].city.location;
      map.setView([loc.latitude, loc.longitude], loc.zoom);
    }

    return () => {
      markersLayerRef.current?.clearLayers();
    };
  }, [offers, center]);

  return (
    <div
      ref={mapRef}
      style={{ width: '100%', height: '100%' }}
      data-testid="leaflet-map"
    />
  );
}

export default Map;
