import React from "react";

interface ResponseModalProps {
  // You can add props here if needed, such as onClose callback
  show: boolean;
  setShow: (show: boolean) => void;
}
function ResponseModal({ show, setShow }: ResponseModalProps) {
  return <div></div>;
}

export default ResponseModal;
