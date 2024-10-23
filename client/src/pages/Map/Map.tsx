import React, { useEffect, useRef } from "react";
import "./map.css";
import Footer from "../../components/Footer/footer";
import MapView from "@arcgis/core/views/MapView"
import EsriMap from "@arcgis/core/Map";
import { ArcMapView } from "../../components/ArcMapView/ArcMapView";
import { ArcGraphicsLayer } from "../../components/ArcGraphicsLayer/ArcGraphicsLayer";
import Occurrence from "../../interfaces/Occurrence";

export default function Map() {

  let defaultOccurrences: Occurrence[] = [
    {
      decimalLatitude: 42,
      decimalLongitude: -84,
      stateProvince: "Michigan",
      occurrenceID: "32142413ffdsf",
      recordNumber: "fsdjfsdfs",
      scientificName: "scientificname",
      datasetKey: "fsdfsdkf",
      acceptedTaxonKey: 3123213,
    },
  ];

  return (
    <div className="map-page">
      <React.StrictMode>

            <h1>My ArcGIS Map</h1>

            <ArcMapView><ArcGraphicsLayer occurrences={defaultOccurrences}></ArcGraphicsLayer></ArcMapView>
      </React.StrictMode>
    </div>
  );
}
