import React from "react";
import SinglePagePDFViewer from "../components/pdf/single-page";

import samplePDF from "../QA1.pdf";
import "../css/styles.css";

export default function KnowledgeBase2() {
  return (
    <div className="App">
      <h2 className="text-center text-2xl">
        What is the best way to measure and set individual and team goals?
      </h2>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />
    </div>
  );
}
