import React, { useRef, useEffect, useContext, useState } from "react";
import WebViewer from "@pdftron/webviewer";
import ThemeContext from "../Contexts/Context";
import { useParams } from "react-router";
import axios from "axios";
import Progress from "./Progress";
const PdfTron = () => {
  const { isDarkMode } = useContext(ThemeContext);
  const { id } = useParams();
  const viewer = useRef(null);
  const saveAnnotation = async (id, annot) => {
    await axios
      .post("http://localhost:5000/doc/updatePdf", {
        fileId: id,
        annotString: annot,
        modifiedDate: new Date(),
      })
      .then((res) => {
        console.log(res);
      })

      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get(`http://localhost:5000/doc/view/${id}`)
      .then((res) => {
        // setDoc(res.data);
        // console.log(doc.pdfFile);

        WebViewer(
          {
            path: "../lib",
            initialDoc: `${res.data.pdfFile}`,
          },
          viewer.current
        ).then((instance) => {
          isDarkMode
            ? instance.UI.setTheme("dark")
            : instance.UI.setTheme("light");
          const { documentViewer, annotationManager } = instance.Core;

          documentViewer.addEventListener("documentLoaded", () => {
            annotationManager.importAnnotations(res.data.annot);
          });
          annotationManager.addEventListener(
            "annotationChanged",
            async (annotations, action, { imported }) => {
              // If the event is triggered by importing then it can be ignored
              // This will happen when importing the initial annotations
              // from the server or individual changes from other users

              if (imported) return;
              //  await annotationManager.exportAnnotCommand();
              saveAnnotation(
                res.data._id,
                await annotationManager.exportAnnotations({
                  links: false,
                  widgets: false,
                })
              );
            }
          );
        });
      })
      .catch((err) => console.log(err));
  }, [isDarkMode, id]);
  return (
    <>
      {/* {saving && <Progress />} */}
      <div className="MyComponent">
        <div
          className="webviewer"
          ref={viewer}
          style={{ height: "100vh" }}
        ></div>
      </div>
    </>
  );
};
export default PdfTron;
