import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import worker from "../../worker/pdf.worker.min.mjs?url";
import styles from "./PDFviewer.module.scss";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(800); // начальная ширина
  const [numPages, setNumPages] = useState<number>(0);
  // const isPortrait = window.innerHeight > window.innerWidth;
  const isMobile = window.innerWidth < 768;
  // const scale = isPortrait && isMobile ? 1 : 1;
  const scale = 1;

  const updateWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      setWidth(containerWidth);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.contentRect) {
          setWidth(entry.contentRect.width);
        }
      }
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  return (
    <div ref={containerRef} className={styles.container}>
      {isMobile ? (
        <div>
          <TransformWrapper
          // options={{ maxScale: 5, minScale: 0.5 }}
          // pinch={{ disabled: true }}
          // doubleClick={{ disabled: true }}
          // wheel={{ step: 0.1 }}
          >
            <TransformComponent>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
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
                      width={width}
                      renderAnnotationLayer={false}
                      renderTextLayer={true}
                      scale={scale}
                      renderMode="canvas"
                    />
                  ))}
                </Document>
              </div>
            </TransformComponent>
          </TransformWrapper>
        </div>
      ) : (
        <Document
          file={myPDF}
          onLoadSuccess={onDocumentLoadSuccess}
          loading="Загрузка PDF..."
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={index}
              pageNumber={index + 1}
              width={width}
              renderAnnotationLayer={false}
              renderTextLayer={true}
              scale={scale}
              renderMode="canvas"
            />
          ))}
        </Document>
      )}
    </div>
  );
};
