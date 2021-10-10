import React, { useRef, useEffect, useState, useContext } from "react";
import WebViewer from "@pdftron/webviewer";
import ThemeContext from "../Contexts/Context";
import { useParams } from "react-router";
import axios from "axios";

const PdfTron = () => {
  // const [doc, setDoc] = useState();
  const { isDarkMode } = useContext(ThemeContext);
  const { id } = useParams();
  const viewer = useRef(null);
  const saveAnnotation = async (id, annot) => {
    const result = await axios
      .put("http://localhost:5000/doc/updatePdf", {
        fileId: id,
        annotString: annot,
        modifiedDate: new Date(),
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    const res = axios
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
          // isDarkMode
          //   ? instance.UI.setTheme("dark")
          //   : instance.UI.setTheme("light");
          const { documentViewer, annotationManager, Annotations } =
            instance.Core;
          documentViewer.addEventListener("documentLoaded", () => {
            annotationManager.importAnnotations(res.data.annot);
          });

          instance.setHeaderItems((header) => {
            header.push({
              type: "actionButton",
              img: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/></svg>',
              onClick: async () => {
                saveAnnotation(
                  res.data._id,
                  await annotationManager.exportAnnotations({
                    links: false,
                    widgets: false,
                  })
                );
              },
            });
          });
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className="MyComponent">
      <div className="webviewer" ref={viewer} style={{ height: "100vh" }}></div>
    </div>
  );
};
export default PdfTron;
