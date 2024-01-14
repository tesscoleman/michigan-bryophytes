import { FormEventHandler } from "react";

interface Props {
    handleSubmit: (e : any) => void,
    searchQuery: string
}
export default function FilterBox({handleSubmit, searchQuery}: Props) {

  return (
    <>
      <div className="search-bar">
          <input onChange={handleSubmit}
            type="search"
            className="moss-search"
            // name="q"
            placeholder="Search..."
            value={searchQuery}
          />
      </div>
    </>
  );
}
