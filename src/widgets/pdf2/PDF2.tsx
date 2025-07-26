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

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        setWidth(containerWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className={styles.wrapper}>
      {/* Этот заголовок не зумируется при pinch-zoom */}
      <div className={styles.fixedHeader}>
        <h1 className={styles.noZoom}>Соглашение о присоединении к ЭДО</h1>
        <button className={styles.noZoom}>Скачать</button>
      </div>

      {/* PDF документ с возможностью масштабирования */}
      <div ref={containerRef} className={styles.pdfScroll}>
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
