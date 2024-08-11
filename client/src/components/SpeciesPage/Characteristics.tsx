import Icon from "@mdi/react";
import { mdiLeafCircle, mdiForestOutline } from "@mdi/js";

interface Props {
  habitat: [{ type?: string; description?: string }];
  appearance: [{ type?: string; description?: string }];
}
const Characteristics = ({ habitat, appearance }: Props) => {
  return (
    <>
      <div className="characteristics-flexbox">
        {habitat.some((e) => e.description) ||
        appearance.some((e) => e.description) ? (
          ""
        ) : (
          <p>Characteristic data not yet available.</p>
        )}
        {habitat.map(
          (item) =>
            item.description && (
              <div className="characteristic-container">
                <Icon path={mdiForestOutline} size={1} />
                <p className="characteristic-desc" >
                  <b>Habitat:</b>{" "}{item.description || ""}
                </p>
              </div>
            )
        )}
        {appearance.map(
          (item) =>
            item.description && (
              <div className="characteristic-container">
                <Icon path={mdiLeafCircle} size={1} />
                <p className="characteristic-desc">
                  <b>Appearance: </b> {item.description || ""}
                  {/* <b>Appearance:</b> Scattered shoots, bright green color, pinnate
        branching. Usually encountered dry */}
                </p>
              </div>
            )
        )}
      </div>
    </>
  );
};

export default Characteristics;
