import { Worker, Viewer, SpecialZoomLevel } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
import { toolbarPlugin } from "@react-pdf-viewer/toolbar";

export const PdfViewer2 = () => {
  const zoomPluginInstance = zoomPlugin();
  const toolbarPluginInstance = toolbarPlugin();
  return (
    <div
      style={{
        height: "100vh",
        width: "100%", // важно!
        overflow: "auto",
        touchAction: "manipulation",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
        <Viewer
          fileUrl={"/pdf/Obrazec.pdf"}
          plugins={[toolbarPluginInstance, zoomPluginInstance]}
          defaultScale={SpecialZoomLevel.PageWidth}
        />
      </Worker>
    </div>
  );
};
