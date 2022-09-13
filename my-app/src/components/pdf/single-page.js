import React, { useState } from "react";
import { Document, Page  } from "react-pdf/dist/esm/entry.webpack";

export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  const { pdf } = props;

  return (
    <>
      <Document
        file={pdf}
        options={{ workerSrc: "/pdf.worker.js" }}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <div>
        <p>
          Page {pageNumber || (numPages ? 1 : "--")} of {numPages || "--"}
        </p>
        <button className="mr-10 bg-[#3f51b5] text-white border-none px-2 py-4 w-31 cursor-pointer text-center shadow-md" type="button1" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          className="mr-10 bg-[#3f51b5] text-white border-none px-1 py-4 w-20 cursor-pointer text-center shadow-md"
          type="button1"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Next
        </button>
      </div>
    </>
  );
}
