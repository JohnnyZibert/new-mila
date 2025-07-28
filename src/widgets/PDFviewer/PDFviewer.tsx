import { useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import worker from "../../worker/pdf.worker.min.mjs?url";
import { useGesture } from "react-use-gesture";
import styles from "./PDFviewer.module.scss";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);

  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const bind = useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        const nextScale = Math.min(Math.max(0.5, 1 + d / 100), 3); // clamp zoom
        setScale(nextScale);
      },
      onDrag: ({ offset: [x, y] }) => {
        setPosition({ x, y });
      },
    },
    {
      drag: {
        // @ts-ignore
        from: () => [position.x, position.y],
        pointer: { touch: true },
      },
      pinch: {
        // @ts-ignore
        scaleBounds: { min: 0.5, max: 3 },
        rubberband: true,
      },
      target: containerRef,
      eventOptions: { passive: false },
    },
  );

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div
      ref={containerRef}
      {...bind()}
      className={styles.container}
      style={{
        width: "100%",
        height: "100%",
        overflow: "hidden",
        touchAction: "none",
        position: "relative",
      }}
    >
      <div
        style={{
          transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
          transformOrigin: "0 0",
          transition: "transform 0.05s linear",
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
              width={containerRef.current?.offsetWidth} // можно заменить на containerRef.current?.offsetWidth
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
