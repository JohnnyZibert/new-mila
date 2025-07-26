// import { Viewer, Worker } from "@react-pdf-viewer/core";
//
// import "@react-pdf-viewer/core/lib/styles/index.css";
// import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
// import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
//
// export const PdfViewer2 = () => {
//   const defaultLayoutPluginInstance = defaultLayoutPlugin();
//
//   return (
//     <div
//       style={{
//         overflow: "hidden",
//         touchAction: "pan-y",
//       }}
//     >
//       <div
//         style={{
//           overflow: "scroll",
//           touchAction: "pinch-zoom",
//           WebkitOverflowScrolling: "touch",
//         }}
//       >
//         <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
//           <Viewer fileUrl={myPDF} plugins={[defaultLayoutPluginInstance]} />
//         </Worker>
//       </div>
//     </div>
//   );
// };

// PdfViewer.tsx
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import worker from "../../worker/pdf.worker.min.mjs?url";
import styles from "./PDFviewer.module.scss";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer2 = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(800);
  const [numPages, setNumPages] = useState<number>(0);

  const updateWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setWidth(containerWidth);
    }
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div ref={containerRef} className={styles.pdfWrapper}>
      <div className={styles.zoomable}>
        <Document file={myPDF} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={width}
              renderAnnotationLayer={false}
              renderTextLayer={true}
            />
          ))}
        </Document>
      </div>
    </div>
  );
};
