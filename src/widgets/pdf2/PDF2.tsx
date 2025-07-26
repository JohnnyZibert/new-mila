import React, { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useGesture } from "@use-gesture/react";
import { animated } from "@react-spring/web";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

type PdfViewerProps = {
  file: string; // путь к PDF-файлу
};

export const PdfViewer2: React.FC<PdfViewerProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [numPages, setNumPages] = useState(0);
  const [scale, setScale] = useState(1);

  // Обработка pinch-жеста
  const bind = useGesture({
    onPinch: ({ offset: [distance] }) => {
      const newScale = Math.min(Math.max(1 + distance / 200, 0.5), 3);
      setScale(newScale);
    },
  });

  // Скролл страницы при достижении края документа
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      const atTop = el.scrollTop === 0 && e.deltaY < 0;
      const atBottom =
        el.scrollTop + el.clientHeight >= el.scrollHeight && e.deltaY > 0;

      if (atTop || atBottom) {
        e.preventDefault();
        window.scrollBy(0, e.deltaY);
      }
    };

    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <animated.div
      {...bind()}
      ref={containerRef}
      style={{
        overflowY: "auto",
        maxHeight: "90vh",
        transform: `scale(${scale})`,
        transformOrigin: "top center",
        border: "1px solid #ccc",
        padding: "10px",
        background: "#fff",
      }}
    >
      <Document
        file={myPDF}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        loading="Загрузка документа..."
      >
        {Array.from({ length: numPages }, (_, i) => (
          <Page
            key={i}
            pageNumber={i + 1}
            width={600}
            renderAnnotationLayer={false}
          />
        ))}
      </Document>
    </animated.div>
  );
};
