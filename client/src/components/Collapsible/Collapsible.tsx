import "./collapsible.css";
import React, { ReactNode, useState } from "react";
import Icon from "@mdi/react";
import { mdiPlus, mdiMinus  } from "@mdi/js";

interface Props {
  children?: ReactNode;
  header: string;
}

const Collapsible = ({ header, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <>
      <div
        className="collapsible"
      >
        <div
          className="collapsible-header"
          onClick={() => toggle()}
        >
          <h1 className="collapsible-header-title"
          >
            {header}
          </h1>
          <Icon path={isOpen ? mdiMinus : mdiPlus} size={1} />
        </div>
          <div
            className={isOpen ? "content show" : "content"}
          >
            {children}
          </div>
      </div>
    </>
  );
};

export default Collapsible;
