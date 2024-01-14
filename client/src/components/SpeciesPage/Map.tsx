import Occurrence from "../../interfaces/Occurrence";
import { CircleMarker, MapContainer, Popup, TileLayer } from "react-leaflet";

interface Props {
  occurrences: Occurrence[];
}

const Map = ({ occurrences }: Props) => {
  return (
    <>
      <p className="counter">
        <b>Occurrences:</b> {occurrences.length}
      </p>
      <div className="map-container">
      <MapContainer
        center={[44.40988445571416, -85.60849800354947]}
        zoom={5}
        scrollWheelZoom={true}
        minZoom={5}
        maxZoom={16}
      >
        <TileLayer
          attribution="Tiles &copy; Esri &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC"
          url="https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}"
        />
        {/* <CircleMarker center={[42, -84]}>
              <Popup>
                A pretty CSS3 popup. <br /> Easily customizable.
              </Popup>
            </CircleMarker> */}
        {occurrences.map((item) => (
          <CircleMarker
            center={[item.decimalLatitude, item.decimalLongitude]}

            // color={counts[[item.decimalLatitude, item.decimalLongitude].join(",")] > 1 ? "red" : "blue"}
          >
            <Popup>
              {item.scientificName}
              <br />
              Locality: {item.locality}
              <br />
              Dataset: {item.dataSet}
              <br />
              Identified By: {item.identifiedBy}
              <br />
              Recorded By: {item.recordedBy}
              <br />
              Publisher: {item.publishingOrgKey}
              <br />
              Event Date: {item.eventDate}
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
      </div>

    </>
  );
};

export default Map;
