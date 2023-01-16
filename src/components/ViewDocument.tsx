import { useState } from "react";
import ImageViewer from "react-simple-image-viewer";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import Modal from "react-modal";
import { imageMimeTypes, pdfMimeType } from "../constants/constants";
import { VscChromeClose } from "react-icons/vsc";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import { defaultLayoutPlugin } from "@react-pdf-viewer/default-layout";
import "@react-pdf-viewer/core/lib/styles/index.css";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";

type ViewDocumentProps = {
  uri: string;
  mimeType: string;
  visible: boolean;
  onClose: () => void;
};

function ViewDocument({ uri, mimeType, visible, onClose }: ViewDocumentProps) {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const renderViewer = () => {
    if (imageMimeTypes.includes(mimeType)) {
      return (
        <ImageViewer
          src={[uri]}
          currentIndex={0}
          closeOnClickOutside
          onClose={onClose}
        />
      );
    } else if (mimeType === pdfMimeType) {
      return (
        <div className=" bg-gray-300 flex flex-1 justify-center ">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.1.81/build/pdf.worker.min.js">
            <Viewer fileUrl={uri} plugins={[defaultLayoutPluginInstance]} />
          </Worker>
          <button
            className=" bg-gray-500 w-12 h-12 rounded-full justify-center items-center flex absolute top-12 right-12"
            onClick={onClose}
          >
            <VscChromeClose className="text-3xl text-white" />
          </button>
        </div>
      );
    }
  };

  return (
    <Modal isOpen={visible} className="flex h-full">
      {renderViewer()}
    </Modal>
  );
}

export default ViewDocument;
