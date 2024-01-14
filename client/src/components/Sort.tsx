import Icon from "@mdi/react";
import { mdiMenuSwap } from "@mdi/js";

interface Sort {
  sort: string;
  order: string;
}
interface Props {
  sort: Sort;
  setSort: (arg: Sort) => void;
}

const Sort = ({ sort, setSort }: Props) => {
  function onChange(event: any) {
    let value = event.target.value;
    let values = value.split(",");
    setSort({ sort: values[0], order: values[1] });
    console.log(value);
  }
  return (
    <>
      <div>
        <p>
          <span>Sort By: </span>
          <div className="select-container">
            <select
              className="sort-select"
              defaultValue={sort.sort + "," + sort.order}
              onChange={onChange}
            >
              <option value={"scientificName,asc"}>Species Name A-Z</option>
              <option value="scientificName,desc">Species Name Z-A</option>
              <option value="occurrenceCount,desc">Highest Occurrence</option>
              <option value="occurrenceCount,asc">Lowest Occurrence</option>
              <option value="class,asc">Class</option>
            </select>
            <Icon path={mdiMenuSwap} size={1} />
          </div>
        </p>
      </div>
    </>
  );
};

export default Sort;
