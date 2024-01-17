import Tab from "../components/Tab";
import MapCtrl from "../components/MapCtrl";
import Species from "../interfaces/Species";

import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useEffect, useState } from "react";
import Occurrence from "../interfaces/Occurrence";
import Classification from "../components/SpeciesPage/Classification";
import Identification from "../components/SpeciesPage/Identification";
import Map from "../components/SpeciesPage/Map";
import Characteristics from "../components/SpeciesPage/Characteristics";

interface Props {
  isCardActive: boolean;
  classification: Species;
  onClick: () => void;
  occurrences: Occurrence[];
  conservation: string;
}

export default function SpeciesPage({
  isCardActive,
  classification,
  onClick,
  occurrences,
  conservation,
}: Props) {
  const [tab, setTab] = useState<
    "Classification" | "Identification" | "Map" | "Characteristics"
  >("Classification");
  const [images, setImages] = useState(classification.images!);

  useEffect(() => {
    setImages(classification.images!);
  }, [classification]);

  //let images : {source?: string, credit?: any}[] = classification.images!
  const attribution = classification.thumbnail?.credit;
  const counts: Record<string, number> = {};
  const classColor =
    "rgba(var(--" + classification.className + "-color, #fff), 0.8)";
  occurrences.forEach((item) => {
    const coordinate: [number, number] = [
      item.decimalLatitude,
      item.decimalLongitude,
    ];
    const cstr: string = coordinate.join(",");
    counts[cstr] = (counts[cstr] || 0) + 1;
  });

  const statusDisplays: Record<string, string> = {
    GX: "Presumed Extinct",
    GH: "Possibly Extinct",
    G1: "Critically Imperiled",
    G2: "Imperiled",
    G3: "Vulnerable",
    G4: "Apparently Secure",
    G5: "Secure",
    GU: "Unrankable",
    GNR: "Unranked",
    GNA: "Not Applicable",
  };

  return (
    <>
      <div className="species-header">
        <Tab
          isActive={tab === "Classification"}
          onClick={() => setTab("Classification")}
        >
          Classification
        </Tab>
        <Tab isActive={tab === "Map"} onClick={() => setTab("Map")}>
          Map
        </Tab>
        <Tab
          isActive={tab === "Characteristics"}
          onClick={() => setTab("Characteristics")}
        >
          Characteristics
        </Tab>
        <Tab
          isActive={tab === "Identification"}
          onClick={() => setTab("Identification")}
        >
          Identification
        </Tab>
        <MapCtrl mapActive={isCardActive} onClick={onClick}>
          <Icon path={mdiChevronRight} size={1} />
        </MapCtrl>
      </div>
      <div className="species-page">
        <span style={{position:"absolute", left:"2rem", top: "2rem"}}>
          {conservation
            ? conservation + " (" + statusDisplays[conservation] + ")"
            : ""}
        </span>
        <div
          title={classification.className}
          style={{
            backgroundColor: classColor,
            width: "20px",
            height: "20px",
            position: "absolute",
            right: "3rem",
            top: "3rem",
            borderRadius: "5px",
          }}
        ></div>
        <div className="header-div-row">
          <div className="header-div">
            <img
              className="header-image"
              src={classification.thumbnail?.source}
              alt=""
              onClick={() => setTab("Identification")}
            />
            <div className="species-content">
              <p>
                <b>{classification.scientificName}</b>
              </p>
              <p>
                <b>Common Name:</b>{" "}
                {classification.commonName ? classification.commonName : "N/A"}
              </p>
            </div>
          </div>
        </div>

        <div className="content-row">
          {tab === "Classification" && (
            <Classification classification={classification} />
          )}
          {tab === "Characteristics" && (
            <Characteristics
              habitat={classification.habitat}
              appearance={classification.appearance}
            />
          )}

          {tab === "Map" && <Map occurrences={occurrences} />}
          {tab === "Identification" && (
            <Identification
              images={images}
              scientificName={classification.scientificName}
            />
          )}
        </div>
      </div>
    </>
  );
}
