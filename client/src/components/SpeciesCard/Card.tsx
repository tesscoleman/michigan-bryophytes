import "./card.css"
import Species from "../../interfaces/Species";
import SpeciesItem from "../SpeciesItem";
import mossIcon from "../../assets/moss.png";

interface Props {
  id?: number;
  name: string;
  description?: string;
  classification: Species;
  onClick: () => void;
  count: number;
}
export default function Card({
  id,
  name,
  description,
  classification,
  onClick,
  count,
}: Props) {
  const classColor =
    "rgba(var(--" + classification.className + "-color, #fff), 0.8)";

  return (
    <>
      <a
        href="#"
        onClick={onClick}
        className="card"
        // target="_blank"
        // rel="noopener noreferrer"
      >
        <div
          title={classification.className}
          style={{
            backgroundColor: classColor,
            width: "20px",
            height: "20px",
            position: "absolute",
            right: "7%",
            borderRadius: "5px",
          }}
        ></div>
        <div className="thumbnail">
          {classification.thumbnail?.source ? (
            <img
              className="thumbnail-img"
              src={classification.thumbnail?.source}
            ></img>
          ) : (
            <img
              className="thumbnail-no-img"
              src={mossIcon}
            ></img>
          )}
        </div>
        <div className="card-info">
          <h2>
            <span>{name ? name : classification.genus + " (Genus)"} -&gt;</span>
          </h2>
          <SpeciesItem classification={classification} count={count} />
        </div>
      </a>
    </>
  );
}
