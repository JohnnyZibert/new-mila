import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import worker from "../../worker/pdf.worker.min.mjs?url";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./PDFviewer.module.scss";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        width: "100%",
        height: "100%",
        overflow: "scroll",
        touchAction: "none",
        position: "relative",
      }}
    >
      <TransformWrapper
        minScale={1}
        maxScale={3}
        wheel={{ disabled: false }}
        pinch={{ disabled: false }}
        doubleClick={{ disabled: true }}
        panning={{ disabled: false }}
        limitToBounds={true}
        centerOnInit
      >
        <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
          <Document
            file={myPDF}
            onLoadSuccess={onDocumentLoadSuccess}
            loading="Загрузка PDF..."
          >
            {Array.from({ length: numPages }, (_, index) => (
              <Page
                key={index}
                pageNumber={index + 1}
                width={containerRef.current?.offsetWidth}
                renderAnnotationLayer={false}
                renderTextLayer={true}
                renderMode="canvas"
              />
            ))}
          </Document>
        </TransformComponent>
      </TransformWrapper>
    </div>
  );
};
