import React, { useRef, useEffect } from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; // Import Sun Editor's CSS File

const SunEdit = () => {
  return (
    <div>
      <SunEditor placeholder="Please type here..." />
    </div>
  );
};

export default SunEdit;
