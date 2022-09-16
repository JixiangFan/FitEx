import React from "react";
import SinglePagePDFViewer from "../components/pdf/single-page";

import samplePDF from "../QA2.pdf";
import "../css/styles.css";

export default function KnowledgeBase3() {
  return (
    <div className="App">
      <h2 className="text-center text-2xl">
        How to get Fitbit Access Token?
      </h2>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />
    </div>
  );
}
