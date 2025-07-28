import { SpecialZoomLevel, Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
// import { zoomPlugin } from "@react-pdf-viewer/zoom";
import "@react-pdf-viewer/toolbar/lib/styles/index.css";
// import { toolbarPlugin } from "@react-pdf-viewer/toolbar";
import { useGesture } from "@use-gesture/react";
import { useRef, useState } from "react";

export const PdfViewer2 = () => {
  const [crop, setCrop] = useState({ x: 0, y: 0, scale: 1 });
  const docRef = useRef(null);
  useGesture(
    {
      onDrag: ({ offset: [dx, dy] }: { offset: [number, number] }) => {
        setCrop((crop) => ({ ...crop, x: dx, y: dy }));
      },
      onPinch: ({ offset: [d] }) => {
        setCrop((crop) => ({ ...crop, scale: 1 + d / 50 }));
      },
    },
    { target: docRef, eventOptions: { passive: false } },
  );
  // const zoomPluginInstance = zoomPlugin({ enableShortcuts: true });

  // const toolbarPluginInstance = toolbarPlugin();

  // const { Toolbar } = toolbarPluginInstance;
  return (
    <>
      <div>
        x: {crop.x}, y={crop.y}
      </div>
      <div
        style={{
          overflow: "hidden",
          width: "100%",
          height: "100vh",
          // WebkitOverflowScrolling: "touch",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100vh",
            touchAction: "none",
            left: `${crop.x}`,
            top: `${crop.y}`,
            // overflow: "auto",
            transform: `scale(${crop.scale})`,
            position: "relative",
          }}
          ref={docRef}
        >
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            {/*<div>*/}
            {/*  <Toolbar />*/}
            {/*</div>*/}
            {/*<PinchToZoom>*/}

            <Viewer
              fileUrl={"/pdf/Obrazec.pdf"}
              // plugins={[zoomPluginInstance, toolbarPluginInstance]}
              defaultScale={SpecialZoomLevel.PageWidth}
            />
            {/*</PinchToZoom>*/}
          </Worker>
        </div>
      </div>
    </>
  );
};
