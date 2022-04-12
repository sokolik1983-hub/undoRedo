import { useEffect } from "react";
import { createPortal } from "react-dom";

const NewPortal = ({children}) => {
  const mount = document.getElementById("document.body");
  const el = document.createElement("div");

  useEffect(() => {
    mount.appendChild(el);
    return () => mount.removeChild(el);
  }, [el, mount]);

  return createPortal(children, el)
};

export default NewPortal;