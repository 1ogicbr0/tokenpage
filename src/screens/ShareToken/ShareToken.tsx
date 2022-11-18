import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import {
  BiExpand,
  BiCreditCardFront,
  BiDotsVerticalRounded,
} from "react-icons/bi";
import { SiCodesandbox } from "react-icons/si";
import { FaRegImages } from "react-icons/fa";
import { RiMoneyDollarBoxLine, RiScales2Line } from "react-icons/ri";
import {
  AiOutlineColumnHeight,
  AiOutlineColumnWidth,
  AiOutlineCloudDownload,
} from "react-icons/ai";
import { GrDocumentStore } from "react-icons/gr";
import { HiOutlineChevronLeft, HiOutlineChevronRight } from "react-icons/hi";
import { CgRuler } from "react-icons/cg";
import ImageViewer from "react-simple-image-viewer";
import { documentTypes, documentPathTypes } from "../../constants/constants";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

type DocumentType = {
  uuid: string;
  path: string;
  name: string;
  filename: string;
  mimeType: string;
  lastUpdate: number;
  size: number;
  creationDate?: number;
  fileUrl?: string;
};

type DocumentGroupType = {
  name: string;
  path: string;
  list: DocumentType[];
};

type TokenType = {
  uuid: string;
  code: string;
  name?: string;
  description?: string;
  lengthInMeter?: number;
  widthInMeter?: number;
  depthInMeter?: number;
  weightInMeter?: number;
  value?: number;
  currency?: string;
  creationDate?: number;
};

type TokenDataType = {
  token: TokenType;
  documents: DocumentType;
};

function PublicToken() {
  const [tokenData, setTokenData] = useState<TokenDataType>();
  const [coverImageDocument, setCoverImageDocument] = useState<DocumentType>();
  const [galleryList, setGalleryList] = useState<string[]>([]);
  const [isViewGalleryImages, setIsViewGalleryImages] = useState(false);
  const [viewGalleryImageIndex, setViewGalleryImageIndex] = useState(0);
  const [isViewCoverImage, setIsViewCoverImage] = useState(false);
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupType[]>(
    documentTypes.map((type: any) => ({
      name: type.name,
      path: type.path,
      list: [],
    }))
  );
  const params = useParams();

  useEffect(() => {
    getTokenData();
  }, []);

  const getTokenData = () => {
    const { shareHash } = params;

    axios
      .get(
        `${process.env.REACT_APP_SERVER_ADDRESS}/meveo/rest/unikbase-token/shared?shareHash=${shareHash}`,
        {
          headers: {},
        }
      )
      .then((res) => {
        if (res?.data?.result) {
          let updateDocument = documentTypes.map((type: any) => ({
            name: type.name,
            path: type.path,
            list: [],
          }));
          res?.data?.result.documents.forEach((document: any) => {
            updateDocument.map(
              (d: any) => d.path === document.path && d.list.push(document)
            );
          });
          setGalleryList(
            res?.data?.result.documents
              .filter(
                (document: DocumentType) =>
                  document.path === documentPathTypes.GALLERY
              )
              .map((document: DocumentType) => document.fileUrl)
          );
          setDocumentGroups(updateDocument);

          setTokenData(res.data?.result);
          setCoverImageDocument(
            res?.data?.result.documents.find(
              (document: any) => document.path === "coverImage"
            )
          );
        }
      });
  };

  const onViewCoverImage = () => {
    setIsViewCoverImage(true);
  };

  const onHideCoverImage = () => setIsViewCoverImage(false);

  const onViewGalleryImage = (index: number) => {
    setIsViewGalleryImages(true);
    setViewGalleryImageIndex(index);
  };

  const onHideViewGalleryImages = () => setIsViewGalleryImages(false);

  const onDownloadDocument = (documentFile: DocumentType) => {
    let link: any = { element: document.createElement("a") };
    link.element.href = documentFile.fileUrl;
    document.body.appendChild(link.element);
    link.element.click();
    document.body.removeChild(link.element);
    delete link.element;
  };

  const renderDocument = (document: DocumentType) => {
    return (
      <div className="flex flex-row py-2 pr-4 pl-8 items-center hover:bg-slate-100 rounded-xl">
        <BiDotsVerticalRounded className="font-semibold text-xl mr-2" />
        <p className="font-semibold text-xl flex flex-1">{document.name}</p>
        {!!document.fileUrl && (
          <button className="px-4" onClick={() => onDownloadDocument(document)}>
            <AiOutlineCloudDownload className="font-semibold text-3xl hover:text-sky-700" />
          </button>
        )}
      </div>
    );
  };

  const renderDocumentGroup = (documentGroup: DocumentGroupType) => {
    return (
      <div className="rounded-xl border-2 border-gray-300 w-full mt-8 overflow-hidden">
        <div className="flex flex-row rounded-xl p-4 w-full items-center hover:bg-slate-100">
          <p className="font-semibold text-2xl flex flex-1">
            {documentGroup.name}
          </p>
          {documentGroup.path === documentPathTypes.COVER_IMAGE &&
            !!documentGroup.list[0]?.fileUrl && (
              <button
                className="px-4"
                onClick={() => onDownloadDocument(documentGroup.list[0])}
              >
                <AiOutlineCloudDownload className="font-semibold text-3xl hover:text-sky-700" />
              </button>
            )}
        </div>
        {documentGroup.path !== documentPathTypes.COVER_IMAGE &&
          documentGroup.list.map((document) => renderDocument(document))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-4xl self-center">
        <div className="w-full h-64 relative">
          <img
            alt="cover"
            src={coverImageDocument?.fileUrl}
            className="w-full h-full object-cover"
          />
          <button
            className="w-12 h-12 absolute right-2 bottom-2 justify-center items-center flex rounded-full opacity-70 hover:text-blue-600"
            onClick={onViewCoverImage}
          >
            <BiExpand className="text-3xl" />
          </button>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <BiCreditCardFront className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">
              {tokenData?.token?.name}
            </p>
          </div>
          <div className="py-8">
            <p className="text-xl text-gray-500 font-medium">
              {tokenData?.token?.description}
            </p>
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <RiMoneyDollarBoxLine className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">Specifications</p>
          </div>
          <div className="py-8">
            <p className="text-xl text-gray-500 font-medium flex-row flex">
              Token origin:
              <p className="text-gray-900 ml-4 font-semibold">The Packagers</p>
            </p>
            <p className="text-xl text-gray-500 font-medium flex-row flex">
              Price:
              <p className="text-gray-900 ml-4 font-semibold">{`${tokenData?.token?.value} ${tokenData?.token?.currency}`}</p>
            </p>
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <SiCodesandbox className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">Dimensions</p>
          </div>
          <div className="flex flex-row justify-between flex-wrap pb-8">
            <div className="mt-8 border-2 md:w-5/12 w-full rounded-full flex-row flex overflow-hidden">
              <div className="w-36 h-36 bg-box-length rounded-full flex justify-center items-center flex-col">
                <CgRuler className="text-4xl -rotate-45" />
                <p className="text-gray-500 mt-2">Length</p>
              </div>
              <div className="px-4 items-center flex flex-auto">
                <p className="text-4xl font-bold text-gray-500">{`${tokenData?.token?.lengthInMeter} m`}</p>
              </div>
            </div>
            <div className="mt-8 border-2 md:w-5/12 w-full rounded-full flex-row flex overflow-hidden">
              <div className="w-36 h-36 bg-box-depth rounded-full flex justify-center items-center flex-col">
                <AiOutlineColumnHeight className="text-4xl" />
                <p className="text-gray-500 mt-2">Depth</p>
              </div>
              <div className="px-4 items-center flex flex-auto">
                <p className="text-4xl font-bold text-gray-500">{`${tokenData?.token?.depthInMeter} m`}</p>
              </div>
            </div>
            <div className="mt-8 border-2 md:w-5/12 w-full rounded-full flex-row flex overflow-hidden">
              <div className="w-36 h-36 bg-box-width rounded-full flex justify-center items-center flex-col">
                <AiOutlineColumnWidth className="text-4xl" />
                <p className="text-gray-500 mt-2">Width</p>
              </div>
              <div className="px-4 items-center flex flex-auto">
                <p className="text-4xl font-bold text-gray-500">{`${tokenData?.token?.widthInMeter} m`}</p>
              </div>
            </div>
            <div className="mt-8 border-2 md:w-5/12 w-full rounded-full flex-row flex overflow-hidden">
              <div className="w-36 h-36 bg-box-weight rounded-full flex justify-center items-center flex-col">
                <RiScales2Line className="text-4xl" />
                <p className="text-gray-500 mt-2">Weight</p>
              </div>
              <div className="px-4 items-center flex flex-auto">
                <p className="text-4xl font-bold text-gray-500">{`${tokenData?.token?.weightInMeter} kg`}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <FaRegImages className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">Gallery</p>
          </div>
          <div className="flex flex-row justify-between flex-wrap pb-8">{}</div>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <GrDocumentStore className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">Gallery</p>
          </div>
          <div className="flex flex-row justify-between flex-wrap pb-8">
            <div className="mt-8">
              <Carousel
                centerMode
                centerSlidePercentage={80}
                infiniteLoop
                showThumbs={false}
                swipeable
                onClickItem={onViewGalleryImage}
                renderArrowPrev={(clickHandler, hasPrev) => {
                  return (
                    !isViewCoverImage &&
                    !isViewGalleryImages && (
                      <div className="top-0 bottom-0 flex absolute z-10">
                        <button
                          onClick={clickHandler}
                          className="bg-zinc-200 hover:bg-zinc-300 opacity-40 hover:opacity-80 w-14 h-14 rounded-full justify-center items-center flex self-center"
                        >
                          <HiOutlineChevronLeft className="text-3xl" />
                        </button>
                      </div>
                    )
                  );
                }}
                renderArrowNext={(clickHandler) => {
                  return (
                    !isViewCoverImage &&
                    !isViewGalleryImages && (
                      <div className="top-0 bottom-0 right-0 flex absolute z-10">
                        <button
                          onClick={clickHandler}
                          className="bg-zinc-200 hover:bg-zinc-300 opacity-40 hover:opacity-80 w-14 h-14 rounded-full justify-center items-center flex self-center"
                        >
                          <HiOutlineChevronRight className="text-3xl" />
                        </button>
                      </div>
                    )
                  );
                }}
              >
                {galleryList.map((url) => (
                  <div className="px-4">
                    <img alt="gallery" src={url} className="h-64 rounded-lg" />
                  </div>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
        <div className="px-4">
          <div className="flex flex-row items-center py-8 border-b-2">
            <GrDocumentStore className="text-3xl" />
            <p className="ml-6 font-semibold text-3xl">Documents</p>
          </div>
          <div className="flex flex-row justify-between flex-wrap pb-8">
            {documentGroups
              .filter((group) => group.list.length > 0)
              .map((group) => renderDocumentGroup(group))}
          </div>
        </div>
      </div>
      {isViewCoverImage && (
        <ImageViewer
          src={[coverImageDocument?.fileUrl || ""]}
          currentIndex={0}
          closeOnClickOutside
          onClose={onHideCoverImage}
        />
      )}
      {isViewGalleryImages && (
        <ImageViewer
          src={galleryList}
          currentIndex={viewGalleryImageIndex}
          closeOnClickOutside
          onClose={onHideViewGalleryImages}
        />
      )}
    </div>
  );
}

export default PublicToken;
