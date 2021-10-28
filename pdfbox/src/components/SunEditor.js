import React, { useRef, useEffect } from "react";
import SunEditor, { buttonList, image } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEdit = () => {
  return (
    <SunEditor
      setOptions={{
        height: "100%",
        buttonList: [["image"]], // Or Array of button list, eg. [['font', 'align'], ['image']]
        plugins: [
          image,
          /** command */
        ],
        // Other option
      }}
    />
  );
};

export default SunEdit;
