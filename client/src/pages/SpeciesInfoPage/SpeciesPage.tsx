import "./speciesinfopage.css";

import Tab from "../../components/Tab";
import MapCtrl from "../../components/MapCtrl";
import Species from "../../interfaces/Species";

import Icon from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import { useEffect, useState } from "react";
import Occurrence from "../../interfaces/Occurrence";
import Classification from "../../components/SpeciesPage/Classification";
import Identification from "../../components/SpeciesPage/Identification";
import Map from "../../components/SpeciesPage/Map";
import Characteristics from "../../components/SpeciesPage/Characteristics";
import mossIcon from "../../assets/moss.png";

interface Props {
  isCardActive: boolean;
  classification: Species;
  onClick: () => void;
  occurrences: Occurrence[];
  conservation: string;
  sendClassToMain: any;
}

// Species Page detailing clasification, map, characteristics and idenficiation of a specific species to the user!
//
// isCardActive: bool - Whether the user has clicked a specific species and the info card is available
// classification: Species - Classification of object Species detailing information about the species being described.
// onClick: () => void - OnClick event handler, used by the dismiss button which cancels the whole info page sidebar.
// occurrences: Occurrence[] - Array of moss occurrences used by the Map tab.
// conservation: string - Nature Serve Global Conservation Status Rank of the species.
// sendClassToMain: any - function called onClassClick, when the user has filtered the query by the class of the Species type.

export default function SpeciesPage({
  isCardActive,
  classification,
  onClick,
  occurrences,
  conservation,
  sendClassToMain,
}: Props) {
  const [tab, setTab] = useState<
    "Classification" | "Identification" | "Map" | "Characteristics"
  >("Classification"); // The selected and active tab
  const [images, setImages] = useState(classification.images!); // Images from the database
  const [displayImg, setDisplayImg] = useState(true); // Whether to display the thumbnail image at the top

  useEffect(() => {
    setImages(classification.images!);
    setDisplayImg(true);
  }, [classification]);

  //let images : {source?: string, credit?: any}[] = classification.images!
  const attribution = classification.thumbnail?.credit;
  const counts: Record<string, number> = {};
  const classColor =
    "rgba(var(--" + classification.className + "-color, #fff), 0.8)"; // Class color var from filters
  occurrences.forEach((item) => {
    const coordinate: [number, number] = [
      item.decimalLatitude,
      item.decimalLongitude,
    ];
    const cstr: string = coordinate.join(",");
    counts[cstr] = (counts[cstr] || 0) + 1;
  });

  function handleClassClick() {
    // Send class name to main so that filtering by class (after clicking the label top right) is possible.
    sendClassToMain(classification.className);
  }

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
      <div className="species-navbar">
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
        {/* MAP CONTROL CONTROLS ALL OF SPECIES PAGE */}
        <MapCtrl mapActive={isCardActive} onClick={onClick}>
          <Icon path={mdiChevronRight} size={1} />
        </MapCtrl>
      </div>
      <div className="info-section">
        <span style={{ position: "absolute", left: "2rem", top: "2rem" }}>
          {conservation
            ? conservation + " (" + statusDisplays[conservation] + ")"
            : ""}
        </span>
        <div
          title={classification.className}
          className="classLabel"
          style={{
            backgroundColor: classColor,

          }}
          onClick={() => handleClassClick()}
        ></div>
        <div className="header-div-row">
          <div className="header-div">
            {displayImg && (
              <img
                className="header-image"
                src={classification.thumbnail?.source}
                alt=""
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  setDisplayImg(false);
                }}
                onClick={() => setTab("Identification")}
              />
            )}
            {!displayImg && (
              <div className="thumbnail"
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "var(--border-radius)",
                  margin: "0 auto",
                }}
              >
                <img src={mossIcon} className="thumbnail-no-img"></img>
              </div>
            )}
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
