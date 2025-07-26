import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { useGesture } from "@use-gesture/react";
import { animated } from "@react-spring/web";
import myPDF from "../../shared/assets/pdf/Obrazec.pdf";
import worker from "../../worker/pdf.worker.min.mjs?url";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = worker;

export const PdfViewer2 = () => {
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
          <Page key={i} pageNumber={i + 1} renderAnnotationLayer={false} />
        ))}
      </Document>
    </animated.div>
  );
};
