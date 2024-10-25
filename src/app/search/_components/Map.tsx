"use client";

import L, { type LatLngExpression, type Map as LeafletMap } from "leaflet";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useRef } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { v4 as uuidv4 } from "uuid";

interface Place {
  lat: number;
  lng: number;
  price?: string | number;
  hovered?: boolean;
}

interface MapProps {
  setData: React.Dispatch<
    React.SetStateAction<{
      loading: boolean;
      results: Record<
        string,
        { id: string; name: string; location: { lat: number; lng: number } }
      >[];
    }>
  >;
  location?: LatLngExpression;
  places: Place[];
  setPlaces: React.Dispatch<React.SetStateAction<Place[]>>;
}

interface MapBounds {
  lat: number | undefined;
  lng: number | undefined;
}

const LeafletMapComponent: React.FC<MapProps> = ({
  setData,
  location,
  places,
  setPlaces,
}) => {
  const DEFAULT_CENTER = location ?? [51.505, -0.09];
  const mapRef = useRef<LeafletMap | null>(null);

  useEffect(() => {
    if (mapRef.current && location) {
      mapRef.current.setView(location);
    }
  }, [location]);

  const getData = async (markers: MapBounds[]) => {
    // Fetching data
    console.log("Fetching data", markers);
  };

  const getBounds = (map: LeafletMap | null) => {
    const bounds = map?.getBounds();
    if (!bounds) return;

    const northWest = bounds.getNorthWest();
    const northEast = bounds.getNorthEast();
    const southWest = bounds.getSouthWest();
    const southEast = bounds.getSouthEast();

    const markers: MapBounds[] = [
      {
        lat: northWest.lat,
        lng: northWest.lng,
      },
      {
        lat: northEast.lat,
        lng: northEast.lng,
      },
      {
        lat: southWest.lat,
        lng: southWest.lng,
      },
      {
        lat: southEast.lat,
        lng: southEast.lng,
      },
    ];
    void getData(markers);
  };

  const getLngAndLat = () => {
    if (mapRef.current) {
      getBounds(mapRef.current);
    }
  };

  useEffect(() => {
    const map = mapRef.current;
    if (map) {
      map.on("moveend", getLngAndLat);

      return () => {
        map.off("moveend", getLngAndLat);
      };
    }
  }, []);

  return (
    <MapContainer
      ref={mapRef} // Type assertion needed due to react-leaflet typing limitations
      style={{ width: "100%", height: "100%" }}
      center={DEFAULT_CENTER}
      zoom={8}
      whenReady={() => {
        getBounds(mapRef.current);
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        noWrap={true}
      />
      {places.map((place) => (
        <Marker
          key={uuidv4()}
          position={[place.lat, place.lng]}
          icon={L.divIcon({
            html: `<span class="px-4 py-2 rounded-full text-md font-bold shadow ${
              place.hovered
                ? "bg-blackColor text-white"
                : "bg-white text-blackColor"
            }">${place.price ?? "Places"}</span>`,
            className: "custom-div-icon",
          })}
        />
      ))}
    </MapContainer>
  );
};

export default LeafletMapComponent;
