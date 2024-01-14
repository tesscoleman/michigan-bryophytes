import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

interface Props {
  page: number;
  total: number;
  limit: number;
  setPage: (arg: number) => void;
}

const Pagination = ({ page, total, limit, setPage }: Props) => {
  const totalPages = Math.ceil(total / limit);

  const onClick = (newPage: number) => {
    setPage(newPage + 1);
  };
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="pagination-container">
          <button
            className="page-btn chevron previous"
            onClick={() => (page > 1 ? onClick(page-2) : null)}
          >
            <Icon path={mdiChevronLeft} size={1} />
          </button>
          {totalPages > 0 &&
            [...Array(totalPages)].map((val, index) => (
              <button
                className={page === index + 1 ? "page-btn active" : "page-btn"}
                key={index}
                onClick={() => onClick(index)}
              >
                {index + 1}
              </button>
            ))}
          <button
            className="page-btn chevron next"
            onClick={() => (page < totalPages ? onClick(page) : null)}
          >
            <Icon path={mdiChevronRight} size={1} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Pagination;
