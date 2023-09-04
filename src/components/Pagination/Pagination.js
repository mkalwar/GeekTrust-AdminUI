import React from "react";
import { Fab } from "@mui/material";

const Pagination = ({ currentPage, totalPages, handlePagination }) => {
  const paginationButtons = () => {
    const buttons = [];

    if (totalPages <= 1) {
      // Don't display pagination buttons if there's only one page.
      return buttons;
    }
    if (currentPage >= 1) {
      buttons.push(
        <Fab
          sx={{ height: 45, width: 45 }}
          key="first"
          color={currentPage > 1 ? "primary" : "disabled"}
          onClick={() => handlePagination(1)}
        >
          {"<<"}
        </Fab>
      );
      buttons.push(
        <Fab
          sx={{ height: 45, width: 45 }}
          key="previous"
          color={currentPage > 1 ? "primary" : "disabled"}
          onClick={() => handlePagination(currentPage - 1)}
        >
          {"<"}
        </Fab>
      );
    }

    for (let page = 1; page <= totalPages; page++) {
      buttons.push(
        <Fab
          sx={{ height: 45, width: 45 }}
          key={page}
          color="primary"
          onClick={() => handlePagination(page)}
          disabled={page === currentPage}
        >
          {page}
        </Fab>
      );
    }

    if (currentPage <= totalPages) {
      buttons.push(
        <Fab
          sx={{ height: 45, width: 45 }}
          key="next"
          color={currentPage < totalPages ? "primary" : "disabled"}
          onClick={() => handlePagination(currentPage + 1)}
        >
          {">"}
        </Fab>
      );
      buttons.push(
        <Fab
          sx={{ height: 45, width: 45 }}
          key="last"
          color={currentPage < totalPages ? "primary" : "disabled"}
          onClick={() => handlePagination(totalPages)}
        >
          {">>"}
        </Fab>
      );
    }
    return buttons;
  };

  return (
    <span
      style={{
        display: "flex",
        gap: "0.5rem",
        margin: "0 auto",
        justifyContent: "center",
        maxWidth: "100%",
        overflowX: "auto",
      }}
    >
      {paginationButtons()}
    </span>
  );
};
export default Pagination;
