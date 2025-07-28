import { useEffect, useRef, useState } from "react";
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

  const clamp = (value: number, min: number, max: number) =>
    Math.min(Math.max(value, min), max);

  const bind = useGesture(
    {
      onPinch: ({ offset: [d] }) => {
        const newScale = Math.max(1, Math.min(3, 1 + d / 100));
        setScale(newScale);
      },
      onDrag: ({ offset: [x, y] }) => {
        const container = containerRef.current;
        if (!container) return;

        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const contentWidth = containerWidth * scale;
        const contentHeight = containerHeight * scale;

        const maxX = 0;
        const maxY = 0;
        const minX = Math.min(containerWidth - contentWidth, 0);
        const minY = Math.min(containerHeight - contentHeight, 0);

        setPosition({
          x: clamp(x, minX, maxX),
          y: clamp(y, minY, maxY),
        });
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
        rubberband: false,
        // @ts-ignore
        from: () => [scale],
      },
      target: containerRef,
      eventOptions: { passive: false },
    },
  );

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const preventTouchZoom = (e: TouchEvent) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    el.addEventListener("touchmove", preventTouchZoom, { passive: false });
    return () => {
      el.removeEventListener("touchmove", preventTouchZoom);
    };
  }, []);

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
