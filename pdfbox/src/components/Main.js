import React, { useState, useEffect, useContext, useRef } from "react";
import clsx from "clsx";
import WebViewer from "@pdftron/webviewer";
import classes from "../styles/Main.module.css";
import Search from "./Search";
import Upload from "./Upload";
import Favourites from "./Favourites";
import Folders from "./Folders";
import AllDocs from "./AllDocs";
import Alert from "./Alert";
import Progress from "./Progress";
import ThemeContext from "../Contexts/Context";
import axios from "axios";
import Modal from "./Modal";
import FolModal from "./FolModal";

const Main = ({ showInfo }) => {
  const [progress, setProgress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showFolModal, setShowFolModal] = useState(false);
  const viewer = useRef();
  const viewerB = useRef();
  const [error, setError] = useState("");
  const [docs, setDocs] = useState([]);
  const [folders, setFolders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const { isDarkMode } = useContext(ThemeContext);

  const fetchDocs = async () => {
    try {
      await fetch("http://localhost:5000/doc")
        .then((res) => res.json())
        .then((docs) => {
          setDocs(docs.data);
          setLoading(false);
        });
    } catch (err) {
      console.log(err);
    }
  };
  const fetchFolders = async () => {
    try {
      await fetch("http://localhost:5000/folder")
        .then((res) => res.json())
        .then((fols) => {
          setFolders(fols.data);
        });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchFolders();
    fetchDocs();
  }, []);
  const searchDocs = (str) => {
    if (str.length > 0) {
      setSearchTerm(str);
    } else {
      setSearchTerm("");
    }

    // setDocs(allDocs);
  };
  useEffect(() => {
    const newDocs = [...docs];
    const results = newDocs.filter((doc) =>
      doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  }, [searchTerm]);

  const sortAllDocs = () => {};
  const selectDoc = () => {};
  const toggleFav = async (id, fav) => {
    let updatedDocs = [...docs];
    const docIndex = docs.findIndex((d) => d._id === id);
    updatedDocs[docIndex].fav = !updatedDocs[docIndex].fav;
    setDocs(updatedDocs);
    const res = await axios
      .post("http://localhost:5000/doc/toggleFav", {
        fileId: id,
        favourite: !fav,
      })
      .catch((err) => {
        console.log(err);
      });
    if (res.status === 200) {
      // window.location.reload();
    }
  };
  async function uploadFileHandler(formData) {
    setProgress(true);
    const config = {
      headers: { "content-type": "multipart/form-data" },
      onUploadProgress: (event) => {
        console.log(
          `Current progress:`,
          Math.round((event.loaded * 100) / event.total)
        );
      },
    };
    const response = await axios.post(
      "http://localhost:5000/doc/uploadfile",
      formData,
      config
    );
    if (response.status === 200) {
      console.log(response.data.data);
      await extractAndSaveThumbOne(
        response.data.data.pdfFile,
        response.data.data._id
      );

      // extractAndSaveThumbTwo(response.data.data.pdfFile);

      // window.location.reload();
    }
  }
  const extractAndSaveThumbTwo = (file) => {
    WebViewer(
      {
        path: "/lib",
        initialDoc: file,
      },
      viewerB.current
    ).then((instance) => {
      const { documentViewer } = instance.Core;
      documentViewer.addEventListener("documentLoaded", () => {
        const doc = documentViewer.getDocument();
        const pageNum = 1;
        doc.loadThumbnailAsync(pageNum, (thumbnail) => {
          console.log(thumbnail.toDataURL());
          setProgress(false);
          if (viewerB.current.children[0]) {
            viewerB.current.removeChild(viewerB.current.children[0]);
          }
        });
      });
    });
  };
  const extractAndSaveThumbOne = (file, fileID) => {
    WebViewer(
      {
        path: "/lib",
        initialDoc: file,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer } = instance.Core;
      documentViewer.addEventListener("documentLoaded", () => {
        const doc = documentViewer.getDocument();
        const pageNumber = 1;
        doc.loadCanvasAsync({
          pageNumber,
          zoom: 0, // render at twice the resolution
          drawComplete: async (thumbnail) => {
            // optionally comment out "drawAnnotations" below to exclude annotations
            // await instance.Core.documentViewer
            //   .getAnnotationManager()
            //   .drawAnnotations(pageNumber, thumbnail);
            // thumbnail is a HTMLCanvasElement or HTMLImageElement
            // const netPdf = window.PDFNet;

            saveThumbA(String(thumbnail.toDataURL()), fileID);
            saveThumbB(String(thumbnail.toDataURL()), fileID);
            setProgress(false);
            window.location.reload();
          },
        });
      });
    });
  };
  const saveThumbA = async (thumbnail, id) => {
    await axios
      .post("http://localhost:5000/doc/addThumb", {
        fileId: id,
        thumbA: thumbnail,
      })
      .then((res) => {
        // console.log(res);
      })

      .catch((err) => {
        // console.log(err);
      });
  };
  const saveThumbB = async (thumbnail, id) => {
    await axios
      .post("http://localhost:5000/doc/addThumbB", {
        fileId: id,
        thumbB: thumbnail,
      })
      .then((res) => {
        // console.log(res);
      })

      .catch((err) => {
        // console.log(err);
      });
  };
  const deleteFile = async (id) => {
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:5000/doc/delete/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const updatedDocs = docs.filter((doc) => doc._id !== id);
        setDocs(updatedDocs);

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const showCreateDoc = () => {
    setShowModal(true);
  };
  const showCreateFol = () => {
    setShowFolModal(true);
  };
  const createFolderHandler = async (folderName) => {
    try {
      setProgress(true);
      const currDate = new Date();
      const response = await axios.post("http://localhost:5000/folder/create", {
        name: folderName,
        created: currDate,
        modified: currDate,
      });
      if (response.status === 200) {
        setProgress(false);
        // console.log(response.data.data);
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className={classes.MainWrapper}>
      {showModal && <Modal hideModal={setShowModal} />}
      {showFolModal && (
        <FolModal
          hideModal={setShowFolModal}
          createFolderHandler={createFolderHandler}
        />
      )}
      {loading && <Progress text="Loading..." />}
      {progress && <Progress text="Updating..." />}
      {/* Docs Title */}
      <div
        className={clsx(
          classes.userAndTitle,
          isDarkMode && classes.userAndTitleDark
        )}
      >
        <div
          className={clsx(classes.userIcon, isDarkMode && classes.userIconDark)}
        >
          AM
        </div>
        <div className={clsx(classes.title, isDarkMode && classes.titleDark)}>
          My Documents
        </div>
      </div>
      {/* Upload Section */}

      <Upload
        uploadFileHandler={uploadFileHandler}
        setError={setError}
        deleteFile={deleteFile}
        showCreateDoc={showCreateDoc}
        showCreateFol={showCreateFol}
      />
      {/* Main Docs */}

      <div
        className={clsx(
          classes.mainSectionWrapper,
          isDarkMode && classes.mainSectionWrapperDark
        )}
      >
        <div
          className={clsx(
            classes.mainSection,
            isDarkMode && classes.mainSectionDark
          )}
        >
          {error && (
            <Alert danger={true} message={error} showAlert={setError} />
          )}
          {/* Search */}
          <Search searchedDocs={searchDocs} sortAllDocs={sortAllDocs} />
          {/* Favourites */}
          <Favourites
            theDocs={docs}
            theFols={folders}
            toggleFav={toggleFav}
            showInfo={showInfo}
            selectDoc={selectDoc}
          />

          <Folders
            theFols={folders}
            toggleFav={toggleFav}
            showInfo={showInfo}
            selectDoc={selectDoc}
          />

          {searchTerm ? (
            <AllDocs
              theDocs={searchResults}
              toggleFav={toggleFav}
              showInfo={showInfo}
              selectDoc={selectDoc}
            />
          ) : (
            <AllDocs
              theDocs={docs}
              toggleFav={toggleFav}
              showInfo={showInfo}
              selectDoc={selectDoc}
            />
          )}
        </div>
      </div>
      <div ref={viewer} hidden></div>
      <div ref={viewerB} hidden></div>
    </div>
  );
};
export default Main;
