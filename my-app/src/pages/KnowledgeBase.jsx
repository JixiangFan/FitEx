import React from 'react'
import SinglePagePDFViewer from "../components/pdf/single-page";

import samplePDF from "../QA.pdf";
import "../css/styles.css"

export default function KnowledgeBase() {
  return (
    <div className="App">
      <h2 className="text-center text-2xl">
        QA Center
      </h2>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />
    </div>
  );
}