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
        <button 
        style={{ backgroundColor: "#8AABBD" }}
          className=" btn btn-secondary border-2 border-slate-500 cursor-pointer text-center px-2 py-1.5 w-31 text-2xl"

         type="button1" disabled={pageNumber <= 1} onClick={previousPage}>
          Previous
        </button>
        <button
          style={{ backgroundColor: "#8AABBD" }}
          className=" btn btn-secondary border-2 border-slate-500 cursor-pointer text-center px-4 py-1.5 text-2xl"
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
