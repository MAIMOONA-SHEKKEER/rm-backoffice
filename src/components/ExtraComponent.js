import React from "react";
import CustomButton from "../styled-components/CustomButton";

function ExtraComponent() {
  const handleGenerate = () => {
    const url = `http://localhost:8085/document?userName=JohnDoe`;
    window.open(url, "_blank");
  };

  const downloadPdf = async () => {
    const url = `http://localhost:8085/document/pdf?userName=John`;
    window.open(url, "_blank");
  };

  return (
    <>
      <CustomButton text={"Generate Document"} onClick={handleGenerate} />
      <CustomButton text={"Download PDF"} onClick={downloadPdf} />
    </>
  );
}

export default ExtraComponent;
