import React from 'react'
import SinglePagePDFViewer from "../components/pdf/single-page";

import samplePDF from "../QA.pdf";
import "../css/styles.css"

export default function KnowledgeBase() {
  return (
    <div className="App">
      <h4>QA Center</h4>
      <SinglePagePDFViewer pdf={samplePDF} />

      <hr />
    </div>
  );
}