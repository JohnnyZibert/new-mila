import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import worker from "../../worker/pdf.worker.min.mjs?url";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./PDFviewer.module.scss";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div
      ref={scrollRef}
      className={styles.container}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "auto", //
      }}
    >
      <div ref={containerRef}>
        <TransformWrapper
          minScale={1}
          maxScale={3}
          wheel={{ disabled: true }}
          pinch={{ disabled: false }}
          doubleClick={{ disabled: true }}
          panning={{ disabled: true }}
          limitToBounds={false}
          centerOnInit
        >
          <TransformComponent
            wrapperStyle={{
              width: "fit-content",
              height: "fit-content",
              margin: "auto",
            }}
          >
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
    </div>
  );
};
