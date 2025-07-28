import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import "react-pdf/dist/Page/TextLayer.css";
import worker from "../../worker/pdf.worker.min.mjs?url";
import styles from "./PDFviewer.module.scss";

import { useGesture } from "@use-gesture/react";
import { useSpring, animated } from "@react-spring/web";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [width, setWidth] = useState(800);

  const [{ x, y, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    scale: 1,
    config: { tension: 300, friction: 30 },
  }));

  const MIN_SCALE = 0.5;
  const MAX_SCALE = 3.0;

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

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        // Ограничения движения по краям
        const container = containerRef.current;
        if (!container) return;

        const contentWidth = width * scale.get();
        const contentHeight = numPages * 1200 * scale.get(); // прибл. высота всех страниц
        const containerWidth = container.offsetWidth;
        const containerHeight = container.offsetHeight;

        const minX = Math.min(containerWidth - contentWidth, 0);
        const minY = Math.min(containerHeight - contentHeight, 0);

        api.start({
          x: Math.max(minX, Math.min(0, dx)),
          y: Math.max(minY, Math.min(0, dy)),
        });
      },
      onPinch: ({ offset: [d], origin, memo }) => {
        const newScale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, 1 + d / 100));
        api.start({ scale: newScale });
        return memo;
      },
    },
    {
      drag: {
        from: () => [x.get(), y.get()],
      },
      pinch: {
        scaleBounds: { min: MIN_SCALE, max: MAX_SCALE },
        rubberband: true,
      },
    },
  );

  return (
    <div ref={containerRef} className={styles.container}>
      <animated.div
        {...bind()}
        style={{
          x,
          y,
          scale,
          touchAction: "none",
          willChange: "transform",
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
              renderMode="canvas"
            />
          ))}
        </Document>
      </animated.div>
    </div>
  );
};
