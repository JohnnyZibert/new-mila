import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import worker from "../../worker/pdf.worker.min.mjs?url";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import styles from "./PdfViewer.module.scss";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 430);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 430);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        width: "100%",
        height: "75vh",
        overflow: "hidden",
        position: "relative",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <TransformWrapper
        minScale={1}
        maxScale={3}
        wheel={{ disabled: false }}
        pinch={{ disabled: false }}
        doubleClick={{ disabled: true }}
        limitToBounds={true}
        centerOnInit
      >
        <TransformComponent
          wrapperStyle={{
            width: "100%",
            height: "100%",
            overflow: "auto",
            borderRadius: "10",
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
  ) : (
    <div
      ref={containerRef}
      className={styles.container}
      style={{
        width: "100%",
        height: "100vh",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          overflowX: "hidden",
          borderRadius: "10",
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
      </div>
    </div>
  );
};
