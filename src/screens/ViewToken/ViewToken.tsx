import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import "./index.css";
import {
  BiExpand,
  BiCreditCardFront,
  BiDotsVerticalRounded,
} from "react-icons/bi";
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
import { TbSearchOff } from "react-icons/tb";
import ImageViewer from "react-simple-image-viewer";
import {
  documentTypes,
  documentPathTypes,
  tokenStatuses,
  viewTokenTypes,
} from "../../constants/constants";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import ContentLoader from "react-content-loader";
import Modal from "react-modal";
import ViewDocument from "../../components/ViewDocument";

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
  weightInKilo?: number;
  value?: number;
  currency?: string;
  creationDate?: number;
};

type TokenDataType = {
  token: TokenType;
  documents: DocumentType;
};

type viewTokenProps = {
  viewTokenType: string;
};

type viewDocumentDataType = {
  uri: string;
  mimeType: string;
};

function ViewToken({ viewTokenType }: viewTokenProps) {
  const [tokenData, setTokenData] = useState<TokenDataType>();
  const [coverImageDocument, setCoverImageDocument] = useState<DocumentType>();
  const [galleryList, setGalleryList] = useState<string[]>([]);
  const [isViewGalleryImages, setIsViewGalleryImages] = useState(false);
  const [viewGalleryImageIndex, setViewGalleryImageIndex] = useState(0);
  const [isViewCoverImage, setIsViewCoverImage] = useState(false);
  const [tokenStatus, setTokenStatus] = useState<string>(tokenStatuses.LOADING);
  const [width, setWidth] = useState(0);
  const [documentGroups, setDocumentGroups] = useState<DocumentGroupType[]>(
    documentTypes.map((type: any) => ({
      name: type.name,
      path: type.path,
      list: [],
    }))
  );
  const [isViewDocument, setIsViewDocument] = useState(false);
  const [viewDocumentData, setViewDocumentData] =
    useState<viewDocumentDataType>({
      uri: "",
      mimeType: "",
    });

  let wrapperRef = useRef<any>();
  const params = useParams();

  useEffect(() => {
    window.addEventListener("resize", getWidth);

    getTokenData();
  }, []);

  useEffect(() => {
    getWidth();
  }, [wrapperRef?.current?.clientWidth]);

  const getWidth = () => {
    setWidth(wrapperRef?.current?.clientWidth);
  };

  const getTokenData = () => {
    if (viewTokenType === viewTokenTypes.PUBLIC_TOKEN) {
      const { tokenId } = params;

      axios
        .get(
          `${process.env.REACT_APP_SERVER_ADDRESS}/meveo/rest/unikbase-token/${tokenId}?mode=public`,
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
            document.title = res?.data?.result?.token?.name;
            setTokenStatus(tokenStatuses.EXIST);
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
          } else {
            setTokenStatus(tokenStatuses.EMPTY);
          }
        })
        .catch((err) => {
          setTokenStatus(tokenStatuses.EMPTY);
        });
    } else if (viewTokenType === viewTokenTypes.SHARED_TOKEN) {
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
            document.title = res?.data?.result?.token?.name;
            setTokenStatus(tokenStatuses.EXIST);
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
          } else {
            setTokenStatus(tokenStatuses.EMPTY);
          }
        })
        .catch((err) => {
          setTokenStatus(tokenStatuses.EMPTY);
        });
    }
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

  const onCloseViewDocument = () => {
    setIsViewDocument(false);
  };

  const onViewDocument = (document: DocumentType) => {
    setViewDocumentData({
      uri: document.fileUrl || "",
      mimeType: document.mimeType,
    });
    setIsViewDocument(true);
  };

  const renderDocument = (document: DocumentType) => {
    const canPreview = !!document.fileUrl;
    return (
      <div
        className={`flex flex-row py-2 pr-4 pl-8 items-center hover:bg-slate-100 rounded-xl ${
          canPreview ? "cursor-pointer" : ""
        } `}
        key={document.uuid}
        onClick={() => canPreview && onViewDocument(document)}
      >
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
    const canPreviewGroup =
      documentGroup.path === documentPathTypes.COVER_IMAGE &&
      !!documentGroup.list[0]?.fileUrl;
    return (
      <div
        className={`rounded-xl border-2 border-gray-300 w-full mt-8 overflow-hidden ${
          canPreviewGroup ? "cursor-pointer" : ""
        }`}
        key={documentGroup.path}
        onClick={() => canPreviewGroup && onViewDocument(documentGroup.list[0])}
      >
        <div className="flex flex-row rounded-xl p-4 w-full items-center hover:bg-slate-100">
          <p className="font-semibold text-2xl flex flex-1">
            {documentGroup.name}
          </p>
          {canPreviewGroup && (
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

  const renderDocumentPreview = (key: number) => {
    const width = 150 + Math.random() * 150;
    return (
      <div
        className="flex flex-row py-2 pr-4 pl-8 items-center hover:bg-slate-100 rounded-xl"
        key={key}
      >
        <BiDotsVerticalRounded className="font-semibold text-xl mr-2" />
        <ContentLoader viewBox={`0 0 ${width} 28`} className="h-7">
          <rect x="0" y="0" rx="0" ry="0" width={`${width}`} height="28" />
        </ContentLoader>
      </div>
    );
  };
  const renderDocumentGroupPreview = (key: number) => {
    const width = 150 + Math.random() * 200;
    const numDocument = Math.round(Math.random() * 4);
    return (
      <div
        key={key}
        className="rounded-xl border-2 border-gray-300 w-full mt-8 overflow-hidden"
      >
        <div className="flex flex-column rounded-xl p-4 w-full items-center hover:bg-slate-100">
          <ContentLoader viewBox={`0 0 ${width} 32`} className="h-8">
            <rect x="0" y="0" rx="0" ry="0" width={`${width}`} height="32" />
          </ContentLoader>
        </div>
        {new Array(numDocument)
          .fill("")
          .map((e, index) => renderDocumentPreview(index))}
      </div>
    );
  };

  const renderContentLoader = () => {
    return (
      <div className="flex items-center justify-center">
        <div className="w-full max-w-4xl self-center" ref={wrapperRef}>
          <div className="w-full h-64 relative">
            <ContentLoader viewBox={`0 0 ${width} 256`}>
              <rect x="0" y="0" rx="0" ry="0" width={`${width}`} height="256" />
            </ContentLoader>
          </div>
          <div className="px-4">
            <div className="flex flex-row items-center py-8 border-b-2">
              <BiCreditCardFront className="text-3xl" />
              <ContentLoader viewBox="0 0 128 40" className="w-32 ml-6">
                <rect x="0" y="0" rx="8" ry="8" width="128" height="40" />
              </ContentLoader>
            </div>
            <div className="py-8">
              <ContentLoader viewBox="0 0 384 60" className="w-96">
                <rect x="0" y="0" rx="8" ry="8" width="384" height="60" />
              </ContentLoader>
            </div>
          </div>{" "}
          <div className="px-4">
            <div className="flex flex-row items-center py-8 border-b-2">
              <RiMoneyDollarBoxLine className="text-3xl" />
              <p className="ml-6 font-semibold text-3xl">Specifications</p>
            </div>
            <div className="py-8">
              <ContentLoader viewBox="0 0 224 28" className="w-56 ml-4">
                <rect x="0" y="0" rx="8" ry="8" width="224" height="28 " />
              </ContentLoader>
              <ContentLoader viewBox="0 0 192 28" className="w-48 ml-4 mt-4">
                <rect x="0" y="0" rx="8" ry="8" width="192" height="28 " />
              </ContentLoader>
            </div>
            <div className="flex flex-row justify-between flex-wrap pb-8">
              <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                <div className="w-24 h-24 bg-box-length rounded-full flex justify-center items-center flex-col">
                  <CgRuler className="text-4xl -rotate-45" />
                  <p className="text-gray-500 mt-2">Length</p>
                </div>
                <div className="px-4 items-center flex flex-1">
                  <ContentLoader viewBox="0 0 128 40" className="w-32">
                    <rect x="0" y="0" rx="8" ry="8" width="128" height="40" />
                  </ContentLoader>
                </div>
              </div>
              <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                <div className="w-24 h-24 bg-box-depth rounded-full flex justify-center items-center flex-col">
                  <AiOutlineColumnHeight className="text-4xl" />
                  <p className="text-gray-500 mt-2">Depth</p>
                </div>
                <div className="px-4 items-center flex flex-1">
                  <ContentLoader viewBox="0 0 128 40" className="w-32">
                    <rect x="0" y="0" rx="8" ry="8" width="128" height="40" />
                  </ContentLoader>
                </div>
              </div>
              <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                <div className="w-24 h-24 bg-box-width rounded-full flex justify-center items-center flex-col">
                  <AiOutlineColumnWidth className="text-4xl" />
                  <p className="text-gray-500 mt-2">Width</p>
                </div>
                <div className="px-4 items-center flex flex-1">
                  <ContentLoader viewBox="0 0 128 40" className="w-32">
                    <rect x="0" y="0" rx="8" ry="8" width="128" height="40" />
                  </ContentLoader>
                </div>
              </div>
              <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                <div className="w-24 h-24 bg-box-weight rounded-full flex justify-center items-center flex-col">
                  <RiScales2Line className="text-4xl" />
                  <p className="text-gray-500 mt-2">Weight</p>
                </div>
                <div className="px-4 items-center flex flex-1">
                  <ContentLoader viewBox="0 0 128 40" className="w-32">
                    <rect x="0" y="0" rx="8" ry="8" width="128" height="40" />
                  </ContentLoader>
                </div>
              </div>
            </div>
          </div>
          <div className="px-4">
            <div className="flex flex-row items-center py-8 border-b-2">
              <FaRegImages className="text-3xl" />
              <p className="ml-6 font-semibold text-3xl">Gallery</p>
            </div>
            <div className="flex flex-row justify-between flex-wrap pb-8">
              <div className="mt-8 w-full justify-center flex">
                <Carousel
                  centerMode
                  centerSlidePercentage={80}
                  infiniteLoop
                  showThumbs={false}
                  swipeable
                  onClickItem={onViewGalleryImage}
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      tokenStatus === tokenStatuses.LOADING && (
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
                      tokenStatus === tokenStatuses.LOADING && (
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
                  {["", "", ""].map((e, index) => {
                    const imgWidth = Math.max((width - 100) * 0.8 + 30, 0);
                    return (
                      <div className="px-4" key={index}>
                        <ContentLoader
                          viewBox={`0 0 ${imgWidth} 256`}
                          className="h-64 w-full"
                        >
                          <rect
                            x="0"
                            y="0"
                            rx="8"
                            ry="8"
                            width={`${imgWidth}`}
                            height="256"
                          />
                        </ContentLoader>
                      </div>
                    );
                  })}
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
              {["", "", ""].map((e, index) =>
                renderDocumentGroupPreview(index)
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTokenData = () => {
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
              <div className="flex flex-row">
                <p className="text-xl text-gray-500 font-medium ">
                  Token origin:
                </p>
                <p className="text-xl text-gray-500 ml-4 font-semibold">
                  The Packagers
                </p>
              </div>
              {typeof tokenData?.token?.value !== "undefined" &&
                typeof tokenData?.token?.currency !== "undefined" && (
                  <div className="flex flex-row">
                    <p className="text-xl text-gray-500 font-medium">Price:</p>
                    <p className="text-xl text-gray-500 ml-4 font-semibold">{`${tokenData?.token?.value} ${tokenData?.token?.currency}`}</p>
                  </div>
                )}
            </div>
            <div className="flex flex-row justify-between flex-wrap pb-8">
              {typeof tokenData?.token?.lengthInMeter !== "undefined" && (
                <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                  <div className="w-24 h-24 bg-box-length rounded-full flex justify-center items-center flex-col">
                    <CgRuler className="text-2xl -rotate-45" />
                    <p className="text-gray-500 mt-2">Length</p>
                  </div>
                  <div className="px-4 items-center flex flex-1">
                    <p className="text-xl font-bold text-gray-500 break-all">{`${tokenData?.token?.lengthInMeter} m`}</p>
                  </div>
                </div>
              )}
              {typeof tokenData?.token?.depthInMeter !== "undefined" && (
                <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                  <div className="w-24 h-24 bg-box-depth rounded-full flex justify-center items-center flex-col">
                    <AiOutlineColumnHeight className="text-2xl" />
                    <p className="text-gray-500 mt-2">Depth</p>
                  </div>
                  <div className="px-4 items-center flex flex-1">
                    <p className="text-xl font-bold text-gray-500 break-all">{`${tokenData?.token?.depthInMeter} m`}</p>
                  </div>
                </div>
              )}
              {typeof tokenData?.token?.widthInMeter !== "undefined" && (
                <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                  <div className="w-24 h-24 bg-box-width rounded-full flex justify-center items-center flex-col">
                    <AiOutlineColumnWidth className="text-2xl" />
                    <p className="text-gray-500 mt-2">Width</p>
                  </div>
                  <div className="px-4 items-center flex flex-1">
                    <p className="text-xl font-bold text-gray-500 break-all">{`${tokenData?.token?.widthInMeter} m`}</p>
                  </div>
                </div>
              )}
              {typeof tokenData?.token?.weightInKilo !== "undefined" && (
                <div className="mt-8 border-2 md:w-p-48 w-full rounded-full flex-row flex overflow-hidden">
                  <div className="w-24 h-24 bg-box-weight rounded-full flex justify-center items-center flex-col">
                    <RiScales2Line className="text-2xl" />
                    <p className="text-gray-500 mt-2">Weight</p>
                  </div>
                  <div className="px-4 items-center flex flex-1">
                    <p className="text-xl font-bold text-gray-500 break-all">{`${tokenData?.token?.weightInKilo} kg`}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="px-4">
            <div className="flex flex-row items-center py-8 border-b-2">
              <FaRegImages className="text-3xl" />
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
                  showIndicators={
                    !isViewCoverImage && !isViewGalleryImages && !isViewDocument
                  }
                  onClickItem={onViewGalleryImage}
                  renderArrowPrev={(clickHandler, hasPrev) => {
                    return (
                      !isViewCoverImage &&
                      !isViewGalleryImages &&
                      !isViewDocument && (
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
                      !isViewGalleryImages &&
                      !isViewDocument && (
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
                  {galleryList.map((url, index) => (
                    <div className="px-4" key={index}>
                      <img
                        alt="gallery"
                        src={url}
                        className="h-64 rounded-lg object-cover"
                      />
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
  };

  return (
    <div>
      {tokenStatus === tokenStatuses.EXIST
        ? renderTokenData()
        : renderContentLoader()}
      <Modal
        isOpen={tokenStatus === tokenStatuses.EMPTY}
        contentLabel="Example Modal"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: 0,
          },
          overlay: {
            backgroundColor: "#00000077",
          },
        }}
      >
        <div className="flex flex-row items-center text-gray-600">
          <TbSearchOff className="text-3xl" />
          <p className="text-3xl font-bold text-gray-600 ml-4">Unknown token</p>
        </div>
      </Modal>
      <ViewDocument
        visible={isViewDocument}
        onClose={onCloseViewDocument}
        uri={viewDocumentData.uri}
        mimeType={viewDocumentData.mimeType}
      />
    </div>
  );
}

export default ViewToken;
