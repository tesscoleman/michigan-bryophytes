import { ReactNode } from "react";

interface Props {
  mapActive: boolean,
  onClick: () => void,
  children?: ReactNode
}

export default function MapCtrl({ mapActive, onClick, children }: Props) {
  return (
    <>
      <button className="nav-btn" onClick={onClick}>{children}</button>
    </>
  );
}
