import Species from "../../interfaces/Species";
import TaxonText from "../TaxonText";

interface Props {
  classification: Species;
}

const Classification = ({
  classification,
}: Props) => {
  const attribution = classification.thumbnail?.credit
  return (
    <>
      <div className="classification-content">
        <p>
          <b>Taxonomy:</b>
        </p>
        <ul className="taxonomy-list">
          <TaxonText name="Plantae" taxon="Kingdom" />
          <li>
            <ul>
              <TaxonText name={classification.phylum || ""} taxon="Phylum" />
              <li>
                <ul>
                  <TaxonText
                    name={classification.className || ""}
                    taxon="Class"
                  />
                  <li>
                    <ul>
                      <TaxonText
                        name={classification.order || ""}
                        taxon="Order"
                      />
                      <li>
                        <ul>
                          <TaxonText
                            name={classification.family || ""}
                            taxon="Family"
                          />
                          <li>
                            <ul>
                              <TaxonText
                                name={classification.genus || ""}
                                taxon="Genus"
                              />
                            </ul>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
        </ul>

        <div className="image-caption">
            {attribution.source ? (
              <p>
                {
                  <a href={attribution.source} target="_blank" rel="noopener noreferrer">
                    <i>{attribution?.title || classification.scientificName}</i>
                  </a>
                }
                {attribution.author ? " by " + attribution.author : ""}
                {attribution.license ? "/" : ""}{" "}
                {attribution.licenseSource ? (
                  <a href={attribution.licenseSource} target="_blank" rel="noopener noreferrer">
                    {attribution.license}
                  </a>
                ) : (
                  attribution.license
                )}
              </p>
            ) : (
              ""
            )}
          </div>
      </div>
    </>
  );
};

export default Classification;
