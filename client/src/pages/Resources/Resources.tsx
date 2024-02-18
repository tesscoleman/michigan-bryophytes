import "./resources.css";

import Collapsible from "../../components/Collapsible/Collapsible";

import WorldFloraOnline from "../../assets/images/resources/WorldFloraOnline.png";
import MissouriBotanicalGarden from "../../assets/images/resources/MissouriBotanicalGarden.png";
import EOL from "../../assets/images/resources/EOL-logo.png";
import NatureServe from "../../assets/images/resources/NatureServe_logo_V.svg.png";
import FNA from "../../assets/images/resources/FNA-logo.jpg";
import GBIF from "../../assets/images/resources/GBIF-2015-full-stacked.png";

const Resources = () => {
  return (
    <>
      <div className="resources-page">
        <div className="resources-wrapper">
          <a
            href="https://www.worldfloraonline.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={WorldFloraOnline} alt="" />
          </a>
          <a
            href="https://www.tropicos.org/home"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={MissouriBotanicalGarden}
              alt="http://www.efloras.org/flora_page.aspx?flora_id=1"
            />
          </a>
          <a href="https://eol.org/" target="_blank" rel="noopener noreferrer">
            <img src={EOL} alt="" />
          </a>
          <a
            href="https://explorer.natureserve.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={NatureServe} alt="" />
          </a>
          <a
            href="http://floranorthamerica.org/Main_Page"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={FNA} alt="" />
          </a>
          <a
            href="https://www.gbif.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img src={GBIF} alt="" />
          </a>
        </div>
        <div className="citations-wrapper">
          <Collapsible header="Citations">
            <p>
              {
                "Tropicos.org. Missouri Botanical Garden. 09 Jan 2024 <https://tropicos.org>"
              }
            </p>
            <p>
              {
                "NatureServe. 2024. NatureServe Network Biodiversity Location Data accessed through NatureServe Explorer [web application]. NatureServe, Arlington, Virginia. Available https://explorer.natureserve.org/. (Accessed: Jan 09, 2024)."
              }
            </p>
            <p>
              {
                "GBIF.org (07 December 2023) GBIF Occurrence Download https://doi.org/10.15468/dl.zj9q4u"
              }
            </p>
            <p>
              {
                "GBIF.org (14 December 2023) GBIF Occurrence Download https://doi.org/10.15468/dl.9t4g7b"
              }
            </p>
            <p>
              {
                "GBIF.org (20 December 2023) GBIF Occurrence Download https://doi.org/10.15468/dl.c7srye"
              }
            </p>
          </Collapsible>
        </div>
      </div>
    </>
  );
};

export default Resources;
